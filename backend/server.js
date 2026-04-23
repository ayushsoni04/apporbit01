import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";

const app = express();
const PORT = process.env.PORT || 4000;
const BACKEND_URL = process.env.BACKEND_URL || `http://localhost:${PORT}`;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-me";
const googleClient = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  `${BACKEND_URL}/api/auth/google/callback`
);

// In-memory store (replace with DB in production)
const users = new Map();

function findUserByEmail(email) {
  return [...users.values()].find((u) => u.email === email);
}

function findOrCreateGoogleUser(profile) {
  let user = findUserByEmail(profile.email);
  if (!user) {
    user = {
      id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      email: profile.email,
      name: profile.name,
      picture: profile.picture,
      provider: "google",
      createdAt: new Date().toISOString(),
    };
    users.set(user.id, user);
  }
  return user;
}

function signToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

function authMiddleware(req, res, next) {
  const token =
    req.cookies?.token || req.headers.authorization?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = users.get(payload.sub);
    if (!user) return res.status(401).json({ error: "User not found" });
    req.user = user;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(cookieParser());
app.use(express.json());

// ——— Google OAuth ———
app.get("/api/auth/google", (req, res) => {
  const url = googleClient.generateAuthUrl({
    scope: ["email", "profile"],
    prompt: "select_account",
  });
  res.redirect(url);
});

app.get("/api/auth/google/callback", async (req, res) => {
  const { code } = req.query;
  if (!code) {
    return res.redirect(`${FRONTEND_URL}/login?error=missing_code`);
  }
  try {
    const { tokens } = await googleClient.getToken(code);
    googleClient.setCredentials({ access_token: tokens.access_token });
    const ticket = await googleClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const user = findOrCreateGoogleUser({
      email: payload.email,
      name: payload.name,
      picture: payload.picture,
    });
    const token = signToken(user);
    res.redirect(`${FRONTEND_URL}/auth/callback?token=${encodeURIComponent(token)}`);
  } catch (err) {
    console.error("Google callback error:", err);
    res.redirect(`${FRONTEND_URL}/login?error=google_auth_failed`);
  }
});

// ——— Email signup ———
app.post("/api/auth/signup", async (req, res) => {
  const { email, password, name } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }
  if (findUserByEmail(email)) {
    return res.status(409).json({ error: "Email already registered" });
  }
  const hashed = await bcrypt.hash(password, 10);
  const user = {
    id: `user_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    email,
    name: name || email.split("@")[0],
    passwordHash: hashed,
    provider: "email",
    createdAt: new Date().toISOString(),
  };
  users.set(user.id, user);
  const { passwordHash: _, ...safe } = user;
  const token = signToken(user);
  res
    .cookie("token", token, { httpOnly: false, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: "lax" })
    .status(201)
    .json({ user: safe, token });
});

// ——— Email login ———
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password required" });
  }
  const user = findUserByEmail(email);
  if (!user || user.provider !== "email" || !user.passwordHash) {
    return res.status(401).json({ error: "Invalid email or password" });
  }
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: "Invalid email or password" });
  const { passwordHash: _, ...safe } = user;
  const token = signToken(user);
  res
    .cookie("token", token, { httpOnly: false, maxAge: 7 * 24 * 60 * 60 * 1000, sameSite: "lax" })
    .json({ user: safe, token });
});

// ——— Current user ———
app.get("/api/auth/me", authMiddleware, (req, res) => {
  const { passwordHash: _, ...safe } = req.user;
  res.json({ user: safe });
});

// ——— Logout (client clears token; optional server-side) ———
app.post("/api/auth/logout", (req, res) => {
  res.clearCookie("token").json({ ok: true });
});

// ——— Shopify store products (proxy to avoid CORS; public products.json) ———
app.get("/api/shopify/products", authMiddleware, async (req, res) => {
  const store = (req.query.store || "").toString().trim().toLowerCase();
  if (!store) {
    return res.status(400).json({ error: "Store host required (e.g. mystore.myshopify.com)" });
  }
  // Allow only hostnames (no path, no protocol)
  const host = store.replace(/^https?:\/\//, "").split("/")[0].replace(/^www\./, "");
  if (!host || host.includes(" ")) {
    return res.status(400).json({ error: "Invalid store host" });
  }
  try {
    const url = `https://${host}/products.json?limit=24`;
    const resp = await fetch(url, {
      headers: { "Accept": "application/json" },
      signal: AbortSignal.timeout(10000),
    });
    if (!resp.ok) {
      return res.status(resp.status === 404 ? 404 : 502).json({
        error: resp.status === 404 ? "Store not found or products not available" : "Could not load store",
      });
    }
    const data = await resp.json();
    const products = (data.products || []).map((p) => {
      const variant = p.variants && p.variants[0];
      const images = (p.images || []).map((img) => img.src);
      const image = images[0] || null;
      return {
        id: p.id,
        title: p.title || "",
        bodyHtml: p.body_html || null,
        vendor: p.vendor || null,
        productType: p.product_type || null,
        price: variant ? variant.price : null,
        compareAtPrice: variant ? variant.compare_at_price : null,
        image,
        images: images.length ? images : null,
        variants: (p.variants || []).map((v) => ({
          id: v.id,
          title: v.title,
          price: v.price,
          compareAtPrice: v.compare_at_price || null,
        })),
      };
    });
    res.json({ products });
  } catch (err) {
    console.error("Shopify products fetch error:", err);
    res.status(502).json({ error: "Could not load store products" });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});

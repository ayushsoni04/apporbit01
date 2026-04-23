"use client";

import Link from "next/link";
import { useState } from "react";
import { getGoogleAuthUrl, signupWithEmail, setStoredToken, type User } from "@/lib/auth";

const INPUT_CLASS =
  "h-14 w-full rounded-2xl border-[1.5px] border-[#b9b9b9] bg-white px-5 py-3 text-base text-[#171717] placeholder:text-[#848181] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-offset-0";
const BTN_PRIMARY =
  "flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-[#3b82f6] bg-[#3b82f6] px-6 py-2.5 text-lg font-medium text-white shadow-[inset_0_-4px_10px_4px_rgba(255,255,255,0.29)] transition-colors hover:bg-[#2563eb] disabled:opacity-60";

type Props = {
  onSuccess?: (user: User) => void;
};

export function SignupForm({ onSuccess }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { user, token } = await signupWithEmail(email, password, name || undefined);
      setStoredToken(token);
      onSuccess?.(user);
      if (typeof window !== "undefined") window.location.href = "/dashboard";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = () => {
    window.location.href = getGoogleAuthUrl();
  };

  return (
    <div className="w-full max-w-[420px] rounded-2xl border-[1.5px] border-[#eee] bg-white p-8 shadow-sm">
      <h1 className="font-display text-2xl font-medium tracking-tight text-[#353638]">
        Create account
      </h1>
      <p className="mt-1 text-[#848181]">Get started free. No credit card needed.</p>

      <button
        type="button"
        onClick={handleGoogle}
        className="mt-6 flex h-14 w-full items-center justify-center gap-3 rounded-2xl border-[1.5px] border-[#b9b9b9] bg-white text-base font-medium text-[#353638] transition-colors hover:border-[#3b82f6] hover:bg-[#f8fafc]"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Continue with Google
      </button>

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#eee]" />
        <span className="text-sm text-[#848181]">or</span>
        <div className="h-px flex-1 bg-[#eee]" />
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name (optional)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={INPUT_CLASS}
          autoComplete="name"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={INPUT_CLASS}
          required
          autoComplete="email"
        />
        <input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={INPUT_CLASS}
          required
          minLength={6}
          autoComplete="new-password"
        />
        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className={BTN_PRIMARY} disabled={loading}>
          {loading ? "Creating account…" : "Sign up"}
        </button>
      </form>

      <p className="mt-6 text-center text-[#848181]">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-[#3b82f6] hover:text-[#2563eb]"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}

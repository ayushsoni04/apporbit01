# App Orbit Backend

Express API with email + Google OAuth auth.

## Setup

1. Copy env and set values:
   ```bash
   cp .env.example .env
   ```

2. **Google OAuth** (optional for email-only auth):
   - [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials → Create OAuth 2.0 Client ID (Web application).
   - Set **Authorized redirect URIs** to `http://localhost:4000/api/auth/google/callback` (and your production URL when deployed).
   - Put `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env`.

3. Install and run:
   ```bash
   npm install
   npm run dev
   ```

API runs at `http://localhost:4000`. Frontend should use `NEXT_PUBLIC_API_URL=http://localhost:4000` when calling the API.

## Auth endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/auth/google` | Redirects to Google sign-in |
| GET | `/api/auth/google/callback` | OAuth callback; redirects to frontend with `?token=...` |
| POST | `/api/auth/signup` | Body: `{ email, password, name? }` |
| POST | `/api/auth/login` | Body: `{ email, password }` |
| GET | `/api/auth/me` | Header: `Authorization: Bearer <token>` |
| POST | `/api/auth/logout` | Clears cookie |

Users are stored in memory; replace with a database for production.

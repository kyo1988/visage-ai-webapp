# Environment Variable Migration (v4.5.1)

This migration aligns runtime config with security/compliance hardening.

## 1) Canonical Backend Domain

- Canonical production backend: `https://visage-ai-api.vercel.app`
- Webapp variables:
  - `NEXT_PUBLIC_API_BASE_URL` (client-visible base URL)
  - `API_BASE_URL` (server-side base URL)

## 2) Sensitive Env Naming Cleanup

Sensitive values must not use `NEXT_PUBLIC_*` names.

### Old -> New

| Deprecated (remove) | Replacement (server-only) |
|---|---|
| `NEXT_PUBLIC_EMAIL_USER` | `EMAIL_USER` |
| `NEXT_PUBLIC_EMAIL_APP_PASSWORD` | `EMAIL_APP_PASSWORD` |
| `NEXT_PUBLIC_EMAIL_FROM_NAME` | `EMAIL_FROM_NAME` |
| `NEXT_PUBLIC_ADMIN_EMAIL` | `ADMIN_EMAIL` |
| `NEXT_PUBLIC_FASTAPI_TOKEN` | `API_AUTH_TOKEN` |

Notes:
- `GMAIL_USER` / `GMAIL_APP_PASSWORD` are still accepted as server-only compatibility fallbacks.
- `NEXT_PUBLIC_CAL_URL` remains valid because it is intentionally client-visible.

## 3) Required Manual Follow-up (Vercel)

After merging, update environment variables in Vercel project settings:

1. Add new server-only names:
   - `EMAIL_USER`
   - `EMAIL_APP_PASSWORD`
   - `EMAIL_FROM_NAME`
   - `ADMIN_EMAIL`
   - `API_AUTH_TOKEN` (if token auth is used)
2. Verify:
   - `NEXT_PUBLIC_API_BASE_URL=https://visage-ai-api.vercel.app`
   - `API_BASE_URL=https://visage-ai-api.vercel.app`
3. Remove deprecated sensitive names:
   - `NEXT_PUBLIC_EMAIL_USER`
   - `NEXT_PUBLIC_EMAIL_APP_PASSWORD`
   - `NEXT_PUBLIC_EMAIL_FROM_NAME`
   - `NEXT_PUBLIC_ADMIN_EMAIL`
   - `NEXT_PUBLIC_FASTAPI_TOKEN`

## 3.1) Operator Status (2026-04-22 JST)

Confirmed by operator (Vercel UI):
- `NEXT_PUBLIC_EMAIL_USER` removed and replaced with `EMAIL_USER`.
- `NEXT_PUBLIC_EMAIL_APP_PASSWORD` removed and replaced with `EMAIL_APP_PASSWORD`.
- `NEXT_PUBLIC_EMAIL_FROM_NAME` removed and replaced with `EMAIL_FROM_NAME`.
- `NEXT_PUBLIC_ADMIN_EMAIL` removed and replaced with `ADMIN_EMAIL`.
- `NEXT_PUBLIC_FASTAPI_TOKEN` was not set.

Runtime checks performed:
- `POST https://www.visageaiconsulting.com/api/demo-request` with `{}` returns `400` (`{"error":"Missing required fields"}`), confirming route is live without triggering email send.
- `npm run check:compliance-hygiene` passes on current branch.

Open verification item:
- Direct check to `https://visage-ai-api.vercel.app/api/v2/demo/rate-limit?session_id=healthcheck` should return JSON rate-limit metadata.
- If this probe fails, investigate Vercel deployment health (not DNS/custom-domain setup).

### 3.2) Custom Domain Path (Deferred)

The custom-domain path (`api.visageaiconsulting.com`) was evaluated during hardening but is **not required** for v4.5.1 closure.
Current operations and compliance posture are based on `https://visage-ai-api.vercel.app`.

## 4) Regression Guard

Run this check before release:

```bash
npm run check:compliance-hygiene
```

It fails if active source reintroduces:
- non-canonical backend domain (`api.visageaiconsulting.com`),
- legacy `/api/v2/crystalai/*` route usage,
- sensitive `NEXT_PUBLIC_*` names.

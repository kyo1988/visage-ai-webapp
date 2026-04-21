# Privacy/Compliance Fallback Runbook

## Purpose

Reduce single-homing risk for compliance pages by keeping static backup artifacts in-repo.

## In-repo fallback assets

- `public/compliance/privacy-fallback-en.html`
- `public/compliance/privacy-fallback-ja.html`

These files can be served from any static host immediately if normal app routing is unavailable.

## Trigger conditions

Use fallback publication if one of the following occurs:

1. privacy pages are unavailable at `/ja/privacy` or `/en/privacy`,
2. urgent compliance review requires immediate public copy,
3. deployment incident affects normal routing.

## Fast recovery options

1. Same host temporary redirect/reroute:
   - serve `/compliance/privacy-fallback-*.html` directly.
2. Secondary static host mirror:
   - publish both fallback HTML files as a temporary mirror,
   - share mirror URL in compliance communications until normal route is restored.

## Manual infra actions required

This repository does **not** automatically provision backup infrastructure.
Human/infra action is still required to:

- choose fallback host,
- publish these static files,
- switch DNS/redirect if needed.

## Verification checklist

- [ ] `https://.../compliance/privacy-fallback-en.html` loads
- [ ] `https://.../compliance/privacy-fallback-ja.html` loads
- [ ] both pages contain on-device / first-party / no-third-party-AI statements
- [ ] canonical backend domain shown as `api.visageaiconsulting.com`

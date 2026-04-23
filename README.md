# Visage AI Web Application

A Next.js application featuring AI-powered skin analysis solutions and evidence-based marketing insights.

## Features

### 🧬 AI Skin Analysis
- Explainable AI (XAI) for transparent skin condition assessment
- High-precision region detection and analysis
- SDK/API integration for e-commerce and retail

### 🤖 Recommendation Engine
- **Interactive Demo**: `/ja/recommendation-demo` or `/en/recommendation-demo`
- Real-time product recommendations based on skin type and condition
- Recommendation engine API integration
- Rate-limited demo access (3 requests per 10 minutes)
- Analytics integration with GA4
- Human-in-the-loop review queue system

### 📊 Evidence-Based Marketing Playbook
- **Whitepaper Landing Page**: `/en/whitepaper/ebm-2025/`
- **Lead Capture System**: Form submission with GA4 tracking and email automation
- **PDF Generation**: Print-ready whitepaper with technical details
- **Dual-Viewer Structure**: Marketing insights + technical methodology
- **Email Integration**: Automated whitepaper delivery via Nodemailer

### 🎯 Analytics & Tracking
- GA4 integration with cross-domain tracking
- Meta Pixel base code integration (PageView)
- Lead attribution and segmentation
- Event tracking for whitepaper downloads and form submissions
- Email delivery tracking and internal notifications

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Whitepaper System

### Content Structure
- **Executive Summary**: Plain-English insights from Q3 2025 experiments
- **4 Key Findings**: Entry situations, heavy buyers, top quarter response, repertoire behavior
- **Actionable Insights**: What it means, what to do next, how to measure
- **Technical Details**: Collapsible methodology for each finding
- **14-Day Checklist**: Implementation roadmap for immediate action

### PDF Generation
```bash
# Generate whitepaper PDF
npm run generate-whitepaper-pdf

# Generate general PDF
npm run generate-pdf
```

### Email System
```bash
# Test email functionality
npm run test-email
```

### Content Management
- Markdown files in `content/whitepaper/ebm-2025/`
- Server-side rendering with `remark` and `remark-html`
- Responsive design with Tailwind CSS
- Email templates with HTML formatting

### Environment Variables
```bash
# Required for email functionality
NEXT_PUBLIC_SITE_URL=your-site-url
NEXT_PUBLIC_GA_ID=your-ga-id
NEXT_PUBLIC_META_PIXEL_ID=your-meta-pixel-id
EMAIL_USER=your-email@gmail.com
EMAIL_APP_PASSWORD=your-app-password
EMAIL_FROM_NAME=Visage AI Consulting
ADMIN_EMAIL=admin@visageaiconsulting.com

# Required for recommendation API features
NEXT_PUBLIC_API_BASE_URL=https://visage-ai-api.vercel.app
API_BASE_URL=https://visage-ai-api.vercel.app
API_AUTH_TOKEN=your-api-token
```

### Compliance Hygiene Check (Required Before Merge)
Run the guardrail check before releasing:

```bash
npm run check:compliance-hygiene
```

This check fails if active source reintroduces:
- non-canonical backend domain (`https://api.visageaiconsulting.com`),
- legacy route usage (`/api/v2/crystalai/*`) in webapp active paths,
- sensitive `NEXT_PUBLIC_*` env naming patterns.

### Legacy Compatibility Notes
- Canonical recommendation routes are `/api/v2/recommendations`, `/api/v2/demo`, and `/api/v2/demo/rate-limit`.
- Backend may retain hidden legacy aliases for compatibility (`/api/v2/crystalai/*`), but webapp callers must use canonical routes.

### Meta Pixel (PageView)
- Pixel ID is read from `NEXT_PUBLIC_META_PIXEL_ID`.
- Pixel is embedded in `app/[locale]/layout.tsx` via `next/script` (`meta-pixel-base`).
- `noscript` fallback image is rendered in the same layout body.
- Client-side route changes (App Router navigation) are tracked by `app/meta-pixel-listener.tsx`.
- Pixel is enabled only when `VERCEL_ENV=production` and `NEXT_PUBLIC_META_PIXEL_ID` is set.
- Therefore, local development and Vercel preview deployments do not emit Meta events.

#### How to verify in Meta Events Manager (Test Events)
1. Open Meta Events Manager > your Pixel > **Test Events**.
2. Open the production LP in a new browser tab and navigate across `/ja` or `/en` pages.
3. Confirm `PageView` appears for the initial load and subsequent route changes.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

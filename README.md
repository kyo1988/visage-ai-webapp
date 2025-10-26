# Visage AI Web Application

A Next.js application featuring AI-powered skin analysis solutions and evidence-based marketing insights.

## Features

### 🧬 AI Skin Analysis
- Explainable AI (XAI) for transparent skin condition assessment
- High-precision region detection and analysis
- SDK/API integration for e-commerce and retail

### 🤖 CrystalAI Recommendation System
- **Interactive Demo**: `/ja/recommendation-demo` or `/en/recommendation-demo`
- Real-time product recommendations based on skin type and condition
- CrystalAI 82-model ensemble integration
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
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password

# Required for CrystalAI features
NEXT_PUBLIC_FASTAPI_URL=https://visage-ai-api.vercel.app
NEXT_PUBLIC_FASTAPI_TOKEN=your-api-token
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

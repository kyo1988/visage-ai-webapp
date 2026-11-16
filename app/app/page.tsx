"use client";

import Image from "next/image";
import { track } from "@/app/lib/analytics";
import { trackConsentedMarketingClick } from "@/components/analytics/marketingClickTracking";
import { getCurrentUtms } from "@/app/lib/utm-capture";
import messages from "@/messages/en.json";

const copy = messages.landing.consumerApp;

// Keep the production App Store attribution parameters unchanged.
const APP_STORE_URL =
  "https://apps.apple.com/app/visage-ai-skin-advisor/id6748892785?ppid=2e97fead-211e-4219-a353-5ec1246b3730&pt=127999842&ct=owned-web-pvf-oct26&mt=8";

const serif = { fontFamily: "'Iowan Old Style', 'Baskerville', Georgia, serif" };

function AppStoreLink({ from, inverse = false }: { from: string; inverse?: boolean }) {
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-analytics-id="app_store_cta_click"
      onClick={() => {
        const utms = getCurrentUtms();
        track("app_store_cta_click", {
          from,
          page: "/app",
          utm_source: utms.utm_source ?? "(none)",
          utm_medium: utms.utm_medium ?? "(none)",
          utm_campaign: utms.utm_campaign ?? "(none)",
          utm_term: utms.utm_term ?? "(none)",
          utm_content: utms.utm_content ?? "(none)",
        });
        trackConsentedMarketingClick("app_store_cta_click");
      }}
      className={
        "inline-flex min-h-11 items-center justify-center py-2 text-[15px] font-medium tracking-[0.01em] underline decoration-1 underline-offset-[8px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#574f45] " +
        (inverse ? "text-[#f6f1e9] decoration-[#d4cabe] hover:text-white " : "text-[#252522] decoration-[#6d6258] hover:text-[#0e120f]")
      }
    >
      Get Visage AI
    </a>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#716a62] sm:text-[11px]">{children}</p>;
}

export default function AppLandingPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbfaf7] font-sans text-[#292723]">
      <header className="border-b border-[#e9e5df]">
        <nav aria-label="Main navigation" className="mx-auto flex h-[52px] max-w-[1280px] items-center justify-between px-5 sm:h-16 sm:px-10 lg:px-14">
          <a href="#top" className="inline-flex min-h-11 items-center text-[22px] tracking-[-0.025em] text-[#292723] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#574f45]" style={serif}>Visage AI</a>
          <a href="#inside" className="inline-flex min-h-11 items-center text-[12px] tracking-[0.03em] text-[#66615a] underline-offset-4 hover:underline sm:text-[13px]">Inside the app</a>
        </nav>
      </header>

      <section id="top" aria-labelledby="hero-title">
        <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-y-2 px-5 pb-6 pt-3 sm:gap-y-5 sm:px-10 sm:pb-14 sm:pt-9 lg:min-h-[680px] lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)] lg:items-center lg:gap-x-16 lg:px-14 lg:py-16">
          <div className="min-w-0 lg:col-start-1 lg:row-start-1">
            <h1 id="hero-title" className="text-[clamp(2.4rem,10.25vw,3.1rem)] font-normal leading-[1.015] tracking-[-0.045em] text-[#26231f] lg:text-[clamp(4rem,5.35vw,5.5rem)]" style={serif}>
              Not sure what <span className="block">to focus on?</span>
            </h1>
            <p className="mt-2 text-[15px] leading-[1.4] text-[#5d5850] sm:mt-5 sm:text-[19px]">One photo. One suggested priority.</p>
            <figure className="relative mt-3 aspect-[3.1] w-full overflow-hidden bg-[#e6d8c8] sm:mt-8 lg:max-w-[530px]">
              <Image
                src="/images/app-landing/496/photo-input-still-life.webp"
                alt="Illustrative still life of an iPhone resting on a stone countertop by a mirror. No people or app results are shown."
                width={820}
                height={265}
                priority
                sizes="(min-width: 1024px) 530px, (min-width: 640px) 560px, calc(100vw - 40px)"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <figcaption className="absolute left-4 top-4 max-w-[58%] sm:left-7 sm:top-6">
                <span className="block text-[10px] font-medium uppercase tracking-[0.17em] text-[#50483f] sm:text-[11px]">01 / Photo</span>
                <span className="mt-1 block text-[16px] leading-[1.15] text-[#2c2823] sm:mt-2 sm:text-[22px]" style={serif}>Take or choose a photo</span>
              </figcaption>
            </figure>
          </div>

          <figure className="min-w-0 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center">
            <figcaption className="mb-1.5 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 text-[11px] text-[#645d54] sm:mb-3 sm:text-[12px]">
              <span>02 / Suggested priority</span>
              <span>Example result · yours may differ</span>
            </figcaption>
            <Image
              src="/images/app-landing/496/todays-priority.png"
              width={1086}
              height={660}
              priority
              sizes="(min-width: 1024px) 47vw, (min-width: 640px) 560px, calc(100vw - 40px)"
              alt="Official app example: Today's Priority suggests Age-Defying Glow. Results vary when usable photo measurements are available."
              className="block h-auto w-full rounded-[16px] sm:rounded-[22px]"
            />
          </figure>

          <div className="flex flex-col items-start gap-0 lg:col-start-1 lg:row-start-2 lg:self-start">
            <AppStoreLink from="hero" />
            <p className="max-w-[410px] text-[12px] leading-[1.4] text-[#67615a] sm:mt-1 sm:text-[13px]">Suggested when usable photo measurements are available. Cosmetic guidance only. Not a medical diagnosis.</p>
          </div>
        </div>
      </section>

      <section id="inside" aria-label="Inside the app" className="border-t border-[#e9e5df] bg-[#f5f1eb]">
        <div className="mx-auto grid max-w-[1280px] items-center gap-7 px-5 py-14 sm:px-10 sm:py-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-x-20 lg:px-14">
          <figure className="mx-auto w-full max-w-[420px]">
            <Image
              src="/images/app-landing/496/routine-check.png"
              width={1080}
              height={970}
              sizes="(min-width: 1024px) 420px, calc(100vw - 40px)"
              alt="Actual Routine Check example showing saved product-category presence, not product suitability or effectiveness."
              className="block h-auto w-full"
            />
          </figure>
          <div className="lg:row-start-1 lg:col-start-2">
            <Eyebrow>03 / Routine Check</Eyebrow>
            <h2 className="mt-4 text-[clamp(2.35rem,5vw,4.8rem)] font-normal leading-[1.06] tracking-[-0.04em]" style={serif}>See what you have.</h2>
            <p className="mt-5 max-w-[440px] text-[14px] leading-[1.75] text-[#615b54] sm:text-[16px]">Your saved product categories, at a glance. Not proof of use, suitability, effectiveness or routine adequacy.</p>
            <p className="mt-4 text-[13px] text-[#615b54]">Buying more is always optional.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="journey-title" className="bg-[#fbfaf7]">
        <div className="mx-auto flex max-w-[1080px] flex-col items-center gap-8 px-5 py-14 sm:px-10 sm:py-20 md:flex-row md:justify-between md:gap-24">
          <div className="w-full max-w-[520px]">
            <Eyebrow>04 / Skin Journey</Eyebrow>
            <h2 id="journey-title" className="mt-4 text-[clamp(2.35rem,5vw,4.8rem)] font-normal leading-[1.06] tracking-[-0.04em]" style={serif}>Look back, with context.</h2>
            <p className="mt-5 max-w-[480px] text-[14px] leading-[1.75] text-[#615b54] sm:text-[16px]">Compare available measurements over time. Changes are not proof of skin improvement or a product&apos;s effect.</p>
          </div>
          <figure className="w-[185px] shrink-0 sm:w-[230px]">
            <Image
              src="/images/app-landing/496/skin-journey.png"
              width={1146}
              height={2355}
              sizes="230px"
              alt="Actual Skin Journey example with identical earlier and later scores of 47, not a claim of improvement."
              className="h-auto w-full"
            />
          </figure>
        </div>
      </section>

      <section id="get-app" aria-labelledby="cta-title" className="bg-[#292b28]">
        <div className="mx-auto max-w-[840px] px-5 py-16 text-center sm:px-10 sm:py-24">
          <h2 id="cta-title" className="text-[clamp(2.8rem,6vw,5rem)] font-normal leading-[1.07] tracking-[-0.04em] text-[#f6f1e9]" style={serif}>Start with a photo.</h2>
          <p className="mt-3 text-[15px] text-[#d3c9bd] sm:text-[17px]">One possible priority. Your choice.</p>
          <div className="mt-5"><AppStoreLink from="closing" inverse /></div>
          <p className="mt-1 text-[12px] text-[#c6beb2]">{copy.freeLabel} · No forced purchase</p>
        </div>
      </section>

      <footer className="border-t border-[#e7e1d8] bg-[#fbfaf7]">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-10 lg:px-14">
          <span className="text-[21px] text-[#292723]" style={serif}>Visage AI</span>
          <div className="flex flex-wrap gap-x-7 gap-y-2 text-[13px] text-[#686159]">
            <a href="/en/privacy" className="underline-offset-4 hover:underline">Privacy Policy</a>
            <a href="/en" className="underline-offset-4 hover:underline" data-analytics-id="app_landing_b2b_link_click" onClick={() => track("app_landing_b2b_link_click", { page: "/app" })}>For retailers</a>
          </div>
          <p className="text-[11px] text-[#7b736a]">© {new Date().getFullYear()} Visage AI · Beauty guidance only</p>
        </div>
      </footer>
    </main>
  );
}

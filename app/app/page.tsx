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
    <main className="min-h-screen bg-[#fbfaf7] font-sans text-[#252522]">
      <header className="border-b border-[#e6e7e1] bg-[#fbfaf7]">
        <nav aria-label="Main navigation" className="mx-auto flex h-[52px] max-w-[1320px] items-center justify-between px-5 sm:h-[70px] sm:px-10 lg:px-14">
          <a href="#top" className="inline-flex min-h-11 items-center text-[21px] font-normal tracking-[-0.025em] text-[#252522] no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#574f45]" style={serif}>
            Visage AI
          </a>
          <a href="#how" className="inline-flex min-h-11 items-center text-[12px] font-medium tracking-[0.02em] text-[#58625b] underline-offset-4 hover:underline sm:text-[13px]">
            The approach
          </a>
        </nav>
      </header>

      <section id="top" aria-labelledby="hero-title" className="bg-[#fbfaf7]">
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-y-2 px-5 pb-6 pt-3 sm:gap-y-5 sm:px-10 sm:pb-16 sm:pt-11 lg:min-h-[650px] lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)] lg:items-center lg:gap-x-20 lg:gap-y-5 lg:px-14 lg:py-20">
          <div className="min-w-0 lg:col-start-1 lg:row-start-1 lg:self-end">
            <p className="hidden text-[10px] font-medium uppercase tracking-[0.22em] text-[#5f6860] sm:block lg:mb-8">
              Beauty guidance, with a little more clarity
            </p>
            <h1 id="hero-title" className="text-[clamp(2.5rem,10.3vw,3.15rem)] font-normal leading-[1.01] tracking-[-0.046em] text-[#252522] lg:max-w-[620px] lg:text-[clamp(4.1rem,5.5vw,5.65rem)]" style={serif}>
              Not sure what <span className="block">to focus on?</span>
            </h1>
            <p className="mt-2 text-[15px] leading-6 text-[#59635b] sm:mt-5 sm:text-[18px] lg:text-[21px]">
              One photo. One suggested priority.
            </p>
            <figure className="relative mt-3 aspect-[2.9] w-full max-w-[470px] overflow-hidden bg-[#d5c5b4] sm:mt-7 lg:mt-9">
              <Image
                src="/images/app-landing/496/photo-input-editorial.svg"
                alt="Illustrative photograph of a hand holding an iPhone by a sunlit bathroom mirror; no analysis result is depicted"
                width={800}
                height={276}
                unoptimized
                sizes="(min-width: 1024px) 470px, calc(100vw - 40px)"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <figcaption className="absolute left-4 top-4 max-w-[45%] sm:left-6 sm:top-6">
                <span className="block text-[10px] font-medium uppercase tracking-[0.1em] text-[#3f3c35]">01 / Your photo</span>
                <span className="mt-1.5 block text-[16px] font-normal leading-[1.2] text-[#252522] sm:mt-3 sm:text-[21px]" style={serif}>Take or choose a photo</span>
              </figcaption>
            </figure>
          </div>

          <figure className="min-w-0 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center">
            <figcaption className="mb-2 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 text-[11px] font-medium tracking-[0.015em] text-[#69625a] sm:mb-4 sm:text-[12px]">
              <span>02 / Your priority</span>
              <span className="shrink-0">Example result · may vary</span>
            </figcaption>
            <div className="bg-white">
              <Image
                src="/images/app-landing/496/todays-priority.png"
                alt="Unaltered official example of Today's Priority: Age-Defying Glow. Your suggested priority may differ."
                width={1086}
                height={660}
                priority
                sizes="(min-width: 1024px) 45vw, (min-width: 640px) 560px, calc(100vw - 52px)"
                className="block h-auto w-full rounded-[16px] sm:rounded-[22px]"
              />
            </div>
          </figure>

          <div className="flex flex-col items-start gap-0.5 lg:col-start-1 lg:row-start-2 lg:self-start lg:pt-4">
            <AppStoreLink from="hero" />
            <p className="max-w-[390px] text-[12px] leading-[1.5] text-[#66615a] sm:mt-1 sm:text-[13px]">
              Suggested when usable photo measurements are available. Cosmetic guidance only. Not a medical diagnosis.
            </p>
          </div>
        </div>
      </section>

      <section id="how" aria-labelledby="how-title" className="bg-[#fbfaf7]">
        <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-10 sm:py-24 lg:px-14 lg:py-28">
          <div className="max-w-[780px]">
            <Eyebrow>01 / The approach</Eyebrow>
            <h2 id="how-title" className="mt-5 text-[clamp(2.4rem,4.7vw,4.8rem)] font-normal leading-[1.08] tracking-[-0.038em] text-[#302d29]" style={serif}>
              Good skincare starts with a clearer question.
            </h2>
            <p className="mt-5 max-w-[640px] text-[15px] leading-[1.8] text-[#625e57] sm:text-[17px]">
              You do not need another ten-step routine. Start with what matters to you, get an available photo-based suggestion, and review your saved products separately.
            </p>
          </div>
          <div className="mt-11 grid gap-9 md:grid-cols-3 md:gap-10 lg:mt-16">
            <article className="border-t border-[#c9c1b6] pt-5">
              <p className="text-[11px] font-medium tracking-[0.1em] text-[#776e64]">01 / PHOTO</p>
              <h3 className="mt-6 text-[31px] font-normal leading-[1.1] tracking-[-0.025em] text-[#302d29]" style={serif}>Take a photo</h3>
              <p className="mt-4 max-w-[350px] text-[14px] leading-[1.85] text-[#625e57]">Begin a photo-based assessment with your camera or photo library. Some images may need to be retaken.</p>
            </article>
            <article className="border-t border-[#c9c1b6] pt-5">
              <p className="text-[11px] font-medium tracking-[0.1em] text-[#776e64]">02 / PRIORITY</p>
              <h3 className="mt-6 text-[31px] font-normal leading-[1.1] tracking-[-0.025em] text-[#302d29]" style={serif}>Find a focus</h3>
              <p className="mt-4 max-w-[350px] text-[14px] leading-[1.85] text-[#625e57]">See a suggested beauty priority when the available measurements support one. It is not a medical diagnosis.</p>
            </article>
            <article className="border-t border-[#c9c1b6] pt-5">
              <p className="text-[11px] font-medium tracking-[0.1em] text-[#776e64]">03 / YOUR ROUTINE</p>
              <h3 className="mt-6 text-[31px] font-normal leading-[1.1] tracking-[-0.025em] text-[#302d29]" style={serif}>Choose your next step</h3>
              <p className="mt-4 max-w-[350px] text-[14px] leading-[1.85] text-[#625e57]">Look at the product categories you saved in My Routine. Keeping what you have is always an option.</p>
            </article>
          </div>
          <p className="mt-14 text-[22px] font-normal italic leading-snug text-[#5d5852] sm:text-[27px]" style={serif}>Your routine is yours to choose.</p>
        </div>
      </section>

      <section id="priority" aria-labelledby="priority-title" className="border-y border-[#e2e5de] bg-[#f5f2ec]">
        <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-5 py-16 sm:px-10 sm:py-24 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:gap-20 lg:px-14">
          <div className="lg:order-1">
            <Eyebrow>02 / Today&apos;s Priority</Eyebrow>
            <h2 id="priority-title" className="mt-5 max-w-[560px] text-[clamp(2.5rem,4.7vw,4.75rem)] font-normal leading-[1.08] tracking-[-0.037em] text-[#302d29]" style={serif}>
              A place to begin. Not a verdict.
            </h2>
            <p className="mt-6 max-w-[510px] text-[15px] leading-[1.85] text-[#625e57] sm:text-[17px]">
              A photo-based assessment can suggest one beauty priority using available measurements. The suggestion can help you decide what deserves your attention today.
            </p>
            <p className="mt-6 max-w-[510px] border-t border-[#c9c1b6] pt-5 text-[13px] leading-[1.8] text-[#566159]">
              Examples vary by photo and available measurements. Results are not diagnoses or a guarantee of improvement.
            </p>
          </div>
          <figure className="lg:order-2">
            <div className="border border-[#e7dfd5] bg-white p-2.5 sm:p-5">
              <Image
                src="/images/app-landing/496/todays-priority.png"
                width={1086}
                height={660}
                sizes="(min-width: 1024px) 45vw, 88vw"
                alt="Actual captured example: Today's Priority card suggesting Age-Defying Glow"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 text-[11px] leading-5 text-[#625e57]">Captured app example · not a promise of your result</figcaption>
          </figure>
        </div>
      </section>

      <section id="routine" aria-labelledby="routine-title" className="bg-[#fbfaf7]">
        <div className="mx-auto grid max-w-[1320px] items-center gap-11 px-5 py-16 sm:px-10 sm:py-24 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:gap-24 lg:px-14 lg:py-28">
          <figure className="min-w-0 lg:max-w-[500px]">
            <div className="border border-[#e8e3da] bg-[#f7f3ec] p-6 sm:p-10">
              <Image
                src="/images/app-landing/496/routine-check.png"
                width={1080}
                height={970}
                sizes="(min-width: 1024px) 440px, 85vw"
                alt="Actual Routine Check share card: Cleanser not listed in My Routine; category presence only"
                className="mx-auto h-auto w-full max-w-[390px]"
              />
            </div>
            <figcaption className="mt-3 text-[11px] leading-5 text-[#6e665e]">Example saved-category check, separate from Today&apos;s Priority</figcaption>
          </figure>
          <div>
            <Eyebrow>03 / Your routine</Eyebrow>
            <h2 id="routine-title" className="mt-5 text-[clamp(2.5rem,4.65vw,4.7rem)] font-normal leading-[1.08] tracking-[-0.037em] text-[#302d29]" style={serif}>
              What you already have matters.
            </h2>
            <p className="mt-6 max-w-[560px] text-[15px] leading-[1.85] text-[#625e57] sm:text-[17px]">
              Routine Check shows whether a product category appears in your saved My Routine list. It lets you pause and review rather than assume every new recommendation means another purchase.
            </p>
            <div className="mt-7 max-w-[560px] border-t border-[#c9c1b6] pt-5 text-[13px] leading-[1.8] text-[#566159]">
              <p><span className="font-semibold text-[#303b33]">What it does not tell you:</span> whether a product is suitable, effective, actually used, or enough for your whole routine. An unlisted category is not an instruction to buy.</p>
            </div>
            <p className="mt-6 text-[17px] font-normal text-[#62584f]" style={serif}>Keep it. Rethink it. Or decide not to buy.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="journey-title" className="border-y border-[#e2e5de] bg-[#f5f2ec]">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-10 px-5 py-16 sm:px-10 sm:py-24 md:flex-row md:gap-24 lg:px-14">
          <figure className="w-[176px] shrink-0 sm:w-[206px]">
            <div className="border border-[#e7dfd5] bg-white p-2.5">
              <Image
                src="/images/app-landing/496/skin-journey.png"
                width={1146}
                height={2355}
                sizes="206px"
                alt="Actual Skin Journey comparison example; earlier and later scores are both 47"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="sr-only">The example shows equal earlier and later scores, not improved skin.</figcaption>
          </figure>
          <div className="max-w-[630px]">
            <Eyebrow>04 / Skin Journey</Eyebrow>
            <h2 id="journey-title" className="mt-5 text-[clamp(2.5rem,4.4vw,4.65rem)] font-normal leading-[1.1] tracking-[-0.037em] text-[#302d29]" style={serif}>
              A little perspective, over time.
            </h2>
            <p className="mt-6 text-[15px] leading-[1.85] text-[#625e57] sm:text-[17px]">Return for another assessment and compare available measurements in Skin Journey. Changes in measurements are not proof that a skincare product caused them.</p>
            <p className="mt-4 text-[12px] leading-[1.7] text-[#6e665e]">The pictured example shows no measured score change and does not imply improved skin.</p>
          </div>
        </div>
      </section>

      <section id="get-app" aria-labelledby="cta-title" className="bg-[#292b28]">
        <div className="mx-auto max-w-[990px] px-5 py-20 text-center sm:px-10 sm:py-28">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-[#d3cbc1]">Your next skincare decision</p>
          <h2 id="cta-title" className="mx-auto mt-7 text-[clamp(2.8rem,6.5vw,5.3rem)] font-normal leading-[1.08] tracking-[-0.038em] text-[#f6f1e9]" style={serif}>
            Start with a photo. <span className="block">Decide with context.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[490px] text-[15px] leading-[1.8] text-[#cbc4ba] sm:text-[17px]">Explore Visage AI for iPhone. One possible priority. Your routine. Your choice.</p>
          <div className="mt-7"><AppStoreLink from="closing" inverse /></div>
          <p className="mt-2 text-[12px] text-[#cbc4ba]">{copy.freeLabel} · No forced purchase</p>
        </div>
      </section>

      <footer className="border-t border-[#e1e4dd] bg-[#fbfaf7]">
        <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-6 px-5 py-10 sm:flex-row sm:items-center sm:px-10 lg:px-14">
          <span className="text-[21px] font-normal tracking-[-0.02em] text-[#28312b]" style={serif}>Visage AI</span>
          <div className="flex flex-wrap gap-x-7 gap-y-3 text-[13px] text-[#686159]">
            <a href="/en/privacy" className="underline-offset-4 hover:underline">Privacy Policy</a>
            <a href="/en" className="underline-offset-4 hover:underline" data-analytics-id="app_landing_b2b_link_click" onClick={() => track("app_landing_b2b_link_click", { page: "/app" })}>
              For retailers
            </a>
          </div>
          <p className="text-[11px] text-[#7b736a]">© {new Date().getFullYear()} Visage AI · Beauty guidance only</p>
        </div>
      </footer>
    </main>
  );
}

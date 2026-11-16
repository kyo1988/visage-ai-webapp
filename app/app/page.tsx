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
        "inline-flex min-h-11 items-center justify-center py-2 text-[15px] font-medium tracking-[0.01em] underline decoration-1 underline-offset-[8px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#31463b] " +
        (inverse ? "text-[#242a26] decoration-[#505950] hover:text-[#0e120f] " : "text-[#242a26] decoration-[#505950] hover:text-[#0e120f]")
      }
    >
      Get Visage AI
    </a>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#5b655e] sm:text-[11px]">{children}</p>;
}

export default function AppLandingPage() {
  return (
    <main className="min-h-screen bg-[#fafaf8] font-sans text-[#242a26]">
      <header className="border-b border-[#e6e7e1] bg-[#fafaf8]">
        <nav aria-label="Main navigation" className="mx-auto flex h-[52px] max-w-[1320px] items-center justify-between px-5 sm:h-[70px] sm:px-10 lg:px-14">
          <a href="#top" className="inline-flex min-h-11 items-center text-[21px] font-normal tracking-[-0.025em] text-[#242a26] no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#31463b]" style={serif}>
            Visage AI
          </a>
          <a href="#how" className="inline-flex min-h-11 items-center text-[12px] font-medium tracking-[0.02em] text-[#58625b] underline-offset-4 hover:underline sm:text-[13px]">
            The approach
          </a>
        </nav>
      </header>

      <section id="top" aria-labelledby="hero-title" className="bg-[#fafaf8]">
        <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-y-3 px-5 pb-7 pt-4 sm:gap-y-5 sm:px-10 sm:pb-16 sm:pt-11 lg:min-h-[650px] lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)] lg:items-center lg:gap-x-20 lg:gap-y-5 lg:px-14 lg:py-20">
          <div className="min-w-0 lg:col-start-1 lg:row-start-1 lg:self-end">
            <p className="hidden text-[10px] font-medium uppercase tracking-[0.22em] text-[#5f6860] sm:block lg:mb-8">
              Beauty guidance, with a little more clarity
            </p>
            <h1 id="hero-title" className="text-[clamp(2.5rem,10.3vw,3.15rem)] font-normal leading-[1.01] tracking-[-0.046em] text-[#202622] lg:max-w-[620px] lg:text-[clamp(4.1rem,5.5vw,5.65rem)]" style={serif}>
              Not sure what <span className="block">to focus on?</span>
            </h1>
            <p className="mt-2 text-[15px] leading-6 text-[#59635b] sm:mt-5 sm:text-[18px] lg:text-[21px]">
              One photo. One suggested priority.
            </p>
            <div className="mt-4 flex max-w-[410px] items-center gap-3 border-y border-[#d7dad3] py-2 sm:mt-8 sm:gap-4 sm:py-3.5 lg:mt-10">
              <Image
                src="/images/app-landing/496/photo-input-moment.svg"
                alt="Photographic illustration of a hand holding an iPhone during a photo-based skincare moment"
                width={176}
                height={244}
                unoptimized
                className="h-11 w-11 shrink-0 object-cover sm:h-14 sm:w-14"
              />
              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-[#536057] sm:text-[11px]">01 / Photo input</p>
                <p className="mt-0.5 text-[13px] font-medium leading-5 text-[#303933] sm:text-[15px]">Take or choose a photo</p>
              </div>
            </div>
          </div>

          <figure className="min-w-0 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-center">
            <figcaption className="mb-2 flex items-baseline justify-between gap-3 text-[11px] font-medium tracking-[0.055em] text-[#49594e] sm:mb-4 sm:text-[12px]">
              <span>02 / Today&apos;s Priority</span>
              <span className="shrink-0 uppercase tracking-[0.13em]">Example result · yours may differ</span>
            </figcaption>
            <div className="border border-[#e3e5df] bg-white p-1.5 sm:p-3 lg:p-5">
              <Image
                src="/images/app-landing/496/todays-priority.png"
                alt="Unaltered official example of Today's Priority: Age-Defying Glow. Your suggested priority may differ."
                width={1086}
                height={660}
                priority
                sizes="(min-width: 1024px) 45vw, (min-width: 640px) 560px, calc(100vw - 52px)"
                className="block h-auto w-full"
              />
            </div>
          </figure>

          <div className="flex flex-col items-start gap-0.5 lg:col-start-1 lg:row-start-2 lg:self-start lg:pt-4">
            <AppStoreLink from="hero" />
            <p className="max-w-[390px] text-[12px] leading-[1.5] text-[#536057] sm:mt-1 sm:text-[13px]">
              Suggested when usable photo measurements are available. Cosmetic guidance only. Not a medical diagnosis.
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Brand statement" className="border-y border-[#e0e3dc] bg-[#f1f2ee]">
        <div className="mx-auto flex max-w-[1320px] flex-col gap-2 px-5 py-9 sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-12 lg:px-14">
          <Eyebrow>Less noise. More intention.</Eyebrow>
          <p className="text-[27px] font-normal leading-[1.14] tracking-[-0.035em] text-[#303934] sm:text-[35px]" style={serif}>
            Your routine is yours to choose.
          </p>
        </div>
      </section>

      <section id="how" aria-labelledby="how-title" className="bg-[#fafaf8]">
        <div className="mx-auto max-w-[1320px] px-5 py-16 sm:px-10 sm:py-24 lg:px-14 lg:py-28">
          <div className="max-w-[780px]">
            <Eyebrow>01 / The approach</Eyebrow>
            <h2 id="how-title" className="mt-5 text-[clamp(2.4rem,4.7vw,4.8rem)] font-normal leading-[1.08] tracking-[-0.038em] text-[#253029]" style={serif}>
              Good skincare starts with a clearer question.
            </h2>
            <p className="mt-5 max-w-[640px] text-[15px] leading-[1.8] text-[#58635b] sm:text-[17px]">
              You do not need another ten-step routine. Start with what matters to you, get an available photo-based suggestion, and review your saved products separately.
            </p>
          </div>
          <div className="mt-11 grid gap-9 md:grid-cols-3 md:gap-10 lg:mt-16">
            <article className="border-t border-[#adb6ab] pt-5">
              <p className="text-[11px] font-medium tracking-[0.1em] text-[#647167]">01 / PHOTO</p>
              <h3 className="mt-6 text-[31px] font-normal leading-[1.1] tracking-[-0.025em] text-[#253029]" style={serif}>Take a photo</h3>
              <p className="mt-4 max-w-[350px] text-[14px] leading-[1.85] text-[#58635b]">Begin a photo-based assessment with your camera or photo library. Some images may need to be retaken.</p>
            </article>
            <article className="border-t border-[#adb6ab] pt-5">
              <p className="text-[11px] font-medium tracking-[0.1em] text-[#647167]">02 / PRIORITY</p>
              <h3 className="mt-6 text-[31px] font-normal leading-[1.1] tracking-[-0.025em] text-[#253029]" style={serif}>Find a focus</h3>
              <p className="mt-4 max-w-[350px] text-[14px] leading-[1.85] text-[#58635b]">See a suggested beauty priority when the available measurements support one. It is not a medical diagnosis.</p>
            </article>
            <article className="border-t border-[#adb6ab] pt-5">
              <p className="text-[11px] font-medium tracking-[0.1em] text-[#647167]">03 / YOUR ROUTINE</p>
              <h3 className="mt-6 text-[31px] font-normal leading-[1.1] tracking-[-0.025em] text-[#253029]" style={serif}>Choose your next step</h3>
              <p className="mt-4 max-w-[350px] text-[14px] leading-[1.85] text-[#58635b]">Look at the product categories you saved in My Routine. Keeping what you have is always an option.</p>
            </article>
          </div>
        </div>
      </section>

      <section id="priority" aria-labelledby="priority-title" className="border-y border-[#e2e5de] bg-[#f1f2ee]">
        <div className="mx-auto grid max-w-[1320px] items-center gap-10 px-5 py-16 sm:px-10 sm:py-24 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:gap-20 lg:px-14">
          <div className="lg:order-1">
            <Eyebrow>02 / Today&apos;s Priority</Eyebrow>
            <h2 id="priority-title" className="mt-5 max-w-[560px] text-[clamp(2.5rem,4.7vw,4.75rem)] font-normal leading-[1.08] tracking-[-0.037em] text-[#253029]" style={serif}>
              A place to begin. Not a verdict.
            </h2>
            <p className="mt-6 max-w-[510px] text-[15px] leading-[1.85] text-[#58635b] sm:text-[17px]">
              A photo-based assessment can suggest one beauty priority using available measurements. The suggestion can help you decide what deserves your attention today.
            </p>
            <p className="mt-6 max-w-[510px] border-t border-[#b9c1b7] pt-5 text-[13px] leading-[1.8] text-[#566159]">
              Examples vary by photo and available measurements. Results are not diagnoses or a guarantee of improvement.
            </p>
          </div>
          <figure className="lg:order-2">
            <div className="border border-[#dfe3dc] bg-white p-2.5 sm:p-5">
              <Image
                src="/images/app-landing/496/todays-priority.png"
                width={1086}
                height={660}
                sizes="(min-width: 1024px) 45vw, 88vw"
                alt="Actual captured example: Today's Priority card suggesting Age-Defying Glow"
                className="h-auto w-full"
              />
            </div>
            <figcaption className="mt-3 text-[11px] leading-5 text-[#58635b]">Captured app example · not a promise of your result</figcaption>
          </figure>
        </div>
      </section>

      <section id="routine" aria-labelledby="routine-title" className="bg-[#fafaf8]">
        <div className="mx-auto grid max-w-[1320px] items-center gap-11 px-5 py-16 sm:px-10 sm:py-24 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:gap-24 lg:px-14 lg:py-28">
          <figure className="min-w-0 lg:max-w-[500px]">
            <div className="border border-[#e4e5df] bg-[#f4f5f1] p-6 sm:p-10">
              <Image
                src="/images/app-landing/496/routine-check.png"
                width={1080}
                height={970}
                sizes="(min-width: 1024px) 440px, 85vw"
                alt="Actual Routine Check share card: Cleanser not listed in My Routine; category presence only"
                className="mx-auto h-auto w-full max-w-[390px]"
              />
            </div>
            <figcaption className="mt-3 text-[11px] leading-5 text-[#5d6860]">Example saved-category check, separate from Today&apos;s Priority</figcaption>
          </figure>
          <div>
            <Eyebrow>03 / Your routine</Eyebrow>
            <h2 id="routine-title" className="mt-5 text-[clamp(2.5rem,4.65vw,4.7rem)] font-normal leading-[1.08] tracking-[-0.037em] text-[#253029]" style={serif}>
              What you already have matters.
            </h2>
            <p className="mt-6 max-w-[560px] text-[15px] leading-[1.85] text-[#58635b] sm:text-[17px]">
              Routine Check shows whether a product category appears in your saved My Routine list. It lets you pause and review rather than assume every new recommendation means another purchase.
            </p>
            <div className="mt-7 max-w-[560px] border-t border-[#b9c1b7] pt-5 text-[13px] leading-[1.8] text-[#566159]">
              <p><span className="font-semibold text-[#303b33]">What it does not tell you:</span> whether a product is suitable, effective, actually used, or enough for your whole routine. An unlisted category is not an instruction to buy.</p>
            </div>
            <p className="mt-6 text-[17px] font-normal text-[#44534a]" style={serif}>Keep it. Rethink it. Or decide not to buy.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="journey-title" className="border-y border-[#e2e5de] bg-[#f1f2ee]">
        <div className="mx-auto flex max-w-[1100px] flex-col items-center gap-10 px-5 py-16 sm:px-10 sm:py-24 md:flex-row md:gap-24 lg:px-14">
          <figure className="w-[176px] shrink-0 sm:w-[206px]">
            <div className="border border-[#dfe2dc] bg-white p-2.5">
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
            <h2 id="journey-title" className="mt-5 text-[clamp(2.5rem,4.4vw,4.65rem)] font-normal leading-[1.1] tracking-[-0.037em] text-[#253029]" style={serif}>
              A little perspective, over time.
            </h2>
            <p className="mt-6 text-[15px] leading-[1.85] text-[#58635b] sm:text-[17px]">Return for another assessment and compare available measurements in Skin Journey. Changes in measurements are not proof that a skincare product caused them.</p>
            <p className="mt-4 text-[12px] leading-[1.7] text-[#5d6860]">The pictured example shows no measured score change and does not imply improved skin.</p>
          </div>
        </div>
      </section>

      <section id="get-app" aria-labelledby="cta-title" className="bg-[#e9ece6]">
        <div className="mx-auto max-w-[990px] px-5 py-20 text-center sm:px-10 sm:py-28">
          <Eyebrow>Your next skincare decision</Eyebrow>
          <h2 id="cta-title" className="mx-auto mt-7 text-[clamp(2.8rem,6.5vw,5.3rem)] font-normal leading-[1.08] tracking-[-0.038em] text-[#253029]" style={serif}>
            Start with a photo. <span className="block">Decide with context.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-[490px] text-[15px] leading-[1.8] text-[#58635b] sm:text-[17px]">Explore Visage AI for iPhone. One possible priority. Your routine. Your choice.</p>
          <div className="mt-7"><AppStoreLink from="closing" inverse /></div>
          <p className="mt-2 text-[12px] text-[#5e6860]">{copy.freeLabel} · No forced purchase</p>
        </div>
      </section>

      <footer className="border-t border-[#e1e4dd] bg-[#fafaf8]">
        <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-6 px-5 py-10 sm:flex-row sm:items-center sm:px-10 lg:px-14">
          <span className="text-[21px] font-normal tracking-[-0.02em] text-[#28312b]" style={serif}>Visage AI</span>
          <div className="flex flex-wrap gap-x-7 gap-y-3 text-[13px] text-[#526057]">
            <a href="/en/privacy" className="underline-offset-4 hover:underline">Privacy Policy</a>
            <a href="/en" className="underline-offset-4 hover:underline" data-analytics-id="app_landing_b2b_link_click" onClick={() => track("app_landing_b2b_link_click", { page: "/app" })}>
              For retailers
            </a>
          </div>
          <p className="text-[11px] text-[#657168]">© {new Date().getFullYear()} Visage AI · Beauty guidance only</p>
        </div>
      </footer>
    </main>
  );
}

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

const serif = { fontFamily: "Georgia, 'Times New Roman', serif" };

function Mark({ light = false }: { light?: boolean }) {
  return (
    <span aria-hidden="true" className={"inline-flex h-9 w-9 items-center justify-center rounded-full " + (light ? "bg-white/15" : "bg-[#f1e6ee]")}>
      <svg width="20" height="22" viewBox="0 0 24 26" fill="none">
        <path d="M12 22C5.5 17.5 3.5 11 5 3c5.3 2.1 8.1 8.2 7 19Z" fill={light ? "#f5e7ed" : "#684558"}/>
        <path d="M13 22c.5-7.7 3-14.1 8-17 1.5 8.3-1 14.5-8 17Z" fill={light ? "#d8bed6" : "#ad91b7"}/>
      </svg>
    </span>
  );
}

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
        "inline-flex min-h-11 items-center justify-center py-2 text-[15px] font-semibold tracking-[0.012em] underline decoration-1 underline-offset-[7px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#725175] " +
        (inverse ? "text-[#f8f2f5] decoration-[#d9c2d7] hover:text-white " : "text-[#584476] decoration-[#73578d] hover:text-[#392852]")
      }
    >
      Get Visage AI
    </a>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#825f80] sm:text-xs">{children}</p>;
}

export default function AppLandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fbf8f5] font-sans text-[#392b35]">
      <header className="relative z-20 bg-[#fbf9f7]">
        <nav aria-label="Main navigation" className="mx-auto flex max-w-7xl items-center px-6 py-3 sm:px-10 lg:px-12 lg:pt-9">
          <a href="#top" className="inline-flex min-h-11 items-center text-[18px] font-semibold tracking-[-0.01em] text-[#322b38] no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#725175]">
            Visage AI
          </a>
        </nav>
      </header>

      <section id="top" aria-labelledby="hero-title" className="relative isolate bg-[#fbf9f7]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse at 72% 53%, rgba(223,211,228,.52), transparent 48%), radial-gradient(ellipse at 18% 85%, rgba(241,233,220,.24), transparent 40%)" }} />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-y-3 px-6 pb-9 pt-2 sm:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.06fr)] lg:gap-x-16 lg:gap-y-7 lg:px-12 lg:pb-28 lg:pt-16">
          <h1 id="hero-title" className="max-w-[650px] text-[clamp(2.55rem,9vw,3.1rem)] font-normal leading-[1.03] tracking-[-0.042em] text-[#322b38] lg:col-start-1 lg:row-start-1 lg:text-[clamp(4.25rem,5.4vw,5.5rem)]" style={serif}>
            Not sure what <span className="block">to focus on?</span>
          </h1>
          <p className="text-[15px] leading-6 text-[#655d69] sm:text-[17px] lg:col-start-1 lg:row-start-2 lg:text-[21px]">
            One photo. One suggested priority.
          </p>
          <div className="mt-1 lg:col-start-1 lg:row-start-3 lg:mt-3">
            <div className="flex max-w-[370px] items-center gap-3 rounded-[17px] bg-[#f0ebf4] p-2 lg:max-w-[430px] lg:gap-5 lg:p-3">
              <Image
                src="/images/app-landing/496/photo-input-moment.svg"
                alt="Hand holding an iPhone for a photo-based skincare assessment"
                width={176}
                height={244}
                unoptimized
                className="h-[56px] w-[64px] shrink-0 rounded-[10px] object-cover object-center lg:h-[76px] lg:w-[88px]"
              />
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.07em] text-[#634e82] lg:text-xs">Photo input</p>
                <p className="mt-1 text-[13px] leading-[1.35] text-[#382f40] lg:text-base">Take or choose a photo</p>
              </div>
            </div>
          </div>
          <figure className="mt-1 min-w-0 lg:col-start-2 lg:row-start-1 lg:row-span-4 lg:mt-0 lg:self-center">
            <figcaption className="mb-2 text-[10px] font-semibold uppercase tracking-[0.075em] text-[#624c80] lg:mb-4 lg:text-xs">
              Example result <span className="font-normal normal-case tracking-normal text-[#706578]">· yours may differ</span>
            </figcaption>
            <Image
              src="/images/app-landing/496/todays-priority.png"
              alt="Unaltered official example of Today's Priority: Age-Defying Glow. Your suggested priority may differ."
              width={1086}
              height={660}
              priority
              sizes="(min-width: 1024px) 46vw, (min-width: 640px) 560px, calc(100vw - 48px)"
              className="block h-auto w-full rounded-sm shadow-[0_12px_30px_rgba(69,51,76,0.12)]"
            />
          </figure>
          <div className="flex flex-col items-start gap-1.5 lg:col-start-1 lg:row-start-4 lg:gap-2">
            <AppStoreLink from="hero" />
            <p className="max-w-[365px] text-[11px] leading-[1.45] text-[#645d67] sm:text-xs">
              Suggested when usable photo measurements are available. Cosmetic guidance only. Not a medical diagnosis.
            </p>
          </div>
        </div>
      </section>

      <section aria-label="Brand statement" className="border-y border-[#e9dfe0] bg-[#f5edeb] py-9">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-7 text-center sm:flex-row sm:text-left">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#967888]">Less noise. More intention.</p>
          <p className="text-2xl italic leading-snug text-[#51394b] sm:text-3xl" style={serif}>Your routine is yours to choose.</p>
        </div>
      </section>

      <section id="how" aria-labelledby="how-title" className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-12 lg:py-28">
        <div className="max-w-3xl">
          <Eyebrow>01 / A simpler way to start</Eyebrow>
          <h2 id="how-title" className="mt-5 text-[clamp(2.5rem,4.6vw,4.5rem)] font-normal leading-[1.08] tracking-[-0.045em]" style={serif}>Good skincare starts with <em className="text-[#9a7593]">a clearer question.</em></h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[#70616a] sm:text-lg">You do not need another ten-step routine. Start with what matters to you, get an available photo-based suggestion, and review your saved products separately.</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <div className="rounded-[25px] bg-[#eee4e5] px-7 pb-9 pt-8 sm:px-9">
            <p className="text-xs tracking-[0.2em] text-[#8a6e80]">01 / PHOTO</p>
            <div className="my-8 flex h-28 items-center justify-center">
              <svg width="125" height="110" viewBox="0 0 125 110" fill="none" aria-hidden="true">
                <rect x="19" y="24" width="87" height="65" rx="19" stroke="#826477" strokeWidth="2"/>
                <circle cx="63" cy="57" r="19" stroke="#826477" strokeWidth="2"/>
                <rect x="41" y="15" width="36" height="11" rx="5" fill="#d2b9c4"/>
                <circle cx="93" cy="38" r="4" fill="#ba9baa"/>
              </svg>
            </div>
            <h3 className="text-3xl font-normal text-[#45323f]" style={serif}>Take a photo</h3>
            <p className="mt-3 text-sm leading-7 text-[#6e5a66]">Begin a photo-based assessment with your camera or photo library. Some images may need to be retaken.</p>
          </div>
          <div className="rounded-[25px] bg-[#e6dbe8] px-7 pb-9 pt-8 sm:px-9">
            <p className="text-xs tracking-[0.2em] text-[#80647c]">02 / PRIORITY</p>
            <div className="my-8 flex h-28 items-center justify-center">
              <span className="rounded-2xl border border-white/85 bg-[#fcfaff] px-6 py-5 text-sm font-medium text-[#704e75] shadow-[0_10px_26px_rgba(74,45,75,0.10)]">✧ Today&apos;s Priority</span>
            </div>
            <h3 className="text-3xl font-normal text-[#45323f]" style={serif}>Find a focus</h3>
            <p className="mt-3 text-sm leading-7 text-[#6e5a66]">See a suggested beauty priority when the available measurements support one. It is not a medical diagnosis.</p>
          </div>
          <div className="rounded-[25px] bg-[#f0e9df] px-7 pb-9 pt-8 sm:px-9">
            <p className="text-xs tracking-[0.2em] text-[#847265]">03 / YOUR ROUTINE</p>
            <div className="my-8 flex h-28 items-center justify-center">
              <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#c4a99a] text-5xl text-[#967986]" style={serif}>✓</div>
            </div>
            <h3 className="text-3xl font-normal text-[#45323f]" style={serif}>Choose your next step</h3>
            <p className="mt-3 text-sm leading-7 text-[#6e5a66]">Look at the product categories you saved in My Routine. Keeping what you have is always an option.</p>
          </div>
        </div>
      </section>

      <section id="priority" aria-labelledby="priority-title" className="bg-[#eee5ed] px-6 py-20 sm:px-10 lg:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="order-2 lg:order-1">
            <Eyebrow>02 / Today&apos;s Priority</Eyebrow>
            <h2 id="priority-title" className="mt-6 text-[clamp(2.6rem,4.3vw,4.4rem)] font-normal leading-[1.08] tracking-[-0.05em]" style={serif}>
              A place to <span className="italic text-[#906d91]">begin.</span> Not a verdict.
            </h2>
            <p className="mt-7 max-w-lg text-base leading-8 text-[#6b5b66] sm:text-lg">
              A photo-based assessment can suggest one beauty priority using available measurements. The suggestion can help you decide what deserves your attention today.
            </p>
            <p className="mt-6 max-w-lg border-l-2 border-[#ad8fa8] pl-5 text-sm leading-7 text-[#746774]">Examples vary by photo and available measurements. Results are not diagnoses or a guarantee of improvement.</p>
          </div>
          <figure className="order-1 rounded-[32px] bg-[#d6c4d8] p-7 shadow-[0_25px_60px_rgba(74,43,72,0.08)] sm:p-12 lg:order-2">
            <div className="rounded-[27px] border border-white/80 bg-[#fff] p-4 shadow-[0_22px_40px_rgba(66,42,70,0.12)]">
              <Image src="/images/app-landing/496/todays-priority.png" width={1086} height={660} sizes="(min-width: 1024px) 490px, 85vw" alt="Actual captured example: Today's Priority card suggesting Age-Defying Glow" className="h-auto w-full rounded-xl" />
            </div>
            <figcaption className="mt-6 text-center text-xs font-medium tracking-wide text-[#5e4860]">Captured app example · not a promise of your result</figcaption>
          </figure>
        </div>
      </section>

      <section id="routine" aria-labelledby="routine-title" className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 sm:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24 lg:px-12 lg:py-28">
        <figure className="rounded-[30px] bg-[#f0e3dd] p-8 shadow-[0_22px_60px_rgba(76,50,49,0.07)] sm:p-12">
          <div className="mx-auto max-w-[360px] rounded-[25px] bg-white p-4 shadow-[0_15px_45px_rgba(81,59,66,0.12)]">
            <Image src="/images/app-landing/496/routine-check.png" width={1080} height={970} sizes="(min-width: 1024px) 400px, 75vw" alt="Actual Routine Check share card: Cleanser not listed in My Routine; category presence only" className="h-auto w-full rounded-xl" />
          </div>
          <figcaption className="mt-6 text-center text-xs leading-6 text-[#7e6872]">Example saved-category check, separate from Today&apos;s Priority</figcaption>
        </figure>
        <div>
          <Eyebrow>03 / Less shopping pressure</Eyebrow>
          <h2 id="routine-title" className="mt-6 text-[clamp(2.65rem,4.5vw,4.5rem)] font-normal leading-[1.08] tracking-[-0.052em]" style={serif}>
            What you already have <em className="text-[#a07b97]">matters.</em>
          </h2>
          <p className="mt-7 max-w-lg text-base leading-8 text-[#6b5b66] sm:text-lg">
            Routine Check shows whether a product category appears in your saved My Routine list. It lets you pause and review rather than assume every new recommendation means another purchase.
          </p>
          <div className="mt-8 rounded-2xl border border-[#e4d8dc] bg-[#faf5f2] px-6 py-5 text-sm leading-7 text-[#665660]">
            <span className="font-semibold text-[#45323f]">What it does not tell you:</span> whether a product is suitable, effective, actually used, or enough for your whole routine. An unlisted category is not an instruction to buy.
          </div>
          <p className="mt-6 text-sm italic text-[#786670]" style={serif}>Keep it. Rethink it. Or decide not to buy.</p>
        </div>
      </section>

      <section aria-labelledby="journey-title" className="border-y border-[#ebdfdd] bg-[#f7eee9] px-6 py-20 sm:px-10 lg:py-24">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-10 md:flex-row md:gap-20">
          <div className="max-w-[220px] shrink-0 rounded-[25px] bg-[#e7dae5] p-4 shadow-[0_15px_30px_rgba(80,57,78,0.08)]">
            <Image src="/images/app-landing/496/skin-journey.png" width={1146} height={2355} sizes="220px" alt="Actual Skin Journey comparison example; earlier and later scores are both 47" className="h-auto w-full rounded-2xl" />
          </div>
          <div className="max-w-2xl text-center md:text-left">
            <Eyebrow>04 / Your journey, your pace</Eyebrow>
            <h2 id="journey-title" className="mt-5 text-[clamp(2.5rem,4.4vw,4.2rem)] font-normal leading-[1.08] tracking-[-0.04em]" style={serif}>
              A little perspective, <em className="text-[#a07b97]">over time.</em>
            </h2>
            <p className="mt-6 text-base leading-8 text-[#6e6066] sm:text-lg">Return for another assessment and compare available measurements in Skin Journey. Changes in measurements are not proof that a skincare product caused them.</p>
            <p className="mt-4 text-xs leading-6 text-[#87767c]">The pictured example shows no measured score change and does not imply improved skin.</p>
          </div>
        </div>
      </section>

      <section id="get-app" aria-labelledby="cta-title" className="relative overflow-hidden bg-[#39293d] px-6 py-24 text-center text-white sm:px-10 lg:py-32">
        <div aria-hidden="true" className="pointer-events-none absolute -left-32 -top-24 h-[350px] w-[350px] rounded-full bg-[#b998b2]/20 blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -bottom-32 h-[350px] w-[350px] rounded-full bg-[#efc6ba]/15 blur-3xl" />
        <div className="relative mx-auto max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#d8bcd3]">Your next skincare decision</p>
          <h2 id="cta-title" className="mt-7 text-[clamp(3rem,6vw,5.6rem)] font-normal leading-[1.05] tracking-[-0.05em] text-white" style={serif}>
            Start with a photo.<br /><em className="text-[#dbbcd7]">Decide with context.</em>
          </h2>
          <p className="mx-auto mt-7 max-w-lg text-base leading-8 text-[#e4d9e3]">Explore Visage AI for iPhone. One possible priority. Your routine. Your choice.</p>
          <div className="mt-10"><AppStoreLink from="closing" inverse /></div>
          <p className="mt-5 text-sm text-[#d5c6d4]">{copy.freeLabel} · No forced purchase</p>
        </div>
      </section>

      <footer className="bg-[#f9f5f2] px-6 py-10 text-[#7e6b77] sm:px-10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <Mark />
            <span className="text-xl text-[#493443]" style={serif}>Visage AI</span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
            <a href="/en/privacy" className="underline-offset-4 hover:underline">Privacy Policy</a>
            <a href="/en" className="underline-offset-4 hover:underline" data-analytics-id="app_landing_b2b_link_click" onClick={() => track("app_landing_b2b_link_click", { page: "/app" })}>
              For retailers
            </a>
          </div>
          <p className="text-xs">© {new Date().getFullYear()} Visage AI · Beauty guidance only</p>
        </div>
      </footer>
    </main>
  );
}

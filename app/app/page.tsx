"use client";

import Image from "next/image";
import { track } from "@/app/lib/analytics";
import { getCurrentUtms } from "@/app/lib/utm-capture";

const APP_STORE_URL =
  "https://apps.apple.com/app/visage-ai-skin-advisor/id6748892785?ppid=2e97fead-211e-4219-a353-5ec1246b3730&pt=127999842&ct=owned-web-routine-sep26&mt=8";

function AppStoreButton({
  from,
  className = "",
  large = false,
}: {
  from: string;
  className?: string;
  large?: boolean;
}) {
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
      }}
      className={
        "inline-flex items-center justify-center rounded-2xl bg-[#5F46BE] px-7 py-4 text-base font-semibold text-white shadow-[0_15px_30px_rgba(95,70,190,0.25)] transition hover:opacity-90 " +
        (large ? "text-lg px-8 py-5 " : "") +
        className
      }
    >
      Download on the App Store
    </a>
  );
}

function StoryRow({
  eyebrow,
  title,
  body,
  imgSrc,
  imgAlt,
  reverse,
}: {
  eyebrow: string;
  title: string;
  body: string;
  imgSrc?: string;
  imgAlt?: string;
  reverse?: boolean;
}) {
  return (
    <div
      className={
        "flex flex-col items-center gap-10 py-14 md:py-20 md:gap-16 " +
        (reverse ? "md:flex-row-reverse" : "md:flex-row")
      }
    >
      <div className="w-full md:w-1/2">
        <p className="text-sm font-semibold tracking-wide text-[#5F46BE]">
          {eyebrow}
        </p>
        <h3 className="mt-3 text-2xl font-bold text-[#231C38] md:text-3xl">
          {title}
        </h3>
        <p className="mt-4 max-w-md text-base leading-relaxed text-[#4b4560] md:text-lg">
          {body}
        </p>
      </div>
      {imgSrc && (
        <div className="w-full max-w-[260px] md:w-1/2 md:max-w-[300px]">
          <Image
            src={imgSrc}
            alt={imgAlt ?? ""}
            width={1320}
            height={2778}
            className="w-full h-auto drop-shadow-[0_25px_50px_rgba(95,70,190,0.18)]"
            priority={false}
          />
        </div>
      )}
    </div>
  );
}

export default function AppLandingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#FAF8FF] to-[#E8E2F8] text-[#231C38]">
      {/* Hero — above the fold: brand, one value prop, one supporting line, one CTA, one visual */}
      <section className="mx-auto w-full max-w-6xl px-6 pt-12 text-center md:pt-20">
        <div className="text-sm font-bold tracking-[0.2em] text-[#5F46BE]">
          VISAGE AI
        </div>
        <h1 className="mx-auto mt-4 max-w-2xl text-4xl font-bold leading-tight text-[#231C38] md:text-6xl">
          One clear priority.
          <br />
          Less guessing.
        </h1>
        <p className="mx-auto mt-5 max-w-md text-lg text-[#4b4560] md:text-xl">
          Take a photo to understand what to focus on today.
        </p>
        <div className="mt-8 flex justify-center">
          <AppStoreButton from="hero" large />
        </div>
        <div className="mx-auto mt-12 w-full max-w-[280px] md:max-w-[320px]">
          <Image
            src="/images/app-landing/priority.png"
            alt="Visage AI Analysis Result showing today's one clear priority: Daily UV Protection"
            width={1320}
            height={1140}
            className="w-full h-auto drop-shadow-[0_30px_60px_rgba(95,70,190,0.22)]"
            priority
          />
        </div>
      </section>

      {/* No-buy differentiation — moved up, one of the strongest early messages */}
      <section className="mx-auto max-w-2xl px-6 pt-20 pb-4 text-center md:pt-28">
        <h2 className="text-2xl font-bold leading-snug text-[#231C38] md:text-4xl">
          Sometimes the best recommendation is not another product.
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-[#4b4560] md:text-lg">
          Visage AI checks what you already use first. If your routine
          already covers it, buying more may not make sense. When a real gap
          remains, one product may be worth considering.
        </p>
      </section>

      {/* Product story */}
      <section className="mx-auto max-w-5xl px-6">
        <div className="border-t border-[#E0D6F5]" />
        <StoryRow
          eyebrow="ONE CLEAR PRIORITY"
          title="Understand what to focus on today"
          body="Take a photo and Visage AI surfaces one clear priority, not a dashboard of numbers to interpret on your own."
        />
        <div className="border-t border-[#E0D6F5]" />
        <StoryRow
          eyebrow="YOUR ROUTINE FIRST"
          title="See whether your routine already covers it"
          body="Before considering another product, Visage AI checks it against what you already use. No extra purchase needed is a valid answer."
          imgSrc="/images/app-landing/routine-covered.png"
          imgAlt="Visage AI showing that the current routine already covers the relevant category"
          reverse
        />
        <div className="border-t border-[#E0D6F5]" />
        <StoryRow
          eyebrow="COME BACK AND COMPARE"
          title="Come back later and compare"
          body="Complete another analysis later to compare available measured results in Skin Journey — described plainly, without promising a particular outcome."
          imgSrc="/images/app-landing/skin-journey.png"
          imgAlt="Visage AI Skin Journey comparing a first and latest measurement"
        />
        <div className="border-t border-[#E0D6F5]" />
        <StoryRow
          eyebrow="KEEP IT GROUNDED IN WHAT YOU USE"
          title="Your routine, grounded in what you actually use"
          body="My Routine reflects the products you're really using today — not a wishlist, not a fabricated ideal routine. When routine context matters, product decisions start from that current-use truth."
          imgSrc="/images/app-landing/my-routine.png"
          imgAlt="Visage AI My Routine screen listing current products"
          reverse
        />
      </section>

      {/* Trust — compact, scannable */}
      <section className="mx-auto max-w-2xl px-6 py-16 md:py-24">
        <h2 className="text-center text-2xl font-bold text-[#231C38] md:text-3xl">
          Built to be honest with you
        </h2>
        <ul className="mx-auto mt-8 grid max-w-lg grid-cols-1 gap-x-8 gap-y-3 text-base text-[#4b4560] sm:grid-cols-2 md:text-lg">
          {[
            "No identity recognition",
            "No forced purchase",
            "Beauty guidance, not medical diagnosis",
            "Measured history without guaranteed improvement",
          ].map((line) => (
            <li key={line} className="flex gap-2">
              <span className="text-[#5F46BE]">•</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center text-sm text-[#6b6580]">
          <a href="/en/privacy" className="underline hover:text-[#231C38]">
            Privacy Policy
          </a>
        </p>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-3xl px-6 pb-20 text-center md:pb-28">
        <h2 className="text-2xl font-bold text-[#231C38] md:text-3xl">
          Start with one photo.
        </h2>
        <div className="mt-8">
          <AppStoreButton from="closing" large />
        </div>
      </section>

      {/* Minimal footer */}
      <footer className="border-t border-[#E0D6F5] bg-white/60 px-6 py-10 text-center text-sm text-[#6b6580]">
        <div className="font-semibold text-[#231C38]">Visage AI</div>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <a href="/en/privacy" className="hover:text-[#231C38]">
            Privacy
          </a>
          <a
            href="/en"
            className="hover:text-[#231C38]"
            data-analytics-id="app_landing_b2b_link_click"
            onClick={() =>
              track("app_landing_b2b_link_click", { page: "/app" })
            }
          >
            For retailers
          </a>
        </div>
        <div className="mt-4 text-xs text-[#9c95b0]">
          © {new Date().getFullYear()} Visage AI
        </div>
      </footer>
    </main>
  );
}

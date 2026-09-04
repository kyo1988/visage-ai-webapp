"use client";

import Image from "next/image";
import { track } from "@/app/lib/analytics";

const APP_STORE_URL =
  "https://apps.apple.com/app/visage-ai-skin-advisor/id6748892785";

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
      onClick={() => track("app_store_cta_click", { from, page: "/app" })}
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
        <p className="text-sm font-bold tracking-wide text-[#5F46BE]">
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
            alt="Visage AI Analysis Result showing today's one clear priority"
            width={1320}
            height={2638}
            className="w-full h-auto drop-shadow-[0_30px_60px_rgba(95,70,190,0.22)]"
            priority
          />
        </div>
      </section>

      {/* Product story */}
      <section className="mx-auto max-w-5xl px-6">
        <div className="border-t border-[#E0D6F5]" />
        <StoryRow
          eyebrow="01 — ONE CLEAR PRIORITY"
          title="Understand what to focus on today"
          body="Take a photo and Visage AI surfaces one clear priority, not a dashboard of numbers to interpret on your own."
        />
        <div className="border-t border-[#E0D6F5]" />
        <StoryRow
          eyebrow="02 — CHECK WHAT YOU ALREADY USE"
          title="See whether your routine already covers it"
          body="Before considering another product, Visage AI checks it against what you already use. No extra purchase needed is a valid, common answer."
          imgSrc="/images/app-landing/routine-covered.png"
          imgAlt="Visage AI showing that the current routine already covers the relevant category"
          reverse
        />
        <div className="border-t border-[#E0D6F5]" />
        <StoryRow
          eyebrow="03 — RETURN AND COMPARE"
          title="Come back later and compare"
          body="Complete another analysis later to compare available measured results in Skin Journey — described plainly, without promising a particular outcome."
          imgSrc="/images/app-landing/skin-journey.png"
          imgAlt="Visage AI Skin Journey comparing a first and latest measurement"
        />
        <div className="border-t border-[#E0D6F5]" />
        <StoryRow
          eyebrow="04 — USEFUL CONTEXT FOR TODAY"
          title="Simple guidance, grounded in your routine"
          body="When truthful current context is available, Visage AI can offer simple day-to-day guidance without asking for another full analysis — and your routine stays part of the picture, always at hand."
          imgSrc="/images/app-landing/my-routine.png"
          imgAlt="Visage AI My Routine screen listing current products"
          reverse
        />
      </section>

      {/* Trust */}
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <h2 className="text-center text-2xl font-bold text-[#231C38] md:text-3xl">
          Built to be honest with you
        </h2>
        <ul className="mt-8 space-y-4 text-base text-[#4b4560] md:text-lg">
          {[
            "Beauty and self-care guidance, not medical diagnosis or treatment advice.",
            "No identity recognition.",
            "Your existing routine may already be enough — Visage AI doesn't have to recommend another purchase.",
            "Measured history is presented plainly, without guaranteeing improvement.",
            "Privacy-safe sharing does not require sharing a face image.",
          ].map((line) => (
            <li key={line} className="flex gap-3">
              <span className="mt-1 text-[#5F46BE]">•</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
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

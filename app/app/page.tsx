"use client";

import Image from "next/image";
import { track } from "@/app/lib/analytics";
import { getCurrentUtms } from "@/app/lib/utm-capture";
import messages from "@/messages/en.json";

// /app is the existing English consumer destination. Keep the localized
// /en and /ja site routes and their locale switcher unchanged.
const copy = messages.landing.consumerApp;

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
        "inline-flex min-h-12 max-w-full items-center justify-center rounded-full bg-[#5F46BE] px-7 py-4 text-center text-base font-semibold leading-snug text-white shadow-[0_8px_24px_rgba(95,70,190,0.16)] transition hover:bg-[#513BA6] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5F46BE] " +
        (large ? "md:text-lg md:px-8 " : "") +
        className
      }
    >
      {copy.appStoreCta}
    </a>
  );
}

function StoryRow({
  eyebrow,
  title,
  body,
  imgSrc,
  imgAlt,
  imgHeight = 2868,
  reverse,
}: {
  eyebrow: string;
  title: string;
  body: string;
  imgSrc?: string;
  imgAlt?: string;
  imgHeight?: number;
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
            height={imgHeight}
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
    <main className="min-h-screen bg-gradient-to-b from-[#FAF8FF] to-[#E8E2F8] text-[#231C38] [&_a]:focus-visible:outline [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-offset-4 [&_a]:focus-visible:outline-[#5F46BE]">
      <section aria-labelledby="app-hero-title" className="mx-auto w-full max-w-6xl px-6 pt-8 md:pt-12">
        <div className="text-sm font-semibold tracking-[0.2em] text-[#5F46BE]">
          VISAGE AI
        </div>
        <div className="grid items-center gap-10 pb-14 pt-7 md:grid-cols-[1.35fr_0.8fr] md:gap-16 md:pb-20 md:pt-12">
          <div>
            <h1 id="app-hero-title" className="max-w-2xl text-[2.15rem] font-semibold leading-[1.13] tracking-[-0.03em] text-[#231C38] sm:text-5xl lg:text-[3.25rem]">
              {copy.heroTitle}
            </h1>
            <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-[#4b4560] md:text-lg">
              {copy.heroBody}
            </p>
            <div className="mt-7">
              <AppStoreButton from="hero" large />
              <p className="mt-3 text-sm text-[#4b4560]">{copy.freeLabel}</p>
            </div>
          </div>
          <figure className="mx-auto w-full max-w-[280px] md:max-w-[300px]">
            <Image
              src="/images/app-landing/routine-covered.png"
              alt={copy.heroAlt}
              width={1320}
              height={2638}
              sizes="(min-width: 768px) 300px, 280px"
              className="h-auto w-full drop-shadow-[0_20px_40px_rgba(95,70,190,0.14)]"
              priority
            />
            <figcaption className="mt-4 text-sm leading-relaxed text-[#6b6580]">
              {copy.screenDisclosure}
            </figcaption>
          </figure>
        </div>
      </section>

      <section aria-labelledby="app-steps-title" className="mx-auto max-w-5xl px-6">
        <h2 id="app-steps-title" className="max-w-xl text-3xl font-semibold leading-tight tracking-tight text-[#231C38] md:text-4xl">{copy.stepsTitle}</h2>
        <StoryRow
          eyebrow={copy.step1Eyebrow}
          title={copy.step1Title}
          body={copy.step1Body}
          imgSrc="/images/app-landing/priority.png"
          imgAlt={copy.step1Alt}
          imgHeight={1140}
        />
        <div className="border-t border-[#E0D6F5]" />
        <StoryRow
          eyebrow={copy.step2Eyebrow}
          title={copy.step2Title}
          body={copy.step2Body}
          imgSrc="/images/app-landing/my-routine.png"
          imgAlt={copy.step2Alt}
          reverse
        />
        <div className="border-t border-[#E0D6F5]" />
        <StoryRow
          eyebrow={copy.step3Eyebrow}
          title={copy.step3Title}
          body={copy.step3Body}
          imgSrc="/images/app-landing/routine-covered.png"
          imgAlt={copy.step3Alt}
          imgHeight={2638}
        />
        <p className="max-w-3xl pb-14 text-base leading-relaxed text-[#4b4560] md:pb-20">{copy.routineLimit}</p>
        <div className="border-t border-[#E0D6F5]" />
        <StoryRow
          eyebrow={copy.journeyEyebrow}
          title={copy.journeyTitle}
          body={copy.journeyBody}
          imgSrc="/images/app-landing/skin-journey.png"
          imgAlt={copy.journeyAlt}
          reverse
        />
      </section>

      {/* Trust — compact, scannable */}
      <section className="mx-auto max-w-2xl px-6 py-16 md:py-24">
        <h2 className="text-center text-2xl font-bold text-[#231C38] md:text-3xl">
          {copy.trustTitle}
        </h2>
        <ul className="mx-auto mt-8 grid max-w-lg grid-cols-1 gap-x-8 gap-y-3 text-base text-[#4b4560] sm:grid-cols-2 md:text-lg">
          {[
            copy.trustIdentity,
            copy.trustPurchase,
            copy.trustMedical,
            copy.trustHistory,
          ].map((line) => (
            <li key={line} className="flex gap-2">
              <span className="text-[#5F46BE]">•</span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-center text-sm text-[#6b6580]">
          <a href="/en/privacy" className="underline hover:text-[#231C38]">
            {copy.privacyPolicy}
          </a>
        </p>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-3xl px-6 pb-20 text-center md:pb-28">
        <h2 className="text-2xl font-bold text-[#231C38] md:text-3xl">
          {copy.closingTitle}
        </h2>
        <div className="mt-8">
          <AppStoreButton from="closing" large />
          <p className="mt-3 text-sm text-[#4b4560]">{copy.freeLabel}</p>
        </div>
      </section>

      {/* Minimal footer */}
      <footer className="border-t border-[#E0D6F5] bg-white/60 px-6 py-10 text-center text-sm text-[#6b6580]">
        <div className="font-semibold text-[#231C38]">Visage AI</div>
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <a href="/en/privacy" className="hover:text-[#231C38]">
            {copy.privacy}
          </a>
          <a
            href="/en"
            className="hover:text-[#231C38]"
            data-analytics-id="app_landing_b2b_link_click"
            onClick={() =>
              track("app_landing_b2b_link_click", { page: "/app" })
            }
          >
            {copy.retailers}
          </a>
        </div>
        <div className="mt-4 text-xs text-[#9c95b0]">
          © {new Date().getFullYear()} Visage AI
        </div>
      </footer>
    </main>
  );
}

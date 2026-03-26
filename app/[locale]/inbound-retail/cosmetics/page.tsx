import type { Metadata } from "next";
import LPTracker from "@/components/LPTracker";
import TrackedCTA from "@/components/TrackedCTA";

export const dynamic = "force-static";

async function getT(locale: string) {
  const messages = (
    await import(`../../../../messages/${locale}.json`)
  ).default as Record<string, any>;
  const ns = messages["inboundRetailCosmetics"] ?? {};
  return function t(path: string): any {
    return path.split(".").reduce<any>((o, k) => (o != null ? o[k] : undefined), ns) ?? path;
  };
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const isJa = locale === "ja";
  return {
    title: isJa
      ? "インバウンド向け AI スキンケアカウンセリング | Visage AI"
      : "AI Skincare Counseling for Inbound Retail | Visage AI",
    description: isJa
      ? "外国人観光客の購買体験をAIでパーソナライズ。多言語対応のスキンケア解析で客単価向上をサポートします。"
      : "Personalize every inbound tourist's skincare experience with on-device AI. Multilingual skin analysis that drives conversion.",
    alternates: {
      canonical: `/${locale}/inbound-retail/cosmetics`,
    },
  };
}

const PAGE_ID = "inbound_retail_cosmetics_lp";

export default async function InboundRetailCosmeticsLP({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getT(locale);

  const painItems: string[] = t("pain.items");
  const featureCards: { num: string; title: string; body: string }[] = t("features.cards");
  const quotes: { quote: string; attr: string }[] = t("social.quotes");

  return (
    <main>
      {/* UTM capture + lp_viewed event（client-side）*/}
      <LPTracker pageId={PAGE_ID} />

      {/* Hero */}
      <section
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)",
          color: "#f0f0f0",
          padding: "80px 24px 64px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontSize: "12px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#a0c4ff",
            marginBottom: "16px",
          }}
        >
          {t("badge")}
        </p>
        <h1
          style={{
            fontSize: "clamp(28px, 5vw, 48px)",
            fontWeight: 700,
            lineHeight: 1.3,
            marginBottom: "24px",
            whiteSpace: "pre-line",
          }}
        >
          {t("hero.h1")}
        </h1>
        <p
          style={{
            fontSize: "16px",
            color: "#c0c0d0",
            maxWidth: "560px",
            margin: "0 auto 40px",
            lineHeight: 1.7,
          }}
        >
          {t("hero.sub")}
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <TrackedCTA
            href={`/${locale}/demo`}
            ctaId="hero_demo"
            pageId={PAGE_ID}
            label={t("hero.primaryCta")}
            variant="primary"
          />
          <TrackedCTA
            href={`/${locale}/contact`}
            ctaId="hero_contact"
            pageId={PAGE_ID}
            label={t("hero.secondaryCta")}
            variant="outline"
          />
        </div>
      </section>

      {/* Proof bar */}
      <section
        style={{
          background: "#f0f4ff",
          padding: "24px",
          textAlign: "center",
          fontSize: "14px",
          color: "#4f46e5",
          borderBottom: "1px solid #e0e7ff",
        }}
      >
        <span style={{ marginRight: "32px" }}>🌏 {t("proof.multilingual")}</span>
        <span style={{ marginRight: "32px" }}>📱 {t("proof.offline")}</span>
        <span>🔒 {t("proof.privacy")}</span>
      </section>

      {/* Pain Points */}
      <section style={{ padding: "64px 24px", maxWidth: "900px", margin: "0 auto" }}>
        <h2
          style={{ fontSize: "24px", fontWeight: 700, marginBottom: "32px", textAlign: "center" }}
        >
          {t("pain.heading")}
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px",
          }}
        >
          {painItems.map((text: string) => (
            <div
              key={text}
              style={{
                padding: "24px",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                background: "#fafafa",
              }}
            >
              <p style={{ fontSize: "15px", lineHeight: 1.6, margin: 0 }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: "64px 24px", background: "#f8f9ff", maxWidth: "100%" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2
            style={{ fontSize: "24px", fontWeight: 700, marginBottom: "32px", textAlign: "center" }}
          >
            {t("features.heading")}
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px",
            }}
          >
            {featureCards.map(({ num, title, body }) => (
              <div
                key={num}
                style={{
                  padding: "28px",
                  borderRadius: "8px",
                  background: "#fff",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                    fontWeight: 700,
                    color: "#4f46e5",
                    letterSpacing: "0.1em",
                    marginBottom: "10px",
                  }}
                >
                  {num}
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "12px" }}>
                  {title}
                </h3>
                <p style={{ fontSize: "14px", color: "#555", lineHeight: 1.7, margin: 0 }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section style={{ padding: "64px 24px", maxWidth: "900px", margin: "0 auto" }}>
        <h2
          style={{ fontSize: "24px", fontWeight: 700, marginBottom: "32px", textAlign: "center" }}
        >
          {t("social.heading")}
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {quotes.map(({ quote, attr }) => (
            <div
              key={attr}
              style={{
                padding: "24px",
                borderRadius: "8px",
                background: "#f0f4ff",
                border: "1px solid #c7d2fe",
              }}
            >
              <p
                style={{
                  fontSize: "15px",
                  lineHeight: 1.7,
                  margin: "0 0 12px",
                  fontStyle: "italic",
                }}
              >
                &ldquo;{quote}&rdquo;
              </p>
              <p style={{ fontSize: "12px", color: "#6366f1", margin: 0 }}>{attr}</p>
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", marginTop: "24px", fontSize: "12px", color: "#999" }}>
          {t("social.disclaimer")}
        </p>
      </section>

      {/* Mid-page CTA */}
      <section
        style={{
          padding: "40px 24px",
          background: "#f8f9ff",
          textAlign: "center",
          borderTop: "1px solid #e0e7ff",
          borderBottom: "1px solid #e0e7ff",
        }}
      >
        <p style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px" }}>
          {t("midCta.lead")}
        </p>
        <TrackedCTA
          href={`/${locale}/demo`}
          ctaId="mid_page_demo"
          pageId={PAGE_ID}
          label={t("midCta.cta")}
          variant="primary"
        />
      </section>

      {/* Bottom CTA */}
      <section
        style={{
          background: "#1a1a2e",
          color: "#f0f0f0",
          padding: "64px 24px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "24px", fontWeight: 700, marginBottom: "16px" }}>
          {t("bottomCta.heading")}
        </h2>
        <p style={{ color: "#c0c0d0", marginBottom: "32px", fontSize: "15px" }}>
          {t("bottomCta.sub")}
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <TrackedCTA
            href={`/${locale}/demo`}
            ctaId="bottom_demo"
            pageId={PAGE_ID}
            label={t("bottomCta.primaryCta")}
            variant="primary"
          />
          <TrackedCTA
            href={`/${locale}/contact`}
            ctaId="bottom_contact"
            pageId={PAGE_ID}
            label={t("bottomCta.secondaryCta")}
            variant="outline-light"
          />
        </div>
        <p style={{ marginTop: "16px", fontSize: "12px", color: "#888" }}>
          {t("bottomCta.disclaimer")}
        </p>
      </section>
    </main>
  );
}

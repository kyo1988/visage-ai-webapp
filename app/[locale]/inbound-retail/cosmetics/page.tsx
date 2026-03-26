import type { Metadata } from "next";
import Link from "next/link";
import LPTracker from "@/components/LPTracker";
import TrackedCTA from "@/components/TrackedCTA";

export const metadata: Metadata = {
  title: "インバウンド向け AI スキンケアカウンセリング | Visage AI",
  description:
    "外国人観光客の購買体験をAIでパーソナライズ。多言語対応のスキンケア解析で客単価向上をサポートします。",
  alternates: {
    canonical: "/ja/inbound-retail/cosmetics",
  },
};

const PAGE_ID = "inbound_retail_cosmetics_lp";

export default function InboundRetailCosmeticsLP({
  params: { locale },
}: {
  params: { locale: string };
}) {
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
          Inbound Retail &times; AI Skincare
        </p>
        <h1
          style={{
            fontSize: "clamp(28px, 5vw, 48px)",
            fontWeight: 700,
            lineHeight: 1.3,
            marginBottom: "24px",
          }}
        >
          外国人観光客の購買体験を<br />
          AIでパーソナライズする
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
          多言語対応のオンデバイスAIが肌状態を解析。スタッフ不要で最適な
          スキンケアを提案し、客単価向上をサポートします。
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <TrackedCTA
            href={`/${locale}/demo`}
            ctaId="hero_demo"
            pageId={PAGE_ID}
            label="デモを予約する"
            variant="primary"
          />
          <TrackedCTA
            href={`/${locale}/contact`}
            ctaId="hero_contact"
            pageId={PAGE_ID}
            label="資料請求"
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
        <span style={{ marginRight: "32px" }}>🌏 多言語対応（EN / ZH / KO / JA）</span>
        <span style={{ marginRight: "32px" }}>📱 オンデバイス AI — インターネット不要</span>
        <span>🔒 顔データは端末外に保存しない</span>
      </section>

      {/* Pain Points */}
      <section style={{ padding: "64px 24px", maxWidth: "900px", margin: "0 auto" }}>
        <h2
          style={{ fontSize: "24px", fontWeight: 700, marginBottom: "32px", textAlign: "center" }}
        >
          こんなお悩みはありませんか？
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "24px",
          }}
        >
          {[
            {
              icon: "🌏",
              text: "多国語での接客スキルがスタッフ不足で対応しきれない",
            },
            {
              icon: "💬",
              text: "外国人顧客のスキンケアニーズを的確に把握できていない",
            },
            {
              icon: "📉",
              text: "インバウンド需要はあるが客単価が上がらない",
            },
          ].map(({ icon, text }) => (
            <div
              key={text}
              style={{
                padding: "24px",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                background: "#fafafa",
              }}
            >
              <div style={{ fontSize: "32px", marginBottom: "12px" }}>{icon}</div>
              <p style={{ fontSize: "15px", lineHeight: 1.6, margin: 0 }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section
        style={{ padding: "64px 24px", background: "#f8f9ff", maxWidth: "100%" }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2
            style={{ fontSize: "24px", fontWeight: 700, marginBottom: "32px", textAlign: "center" }}
          >
            Visage AI が解決する 3 つの機能
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px",
            }}
          >
            {[
              {
                num: "01",
                title: "iPad で完結する AI スキン解析",
                body: "オンデバイス処理でインターネット不要。肌状態を解析し多言語で結果を表示。顔データは端末外に保存されません。",
              },
              {
                num: "02",
                title: "QR コードで EC 購買につなぐ",
                body: "解析結果をQRコードで渡すと、顧客がスマートフォンから推薦商品をそのまま購入可能。オフライン購買の機会損失を防ぎます。",
              },
              {
                num: "03",
                title: "店舗別の月次レポート",
                body: "肌タイプ分布・人気商品・客単価の推移をダッシュボードで確認。バイヤーへの仕入れ交渉にも活用できます。",
              },
            ].map(({ num, title, body }) => (
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

      {/* Social Proof / 導入イメージ */}
      <section style={{ padding: "64px 24px", maxWidth: "900px", margin: "0 auto" }}>
        <h2
          style={{ fontSize: "24px", fontWeight: 700, marginBottom: "32px", textAlign: "center" }}
        >
          導入店舗の声
        </h2>
        {/* TODO: 実際の導入事例に差し替える */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {[
            {
              quote: "言語の壁なく接客できるようになり、外国人客の滞在時間が伸びました。",
              attr: "都内コスメセレクトショップ（導入準備中）",
            },
            {
              quote: "QR を渡すとスマホで続きを見てくれる。閉店後の購買につながります。",
              attr: "京都インバウンド対応ドラッグストア（導入準備中）",
            },
          ].map(({ quote, attr }) => (
            <div
              key={attr}
              style={{
                padding: "24px",
                borderRadius: "8px",
                background: "#f0f4ff",
                border: "1px solid #c7d2fe",
              }}
            >
              <p style={{ fontSize: "15px", lineHeight: 1.7, margin: "0 0 12px", fontStyle: "italic" }}>
                "{quote}"
              </p>
              <p style={{ fontSize: "12px", color: "#6366f1", margin: 0 }}>{attr}</p>
            </div>
          ))}
        </div>
        <p style={{ textAlign: "center", marginTop: "24px", fontSize: "12px", color: "#999" }}>
          ※コメントは現時点のパイロット想定です。実際の効果は店舗・条件により異なります。
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
          まずは 30 分のオンラインデモで確認できます。
        </p>
        <TrackedCTA
          href={`/${locale}/demo`}
          ctaId="mid_page_demo"
          pageId={PAGE_ID}
          label="デモを予約する（無料）"
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
          まずはデモで体験してみてください
        </h2>
        <p style={{ color: "#c0c0d0", marginBottom: "32px", fontSize: "15px" }}>
          30分のオンラインデモで、実際の解析フローをご覧いただけます。
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <TrackedCTA
            href={`/${locale}/demo`}
            ctaId="bottom_demo"
            pageId={PAGE_ID}
            label="デモを予約する（無料）"
            variant="primary"
          />
          <TrackedCTA
            href={`/${locale}/contact`}
            ctaId="bottom_contact"
            pageId={PAGE_ID}
            label="まず資料を見る"
            variant="outline-light"
          />
        </div>
        <p style={{ marginTop: "16px", fontSize: "12px", color: "#888" }}>
          ※実際の効果は店舗・条件により異なります
        </p>
      </section>
    </main>
  );
}

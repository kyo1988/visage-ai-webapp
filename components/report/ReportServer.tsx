import RadarSVG from "./RadarSVG";
import ReportSection from "./ReportSection";
import ProductGridClient from "./ProductGridClient";
import ReportClient from "@/app/[locale]/report/[id]/ReportClient";
import SectionObserverClient from "../analytics/SectionObserverClient";
import { fetchReportById } from "@/app/lib/report-api";
import { getMessages } from "@/app/lib/messages";
import type { Report } from "@/types/report";

// 肌タイプの型定義
type SkinType = "oily" | "dry" | "combination" | "sensitive" | "normal";

// 肌タイプ別推奨成分を表示するコンポーネント
async function SkinTypeRecommendations({ skinType, locale }: { skinType: string; locale: "ja" | "en" }) {
  const ingredients = await getIngredientRecommendationsBySkinType(skinType, locale);
  
  if (!ingredients || ingredients.length === 0) {
    return null;
  }
  
  return (
    <div style={{marginBottom: '2rem'}}>
      <ReportSection title={locale === 'ja' ? '肌タイプ別推奨成分' : 'Skin Type Based Recommendations'}>
        <div style={{display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'}}>
          {ingredients.map((ingredient, index) => (
            <div key={index} style={{backgroundColor: 'white', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem'}}>
                <div style={{width: '2rem', height: '2rem', backgroundColor: '#e0f2fe', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <span style={{color: '#0369a1', fontSize: '0.875rem', fontWeight: '600'}}>
                    {ingredient.name.charAt(0)}
                  </span>
                </div>
                <h4 style={{fontWeight: '600', color: '#111827', margin: 0}}>{ingredient.name}</h4>
              </div>
              <p style={{fontSize: '0.875rem', color: '#4b5563', lineHeight: '1.5', margin: 0}}>{ingredient.desc}</p>
            </div>
          ))}
        </div>
      </ReportSection>
    </div>
  );
}

// イングラディエントの型定義
interface IngredientRecommendation {
  name: string;
  desc: string;
}

// 肌タイプ別のイングラディエント推奨を取得する関数
async function getIngredientRecommendationsBySkinType(skinType: string, locale: "ja" | "en"): Promise<IngredientRecommendation[]> {
  try {
    const messages = await getMessages(locale);
    const recommendations = messages?.ingredientRecommendations;
    
    if (recommendations && recommendations[skinType.toLowerCase()]) {
      return recommendations[skinType.toLowerCase()];
    }
    
    // フォールバック: デフォルトの推奨
    return recommendations?.normal || [];
  } catch (error) {
    console.warn('Failed to load ingredient recommendations from messages:', error);
    return [];
  }
}

export async function ReportServer({ id, locale, report }: { id: string; locale: "ja" | "en"; report: Report }) {
  const r = report;
  if (!r) return null;

  const dt = new Date(r.generatedAt).toLocaleString(locale === "ja" ? "ja-JP" : "en-US");

  return (
    <div style={{backgroundColor: '#f9fafb', minHeight: '100vh'}}>
      {/* データソースをsr-onlyで表示（デバッグ用） */}
      <div className="sr-only">
        source: {r._source || 'unknown'} runtime: {process.env.NEXT_RUNTIME || "node"}
      </div>
      
      <main style={{maxWidth: '72rem', margin: '0 auto', padding: '2rem 1rem', paddingBottom: '6rem'}} className="py-8 pb-24">
        {/* Header */}
        <header style={{marginBottom: '2rem'}}>
          <h1 style={{fontSize: '2.25rem', fontWeight: '700', lineHeight: '1.1', color: '#111827', marginBottom: '0.5rem'}}>{r.title}</h1>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.875rem', color: '#4b5563'}}>
            <span style={{backgroundColor: 'white', padding: '0.25rem 0.75rem', borderRadius: '9999px', border: '1px solid #d1d5db'}} suppressHydrationWarning>{dt}</span>
            <span style={{backgroundColor: '#e0f2fe', color: '#0369a1', border: '1px solid #7dd3fc', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '500'}}>XAI</span>
            <span style={{backgroundColor: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '500'}}>ランタイム: {process.env.NEXT_RUNTIME || "node"}</span>
          </div>
        </header>

        {/* Score + Profile Grid */}
        <div className="mt-4 grid gap-4">
          <ReportSection title={locale === 'ja' ? 'スコア' : 'Score'}>
            <div className="accent-bar mb-3"></div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="score-tile" style={{["--from" as any]:"var(--va-sky-100)",["--via" as any]:"var(--va-sky-200)",["--to" as any]:"var(--va-sky-300)"}}>
                <div className="score-reflection rounded-lg p-4">
                  <div className="text-3xl font-bold text-slate-900">{r.score.skinAge}</div>
                  <div className="text-xs text-slate-700">{locale === 'ja' ? '肌年齢' : 'Skin Age'}</div>
                </div>
              </div>
              <div className="score-tile" style={{["--from" as any]:"var(--va-vio-100)",["--via" as any]:"var(--va-vio-200)",["--to" as any]:"var(--va-vio-300)"}}>
                <div className="score-reflection rounded-lg p-4">
                  <div className="text-3xl font-bold text-slate-900">{r.score.rank}</div>
                  <div className="text-xs text-slate-700">{locale === 'ja' ? 'オーバーオールスコア' : 'Overall Score'}</div>
                </div>
              </div>
              <div className="score-tile" style={{["--from" as any]:"var(--va-emer-100)",["--via" as any]:"var(--va-emer-200)",["--to" as any]:"var(--va-emer-300)"}}>
                <div className="score-reflection rounded-lg p-4">
                  <div className="text-3xl font-bold text-slate-900">{r.skinType || '—'}</div>
                  <div className="text-xs text-slate-700">{locale === 'ja' ? 'スキンタイプ' : 'Skin Type'}</div>
                </div>
              </div>
            </div>
          </ReportSection>
          
          <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{locale === 'ja' ? 'プロフィール' : 'Profile'}</h2>
              <div className="accent-bar mb-3"></div>
            </div>
            <div className="mx-auto" style={{ width: "clamp(200px,60vw,400px)", height: "clamp(170px,50vw,340px)" }}>
              <RadarSVG labels={r.radar.labels} values={r.radar.values} locale={locale} />
            </div>
            
          </section>
        </div>

        {/* AI Insights */}
        <div id="insights" className="mt-4">
          <section className="section-muted">
            <h2 className="text-lg font-semibold">{locale === 'ja' ? 'AIインサイト' : 'AI Insights'}</h2>
            <div className="accent-bar mb-3"></div>
            {(() => {
              // センテンス分割の共通関数（NLP制限を理解した上で）
              const splitIntoSentences = (text: string): string[] => {
                return text
                  .split(/[。.!?]/)
                  .map(s => s.trim())
                  .filter(s => s.length > 0)
                  .slice(0, 6);
              };
              
              // insightsがある場合は各項目をセンテンス分割
              const raw = Array.isArray(r.insights) ? r.insights : [];
              let insights: string[] = [];
              
              if (raw.length) {
                // 各insightをセンテンス分割して配列に追加
                raw.forEach(insight => {
                  if (typeof insight === 'string') {
                    insights.push(...splitIntoSentences(insight));
                  }
                });
              } else if (r.summary) {
                // insightsがない場合はsummaryからセンテンス分割
                insights = splitIntoSentences(r.summary);
              }
              
              return (
                <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed">
                  {(insights.length ? insights : ["—"]).slice(0,6).map((s,i)=><li key={i}>{s}</li>)}
                </ul>
              );
            })()}
          </section>
        </div>

        {/* Routine Grid */}
        <div id="routines" className="mt-4 grid gap-4">
          <ReportSection title={locale === 'ja' ? '朝のルーチン' : 'AM Routine'}>
            <div className="accent-bar mb-3"></div>
            {r.routine?.am ? (
              <div className="rounded-xl border border-sky-200/60 bg-sky-50 p-4">
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem'}}>
                  <div style={{width: '0.75rem', height: '0.75rem', backgroundColor: '#0ea5e9', borderRadius: '50%'}}></div>
                  <p style={{fontWeight: '600', color: '#0c4a6e'}}>Goal: {r.routine.am.goal}</p>
                </div>
                <ol style={{listStyleType: 'decimal', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: '#0369a1'}}>
                  {r.routine.am.steps.map((s,i)=><li key={i}>{s}</li>)}
                </ol>
                <div style={{paddingTop: '0.75rem', borderTop: '1px solid #7dd3fc'}}>
                  <p style={{fontSize: '0.875rem', color: '#0369a1'}}><span style={{fontWeight: '500'}}>Ingredients:</span> {r.routine.am.ingredients.join(", ")}</p>
                  {r.routine.am.caution && (
                    <p style={{fontSize: '0.75rem', color: '#0284c7', marginTop: '0.5rem', padding: '0.5rem', backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '0.25rem'}}>{r.routine.am.caution}</p>
                  )}
                </div>
              </div>
            ) : <p style={{fontSize: '0.875rem', color: '#6b7280', textAlign: 'center', padding: '2rem'}}>N/A</p>}
          </ReportSection>
          
          <ReportSection title={locale === 'ja' ? '夜のルーチン' : 'PM Routine'}>
            <div className="accent-bar mb-3"></div>
            {r.routine?.pm ? (
              <div className="rounded-xl border border-violet-200/60 bg-violet-50 p-4">
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem'}}>
                  <div style={{width: '0.75rem', height: '0.75rem', backgroundColor: '#8b5cf6', borderRadius: '50%'}}></div>
                  <p style={{fontWeight: '600', color: '#5b21b6'}}>Goal: {r.routine.pm.goal}</p>
                </div>
                <ol style={{listStyleType: 'decimal', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: '#7c3aed'}}>
                  {r.routine.pm.steps.map((s,i)=><li key={i}>{s}</li>)}
                </ol>
                <div style={{paddingTop: '0.75rem', borderTop: '1px solid #c4b5fd'}}>
                  <p style={{fontSize: '0.875rem', color: '#7c3aed'}}><span style={{fontWeight: '500'}}>Ingredients:</span> {r.routine.pm.ingredients.join(", ")}</p>
                  {r.routine.pm.caution && (
                    <p style={{fontSize: '0.75rem', color: '#8b5cf6', marginTop: '0.5rem', padding: '0.5rem', backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '0.25rem'}}>{r.routine.pm.caution}</p>
                  )}
                </div>
              </div>
            ) : <p style={{fontSize: '0.875rem', color: '#6b7280', textAlign: 'center', padding: '2rem'}}>N/A</p>}
          </ReportSection>
          
          <ReportSection title={locale === 'ja' ? '週間' : 'Weekly'}>
            <div className="accent-bar mb-3"></div>
            {r.routine?.weekly ? (
              <div className="rounded-xl border border-emerald-200/60 bg-emerald-50 p-4">
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem'}}>
                  <div style={{width: '0.75rem', height: '0.75rem', backgroundColor: '#10b981', borderRadius: '50%'}}></div>
                  <p style={{fontWeight: '600', color: '#047857'}}>Goal: {r.routine.weekly.goal}</p>
                </div>
                <ol style={{listStyleType: 'decimal', paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.875rem', color: '#059669'}}>
                  {r.routine.weekly.steps.map((s,i)=><li key={i}>{s}</li>)}
                </ol>
                <div style={{paddingTop: '0.75rem', borderTop: '1px solid #6ee7b7'}}>
                  <p style={{fontSize: '0.875rem', color: '#059669'}}><span style={{fontWeight: '500'}}>Ingredients:</span> {r.routine.weekly.ingredients.join(", ")}</p>
                  {r.routine.weekly.caution && (
                    <p style={{fontSize: '0.75rem', color: '#047857', marginTop: '0.5rem', padding: '0.5rem', backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '0.25rem'}}>{r.routine.weekly.caution}</p>
                  )}
                </div>
              </div>
            ) : <p style={{fontSize: '0.875rem', color: '#6b7280', textAlign: 'center', padding: '2rem'}}>N/A</p>}
          </ReportSection>
        </div>

        {/* Skin Type Based Ingredient Recommendations */}
        {r.skinType && (
          <div id="ingredients">
            <SkinTypeRecommendations skinType={r.skinType} locale={locale} />
          </div>
        )}

        {/* Products Section */}
        <div id="products" className="mt-4">
          <ReportSection title={locale === 'ja' ? 'おすすめ商品' : 'Recommended Products'}>
            <div className="accent-bar mb-3"></div>
            <ProductGridClient products={r.products} tags={undefined} />
          </ReportSection>
        </div>

        {/* Fixed Actions */}
        <ReportClient reportId={r.id} />
      </main>
      
      {/* Section Observer for Analytics */}
      <SectionObserverClient ids={["insights","routines","ingredients","products"]} payload={{ reportId: r.id }} />
    </div>
  );
}

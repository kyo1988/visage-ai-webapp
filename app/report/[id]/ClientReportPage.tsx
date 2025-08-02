'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Sparkles, CakeSlice, Droplets, Target, Star, BrainCircuit, CalendarCheck2, Sun, Moon, FlaskConical, ShieldCheck, Zap, PackageCheck, ArrowRight } from 'lucide-react';

// FirestoreのクライアントSDKをインポート
import { db } from '@/app/lib/client'; // @ はプロジェクトルートを指すエイリアス
import { doc, getDoc } from "firebase/firestore";

import { FacebookShareButton, LineShareButton, TwitterShareButton, FacebookIcon, LineIcon, TwitterIcon, InstagramIcon } from 'next-share';

// --- 型定義セクション ---

// APIから受け取るレポートデータの型
interface ReportData {
  skinAge: number;
  skinType: string;
  createdAt: string;
  scores: {
    wrinkles: number;
    texture: number;
    pores: number;
    brightening: number;
    transparency: number;
    spots: number;
  };
}

// 翻訳データの各言語ごとのコンテンツの型
interface TranslationContent {
  title: string;
  subtitle: string;
  skinAge: string;
  skinType: string;
  concernArea: string;
  concernDefault: string;
  overallScore: string;
  yrs: string;
  oily: string;
  dry: string;
  combination: string;
  radarTitle: string;
  radarWrinkles: string;
  radarBrightness: string;
  radarSpots: string;
  radarClarity: string;
  radarTexture: string;
  radarPores: string;
  radarBarrier: string;
  radarLegendLow: string;
  radarLegendHigh: string;
  aiInsights: string;
  insightText: string;
  routineTitle: string;
  morningCare: string;
  nightCare: string;
  stepsMorning: string[];
  stepsNight: string[];
  ingredientsTitle: string;
  defensiveIng: string;
  defensiveList: string[];
  activeIng: string;
  activeList: string[];
  ctaTitle: string;
  ctaSubtitle: string;
  ctaButton: string;
}

// translationsオブジェクト全体の型
interface Translations {
  ja: TranslationContent;
  en: TranslationContent;
}


// --- 定数セクション ---

// 翻訳データ本体（型を適用）
const translations: Translations = {
  ja: {
    title: "パーソナルスキンケア診断レポート",
    subtitle: "あなたの肌を深く理解し、未来の美しさへ",
    skinAge: "肌年齢",
    skinType: "肌タイプ",
    concernArea: "気になる部位",
    concernDefault: "毛穴・透明感",
    overallScore: "総合評価",
    yrs: "歳",
    oily: "オイリー",
    dry: "乾燥肌",
    combination: "混合肌",
    radarTitle: "肌診断レーダーチャート",
    radarWrinkles: "しわ (少)",
    radarBrightness: "明るさ (高)",
    radarSpots: "シミ (少)",
    radarClarity: "透明感 (高)",
    radarTexture: "きめ (高)",
    radarPores: "毛穴 (少)",
    radarBarrier: "バリア (高)",
    radarLegendLow: "しわ・毛穴・シミは低いほど良好",
    radarLegendHigh: "他は高いほど良好",
    aiInsights: "AIからのインサイト",
    insightText: "あなたが気にしている<strong>毛穴</strong>の悩みに加えて、<strong>透明感</strong>や<strong>肌のきめ</strong>にも改善の余地があります。あなたの肌質の特性を活かしながら、バランスの取れたケアを心がけましょう。",
    routineTitle: "朝/夜の最適ルーチン",
    morningCare: "朝のケア",
    nightCare: "夜のケア",
    stepsMorning: ["洗顔", "化粧水", "美容液", "乳液", "日焼け止め"],
    stepsNight: ["クレンジング", "洗顔", "化粧水", "美容液", "乳液・クリーム", "スペシャルケア (週1-2)"],
    ingredientsTitle: "あなたの肌への推奨成分",
    defensiveIng: "守りの成分 (鎮静・保湿・バリア強化)",
    defensiveList: ["セラミド", "CICA", "グリチルリチン酸", "ヒアルロン酸", "アラントイン"],
    activeIng: "攻めの成分 (透明感・毛穴・エイジング)",
    activeList: ["ビタミンC誘導体", "ナイアシンアミド", "バクチオール", "サリチル酸", "ペプチド"],
    ctaTitle: "あなただけのスキンケアを始めましょう",
    ctaSubtitle: "AI診断に基づく製品レコメンデーションとパーソナライズされたケアプランで、理想の肌へ導きます。",
    ctaButton: "推奨製品セットを見る",
  },
  en: {
    title: "Personal Skin Care Diagnostic Report",
    subtitle: "Deeply understand your skin and move towards future beauty.",
    skinAge: "Skin Age",
    skinType: "Skin Type",
    concernArea: "Concern Area",
    concernDefault: "Pores / Clarity",
    overallScore: "Overall Score",
    yrs: "yrs",
    oily: "Oily",
    dry: "Dry",
    combination: "Combination",
    radarTitle: "Skin Diagnosis Radar Chart",
    radarWrinkles: "Wrinkles",
    radarBrightness: "Brightness",
    radarSpots: "Spots",
    radarClarity: "Clarity",
    radarTexture: "Texture",
    radarPores: "Pores",
    radarBarrier: "Barrier",
    radarLegendLow: '"Wrinkles", "Pores", "Spots" → Lower is better',
    radarLegendHigh: "Others → Higher is better",
    aiInsights: "AI Insights",
    insightText: "In addition to concerns about <strong>pores</strong>, there is room for improvement in <strong>clarity</strong> and <strong>skin texture</strong>. Make the most of your skin’s strengths and focus on a well-balanced care routine.",
    routineTitle: "Morning / Night Routine",
    morningCare: "Morning Care",
    nightCare: "Night Care",
    stepsMorning: ["Cleanser", "Toner", "Serum", "Emulsion", "Sunscreen"],
    stepsNight: ["Cleansing", "Cleanser", "Toner", "Serum", "Emulsion/Cream", "Special (1-2x/w)"],
    ingredientsTitle: "Recommended Ingredients for Your Skin",
    defensiveIng: "Defensive (Soothing, Moisturizing, Barrier)",
    defensiveList: ["Ceramide", "CICA", "Glycyrrhizic Acid", "Hyaluronic Acid", "Allantoin"],
    activeIng: "Active (Clarity, Pores, Anti-aging)",
    activeList: ["Vitamin C Deriv.", "Niacinamide", "Bakuchiol", "Salicylic Acid", "Peptides"],
    ctaTitle: "Start Your Personalized Skin Care Today",
    ctaSubtitle: "Get personalized recommendations and a care plan tailored to your skin with AI analysis.",
    ctaButton: "See Recommended Products",
  }
};


// --- コンポーネント本体 ---

export default function ClientReportPage() {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const id = params.id as string;  
  // const [lang, setLang] = useState<'ja' | 'en'>('ja');
  const [lang, setLang] = useState<'ja' | 'en'>('en');
  const t = translations[lang];

  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    // idが取得できたら、データ取得処理を開始
    if (id) {
      const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
          // ★★★ Firestoreから直接データを取得！ ★★★
          const docRef = doc(db, "diagnostics", id);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            const firestoreData = docSnap.data();
            // APIルートで行っていたデータ整形を、ここで行う
            const reportData: ReportData = {
              skinAge: firestoreData.skinAge,
              skinType: firestoreData.skinType,
              createdAt: firestoreData.createdAt?.toDate?.().toISOString() ?? '',
              scores: {
                wrinkles: firestoreData.wrinklesScore,
                texture: firestoreData.textureScore,
                pores: firestoreData.poresScore,
                brightening: firestoreData.brighteningScore,
                transparency: firestoreData.transparencyScore,
                spots: firestoreData.spotsScore,
              }
            };
            setData(reportData);
          } else {
            throw new Error('診断レポートが見つかりませんでした。');
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : '不明なエラーが発生しました。');
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setLoading(false);
      setError('レポートIDをURLから取得できませんでした。');
    }
    document.documentElement.lang = lang;
  }, [id, lang]);

  const handleSaveReport = async (e: React.FormEvent) => {
    // フォームのデフォルトの送信動作を、まず、止めます
    e.preventDefault();
    
    // --- デバッグの光、その1：関数が呼ばれたことを、まず、確認する ---
    console.log("handleSaveReport function CALLED.");

    if (!email || !id) {
      console.error("Email or Report ID is missing.");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // --- デバッグの光、その2：APIに、何を、送ろうとしているのか、確認する ---
      const payload = { email, reportId: id };
      console.log("Sending payload to API:", JSON.stringify(payload));

      const response = await fetch('/api/v1/save-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // --- デバッグの光、その3：APIから、何が、返ってきたのか、確認する ---
      console.log("Received response from API. Status:", response.status);
      const responseBody = await response.json();
      console.log("Response body:", responseBody);

      if (!response.ok) {
        // サーバーからのエラーメッセージを、より詳細に表示する
        const errorMessage = responseBody.detail || 'Failed to save the report. Please try again.';
        throw new Error(errorMessage);
      }
      
      setSubmitMessage(lang === 'ja' ? '保存しました！メールをご確認ください。' : 'Saved! Please check your email.');
      setEmail('');

    } catch (err) {
      // --- デバッグの光、その4：最終的に、何が、エラーとして、キャッチされたのか、確認する ---
      console.error("Error in handleSaveReport:", err);
      setSubmitMessage(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div className="text-center p-12">Loading...</div>;
  if (error) return <div className="text-center p-12 text-red-500">Error: {error}</div>;
  if (!data) return <div className="text-center p-12"><h1>診断レポートが見つかりません</h1></div>;

  // --- UI用のデータ計算 ---
  const overallScore = Math.round(((1 - data.scores.wrinkles) + data.scores.texture + (1 - data.scores.pores) + data.scores.brightening + data.scores.transparency + (1 - data.scores.spots)) / 6 * 100);
  const skinTypeJa = data.skinType === 'Oily' ? 'オイリー' : data.skinType === 'Dry' ? '乾燥肌' : '混合肌';
  const normalizedScores = [1 - data.scores.wrinkles, data.scores.brightening, 1 - data.scores.spots, data.scores.transparency, data.scores.texture, 1 - data.scores.pores, 0.73];
  const getRadarPoint = (score: number, index: number, total: number) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2;
    const radius = 100 * score;
    const x = 140 + radius * Math.cos(angle);
    const y = 140 + radius * Math.sin(angle);
    return `${x},${y}`;
  };
  const radarPoints = normalizedScores.map((score, i) => getRadarPoint(score, i, 7)).join(' ');


  return (
    <div className="visage-report-wrapper">
      <header className="visage-header">
        <div className="logo"><Sparkles /><h1>Visage AI</h1></div>
        <div className="lang-switcher">
          <button className={lang === 'ja' ? 'active' : ''} onClick={() => setLang('ja')}>日本語</button>
          <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>English</button>
        </div>
      </header>

      <main className="space-y-12">
        <section className="text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">{t.title}</h2>
          <p className="text-lg text-brand-text-sub">{t.subtitle}</p>
        </section>

        <section>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="vs-card md:col-span-2">
              <div className="vs-label"><CakeSlice size={16} />{t.skinAge}</div>
              <div className="vs-main-num">{data.skinAge}<span>{t.yrs}</span></div>
            </div>
            <div className="vs-card">
              <div className="vs-label"><Droplets size={16} />{t.skinType}</div>
              <div className="vs-value">{lang === 'ja' ? skinTypeJa : data.skinType}</div>
            </div>
            <div className="vs-card">
              <div className="vs-label"><Star size={16} />{t.overallScore}</div>
              <div className="vs-value">{overallScore}<span className="text-sm text-brand-text-sub">/100</span></div>
            </div>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <div className="visage-chart-card">
            <h3 className="font-bold text-xl mb-4 text-center">{t.radarTitle}</h3>
            <svg className="w-full" viewBox="0 0 280 280" aria-label={t.radarTitle}>
              <circle cx="140" cy="140" r="100" fill="none" stroke="#e5e7eb" />
              <circle cx="140" cy="140" r="70" fill="none" stroke="#e5e7eb" />
              <circle cx="140" cy="140" r="40" fill="none" stroke="#e5e7eb" />
              <g className="stroke-gray-200">
                {[...Array(7)].map((_, i: number) => (
                  <line key={i} x1="140" y1="140" x2={140 + 100 * Math.cos(Math.PI * 2 * i / 7 - Math.PI / 2)} y2={140 + 100 * Math.sin(Math.PI * 2 * i / 7 - Math.PI / 2)} />
                ))}
              </g>
              <polygon className="fill-brand-pink-brown/30 stroke-brand-pink-brown" strokeWidth="2" points={radarPoints} />
              {normalizedScores.map((score: number, i: number) => (
                <circle key={i} className="fill-brand-pink-brown" cx={140 + (100 * score) * Math.cos(Math.PI * 2 * i / 7 - Math.PI / 2)} cy={140 + (100 * score) * Math.sin(Math.PI * 2 * i / 7 - Math.PI / 2)} r="4" />
              ))}
              {[t.radarWrinkles, t.radarBrightness, t.radarSpots, t.radarClarity, t.radarTexture, t.radarPores, t.radarBarrier].map((label: string, i: number) => (
                <text key={i} className="text-xs font-semibold fill-current text-brand-text-sub" textAnchor="middle" x={140 + 115 * Math.cos(Math.PI*2*i/7 - Math.PI/2)} y={140 + 115 * Math.sin(Math.PI*2*i/7 - Math.PI/2)} dominantBaseline="middle">
                  <tspan x={140 + 115 * Math.cos(Math.PI*2*i/7 - Math.PI/2)} dy="-0.5em">{label}</tspan>
                  <tspan className="font-bold text-base text-brand-text-main" x={140 + 115 * Math.cos(Math.PI*2*i/7 - Math.PI/2)} dy="1.1em">{Math.round(normalizedScores[i] * 100)}</tspan>
                </text>
              ))}
            </svg>
             <div className="text-xs text-center text-gray-500 mt-4">
              {lang === 'ja' ? (<span>{t.radarLegendLow} / {t.radarLegendHigh}です。</span>) : (<span>{t.radarLegendLow} / {t.radarLegendHigh}.</span>)}
            </div>
          </div>
          <div className="visage-insight-card">
            <h3 className="flex items-center gap-2 font-bold text-xl mb-4"><BrainCircuit size={22} />{t.aiInsights}</h3>
            <div className="prose prose-sm" dangerouslySetInnerHTML={{ __html: t.insightText }} />
          </div>
        </div>
        
        <section>
          <h2 className="text-2xl font-bold mb-6 text-center"><CalendarCheck2 className="inline-block mr-2" />{t.routineTitle}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="vs-routine-card">
              <div className="vs-routine-head"><Sun />{t.morningCare}</div>
              <div className="vs-step-list space-y-2">{t.stepsMorning.map((step: string, i: number) => <div key={i} className="vs-step">{step}</div>)}</div>
            </div>
            <div className="vs-routine-card night">
              <div className="vs-routine-head"><Moon />{t.nightCare}</div>
              <div className="vs-step-list space-y-2">{t.stepsNight.map((step: string, i: number) => <div key={i} className={`vs-step ${i === 5 ? 'special' : ''}`}>{step}</div>)}</div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6 text-center"><FlaskConical className="inline-block mr-2" />{t.ingredientsTitle}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="vs-ingredient-card">
              <div className="vs-ing-head"><ShieldCheck />{t.defensiveIng}</div>
              <div className="vs-ing-list">{t.defensiveList.map((ing: string, i: number) => <span key={i} className="pill">{ing}</span>)}</div>
            </div>
            <div className="vs-ingredient-card">
              <div className="vs-ing-head"><Zap />{t.activeIng}</div>
              <div className="vs-ing-list">{t.activeList.map((ing: string, i: number) => <span key={i} className="pill">{ing}</span>)}</div>
            </div>
          </div>
        </section>

        <section className="visage-cta-card">
          <h2 className="text-3xl font-bold">{t.ctaTitle}</h2>
          <p className="mt-2 max-w-2xl mx-auto">{t.ctaSubtitle}</p>
          <a href="#" className="visage-cta-btn">{t.ctaButton}<ArrowRight size={20} /></a>
        </section>

        <section className="text-center">
          <h3 className="text-lg font-semibold mb-3">{lang === 'ja' ? 'この結果をシェアする' : 'Share Your Results'}</h3>
          <div className="flex justify-center items-center gap-3">
            <FacebookShareButton
              url={`https://www.visageaiconsulting.com/report/${id}`}
              quote={lang === 'ja' ? `私のAI肌診断結果！#VisageAI` : `My AI skin analysis result! #VisageAI`}
              hashtag={'#visageai'}
            >
              <FacebookIcon size={40} round />
            </FacebookShareButton>

            <TwitterShareButton 
              url={`https://www.visageaiconsulting.com/report/${id}`}
              title={lang === 'ja' ? `私のAI肌診断結果！肌年齢は${data.skinAge}歳でした。` : `My AI skin analysis result! My skin age is ${data.skinAge}.`}
              hashtags={["VisageAI", "SkinCare"]}
            >
              <TwitterIcon size={40} round />
            </TwitterShareButton>
            
            <LineShareButton 
              url={`https://www.visageaiconsulting.com/report/${id}`}
              title={lang === 'ja' ? `私のAI肌診断結果をチェック！` : `Check out my AI skin analysis result!`}
            >
              <LineIcon size={40} round />
            </LineShareButton>
          </div>
        </section>

        <section className="visage-save-report-card">
          <h2 className="text-2xl font-bold">{lang === 'ja' ? 'この診断結果を保存' : 'Save This Report'}</h2>
          <p className="mt-2 text-brand-text-sub">{lang === 'ja' ? 'メールアドレスを入力すると、このレポートへのリンクをいつでも見返せるように送信します。' : 'Enter your email to receive a permanent link to this report.'}</p>
          <form onSubmit={handleSaveReport} className="mt-4 flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input
              type="email" // typeは"email"に戻し、セマンティックな正しさを保ちます
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={lang === 'ja' ? 'メールアドレス' : 'Your Email Address'}
              required
              className="visage-email-input"
              // --- iOSの「過剰な親切」を、ここで、完全に無効化します ---
              autoCorrect="off"
              autoCapitalize="none"
              spellCheck="false"
              // --- ここまで ---
            />
            <button type="submit" disabled={isSubmitting} className="visage-cta-btn text-base">
              {isSubmitting ? (lang === 'ja' ? '送信中...' : 'Sending...') : (lang === 'ja' ? '送信' : 'Send Link')}
            </button>
          </form>
          {submitMessage && <p className="mt-4 text-center text-sm">{submitMessage}</p>}
        </section>

      </main>
    </div>
  );
}
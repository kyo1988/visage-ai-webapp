import { notFound } from "next/navigation";
import { getStoreConfig } from "@/lib/storeConfig";
import StoreProductsClient from "@/components/report/StoreProductsClient";
import RadarSVG from "@/components/report/RadarSVG";

// ダミーデータ（営業デモ用）
const DUMMY_RESULT = {
    skinAge: 25,
    rank: 82,
    score: "A",
    summary: {
        ja: "肌の状態は非常に良好です。キメが整っており、水分量も十分です。",
        en: "Your skin condition is excellent. Texture is smooth and hydration is sufficient."
    },
    radar: [0.8, 0.75, 0.85, 0.7, 0.9, 0.6]
};

export const dynamic = 'force-static';
export const dynamicParams = true;

interface Props {
    params: { storeId: string };
    searchParams: { lang?: string };
}

export async function generateStaticParams() {
    return [
        { storeId: "ginza_001" },
        { storeId: "shibuya_002" },
    ];
}

export default function DirectViewPage({ params, searchParams }: Props) {
    const { storeId } = params;
    const lang = searchParams.lang === "ja" ? "ja" : "en";

    const storeConfig = getStoreConfig(storeId);
    if (!storeConfig) return notFound();

    const labels = lang === "ja"
        ? ["テクスチャ", "水分", "毛穴", "シワ", "色素沈着", "敏感度"]
        : ["Texture", "Hydration", "Pores", "Wrinkles", "Pigmentation", "Sensitivity"];

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* 簡易ヘッダー (StickyHeaderの代わり) */}
            <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
                <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent">
                            Visage AI
                        </span>
                    </div>
                    {/* 言語切り替えリンク */}
                    <a
                        href={`/direct-view/${storeId}?lang=${lang === 'ja' ? 'en' : 'ja'}`}
                        className="text-sm font-medium text-slate-600 hover:text-slate-900"
                    >
                        {lang === 'ja' ? 'English' : '日本語'}
                    </a>
                </div>
            </header>

            {/* コンテンツ */}
            <main className="px-4 py-8 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl">

                    {/* 診断結果セクション */}
                    <div className="mb-10 text-center">
                        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                            {lang === "ja" ? "肌診断結果" : "Skin Diagnostic Result"}
                        </h1>
                        <p className="mt-2 text-slate-600">
                            {lang === "ja" ? "あなたの肌分析レポート" : "Your personalized skin analysis report"}
                        </p>
                    </div>

                    <div className="mb-12 grid gap-8 md:grid-cols-2">
                        {/* スコア */}
                        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-900/5">
                            <div className="flex items-end justify-between border-b border-slate-100 pb-4">
                                <div>
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        {lang === "ja" ? "肌年齢" : "SKIN AGE"}
                                    </p>
                                    <p className="mt-1 text-4xl font-bold text-slate-900">
                                        {DUMMY_RESULT.skinAge}
                                        <span className="ml-1 text-sm font-medium text-slate-500">
                                            {lang === "ja" ? "歳" : "y.o."}
                                        </span>
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                        {lang === "ja" ? "ランク" : "RANK"}
                                    </p>
                                    <span className="text-3xl font-bold text-emerald-600">{DUMMY_RESULT.score}</span>
                                </div>
                            </div>
                            <p className="mt-4 text-sm leading-relaxed text-slate-600">
                                {lang === "ja" ? DUMMY_RESULT.summary.ja : DUMMY_RESULT.summary.en}
                            </p>
                        </div>

                        {/* レーダーチャート */}
                        <div className="flex items-center justify-center rounded-2xl bg-white p-2 shadow-sm ring-1 ring-slate-900/5">
                            <div className="w-full max-w-[240px]">
                                <RadarSVG labels={labels} values={DUMMY_RESULT.radar} locale={lang} />
                            </div>
                        </div>
                    </div>

                    {/* 商品セクション */}
                    <div className="mb-6 flex items-center gap-3">
                        <div className="h-6 w-1 rounded-full bg-sky-500"></div>
                        <h2 className="text-xl font-bold text-slate-900">
                            {lang === "ja" ? "あなたへのおすすめ" : "Recommended for You"}
                        </h2>
                    </div>

                    <StoreProductsClient
                        storeId={storeId}
                        storeName={storeConfig.name}
                        products={storeConfig.products}
                        locale={lang}
                    />
                </div>
            </main>
        </div>
    );
}

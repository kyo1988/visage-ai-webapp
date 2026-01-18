import { notFound } from "next/navigation";
import { getStoreConfig } from "@/lib/storeConfig";
import StoreProductsClient from "@/components/report/StoreProductsClient";
import RadarSVG from "@/components/report/RadarSVG";
import { getMessages } from "@/app/lib/messages";

// ダミーデータ（営業デモ用に「良好」な結果を表示）
const DUMMY_RESULT = {
    skinAge: 25,
    rank: 82, // Top 18%
    score: "A",
    summary: {
        ja: "肌の状態は非常に良好です。キメが整っており、水分量も十分です。",
        en: "Your skin condition is excellent. Texture is smooth and hydration is sufficient."
    },
    radar: [0.8, 0.75, 0.85, 0.7, 0.9, 0.6], // Texture, Hydration, Pores, Wrinkles, Pigmentation, Sensitivity
};

export const dynamic = 'force-static';
export const dynamicParams = true;

interface Props {
    params: {
        storeId: string;
        locale: string;
    };
}

export async function generateStaticParams() {
    // 静的生成する店舗ID（デモ用）
    return [
        { storeId: "ginza_001", locale: "ja" },
        { storeId: "ginza_001", locale: "en" },
        { storeId: "shibuya_002", locale: "ja" },
        { storeId: "shibuya_002", locale: "en" },
    ];
}

export default async function StoreDemoPage({ params }: Props) {
    const { storeId, locale } = params;
    const loc = locale === "ja" ? "ja" : "en";

    // 店舗設定の取得（DBなどは通さない）
    const storeConfig = getStoreConfig(storeId);
    if (!storeConfig) {
        return notFound();
    }

    const messages = await getMessages(loc);
    const labels = loc === "ja"
        ? ["テクスチャ", "水分", "毛穴", "シワ", "色素沈着", "敏感度"]
        : ["Texture", "Hydration", "Pores", "Wrinkles", "Pigmentation", "Sensitivity"];

    return (
        <div className="min-h-screen bg-slate-50 pb-20">
            {/* 診断結果ヘッダー（ダミー） */}
            <div className="bg-white px-4 py-8 shadow-sm sm:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                            {loc === "ja" ? "肌診断結果" : "Skin Diagnostic Result"}
                        </h1>
                        <p className="mt-2 text-slate-600">
                            {loc === "ja" ? "あなたの肌分析レポート" : "Your personalized skin analysis report"}
                        </p>
                    </div>

                    <div className="mt-8 grid gap-8 md:grid-cols-2 lg:gap-12">
                        {/* スコアカード */}
                        <div className="rounded-2xl bg-slate-50 p-6 md:p-8">
                            <div className="flex items-end justify-between border-b border-slate-200 pb-4">
                                <div>
                                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                                        {loc === "ja" ? "肌年齢" : "Skin Age"}
                                    </p>
                                    <p className="mt-1 text-4xl font-bold text-slate-900">
                                        {DUMMY_RESULT.skinAge}
                                        <span className="ml-1 text-base font-medium text-slate-500">
                                            {loc === "ja" ? "歳" : "y.o."}
                                        </span>
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                                        {loc === "ja" ? "総合ランク" : "Overall Rank"}
                                    </p>
                                    <div className="mt-1 flex items-baseline justify-end gap-1">
                                        <span className="text-3xl font-bold text-emerald-600">{DUMMY_RESULT.score}</span>
                                        <span className="text-sm text-slate-500">(Top {100 - DUMMY_RESULT.rank}%)</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-4">
                                <p className="text-sm leading-relaxed text-slate-700">
                                    {loc === "ja" ? DUMMY_RESULT.summary.ja : DUMMY_RESULT.summary.en}
                                </p>
                            </div>
                        </div>

                        {/* レーダーチャート */}
                        <div className="flex items-center justify-center">
                            <div className="w-full max-w-[280px]">
                                <RadarSVG
                                    labels={labels}
                                    values={DUMMY_RESULT.radar}
                                    locale={loc}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 商品レコメンデーション（店舗インジェクション） */}
            <div className="mx-auto mt-8 max-w-3xl px-4 sm:px-6 lg:px-8">
                <div className="mb-6 flex items-center gap-3">
                    <div className="h-8 w-1 rounded-full bg-sky-500"></div>
                    <h2 className="text-xl font-bold text-slate-900">
                        {loc === "ja" ? "あなたへのおすすめ" : "Recommended for You"}
                    </h2>
                </div>

                <StoreProductsClient
                    storeId={storeId}
                    storeName={storeConfig.name}
                    products={storeConfig.products}
                    locale={loc}
                />
            </div>
        </div>
    );
}

import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRightIcon } from '@heroicons/react/20/solid';

type PageProps = {
    params: { locale: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const isEn = params.locale === 'en';

    const title = isEn
        ? 'Visage Best Practices'
        : 'Visage Best Practices | ベストプラクティス';

    const description = isEn
        ? 'Turning biometric signals into customer success. Explore v3.2 scenarios including Future Care Navigation and bundle offer recipes.'
        : 'データを接客の成果に変えるレシピ。v3.2の新シナリオ「Future Care Navigation」を含む、診断結果をセット提案へ変換するためのベストプラクティス。';

    const path = `/${params.locale}/practices`;

    return {
        title,
        description,
        alternates: {
            canonical: path,
            languages: {
                en: '/en/practices',
                ja: '/ja/practices',
                'x-default': '/en/practices',
            },
        },
        openGraph: {
            title,
            description,
            type: 'article',
            url: path,
            locale: isEn ? 'en_US' : 'ja_JP',
            images: [
                {
                    url: '/images/ogp.jpg',
                    width: 1200,
                    height: 630,
                    alt: title,
                }
            ]
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['/images/ogp.jpg'],
        },
    };
}

const Badge = ({ children }: { children: React.ReactNode }) => (
    <span className="inline-flex items-center rounded-md bg-brand-pink-brown/10 px-2.5 py-1 text-xs font-semibold text-brand-pink-brown ring-1 ring-inset ring-brand-pink-brown/20 uppercase tracking-widest shrink-0">
        {children}
    </span>
);

type Scenario = {
    id: string;
    title: { en: string; ja: string };
    target: { en: string; ja: string };
    signal: React.ReactNode;
    insight: { en: string; ja: string };
    talk: { en: string; ja: string };
    primaryPair: { en: string; ja: string };
    bundlePair: { en: string; ja: string };
    avoidBad: { en: string; ja: string };
    avoidGood: { en: string; ja: string };
};

const scenarios: Scenario[] = [
    {
        id: 'A',
        title: { en: "Personal Color × Lip Line", ja: "パーソナルカラー × リップライン" },
        target: { en: "Customers looking for a lipstick", ja: "リップを探しているお客様" },
        signal: <>Personal Color <span className="text-gray-400 mx-1">+</span> Lip Definition (Caution)</>,
        insight: {
            en: "The direction of flattering colors is clear, but the lip contour tends to look soft, making the color impression somewhat blurred.",
            ja: "似合う色の方向性は明確だが、唇の輪郭がやわらかく見えやすく、色の印象がぼやけやすい状態。"
        },
        talk: {
            en: "This lipstick matches your personal color perfectly and easily brightens your skin. Furthermore, lightly shaping the contour with a matching liner makes the color pop beautifully, giving a much more refined finish.",
            ja: "お客様のパーソナルカラーに合うこちらのリップは、肌を明るく見せやすい色です。さらに、輪郭を同系色のライナーで少し整えると、色がよりきれいに映えて、仕上がりがぐっと洗練されますよ。"
        },
        primaryPair: { en: "Lip Color", ja: "リップカラー" },
        bundlePair: { en: "Lip Liner / Lip Plumper", ja: "リップライナー / リッププランパー" },
        avoidBad: { en: "Your lip outline is weak.", ja: "唇の輪郭が弱いです" },
        avoidGood: { en: "Lightly shaping the contour will help the color look even more beautiful.", ja: "輪郭を少し整えると、色がよりきれいに見えやすいです" }
    },
    {
        id: 'B',
        title: { en: "Bone Structure Impression × Under-Eye Clarity", ja: "骨格印象 × 目元の透明度" },
        target: { en: "Customers looking for base makeup or foundation", ja: "ベースメイクやファンデーションを探しているお客様" },
        signal: <>Archetype <span className="text-gray-400 mx-1">+</span> Under-Eye Clarity (Caution)</>,
        insight: {
            en: "The facial features are attractive, but dullness or darkness around the eyes may make the overall impression slightly heavy.",
            ja: "顔立ちの魅力はあるが、目元のくすみ・暗さが全体の印象を少し重く見せやすい状態。"
        },
        talk: {
            en: "Your bone structure impression is very attractive. To further enhance it, organizing the brightness around the eyes first is more effective than layering foundation. Just by applying a thin layer of this concealer around the eyes, your whole face will appear much brighter.",
            ja: "お客様の骨格の印象はとても魅力的です。より印象を引き立てるには、ファンデーションを重ねるより、目元の明るさを先に整えるのが効果的です。こちらのコンシーラーを目元に薄く入れるだけで、顔全体が明るく見えやすくなります。"
        },
        primaryPair: { en: "Foundation / Makeup Base", ja: "ファンデーション / 化粧下地" },
        bundlePair: { en: "Concealer / Eye Care Serum", ja: "コンシーラー / アイケア美容液" },
        avoidBad: { en: "You have strong dark circles.", ja: "クマが強く出ています" },
        avoidGood: { en: "By lightly brightening the eye area, your overall impression will become much lighter.", ja: "目元を少し整えると、全体の印象がより明るく見えやすいです" }
    },
    {
        id: 'C',
        title: { en: "Skin Uniformity × Facial Contrast", ja: "肌の均一性 × 顔のコントラスト" },
        target: { en: "Customers seeking a refined look or wanting to change their impression", ja: "垢抜けたい / 印象を変えたいお客様" },
        signal: <>Skin Uniformity (Good) <span className="text-gray-400 mx-1">+</span> Facial Contrast (Caution)</>,
        insight: {
            en: "The base skin is even, but the overall facial shading is soft, which can make the impression appear somewhat flat.",
            ja: "肌のベースは整っている一方で、顔全体の陰影が穏やかで、印象がフラットに見えやすい状態。"
        },
        talk: {
            en: "Your skin uniformity is high, and the base is very beautiful. For clients like you, adding a touch of 'light and shadow' rather than layering colors makes it easier to create an impression. Simply placing a highlight high on your cheeks and lightly contouring your jawline will bring out a natural dimensionality.",
            ja: "お肌の均一性が高く、ベースがとてもきれいです。こういう方は、色を重ねるより“光と影”を少し足すと印象を作りやすくなります。ハイライトを頬の高い位置に、シェーディングをフェイスラインに軽く入れるだけで、立体感が自然に出ます。"
        },
        primaryPair: { en: "Point Makeup / Base Finish", ja: "ポイントメイク / ベース仕上げ" },
        bundlePair: { en: "Highlighter / Shading", ja: "ハイライト / シェーディング" },
        avoidBad: { en: "Your face looks somewhat flat.", ja: "お顔がのっぺり見えてしまいます" },
        avoidGood: { en: "Adding a touch of light and shadow beautifully brings out dimensionality.", ja: "光と影を少し足すと、立体感がよりきれいに出ます" }
    },
    {
        id: 'D',
        title: { en: "Future Care Navigation (Labs)", ja: "フューチャー・ケア・ナビゲーション" },
        target: { en: "Repeat customers or those choosing routine items", ja: "リピーター、または日常使いのアイテムを選んでいるお客様" },
        signal: <>Future Care Priorities <span className="text-gray-400 mx-1">(Top 3)</span></>,
        insight: {
            en: "Current skin is stable. The engine surfaces areas that will have the most long-term impact based on preventive weighting.",
            ja: "現在のお肌は安定。将来的に最も影響の大きいケア項目が、統計的な優先順位（重み付け）に基づき特定されている状態。"
        },
        talk: {
            en: "Since your skin is in great condition, let's look at 'Future Care'. By focusing on [Item] now, you can best preserve your natural beauty for years to come. This [Product] is a perfect investment for that long-term confidence.",
            ja: "現在のお肌の状態は非常に良好ですので、一歩先の『フューチャーケア』に着目してみましょう。今から[項目]を重点的にケアしておくことが、5年後、10年後の美しさを守るための最短距離になります。こちらの[製品]が、その将来への投資として最適です。"
        },
        primaryPair: { en: "Core Preventive Serum", ja: "基幹美容液（先行投資ケア）" },
        bundlePair: { en: "High-Protection Day Cream", ja: "高機能デイクリーム（守りのケア）" },
        avoidBad: { en: "Your skin will have serious problems in 5 years if you don't start now.", ja: "今始めないと5年後に大変なことになりますよ" },
        avoidGood: { en: "Focusing on this now is the most effective way to preserve your natural beauty for the long term.", ja: "今ここを重点的にケアすることが、将来の美しさを守るための最も効率的な近道です" }
    }
];

const ScenarioCard = ({ scenario, isEn }: { scenario: Scenario, isEn: boolean }) => (
    <div className="rounded-2xl bg-white border border-brand-pink-brown/15 shadow-sm p-8 sm:p-10 mb-10 transition-shadow hover:shadow-md">
        <h3 className="text-xl sm:text-2xl font-bold text-brand-brown-dark mt-0 mb-6 pb-4 border-b border-brand-pink-brown/10 flex items-center">
            <span className="text-brand-pink-brown mr-3">{scenario.id}.</span>
            {isEn ? scenario.title.en : scenario.title.ja}
        </h3>

        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                <Badge>Target</Badge>
                <p className="m-0 text-brand-text-main font-medium mt-1 sm:mt-0">
                    {isEn ? scenario.target.en : scenario.target.ja}
                </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                <Badge>Signal</Badge>
                <p className="m-0 text-brand-text-main font-medium mt-1 sm:mt-0 font-mono text-[15px] bg-gray-50 px-3 py-1 rounded-lg border border-gray-100">
                    {scenario.signal}
                </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4">
                <Badge>Insight</Badge>
                <p className="m-0 text-gray-600 leading-relaxed mt-1 sm:mt-0">
                    {isEn ? scenario.insight.en : scenario.insight.ja}
                </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 pt-2">
                <Badge>Talk</Badge>
                <div className="m-0 mt-1 sm:mt-0 relative">
                    <div className="absolute -left-3 top-0 text-2xl text-brand-pink-brown/30 font-serif">&quot;</div>
                    <p className="m-0 italic text-brand-brown-dark font-medium leading-relaxed pl-2 border-l-2 border-brand-pink-brown/20 bg-brand-pink-brown/5 p-4 rounded-r-xl">
                        {isEn ? scenario.talk.en : scenario.talk.ja}
                    </p>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 pt-2">
                <Badge>Pairing</Badge>
                <ul className="m-0 mt-1 sm:mt-0 pl-0 list-none space-y-2">
                    <li className="flex items-center">
                        <span className="w-5 h-5 rounded-full bg-brand-pink-brown text-white text-xs flex items-center justify-center mr-3">1</span>
                        <span className="text-gray-500 mr-2 text-sm">{isEn ? "[Primary]" : "[主提案]"}</span>
                        <strong>{isEn ? scenario.primaryPair.en : scenario.primaryPair.ja}</strong>
                    </li>
                    <li className="flex items-center">
                        <span className="w-5 h-5 rounded-full bg-brand-pink-brown/70 text-white text-xs flex items-center justify-center mr-3">2</span>
                        <span className="text-gray-500 mr-2 text-sm">{isEn ? "[Bundle]" : "[セット提案]"}</span>
                        <strong>{isEn ? scenario.bundlePair.en : scenario.bundlePair.ja}</strong>
                    </li>
                </ul>
            </div>

            <div className="mt-8 rounded-xl bg-orange-50/70 border border-orange-200/60 p-5 sm:p-6">
                <h4 className="text-orange-800 text-sm font-bold uppercase tracking-wider mt-0 mb-4 flex items-center">
                    <span className="mr-2">⚠️</span> {isEn ? "Avoid (Caution in phrasing)" : "Avoid（言い換え注意）"}
                </h4>
                <ul className="pl-0 m-0 space-y-3 list-none">
                    <li className="flex items-start text-gray-700">
                        <span className="text-red-500 mr-3 shrink-0">❌</span>
                        <span>{isEn ? scenario.avoidBad.en : scenario.avoidBad.ja}</span>
                    </li>
                    <li className="flex items-start font-medium text-brand-brown-dark">
                        <span className="text-emerald-500 mr-3 shrink-0">✅</span>
                        <span>{isEn ? scenario.avoidGood.en : scenario.avoidGood.ja}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>
);

export default function PracticesPage({
    params: { locale }
}: {
    params: { locale: string }
}) {
    const isEn = locale === 'en';

    return (
        <div className="min-h-screen bg-bg pt-24 pb-24">
            <div className="mx-auto max-w-4xl px-6 lg:px-8">
                <article className="prose prose-slate prose-base sm:prose-lg max-w-none leading-relaxed tracking-tight text-brand-text-main/90 prose-headings:font-display prose-headings:tracking-tighter prose-headings:text-brand-brown-dark hover:prose-a:text-brand-pink-hover prose-a:transition-colors prose-a:text-brand-pink-brown">

                    {/* Header Section */}
                    <div className="mb-16 text-center max-w-3xl mx-auto">
                        <h1 className="mb-6 text-4xl sm:text-5xl font-bold tracking-tight text-brand-text-main">
                            Visage Best Practices
                        </h1>
                        <p className="text-xl sm:text-2xl text-brand-text-sub font-medium leading-snug">
                            {isEn
                                ? "Turning Diagnostics into Better Service"
                                : "データを接客の成果に変えるレシピ"}
                        </p>
                    </div>

                    <div className="mb-16">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-brand-brown-dark border-b border-brand-pink-hover/20 pb-4">
                            {isEn ? "Biometrics to Better Service" : "Biometrics to Better Service — 診断結果を「納得感」と「セット提案」へ変換する"}
                        </h2>
                        {isEn ? (
                            <>
                                <p>
                                    The biometric signals generated by Visage AI are not just analysis results.
                                    They are tools to support customer service, organizing needs and translating them into a form that staff can easily propose.
                                </p>
                                <p>
                                    This page introduces the best practices of &quot;Diagnostic Results × Product Proposals&quot; that can be used immediately on the shop floor.
                                </p>
                            </>
                        ) : (
                            <>
                                <p>
                                    Visage AIが出力する生体データは、単なる解析結果ではありません。
                                    それは、お客様のニーズを整理し、スタッフが提案しやすい形に変換するための接客補助ツールです。
                                </p>
                                <p>
                                    本ページでは、現場ですぐに使える「診断結果 × 商品提案」のベストプラクティスを紹介します。
                                </p>
                            </>
                        )}
                    </div>

                    {/* Basic Steps */}
                    <div className="rounded-2xl bg-white border border-brand-pink-brown/10 shadow-sm p-8 mb-16">
                        <h3 className="text-xl font-bold text-brand-brown-dark mt-0 mb-6 flex items-center">
                            <span className="mr-3 text-2xl">💡</span>
                            {isEn ? "Basic Steps for Utilization" : "活用の基本ステップ"}
                        </h3>
                        <ol className="list-decimal pl-5 space-y-4 font-medium text-brand-text-main mb-0">
                            <li>
                                {isEn
                                    ? <>Review the <strong>&quot;Show to Staff&quot;</strong> screen together with the customer.</>
                                    : <><strong>「Show to Staff」</strong>の画面を、お客様と一緒に確認します。</>}
                            </li>
                            <li>
                                {isEn
                                    ? <>Select the <strong>single easiest-to-communicate signal (item)</strong> from the display.</>
                                    : <>表示された中から、<strong>最も伝えやすいシグナル（項目）を1つ</strong>選びます。</>}
                            </li>
                            <li>
                                {isEn
                                    ? <>Guide them in the order of <strong>Primary Proposal (1 item) → Bundle Proposal (1 item)</strong>, allowing the service to proceed naturally.</>
                                    : <><strong>主提案（1品）→ セット提案（1品）</strong>の順でご案内することで、接客が自然に進みます。</>}
                            </li>
                        </ol>
                    </div>

                    {/* Scenarios Header */}
                    <div className="mb-10">
                        <h2 className="text-3xl font-bold text-brand-text-main">
                            {isEn ? "Scenarios for Building Bundle Proposals" : "「似合う」の先へ：セット提案を作るシナリオ"}
                        </h2>
                    </div>

                    {scenarios.map(scen => (
                        <ScenarioCard key={scen.id} scenario={scen} isEn={isEn} />
                    ))}

                    <hr className="my-16 border-brand-pink-hover/20" />

                    {/* Hints block */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold text-brand-text-main mb-6">
                            {isEn ? "Hints for Store Managers: Implementation and Adoption" : "店舗マネージャー向け：導入・定着のヒント"}
                        </h2>
                        <ul className="space-y-6">
                            <li>
                                <strong>{isEn ? "Use \"Show to Staff\" as the starting point:" : "「Show to Staff」を接客の起点にする:"}</strong><br />
                                {isEn
                                    ? "By asking the customer, \"Could you show me this screen?\", you can naturally create a hook for customer service."
                                    : "お客様に「この画面を見せてください」とご案内いただくことで、自然に接客のきっかけ（Hook）を作れます。"}
                            </li>
                            <li>
                                <strong>{isEn ? "Enforce \"Guest Mode\":" : "「Guest Mode」の徹底:"}</strong><br />
                                {isEn
                                    ? "Make pressing the \"Finish\" button a routine for completing service. This ensures privacy and sets up for the next customer simultaneously."
                                    : "「Finish」ボタン押下を接客完了のルーチンにしてください。プライバシー配慮と次のお客様への切り替えを同時に行えます。"}
                            </li>
                            <li>
                                <strong>{isEn ? "Clarify the Escape Route:" : "エスケープルートの明確化:"}</strong><br />
                                {isEn
                                    ? "If a customer declines to be photographed or retries fail continuously, swiftly switch to your standard consultation flow. Visage AI is an \"auxiliary\" tool for service, not a replacement for the hospitality of your staff."
                                    : "撮影を希望されない場合や、再撮影が続く場合は、速やかに通常の接客フローへ切り替えてください。Visage AIは接客を「補助」するものであり、スタッフの皆様のホスピタリティを置き換えるものではありません。"}
                            </li>
                        </ul>
                    </div>

                    {/* KPI Block */}
                    <div className="rounded-2xl bg-brand-pink-brown/5 border border-brand-pink-brown/20 p-8 mb-16">
                        <h3 className="text-xl font-bold text-brand-brown-dark mt-0 mb-4 flex items-center">
                            <span className="mr-3 text-2xl">📊</span>
                            {isEn ? "Recommended KPIs for Tracking Success" : "推奨される導入効果の計測指標（KPI）"}
                        </h3>
                        <p className="m-0 text-gray-700 font-medium mb-4">
                            {isEn
                                ? "To visualize the business impact of implementing Visage AI, we recommend tracking the following simple metrics on the shop floor:"
                                : "Visage AI導入による接客効果を可視化するため、現場では以下のシンプルな指標を追跡することをお勧めします。"}
                        </p>
                        <ul className="pl-5 m-0 space-y-2 text-brand-text-main font-medium list-disc">
                            <li>
                                {isEn ? "Bundle Rate for Target Categories (e.g., Lip color to Lip liner conversion)" : "ターゲットカテゴリのセット率（例：リップカラーからライナーへの併売率）"}
                            </li>
                            <li>
                                {isEn ? "\"Finish\" Button Press Rate (Indicates successful completion of the consultation flow)" : "「Finish」ボタンのタップ率（接客フローが最後まで完遂されたかの指標）"}
                            </li>
                            <li>
                                {isEn ? "Scenario Utilization Distribution (Tracking which scenarios are most frequently used)" : "診断シナリオ（A/B/C）の活用偏向率（どの提案シナリオが現場で多く使われているか）"}
                            </li>
                        </ul>
                    </div>

                    {/* Next Step Nav */}
                    <div className="mt-2 text-center">
                        <Link
                            href={`/${locale}/guide`}
                            className="group inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-full text-white bg-brand-brown-dark hover:bg-brand-brown-hover transition-colors shadow-md"
                        >
                            {isEn ? "Read the Store Guide" : "店舗向けガイドを読む"}
                            <ArrowRightIcon className="ml-3 w-5 h-5 group-hover:translate-x-1.5 transition-transform" aria-hidden="true" />
                        </Link>
                    </div>

                </article>
            </div>
        </div>
    );
}

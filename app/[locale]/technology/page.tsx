import type { Metadata } from 'next';
import Image from 'next/image';

type PageProps = {
    params: { locale: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const isEn = params.locale === 'en';

    const title = isEn
        ? 'Inside Visage AI | Technology'
        : 'Visage AI の技術基盤 | Technology';

    const description = isEn
        ? 'The Biometric Engine Powering Non-Verbal Beauty Retail. Explore the architecture and design philosophy behind Visage AI.'
        : '非言語の美容接客を支える生体解析エンジン。Visage AIのアーキテクチャと設計思想を公開。';

    const path = `/${params.locale}/technology`;

    return {
        title,
        description,
        alternates: {
            canonical: path,
            languages: {
                en: '/en/technology',
                ja: '/ja/technology',
                'x-default': '/en/technology',
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

export default function TechnologyPage({
    params: { locale }
}: {
    params: { locale: string }
}) {
    const isEn = locale === 'en';

    return (
        <div className="min-h-screen bg-bg pt-24 pb-20">
            <div className="mx-auto max-w-3xl px-6 lg:px-8">
                <article className="prose prose-slate prose-lg max-w-none leading-relaxed tracking-normal text-fg/80 prose-headings:font-display prose-headings:tracking-tight prose-headings:text-brand-brown-dark prose-a:text-brand-pink-brown prose-a:hover:text-brand-pink-hover prose-a:transition-colors">

                    {/* Header Section */}
                    <div className="mb-16 text-center">
                        <h1 className="mb-4 text-4xl sm:text-5xl font-bold tracking-tight text-brand-text-main">
                            {isEn ? "Inside Visage AI" : "Visage AI の技術基盤"}
                        </h1>
                        <p className="text-xl text-brand-text-sub max-w-2xl mx-auto">
                            {isEn
                                ? "The Biometric Engine Powering Non-Verbal Beauty Retail"
                                : "非言語の美容接客を支える生体解析エンジン"}
                        </p>
                    </div>

                    {isEn ? (
                        /* English Content */
                        <>
                            <p>
                                Due to the increase in inbound tourists, the frontlines of beauty retail are facing a huge opportunity. However, at the same time, the repeatedly occurring problem of the &quot;language barrier&quot; is becoming a burden for staff.
                            </p>
                            <p>
                                &quot;A base suitable for dry skin,&quot; &quot;Highly pigmented lipstick that brightens the skin of a cool tone winter&quot; — the reality is that such subtle nuances and beauty jargon are difficult to convey accurately with ordinary translation apps.
                            </p>
                            <p>
                                Visage AI does not fill the language barrier with &quot;translation,&quot; but rather &quot;converts&quot; it into a form that can be used on-site by utilizing non-verbal biometric data.
                            </p>
                            <p>
                                By instantly calculating the facial bone structure, skin uniformity, and contrast of features, it connects to an objective proposal flow that store staff can intuitively understand.
                            </p>
                            <p>
                                In this article, we reveal the backstage and design philosophy of the analysis engine that makes Visage AI a B2B tool robust enough for business use.
                            </p>

                            <hr className="my-12 border-brand-pink-hover/30" />

                            <h2>1. The B2B Workflow: 3 Steps to Beautify Customer Service</h2>
                            <p>
                                The Visage AI experience is completed on a store iPad (or the customer&apos;s smartphone). It is an elegant workflow designed to shorten service time and reduce variations in proposal quality among staff.
                            </p>



                            <h3>1. Scan & Validate</h3>
                            <p>
                                For more accurate analysis, we recommend live scanning on the spot in store mode. Loading images from the gallery is also possible, but only images that pass the strict &quot;Quality Control Gate&quot; described below will proceed to analysis.
                            </p>

                            <h3>2. Translate to Product</h3>
                            <p>
                                When analysis is complete, specific proposals such as &quot;Looking for: Lip liner to adjust contour / High moisturizing concealer&quot; are displayed on the screen. The customer simply shows this to the staff, and accurate product guidance begins.
                            </p>

                            <h3>3. Secure Wipe</h3>
                            <p>
                                For store use (Guest Mode), the session is discarded with a single tap at the end of the customer service. It implements a flow intended to delete related data at once, including the device&apos;s cache and storage area, designed with privacy protection in mind.
                            </p>

                            <hr className="my-12 border-brand-pink-hover/30" />

                            <h2>2. Under the Hood: Uncompromising &quot;Biometric Analysis Engine&quot;</h2>
                            <p>
                                In the background of Visage AI, we use on-device face contour detection (native pipelines like ML Kit) and asynchronous processing (Isolates) to perform fast and secure analysis.
                            </p>

                            <h3>Quality Control Gate</h3>
                            <p>
                                The biggest challenge in image analysis is the quality of the input image. Visage AI places a strict Quality Control (QC) gate before running the analysis engine.
                            </p>
                            <p>
                                It automatically detects images with insufficient illumination or blur, and blocks analysis. <strong>&quot;Prioritizing not outputting a result over outputting an incorrect result&quot;</strong> — this philosophy is designed to enhance operational reliability in the field.
                            </p>

                            <h3>Vermilion Border Index</h3>
                            <p>Signs of aging and dryness tend to appear on the Vermilion Border (the outline of the lips).</p>
                            <p>Visage AI extracts the outer area of the lips from facial landmark detection and calculates the luminance gradient (sharpness of the edge) from the inside of the lips toward the outer skin. If the border is judged to be ambiguous, the system adds items like &quot;lip liner&quot; or &quot;lip serum&quot; to the recommendation list, supporting evidence-based proposals.</p>

                            <h3>Periorbital Topography</h3>
                            <p>To evaluate &quot;dark circles&quot; and &quot;dullness around the eyes,&quot; we analyze using the CIELAB color space (L*a*b*) which is close to human vision, rather than simple RGB values.</p>
                            <p>It compares the standard color of the cheek (base skin tone) with the color difference (ΔE) and lightness difference (ΔL*) in a specific area under the eyes. By doing this, it evaluates the three-dimensional shadow of the face (such as eye bags) separately from dullness caused by coloration (Pigmentation), leading to optimal concealer or eye cream proposals.</p>

                            {/* Diagram 3 */}
                            <figure className="my-10 flex flex-col items-center">
                                <Image
                                    src="/images/screens/analysis_result_en.png"
                                    alt="Biometrics Engine Output"
                                    width={800}
                                    height={600}
                                    className="w-full max-w-3xl h-auto rounded-2xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.1)] border border-brand-pink-brown/10"
                                />
                                <figcaption className="sr-only">Biometrics Engine Analysis Results Dashboard</figcaption>
                            </figure>

                            <hr className="my-12 border-brand-pink-hover/30" />

                            <h2>3. What Visage AI Does Not Do</h2>
                            <p>To operate safely in a retail environment as a B2B tool, Visage AI strictly limits its scope of use.</p>
                            <ul>
                                <li>Does not perform medical diagnosis</li>
                                <li>Does not estimate psychology or personality</li>
                                <li>Is not intended for personal identification purposes</li>
                                <li>Does not analyze images that fail to meet quality conditions (e.g., poor lighting)</li>
                            </ul>

                            <hr className="my-12 border-brand-pink-hover/30" />

                            <h2>4. Visage Labs: Future Developments</h2>
                            <p>The Visage AI engine continues to be updated daily. Here are some of the features our R&D team is currently working on.</p>

                            <ul>
                                <li>
                                    <strong>Facial Geometry Profiler:</strong> Based on geometric features such as the ratio of the face&apos;s width and height, and the balance of the contour, it proposes the optimal placement of shading and highlighting.
                                    <br /><span className="text-sm opacity-80">*This feature is a geometric auxiliary tool intended for makeup style proposals and is not intended to estimate an individual&apos;s psychology or personality.</span>
                                </li>
                            </ul>

                            <p>To achieve both transparency of analysis and the beauty of the customer service flow. That is our design philosophy.</p>
                            <p>The Visage AI analysis engine will cross the &quot;language barrier&quot; of stores and provide a better experience for customers.</p>
                        </>
                    ) : (
                        /* Japanese Content */
                        <>
                            <p>
                                インバウンド観光客の増加により、美容小売の現場は大きな機会を迎えています。しかし同時に、「言葉の壁」という現場で繰り返し発生する課題が、スタッフの負担となっています。
                            </p>
                            <p>
                                「乾燥肌に合う下地」「ブルベ冬の肌を明るく見せる高発色リップ」——このような微細なニュアンスや美容の専門用語は、一般的な翻訳アプリでは正確に伝わりにくいのが実情です。
                            </p>
                            <p>
                                Visage AIは、言葉の壁を「翻訳」で埋めるのではなく、非言語の生体データ（Biometrics）を活用して、現場で使える形に「変換」します。
                            </p>
                            <p>
                                顔の骨格、肌の均一性、そして顔立ちのコントラストを瞬時に計算し、店舗スタッフが直感的に理解できる客観的な提案導線へと繋ぎます。
                            </p>
                            <p>
                                本稿では、Visage AIを業務利用に耐えうるB2Bツールとしている、解析エンジンの裏側と設計思想を公開します。
                            </p>

                            <hr className="my-12 border-brand-pink-hover/30" />

                            <h2>1. The B2B Workflow: 接客導線を美しくする3つのステップ</h2>
                            <p>
                                Visage AIの体験は、店頭のiPad（またはお客様のスマートフォン）で完結します。接客時間を短縮し、スタッフ間の提案品質のばらつきを抑えるための洗練されたワークフローです。
                            </p>



                            <h3>1. Scan & Validate（撮影と品質検証）</h3>
                            <p>
                                より正確な解析を行うため、店頭モードではその場でのライブ撮影を推奨しています。ギャラリーからの画像読み込みも可能ですが、後述する厳格な「品質管理ゲート」を通過した画像のみが解析へ進みます。
                            </p>

                            <h3>2. Translate to Product（おもてなしカードへの変換）</h3>
                            <p>
                                解析が完了すると、画面には「探しているもの：輪郭を整えるリップライナー / 高保湿コンシーラー」といった具体的な提案が表示されます。お客様はこれをスタッフに見せるだけで、的確な商品案内が始まります。
                            </p>

                            <h3>3. Secure Wipe（ゲストモードによるデータ消去）</h3>
                            <p>
                                店舗での利用（Guest Mode）では、接客終了時にワンタップでセッションを破棄します。端末のキャッシュや保存領域を含む関連データを一括削除することを目的としたフローを実装しており、プライバシー保護に配慮した設計となっています。
                            </p>

                            <hr className="my-12 border-brand-pink-hover/30" />

                            <h2>2. Under the Hood: 妥協なき「生体解析エンジン」</h2>
                            <p>
                                Visage AIのバックグラウンドでは、オンデバイスの顔輪郭検出（ML Kit等のネイティブパイプライン）と非同期処理（Isolate）を活用し、高速かつセキュアな解析を行っています。
                            </p>

                            <h3>Quality Control Gate（品質管理ゲート）</h3>
                            <p>
                                画像解析における最大の課題は、入力される画像の品質です。Visage AIは、解析エンジンを稼働させる前に厳格な品質管理（QC）ゲートを設けています。
                            </p>
                            <p>
                                照度が足りない画像や、ピンボケ（Blur）が発生している画像を自動で検知し、解析をブロックします。<strong>「誤った結果を出すのではなく、結果を出さないことを優先する」</strong>——この思想が、現場での運用信頼性を高める設計基盤となっています。
                            </p>

                            <h3>Vermilion Border Index（唇の境界解析）</h3>
                            <p>加齢や乾燥のサインは、唇の境界線（Vermilion Border）に表れやすいという特徴があります。</p>
                            <p>Visage AIは、顔のランドマーク検出から唇の外郭エリアを抽出し、唇の内側から外側の皮膚に向かう輝度勾配（エッジの鋭さ）を計算します。境界が曖昧になっていると判定された場合、システムは「リップライナー」や「唇美容液」などを推奨リストに追加し、根拠のある提案を支援します。</p>

                            <h3>Periorbital Topography（目元の透明度解析）</h3>
                            <p>「クマ」や「目元のくすみ」を評価するため、単純なRGB値ではなく、人間の視覚に近い CIELAB色空間（L*a*b*）を用いて解析します。</p>
                            <p>頬の基準色（ベース肌色）と、目の下の特定領域における色差（ΔE）および明度差（ΔL*）を比較。これにより、顔の立体的な影（涙袋など）と、色味由来のくすみ（Pigmentation）を分けて評価し、最適なコンシーラーやアイクリームの提案へと繋げます。</p>

                            {/* Diagram 3 */}
                            <figure className="my-10 flex flex-col items-center">
                                <Image
                                    src="/images/screens/analysis_result_en.png"
                                    alt="生体解析出力結果"
                                    width={800}
                                    height={600}
                                    className="w-full max-w-3xl h-auto rounded-2xl shadow-[0_4px_24px_-4px_rgba(0,0,0,0.1)] border border-brand-pink-brown/10"
                                />
                                <figcaption className="sr-only">生体解析エンジンの結果ダッシュボードのスクリーンショット</figcaption>
                            </figure>

                            <hr className="my-12 border-brand-pink-hover/30" />

                            <h2>3. Visage AI が「行わないこと」</h2>
                            <p>B2Bの接客ツールとして安全に運用するため、Visage AIは利用範囲を厳格に制限しています。</p>
                            <ul>
                                <li>医療診断は行わない</li>
                                <li>心理・性格推定を行わない</li>
                                <li>個人識別目的での利用を前提としない</li>
                                <li>品質条件を満たさない画像は解析しない</li>
                            </ul>

                            <hr className="my-12 border-brand-pink-hover/30" />

                            <h2>4. Visage Labs: 今後の展開</h2>
                            <p>Visage AIのエンジンは、日々アップデートを続けています。現在、研究開発チームが取り組んでいる機能の一部をご紹介します。</p>

                            <ul>
                                <li>
                                    <strong>Facial Geometry Profiler（顔の幾何バランス解析）:</strong> 顔の横幅・縦幅の比率や、輪郭のバランスなどの幾何特徴（Geometry）をもとに、シェーディングやハイライトの最適な配置を提案します。
                                    <br /><span className="text-sm opacity-80">※本機能はメイクアップのスタイル提案を目的とした幾何学的補助ツールであり、個人の心理や性格を推定するものではありません。</span>
                                </li>
                            </ul>

                            <p>解析の透明性と、接客導線の美しさを両立させること。それが私たちの設計思想です。</p>
                            <p>Visage AIの解析エンジンが、店舗の「言葉の壁」を越え、お客様により良い体験を提供します。</p>
                        </>
                    )}

                </article>
            </div>
        </div>
    );
}

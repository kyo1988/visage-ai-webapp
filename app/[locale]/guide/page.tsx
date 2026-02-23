import type { Metadata } from 'next';
import Image from 'next/image';

type PageProps = {
    params: { locale: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const isEn = params.locale === 'en';

    const title = isEn
        ? 'Visage AI Store Guide'
        : 'Visage AI 店舗向けガイド';

    const description = isEn
        ? 'In-store service manual crossing language barriers.'
        : '現場で使えるインバウンド接客マニュアル。';

    const path = `/${params.locale}/guide`;

    return {
        title,
        description,
        alternates: {
            canonical: path,
            languages: {
                en: '/en/guide',
                ja: '/ja/guide',
                'x-default': '/en/guide',
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

export default function GuidePage({
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
                            {isEn ? "Visage AI Store Guide" : "Visage AI 店舗向けガイド"}
                        </h1>
                        <p className="text-xl text-brand-text-sub max-w-2xl mx-auto">
                            {isEn
                                ? "In-store service manual crossing language barriers."
                                : "現場で使えるインバウンド接客マニュアル"}
                        </p>
                    </div>

                    {isEn ? (
                        /* English Content */
                        <>
                            <p>
                                Visage AI is an in-store customer service tool that helps staff recommend cosmetics that suit each customer beyond language barriers.
                                It reduces the time spent using translation apps and shows a clear proposal direction in just a few seconds based on facial image analysis (such as facial geometry and skin tone).
                            </p>
                            <p>
                                This guide explains a smooth customer service flow using a shared tablet in the store (Guest Mode).
                            </p>

                            <hr className="my-12 border-brand-pink-hover/30" />

                            <h2>1. Basic Customer Service Flow</h2>
                            <p>On-site operations are completed in 3 steps: <strong>&quot;Shoot&quot;</strong>, <strong>&quot;Check&quot;</strong>, and <strong>&quot;Finish&quot;</strong>.</p>

                            <h3>Step 1: Guide the Scan (On-site shooting recommended)</h3>
                            <p>Pass the tablet to the customer and have them scan their face following the instructions on the screen. Because it supports a multi-language UI, staff explanations can be kept to a minimum.</p>

                            <div className="rounded-2xl bg-brand-beige p-6 my-8 border border-brand-pink-brown/10 shadow-sm">
                                <h4 className="text-brand-brown-dark mt-0">💡 Pre-service Checklist (10 sec):</h4>
                                <ul className="mb-0">
                                    <li>Check &quot;May I scan your face?&quot; before shooting.</li>
                                    <li>No shadows falling on the face.</li>
                                    <li>Only 1 customer is in the frame.</li>
                                    <li>Face is not hidden (masks, deep bangs, reflection from glasses).</li>
                                </ul>
                            </div>

                            <h3>Step 2: Check the Hospitality Card (Show to Staff)</h3>
                            <p>When the analysis is complete, a &quot;Hospitality Card&quot; for staff will be displayed in your local language (e.g., Japanese).</p>
                            <ul>
                                <li><strong>[Skin type / Features]</strong> (e.g., Dry skin / Low contrast)</li>
                                <li><strong>[Looking for]</strong> (e.g., High moisturizing base / Lip liner to adjust contour)</li>
                            </ul>
                            <p>The staff will pick up and guide the products according to this &quot;Looking for&quot; section. Intentions are easily conveyed across languages without needing to explain detailed beauty terms.</p>

                            {/* Graphic Placeholder for Step 2 */}
                            <figure className="my-10 flex flex-col items-center">
                                <Image
                                    src="/images/screens/staff_card_en.png"
                                    alt="Hospitality Card Screen"
                                    width={800}
                                    height={500}
                                    className="w-full max-w-2xl h-auto rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-brand-pink-brown/10"
                                />
                                <figcaption className="sr-only">Store guide hospitality card screen</figcaption>
                            </figure>

                            <h3>Step 3: End Session (Finish)</h3>
                            <p>When customer service is finished, be sure to press <strong>&quot;Finish&quot;</strong> at the bottom of the screen.
                                This deletes the session information on the device and safely returns to the initial screen ready for the next customer.</p>

                            <hr className="my-12 border-brand-pink-hover/30" />

                            <h2>2. About Scan Errors and Quality Checks</h2>
                            <p>Visage AI checks the quality of photos to prevent incorrect product proposals. &quot;Retry&quot; may be displayed in the following cases:</p>
                            <ul>
                                <li>Too dark or backlit</li>
                                <li>The tablet moves and blurs during shooting</li>
                                <li>Part of the face is hidden, or features of the eyes/mouth cannot be read well</li>
                            </ul>
                            <p>Stable analysis results can be displayed with consistent standards precisely because there are strict quality checks. When an error occurs, please ask them to move to a bright place and try again. <strong>If the customer does not wish to be photographed, or if retries fail twice, please switch to a normal consultation flow without forcing the scan.</strong></p>

                            <hr className="my-12 border-brand-pink-hover/30" />

                            <h2>3. Frequently Asked Questions (FAQ)</h2>
                            <h4>Q. The customer cannot face the front well</h4>
                            <p>A. Hold the tablet a little higher and use gestures to guide them so that their face is in the center of the screen.</p>

                            <h4>Q. It results in an error due to reflection from glasses</h4>
                            <p>A. If possible, ask them to take them off temporarily, or change the angle of the face slightly and try again.</p>

                            <h4>Q. The customer says &quot;I want to use it on my own smartphone&quot;</h4>
                            <p>A. If they wish, please guide them to the Visage AI app. Supported languages and usage can be guided according to the display in the app.</p>
                        </>
                    ) : (
                        /* Japanese Content */
                        <>
                            <p>
                                Visage AIは、言葉の壁を越えて「似合うコスメ提案」をサポートする店舗向け接客ツールです。翻訳アプリに入力する時間を減らし、顔画像の解析結果（骨格や肌トーンなど）をもとに、提案の方向性を数秒で表示します。
                            </p>
                            <p>
                                本ガイドでは、店舗の共有タブレット（Guest Mode）を使用したスムーズな接客フローを解説します。
                            </p>

                            <hr className="my-12 border-brand-pink-hover/30" />

                            <h2>1. 接客の基本フロー</h2>
                            <p>現場での操作は<strong>「撮影」「確認」「終了」</strong>の3ステップで完結します。</p>

                            <h3>Step 1: スキャンのご案内（その場での撮影を推奨）</h3>
                            <p>お客様にタブレットをお渡しし、画面の案内に沿って顔をスキャンしていただきます。多言語UIに対応しているため、スタッフの説明は最小限で進められます。</p>

                            <div className="rounded-2xl bg-brand-beige p-6 my-8 border border-brand-pink-brown/10 shadow-sm">
                                <h4 className="text-brand-brown-dark mt-0">💡 接客前チェック（10秒）:</h4>
                                <ul className="mb-0">
                                    <li>撮影前に「スキャンしてもよろしいですか？」と一言確認した。</li>
                                    <li>顔に強い影が落ちていない。</li>
                                    <li>フレーム内にはお客様1名だけが入っている。</li>
                                    <li>マスク、深い前髪、帽子、眼鏡の強い反射で顔が隠れていない。</li>
                                </ul>
                            </div>

                            <h3>Step 2: おもてなしカードの確認 (Show to Staff)</h3>
                            <p>解析が終わると、画面にはスタッフ向けの「おもてなしカード」が日本語で表示されます。</p>
                            <ul>
                                <li><strong>【肌質・顔立ち】</strong>（例：乾燥肌 / コントラスト低め）</li>
                                <li><strong>【探しているもの】</strong>（例：高保湿下地 / 輪郭を整えるリップライナー）</li>
                            </ul>
                            <p>スタッフは、この「探しているもの」に沿って商品をピックアップしてご案内します。外国語で細かな美容用語を説明しなくても、言葉を超えて意図が伝わりやすくなります。</p>

                            {/* Graphic Placeholder for Step 2 */}
                            <figure className="my-10 flex flex-col items-center">
                                <Image
                                    src="/images/screens/staff_card_ja.png"
                                    alt="おもてなしカード画面"
                                    width={800}
                                    height={500}
                                    className="w-full max-w-2xl h-auto rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] border border-brand-pink-brown/10"
                                />
                                <figcaption className="sr-only">おもてなしカード画面のスクリーンショット</figcaption>
                            </figure>

                            <h3>Step 3: セッション終了 (Finish)</h3>
                            <p>接客が終わったら、画面下の<strong>「Finish / 終了」</strong>を必ず押してください。
                                端末上のセッション情報を削除し、次の接客に使える初期画面へ安全に戻ります。</p>

                            <hr className="my-12 border-brand-pink-hover/30" />

                            <h2>2. スキャンエラーと品質チェックについて</h2>
                            <p>Visage AIは、誤った商品提案を防ぐため、写真の品質をチェックしています。以下のような場合、「やり直し」が表示されることがあります。</p>
                            <ul>
                                <li>暗すぎる、または逆光になっている</li>
                                <li>撮影時にタブレットが動いてブレている</li>
                                <li>顔の一部が隠れている、または目元・口元の特徴がうまく読み取れない</li>
                            </ul>
                            <p>厳しい品質チェックがあるからこそ、一貫した基準で安定した解析結果を表示できます。エラーが出た際は、明るい場所へ移動して再撮影を促してください。<strong>お客様が撮影を希望されない場合や、再撮影が2回連続で失敗する場合は、無理に継続せず通常のご案内へ切り替えてください。</strong></p>

                            <hr className="my-12 border-brand-pink-hover/30" />

                            <h2>3. よくある困りごと（FAQ）</h2>
                            <h4>Q. お客様がうまく顔を正面に向けられない</h4>
                            <p>A. タブレットを少し高めに持ち、画面中央に顔が入るようジェスチャーでご案内ください。</p>

                            <h4>Q. 眼鏡の反射でエラーになる</h4>
                            <p>A. 可能であれば一時的に外していただくか、顔の角度を少し変えてお試しください。</p>

                            <h4>Q. お客様が「自分のスマホでも使いたい」とおっしゃった</h4>
                            <p>A. ご希望があれば、Visage AIアプリをご案内ください。対応言語や利用方法は、アプリ内の表示に沿ってご案内できます。</p>
                        </>
                    )}

                </article>
            </div>
        </div>
    );
}

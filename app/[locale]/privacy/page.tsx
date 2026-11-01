type PrivacyCopy = {
  pageTitle: string;
  updatedAt: string;
  intro: string;
  sections: Array<{
    title: string;
    body?: string;
    bullets?: string[];
  }>;
  contactLabel: string;
  contactEmail: string;
};

const enCopy: PrivacyCopy = {
  pageTitle: 'Privacy Policy',
  updatedAt: 'Last Updated: November 1, 2026',
  intro:
    'Welcome to Visage AI. This policy explains what data is processed on your device, what is sent to our backend, and why.',
  sections: [
    {
      title: '1. Information We Collect',
      body: 'We minimize data collection and process skin analysis primarily on-device.',
      bullets: [
        'Photos and Camera Access: Used only when the user explicitly starts analysis.',
        'Analysis Data: Anonymous skin scores may be stored for history and product improvement.',
        'Anonymous User ID: Firebase Anonymous Auth is used to associate analysis history without name/email.',
      ],
    },
    {
      title: '2. Face Images and On-Device Analysis',
      bullets: [
        'Facial image analysis runs on-device using Apple frameworks (Core Image, Metal, Vision, Core ML).',
        'No biometric identity template is generated or stored.',
        'Raw face images are processed transiently and are not uploaded as part of standard analysis.',
      ],
    },
    {
      title: '3. Data Processing and Transmission',
      body: 'Visage AI separates on-device processing from server-side infrastructure clearly:',
      bullets: [
        'On-device only (no external transmission): skin analysis, Deep Skin visualization (melanin/redness), face detection, and score calculation.',
        'Sent to first-party backend (visage-ai-api.vercel.app): anonymized scores, timestamp, location (only for nearby recommendations), Firebase auth token.',
        'Purpose: diagnosis history, nearby place recommendations, and QR-based store-to-online handoff.',
      ],
    },
    {
      title: '4. First-Party Backend and Infrastructure',
      bullets: [
        'visage-ai-api.vercel.app is a first-party backend owned and operated by Faceless (Visage AI).',
        'Infrastructure services: Firebase (auth/database/analytics) and Vercel (hosting).',
        'These services are used as infrastructure and data platform, not as third-party AI analysis providers.',
      ],
    },
    {
      title: '4a. Optional Public-Site Analytics',
      bullets: [
        'With your separate affirmative choice, we use cookieless Vercel Web Analytics on public /app and /learn pages to measure aggregated page visits, Learn-to-app and App Store link clicks, approximate region, device and referral information. We use it for marketing site improvement, not for diagnosis or app-user identification.',
        'Vercel Web Analytics is disabled until you opt in to the updated consent prompt. Earlier Google Analytics consent does not automatically enable Vercel Web Analytics.',
        'We suppress all other routes and strip URL query strings and fragments before events are submitted. Facial photos, skin scores, analysis identifiers, authentication tokens and personal customer records are not sent through this integration.',
        'Declining the optional website analytics does not prevent use of Visage AI. You can change your choice through the browser site-data controls.',
      ],
    },
    {
      title: '5. Third-Party AI Services',
      bullets: [
        'We do NOT send user data to OpenAI, Anthropic, Google Gemini, or any other third-party AI service.',
        'Core analysis is performed on-device and does not require cloud AI inference.',
        'Nearby place recommendations are rule-based (distance/category matching) and do not execute third-party AI model inference.',
      ],
    },
    {
      title: '6. Data Retention and Deletion',
      bullets: [
        'On-device data can be removed by uninstalling the app.',
        'Stored cloud records are anonymized and used for service operation and history features.',
      ],
    },
    {
      title: '7. Changes to This Policy',
      body:
        'We may update this policy as our service evolves. Material changes will be reflected on this page.',
    },
  ],
  contactLabel: 'Contact',
  contactEmail: 'kyoharada@visageaiconsulting.com',
};

const jaCopy: PrivacyCopy = {
  pageTitle: 'プライバシーポリシー',
  updatedAt: '最終更新日: 2026年11月1日',
  intro:
    'Visage AI におけるデータ処理と送信の方針を説明します。端末内処理とバックエンド送信を明確に区別しています。',
  sections: [
    {
      title: '1. 取得する情報',
      body: '当社はデータ最小化を原則とし、肌解析の主要処理を端末内で実行します。',
      bullets: [
        'カメラ・写真アクセス: ユーザーが解析を開始した場合にのみ利用します。',
        '解析データ: 匿名化された肌スコアを履歴表示や品質改善のために保存する場合があります。',
        '匿名ユーザーID: Firebase匿名認証により、氏名・メールなしで履歴連携を行います。',
      ],
    },
    {
      title: '2. 顔画像とオンデバイス解析',
      bullets: [
        '顔画像解析は Apple フレームワーク（Core Image / Metal / Vision / Core ML）で端末内実行されます。',
        '個人識別のための生体テンプレートは生成・保存しません。',
        '標準解析フローでは生の顔画像を外部サーバーへアップロードしません。',
      ],
    },
    {
      title: '3. データ処理と送信',
      body: 'Visage AI は端末内処理とサーバー送信を次のとおり分離しています。',
      bullets: [
        '端末内のみ（外部送信なし）: 肌解析、Deep Skin 可視化（メラニン・赤み）、顔検出、スコア算出。',
        'first-party バックエンド（visage-ai-api.vercel.app）へ送信: 匿名化スコア、診断日時、位置情報（近隣推薦利用時のみ）、Firebase認証トークン。',
        '用途: 診断履歴表示、近隣店舗推薦、QR連携による店頭→オンライン導線。',
      ],
    },
    {
      title: '4. first-party バックエンドとインフラ',
      bullets: [
        'visage-ai-api.vercel.app は Faceless（Visage AI）が所有・運営する first-party バックエンドです。',
        '利用インフラ: Firebase（認証・DB・分析）、Vercel（ホスティング）。',
        'これらはインフラ基盤として使用しており、第三者AI解析サービスとしては利用していません。',
      ],
    },
    {
      title: '4a. 公開サイトの任意アクセス解析',
      bullets: [
        '新しい同意画面で明示的に同意した場合のみ、Cookieを使用しない Vercel Web Analytics を公開 /app・/learn ページで使用し、ページ閲覧数、Learnから/appへのリンクとApp Storeへのリンクのクリック数、概略地域、端末、参照元を集計します。診断やアプリ利用者の個人識別には使いません。',
        '旧 Google Analytics の同意だけでは Vercel Web Analytics を自動的に有効化しません。',
        '対象外ページは送信せず、URLのクエリ文字列やフラグメントは送信前に削除します。顔写真、肌解析結果、分析ID、認証トークン、顧客情報は本仕組みで送信しません。',
        '任意の解析を拒否しても Visage AI は利用できます。選択内容はブラウザーのサイトデータ設定から変更できます。',
      ],
    },
    {
      title: '5. 第三者AIサービスへの送信',
      bullets: [
        'OpenAI、Anthropic、Google Gemini、その他第三者AIサービスへユーザーデータを送信しません。',
        '主要な肌解析はオンデバイス処理で完結し、クラウドAI推論を前提としません。',
        '近隣店舗推薦は距離・カテゴリに基づくルールベース処理であり、第三者AIモデル推論は実行しません。',
      ],
    },
    {
      title: '6. データ保持と削除',
      bullets: [
        '端末内データはアプリのアンインストールで削除できます。',
        'クラウド側データは匿名化され、サービス運用と履歴機能のために利用されます。',
      ],
    },
    {
      title: '7. 本ポリシーの変更',
      body:
        '本ポリシーはサービス改善に伴い更新される場合があります。重要な変更は本ページに反映します。',
    },
  ],
  contactLabel: 'お問い合わせ',
  contactEmail: 'kyoharada@visageaiconsulting.com',
};

export default function PrivacyPolicyPage({
  params,
}: {
  params: { locale: string };
}) {
  const { locale } = params;
  const isJa = locale === 'ja';
  const copy = isJa ? jaCopy : enCopy;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8 font-sans text-gray-800">
      <div className="w-full max-w-3xl rounded-lg bg-white p-8 shadow-md md:p-12">
        <header className="mb-6 border-b pb-6">
          <h1 className="text-3xl font-bold text-gray-900 md:text-4xl">
            {copy.pageTitle}
          </h1>
          <p className="mt-2 text-gray-500">{copy.updatedAt}</p>
        </header>

        <div className="space-y-6 text-base leading-relaxed">
          <p>{copy.intro}</p>

          {copy.sections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-2 text-2xl font-semibold text-gray-900">
                {section.title}
              </h2>
              {section.body ? <p>{section.body}</p> : null}
              {section.bullets ? (
                <ul className="mt-2 list-inside list-disc space-y-1 pl-4">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          <section>
            <h2 className="mb-2 text-2xl font-semibold text-gray-900">
              {copy.contactLabel}
            </h2>
            <p>
              <a
                href={`mailto:${copy.contactEmail}`}
                className="text-blue-600 hover:underline"
              >
                {copy.contactEmail}
              </a>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

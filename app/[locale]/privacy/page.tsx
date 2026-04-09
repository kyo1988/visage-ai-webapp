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
  updatedAt: 'Last Updated: April 10, 2026',
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
        'Sent to first-party backend (api.visageaiconsulting.com): anonymized scores, timestamp, location (only for nearby recommendations), Firebase auth token.',
        'Purpose: diagnosis history, nearby place recommendations, and QR-based store-to-online handoff.',
      ],
    },
    {
      title: '4. First-Party Backend and Infrastructure',
      bullets: [
        'api.visageaiconsulting.com is a first-party backend owned and operated by Faceless (Visage AI).',
        'Infrastructure services: Firebase (auth/database/analytics) and Vercel (hosting).',
        'These services are used as infrastructure and data platform, not as third-party AI analysis providers.',
      ],
    },
    {
      title: '5. Third-Party AI Services',
      bullets: [
        'We do NOT send user data to OpenAI, Anthropic, Google Gemini, or any other third-party AI service.',
        'Core analysis is performed on-device and does not require cloud AI inference.',
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
  updatedAt: '最終更新日: 2026年4月10日',
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
        'first-party バックエンド（api.visageaiconsulting.com）へ送信: 匿名化スコア、診断日時、位置情報（近隣推薦利用時のみ）、Firebase認証トークン。',
        '用途: 診断履歴表示、近隣店舗推薦、QR連携による店頭→オンライン導線。',
      ],
    },
    {
      title: '4. first-party バックエンドとインフラ',
      bullets: [
        'api.visageaiconsulting.com は Faceless（Visage AI）が所有・運営する first-party バックエンドです。',
        '利用インフラ: Firebase（認証・DB・分析）、Vercel（ホスティング）。',
        'これらはインフラ基盤として使用しており、第三者AI解析サービスとしては利用していません。',
      ],
    },
    {
      title: '5. 第三者AIサービスへの送信',
      bullets: [
        'OpenAI、Anthropic、Google Gemini、その他第三者AIサービスへユーザーデータを送信しません。',
        '主要な肌解析はオンデバイス処理で完結し、クラウドAI推論を前提としません。',
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

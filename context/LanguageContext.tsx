'use client';

import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
  ReactNode,
} from "react";

// --- Types ---
type Language = "ja" | "en";
type Translations = Record<Language, Record<string, string>>;
interface LanguageContextType {
  t: (key: string) => string;
  lang: Language;
  changeLanguage: (newLang: Language) => void;
}

// --- 翻訳データ ---
const translations: Translations = {
  ja: {
    nav_features: "特徴", nav_story: "ストーリー", nav_technology: "技術", nav_results: "成果", nav_contact: "お問い合わせ",
    hero_title: "Visage AI：AIとデータで紡ぐ、次世代の「肌物語」",
    hero_subtitle: "美容ブランド・ECのための、顧客が“納得する”肌診断ソリューション。",
    hero_description: "根拠なき提案で顧客を失う時代は終わり。Visage AIは、最先端のAIと皮膚科学で、一人ひとりの肌の真実を紐解き、パーソナライズされた美容体験を創造。顧客の心に響く「肌物語」で、貴社のブランドロイヤルティを無限に高めます。",
    hero_cta: "無料デモを体験する",
    features_main_title: "Visage AIが紡ぐ「3つの変革」",
    features_main_subtitle: "貴社は、顧客の「納得」と「信頼」を基盤に、ビジネスを加速させます。",
    feature1_title: "科学に裏打ちされた顧客理解の深化",
    feature1_desc: "勘や経験に頼らず、データに基づいた科学的アプローチで、顧客一人ひとりの肌状態を深く理解。最先端AIと「説明可能性（XAI）」により、根拠ある提案が顧客に深く響きます。",
    feature2_title: "心に触れる真のパーソナライズ",
    feature2_desc: "肌状態、生活習慣、価値観までを統合し、最適な製品・ケアを提案。AI診断とLLM連携で自然言語による「あなただけの肌物語」を生成し、顧客のロイヤルティを劇的に高めます。",
    feature3_title: "揺るぎないブランド信頼の構築",
    feature3_desc: "AIが「なぜそう判断したか」を画像と数値で明確に提示。顧客は提案を安心して受け入れ、貴社ブランドへの信頼感を深めます。口コミやNPSスコアの改善に直結します。",
    story_main_title: "なぜ、今Visage AIが必要なのか？",
    story_main_subtitle: "美容業界の常識を覆す、顧客との新しい関係性。",
    story_para1: "従来の肌診断は、その結果が「なぜそうなのか」という根拠が不明瞭でした。この「根拠なき提案」は、顧客の不信感を招き、リピート購入や再来店を阻む要因に。熟練美容部員の経験と勘に頼る属人的な接客も、デジタル化が進む現代において、品質のばらつきや新人育成の壁となっていました。",
    story_para2: "Visage AIは、この長年の課題に終止符を打ちます。私たちが提供するのは、単なる診断ツールではありません。それは、顧客が自身の肌と真摯に向き合い、貴社の提案に心から「納得」し、「信頼」を寄せるための、全く新しいコミュニケーション基盤です。科学とデータで裏付けられた透明性のある提案が、顧客の心を掴み、貴社の売上とブランド価値を飛躍的に向上させます。",
    story_img_alt: "美容科学の分析とパーソナライズのイメージ",
    tech_main_title: "Visage AIの「コア技術」と、驚くべき「説明可能性」",
    tech_main_subtitle: "AIが「なぜ」そう判断したのか？その根拠を明確に示します。",
    tech_title1: "精密な肌解析を可能にする深層学習モデル",
    tech_desc1: "従来の画像フィルタ処理から飛躍的に進化したVisage AIは、畳み込みニューラルネットワーク（CNN）やVision Transformer（ViT）といった最先端の深層学習モデルを駆使します。これにより、「しわ」「シミ」「キメ」「毛穴」「赤み」「油分・水分バランス」「質感」といった多岐にわたる肌状態を、人間の目では捉えきれない微細なレベルで詳細かつ高精度に定量化。貴社の特定製品がターゲットとする肌悩みを客観的に数値化し、改善度合いを継続的に可視化します。",
    tech_title2: "顧客の「なるほど」を引き出すGrad-CAM++による可視化",
    tech_desc2: "Visage AIの最大の特徴は、AIが診断の根拠とした顔の特定部位を、Grad-CAM++技術を用いてヒートマップとしてリアルタイムで画像に重ねて表示できる点です。顧客は自身の肌の課題が「Tゾーンの毛穴」や「目元の小ジワ」といった具体的な部位にあり、それがAI診断にどう影響しているかを視覚的に理解できます。これにより、美容部員は自信を持って製品・ケア方法を提案でき、顧客の納得感と信頼性が飛躍的に向上します。",
    tech_img1_caption: "AIによる顔分析のビジュアル説明",
    tech_img2_caption: "AI診断ヒートマップ例",
    ux_main_title: "ストレスフリーな「診断UX」と心に響く「パーソナルアドバイス」",
    ux_main_subtitle: "AIと人間の協調で「あなただけの肌物語」を紡ぎ、顧客体験を最大化します。",
    ux_title1: "ユーザー離脱を防ぐ、“優しい”診断体験",
    ux_desc1: "撮影環境に左右されやすい肌診断の課題を解決するため、リアルタイム撮影ガイドと画像品質自動判定機能を搭載。最適な撮影条件を指示し、光量不足やブレがあっても自動補正。不十分な画像でも可能な範囲で診断と改善ガイドを提供し、ユーザー体験を損ないません。これにより、診断完了率と顧客満足度が向上します。",
    ux_title2: "高信頼性パーソナライズド提案と「あなただけの肌物語」",
    ux_desc2: "AI診断データ、部位別根拠、顧客の申告情報（悩み、生活習慣）を統合し、LLM（大規模言語モデル）が自然言語で「肌物語」として解説します。さらに、RAG（Retrieval-Augmented Generation）技術で専門知識データベースから情報を引き出し、幻覚（誤情報）のない、根拠に基づいたアドバイスを生成。貴社のブランドトーンに合わせたカスタマイズも可能で、顧客は提案を「自分事」として受け入れ、製品への信頼と継続的なケアへのモチベーションを格段に高めます。",
    results_main_title: "Visage AI導入で、貴社が手にする「具体的な成果」",
    results_main_subtitle: "顧客の「納得」が、売上向上とLTV最大化に直結します。",
    result1_title: "顧客の再来店率が20%向上",
    result1_desc: "百貨店ブランド「Luxury Cosmetics」様（想定事例）では、Visage AI導入により、顧客が自身の肌状態と改善プロセスを客観的に理解。AIの根拠ある提案が顧客の納得感を劇的に向上させ、再来店率が平均20%向上しました。",
    result2_title: "美容部員の売上貢献度が平均5%伸長",
    result2_desc: "EC専業ブランド「Beauty Online Store」様（想定事例）では、オンラインカウンセリングにVisage AIを活用。美容部員が診断結果をリアルタイム共有することで提案の説得力が向上し、平均顧客単価が5%増加。特に高価格帯製品の購入率が顕著に伸びました。",
    result3_title: "顧客満足度（NPS）が10ポイント改善",
    result3_desc: "ウェルネスブランド「Wellness Life」様（想定事例）がVisage AIを定期カウンセリングに導入後、顧客は肌変化を数値とグラフで実感。「自分の肌が本当に良くなっている」というポジティブな体験が増加し、NPSが導入前と比較して10ポイント改善。",
    results_conclusion: "Visage AIは、貴社の顧客エンゲージメント、売上、顧客満足度の向上に直接的に貢献します。",
    privacy_main_title: "貴社と顧客を守る「最高水準のプライバシーと法規制対応」",
    privacy_main_subtitle: "安心と信頼を基盤に、貴社のブランド価値を確固たるものにします。",
    privacy1_title: "顔画像データの「オンデバイス処理」",
    privacy1_desc: "肌診断に利用する顔画像データは、ユーザー端末内で完結（Edge AI）。外部サーバーへ一切送信・保存せず、プライバシーリスクを根本的に排除。GDPRやCCPAなど厳格な国際規制にも適合します。",
    privacy2_title: "薬機法・景品表示法に厳格準拠",
    privacy2_desc: "サービス設計段階から弁護士と連携し、AI診断結果や推奨製品に関する表現について、薬機法・景品表示法に厳格に準拠したガイドラインを策定。誤解を招く表現や不適切な効果効能表示から貴社ブランドを守ります。",
    privacy3_title: "継続的な品質保証とMLOps体制",
    privacy3_desc: "AIモデルの精度維持のため、継続的なデータ収集・定期再学習・精度検証（MLOps体制）を整備。常に最新・最適な診断品質を保証し、顧客の信頼を維持します。専用サポート窓口も設置し、貴社の安心感を両立します。",
    scalability_main_title: "貴社の未来を拓く「拡張性とスケーラビリティ」",
    scalability_main_subtitle: "ビジネスモデルとニーズに合わせた柔軟な提供形態と、データによる新たな事業機会。",
    scalability1_title: "貴社のビジネスモデルに合わせた柔軟な導入形態",
    scalability1_desc: "Visage AIの診断エンジンはAPI/SDKによるモジュール化設計を採用。貴社の既存ECサイト、ブランドアプリ、LINEミニアプリなど、多様なチャネルに迅速かつ容易に組み込み可能です。ノーコードツール連携も視野に入れ、大規模なB2B2C展開から中小規模事業者まで幅広く対応。将来的にPB製品への組み込みやOEM提供も可能です。",
    scalability2_title: "データドリブンな新規事業創出とグローバル展開支援",
    scalability2_desc: "取得した肌診断データは、匿名化・集計処理を経てAIモデルの精度向上や新機能開発に活用。統計データとして美容・ヘルスケア業界向けの分析レポート提供も計画しており、データドリブンな新規事業創出や外部パートナー連携の可能性を広げます。また、サービス設計時から多言語対応と各国法規制への適合を推進しており、貴社のグローバルSaaS・OEMビジネスへのスムーズな展開を支援します。",
    scalability_img_alt: "グローバルに広がるVisage AIのネットワーク",
    cta_bottom_main_title: "次のステップ：今すぐ貴社の美容DXを加速する「3つの選択肢」",
    cta_bottom_main_subtitle: "貴社固有の課題解決と、新たな顧客体験創出を今すぐ始めませんか？",
    cta1_title: "【無料】個別デモンストレーション",
    cta1_desc: "貴社の製品画像を使ったシミュレーションを含め、Visage AIの機能と貴社ビジネスへの適用イメージを個別にご案内します。具体的な操作感とともに、貴社の課題解決への道筋を体験ください。",
    cta1_btn: "デモを申し込む",
    cta2_title: "【限定2社】初期PoCパートナー募集",
    cta2_desc: "Phase 1のプロフェッショナルサービスを、特別割引にて先行導入いただけます。貴社固有の顧客データとVisage AIの診断データを統合分析し、具体的なマーケティング戦略の立案・実行を伴走します。",
    cta2_btn: "PoC詳細を見る",
    cta3_title: "【資料請求】サービス概要資料ダウンロード",
    cta3_desc: "Visage AIの全体像、技術詳細、価格体系などをまとめた資料をご提供します。貴社のペースで詳細にご確認いただき、Visage AIが提供する価値を深くご理解いただけます。",
    cta3_btn: "資料をダウンロード",
    footer_tagline: "AIとデータで紡ぐ、次世代の「肌物語」",
    footer_company_name: "株式会社Faceless", footer_website_text: "Webサイト", footer_website_url: "http://www.visageaiconsulting.com", footer_email_text: "メール", footer_email_address: "kyoharada@visageaiconsulting.com",
    footer_sitemap: "サイトマップ", footer_follow_sns: "SNSをフォロー", footer_copyright: "Faceless Inc. All Rights Reserved.",
  },
  en: {
    nav_features: "Features", nav_story: "Story", nav_technology: "Technology", nav_results: "Results", nav_contact: "Contact",
    hero_title: 'Visage AI: Weave the Next-Gen "Skin Story" with AI and Data',
    hero_subtitle: "A customer-convincing skin diagnostic solution for beauty brands & e-commerce.",
    hero_description: "The era of losing customers due to unsubstantiated proposals is over. Visage AI leverages cutting-edge AI and dermatological science to unravel the truth of each individual's skin, creating personalized beauty experiences. With a \"skin story\" that resonates with customers, we'll dramatically boost your brand loyalty.",
    hero_cta: "Experience a Free Demo",
    features_main_title: 'Visage AI: "3 Transformations" We Deliver',
    features_main_subtitle: 'Accelerate your business by building on customer "conviction" and "trust."',
    feature1_title: "Deepened Customer Understanding Backed by Science",
    feature1_desc: 'Understand each customer\'s skin condition deeply with a scientific, data-driven approach, not just intuition. Cutting-edge AI with "Explainable AI (XAI)" ensures proposals deeply resonate with customers.',
    feature2_title: "Truly Personalized Customer Experience that Touches Hearts",
    feature2_desc: 'Integrate skin condition, lifestyle, and values to propose optimal products and care. AI diagnostics combined with LLM generate a natural language "skin story" just for them, dramatically increasing customer loyalty.',
    feature3_title: "Building Unwavering Brand Trust",
    feature3_desc: "AI clearly shows the rationale behind its judgments with images and data. Customers confidently accept proposals, deepening their trust in your brand. This directly leads to improved word-of-mouth and NPS scores.",
    story_main_title: "Why is Visage AI Essential Now?",
    story_main_subtitle: "A New Customer Relationship Revolutionizing Beauty Industry Norms.",
    story_para1: "Traditional skin diagnoses often lack clarity on 'why' a certain result was given. These 'unsubstantiated proposals' led to customer distrust, hindering repeat purchases and revisits. Over-reliance on the intuition of skilled beauty advisors also resulted in inconsistent service quality and challenges in training new staff amidst digital shifts.",
    story_para2: "Visage AI puts an end to these long-standing issues. We don't just offer a diagnostic tool; we provide a completely new communication foundation where customers genuinely 'understand' their skin and place their 'trust' in your brand's proposals. Transparent, science-backed proposals will capture customer hearts and significantly boost your sales and brand value.",
    story_img_alt: "Image of beauty science analysis and personalization",
    tech_main_title: 'Visage AI\'s "Core Technology" and Remarkable "Explainability"',
    tech_main_subtitle: "We clearly show 'why' the AI made its judgment, providing clear evidence.",
    tech_title1: "Advanced Deep Learning Models for Precise Skin Analysis",
    tech_desc1: "Evolved beyond traditional image filtering, Visage AI utilizes cutting-edge deep learning models like Convolutional Neural Networks (CNN) and Vision Transformers (ViT). This enables precise, quantitative analysis of various skin conditions like wrinkles, spots, texture, pores, redness, oil/moisture balance, and overall complexion—at a level human eyes or conventional filters cannot achieve. AI objectively quantifies and continuously visualizes the improvement of specific skin concerns targeted by your products.",
    tech_title2: 'Grad-CAM++ Visualization to Help Customers Say "Aha!"',
    tech_desc2: "A key feature of Visage AI is its use of Grad-CAM++ technology to display a real-time heatmap overlaying the face, indicating specific areas the AI used for its diagnosis. Customers can visually understand concrete issues in areas like the T-zone (for oily skin) or around the eyes (for fine lines) and how these influenced the AI's judgment. This empowers beauty advisors to confidently recommend products and care routines, dramatically enhancing persuasion and trust in digital counseling.",
    tech_img1_caption: "Visual explanation of AI facial analysis",
    tech_img2_caption: "AI diagnostic heatmap example",
    ux_main_title: 'Stress-Free "Diagnostic UX" & Heartfelt "Personal Advice"',
    ux_main_subtitle: 'Maximize customer experience by weaving "your unique skin story" through AI-human collaboration.',
    ux_title1: 'A "Gentle" Diagnostic Experience Preventing User Drop-offs',
    ux_desc1: "To address the challenge of skin diagnostics being sensitive to shooting environments, Visage AI features real-time shooting guidance and automatic image quality assessment. It provides real-time instructions for optimal shooting conditions and automatically corrects for insufficient light or blur. Even with imperfect images, it offers partial diagnoses and gentle guidance for image improvement, ensuring a smooth user experience. This boosts completion rates and customer satisfaction.",
    ux_title2: 'Highly Reliable Personalized Proposals & "Your Unique Skin Story"',
    ux_desc2: 'Integrating AI diagnostic data, area-specific rationale, and customer-reported information (concerns, lifestyle), our Large Language Model (LLM) explains the "skin story" in natural language. Furthermore, Retrieval-Augmented Generation (RAG) technology draws information from trusted sources like cosmetic ingredient databases and dermatological expertise, generating fact-based advice free from hallucinations. Customizable to your brand\'s tone, this empowers customers to embrace proposals personally, significantly boosting product trust and motivation for continued care.',
    results_main_title: "Tangible Results Your Company Gains with Visage AI",
    results_main_subtitle: 'Customer "conviction" directly leads to increased sales and maximized LTV.',
    result1_title: "Customer Return Rate Increased by 20%",
    result1_desc: 'At "Luxury Cosmetics" (a department store brand, hypothetical), after traditional in-person consultations, customer returns relied on advisor experience. After implementing Visage AI in-store, customers gained an objective understanding of their skin condition and improvement process. AI\'s visualization of "why" with area-specific heatmaps dramatically increased conviction in proposals. As a result, the return rate for customers who experienced the diagnosis increased by an average of 20%, contributing to long-term customer relationships.',
    result2_title: "Beauty Advisor Sales Contribution Increased by an Average of 5%",
    result2_desc: 'At "Beauty Online Store" (e-commerce exclusive brand, hypothetical), online consultations struggled with lengthy skin condition assessment and persuasive proposals. By having beauty advisors share Visage AI\'s diagnostic results (area-specific heatmaps, skin scores) in real-time, the persuasiveness of proposals improved. Average customer spending increased by 5%, with a notable rise in purchases of high-priced serums and creams. Even new beauty advisors could deliver high-quality consultations based on data.',
    result3_title: "Customer Satisfaction (NPS) Improved by 10 Points",
    result3_desc: 'At "Wellness Life" (wellness brand, hypothetical), customers could only perceive skin improvements anecdotally, making it challenging to maintain motivation for continued care. After integrating Visage AI into regular consultations, customers could visualize their skin changes with graphs and data, leading to more positive experiences of "my skin is truly improving." Survey results showed an average 10-point improvement in NPS (Net Promoter Score) compared to before implementation, increasing brand recommendation intent.',
    results_conclusion: "Visage AI directly contributes to enhancing your customer engagement, sales, and customer satisfaction.",
    privacy_main_title: "Highest Standards of Privacy & Legal Compliance for Your Company and Customers",
    privacy_main_subtitle: "Build an unshakable brand value based on security and trust.",
    privacy1_title: "On-Device Processing of Facial Image Data",
    privacy1_desc: "Facial image data used for skin diagnosis is processed entirely within the user's smartphone or tablet device (Edge AI), never transmitted or stored on external servers. This fundamentally eliminates privacy risks related to customer biometric data and aligns with strict international personal data protection regulations like GDPR (Europe) and CCPA (California, USA).",
    privacy2_title: "Strict Compliance with Pharmaceutical Affairs Law & Premiums and Representations Law",
    privacy2_desc: "From the service design phase, we collaborate with legal counsel to establish strict guidelines for expressions related to AI diagnostic results and recommended products, complying with the Pharmaceutical Affairs Law and the Premiums and Representations Law. This prevents damage to your brand's credibility from misleading expressions or inappropriate claims of efficacy and minimizes legal risks.",
    privacy3_title: "Continuous Quality Assurance and MLOps System",
    privacy3_desc: "To maintain AI model accuracy, we have established a continuous data collection, periodic retraining, and accuracy verification system (MLOps). This ensures consistently optimal diagnostic quality, adapting flexibly and quickly to new user images and external environmental changes, thereby maintaining customer trust. For B2B/B2B2C clients, we provide regular expert reviews and a dedicated support desk for prompt assistance in case of any issues, ensuring your peace of mind.",
    scalability_main_title: 'Opening New Futures with "Scalability and Expansion"',
    scalability_main_subtitle: "Flexible delivery models tailored to your business needs and new opportunities through data.",
    scalability1_title: "Flexible Deployment Models Tailored to Your Business",
    scalability1_desc: "Visage AI's diagnostic engine features a modular design via API/SDK. It can be quickly and easily integrated into various channels like your existing e-commerce site, brand app, or LINE Mini App. We are also considering no-code tool integration to support a wide range of deployments, from large-scale B2B2C to rapid implementation for small and medium-sized businesses. In the future, integration into your Private Label (PB) products and OEM provision are also possible.",
    scalability2_title: "Supporting Data-Driven Business Expansion and Global Reach",
    scalability2_desc: "Acquired skin diagnostic data is anonymized and aggregated for improving AI model accuracy and developing new features. We also plan to provide analytical reports for the beauty and healthcare industry as statistical data, and offer value to OEM partners (e.g., market trend analysis data for specific skin concerns), expanding possibilities for data-driven new business creation and external partnerships. Furthermore, we systematically promote multi-language support and compliance with regulations in each country (GDPR, CCPA, etc.) from the service design phase, enabling flexible expansion into global SaaS and OEM businesses and supporting your entry into overseas markets.",
    scalability_img_alt: "Global network of Visage AI",
    cta_bottom_main_title: 'Next Steps: Accelerate Your Beauty DX with "3 Choices"',
    cta_bottom_main_subtitle: "Ready to solve your unique challenges and create new customer experiences now?",
    cta1_title: "【Free】Individual Demonstration",
    cta1_desc: "We will provide an individual demonstration of Visage AI's functions and its application to your business, including simulations with your product images. Experience firsthand how Visage AI can solve your challenges with concrete operation.",
    cta1_btn: "Request a Demo",
    cta2_title: "【Limited to 2 Companies】Early PoC Partner Recruitment",
    cta2_desc: "We offer Phase 1 professional services under special conditions to a limited number of 2 companies. We will work alongside you to integrate and analyze your specific customer data with Visage AI's diagnostic data, and plan/execute concrete marketing strategies.",
    cta2_btn: "View PoC Details",
    cta3_title: "【Document Request】Download Service Overview",
    cta3_desc: "We provide a document summarizing Visage AI's overall picture, technical details, and pricing structure. You can review the value Visage AI offers at your own pace and gain a deeper understanding.",
    cta3_btn: "Download Document",
    footer_tagline: 'Weaving the Next-Gen "Skin Story" with AI and Data',
    footer_company_name: "Faceless Inc.", footer_website_text: "Website", footer_website_url: "https://visageai.com", footer_email_text: "Email", footer_email_address: "info@visageai.com",
    footer_sitemap: "Sitemap", footer_follow_sns: "Follow us on SNS", footer_copyright: "Faceless Inc. All Rights Reserved.",
  },
};

// --- ContextとProviderの実装 ---

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// カスタムフック: これを各コンポーネントで使う
export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

// プロバイダーコンポーネント: アプリケーション全体をこれで囲む
export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [lang, setLang] = useState<Language>("ja");

  useEffect(() => {
    // サーバーサイドでは実行されないように、localStorageへのアクセスをガード
    if (typeof window !== 'undefined') {
      const storedLang = localStorage.getItem("lang") as Language | null;
      if (storedLang && (storedLang === "ja" || storedLang === "en")) {
        setLang(storedLang);
      } else {
        const browserLang = navigator.language.split("-")[0] as Language;
        const initialLang: Language = ["ja", "en"].includes(browserLang)
          ? browserLang
          : "ja";
        setLang(initialLang);
        localStorage.setItem("lang", initialLang);
      }
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const t = useCallback((key: string): string => {
    return translations[lang][key] || key;
  }, [lang]);

  const changeLanguage = useCallback((newLang: Language) => {
    if (newLang === "ja" || newLang === "en") {
      setLang(newLang);
      if (typeof window !== 'undefined') {
        localStorage.setItem("lang", newLang);
      }
    }
  }, []);
  
  const value: LanguageContextType = { t, lang, changeLanguage };

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
};
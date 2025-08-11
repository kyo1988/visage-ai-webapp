export type Rule = {
  id: string;
  locale: "ja" | "en";
  // 入力条件
  skinType?: string;                  // "oily" | "dry" | "combination" ...
  concerns?: string[];                // ["wrinkles","pigmentation",...]
  radarThreshold?: { [metric: string]: number }; // e.g., { wrinkles: 0.6 }
  // 出力
  tags: string[];                     // 楽天検索キーワード
  ingredients?: string[];             // 推奨成分
  insights?: string[];                // 箇条書きインサイト
  weight?: number;                    // 優先度
};

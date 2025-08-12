export interface Report {
  id: string;
  title: string;
  generatedAt: string | number;
  locale?: "ja" | "en";
  score: { skinAge: number; rank: number; label: string };
  radar: { labels: string[]; values: number[] }; // 0..1
  insights: string[]; // 3〜6本を推奨
  routine: {
    am: { goal: string; steps: string[]; ingredients: string[]; caution?: string } | null;
    pm: { goal: string; steps: string[]; ingredients: string[]; caution?: string } | null;
    weekly?: { goal: string; steps: string[]; ingredients: string[]; caution?: string } | null;
  } | null;
  ingredients: {
    items: { name: string; desc?: string }[]; // タグ＋説明（省略可）
  } | null;
  products: { id: string; name: string; brand?: string; image: string; url: string; price?: string }[];
  ogImage?: string;
  summary?: string;
  skinType?: string; // 肌タイプ（oily, dry, combination, sensitive, normal）
  _source?: 'api' | 'firebase' | 'mock'; // データソース（デバッグ用）
}

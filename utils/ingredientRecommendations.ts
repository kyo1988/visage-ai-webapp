import { useTranslations } from 'next-intl';

// ==== 追加：型定義 ====
type Locale = "en" | "ja";
type SkinKey = "oily" | "dry" | "combination" | "sensitive" | "normal";

export interface Ingredient {
  name: string;
  desc: string;
}

export interface IngredientRecommendations {
  [skinType: string]: Ingredient[];
}

/**
 * 肌タイプに基づいて推奨イングラディエントを取得するフック
 * @param skinType 肌タイプ ('oily', 'dry', 'combination', 'sensitive', 'normal')
 * @returns 推奨イングラディエントの配列
 */
export function useIngredientRecommendations(skinType: string): Ingredient[] {
  const t = useTranslations('ingredientRecommendations');
  
  // 肌タイプを正規化（小文字に変換）
  const normalizedSkinType = skinType.toLowerCase();
  
  try {
    // 肌タイプに応じたイングラディエントを取得
    const ingredients = t.raw(normalizedSkinType) as Ingredient[];
    
    if (ingredients && Array.isArray(ingredients)) {
      return ingredients;
    }
    
    // デフォルトはnormal肌タイプ
    return t.raw('normal') as Ingredient[] || [];
  } catch (error) {
    console.warn(`Failed to get ingredient recommendations for skin type: ${skinType}`, error);
    // エラーの場合は空配列を返す
    return [];
  }
}

/**
 * 肌タイプに基づいて推奨イングラディエントを取得する関数（フックを使わない場合）
 * @param skinType 肌タイプ
 * @param locale 言語 ('ja' | 'en')
 * @param messages 翻訳メッセージ
 * @returns 推奨イングラディエントの配列
 */
export function getIngredientRecommendations(
  skinType: string, 
  locale: string = 'ja', 
  messages: any
): Ingredient[] {
  const normalizedSkinType = skinType.toLowerCase();
  
  try {
    const recommendations = messages?.ingredientRecommendations?.[normalizedSkinType];
    
    if (recommendations && Array.isArray(recommendations)) {
      return recommendations;
    }
    
    // デフォルトはnormal肌タイプ
    return messages?.ingredientRecommendations?.normal || [];
  } catch (error) {
    console.warn(`Failed to get ingredient recommendations for skin type: ${skinType}`, error);
    return [];
  }
}

/**
 * 肌タイプの表示名を取得する関数
 * @param skinType 肌タイプ
 * @param locale 言語
 * @returns 肌タイプの表示名
 */
export function getSkinTypeDisplayName(skinType: string, locale: Locale = 'ja'): string {
  // ==== 置換：辞書の型を強くする ====
  const skinTypeNames: Record<Locale, Record<SkinKey, string>> = {
    ja: {
      oily: '脂性肌',
      dry: '乾燥肌',
      combination: '混合肌',
      sensitive: '敏感肌',
      normal: '普通肌'
    },
    en: {
      oily: 'Oily',
      dry: 'Dry',
      combination: 'Combination',
      sensitive: 'Sensitive',
      normal: 'Normal'
    }
  };
  
  // ==== 置換：当該行を含む関数（L93付近） ====
  const key = (skinType || "").toLowerCase() as string;

  // ランタイムで安全にナローイング（型外はフォールバック）
  const valid = ["oily", "dry", "combination", "sensitive", "normal"] as const;
  const isSkinKey = (k: string): k is SkinKey => (valid as readonly string[]).includes(k);

  if (!isSkinKey(key)) return skinType; // 未知の値はそのまま返す（現状維持）

  return skinTypeNames[locale]?.[key] ?? skinType;
}

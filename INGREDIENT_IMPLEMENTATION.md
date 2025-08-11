# イングラディエント推奨機能の実装

## 概要

肌タイプに基づいて推奨イングラディエントを表示する機能を実装しました。この機能は**フロントエンド側でルールベース**で動作し、FastAPI側の変更は不要です。

## 実装内容

### 1. データ構造（JSON）

#### 日本語版 (`messages/ja.json`)
```json
{
  "ingredientRecommendations": {
    "oily": [
      { "name": "サリチル酸", "desc": "毛穴の詰まりを解消し、皮脂分泌を調整します。" },
      { "name": "ナイアシンアミド", "desc": "皮脂分泌を抑制し、毛穴を引き締めます。" }
    ],
    "dry": [
      { "name": "ヒアルロン酸", "desc": "肌に水分を補給し、乾燥を防ぎます。" },
      { "name": "セラミド", "desc": "肌のバリア機能を修復し、水分の蒸発を防ぎます。" }
    ]
    // ... 他の肌タイプ
  }
}
```

#### 英語版 (`messages/en.json`)
```json
{
  "ingredientRecommendations": {
    "oily": [
      { "name": "Salicylic Acid", "desc": "Unclogs pores and regulates sebum production." },
      { "name": "Niacinamide", "desc": "Controls oil production and tightens pores." }
    ]
    // ... 他の肌タイプ
  }
}
```

### 2. ユーティリティ関数 (`utils/ingredientRecommendations.ts`)

- `useIngredientRecommendations(skinType)`: Reactフック版
- `getIngredientRecommendations(skinType, locale, messages)`: 関数版
- `getSkinTypeDisplayName(skinType, locale)`: 肌タイプの表示名取得

### 3. Reactコンポーネント (`components/IngredientRecommendations.tsx`)

肌タイプに応じたイングラディエント推奨を表示するメインコンポーネント

### 4. デモページ (`components/IngredientRecommendationsDemo.tsx`)

機能をテストするためのデモページ

## 使用方法

### 基本的な使用

```tsx
import IngredientRecommendations from './components/IngredientRecommendations';

function MyComponent() {
  return (
    <IngredientRecommendations 
      skinType="oily" 
      locale="ja" 
    />
  );
}
```

### フックを使用した場合

```tsx
import { useIngredientRecommendations } from '../utils/ingredientRecommendations';

function MyComponent() {
  const ingredients = useIngredientRecommendations('dry');
  
  return (
    <div>
      {ingredients.map((ingredient, index) => (
        <div key={index}>
          <h4>{ingredient.name}</h4>
          <p>{ingredient.desc}</p>
        </div>
      ))}
    </div>
  );
}
```

### 関数を使用した場合

```tsx
import { getIngredientRecommendations } from '../utils/ingredientRecommendations';

function MyComponent({ messages, locale }) {
  const ingredients = getIngredientRecommendations('sensitive', locale, messages);
  
  // 表示処理
}
```

## 対応肌タイプ

- `oily`: 脂性肌
- `dry`: 乾燥肌  
- `combination`: 混合肌
- `sensitive`: 敏感肌
- `normal`: 普通肌

## 多言語対応

- 日本語 (`ja`)
- 英語 (`en`)

## 特徴

1. **JSONベース**: メッセージはハードコーディングせず、JSONファイルで管理
2. **ルールベース**: 肌タイプに応じた推奨を動的に表示
3. **多言語対応**: 日本語・英語の両方に対応
4. **エラーハンドリング**: データが見つからない場合の適切な処理
5. **レスポンシブデザイン**: Tailwind CSSを使用したモダンなUI

## 今後の拡張

- より詳細な肌状態（シワ、毛穴、色素沈着など）に基づく推奨
- 季節や年齢に応じた推奨
- ユーザーの使用履歴に基づくパーソナライズ
- 成分の組み合わせ推奨
- アレルギー情報の考慮

## 注意事項

- これらの推奨は一般的なガイドラインです
- 実際の使用前にはパッチテストを実施してください
- 医師や皮膚科医に相談することを推奨します
- 個人の肌状態やアレルギー歴を考慮してください

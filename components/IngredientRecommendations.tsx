'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { useIngredientRecommendations, Ingredient, getSkinTypeDisplayName } from '../utils/ingredientRecommendations';

interface IngredientRecommendationsProps {
  skinType: string;
  locale?: string;
  className?: string;
}

export default function IngredientRecommendations({ 
  skinType, 
  locale = 'ja',
  className = '' 
}: IngredientRecommendationsProps) {
  const t = useTranslations('ingredientRecommendations');
  const ingredients = useIngredientRecommendations(skinType);
  const skinTypeDisplayName = getSkinTypeDisplayName(skinType, locale);

  // 言語に応じた翻訳を取得（シンプルな条件分岐）
  const getTranslation = (jaText: string, enText: string) => {
    return locale === 'ja' ? jaText : enText;
  };

  if (!ingredients || ingredients.length === 0) {
    return (
      <div className={`bg-gray-50 rounded-lg p-6 ${className}`}>
        <p className="text-gray-500 text-center">
          {getTranslation('report.ingredients.noRecommendations', 
            locale === 'ja' ? '推奨イングラディエントが見つかりませんでした。' : 'No ingredient recommendations found.'
          )}
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-gray-200 ${className}`}>
      {/* ヘッダー */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          {getTranslation('report.ingredients.title', 
            locale === 'ja' ? '推奨イングラディエント' : 'Recommended Ingredients'
          )}
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          {getTranslation('report.ingredients.subtitle', 
            locale === 'ja' 
              ? `${skinTypeDisplayName}に最適な成分` 
              : `Optimal ingredients for ${skinTypeDisplayName} skin`
          )}
        </p>
      </div>

      {/* イングラディエントリスト */}
      <div className="p-6">
        <div className="grid gap-4">
          {ingredients.map((ingredient, index) => (
            <div 
              key={index} 
              className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {/* イングラディエントアイコン */}
              <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm font-medium">
                  {ingredient.name.charAt(0)}
                </span>
              </div>
              
              {/* イングラディエント情報 */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  {ingredient.name}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {ingredient.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* フッター */}
      <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
        <p className="text-xs text-gray-500 text-center">
          {getTranslation('report.ingredients.disclaimer', 
            locale === 'ja' 
              ? '※ これらの成分は一般的な推奨事項です。使用前にパッチテストを行い、医師に相談してください。' 
              : '* These ingredients are general recommendations. Please perform a patch test and consult with a dermatologist before use.'
          )}
        </p>
      </div>
    </div>
  );
}

// プレゼンテーショナルコンポーネント（テスト用）
export function IngredientCard({ ingredient, className = '' }: { ingredient: Ingredient; className?: string }) {
  return (
    <div className={`bg-white p-4 rounded-lg border border-gray-200 hover:shadow-md transition-shadow ${className}`}>
      <h4 className="font-medium text-gray-900 mb-2">{ingredient.name}</h4>
      <p className="text-sm text-gray-600">{ingredient.desc}</p>
    </div>
  );
}

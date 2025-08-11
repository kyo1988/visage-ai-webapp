'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import IngredientRecommendations from './IngredientRecommendations';

export default function IngredientRecommendationsDemo() {
  const t = useTranslations();
  const [selectedSkinType, setSelectedSkinType] = useState('normal');
  const [selectedLocale, setSelectedLocale] = useState('ja');

  const skinTypes = [
    { value: 'oily', label: { ja: '脂性肌', en: 'Oily' } },
    { value: 'dry', label: { ja: '乾燥肌', en: 'Dry' } },
    { value: 'combination', label: { ja: '混合肌', en: 'Combination' } },
    { value: 'sensitive', label: { ja: '敏感肌', en: 'Sensitive' } },
    { value: 'normal', label: { ja: '普通肌', en: 'Normal' } }
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* ヘッダー */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {t('ingredientRecommendations.demoTitle', { defaultValue: 'イングラディエント推奨デモ' })}
        </h1>
        <p className="text-lg text-gray-600">
          {t('ingredientRecommendations.demoSubtitle', { defaultValue: '肌タイプに応じた最適な成分を表示します' })}
        </p>
      </div>

      {/* コントロールパネル */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 肌タイプ選択 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {selectedLocale === 'ja' ? '肌タイプを選択' : 'Select Skin Type'}
            </label>
            <div className="grid grid-cols-2 gap-2">
              {skinTypes.map((skinType) => (
                <button
                  key={skinType.value}
                  onClick={() => setSelectedSkinType(skinType.value)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    selectedSkinType === skinType.value
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {skinType.label[selectedLocale as keyof typeof skinType.label]}
                </button>
              ))}
            </div>
          </div>

          {/* 言語選択 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {selectedLocale === 'ja' ? '言語を選択' : 'Select Language'}
            </label>
            <div className="flex space-x-2">
              <button
                onClick={() => setSelectedLocale('ja')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  selectedLocale === 'ja'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                日本語
              </button>
              <button
                onClick={() => setSelectedLocale('en')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  selectedLocale === 'en'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                English
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* イングラディエント推奨表示 */}
      <div className="locale-context" data-locale={selectedLocale}>
        <IngredientRecommendations
          skinType={selectedSkinType}
          locale={selectedLocale}
        />
      </div>

      {/* 使用例の説明 */}
      <div className="bg-blue-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">
          {selectedLocale === 'ja' ? '使用方法' : 'Usage'}
        </h3>
        <div className="space-y-2 text-sm text-blue-800">
          <p>
            {selectedLocale === 'ja' 
              ? 'このコンポーネントは、肌タイプに基づいて推奨イングラディエントを動的に表示します。'
              : 'This component dynamically displays recommended ingredients based on skin type.'
            }
          </p>
          <p>
            {selectedLocale === 'ja'
              ? 'JSONファイルからデータを読み込み、多言語対応も実装されています。'
              : 'Data is loaded from JSON files with multi-language support implemented.'
            }
          </p>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState, useCallback, useEffect } from 'react';
import { fastapiCrystalAIDemo, fastapiCrystalAIDemoRateLimit, type RecommendationItem } from '@/app/lib/fastapi';
import { gaEvent } from '@/app/lib/gtag';

interface InteractiveDemoProps {
  locale?: 'ja' | 'en';
}

/**
 * InteractiveDemo Component
 * 
 * Provides an interactive landing page demo that allows users to:
 * 1. Adjust skin type via dropdown
 * 2. Adjust skin metrics via sliders
 * 3. See real-time recommendations from CrystalAI
 * 4. Track remaining demo requests
 * 5. Display confidence scores and CTAs
 */
export function InteractiveDemo({ locale = 'ja' }: InteractiveDemoProps) {
  const [skinType, setSkinType] = useState<string>('normal');
  const [metrics, setMetrics] = useState<Record<string, number>>({
    moisture: 50,
    elasticity: 50,
    pores: 50,
    spots: 50,
  });
  
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>('');
  const [remainingRequests, setRemainingRequests] = useState<number>(3);
  const [rateLimitInfo, setRateLimitInfo] = useState<{ max: number; window: number } | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize session ID on mount
  useEffect(() => {
    const stored = sessionStorage.getItem('crystalai_demo_session_id');
    if (stored) {
      setSessionId(stored);
    } else {
      const newId = `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('crystalai_demo_session_id', newId);
      setSessionId(newId);
    }
    setIsInitialized(true);
    
    // Track page load
    gaEvent('interactive_demo_page_viewed', {
      locale,
    });
  }, []);

  // Check rate limit on mount and when session changes
  useEffect(() => {
    if (!isInitialized || !sessionId) return;
    
    const checkRateLimit = async () => {
      try {
        const info = await fastapiCrystalAIDemoRateLimit(sessionId);
        setRemainingRequests(info.remaining_requests);
        setRateLimitInfo({ max: info.max_requests, window: info.window_minutes });
      } catch (err) {
        console.error('Rate limit check failed:', err);
      }
    };
    
    checkRateLimit();
  }, [isInitialized, sessionId]);

  // Auto-fetch recommendations on skin type change
  useEffect(() => {
    if (isInitialized && sessionId && remainingRequests > 0) {
      fetchRecommendations();
    }
  }, [skinType]);

  const fetchRecommendations = useCallback(async () => {
    if (!sessionId || remainingRequests <= 0) {
      setError(locale === 'ja' 
        ? 'デモリクエストの上限に達しました。メール登録で続きをご利用ください。'
        : 'You have reached the demo request limit. Please sign up to continue.'
      );
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fastapiCrystalAIDemo({ skinType, session_id: sessionId });
      
      setRecommendations(response.recommendations);
      setSessionId(response.session_id || sessionId);
      
      // Update rate limit info
      const rateLimitResponse = await fastapiCrystalAIDemoRateLimit(response.session_id || sessionId);
      setRemainingRequests(rateLimitResponse.remaining_requests);
      
      // Track analytics
      gaEvent('demo_recommendation_fetched', {
        skin_type: skinType,
        recommendation_count: response.recommendations.length,
        session_id: response.session_id || sessionId,
        remaining_requests: rateLimitResponse.remaining_requests,
      });
      
    } catch (err: any) {
      console.error('Demo recommendation fetch failed:', err);
      setError(err.message || 'Failed to fetch recommendations');
      gaEvent('demo_error', { error: err.message });
    } finally {
      setLoading(false);
    }
  }, [skinType, sessionId, remainingRequests, locale]);

  const handleMetricChange = (key: string, value: number) => {
    setMetrics(prev => ({ ...prev, [key]: value }));
    
    // Track slider change
    gaEvent('demo_slider_changed', {
      metric: key,
      value,
      skin_type: skinType,
    });
  };

  const handleSkinTypeChange = (newSkinType: string) => {
    setSkinType(newSkinType);
    
    // Track skin type change
    gaEvent('demo_skin_type_changed', {
      old_skin_type: skinType,
      new_skin_type: newSkinType,
    });
  };

  const handleGetRecommendations = () => {
    gaEvent('demo_get_recommendations_clicked', {
      skin_type: skinType,
      metrics,
      remaining_requests: remainingRequests,
    });
    fetchRecommendations();
  };

  const translations = {
    ja: {
      title: 'CrystalAI インタラクティブデモ',
      subtitle: 'スライダーを操作して、リアルタイムでレコメンデーションを生成',
      skinTypeLabel: '肌タイプ',
      metricsLabel: '肌の状態',
      fetchButton: 'レコメンデーションを取得',
      loading: 'レコメンデーションを生成中...',
      noRecommendations: 'レコメンデーションが見つかりませんでした',
      remainingRequests: '残りリクエスト',
      rateLimitReached: 'デモリクエストの上限に達しました',
      signupPrompt: '続きをご利用いただくには、メール登録をお願いします',
      ctaLabel: 'メール登録で続きを利用',
      confidenceLabel: '信頼度',
      sourceLabel: 'ソース',
      demoMode: 'デモモード',
      ruleBased: 'ルールベース',
    },
    en: {
      title: 'CrystalAI Interactive Demo',
      subtitle: 'Adjust the sliders to generate real-time recommendations',
      skinTypeLabel: 'Skin Type',
      metricsLabel: 'Skin Condition',
      fetchButton: 'Get Recommendations',
      loading: 'Generating recommendations...',
      noRecommendations: 'No recommendations found',
      remainingRequests: 'Remaining Requests',
      rateLimitReached: 'Demo request limit reached',
      signupPrompt: 'Please sign up to continue using the demo',
      ctaLabel: 'Sign up to continue',
      confidenceLabel: 'Confidence',
      sourceLabel: 'Source',
      demoMode: 'Demo Mode',
      ruleBased: 'Rule Based',
    },
  };

  const t = translations[locale];

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.title}
            </h2>
            <p className="text-lg text-gray-600">
              {t.subtitle}
            </p>
          </div>

          {/* Rate Limit Info */}
          {rateLimitInfo && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  {t.remainingRequests}: <strong className="text-blue-600">{remainingRequests}/{rateLimitInfo.max}</strong>
                </span>
                {remainingRequests <= 0 && (
                  <a 
                    href={`/${locale}/demo`}
                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                    onClick={() => gaEvent('cta_click', { destination: 'demo_booking', placement: 'rate_limit' })}
                  >
                    {t.ctaLabel}
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 mb-8">
            {/* Skin Type Selector */}
            <div className="mb-6">
              <label htmlFor="skin-type" className="block text-sm font-semibold text-gray-700 mb-2">
                {t.skinTypeLabel}
              </label>
              <select
                id="skin-type"
                value={skinType}
                onChange={(e) => handleSkinTypeChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {locale === 'ja' ? (
                  <>
                    <option value="normal">普通肌</option>
                    <option value="dry">乾燥肌</option>
                    <option value="oily">脂性肌</option>
                    <option value="combination">混合肌</option>
                    <option value="sensitive">敏感肌</option>
                  </>
                ) : (
                  <>
                    <option value="normal">Normal</option>
                    <option value="dry">Dry</option>
                    <option value="oily">Oily</option>
                    <option value="combination">Combination</option>
                    <option value="sensitive">Sensitive</option>
                  </>
                )}
              </select>
            </div>

            {/* Metrics Sliders */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                {t.metricsLabel}
              </label>
              
              {Object.entries(metrics).map(([key, value]) => (
                <div key={key} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm text-gray-600 capitalize">{key}</span>
                    <span className="text-sm font-medium text-gray-900">{value}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={(e) => handleMetricChange(key, parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                </div>
              ))}
            </div>

            {/* Fetch Button */}
            {remainingRequests > 0 && (
              <button
                onClick={handleGetRecommendations}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all disabled:cursor-not-allowed"
              >
                {loading ? t.loading : t.fetchButton}
              </button>
            )}

            {remainingRequests <= 0 && (
              <div className="text-center py-4">
                <p className="text-sm text-gray-600 mb-2">{t.rateLimitReached}</p>
                <a 
                  href={`/${locale}/demo`}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-lg transition-all"
                  onClick={() => gaEvent('cta_click', { destination: 'demo_booking', placement: 'rate_limit_cta' })}
                >
                  {t.ctaLabel}
                </a>
              </div>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Recommendations Display */}
          {recommendations.length > 0 && (
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                {locale === 'ja' ? 'レコメンデーション' : 'Recommendations'}
              </h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                {recommendations.map((rec, index) => (
                  <div
                    key={rec.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => gaEvent('demo_recommendation_clicked', {
                      recommendation_id: rec.id,
                      recommendation_name: rec.name,
                      confidence: rec.confidence,
                      source: rec.source,
                      index,
                      session_id: sessionId,
                    })}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">{rec.name}</h4>
                      {rec.demo_mode && (
                        <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                          {t.demoMode}
                        </span>
                      )}
                    </div>
                    
                    {rec.confidence && (
                      <div className="mb-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">{t.confidenceLabel}</span>
                          <span className="font-medium text-gray-900">{(rec.confidence * 100).toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all"
                            style={{ width: `${rec.confidence * 100}%` }}
                          />
                        </div>
                      </div>
                    )}
                    
                    {rec.reason && (
                      <p className="text-sm text-gray-600 mt-2">{rec.reason}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* No Recommendations Message */}
          {!loading && recommendations.length === 0 && !error && (
            <div className="text-center py-12 text-gray-500">
              {t.noRecommendations}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

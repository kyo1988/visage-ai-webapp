'use client';

import { useState, useCallback, useEffect } from 'react';
import { fastapiCrystalAIDemo, fastapiCrystalAIDemoRateLimit, type RecommendationItem } from '@/app/lib/fastapi';
import { gaEvent } from '@/app/lib/gtag';
import RadarSVG from '@/components/report/RadarSVG';
import ReportSection from '@/components/report/ReportSection';
import ProductGridClient from '@/components/report/ProductGridClient';
import { track } from '@/app/lib/analytics';

interface CrystalAIRecommendationDemoProps {
  locale?: 'ja' | 'en';
}

/**
 * CrystalAI Recommendation Demo Component
 * 
 * Matches existing report design style with interactive controls
 * - Score cards at top (skin type, overall score, etc.)
 * - Radar chart for profile
 * - Recommendation grid below
 * - Controls (sliders) at bottom
 */
export function CrystalAIRecommendationDemo({ locale = 'ja' }: CrystalAIRecommendationDemoProps) {
  const [skinType, setSkinType] = useState<string>('normal');
  const [metrics, setMetrics] = useState<Record<string, number>>({
    moisture: 50,
    elasticity: 50,
    pores: 50,
    spots: 50,
    texture: 50,
    sensitivity: 50,
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
      setIsInitialized(true);
    } else {
      const newId = `demo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('crystalai_demo_session_id', newId);
      setSessionId(newId);
      setIsInitialized(true);
    }
    
    gaEvent('crystalai_demo_page_viewed', { locale });
  }, []);

  // Check rate limit
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
      
      gaEvent('crystalai_demo_recommendation_fetched', {
        skin_type: skinType,
        recommendation_count: response.recommendations.length,
        session_id: response.session_id || sessionId,
        remaining_requests: rateLimitResponse.remaining_requests,
      });
      
    } catch (err: any) {
      console.error('Demo recommendation fetch failed:', err);
      setError(err.message || 'Failed to fetch recommendations');
      gaEvent('crystalai_demo_error', { error: err.message });
    } finally {
      setLoading(false);
    }
  }, [skinType, sessionId, remainingRequests, locale]);

  const handleMetricChange = (key: string, value: number) => {
    setMetrics(prev => ({ ...prev, [key]: value }));
    
    gaEvent('crystalai_demo_slider_changed', {
      metric: key,
      value,
      skin_type: skinType,
    });
  };

  const handleSkinTypeChange = (newSkinType: string) => {
    setSkinType(newSkinType);
    
    gaEvent('crystalai_demo_skin_type_changed', {
      old_skin_type: skinType,
      new_skin_type: newSkinType,
    });
  };

  const handleGetRecommendations = () => {
    gaEvent('crystalai_demo_get_recommendations_clicked', {
      skin_type: skinType,
      metrics,
      remaining_requests: remainingRequests,
    });
    fetchRecommendations();
  };

  // Convert metrics to radar format
  const radarLabels = ['Moisture', 'Elasticity', 'Pores', 'Spots', 'Texture', 'Sensitivity'];
  const radarValues = [
    metrics.moisture / 100,
    metrics.elasticity / 100,
    metrics.pores / 100,
    metrics.spots / 100,
    metrics.texture / 100,
    metrics.sensitivity / 100,
  ];

  const translations = {
    ja: {
      title: 'CrystalAI レコメンデーション',
      subtitle: 'スキンケア製品の推奨',
      skinTypeLabel: '肌タイプ',
      profileLabel: 'プロフィール',
      controlsLabel: '調整',
      productNames: {
        '化粧水': '化粧水',
        '美容液': '美容液',
        'クリーム': 'クリーム',
      },
    },
    en: {
      title: 'CrystalAI Recommendations',
      subtitle: 'Skincare product recommendations',
      skinTypeLabel: 'Skin Type',
      profileLabel: 'Profile',
      controlsLabel: 'Adjust',
      productNames: {
        '化粧水': 'Toner',
        '美容液': 'Serum',
        'クリーム': 'Cream',
      },
    },
  };

  const t = translations[locale];
  
  // Translate product names based on locale
  const getTranslatedName = (name: string): string => {
    return (t as any).productNames?.[name] || name;
  };

  return (
    <div style={{backgroundColor: '#f9fafb', minHeight: '100vh'}}>
      <main style={{maxWidth: '72rem', margin: '0 auto', padding: '2rem 1rem', paddingBottom: '6rem'}} className="py-8 pb-24">
        {/* Header */}
        <header style={{marginBottom: '2rem'}}>
          <h1 style={{fontSize: '2.25rem', fontWeight: '700', lineHeight: '1.1', color: '#111827', marginBottom: '0.5rem'}}>
            {t.title}
          </h1>
          <p style={{fontSize: '1.125rem', color: '#6b7280'}}>
            {t.subtitle}
          </p>
        </header>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Rate Limit Info */}
        {rateLimitInfo && (
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {locale === 'ja' ? '残りリクエスト' : 'Remaining Requests'}: <strong className="text-blue-600">{remainingRequests}/{rateLimitInfo.max}</strong>
              </span>
              {remainingRequests <= 0 && (
                <a 
                  href={`/${locale}/demo`}
                  className="text-sm text-blue-600 hover:text-blue-800 underline"
                  onClick={() => gaEvent('cta_click', { destination: 'demo_booking', placement: 'rate_limit' })}
                >
                  {locale === 'ja' ? 'メール登録で続きを利用' : 'Sign up to continue'}
                </a>
              )}
            </div>
          </div>
        )}

        {/* Score Section */}
        <ReportSection title={locale === 'ja' ? 'スコア' : 'Score'}>
          <div className="accent-bar mb-3"></div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="score-tile" style={{["--from" as any]:"var(--va-sky-100)",["--via" as any]:"var(--va-sky-200)",["--to" as any]:"var(--va-sky-300)"}}>
              <div className="score-reflection rounded-lg p-4">
                <div className="text-3xl font-bold text-slate-900">{skinType}</div>
                <div className="text-xs text-slate-700">{t.skinTypeLabel}</div>
              </div>
            </div>
            <div className="score-tile" style={{["--from" as any]:"var(--va-vio-100)",["--via" as any]:"var(--va-vio-200)",["--to" as any]:"var(--va-vio-300)"}}>
              <div className="score-reflection rounded-lg p-4">
                <div className="text-3xl font-bold text-slate-900">
                  {recommendations.length > 0 ? '✓' : '—'}
                </div>
                <div className="text-xs text-slate-700">{locale === 'ja' ? '推奨取得済み' : 'Recommendations Ready'}</div>
              </div>
            </div>
            <div className="score-tile" style={{["--from" as any]:"var(--va-emer-100)",["--via" as any]:"var(--va-emer-200)",["--to" as any]:"var(--va-emer-300)"}}>
              <div className="score-reflection rounded-lg p-4">
                <div className="text-3xl font-bold text-slate-900">{remainingRequests}</div>
                <div className="text-xs text-slate-700">{locale === 'ja' ? '残り試行回数' : 'Remaining Tries'}</div>
              </div>
            </div>
          </div>
        </ReportSection>

        {/* Profile Section with Radar Chart */}
        <section className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mt-4">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.profileLabel}</h2>
            <div className="accent-bar mb-3"></div>
          </div>
          <div className="mx-auto" style={{ width: "clamp(200px,60vw,400px)", height: "clamp(170px,50vw,340px)" }}>
            <RadarSVG labels={radarLabels} values={radarValues} locale={locale} />
          </div>
        </section>

        {/* Recommendations Section */}
        {recommendations.length > 0 && (
          <div className="mt-4">
            <ReportSection title={locale === 'ja' ? 'レコメンデーション' : 'Recommendations'}>
              <div className="accent-bar mb-3"></div>
              <ProductGridClient 
                products={recommendations.map(rec => ({
                  id: rec.id,
                  name: getTranslatedName(rec.name),
                  image: rec.image_url || rec.imageUrl || '',
                  url: rec.url || `/en/report/demo?skinType=${skinType}`, // Demo: link to full report
                  source: rec.source,
                }))} 
              />
            </ReportSection>
          </div>
        )}

        {/* Controls Section - at bottom like requested */}
        <section className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm mt-4">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.controlsLabel}</h2>
            <div className="accent-bar mb-3"></div>
          </div>

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
              {locale === 'ja' ? '肌の状態' : 'Skin Condition'}
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
              {loading ? (locale === 'ja' ? '生成中...' : 'Loading...') : (locale === 'ja' ? 'レコメンデーションを取得' : 'Get Recommendations')}
            </button>
          )}
        </section>
      </main>
    </div>
  );
}


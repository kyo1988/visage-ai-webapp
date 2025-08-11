'use client';

import { useTranslations } from '@/app/lib/intl';

export const TechnologySection = () => {
  const t = useTranslations();
  
  return (
    <section className="py-20 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h3 className="font-display text-3xl md:text-4xl font-bold text-gray-900">{t("TechnologySection.tech_main_title")}</h3>
          <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">{t("TechnologySection.tech_main_subtitle")}</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left side - Technology details */}
          <div className="space-y-8">
            {/* SDK tabs */}
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="flex space-x-1 mb-6">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium">JS SDK</button>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium">Swift SDK</button>
                <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium">Kotlin SDK</button>
              </div>
              
              <div className="space-y-4 text-sm text-gray-700">
                <p>• {t("TechnologySection.tech_desc1")}</p>
                <p>• {t("TechnologySection.tech_desc2")}</p>
                <p>• {t("TechnologySection.ux_desc1")}</p>
              </div>
              
              {/* Security and Privacy */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-3">{t("PrivacySection.privacy_main_title")}</h4>
                <div className="space-y-2 text-sm text-gray-700">
                  <p>• {t("PrivacySection.privacy1_desc")}</p>
                  <p>• {t("PrivacySection.privacy2_desc")}</p>
                  <p>• {t("PrivacySection.privacy3_desc")}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Code examples */}
          <div className="space-y-6">
            {/* JavaScript SDK example */}
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-300 text-sm">JavaScript SDK</span>
                <button className="text-gray-400 hover:text-white text-sm">Copy</button>
              </div>
              <pre className="text-green-400 text-sm overflow-x-auto">
{`import { VisageAI } from '@visage-ai/sdk';

const visage = new VisageAI('your-api-key');

const result = await visage.analyze(image, {
  attributes: ['wrinkle', 'pigmentation', 'sagging']
});`}
              </pre>
            </div>
            
            {/* Response example */}
            <div className="bg-gray-900 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-300 text-sm">Response</span>
                <button className="text-gray-400 hover:text-white text-sm">Copy</button>
              </div>
              <pre className="text-green-400 text-sm overflow-x-auto">
{`{
  "face": {
    "bbox": [x, y, w, h]
  },
  "findings": {
    "wrinkle": 0.75,
    "pigmentation": 0.45
  },
  "explanations": {
    "attribute": "wrinkle",
    "top_regions": ["forehead", "eye_area"]
  },
  "recommendations": {
    "sku": "anti-aging_cream",
    "reason": "High wrinkle score detected"
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
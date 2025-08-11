'use client';

import { useTranslations } from '@/app/lib/intl';

export const StorySection = () => {
  const t = useTranslations();
  return (
    <section id="story" className="py-20 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900">{t("story_main_title")}</h3>
          <p className="text-lg text-gray-600 mt-4 mb-16 max-w-3xl mx-auto">{t("story_main_subtitle")}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="p-4 bg-white rounded-2xl shadow-lg">
            <img src="https://res.cloudinary.com/dgqphttst/image/upload/v1747938916/LPXAI3_hhfhxo.png" alt={t("story_img_alt")} className="w-full h-auto rounded-xl" />
          </div>
          <div className="space-y-6">
            <p className="text-gray-700">{t("story_para1")}</p>
            <p className="text-gray-700">{t("story_para2")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
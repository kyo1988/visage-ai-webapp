'use client';
import { useTranslation } from "@/context/LanguageContext";

export const StorySection = () => {
  const { t } = useTranslation();
  return (
    <section id="story" className="py-20 md:py-24 bg-[#f8f0f0]">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h3 className="font-display text-3xl md:text-4xl font-bold">{t("story_main_title")}</h3>
          <p className="text-lg text-brand-text-sub mt-4 mb-16 max-w-3xl mx-auto">{t("story_main_subtitle")}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="p-4 bg-white rounded-4xl shadow-card">
            <img src="https://res.cloudinary.com/dgqphttst/image/upload/v1747938916/LPXAI3_hhfhxo.png" alt={t("story_img_alt")} className="w-full h-auto rounded-3xl" />
          </div>
          <div className="space-y-6">
            <p>{t("story_para1")}</p>
            <p>{t("story_para2")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
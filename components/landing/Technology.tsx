'use client';
import { useTranslation } from "@/context/LanguageContext";

export const TechnologySection = () => {
  const { t } = useTranslation();
  return (
    <section id="technology" className="py-20 md:py-24 bg-brand-beige">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h3 className="font-display text-3xl md:text-4xl font-bold">{t("tech_main_title")}</h3>
          <p className="text-lg text-brand-text-sub mt-4 mb-16 max-w-3xl mx-auto">{t("tech_main_subtitle")}</p>
        </div>
        
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3 space-y-8">
            <div>
              <h4 className="font-display text-xl font-bold mb-3">{t("tech_title1")}</h4>
              <p className="text-brand-text-sub">{t("tech_desc1")}</p>
            </div>
            <div>
              <h4 className="font-display text-xl font-bold mb-3">{t("tech_title2")}</h4>
              <p className="text-brand-text-sub">{t("tech_desc2")}</p>
            </div>
          </div>
          <div className="lg:col-span-2 grid grid-cols-2 gap-6">
            <div className="p-3 bg-white rounded-3xl shadow-card space-y-3">
              <img src="https://res.cloudinary.com/dgqphttst/image/upload/v1747936805/LP_AI_azbcvl.png" alt={t("tech_img1_caption")} className="w-full h-auto rounded-2xl" />
              <p className="text-xs text-center text-brand-text-sub">{t("tech_img1_caption")}</p>
            </div>
            <div className="p-3 bg-white rounded-3xl shadow-card space-y-3">
              <img src="https://res.cloudinary.com/dgqphttst/image/upload/v1747927280/gradcam_result_onh3ok.jpg" alt={t("tech_img2_caption")} className="w-full h-auto rounded-2xl" />
              <p className="text-xs text-center text-brand-text-sub">{t("tech_img2_caption")}</p>
            </div>
          </div>
        </div>

        <div className="mt-24 text-center">
          <h3 className="font-display text-3xl md:text-4xl font-bold">{t("ux_main_title")}</h3>
          <p className="text-lg text-brand-text-sub mt-4 mb-16 max-w-3xl mx-auto">{t("ux_main_subtitle")}</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-4xl shadow-card text-left">
              <h4 className="font-display text-xl font-bold mb-4">{t("ux_title1")}</h4>
              <p className="text-brand-text-sub">{t("ux_desc1")}</p>
            </div>
            <div className="bg-white p-8 rounded-4xl shadow-card text-left">
              <h4 className="font-display text-xl font-bold mb-4">{t("ux_title2")}</h4>
              <p className="text-brand-text-sub">{t("ux_desc2")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
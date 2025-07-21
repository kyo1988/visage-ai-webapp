'use client';
import { useTranslation } from "@/context/LanguageContext";

export const ScalabilitySection = () => {
  const { t } = useTranslation();
  return (
    <section className="py-20 md:py-24 bg-[#f8f0f0]">
      <div className="container mx-auto px-6">
        <div className="text-center">
          <h3 className="font-display text-3xl md:text-4xl font-bold">{t("scalability_main_title")}</h3>
          <p className="text-lg text-brand-text-sub mt-4 mb-16 max-w-3xl mx-auto">{t("scalability_main_subtitle")}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-10 order-2 md:order-1">
            <div>
              <h4 className="font-display text-xl font-bold mb-3">{t("scalability1_title")}</h4>
              <p>{t("scalability1_desc")}</p>
            </div>
            <div>
              <h4 className="font-display text-xl font-bold mb-3">{t("scalability2_title")}</h4>
              <p>{t("scalability2_desc")}</p>
            </div>
          </div>
          <div className="order-1 md:order-2 p-4 bg-white rounded-4xl shadow-card">
            <img src="https://res.cloudinary.com/dgqphttst/image/upload/v1747936806/LPSpace_vcltnd.png" alt={t("scalability_img_alt")} className="w-full h-auto rounded-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};
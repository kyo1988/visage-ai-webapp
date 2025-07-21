'use client';
import { useTranslation } from "@/context/LanguageContext";
import { Icons } from "@/components/Icons";

export const FeaturesSection = () => {
  const { t } = useTranslation();
  const features = [
    { id: 1, icon: <Icons.ChartBarSquare />, title: t('feature1_title'), desc: t('feature1_desc') },
    { id: 2, icon: <Icons.UserCircle />, title: t('feature2_title'), desc: t('feature2_desc') },
    { id: 3, icon: <Icons.HandThumbUp />, title: t('feature3_title'), desc: t('feature3_desc') },
  ];

  return (
    <section id="features" className="py-20 md:py-24 bg-brand-beige">
      <div className="container mx-auto px-6 text-center">
        <h3 className="font-display text-3xl md:text-4xl font-bold">{t("features_main_title")}</h3>
        <p className="text-lg text-brand-text-sub mt-4 mb-16 max-w-3xl mx-auto">{t("features_main_subtitle")}</p>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map(feature => (
            <div key={feature.id} className="bg-white p-8 rounded-4xl shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all">
              <div className="w-16 h-16 mx-auto mb-6">{feature.icon}</div>
              <h4 className="font-display text-xl font-bold mb-4">{feature.title}</h4>
              <p className="text-brand-text-sub">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
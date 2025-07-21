'use client';
import { useTranslation } from "@/context/LanguageContext";

export const CTASection = () => {
  const { t } = useTranslation();
  const ctas = [
    { id: 1, title: t('cta1_title'), desc: t('cta1_desc'), btn: t('cta1_btn') },
    { id: 2, title: t('cta2_title'), desc: t('cta2_desc'), btn: t('cta2_btn') },
    { id: 3, title: t('cta3_title'), desc: t('cta3_desc'), btn: t('cta3_btn') },
  ];

  return (
    <section id="contact" className="py-20 md:py-24 bg-brand-beige">
      <div className="container mx-auto px-6 text-center">
        <h3 className="font-display text-3xl md:text-4xl font-bold text-brand-pink-brown">{t("cta_bottom_main_title")}</h3>
        <p className="text-lg text-brand-text-sub mt-4 mb-16 max-w-3xl mx-auto">{t("cta_bottom_main_subtitle")}</p>
        <div className="grid md:grid-cols-3 gap-8">
          {ctas.map(cta => (
            <div key={cta.id} className="bg-white p-8 rounded-4xl shadow-card flex flex-col">
              <h4 className="font-display text-xl font-bold mb-4">{cta.title}</h4>
              <p className="text-brand-text-sub flex-grow mb-8">{cta.desc}</p>
              <a href="#" className="mt-auto inline-block bg-white text-brand-pink-brown border border-brand-pink-hover font-bold px-6 py-3 rounded-full shadow-md hover:bg-brand-pink-hover hover:text-white transition-all">{cta.btn}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
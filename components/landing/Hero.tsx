'use client';
import { useTranslation } from "@/context/LanguageContext";

export const HeroSection = () => {
  const { t } = useTranslation();
  return (
    <section className="bg-[#f8f4ed] py-20 md:py-32">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="hero-text">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-brown-dark mb-6 leading-tight">{t("hero_title")}</h2>
          <p className="text-lg md:text-xl text-brand-pink-brown font-medium mb-8">{t("hero_subtitle")}</p>
          <p className="text-brand-text-sub mb-10">{t("hero_description")}</p>
          <a href="#contact" className="inline-block bg-gradient-to-r from-brand-pink-hover to-brand-pink-brown text-white font-bold px-8 py-4 rounded-full shadow-lg hover:scale-105 transition-transform">{t("hero_cta")}</a>
        </div>
        <div className="hero-image-wrapper">
          <img src="https://res.cloudinary.com/dgqphttst/image/upload/v1747926703/Beautiful_Woman_Unsplash_yqjtqn.jpg" alt={t("hero_title")} className="w-full h-auto rounded-4xl shadow-card" />
        </div>
      </div>
    </section>
  );
};
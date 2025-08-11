'use client';
import { useTranslations, useLocale } from '@/app/lib/intl';

export const Header = () => {
  const t = useTranslations();
  const locale = useLocale();
  
  const handleLangChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value as "ja" | "en";
    // For now, we'll use a simple approach - redirect to the new locale
    if (newLang !== locale) {
      window.location.href = `/${newLang}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 shadow-sm backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <h1 className="font-display text-2xl font-bold text-brand-pink-brown">Visage AI</h1>
        <nav className="hidden md:flex">
          <ul className="flex items-center gap-8">
            <li><a href="#features" className="text-brand-text-sub hover:text-brand-pink-brown transition-colors">{t("nav_features")}</a></li>
            <li><a href="#story" className="text-brand-text-sub hover:text-brand-pink-brown transition-colors">{t("nav_story")}</a></li>
            <li><a href="#technology" className="text-brand-text-sub hover:text-brand-pink-brown transition-colors">{t("nav_technology")}</a></li>
            <li><a href="#results" className="text-brand-text-sub hover:text-brand-pink-brown transition-colors">{t("nav_results")}</a></li>
            <li><a href="#contact" className="text-brand-text-sub hover:text-brand-pink-brown transition-colors">{t("nav_contact")}</a></li>
          </ul>
        </nav>
        <div className="language-switcher">
          <select onChange={handleLangChange} value={locale} className="rounded border border-brand-pink-brown bg-transparent px-3 py-1 text-sm text-brand-pink-brown">
            <option value="ja">日本語</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </header>
  );
};
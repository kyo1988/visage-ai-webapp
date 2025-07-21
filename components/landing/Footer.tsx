'use client';
import { useTranslation } from "@/context/LanguageContext";
import { Icons } from "@/components/Icons";

export const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="bg-brand-pink-brown text-white/90 pt-20 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="footer-col">
            <h3 className="font-display text-2xl font-bold text-white mb-4">Visage AI</h3>
            <p className="text-white/80">{t("footer_tagline")}</p>
            <p className="text-white/80 mt-4">{t("footer_company_name")}</p>
            <a href={t("footer_website_url")} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-colors">{t("footer_website_text")}</a>
            <a href={`mailto:${t("footer_email_address")}`} className="text-white/80 hover:text-white transition-colors block">{t("footer_email_text")}</a>
          </div>
          <div className="footer-col">
            <h4 className="font-bold text-lg text-white mb-4">{t("footer_sitemap")}</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-white/80 hover:text-white transition-colors">{t("nav_features")}</a></li>
              <li><a href="#story" className="text-white/80 hover:text-white transition-colors">{t("nav_story")}</a></li>
              <li><a href="#technology" className="text-white/80 hover:text-white transition-colors">{t("nav_technology")}</a></li>
              <li><a href="#results" className="text-white/80 hover:text-white transition-colors">{t("nav_results")}</a></li>
              <li><a href="#contact" className="text-white/80 hover:text-white transition-colors">{t("nav_contact")}</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4 className="font-bold text-lg text-white mb-4">{t("footer_follow_sns")}</h4>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#" aria-label="Facebook" className="hover:scale-110 transition-transform"><Icons.Facebook /></a>
              <a href="#" aria-label="Instagram" className="hover:scale-110 transition-transform"><Icons.Instagram /></a>
              <a href="#" aria-label="X (Twitter)" className="hover:scale-110 transition-transform"><Icons.X /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/20 mt-12 pt-6 text-center text-sm text-white/60">
          <p>&copy; {new Date().getFullYear()} {t("footer_copyright")}</p>
        </div>
      </div>
    </footer>
  );
};
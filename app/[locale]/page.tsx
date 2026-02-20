import Hero from "@/components/marketing/Hero";
import { KpiSection } from "@/components/marketing/KpiSection";
import OmotenashiSection from "@/components/marketing/OmotenashiSection";
import CaseStudies from "@/components/marketing/CaseStudies";
import Story from "@/components/marketing/Story";
import DxSection from "@/components/marketing/DxSection";
import FinalCta from "@/components/marketing/FinalCta";
import { Faq } from "@/components/marketing/Faq";
import Footer from "@/components/landing/Footer";

export default function LandingPage({
  params: { locale: _locale }
}: {
  params: { locale: string };
}) {
  return (
    <main>
      <Hero />
      <KpiSection />
      <OmotenashiSection />
      <CaseStudies />
      <Story />
      <DxSection />
      <FinalCta />
      <Faq />
      <Footer />
    </main>
  );
}

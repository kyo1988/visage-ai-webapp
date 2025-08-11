import Hero from "@/components/marketing/Hero";
import { KpiSection } from "@/components/marketing/KpiSection";
import TechSection from "@/components/marketing/TechSection";
import CaseStudies from "@/components/marketing/CaseStudies";
import Story from "@/components/marketing/Story";
import Scalability from "@/components/marketing/Scalability";
import FinalCta from "@/components/marketing/FinalCta";
import { Faq } from "@/components/marketing/Faq";
import Footer from "@/components/landing/Footer";

export default function LandingPage() {
  return (
    <main>
      <Hero />
      <KpiSection />
      <TechSection />
      <CaseStudies />
      <Story />
      <Scalability />
      <FinalCta />
      <Faq />
      <Footer />
    </main>
  );
}

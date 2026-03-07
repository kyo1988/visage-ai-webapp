import LandingV8 from "@/components/marketing/LandingV8";
import Footer from "@/components/landing/Footer";

export default function LandingPage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  return (
    <main>
      <LandingV8 locale={locale} />
      <Footer />
    </main>
  );
}

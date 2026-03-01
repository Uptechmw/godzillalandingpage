import Navbar from "@/components/landing/Navbar";
import HeroNew from "@/components/landing/HeroNew";
import ValueProposition from "@/components/landing/ValueProposition";
import Comparison from "@/components/landing/Comparison";
import PricingNew from "@/components/landing/PricingNew";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen text-white" style={{ background: 'var(--color-primary)' }}>
      <Navbar />
      <HeroNew />
      <ValueProposition />
      <Comparison />
      <PricingNew />
      <FinalCTA />
      <Footer />
    </main>
  );
}

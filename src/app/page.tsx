import Navbar from "@/components/landing/Navbar";
import HeroNew from "@/components/landing/HeroNew";
import ValueProposition from "@/components/landing/ValueProposition";
import Comparison from "@/components/landing/Comparison";
import PricingNew from "@/components/landing/PricingNew";
import FinalCTA from "@/components/landing/FinalCTA";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white">
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

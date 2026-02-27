import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-godzilla-bg text-white">
      <Navbar />
      <Hero />
      <Features />
      <section id="agents" className="py-24 bg-godzilla-surface/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-8">Collaborative Intelligence</h2>
          <p className="text-godzilla-text-muted max-w-2xl mx-auto mb-12">
            Godzilla Coder isn't just one AI. It's an ensemble. Choose the right brain for the right task, or let them work together to solve complex architectural challenges.
          </p>
          <div className="flex flex-wrap justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="px-6 py-3 border border-godzilla-border rounded-full">OpenAI</div>
            <div className="px-6 py-3 border border-godzilla-border rounded-full">Anthropic</div>
            <div className="px-6 py-3 border border-godzilla-border rounded-full">Google Cloud</div>
            <div className="px-6 py-3 border border-godzilla-border rounded-full">Meta Llama</div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}

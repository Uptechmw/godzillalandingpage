import React from 'react';
import Navbar from '@/components/landing/enterprise/Navbar';
import Hero from '@/components/landing/enterprise/Hero';
import TrustStrip from '@/components/landing/enterprise/TrustStrip';
import BuiltForTeams from '@/components/landing/enterprise/BuiltForTeams';
import Architecture from '@/components/landing/enterprise/Architecture';
import MultiModel from '@/components/landing/enterprise/MultiModel';
import SecurityPrivacy from '@/components/landing/enterprise/SecurityPrivacy';
import BuiltForTeamsManagement from '@/components/landing/enterprise/BuiltForTeamsManagement';
import Pricing from '@/components/landing/enterprise/Pricing';
import RealEngineers from '@/components/landing/enterprise/RealEngineers';
import Contact from '@/components/landing/enterprise/Contact';
import Footer from '@/components/landing/enterprise/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-primary text-text font-sans antialiased text-base selection:bg-emerald/30">
      <Navbar />

      <div className="pt-20">
        <Hero />
        <TrustStrip />

        <div id="architecture">
          <Architecture />
        </div>

        <BuiltForTeams />

        <div id="models">
          <MultiModel />
        </div>

        <div id="security">
          <SecurityPrivacy />
        </div>

        <BuiltForTeamsManagement />

        <div id="pricing">
          <Pricing />
        </div>

        <RealEngineers />
        <Contact />
      </div>

      <Footer />
    </main>
  );
}

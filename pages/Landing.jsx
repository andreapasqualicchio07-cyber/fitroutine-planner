import LandingNav from '@/components/landing/LandingNav';
import Hero from '@/components/landing/Hero';
import HowItWorks from '@/components/landing/HowItWorks';
import Features from '@/components/landing/Features';
import FinalCTA from '@/components/landing/FinalCTA';
import Footer from '@/components/Footer';
import BotPopup from '@/components/landing/BotPopup';

export default function Landing() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LandingNav />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Features />
        <FinalCTA />
      </main>
      <Footer />
      <BotPopup />
    </div>
  );
}
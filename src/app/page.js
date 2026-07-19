import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SocialProofStrip from "@/components/SocialProofStrip";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import CTABanner from "@/components/CTABanner";
import RoadmapForm from "@/components/RoadmapForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full relative">
        <HeroSection />
        <SocialProofStrip />
        <FeaturesSection />
        <HowItWorksSection />
        <CTABanner />
        <RoadmapForm />
      </main>
      <Footer />
    </>
  );
}


import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyMoreThanDegree from "@/components/WhyMoreThanDegree";
import WhatIsRGUWay from "@/components/WhatIsRGUWay";
import CoreBrandPromise from "@/components/CoreBrandPromise";
import SkillPassportBanner from "@/components/SkillPassportBanner";
import ProjectedOutcomes from "@/components/ProjectedOutcomes";
import LifeAtRGU from "@/components/LifeAtRGU";
import HappeningAtRGU from "@/components/HappeningAtRGU";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <WhyMoreThanDegree />
      <WhatIsRGUWay />
      <CoreBrandPromise />
      <SkillPassportBanner />
      <ProjectedOutcomes />
      <LifeAtRGU />
      <HappeningAtRGU />
      <Footer />
    </main>
  );
}

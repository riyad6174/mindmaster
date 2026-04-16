import HeroSection from "@/components/HeroSection";
import NoticeSection from "@/components/NoticeSection";
import AboutSection from "@/components/AboutSection";
import FeaturedPrograms from "@/components/FeaturedPrograms";
import LatestBuzz from "@/components/LatestBuzz";
import AdmissionSection from "@/components/AdmissionSection";
import QuickActions from "@/components/QuickActions";
import Programs from "@/components/Programs";
import Schedule from "@/components/Schedule";
import WhyUs from "@/components/WhyUs";
import GallerySection from "@/components/GallerySection";
import ContactSocial from "@/components/ContactSocial";

export default function Home() {
  return (
    <>
      <main>
        <HeroSection />
        <NoticeSection />
        <AboutSection />
        <FeaturedPrograms />
        <LatestBuzz />
        <AdmissionSection />
        <QuickActions />
        <Programs />
        <Schedule />
        <WhyUs />
        <GallerySection />
        <ContactSocial />
      </main>
    </>
  );
}

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import NoticeSection from "@/components/NoticeSection";
import AboutSection from "@/components/AboutSection";
import LatestBuzz from "@/components/LatestBuzz";
import AdmissionSection from "@/components/AdmissionSection";
import QuickActions from "@/components/QuickActions";
import Programs from "@/components/Programs";
import Schedule from "@/components/Schedule";
import WhyUs from "@/components/WhyUs";
import ContactSocial from "@/components/ContactSocial";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <NoticeSection />
        <AboutSection />
        <LatestBuzz />
        <AdmissionSection />
        <QuickActions />
        <Programs />
        <Schedule />
        <WhyUs />
        <ContactSocial />
      </main>
      <Footer />
    </>
  );
}

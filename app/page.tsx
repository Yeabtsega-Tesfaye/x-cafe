import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import Services from "@/components/sections/Services";
import Menu from "@/components/sections/Menu";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <TrustStrip />
      <Services />
      <Menu />
      <About />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}
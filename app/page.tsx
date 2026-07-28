import Header from "../components/Header";
import Hero from "../components/Hero";
import TrustStrip from "../components/TrustStrip";
import Services from "../components/Services";
import Menu from "../components/Menu";
import About from "../components/About";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <TrustStrip />
      <Services />  
      <Menu />
      <About />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
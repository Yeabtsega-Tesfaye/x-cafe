import Header from "../components/home/Header";
import Hero from "../components/home/Hero";
import TrustStrip from "../components/home/TrustStrip";
import Services from "../components/home/Services";
import Menu from "../components/home/Menu";
import About from "../components/home/About";
import Testimonials from "../components/home/Testimonials";
import CTA from "../components/home/CTA";
import Footer from "../components/home/Footer";
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
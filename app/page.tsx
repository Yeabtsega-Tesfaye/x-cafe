import { prisma } from "@/lib/prisma";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import TrustStrip from "@/components/sections/TrustStrip";
import Services from "@/components/sections/Services";
import Menu from "@/components/sections/Menu";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import CTA from "@/components/sections/CTA";
import Footer from "@/components/layout/Footer";

export default async function Home() {
  const menuItems = await prisma.menuItem.findMany({
    where: { isAvailable: true },
    include: { category: true },
    orderBy: { createdAt: "asc" },
  });

  const featuredItems = await prisma.menuItem.findMany({
    where: { isFeatured: true, isAvailable: true },
    include: { category: true },
  });

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  const mappedMenu = menuItems.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description || "",
    price: `ETB ${item.price}`,
    image: item.image || "/images/placeholder.jpg",
    badge: item.badge,
    category: item.category.name,
  }));

  const mappedFeatured = featuredItems.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description || "",
    price: `ETB ${item.price}`,
    image: item.image || "/images/placeholder.jpg",
    badge: item.badge,
    category: item.category.name,
  }));

  const categoryList = ["All", ...categories.map((c) => c.name)];

  return (
    <>
      <Header />
      <Hero />
      <TrustStrip />
      <Services />
      <Menu
        featuredItems={mappedFeatured}
        menuItems={mappedMenu}
        categories={categoryList}
      />
      <About />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}
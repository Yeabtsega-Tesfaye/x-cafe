import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/layout/ScrollProgress";
import Header from "@/components/layout/Header";
import { FloatingCart } from "@/features/orders/components/FloatingCart";
import Footer from "@/components/layout/Footer";

// Setup heading font
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

// Setup body font
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata = {
  title: "X Cafe",
  description: "Fresh Food. Great Coffee. Effortless.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Inject the CSS variables into the HTML tag
    <html lang="en" className={`${outfit.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="font-sans antialiased bg-background text-text-primary">
        <ScrollProgress />
        <Header />
        <main>{children}</main>
        <FloatingCart />
        <Footer />
      </body>
    </html>
  );
}
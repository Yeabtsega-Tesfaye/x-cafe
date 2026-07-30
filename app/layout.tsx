// app/layout.tsx
import { Outfit, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

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
      {/* Apply the body font by default and add antialiasing for smoothness */}
      <body className="font-sans antialiased bg-background text-text-primary">
        {children}
      </body>
    </html>
  );
}
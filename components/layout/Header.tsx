"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#menu", label: "Menu" },
  { href: "#services", label: "Services" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left?: number;
    width?: number;
    opacity?: number;
  }>({});
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((link) => document.querySelector(link.href)).filter(
      (el): el is Element => el !== null
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(`#${entry.target.id}`);
        });
      },
      { threshold: 0.35 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => sections.forEach((section) => observer.unobserve(section));
  }, []);

  useEffect(() => {
    const idx = NAV_LINKS.findIndex((link) => link.href === activeSection);
    if (idx < 0 || !linksRef.current[idx]) {
      setIndicatorStyle({ opacity: 0 });
      return;
    }
    const el = linksRef.current[idx];
    setIndicatorStyle({ opacity: 1, left: el.offsetLeft, width: el.offsetWidth });
  }, [activeSection]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (e: PointerEvent) => {
      if (mobileNavRef.current && !mobileNavRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, [isMenuOpen]);

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Desktop capsule nav */}
      <nav
        className={`hidden md:flex fixed left-1/2 -translate-x-1/2 z-50 items-center h-[52px] rounded-button px-1.5 border border-border backdrop-blur-md transition-all duration-[250ms] ${
          isScrolled ? "top-4 bg-background/95 shadow-card" : "top-6 bg-background/80"
        }`}
      >
        <span
          aria-hidden
          className="absolute top-1.5 h-[calc(100%-12px)] rounded-button bg-accent/10 border border-accent/25 transition-all duration-[250ms] pointer-events-none"
          style={indicatorStyle}
        />

        {NAV_LINKS.map((link, i) => {
          const isActive = activeSection === link.href;
          return (
            <a
              key={link.href}
              ref={(el) => {
                linksRef.current[i] = el;
              }}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              className={`relative z-10 flex items-center h-10 px-4 text-small font-medium tracking-wide uppercase rounded-button transition-colors duration-[150ms] cursor-pointer ${
                isActive ? "text-accent font-semibold" : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {link.label}
            </a>
          );
        })}

        <div className="w-px h-4 bg-border mx-1" />

        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("#contact");
          }}
          className="relative z-10 flex items-center h-10 px-5 mr-0.5 rounded-button bg-accent text-white text-small font-semibold uppercase tracking-wide transition-transform duration-[150ms] hover:scale-105"
        >
          Order
        </a>
      </nav>

      {/* Mobile nav */}
      <div
        ref={mobileNavRef}
        className="md:hidden fixed top-3 left-4 right-4 z-50 rounded-card overflow-hidden bg-background/95 border border-border shadow-card backdrop-blur-md"
      >
        <div className="flex items-center justify-between h-[50px] px-4">
          <span className="text-h4 font-bold text-text-primary tracking-wide">X Cafe</span>

          <button
            onClick={() => setIsMenuOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
            className="flex items-center justify-center w-11 h-11 rounded-button bg-background-secondary border border-border text-text-primary"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <div
          className="overflow-hidden transition-all duration-[250ms]"
          style={{ maxHeight: isMenuOpen ? "400px" : "0px" }}
        >
          <div className="flex flex-col gap-1 px-3 pb-3 pt-1">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href;
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  className={`flex items-center min-h-11 px-4 rounded-button text-small font-medium uppercase tracking-wide transition-colors duration-[150ms] ${
                    isActive ? "bg-accent/10 text-accent font-semibold" : "text-text-secondary"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#contact");
              }}
              className="flex items-center justify-center min-h-11 mt-1 rounded-button bg-accent text-white text-small font-semibold uppercase tracking-wide"
            >
              Order Now
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useCartStore } from "@/features/orders/store/useCartStore";

// 1. Fixed the spacing typo in the contact href and made them absolute paths
const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Services" },
  { href: "/#menu", label: "Menu" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(pathname);
  const [indicatorStyle, setIndicatorStyle] = useState<{
    left?: number;
    width?: number;
    opacity?: number;
  }>({ opacity: 0 });
  
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const mobileNavRef = useRef<HTMLDivElement>(null);

  // Handle scroll styling
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 2. Upgraded Active State Logic
  useEffect(() => {
    // If we are not on the homepage, just set the active section to the pathname
    if (pathname !== "/") {
      setActiveSection(pathname);
      return;
    }

    // If we are on the homepage, default to Home
    setActiveSection("/");

    // Find the sections that actually exist on the page
    const sections = NAV_LINKS
      .filter((link) => link.href.includes("#"))
      .map((link) => {
        const id = link.href.split("#")[1];
        return document.getElementById(id);
      })
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Add a root margin offset so it triggers slightly before the element hits the top
          if (entry.isIntersecting) {
            setActiveSection(`/#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.5, rootMargin: "-80px 0px 0px 0px" } 
    );

    sections.forEach((section) => observer.observe(section));

    // Fallback: If we scroll all the way to the top, force "Home" to be active
    const onScrollTop = () => {
      if (window.scrollY < 100) setActiveSection("/");
    };
    window.addEventListener("scroll", onScrollTop, { passive: true });

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      window.removeEventListener("scroll", onScrollTop);
    };
  }, [pathname]);

  // Animate the capsule indicator
  useEffect(() => {
    const idx = NAV_LINKS.findIndex((link) => link.href === activeSection);
    if (idx < 0 || !linksRef.current[idx]) {
      setIndicatorStyle({ opacity: 0 });
      return;
    }
    const el = linksRef.current[idx];
    setIndicatorStyle({ opacity: 1, left: el.offsetLeft, width: el.offsetWidth });
  }, [activeSection]);

  // Handle click outside mobile menu
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

  // 3. Upgraded Scroll Handler
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMenuOpen(false);

    if (href.includes("#")) {
      const id = href.split("#")[1];
      // ONLY intercept and smooth scroll if we are already on the homepage
      if (pathname === "/") {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
          // Scroll to the element, subtracting 80px so the sticky header doesn't cover the title
          const y = element.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }
    }
  };

  // 4. Security/Layout Check: Hide this component completely on Dashboard and Login routes
  const isHiddenRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/login") || pathname.startsWith("/menu");
  
  // Note: We return null AFTER all hooks are called to satisfy React's Rules of Hooks
  if (isHiddenRoute) return null;

  return (
    <>
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
            <Link
              key={link.href}
              ref={(el) => {
                linksRef.current[i] = el;
              }}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`relative z-10 flex items-center h-10 px-4 text-small font-medium tracking-wide uppercase rounded-button transition-colors duration-[150ms] cursor-pointer ${
                isActive ? "text-accent font-semibold" : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {link.label}
            </Link>
          );
        })}

        <div className="w-px h-4 bg-border mx-1" />

        <Link
          href="/#contact"
          onClick={() => useCartStore.getState().setIsOpen(true)}
          className="relative z-10 flex items-center h-10 px-5 mr-0.5 rounded-button bg-accent text-white text-small font-semibold uppercase tracking-wide transition-transform duration-[150ms] hover:scale-105"
        >
          Order
        </Link>
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
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`flex items-center min-h-11 px-4 rounded-button text-small font-medium uppercase tracking-wide transition-colors duration-[150ms] ${
                    isActive ? "bg-accent/10 text-accent font-semibold" : "text-text-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link
              href="/#contact"
              onClick={() => {
    setIsMenuOpen(false);
    useCartStore.getState().setIsOpen(true);
  }}
              className="flex items-center justify-center min-h-11 mt-1 rounded-button bg-accent text-white text-small font-semibold uppercase tracking-wide"
            >
              Order Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
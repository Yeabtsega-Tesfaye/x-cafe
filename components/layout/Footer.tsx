"use client";

import { FaInstagram, FaFacebook } from "react-icons/fa";
import { MapPin, Phone, ArrowRight, Mail } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem } from "../ui/FadeUp";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-background-secondary pt-12" id="contact">
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute -left-1/4 top-0 z-0 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]" />
      <div className="pointer-events-none absolute -right-1/4 bottom-0 z-0 h-[500px] w-[500px] rounded-full bg-accent/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <StaggerContainer className="grid gap-8 pb-4 lg:grid-cols-12 lg:gap-6">
          
          {/* Brand & Newsletter */}
          <StaggerItem className="lg:col-span-6">
            <h3 className="font-heading text-3xl font-black tracking-tight text-text-primary">
              X Cafe<span className="text-accent">.</span>
            </h3>

            <p className="mt-3 max-w-md text-sm leading-relaxed text-text-secondary">
              Fresh coffee, delicious food, and a modern café experience crafted for every moment. 
              Join our community.
            </p>

            {/* Modern Newsletter Input */}
            <div className="mt-6 flex max-w-md items-center gap-2 rounded-full border border-border/60 bg-background/50 p-1 pl-4 backdrop-blur-sm transition-colors focus-within:border-accent/50 focus-within:bg-background">
              <Mail className="h-4 w-4 text-text-muted" />
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
              />
              <button className="flex h-9 items-center justify-center rounded-full bg-accent px-5 text-sm font-bold text-white transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/25 active:scale-95">
                Subscribe
              </button>
            </div>

            {/* Social Icons */}
            <div className="mt-6 flex gap-3">
              {[
                { icon: FaInstagram, label: "Instagram" },
                { icon: FaFacebook, label: "Facebook" },
              ].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  aria-label={social.label}
                  className="group flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background/50 text-text-secondary backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/20"
                >
                  <social.icon size={14} className="transition-transform duration-300 group-hover:scale-110" />
                </a>
              ))}
            </div>
          </StaggerItem>

          {/* Navigation */}
          <StaggerItem className="lg:col-span-2 lg:col-start-8">
            <h4 className="text-sm font-black uppercase tracking-wider text-text-primary">
              Explore
            </h4>
            <div className="mt-4 flex flex-col gap-3 text-sm font-medium text-text-secondary">
              {["Home", "Menu", "About", "Contact"].map((link) => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="group flex w-fit items-center gap-2 transition-colors duration-200 hover:text-accent"
                >
                  <span className="relative overflow-hidden">
                    {link}
                    <span className="absolute bottom-0 left-0 h-[1.5px] w-full -translate-x-full bg-accent transition-transform duration-300 group-hover:translate-x-0" />
                  </span>
                  <ArrowRight className="h-3 w-3 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
                </a>
              ))}
            </div>
          </StaggerItem>

          {/* Contact */}
          <StaggerItem className="lg:col-span-3">
            <h4 className="text-sm font-black uppercase tracking-wider text-text-primary">
              Contact
            </h4>
            <div className="mt-4 flex flex-col gap-4 text-sm text-text-secondary">
              <a href="#" className="group flex items-start gap-3 transition-colors hover:text-accent">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 transition-colors group-hover:bg-accent/20">
                  <MapPin size={16} className="text-accent" />
                </div>
                <span className="pt-1.5 font-medium leading-relaxed">
                  Downtown Café Street,<br />Addis Ababa
                </span>
              </a>

              <a href="tel:+251900000000" className="group flex items-center gap-3 transition-colors hover:text-accent">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent/10 transition-colors group-hover:bg-accent/20">
                  <Phone size={16} className="text-accent" />
                </div>
                <span className="font-medium">+251 900 000 000</span>
              </a>
            </div>
          </StaggerItem>

        </StaggerContainer>

        {/* Mega Typography Watermark - Added negative bottom margin to kill the font space */}
        <div className="pointer-events-none relative mt-2 flex select-none justify-center overflow-hidden border-t border-border/40 pt-4">
          <FadeUp delay={0.2} className="w-full">
            <h1 className="text-center font-heading text-[13vw] font-black leading-none tracking-tighter text-text-primary/[0.03] -mb-[3%] dark:text-white/[0.02]">
              X CAFE
            </h1>
          </FadeUp>
        </div>

        {/* Bottom Bar - Cut padding to absolute minimums (pb-4 pt-2) */}
        <div className="relative z-10 flex flex-col items-center justify-between gap-2 pb-4 pt-2 text-xs font-medium text-text-muted sm:flex-row">
          <FadeUp delay={0.3}>
            © {new Date().getFullYear()} X Cafe. All rights reserved.
          </FadeUp>
          <FadeUp delay={0.4} className="flex gap-4">
            <a href="#" className="transition-colors hover:text-accent">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-accent">Terms of Service</a>
          </FadeUp>
        </div>
      </div>
    </footer>
  );
}
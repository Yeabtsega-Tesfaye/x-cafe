import { FaInstagram, FaFacebook } from "react-icons/fa";
import { MapPin, Phone } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem } from "../ui/FadeUp";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background px-6 py-16 lg:px-8">
      <StaggerContainer className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">

        {/* Brand */}
        <StaggerItem>
          <h3 className="text-2xl font-bold text-text-primary">
            X Cafe
          </h3>

          <p className="mt-4 max-w-sm text-text-secondary leading-relaxed">
            Fresh coffee, delicious food, and a modern café experience
            crafted for every moment.
          </p>

          {/* Social Icons */}
          <div className="mt-6 flex gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-secondary transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:text-accent hover:shadow-sm"
            >
              <FaInstagram size={18} />
            </a>

            <a
              href="#"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-secondary transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:text-accent hover:shadow-sm"
            >
              <FaFacebook size={18} />
            </a>
          </div>
        </StaggerItem>

        {/* Navigation */}
        <StaggerItem>
          <h4 className="font-semibold text-text-primary">
            Explore
          </h4>

          <div className="mt-4 flex flex-col gap-3 text-text-secondary">
            <a
              href="#"
              className="w-fit transition-colors duration-200 hover:text-accent"
            >
              Home
            </a>

            <a
              href="#"
              className="w-fit transition-colors duration-200 hover:text-accent"
            >
              Menu
            </a>

            <a
              href="#"
              className="w-fit transition-colors duration-200 hover:text-accent"
            >
              About
            </a>

            <a
              href="#"
              className="w-fit transition-colors duration-200 hover:text-accent"
            >
              Contact
            </a>
          </div>
        </StaggerItem>

        {/* Contact */}
        <StaggerItem>
          <h4 className="font-semibold text-text-primary">
            Contact
          </h4>

          <div className="mt-4 flex flex-col gap-4 text-text-secondary">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
                <MapPin size={18} className="text-accent" />
              </div>
              <span>Downtown Café Street, Addis Ababa</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
                <Phone size={18} className="text-accent" />
              </div>
              <span>+251 900 000 000</span>
            </div>
          </div>
        </StaggerItem>

      </StaggerContainer>

      {/* Copyright */}
      <FadeUp delay={0.4} className="mx-auto mt-16 max-w-7xl border-t border-border pt-8 text-center text-sm text-text-secondary">
        © {new Date().getFullYear()} X Cafe. All rights reserved.
      </FadeUp>
    </footer>
  );
}
import { ArrowRight, Coffee } from "lucide-react";
import { FadeUp } from "../ui/FadeUp";

export default function CTA() {
  return (
    <section className="px-6 py-24 lg:px-8 bg-background">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-border bg-accent/5 px-8 py-20 text-center shadow-sm">

        {/* Soft background glow - strictly mapped to accent token */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-3xl">

          <FadeUp className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-background shadow-sm border border-border">
            <Coffee size={28} className="text-accent" />
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="mt-8 text-4xl font-bold tracking-tight text-text-primary md:text-5xl lg:text-6xl">
              Your Perfect Coffee Moment Awaits
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">
              Order your favorite coffee and fresh meals from X Cafe.
              Crafted with quality ingredients and delivered with care.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <button className="group mt-10 inline-flex h-14 items-center justify-center gap-3 rounded-button bg-accent px-8 text-base font-bold text-white shadow-lg shadow-accent/30 transition-all duration-300 hover:-translate-y-1 hover:brightness-95 hover:shadow-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
              Start Your Order
              <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </FadeUp>

        </div>
      </div>
    </section>
  );
}
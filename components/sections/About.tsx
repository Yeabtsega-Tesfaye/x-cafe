import Image from "next/image";
import { FadeUp } from "../ui/FadeUp";

export default function About() {
  return (
    <section className="px-3 py-8 lg:px-4 bg-background" id="about">
      {/* Utilizing your custom content-container class */}
      <div className="content-container grid gap-6 md:grid-cols-2 items-center">

        {/* Text Content Block */}
        <div className="max-w-xl">
          <FadeUp>
            {/* .text-small applies your 14px size token */}
            <p className="text-small font-semibold uppercase tracking-[0.2em] text-accent">
              About Us
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            {/* Inherits exact h2 styling (30px, 600 weight) from globals.css */}
            <h2 className="mt-2 tracking-tight text-text-primary">
              More Than Just Coffee, It&apos;s an Experience
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            {/* Inherits global body font size (16px) */}
            <p className="mt-3 leading-relaxed text-text-secondary">
              At X Cafe, we believe great coffee brings people together.
              We combine quality ingredients, modern service, and a welcoming
              atmosphere to create memorable moments every day.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <p className="mt-2 leading-relaxed text-text-secondary">
              Whether you visit us for a quick coffee, a meeting, or a relaxing
              meal, we make every experience special.
            </p>
          </FadeUp>

          <FadeUp delay={0.4}>
            {/* Using mt-4 (32px spacing token) and rounded-button */}
            <button className="mt-4 inline-flex h-14 items-center justify-center rounded-button bg-accent px-4 font-bold text-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2">
              Learn More
            </button>
          </FadeUp>
        </div>

        {/* Image Block */}
        {/* Using rounded-card and shadow-card design tokens */}
        <FadeUp delay={0.2} className="relative h-[400px] w-full overflow-hidden rounded-card shadow-card">
          <Image
            src="/images/cafe-about.jpg"
            alt="People enjoying coffee at X Cafe"
            fill
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </FadeUp>

      </div>
    </section>
  );
}
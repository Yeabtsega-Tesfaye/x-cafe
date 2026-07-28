import { ArrowRight, Coffee } from "lucide-react";

export default function CTA() {
  return (
    <section className="px-8 py-24">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-orange-100 bg-orange-50/50 px-8 py-20 text-center">

        {/* Soft background glow */}
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-orange-300/30 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-orange-200/30 blur-3xl" />

        <div className="relative mx-auto max-w-3xl">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
            <Coffee size={26} className="text-orange-500" />
          </div>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-gray-900 md:text-5xl">
            Your Perfect Coffee Moment Awaits
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Order your favorite coffee and fresh meals from X Cafe.
            Crafted with quality ingredients and delivered with care.
          </p>

          <button className="mt-10 inline-flex items-center gap-3 rounded-full bg-orange-500 px-8 py-4 font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-orange-600">
            Start Your Order
            <ArrowRight size={18} />
          </button>

        </div>

      </div>
    </section>
  );
}
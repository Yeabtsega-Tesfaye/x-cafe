import Image from "next/image";
import { Coffee, Users, UtensilsCrossed, Star } from "lucide-react";
export default function Hero() {
  return (
    <section className="px-6 py-24 lg:px-8">
  <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
       <div className="max-w-xl">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-medium text-orange-600">
  <Coffee className="h-4 w-4" />
  <span>Freshly Brewed Every Day</span>
</div>
  <h1 className="max-w-2xl text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
    Fresh Food. Great Coffee. Effortless Ordering.
  </h1>

<p className="mt-6 max-w-lg text-base leading-8 text-slate-600 sm:text-lg">
  Enjoy handcrafted meals, freshly brewed coffee, and a seamless dining
  experience—all from one modern café.
</p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
  <a
    href="#"
    className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
  >
    Order Now
  </a>

  <a
    href="#"
    className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-all duration-200 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
  >
    View Menu
  </a>
</div>
<div className="mt-12 grid grid-cols-3 gap-6 border-t border-slate-200 pt-8">
  <div className="flex items-start gap-3">
    <Users className="mt-1 h-5 w-5 text-orange-500" />

    <div>
      <p className="text-3xl font-bold text-slate-900">
        500+
      </p>

      <p className="mt-1 text-sm text-slate-500">
        Happy Customers
      </p>
    </div>
  </div>

  <div className="flex items-start gap-3">
    <UtensilsCrossed className="mt-1 h-5 w-5 text-orange-500" />

    <div>
      <p className="text-3xl font-bold text-slate-900">
        40+
      </p>

      <p className="mt-1 text-sm text-slate-500">
        Menu Items
      </p>
    </div>
  </div>

  <div className="flex items-start gap-3">
    <Star className="mt-1 h-5 w-5 fill-orange-500 text-orange-500" />

    <div>
      <p className="text-3xl font-bold text-slate-900">
        4.9
      </p>

      <p className="mt-1 text-sm text-slate-500">
        Customer Rating
      </p>
    </div>
  </div>
</div>
</div>

        <div className="relative h-[560px] overflow-hidden rounded-[2rem] shadow-xl shadow-slate-200/50">
  <Image
    src="/images/hero.jpg"
    alt="Fresh coffee and food from X Cafe"
    fill
    className="object-cover object-center"
    priority
  />
</div>
      </div>
    </section>
  );
}
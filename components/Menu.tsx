import Image from "next/image";
import { ArrowRight, Star } from "lucide-react";

const items = [
  {
    name: "Ethiopian Macchiato",
    category: "Coffee",
    price: "$4.50",
    badge: "Signature",
    image: "/images/ethiopian-coffee.jpg",
    description:
      "A rich Ethiopian coffee experience with smooth espresso and perfectly steamed milk.",
  },
  {
    name: "Doro Wat",
    category: "Traditional",
    price: "$12.00",
    badge: "Chef's Pick",
    image: "/images/doro-wat.jpg",
    description:
      "A traditional Ethiopian dish prepared with slow-cooked chicken, spices, and authentic flavors.",
  },
  {
    name: "Special Tibs",
    category: "Traditional",
    price: "$10.00",
    badge: "Popular",
    image: "/images/tibs.jpg",
    description:
      "Tender pieces of meat sautéed with fresh ingredients and traditional Ethiopian spices.",
  },
  {
    name: "Fresh Avocado Toast",
    category: "Breakfast",
    price: "$7.50",
    badge: "Fresh",
    image: "/images/avocado-toast.jpg",
    description:
      "A modern breakfast favorite made with fresh avocado and quality ingredients.",
  },
];

export default function Menu() {
  return (
    <section className="bg-slate-50 px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
            Our Menu
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Taste Ethiopia, Crafted Fresh
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            Discover authentic Ethiopian flavors, freshly brewed coffee, and
            modern café favorites prepared with care every day.
          </p>
        </div>


        {/* Menu Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <article
              key={item.name}
              className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >

              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-xs font-semibold text-orange-500 shadow-sm">
                  {item.badge}
                </div>
              </div>


              {/* Content */}
              <div className="p-6">

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-500">
                    {item.category}
                  </span>

                  <span className="font-bold text-orange-500">
                    {item.price}
                  </span>
                </div>


                <h3 className="mt-3 text-xl font-bold text-slate-900">
                  {item.name}
                </h3>


                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>


                <div className="mt-5 flex items-center gap-1">
                  <Star className="h-4 w-4 fill-orange-500 text-orange-500" />
                  <Star className="h-4 w-4 fill-orange-500 text-orange-500" />
                  <Star className="h-4 w-4 fill-orange-500 text-orange-500" />
                  <Star className="h-4 w-4 fill-orange-500 text-orange-500" />
                  <Star className="h-4 w-4 fill-orange-500 text-orange-500" />
                </div>


                <button className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-orange-500 transition-all duration-200 group-hover:gap-3">
                  Order Now
                  <ArrowRight className="h-4 w-4" />
                </button>

              </div>

            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
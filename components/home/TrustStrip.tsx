import {
  Coffee,
  UtensilsCrossed,
  HandHeart,
  QrCode,
} from "lucide-react";

const highlights = [
  {
    icon: Coffee,
    title: "Premium Coffee",
    description:
      "Ethiopian Arabica beans, freshly roasted for a rich and authentic flavor.",
  },
  {
    icon: UtensilsCrossed,
    title: "Fresh Cuisine",
    description:
      "Prepared fresh every day using quality ingredients you'll love.",
  },
  {
    icon: HandHeart,
    title: "Warm Hospitality",
    description:
      "Friendly service and a welcoming atmosphere for every guest.",
  },
  {
    icon: QrCode,
    title: "Easy QR Ordering",
    description:
      "Scan, order, and enjoy your meal with a fast, contactless experience.",
  },
];

export default function TrustStrip() {
  return (
    <section className="bg-slate-50 px-6 py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lg shadow-slate-200/50">
          <div className="grid divide-y divide-slate-200 md:grid-cols-2 md:divide-x md:divide-y-0 xl:grid-cols-4">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex flex-col items-center px-8 py-10 text-center transition-all duration-200 hover:bg-slate-50"
                >
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-50">
                    <Icon className="h-9 w-9 text-orange-500" />
                  </div>

                  <h3 className="mt-6 text-xl font-semibold text-slate-900">
                    {item.title}
                  </h3>

                  <div className="mt-4 h-1 w-10 rounded-full bg-orange-500" />

                  <p className="mt-5 text-base leading-7 text-slate-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
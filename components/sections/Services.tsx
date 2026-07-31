import {
  Coffee,
  UtensilsCrossed,
  QrCode,
  CalendarHeart,
  ArrowRight,
} from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem } from "../ui/FadeUp";

const services = [
  {
    title: "Morning Coffee",
    description:
      "Start your day with freshly brewed Ethiopian Arabica coffee prepared by our expert baristas.",
    icon: Coffee,
  },
  {
    title: "Dine & Relax",
    description:
      "Enjoy delicious meals, comfortable seating, and a welcoming atmosphere for work or time with friends.",
    icon: UtensilsCrossed,
  },
  {
    title: "Easy QR Ordering",
    description:
      "Scan the menu, place your order, and pay in seconds with our seamless QR ordering experience.",
    icon: QrCode,
  },
  {
    title: "Events & Gatherings",
    description:
      "Celebrate birthdays, meetings, and special occasions in a modern and inviting café environment.",
    icon: CalendarHeart,
  },
];

export default function Services() {
  return (
    <section className="bg-white px-6 py-24 lg:px-8" id="services">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          {/* Header block cascading fade-ups */}
          <FadeUp>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-500">
              Experience X Cafe
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Designed Around Every Visit
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="mt-6 text-lg leading-relaxed text-slate-600">
              Whether you're stopping by for your morning coffee, enjoying lunch
              with friends, or ordering on the go, every experience at X Cafe is
              thoughtfully designed to be simple, comfortable, and memorable.
            </p>
          </FadeUp>
        </div>

        {/* Staggered grid for the service cards */}
        <StaggerContainer className="mt-16 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <StaggerItem
                key={service.title}
                className="group flex h-full flex-col rounded-[24px] border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-orange-200 hover:shadow-xl"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-50 transition-colors duration-300 group-hover:bg-orange-500">
                  <Icon className="h-8 w-8 text-orange-500 transition-colors duration-300 group-hover:text-white" />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {service.title}
                </h3>

                <p className="mt-4 flex-1 leading-7 text-slate-600">
                  {service.description}
                </p>

                <button className="mt-8 inline-flex items-center gap-2 font-semibold text-orange-500 transition-all duration-200 group-hover:gap-3">
                  Learn More
                  <ArrowRight className="h-4 w-4" />
                </button>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
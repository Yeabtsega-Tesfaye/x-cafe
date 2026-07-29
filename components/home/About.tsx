import Image from "next/image";

export default function About() {
  return (
    <section className="px-8 py-24">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 items-center">

        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
            About Us
          </p>

          <h2 className="mt-4 text-4xl font-bold">
            More Than Just Coffee, It&apos;s an Experience
          </h2>

          <p className="mt-6 text-gray-600">
            At X Cafe, we believe great coffee brings people together.
            We combine quality ingredients, modern service, and a welcoming
            atmosphere to create memorable moments every day.
          </p>

          <p className="mt-4 text-gray-600">
            Whether you visit us for a quick coffee, a meeting, or a relaxing
            meal, we make every experience special.
          </p>

          <button className="mt-8 rounded-full bg-orange-500 px-6 py-3 text-white font-semibold">
            Learn More
          </button>
        </div>


        <div className="relative h-80 overflow-hidden rounded-3xl">
          <Image
            src="/images/cafe-about.jpg"
            alt="People enjoying coffee at X Cafe"
            fill
            className="object-cover"
          />
        </div>

      </div>
    </section>
  );
}
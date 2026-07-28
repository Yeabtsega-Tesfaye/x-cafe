import { Star } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Sarah",
      text: "Amazing coffee and a beautiful atmosphere. My favorite place to relax.",
    },
    {
      name: "Michael",
      text: "Great service, fresh food, and the online ordering is very convenient.",
    },
    {
      name: "Emma",
      text: "A perfect café for meetings and spending time with friends.",
    },
  ];

  return (
    <section className="px-8 py-24">
      <div className="mx-auto max-w-6xl">

        <p className="text-sm font-semibold uppercase tracking-widest text-orange-500">
          Testimonials
        </p>

        <h2 className="mt-4 text-4xl font-bold">
          What Our Customers Say
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="rounded-2xl border bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >

              <div className="flex gap-1 text-orange-500">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    fill="currentColor"
                  />
                ))}
              </div>

              <p className="mt-4 text-gray-600">
                &quot;{review.text}&quot;
              </p>

              <h3 className="mt-5 font-semibold">
                {review.name}
              </h3>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
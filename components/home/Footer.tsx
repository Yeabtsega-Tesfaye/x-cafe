import { FaInstagram, FaFacebook } from "react-icons/fa";
import { MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-orange-100 bg-white px-8 py-16">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">

        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold text-gray-900">
            X Cafe
          </h3>

          <p className="mt-4 max-w-sm text-gray-600">
            Fresh coffee, delicious food, and a modern café experience
            crafted for every moment.
          </p>

          {/* Social Icons */}
          <div className="mt-6 flex gap-3">

            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:border-orange-500 hover:text-orange-500"
            >
              <FaInstagram size={18} />
            </a>

            <a
              href="#"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:border-orange-500 hover:text-orange-500"
            >
              <FaFacebook size={18} />
            </a>

          </div>
        </div>


        {/* Navigation */}
        <div>
          <h4 className="font-semibold text-gray-900">
            Explore
          </h4>

          <div className="mt-4 flex flex-col gap-3 text-gray-600">

            <a
              href="#"
              className="transition hover:text-orange-500"
            >
              Home
            </a>

            <a
              href="#"
              className="transition hover:text-orange-500"
            >
              Menu
            </a>

            <a
              href="#"
              className="transition hover:text-orange-500"
            >
              About
            </a>

            <a
              href="#"
              className="transition hover:text-orange-500"
            >
              Contact
            </a>

          </div>
        </div>


        {/* Contact */}
        <div>
          <h4 className="font-semibold text-gray-900">
            Contact
          </h4>

          <div className="mt-4 flex flex-col gap-4 text-gray-600">

            <div className="flex items-center gap-3">
              <MapPin size={18} className="text-orange-500" />
              <span>Downtown Café Street</span>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={18} className="text-orange-500" />
              <span>+251 900 000 000</span>
            </div>

          </div>
        </div>

      </div>


      {/* Copyright */}
      <div className="mx-auto mt-12 max-w-6xl border-t border-gray-100 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} X Cafe. All rights reserved.
      </div>

    </footer>
  );
}
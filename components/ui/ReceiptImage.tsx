"use client";

import { useState } from "react";
import Image from "next/image";

export function ReceiptImage({ src }: { src: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Thumbnail View */}
      <div
        onClick={() => setIsOpen(true)}
        className="group relative h-40 w-full shrink-0 cursor-pointer overflow-hidden rounded-xl border border-border sm:h-32 sm:w-32"
      >
        <Image
          src={src}
          alt="Payment receipt thumbnail"
          fill
          sizes="128px"
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {/* Hover overlay hint */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/20">
          <span className="rounded-full bg-black/50 px-3 py-1 text-xs font-bold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Enlarge
          </span>
        </div>
      </div>

      {/* Full Screen Modal View */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div className="relative h-full max-h-[90vh] w-full max-w-4xl">
            <Image
              src={src}
              alt="Payment receipt full size"
              fill
              className="object-contain"
            />
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-6 top-6 rounded-full bg-white/10 p-3 text-sm font-bold text-white transition-colors hover:bg-white/20"
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}
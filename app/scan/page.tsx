"use client";

import { useRouter } from "next/navigation";
import QRScanner from "@/components/qr-scanner";

export default function ScanPage() {
  const router = useRouter();

  const handleScan = (decodedText: string) => {
    console.log("QR Code:", decodedText);

    // Make sure the QR contains a valid URL
    try {
      const url = new URL(decodedText);

      // Only allow your own app URLs
      if (url.origin === window.location.origin) {
        router.push(url.pathname + url.search);
      } else {
        console.error("Invalid QR URL");
      }
    } catch {
      console.error("Invalid QR code:", decodedText);
    }
  };

  return (
    <main className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-md pt-20">
        <h1 className="mb-2 text-3xl font-bold">
          Scan Table QR
        </h1>

        <p className="mb-8 text-sm text-text-secondary">
          Upload a QR code image to open the table menu.
        </p>

        <QRScanner onScan={handleScan} />
      </div>
    </main>
  );
}
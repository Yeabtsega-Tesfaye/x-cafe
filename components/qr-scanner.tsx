"use client";

import { useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";

interface QRScannerProps {
  onScan?: (decodedText: string) => void;
}

export default function QRScanner({ onScan }: QRScannerProps) {
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanningFile, setIsScanningFile] = useState(false);

  const scanImage = async (file: File) => {
    setError(null);
    setResult(null);
    setIsScanningFile(true);

    const scanner = new Html5Qrcode("qr-image-scanner");
    scannerRef.current = scanner;

    try {
      const decodedText = await scanner.scanFile(file, true);

      setResult(decodedText);
      onScan?.(decodedText);
    } catch (err) {
      console.error("QR image scanning error:", err);

      setError(
        "Could not find a QR code in this image. Make sure the QR code is clear and fully visible."
      );
    } finally {
      setIsScanningFile(false);

      try {
        await scanner.clear();
      } catch {
        // Scanner may already be cleared.
      }

      scannerRef.current = null;
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }

    scanImage(file);

    // Allow selecting the same image again.
    event.target.value = "";
  };

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      {/* Hidden scanner container */}
      <div id="qr-image-scanner" className="hidden" />

      {/* Upload */}
      <div className="rounded-2xl border border-border bg-background p-6">
        <label
          htmlFor="qr-image"
          className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border p-8 text-center transition hover:bg-muted"
        >
          <div className="mb-3 text-4xl">📷</div>

          <p className="font-semibold text-text-primary">
            Scan QR from Image
          </p>

          <p className="mt-1 text-sm text-text-secondary">
            Upload a screenshot or QR code image
          </p>

          <span className="mt-4 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground">
            Choose Image
          </span>

          <input
            id="qr-image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Loading */}
      {isScanningFile && (
        <div className="rounded-xl border border-border p-4 text-center">
          <p className="text-sm text-text-secondary">
            Scanning QR code...
          </p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-600">
            {error}
          </p>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-5">
          <p className="mb-2 text-sm font-semibold text-green-700">
            QR Code Detected 🎉
          </p>

          <p className="break-all rounded-lg bg-white p-3 text-sm text-gray-800">
            {result}
          </p>

          <button
            type="button"
            onClick={() => {
              setResult(null);
              setError(null);
            }}
            className="mt-4 w-full rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            Scan Another
          </button>
        </div>
      )}
    </div>
  );
}
"use client";

import { QRCodeSVG } from "qrcode.react";

export function TableQRCode({
  tableId,
  tableNumber,
}: {
  tableId: string;
  tableNumber: number;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const url = `${baseUrl}/menu/${tableId}`;

  return (
    <div className="flex w-fit flex-col items-center gap-3 rounded-card border border-border bg-background p-6 shadow-sm">
      <QRCodeSVG value={url} size={180} bgColor="#FFFFFF" fgColor="#0F172A" level="M" />
      <p className="text-sm font-bold text-text-primary">Table {tableNumber}</p>
    </div>
  );
}
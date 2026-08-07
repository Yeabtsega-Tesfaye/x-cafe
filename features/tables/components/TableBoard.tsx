"use client";

import { useState } from "react";
import { Plus, Trash2, X, Printer } from "lucide-react";
import { TableQRCode } from "@/features/tables/components/TableQRCode";
import { createTable, deleteTable } from "@/features/tables/actions/table-actions";

type Table = {
  id: string;
  number: number;
};

export default function TableBoard({ initialTables }: { initialTables: Table[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    await createTable(formData);
    setIsModalOpen(false);
    setIsSubmitting(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-text-primary">Table Management</h2>
          <p className="text-text-secondary">Manage dining tables and print ordering QR codes.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="hidden sm:flex items-center gap-2 rounded-xl border border-border bg-background px-4 py-2 text-sm font-bold text-text-secondary transition-all hover:bg-background-secondary active:scale-95"
          >
            <Printer className="h-4 w-4" />
            Print All QRs
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-bold text-white transition-all hover:brightness-110 active:scale-95"
          >
            <Plus className="h-4 w-4" />
            Add Table
          </button>
        </div>
      </div>

      {/* Grid of Tables */}
      {initialTables.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-24 text-center">
          <p className="font-display text-lg font-bold text-text-primary">No tables found</p>
          <p className="text-sm text-text-secondary">Add your first table to generate a QR code.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {initialTables.map((table) => (
            <div 
              key={table.id} 
              className="flex flex-col overflow-hidden rounded-2xl border border-border bg-background p-4 shadow-sm transition-all hover:border-border/80 hover:shadow-md"
            >
              <div className="mb-4 flex items-center justify-between border-b border-border/50 pb-4">
                <h3 className="font-display text-lg font-bold text-text-primary">
                  Table {table.number}
                </h3>
                <button 
                  onClick={() => deleteTable(table.id)}
                  className="rounded p-1.5 text-text-secondary hover:bg-red-500/10 hover:text-red-500 transition-colors"
                  title="Remove Table"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
              {/* This is where your existing QR code component goes! */}
              <div className="flex-1 flex items-center justify-center bg-white rounded-xl p-4 border border-border/50">
                <TableQRCode tableId={table.id} tableNumber={table.number} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Table Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl bg-background p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-text-primary">Add New Table</h2>
              <button onClick={() => setIsModalOpen(false)} className="rounded-full p-2 hover:bg-background-secondary">
                <X className="h-5 w-5 text-text-secondary" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="mb-1 block text-sm font-bold text-text-secondary">Table Number</label>
                <input 
                  required 
                  type="number" 
                  name="number" 
                  min="1"
                  placeholder="e.g., 12" 
                  className="w-full rounded-xl border border-border bg-background-secondary/50 p-3 text-text-primary focus:border-accent focus:outline-none" 
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-bold text-text-secondary">Seats (Capacity)</label>
                <input 
                  required 
                  type="number" 
                  name="seats" 
                  defaultValue="4"
                  min="1"
                  className="w-full rounded-xl border border-border bg-background-secondary/50 p-3 text-text-primary focus:border-accent focus:outline-none" 
                />
              </div>

              <div className="mt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 rounded-xl border border-border p-3 font-bold text-text-secondary hover:bg-background-secondary">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 rounded-xl bg-accent p-3 font-bold text-white hover:brightness-110 disabled:opacity-50">
                  {isSubmitting ? "Adding..." : "Add Table"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
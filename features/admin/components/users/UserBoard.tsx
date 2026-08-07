"use client";

import { useState } from "react";
import { Plus, Trash2, Shield, User as UserIcon, X } from "lucide-react";
import { createUser, deleteUser } from "@/features/admin/actions/user-actions";

// Match the Prisma schema fields
type User = {
  id: string;
  name: string;
  email: string;
  role: string | null;
  createdAt: Date;
};

const ROLE_COLORS: Record<string, string> = {
  admin: "bg-purple-500/10 text-purple-600 border-purple-500/20",
  manager: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  cashier: "bg-green-500/10 text-green-600 border-green-500/20",
  kitchen: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  chef: "bg-orange-500/10 text-orange-600 border-orange-500/20",
};

export default function UserBoard({ initialUsers }: { initialUsers: User[] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    await createUser(formData);
    setIsModalOpen(false);
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-text-primary">Staff Management</h2>
          <p className="text-text-secondary">Manage system access and assign roles.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-bold text-white transition-all hover:brightness-110 active:scale-95"
        >
          <Plus className="h-4 w-4" />
          Add User
        </button>
      </div>

      {/* Users List */}
      <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-background-secondary/50 font-medium text-text-secondary">
              <tr>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Joined</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {initialUsers.map((user) => (
                <tr key={user.id} className="transition-colors hover:bg-background-secondary/20">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-background-secondary text-text-secondary">
                        <UserIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-bold text-text-primary">{user.name}</p>
                        <p className="text-xs text-text-secondary">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-bold uppercase tracking-wider ${ROLE_COLORS[user.role || "kitchen"] || "bg-gray-100 text-gray-600"}`}>
                      {user.role === "admin" && <Shield className="h-3 w-3" />}
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-text-secondary">
                    {new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => {
                        if (confirm(`Are you sure you want to remove ${user.name}? This will revoke their access immediately.`)) {
                          deleteUser(user.id);
                        }
                      }}
                      className="rounded p-2 text-text-secondary transition-colors hover:bg-red-500/10 hover:text-red-500"
                      title="Revoke Access"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add User Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-background p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-text-primary">Add New Staff</h2>
              <button onClick={() => setIsModalOpen(false)} className="rounded-full p-2 hover:bg-background-secondary">
                <X className="h-5 w-5 text-text-secondary" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="mb-1 block text-sm font-bold text-text-secondary">Full Name</label>
                <input required type="text" name="name" className="w-full rounded-xl border border-border bg-background-secondary/50 p-3 text-text-primary focus:border-accent focus:outline-none" />
              </div>
              
              <div>
                <label className="mb-1 block text-sm font-bold text-text-secondary">Email Address</label>
                <input required type="email" name="email" className="w-full rounded-xl border border-border bg-background-secondary/50 p-3 text-text-primary focus:border-accent focus:outline-none" />
              </div>

              <div>
                <label className="mb-1 block text-sm font-bold text-text-secondary">Temporary Password</label>
                <input required type="password" name="password" minLength={6} className="w-full rounded-xl border border-border bg-background-secondary/50 p-3 text-text-primary focus:border-accent focus:outline-none" />
              </div>

              <div>
                <label className="mb-1 block text-sm font-bold text-text-secondary">System Role</label>
                <select name="role" required className="w-full appearance-none rounded-xl border border-border bg-background-secondary/50 p-3 font-medium text-text-primary focus:border-accent focus:outline-none">
                  <option value="cashier">Cashier (POS & Payments)</option>
                  <option value="kitchen">Kitchen Staff (Order Viewer)</option>
                  <option value="chef">Chef (Kitchen Management)</option>
                  <option value="manager">Manager (Menu & Reporting)</option>
                  <option value="admin">Admin (Full Access)</option>
                </select>
              </div>

              <div className="mt-4 flex gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 rounded-xl border border-border p-3 font-bold text-text-secondary hover:bg-background-secondary">Cancel</button>
                <button type="submit" disabled={isSubmitting} className="flex-1 rounded-xl bg-accent p-3 font-bold text-white hover:brightness-110 disabled:opacity-50">
                  {isSubmitting ? "Creating..." : "Create User"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
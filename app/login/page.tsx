"use client";

import { useState } from "react";
import { authClient } from "@/features/auth/services/auth-client";
import { Coffee, Loader2, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // 1. Sign in the user
    const { error: signInError } = await authClient.signIn.email({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message ?? "Invalid email or password.");
      setIsLoading(false);
      return;
    }

    // 2. Fetch the fresh session
    const { data: sessionData } = await authClient.getSession();

    // 3. Cast user as any so TypeScript allows reading the custom 'role' field
    const user = sessionData?.user as { role?: string } | undefined;
    const userRole = user?.role?.toLowerCase() || "kitchen";

    // 4. Figure out where they belong
    let destination = "/dashboard";
    if (userRole === "cashier" || userRole === "manager") {
      destination = "/dashboard/payments";
    } else if (userRole === "kitchen" || userRole === "chef") {
      destination = "/dashboard/kitchen";
    }

    // 5. Hard reload to destination
    window.location.href = destination;
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-background-secondary px-4 overflow-hidden">
      
      {/* Premium Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-border/50 bg-background/80 p-8 shadow-2xl backdrop-blur-xl sm:p-10">
        
        {/* Brand Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent text-white shadow-lg shadow-accent/30">
            <Coffee size={28} />
          </div>
          <h1 className="font-display text-3xl font-extrabold tracking-tight text-text-primary">
            X Cafe System
          </h1>
          <p className="mt-2 text-sm font-medium text-text-secondary">
            Secure staff portal. Please sign in to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-text-secondary">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="staff@xcafe.com"
              className="h-12 w-full rounded-xl border border-border/50 bg-background-secondary px-4 text-sm font-medium text-text-primary transition-all placeholder:text-text-secondary/50 focus:border-accent focus:bg-background focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-text-secondary">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="h-12 w-full rounded-xl border border-border/50 bg-background-secondary px-4 text-sm font-medium text-text-primary transition-all placeholder:text-text-secondary/50 focus:border-accent focus:bg-background focus:outline-none focus:ring-2 focus:ring-accent/20"
            />
          </div>

          {/* Premium Error State */}
          {error && (
            <div className="flex items-center gap-2 rounded-xl bg-red-500/10 p-3 text-sm font-medium text-red-500 border border-red-500/20">
              <AlertCircle size={16} className="shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-accent text-sm font-bold text-white shadow-lg shadow-accent/30 transition-all hover:scale-[1.02] hover:shadow-accent/40 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Authenticating...
              </>
            ) : (
              "Sign In to Workspace"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
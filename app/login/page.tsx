"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/features/auth/services/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const { error: signInError } = await authClient.signIn.email({
      email,
      password,
    });

    setIsLoading(false);

    if (signInError) {
      setError(signInError.message ?? "Invalid email or password.");
      return;
    }

    router.push("/dashboard/kitchen");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background-secondary px-6">
      <div className="w-full max-w-sm rounded-card border border-border bg-background p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-text-primary">Staff Login</h1>
        <p className="mt-1 text-sm text-text-secondary">For kitchen and admin staff only.</p>

        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="text-sm font-medium text-text-primary">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-button border border-border bg-background-secondary px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium text-text-primary">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-button border border-border bg-background-secondary px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-accent/50"
            />
          </div>

          {error && <p className="text-sm font-medium text-danger">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="mt-2 rounded-button bg-accent px-4 py-2.5 text-sm font-bold text-white transition-opacity hover:brightness-95 disabled:opacity-60"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
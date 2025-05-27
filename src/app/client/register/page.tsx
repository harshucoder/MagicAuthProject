"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ApiResponse {
  message?: string;
  success?: boolean;
}

export default function ClientRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await fetch("/api/client/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data: ApiResponse = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      setMessage("✅ Registered successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/client/login");
      }, 2000); // Added delay for better UX
    } catch (err: unknown) {
      setError(
        err instanceof Error 
          ? err.message 
          : "An unexpected error occurred during registration"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0B0121] min-h-screen w-full flex flex-col items-center justify-center p-4 pt-24 space-y-6">
      <div className="w-[280px] sm:w-[500px] bg-transparent border-2 border-white rounded-[30px] shadow-[0_2px_10px_rgba(138,43,226,0.7)] flex flex-col items-center justify-center p-6">
        <div className="text-center mb-4 w-full">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Register for API Access</h2>
        </div>

        {error && (
          <div className="mb-4 w-full bg-red-900/20 border-l-4 border-red-500 p-3 rounded-r">
            <div className="text-red-300 text-sm">{error}</div>
          </div>
        )}

        {message && (
          <div className="mb-4 w-full bg-green-900/20 border-l-4 border-green-500 p-3 rounded-r">
            <div className="text-green-300 text-sm">{message}</div>
          </div>
        )}

        <form className="w-full space-y-4" onSubmit={handleRegister}>
          <div className="w-full">
            <label htmlFor="email" className="block text-sm font-medium text-white mb-1">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 bg-[#0B0121]/70 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="your@email.com"
              suppressHydrationWarning={true}
            />
          </div>

          <div className="w-full">
            <label htmlFor="password" className="block text-sm font-medium text-white mb-1">Password</label>
            <input
              id="password"
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-2 bg-[#0B0121]/70 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="••••••••"
            />
            <p className="text-xs text-gray-400 mt-1">Minimum 8 characters</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-[#0B0121] bg-white hover:bg-transparent hover:text-white hover:border-white hover:border-2 hover:shadow-[0_2px_10px_rgba(138,43,226,0.7)] ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block h-4 w-4 border-2 border-[#0B0121] border-t-transparent rounded-full animate-spin"></span>
                Registering...
              </span>
            ) : "Register"}
          </button>
        </form>
      </div>

      <button
        onClick={() => router.push("/client/login")}
        className="text-white text-sm underline hover:text-purple-400 transition"
      >
        Already registered? Login
      </button>
    </div>
  );
}
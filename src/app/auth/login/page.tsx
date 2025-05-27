"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

interface ApiResponse {
  success?: boolean;
  message?: string;
  redirectUrl?: string;
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [message, setMessage] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const emailParam = searchParams.get("email");

    if (token && emailParam) {
      setVerifying(true);
      setEmail(emailParam);
      verifyToken(token, emailParam);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/send-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data: ApiResponse = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send magic link");
      }

      setMessage("✅ Magic link sent! Check your email.");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const verifyToken = async (token: string, email: string) => {
    try {
      const res = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, email }),
      });

      const data: ApiResponse = await res.json();

      if (data.success && data.redirectUrl) {
        setMessage("✅ Token verified! Redirecting...");
        window.location.href = data.redirectUrl;
      } else {
        throw new Error(data.message || "Invalid or expired link");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="bg-[#0B0121] min-h-screen w-full flex items-center justify-center p-4 pt-24">
      <div className="w-[360px] h-[200px] sm:w-[500px] sm:h-[300px] bg-transparent border-2 border-white rounded-[30px] shadow-[0_2px_10px_rgba(138,43,226,0.7)] flex flex-col items-center justify-center p-6">
        <div className="text-center mb-4 w-full">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {verifying ? "Verifying Token..." : "Sign in with Magic Link"}
          </h2>
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

        {!verifying && (
          <form className="w-full space-y-4" onSubmit={handleSubmit}>
            <div className="w-full">
              <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-4 py-2 bg-[#0B0121]/70 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="your@email.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 border border-transparent rounded-lg text-sm font-medium text-[#0B0121] bg-white hover:bg-transparent hover:text-white hover:border-white hover:border-2 hover:shadow-[0_2px_10px_rgba(138,43,226,0.7)] ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Sending..." : "Send Magic Link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={
      <div className="bg-[#0B0121] min-h-screen w-full flex items-center justify-center p-4 pt-24">
        <div className="w-[360px] h-[200px] sm:w-[500px] sm:h-[300px] bg-transparent border-2 border-white rounded-[30px] shadow-[0_2px_10px_rgba(138,43,226,0.7)] flex items-center justify-center">
          <div className="text-white">Loading authentication...</div>
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
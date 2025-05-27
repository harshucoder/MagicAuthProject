"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginResponse {
  token?: string;
  message?: string;
}

export default function ClientLogin() {
  const [mode, setMode] = useState<"password" | "magic">("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const endpoint = mode === "password" ? "/api/client/login" : "/api/client/magic-link";
      const body = mode === "password" ? { email, password } : { email };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data: LoginResponse = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (mode === "password") {
        localStorage.setItem("magicAuthToken", data.token || "");
        router.push("/client/dashboard");
      } else {
        setMessage("✅ Magic link sent! Check your email.");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0B0121] min-h-screen w-full flex items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-md bg-transparent border-2 border-white rounded-3xl shadow-[0_2px_10px_rgba(138,43,226,0.7)] flex flex-col items-center p-6 relative">
        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-[#0B0121]/80 rounded-3xl flex items-center justify-center z-10">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        )}

        <h2 className="text-2xl font-extrabold text-white mb-4 text-center">Login to MagicAuth</h2>

        {error && (
          <div className="mb-4 w-full bg-red-900/20 border-l-4 border-red-500 p-3 rounded-r text-red-300 text-sm">
            {error}
          </div>
        )}

        {message && (
          <div className="mb-4 w-full bg-green-900/20 border-l-4 border-green-500 p-3 rounded-r text-green-300 text-sm">
            {message}
          </div>
        )}

        <form onSubmit={handleLogin} className="w-full space-y-4">
          <div>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full px-4 py-3 bg-[#0B0121]/70 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={loading}
            />
          </div>

          {mode === "password" && (
            <div>
              <input
                type="password"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full px-4 py-3 bg-[#0B0121]/70 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={loading}
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg text-sm font-medium text-[#0B0121] bg-white hover:bg-transparent hover:text-white hover:border-white hover:border-2 transition-all ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 text-[#0B0121]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : mode === "password" ? "Login with Password" : "Send Magic Link"}
          </button>

          <div className="flex flex-col sm:flex-row gap-2 justify-center mt-4">
            <button
              type="button"
              onClick={() => setMode("password")}
              disabled={loading}
              className={`px-4 py-2 rounded-lg text-sm ${
                mode === "password" 
                  ? "bg-white text-[#0B0121] font-medium" 
                  : "bg-transparent text-white border border-white/30"
              } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Password Login
            </button>
            <button
              type="button"
              onClick={() => setMode("magic")}
              disabled={loading}
              className={`px-4 py-2 rounded-lg text-sm ${
                mode === "magic" 
                  ? "bg-white text-[#0B0121] font-medium" 
                  : "bg-transparent text-white border border-white/30"
              } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              Magic Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
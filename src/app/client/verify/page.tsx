"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface VerifyResponse {
  token?: string;
  message?: string;
  success?: boolean;
}

export default function ClientVerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("Verifying...");

  const verifyMagicLink = useCallback(async () => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token || !email) {
      setStatus("❌ Invalid or incomplete link.");
      return;
    }

    try {
      const res = await fetch("/api/client/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, email }),
      });

      const data: VerifyResponse = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("magicAuthToken", data.token);
        setStatus("✅ Verification successful! Redirecting...");
        setTimeout(() => {
          router.push("/client/dashboard");
        }, 1500);
      } else {
        setStatus(`❌ ${data.message || "Invalid or expired link"}`);
      }
    } catch (error) {
      console.error("Verification error:", error);
      setStatus("❌ Something went wrong. Please try again.");
    }
  }, [searchParams, router]);

  useEffect(() => {
    verifyMagicLink();
  }, [verifyMagicLink]);

  return (
    <div className="bg-[#0B0121] min-h-screen w-full flex items-center justify-center p-4 pt-24 text-white text-center">
      <div className="w-[90%] sm:w-[500px] border-2 border-white rounded-[30px] p-6 shadow-[0_2px_10px_rgba(138,43,226,0.7)]">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">🔐 Magic Link Login</h2>
        <p className={`text-lg ${status.includes("Verifying") ? "animate-pulse" : ""}`}>
          {status}
        </p>
        {status.startsWith("❌") && (
          <button
            onClick={() => router.push("/client/login")}
            className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            Return to Login
          </button>
        )}
      </div>
    </div>
  );
}
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, Suspense } from "react";

function DashboardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  useEffect(() => {
    if (!token) {
      router.push("/auth/login");
    }
  }, [token, router]);

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#0B0121]">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0121] text-white p-10">
      <h1 className="text-3xl font-bold">Welcome to the Dashboard 🚀</h1>
      <p className="mt-4">✅ Your token: <strong>{token}</strong></p>
      <p className="mt-2">📧 Logged in as: <strong>{email}</strong></p>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-[#0B0121]">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}
"use client";

import React from "react";

export default function DocumentationPage() {
  return (
    <div className="min-h-screen w-full bg-[#0B0121] text-white py-16 px-6 md:px-10 lg:px-20">
      <div className="max-w-5xl mx-auto pt-10">
        <h1 className="text-4xl font-bold mb-10 text-center text-white">
          📚 MagicAuth API Documentation
        </h1>

        {/* What is MagicAuth */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-3">🔐 What is MagicAuth?</h2>
          <p className="text-gray-300 leading-relaxed">
            MagicAuth is a passwordless authentication API that allows users to log in via
            magic links sent to their email. It&apos;s fast, secure, and removes the hassle of managing passwords.
          </p>
        </section>

        {/* Getting Started */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-3">🚀 Getting Started</h2>
          <p className="text-gray-300 mb-2">To send a login magic link:</p>
          <pre className="bg-black/40 p-4 rounded-md text-sm text-green-200 overflow-auto">
            POST /api/auth/send-link
            {"\n"}Content-Type: application/json
            {"\n"}Body:
            {"\n"}{"{\n  \"email\": \"user@example.com\"\n}"}
          </pre>
        </section>

        {/* Verifying Token */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-3">✅ Verifying the Token</h2>
          <pre className="bg-black/40 p-4 rounded-md text-sm text-green-200 overflow-auto">
            POST /api/auth/verify
            {"\n"}Body:
            {"\n"}{"{\n  \"email\": \"user@example.com\",\n  \"token\": \"12345\"\n}"}
          </pre>
          <p className="text-gray-300 mt-2">
            You&apos;ll receive a JWT token. Store it in localStorage or cookie to manage sessions.
          </p>
        </section>

        {/* Advanced Options */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-3">⚙️ Advanced Options</h2>
          <ul className="list-disc pl-6 text-gray-300 space-y-2">
            <li>Custom SMTP setup per user</li>
            <li>Use your own MongoDB for login data</li>
            <li>Token expiry default is 10 minutes</li>
            <li>JWT expiry default is 1 hour (configurable)</li>
            <li>Simple integration in any frontend (React, Vue, etc.)</li>
          </ul>
        </section>

        {/* Example Code */}
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-3">🛠 Example Frontend Call</h2>
          <pre className="bg-black/40 p-4 rounded-md text-sm text-green-200 overflow-auto">
{`const res = await fetch("/api/auth/send-link", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email }),
});`}
          </pre>
        </section>

        <p className="text-sm text-center text-gray-500 mt-10">
          © {new Date().getFullYear()} MagicAuth – Simplifying secure login 🔒
        </p>
      </div>
    </div>
  );
}
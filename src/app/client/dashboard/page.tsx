"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

interface SmtpSettings {
  host: string;
  port: string;
  user: string;
  pass: string;
}

interface SettingsResponse {
  apiKey?: string;
  smtp?: SmtpSettings | null;
  dbUri?: string;
  domain?: string;
  message?: string;
}

export default function Dashboard() {
  const [apiKey, setApiKey] = useState<string>("");
  const [smtp, setSmtp] = useState<SmtpSettings | null>(null);
  const [dbUri, setDbUri] = useState<string>("");
  const [domain, setDomain] = useState<string>(""); // New domain state
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showSmtp, setShowSmtp] = useState<boolean>(false);
  const router = useRouter();

  const token = typeof window !== "undefined" ? localStorage.getItem("magicAuthToken") : null;

  const fetchUserSettings = useCallback(async () => {
    try {
      if (!token) return;
      
      const res = await fetch("/api/client/settings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data: SettingsResponse = await res.json();

      if (res.ok) {
        setApiKey(data.apiKey || "");
        setSmtp(data.smtp || null);
        setShowSmtp(!!data.smtp?.host);
        setDbUri(data.dbUri || "");
        setDomain(data.domain || ""); // Initialize domain from API
      } else {
        setError(data.message || "Failed to fetch settings");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      router.push("/client/login");
    } else {
      fetchUserSettings();
    }
  }, [router, token, fetchUserSettings]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      if (!token) return;

      // Validate domain format
      if (domain && !/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i.test(domain)) {
        throw new Error("Please enter a valid domain (e.g., example.com)");
      }

      const res = await fetch("/api/client/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          smtp: showSmtp ? smtp : null, 
          dbUri,
          domain // Include domain in the payload
        }),
      });

      const data: SettingsResponse = await res.json();

      if (res.ok) {
        setMessage("✅ Settings updated successfully");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setError(data.message || "Update failed");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Update failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSmtp = () => {
    setShowSmtp(!showSmtp);
    if (!showSmtp && !smtp) {
      setSmtp({
        host: "",
        port: "",
        user: "",
        pass: ""
      });
    }
  };

  if (isLoading) {
    return (
      <div className="bg-[#0B0121] min-h-screen w-full flex items-center justify-center p-4 pt-24">
        <div className="text-white">Loading your settings...</div>
      </div>
    );
  }

  const emptySmtp = { host: "", port: "", user: "", pass: "" };

  return (
    <div className="bg-[#0B0121] min-h-screen w-full flex items-center justify-center p-4 pt-24">
      <div className="w-[90%] sm:w-[700px] bg-transparent border-2 border-white rounded-[30px] shadow-[0_2px_12px_rgba(138,43,226,0.7)] p-6 text-white">
        <h2 className="text-3xl font-extrabold text-center mb-6">Dashboard Settings</h2>

        <div className="mb-6">
          <label className="block text-sm mb-1">Your API Key</label>
          <input
            type="text"
            readOnly
            value={apiKey}
            className="w-full px-4 py-2 bg-gray-800 border border-white/30 rounded-lg text-white"
          />
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          {/* New Domain Input Section */}
          <div>
            <h3 className="text-lg font-semibold text-purple-400 mb-2">Website Domain</h3>
            <label className="block text-sm mb-1">Your Website Domain (for magic links)</label>
            <input
              type="text"
              placeholder="example.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-white/30 rounded-lg text-white"
            />
            <p className="text-xs text-gray-400 mt-1">
              This domain will be used for authentication redirects (e.g., https://{domain || 'example.com'}/auth/callback)
            </p>
          </div>

          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-purple-400">SMTP Settings</h3>
            <button
              type="button"
              onClick={toggleSmtp}
              className="text-sm text-purple-300 hover:text-white"
            >
              {showSmtp ? "Remove SMTP" : "Add SMTP"}
            </button>
          </div>

          {/* Rest of your existing form fields... */}
          {showSmtp && (
            <>
              <div>
                <label className="block text-sm mb-1">SMTP Host</label>
                <input
                  type="text"
                  placeholder="smtp.example.com"
                  value={smtp?.host || ""}
                  onChange={(e) => setSmtp({ ...(smtp || emptySmtp), host: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-white/30 rounded-lg text-white"
                />
              </div>

              {/* Other SMTP fields... */}
            </>
          )}

          <h3 className="text-lg font-semibold text-purple-400">MongoDB URI (Optional)</h3>
          <div>
            <label className="block text-sm mb-1">MongoDB Connection String</label>
            <input
              type="text"
              placeholder="mongodb+srv://user:pass@cluster.mongodb.net/db"
              value={dbUri}
              onChange={(e) => setDbUri(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 border border-white/30 rounded-lg text-white"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 mt-4 border rounded-lg text-sm font-medium text-[#0B0121] ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-transparent hover:text-white hover:border-white hover:shadow-[0_2px_10px_rgba(138,43,226,0.7)]"
            }`}
          >
            {isLoading ? "Saving..." : "Save Settings"}
          </button>

          {message && <p className="text-green-400 mt-2 text-center">{message}</p>}
          {error && <p className="text-red-400 mt-2 text-center">{error}</p>}
        </form>
      </div>
    </div>
  );
}
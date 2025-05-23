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
  message?: string;
}

export default function Dashboard() {
  const [apiKey, setApiKey] = useState<string>("");
  const [smtp, setSmtp] = useState<SmtpSettings | null>(null);
  const [dbUri, setDbUri] = useState<string>("");
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

      const res = await fetch("/api/client/settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          smtp: showSmtp ? smtp : null, 
          dbUri 
        }),
      });

      const data: SettingsResponse = await res.json();

      if (res.ok) {
        setMessage("✅ Settings updated successfully");
        setTimeout(() => setMessage(""), 3000);
      } else {
        setError(data.message || "Update failed");
      }
    } catch {
      setError("Update failed. Please try again.");
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

              <div>
                <label className="block text-sm mb-1">SMTP Port</label>
                <input
                  type="number"
                  placeholder="587"
                  value={smtp?.port || ""}
                  onChange={(e) => setSmtp({ ...(smtp || emptySmtp), port: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-white/30 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">SMTP Username</label>
                <input
                  type="text"
                  placeholder="your@email.com"
                  value={smtp?.user || ""}
                  onChange={(e) => setSmtp({ ...(smtp || emptySmtp), user: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-white/30 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm mb-1">SMTP Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={smtp?.pass || ""}
                  onChange={(e) => setSmtp({ ...(smtp || emptySmtp), pass: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-800 border border-white/30 rounded-lg text-white"
                />
              </div>
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
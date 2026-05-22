"use client";

import { useState } from "react";

export default function Home() {
  const [skills, setSkills] = useState("");
  const [clientBio, setClientBio] = useState("");
  const [generatedDM, setGeneratedDM] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!skills || !clientBio) {
      alert("Please fill both boxes bro!");
      return;
    }

    setLoading(true);
    setCopied(false);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skills, clientBio }),
      });

      const data = await response.json();
      if (data.text) {
        setGeneratedDM(data.text);
      } else {
        setGeneratedDM("Something went wrong. Try again!");
      }
    } catch (error) {
      console.error(error);
      setGeneratedDM("Error generating DM.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedDM);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // 2 second baad button wapas normal ho jayega
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center py-12 px-4">
      {/* ChatGPT Banner/Headline Upgrade for Agencies */}
      <div className="text-center max-w-2xl mb-12">
        <span className="bg-blue-600/20 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full border border-blue-500/30">
          HookDM AI for Agencies 🚀
        </span>
        <h1 className="text-4xl font-bold mt-4 tracking-tight sm:text-5xl bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Turn Cold Outreach Into Warm Conversations
        </h1>
        <p className="mt-4 text-gray-400 text-lg">
          Stop wasting hours writing robotic messages. Generate ultra-personalized, human-like cold DMs that actually get replies for your agency.
        </p>
      </div>

      {/* Input Form Section */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#1e293b] p-8 rounded-2xl border border-slate-700 shadow-xl">
        <div className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Your Agency Service / Offer
            </label>
            <textarea
              className="w-full h-32 bg-[#0f172a] border border-slate-600 rounded-xl p-4 text-slate-200 focus:outline-none focus:border-blue-500 transition"
              placeholder="e.g., We edit high-retention short-form reels for fitness coaches to help them get clients..."
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Prospect (Client) Bio / Info
            </label>
            <textarea
              className="w-full h-32 bg-[#0f172a] border border-slate-600 rounded-xl p-4 text-slate-200 focus:outline-none focus:border-blue-500 transition"
              placeholder="e.g., An agency founder from New York who posts daily about B2B sales but has low-quality video edits..."
              value={clientBio}
              onChange={(e) => setClientBio(e.target.value)}
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition shadow-lg shadow-blue-600/20 disabled:opacity-50"
          >
            {loading ? "AI is thinking..." : "Generate Human-Like DM ✨"}
          </button>
        </div>

        {/* Output Section with Copy Button */}
        <div className="flex flex-col bg-[#0f172a] rounded-xl border border-slate-700 p-6 relative min-h-[300px]">
          <h3 className="text-sm font-medium text-slate-400 mb-4 border-b border-slate-800 pb-2">
            Generated Content
          </h3>
          
          <div className="flex-1 text-slate-200 whitespace-pre-wrap text-base leading-relaxed">
            {generatedDM || (
              <span className="text-slate-500 italic">
                Your high-converting, human-written cold DM will appear here...
              </span>
            )}
          </div>

          {/* Copy Option Provided on Friend's Feedback */}
          {generatedDM && (
            <button
              onClick={handleCopy}
              className={`mt-4 w-full py-2 px-4 rounded-lg font-medium border transition ${
                copied
                  ? "bg-emerald-600/20 border-emerald-500 text-emerald-400"
                  : "bg-slate-800 hover:bg-slate-700 border-slate-600 text-slate-300"
              }`}
            >
              {copied ? "Copied to Clipboard! ✓" : "Copy DM 📋"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
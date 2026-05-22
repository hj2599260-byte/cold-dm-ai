"use client";

import { useState } from "react";

export default function Home() {
  const [offer, setOffer] = useState("");
  const [clientBio, setClientBio] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!offer || !clientBio) return;
    setLoading(true);
    setOutput("");
    setCopied(false);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Yahan exact sahi names (offer, clientBio) backend ko bhej rahe hain
        body: JSON.stringify({ offer, clientBio }),
      });

      const data = await response.json();

      if (response.ok && data.text) {
        setOutput(data.text);
      } else {
        setOutput("Something went wrong. Try again!");
      }
    } catch (error) {
      console.error(error);
      setOutput("Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full text-center mb-10">
        <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent mb-4">
          Turn Cold Outreach Into Warm Conversations
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Stop wasting hours writing robotic messages. Generate ultra-personalized, human-like cold DMs that actually get replies for your agency.
        </p>
      </div>

      <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8 bg-[#1e293b] p-8 rounded-2xl shadow-xl border border-slate-7xl">
        {/* Left Side: Inputs */}
        <div className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Your Agency Service / Offer
            </label>
            <textarea
              className="w-full h-32 p-4 bg-[#0f172a] border border-slate-7xl rounded-xl focus:ring-2 focus:ring-cyan-500 text-white placeholder-slate-500 resize-none"
              placeholder="e.g., We edit high-retention short-form reels for fitness coaches to help them get clients..."
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Prospect (Client) Bio / Info
            </label>
            <textarea
              className="w-full h-32 p-4 bg-[#0f172a] border border-slate-7xl rounded-xl focus:ring-2 focus:ring-cyan-500 text-white placeholder-slate-500 resize-none"
              placeholder="e.g., A gym owner in Delhi who wants more members but his Instagram videos have very bad editing..."
              value={clientBio}
              onChange={(e) => setClientBio(e.target.value)}
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || !offer || !clientBio}
            className="w-full py-4 bg-blue-600 hover:bg-blue-7xl disabled:bg-slate-700 disabled:cursor-not-allowed font-bold rounded-xl transition duration-200 shadow-lg shadow-blue-500/20"
          >
            {loading ? "Generating..." : "Generate Human-Like DM ✨"}
          </button>
        </div>

        {/* Right Side: Output */}
        <div className="bg-[#0f172a] border border-slate-7xl rounded-xl p-6 flex flex-col justify-between h-full min-h-[350px]">
          <div>
            <h3 className="text-sm font-medium text-slate-400 border-b border-slate-800 pb-2 mb-4">
              Generated Content
            </h3>
            <div className="text-slate-200 whitespace-pre-wrap text-base leading-relaxed">
              {output || (
                <span className="text-slate-600 italic">
                  Your high-converting, human-written cold DM will appear here...
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleCopy}
            disabled={!output || output.includes("Something went wrong")}
            className="w-full mt-6 py-3 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-sm font-medium rounded-xl border border-slate-700 transition"
          >
            {copied ? "Copied! ✅" : "Copy DM 📋"}
          </button>
        </div>
      </div>
    </main>
  );
}
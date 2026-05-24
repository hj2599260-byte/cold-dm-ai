'use client';

import { useState } from 'react';

export default function Home() {
  const [offer, setOffer] = useState('');
  const [clientBio, setClientBio] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!offer || !clientBio) return;

    setLoading(true);
    setResult('');

    try {
      // Yeh direct aapke backend api/generate/route.ts ko call karega
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ offer, clientBio }),
      });

      const data = await response.json();
      if (data.text) {
        setResult(data.text);
      } else if (data.error) {
        setResult(`Error: ${data.error}`);
      } else {
        setResult('Something went wrong.');
      }
    } catch (err: any) {
      setResult(`System Error: ${err.message || 'Failed to fetch'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B132B] text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#4CC9F0] mb-4">
          Turn Cold Outreach Into Warm Conversations
        </h1>
        <p className="text-gray-400 text-lg">
          Stop wasting hours writing robotic messages. Generate ultra-personalized, human-like cold DMs that actually get replies for your agency.
        </p>
      </div>

      <div className="max-w-4xl w-full bg-[#1C2541] rounded-2xl p-8 shadow-xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Side: Inputs */}
        <form onSubmit={handleGenerate} className="flex flex-col gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Your Agency Service / Offer
            </label>
            <textarea
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
              placeholder="e.g., We edit high-retention short-form reels for fitness coaches..."
              className="w-full h-32 bg-[#3A506B] text-white rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#4CC9F0] placeholder-gray-400 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Prospect (Client) Bio / Info
            </label>
            <textarea
              value={clientBio}
              onChange={(e) => setClientBio(e.target.value)}
              placeholder="e.g., A premium gym owner in Mumbai who posts daily but has low engagement..."
              className="w-full h-32 bg-[#3A506B] text-white rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#4CC9F0] placeholder-gray-400 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-[#3F37C9] hover:bg-[#4361EE] text-white font-bold rounded-xl transition-all duration-200 shadow-lg disabled:opacity-50"
          >
            {loading ? 'Generating...' : 'Generate Human-Like DM ✨'}
          </button>
        </form>

        {/* Right Side: Output */}
        <div className="flex flex-col">
          <label className="block text-sm font-semibold text-gray-300 mb-2">
            Generated Content
          </label>
          <div className="w-full h-full min-h-[300px] bg-[#0B132B] border border-[#3A506B] rounded-xl p-6 text-gray-200 overflow-y-auto whitespace-pre-wrap">
            {result || (
              <span className="text-gray-500 italic">
                Your personalized cold DM will appear here...
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
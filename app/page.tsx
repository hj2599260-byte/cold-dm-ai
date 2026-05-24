'use client';

import { useState, useEffect } from 'react';

interface LeadHistory {
  id: string;
  offer: string;
  clientBio: string;
  dm: string;
  date: string;
}

export default function Home() {
  const [offer, setOffer] = useState('');
  const [clientBio, setClientBio] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<LeadHistory[]>([]);

  // Page load hote hi purani history local storage se nikalna
  useEffect(() => {
    const savedHistory = localStorage.getItem('cold_dm_history');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!offer || !clientBio) return;

    setLoading(true);
    setResult('');

    try {
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

        // Nayi lead ko history mein top par add karna
        const newLead: LeadHistory = {
          id: Date.now().toString(),
          offer,
          clientBio,
          dm: data.text,
          date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        const updatedHistory = [newLead, ...history];
        setHistory(updatedHistory);
        localStorage.setItem('cold_dm_history', JSON.stringify(updatedHistory));
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

  // History clear karne ke liye function
  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('cold_dm_history');
  };

  return (
    <div className="min-h-screen bg-[#0B132B] text-white flex flex-col items-center p-6 selection:bg-[#4CC9F0] selection:text-[#0B132B]">
      {/* Header */}
      <div className="max-w-6xl w-full text-center mt-8 mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#4CC9F0] mb-4 tracking-tight">
          Turn Cold Outreach Into Warm Conversations
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Generate ultra-personalized, human-like cold DMs that actually get replies for your agency.
        </p>
      </div>

      {/* Main Workspace */}
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-12">
        
        {/* Left Column: Inputs (Form) */}
        <div className="lg:col-span-2 bg-[#1C2541] rounded-2xl p-6 shadow-2xl border border-[#3A506B]/30 flex flex-col gap-6">
          <form onSubmit={handleGenerate} className="flex flex-col gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                Your Agency Service / Offer
              </label>
              <textarea
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
                placeholder="e.g., We edit high-retention short-form reels for fitness coaches..."
                className="w-full h-28 bg-[#3A506B] text-white rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#4CC9F0] placeholder-gray-400 resize-none transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                Prospect (Client) Bio / Info
              </label>
              <textarea
                value={clientBio}
                onChange={(e) => setClientBio(e.target.value)}
                placeholder="e.g., A premium gym owner in Mumbai who posts daily but has low engagement..."
                className="w-full h-28 bg-[#3A506B] text-white rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-[#4CC9F0] placeholder-gray-400 resize-none transition-all duration-200"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#3F37C9] hover:bg-[#4361EE] text-white font-bold rounded-xl transition-all duration-200 shadow-lg disabled:opacity-50 flex items-center justify-center gap-2 text-lg"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  AI writing your DM...
                </>
              ) : (
                'Generate Human-Like DM ✨'
              )}
            </button>
          </form>

          {/* Current Output Box */}
          <div className="flex flex-col border-t border-[#3A506B]/50 pt-4">
            <label className="block text-sm font-semibold text-gray-300 mb-2 uppercase tracking-wider">
              Latest Generated Response
            </label>
            <div className="w-full min-h-[150px] bg-[#0B132B] border border-[#3A506B]/50 rounded-xl p-5 text-gray-200 overflow-y-auto whitespace-pre-wrap">
              {result || (
                <span className="text-gray-500 italic">
                  Click generate to create your personalized outreach message here...
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: History Dashboard */}
        <div className="bg-[#1C2541] rounded-2xl p-6 shadow-2xl border border-[#3A506B]/30 h-[630px] flex flex-col">
          <div className="flex items-center justify-between mb-4 border-b border-[#3A506B]/50 pb-3">
            <h2 className="text-xl font-bold text-[#4CC9F0]">Leads Dashboard</h2>
            {history.length > 0 && (
              <button 
                onClick={clearHistory}
                className="text-xs text-red-400 hover:text-red-300 transition-all font-medium"
              >
                Clear All
              </button>
            )}
          </div>

          {/* History Scroll Area */}
          <div className="flex-1 overflow-y-auto flex flex-col gap-4 pr-1 custom-scrollbar">
            {history.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 italic p-4">
                <p>No saved leads yet.</p>
                <p className="text-xs mt-1">Generated emails will be saved here automatically.</p>
              </div>
            ) : (
              history.map((item) => (
                <div key={item.id} className="bg-[#0B132B] border border-[#3A506B]/30 rounded-xl p-4 flex flex-col gap-2 hover:border-[#4CC9F0]/40 transition-all duration-200">
                  <div className="flex justify-between items-center text-xs text-gray-400 font-medium">
                    <span className="bg-[#3A506B]/50 px-2 py-0.5 rounded text-[#4CC9F0]">Lead Save</span>
                    <span>{item.date}</span>
                  </div>
                  <p className="text-xs text-gray-300 line-clamp-1"><strong>Offer:</strong> {item.offer}</p>
                  <p className="text-xs text-gray-300 line-clamp-1"><strong>Client:</strong> {item.clientBio}</p>
                  <div className="mt-1 p-2.5 bg-[#1C2541] rounded-lg text-xs border border-[#3A506B]/20 whitespace-pre-wrap text-gray-200 font-serif">
                    {item.dm}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
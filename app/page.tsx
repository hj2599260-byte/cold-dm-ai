'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [mySkill, setMySkill] = useState<string>('');
  const [clientBio, setClientBio] = useState<string>('');
  const [generatedDM, setGeneratedDM] = useState<string>('');
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const generateDM = async (e: any) => {
    e.preventDefault();
    if (!mySkill || !clientBio) return alert("Please fill all fields!");
    setLoading(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mySkill, clientBio }),
      });

      const data = await response.json();
      if (data.error) {
        alert(data.error);
      } else if (data.text) {
        setGeneratedDM(data.text);
        setHistory((prev) => [data.text, ...prev]);
      }
    } catch (error) {
      console.error("Frontend Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Top Navigation / About Link */}
      <div className="max-w-4xl mx-auto flex justify-end mb-4">
        <Link 
          href="/about" 
          className="text-sm font-medium text-cyan-400 hover:text-cyan-300 border border-cyan-500/30 rounded-full px-4 py-1.5 bg-cyan-950/30 transition"
        >
          About this tool 💡
        </Link>
      </div>

      <main className="max-w-4xl mx-auto space-y-8">
        <section className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            Cold DM AI Generator 🚀
          </h1>
          <p className="text-gray-400">Generate high-converting cold DMs using AI</p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Form Section */}
          <form onSubmit={generateDM} className="bg-gray-800 p-6 rounded-xl shadow-xl space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-cyan-400">Your Skills / Offer</label>
              <textarea
                value={mySkill}
                onChange={(e: any) => setMySkill(e.target.value)}
                placeholder="e.g., I build Next.js SaaS apps and design landing pages..."
                className="w-full bg-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 h-28"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-cyan-400">Client Info / Website Bio</label>
              <textarea
                value={clientBio}
                onChange={(e: any) => setClientBio(e.target.value)}
                placeholder="e.g., A real estate agency looking to get more online leads..."
                className="w-full bg-gray-700 rounded-lg p-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 h-28"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 font-bold p-3 rounded-lg transition dynamic-shadow disabled:opacity-50"
            >
              {loading ? 'Generating Magic...' : 'Generate Cold DM ✨'}
            </button>
          </form>

          {/* Output Section */}
          <div className="space-y-4">
            <div className="bg-gray-800 p-6 rounded-xl shadow-xl h-full flex flex-col">
              <h2 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                Generated Content
              </h2>
              {generatedDM ? (
                <div className="bg-gray-700 p-4 rounded-lg flex-1 overflow-auto whitespace-pre-wrap text-gray-200">
                  {generatedDM}
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-700 rounded-lg p-4">
                  Your AI generated DM will appear here...
                </div>
              )}
            </div>
          </div>
        </div>

        {/* History Section */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-xl space-y-4">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            History
          </h2>
          {history.length === 0 ? (
            <p className="text-gray-500">No history yet.</p>
          ) : (
            <div className="space-y-4">
              {history.map((item: any, index: number) => (
                <div key={index} className="bg-gray-700 p-4 rounded-lg whitespace-pre-wrap text-gray-200">
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
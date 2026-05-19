"use client";
import { useState } from "react";

export default function Home() {
  const [mySkill, setMySkill] = useState("");
  const [clientBio, setClientBio] = useState("");
  const [generatedDM, setGeneratedDM] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);

  const generateDM = async (e: any) => {
    e.preventDefault();
    if (!mySkill || !clientBio) return alert("Please fill both fields!");

    setLoading(true);
    setGeneratedDM("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mySkill, clientBio }),
      });

      const data = await response.json();

      if (data.error) {
        alert("Error: " + data.error);
      } else if (data.text) {
        setGeneratedDM(data.text);
        setHistory((prev) => [data.text, ...prev]);
      }
    } catch (error) {
      console.error("Frontend Error:", error);
      alert("Something went wrong while connecting to AI!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6 flex flex-col items-center">
      {/* Header */}
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-blue-500 mb-2">⚡ ColdDM AI</h1>
        <p className="text-gray-400">Generate personalized killer cold DMs in seconds using AI</p>
      </header>

      {/* Main Grid Setup */}
      <main className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Side: Input Form */}
        <section className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
          <h2 className="text-xl font-bold mb-4 text-blue-400">Your Details & Client Info</h2>
          <form onSubmit={generateDM} className="space-y-5">
            
            {/* Input 1: Freelancer Skill */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Your Role / Skill</label>
              <input
                type="text"
                value={mySkill}
                onChange={(e) => setMySkill(e.target.value)}
                placeholder="e.g., Video Editor, Next.js Developer"
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 text-white"
              />
            </div>

            {/* Input 2: Client Bio / Post */}
            <div>
              <label className="block text-sm font-medium mb-1 text-gray-300">Client's Bio or Post Content</label>
              <textarea
                value={clientBio}
                onChange={(e) => setClientBio(e.target.value)}
                placeholder="Paste their LinkedIn bio, Instagram profile info, or any recent post here..."
                rows={6}
                className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500 text-white resize-none"
              />
            </div>

            {/* Magic Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50"
            >
              {loading ? "🔄 AI is writing a killer DM..." : "🚀 Generate Killer DM"}
            </button>
          </form>
        </section>

        {/* Right Side: Output & History */}
        <section className="space-y-6">
          
          {/* Output Box */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 min-h-[250px] flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-bold mb-3 text-green-400">Generated Cold DM</h2>
              {generatedDM ? (
                <pre className="text-gray-200 whitespace-pre-wrap bg-gray-900 p-4 rounded-lg border border-gray-700 font-sans">{generatedDM}</pre>
              ) : (
                <p className="text-gray-500 italic text-center pt-10">Your personalized AI message will appear here...</p>
              )}
            </div>
            
            {generatedDM && (
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedDM);
                  alert("Copied to clipboard!");
                }}
                className="mt-4 w-full bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                📋 Copy Message
              </button>
            )}
          </div>

          {/* History List */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
            <h2 className="text-lg font-bold mb-3 text-purple-400">Recent History</h2>
            {history.length === 0 ? (
              <p className="text-gray-500 text-sm italic">No history yet.</p>
            ) : (
              <div className="space-y-3 max-h-[200px] overflow-y-auto pr-2">
                {history.map((item, index) => (
                  <div key={index} className="bg-gray-900 p-3 rounded-lg text-xs text-gray-400 border border-gray-800 truncate">
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

        </section>
      </main>
    </div>
  );
}
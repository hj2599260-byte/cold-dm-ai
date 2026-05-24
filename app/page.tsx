"use client";
import { useState } from "react";

export default function Home() {
  const [offer, setOffer] = useState<string>("");
  const [clientBio, setClientBio] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleGenerate = async () => {
    if (!offer || !clientBio) {
      alert("Please fill both fields!");
      return;
    }

    setLoading(true);
    setOutput("Generating your Cold DM... Please wait... ⏳");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offer, clientBio }),
      });

      const data = await res.json();
      
      if (data.text) {
        setOutput(data.text);
      } else if (data.error) {
        setOutput(`Backend Error: ${data.error}`);
      } else {
        setOutput("Unexpected Response Format from server.");
      }
    } catch (err: any) {
      setOutput(`Frontend Network Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#0f172a", minHeight: "100vh", color: "#f8fafc", padding: "40px", fontFamily: "sans-serif" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        
        <h1 style={{ textAlign: "center", fontSize: "42px", fontWeight: "bold", color: "#22d3ee", marginBottom: "10px" }}>
          Turn Cold Outreach Into Warm Conversations
        </h1>
        <p style={{ textAlign: "center", color: "#94a3b8", marginBottom: "40px", fontSize: "16px" }}>
          Stop wasting hours writing robotic messages. Generate ultra-personalized, human-like cold DMs that actually get replies for your agency.
        </p>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px", backgroundColor: "#1e293b", padding: "30px", borderRadius: "12px", border: "1px solid #334155" }}>
          
          {/* Left Inputs */}
          <div>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px", color: "#94a3b8" }}>Your Agency Service / Offer</label>
              <textarea 
                rows={4} 
                style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #475569", backgroundColor: "#0f172a", color: "#f8fafc", fontFamily: "sans-serif", fontSize: "14px" }}
                placeholder="e.g., We edit high-retention short-form reels..."
                value={offer}
                onChange={(e) => setOffer(e.target.value)}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px", color: "#94a3b8" }}>Prospect (Client) Bio / Info</label>
              <textarea 
                rows={4} 
                style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #475569", backgroundColor: "#0f172a", color: "#f8fafc", fontFamily: "sans-serif", fontSize: "14px" }}
                placeholder="e.g., A gym owner in Delhi who wants more members..."
                value={clientBio}
                onChange={(e) => setClientBio(e.target.value)}
              />
            </div>

            <button 
              onClick={handleGenerate}
              disabled={loading}
              style={{ width: "100%", padding: "14px", backgroundColor: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", fontSize: "16px", cursor: "pointer", fontWeight: "bold", boxShadow: "0 4px 6px -1px rgba(0,0,0,0.5)" }}
            >
              {loading ? "Processing..." : "Generate Human-Like DM ✨"}
            </button>
          </div>

          {/* Right Output */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "8px", color: "#94a3b8" }}>Generated Content</label>
            <div style={{ flex: 1, width: "100%", minHeight: "260px", padding: "15px", backgroundColor: "#0f172a", borderRadius: "8px", border: "1px solid #475569", overflowY: "auto", whiteSpace: "pre-wrap", color: "#e2e8f0", fontSize: "14px" }}>
              {output || "Your generated DM or system response will appear here..."}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
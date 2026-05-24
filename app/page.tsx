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
    <div style={{ padding: "40px", fontFamily: "sans-serif", maxWidth: "900px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Cold DM AI Generator 🚀</h1>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
        <div>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Your Agency Offer / Service:</label>
            <textarea 
              rows={4} 
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", fontFamily: "sans-serif" }}
              placeholder="e.g., We edit high-retention short-form reels..."
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Prospect (Client) Bio / Info:</label>
            <textarea 
              rows={4} 
              style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc", fontFamily: "sans-serif" }}
              placeholder="e.g., A gym owner in Delhi who wants more members..."
              value={clientBio}
              onChange={(e) => setClientBio(e.target.value)}
            />
          </div>

          <button 
            onClick={handleGenerate}
            disabled={loading}
            style={{ width: "100%", padding: "12px", background: "#0070f3", color: "#fff", border: "none", borderRadius: "6px", fontSize: "16px", cursor: "pointer", fontWeight: "bold" }}
          >
            {loading ? "Processing..." : "Generate Human-Like DM ✨"}
          </button>
        </div>

        <div>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>AI Generated Cold DM / System Response:</label>
          <div style={{ width: "100%", height: "270px", padding: "15px", background: "#f5f5f5", borderRadius: "6px", border: "1px solid #ccc", overflowY: "auto", whiteSpace: "pre-wrap" }}>
            {output || "Your generated DM or any error system codes will appear here directly..."}
          </div>
        </div>
      </div>
    </div>
  );
}
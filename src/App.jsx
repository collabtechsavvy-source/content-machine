import { useState } from "react";

const SYSTEM_PROMPT = `Tu ek expert Instagram content writer hai jo Tech aur Cybersecurity niche ke liye kaam karta hai.

STYLE RULES:
- Language: Hinglish (Hindi + English mix) — natural, conversational
- Audience: Intermediate — already knows basics, thoda technical samajhta hai
- Tone: Scary / Eye-opening / Awareness — "yaar ye jaanta tha tu?" wali feeling
- Platform: Instagram Reels
- Always use short punchy sentences
- Use emojis strategically (not too many)
- Make the viewer feel: "Oh sh*t, I didn't know this!"

CAPTION FORMAT:
- Hook line (scary/shocking)
- 3-4 lines of value
- CTA (Save karo, Share karo, Follow karo)
- 5-7 relevant hashtags in Hinglish/English

REEL SCRIPT FORMAT:
Hook (0-3 sec): [shocking one-liner]
Problem (3-10 sec): [relatable situation]
Body (10-40 sec): [main info in steps]
CTA (40-60 sec): [action for viewer]

CONTENT IDEAS FORMAT:
Give 5 unique reel ideas with:
- Title
- Hook line
- Why it'll work

Always write as if YOU are the creator — first person, personal tone.`;

const TABS = ["💡 Content Ideas", "🎬 Reel Script", "✍️ Caption"];

const TOPICS = [
  "WiFi Hacking","Password Security","Phishing Attacks","Dark Web",
  "Social Engineering","Phone Tracking","Data Breaches","Fake Apps",
  "VPN Myths","Camera/Mic Spying",
];

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [topic, setTopic] = useState("");
  const [customTopic, setCustomTopic] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const selectedTopic = topic === "custom" ? customTopic : topic;

  const generate = async () => {
    if (!selectedTopic.trim()) return;
    setLoading(true);
    setOutput("");

    const prompts = {
      0: `Mujhe 5 unique Instagram Reel ideas do about: "${selectedTopic}" — Tech/Cybersecurity niche ke liye. Each idea mein title, hook line, aur why it'll work dena.`,
      1: `Ek full Instagram Reel script likho about: "${selectedTopic}" — 60 seconds ka, scary/eye-opening tone mein.`,
      2: `Ek killer Instagram caption likho about: "${selectedTopic}" — hook, value, CTA aur hashtags ke saath.`,
    };

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: prompts[activeTab] }],
        }),
      });
      const data = await res.json();
      const text = data.content?.map((b) => b.text || "").join("") || "Error generating content.";
      setOutput(text);
    } catch {
      setOutput("⚠️ Error aa gaya. Dobara try karo.");
    }
    setLoading(false);
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      minHeight: "100vh", background: "#090d0f",
      fontFamily: "'Courier New', monospace", color: "#e0e0e0",
      padding: "0", position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,100,0.015) 2px, rgba(0,255,100,0.015) 4px)",
        pointerEvents: "none", zIndex: 10,
      }} />
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        backgroundImage: "linear-gradient(rgba(0,255,100,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,100,0.04) 1px, transparent 1px)",
        backgroundSize: "40px 40px", pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 720, margin: "0 auto", padding: "32px 20px" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{
            display: "inline-block", border: "1px solid #00ff64",
            padding: "4px 16px", fontSize: 11, color: "#00ff64",
            letterSpacing: 4, marginBottom: 16, textTransform: "uppercase",
          }}>● SYSTEM ONLINE</div>
          <h1 style={{
            fontSize: "clamp(26px, 5vw, 42px)", fontWeight: 900,
            margin: 0, color: "#fff", letterSpacing: -1,
          }}>
            <span style={{ color: "#00ff64" }}>&gt;_</span> CONTENT MACHINE
          </h1>
          <p style={{ color: "#4a5568", marginTop: 8, fontSize: 13, letterSpacing: 2 }}>
            TECH · CYBERSECURITY · HINGLISH · REELS
          </p>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 24, borderBottom: "1px solid #1a2a1a" }}>
          {TABS.map((tab, i) => (
            <button key={i} onClick={() => { setActiveTab(i); setOutput(""); }}
              style={{
                background: activeTab === i ? "#00ff64" : "transparent",
                color: activeTab === i ? "#000" : "#4a5568",
                border: "none", padding: "10px 18px", cursor: "pointer",
                fontFamily: "'Courier New', monospace", fontWeight: 700,
                fontSize: 13, borderRadius: "4px 4px 0 0", transition: "all 0.2s", letterSpacing: 1,
              }}>{tab}</button>
          ))}
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 11, color: "#00ff64", letterSpacing: 3, display: "block", marginBottom: 10 }}>
            &gt; SELECT TOPIC
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
            {TOPICS.map((t) => (
              <button key={t} onClick={() => { setTopic(t); setCustomTopic(""); }}
                style={{
                  background: topic === t ? "#00ff6420" : "transparent",
                  color: topic === t ? "#00ff64" : "#4a6454",
                  border: `1px solid ${topic === t ? "#00ff64" : "#1a2a1a"}`,
                  padding: "6px 14px", borderRadius: 4, cursor: "pointer",
                  fontSize: 12, fontFamily: "'Courier New', monospace",
                  transition: "all 0.15s", letterSpacing: 1,
                }}>{t}</button>
            ))}
            <button onClick={() => setTopic("custom")}
              style={{
                background: topic === "custom" ? "#00ff6420" : "transparent",
                color: topic === "custom" ? "#00ff64" : "#4a6454",
                border: `1px solid ${topic === "custom" ? "#00ff64" : "#1a2a1a"}`,
                padding: "6px 14px", borderRadius: 4, cursor: "pointer",
                fontSize: 12, fontFamily: "'Courier New', monospace", letterSpacing: 1,
              }}>+ Custom</button>
          </div>
          {topic === "custom" && (
            <input placeholder="apna topic type karo..."
              value={customTopic} onChange={(e) => setCustomTopic(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generate()}
              style={{
                width: "100%", background: "#0d1a10", border: "1px solid #00ff6440",
                color: "#00ff64", padding: "12px 16px", borderRadius: 6,
                fontFamily: "'Courier New', monospace", fontSize: 14,
                outline: "none", boxSizing: "border-box",
              }} />
          )}
        </div>

        <button onClick={generate} disabled={loading || !selec

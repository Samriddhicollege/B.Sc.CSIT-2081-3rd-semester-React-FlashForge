import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BlurFade } from "./ui/BlurFade"
import useDebounce from "../hooks/useDebounce"

export default function CreateCard({ decks, onCreateDeck, onAddCard, setView }) {
  const [tab, setTab] = useState("manual")
  const [deckName, setDeckName] = useState(""); const [deckDesc, setDeckDesc] = useState(""); const [deckErr, setDeckErr] = useState("")
  const [selDeck, setSelDeck] = useState(""); const [q, setQ] = useState(""); const [a, setA] = useState(""); const [cardErr, setCardErr] = useState(""); const [ok, setOk] = useState("")
  const [search, setSearch] = useState("")
  const debSearch = useDebounce(search, 300)
  const filtered = decks.filter(d => d.name.toLowerCase().includes(debSearch.toLowerCase()))

  const [aiTopic, setAiTopic] = useState("")
  const [aiDeck, setAiDeck] = useState("")
  const [aiLoading, setAiLoading] = useState(false)
  const [aiCards, setAiCards] = useState(null)
  const [aiErr, setAiErr] = useState("")
  const [aiSaved, setAiSaved] = useState(false)

  const createDeck = () => {
    if (!deckName.trim()) { setDeckErr("Deck name is required."); return }
    if (decks.some(d => d.name.toLowerCase() === deckName.trim().toLowerCase())) { setDeckErr("Name already exists."); return }
    const nd = { id: Date.now().toString(36) + Math.random().toString(36).slice(2), name: deckName.trim(), description: deckDesc.trim(), cards: [], createdAt: new Date().toISOString() }
    onCreateDeck(nd); setDeckName(""); setDeckDesc(""); setDeckErr(""); setSelDeck(nd.id)
  }

  const addCard = () => {
    if (!selDeck) { setCardErr("Select a deck."); return }
    if (!q.trim()) { setCardErr("Question required."); return }
    if (!a.trim()) { setCardErr("Answer required."); return }
    const nc = { id: Date.now().toString(36) + Math.random().toString(36).slice(2), question: q.trim(), answer: a.trim(), confidence: 0, createdAt: new Date().toISOString() }
    onAddCard(selDeck, nc); setQ(""); setA(""); setCardErr(""); setOk("✔ Card added!"); setTimeout(() => setOk(""), 2000)
  }

  // ─── OPENROUTER AI GENERATOR ──────────────────────────────
  const generateAI = async () => {
    if (!aiTopic.trim()) { setAiErr("Enter a topic first."); return }
    if (!aiDeck) { setAiErr("Select a deck to save cards to."); return }
    
    // 1. Missing API Key Handling
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    if (!apiKey) {
      setAiErr("Missing API key. Please check your .env file.");
      return;
    }

    setAiLoading(true); setAiErr(""); setAiCards(null); setAiSaved(false);
    
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "Flashcard App"
        },
        body: JSON.stringify({
          // 'openrouter/free' automatically assigns whatever free models are online!
          model: "openrouter/free",
          messages: [
            {
              role: "system",
              content: "You are a flashcard generator. Return ONLY a valid JSON array of exactly 10 objects, each with \"question\" and \"answer\" string fields. No markdown formatting, no explanation, no backticks. Just the raw JSON array and nothing else."
            },
            {
              role: "user",
              content: `Generate 10 flashcards about: ${aiTopic}`
            }
          ],
          temperature: 0.7,
          max_tokens: 1500
        })
      });

      // 2. Parse response and handle API Errors (including 404/500 with JSON bodies)
      let data;
      try {
        data = await response.json();
      } catch (err) {
        // If not JSON, throw standard network error
        throw new Error(`Network Error: ${response.status} ${response.statusText}`);
      }

      if (!response.ok || data.error) {
        throw new Error(`API Error: ${data?.error?.message || response.statusText}`);
      }
      
      const text = data.choices?.[0]?.message?.content || "";
      
      let parsed;
      // 3. Robust JSON Response Extraction
      try {
        // Extract strictly the JSON array (from '[' to ']') to ignore conversational text 
        const match = text.match(/\[[\s\S]*\]/);
        const rawJsonString = match ? match[0] : text;
        const cleaned = rawJsonString.replace(/```json|```/gi, "").trim();
        
        parsed = JSON.parse(cleaned);
      } catch (parseError) {
        console.error("Failed to parse AI response. Raw output:", text);
        throw new Error("Invalid response format received from AI.");
      }

      if (!Array.isArray(parsed)) {
        throw new Error("Received invalid data from AI. Expected an array of flashcards.");
      }

      setAiCards(parsed.map((c, i) => ({ ...c, id: `ai_${Date.now()}_${i}`, keep: true })));
      
    } catch (e) {
      console.error(e);
      // Fallback network error handling (e.g., disconnected from internet)
      if (e.message === "Failed to fetch" || e.name === "TypeError") {
        setAiErr("Network failure. Please check your internet connection.");
      } else {
        setAiErr(e.message || "Failed to generate cards.");
      }
    } finally {
      // 4. Loading State Handling Improvements (Guaranteed to finish loading state)
      setAiLoading(false);
    }
  }

  const saveAICards = () => {
    if (!aiCards || !aiDeck) return
    
    const cardsToSave = aiCards.filter(c => c.keep).map(c => ({
      id: Date.now().toString(36) + Math.random().toString(36).slice(2),
      question: c.question, 
      answer: c.answer,
      confidence: 0, 
      createdAt: new Date().toISOString()
    }));

    if (cardsToSave.length > 0) {
      onAddCard(aiDeck, cardsToSave);
    }
    
    setAiSaved(true); setAiCards(null); setAiTopic("")
  }

  const tabStyle = (active) => ({
    background: active ? "#ccff00" : "transparent",
    color: active ? "#000" : "rgba(235,235,235,0.5)",
    border: active ? "none" : "1px solid rgba(255,255,255,0.08)",
    borderRadius: 100, padding: "8px 20px",
    fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: active ? 700 : 500,
    cursor: "pointer", transition: "all 0.2s"
  })

  return (
    <div className="create-page">
      <BlurFade delay={0} inView>
        <div className="hero-label"><div className="status-dot" />Content Studio</div>
        <h2 className="page-title">Create <em>Content</em></h2>
      </BlurFade>

      <BlurFade delay={0.08} inView>
        <div style={{ display: "flex", gap: 8 }}>
          <button style={tabStyle(tab === "manual")} onClick={() => setTab("manual")}>✍️ Manual</button>
          <button style={tabStyle(tab === "ai")} onClick={() => setTab("ai")}>🤖 AI Generate</button>
        </div>
      </BlurFade>

      <AnimatePresence mode="wait">
        {tab === "manual" ? (
          <motion.div key="manual" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
            <div className="create-grid">
              <div className="create-section">
                <div className="cs-header"><div className="cs-icon">📦</div><div className="cs-title">New Deck</div></div>
                <div className="form-group">
                  <label className="form-label">Deck Name *</label>
                  <input className={`form-input ${deckErr ? "err" : ""}`} value={deckName} onChange={e => { setDeckName(e.target.value); setDeckErr("") }} placeholder="e.g. JavaScript Basics" maxLength={50} />
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <input className="form-input" value={deckDesc} onChange={e => setDeckDesc(e.target.value)} placeholder="Optional..." maxLength={100} />
                </div>
                {deckErr && <p className="field-err">{deckErr}</p>}
                <button className="btn-lime full" onClick={createDeck}>+ Create Deck</button>
              </div>

              <div className="create-section">
                <div className="cs-header"><div className="cs-icon">🃏</div><div className="cs-title">Add Card</div></div>
                <div className="form-group">
                  <label className="form-label">Select Deck *</label>
                  <input className="form-input" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search decks..." />
                  {decks.length === 0 ? <p className="hint">Create a deck first ↑</p> : (
                    <div className="deck-picker" style={{ marginTop: 6 }}>
                      {filtered.map(d => (
                        <div key={d.id} className={`deck-option ${selDeck === d.id ? "sel" : ""}`} onClick={() => setSelDeck(d.id)}>
                          <span>{d.name}</span><span className="deck-opt-count">{d.cards.length}</span>
                        </div>
                      ))}
                      {!filtered.length && <p className="hint" style={{ padding: "10px 14px" }}>No match</p>}
                    </div>
                  )}
                </div>
                <div className="form-group">
                  <label className="form-label">Question *</label>
                  <textarea className={`form-input ${cardErr && !q.trim() ? "err" : ""}`} value={q} onChange={e => { setQ(e.target.value); setCardErr("") }} placeholder="What is a closure?" rows={3} />
                </div>
                <div className="form-group">
                  <label className="form-label">Answer *</label>
                  <textarea className={`form-input ${cardErr && !a.trim() ? "err" : ""}`} value={a} onChange={e => { setA(e.target.value); setCardErr("") }} placeholder="A function that remembers its scope..." rows={3} />
                </div>
                {cardErr && <p className="field-err">{cardErr}</p>}
                {ok && <p className="field-ok">{ok}</p>}
                <button className="btn-lime full" onClick={addCard}>+ Add Card</button>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="ai" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.2 }}>
            <div className="create-section" style={{ maxWidth: 640 }}>
              <div className="cs-header"><div className="cs-icon">✨</div><div className="cs-title">AI Card Generator</div></div>

              {/* Powered by badge */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(66,133,244,0.08)", border: "1px solid rgba(66,133,244,0.2)", borderRadius: 100, padding: "5px 14px", marginTop: -8 }}>
                <span style={{ fontSize: 14 }}>🔵</span>
                <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(66,133,244,0.9)" }}>Powered by OpenRouter</span>
              </div>

              <p style={{ fontSize: 13, color: "rgba(235,235,235,0.4)" }}>
                Enter any topic and AI will generate 10 flashcards instantly.
              </p>

              <div className="form-group">
                <label className="form-label">Topic *</label>
                <input className="form-input" value={aiTopic}
                  onChange={e => { setAiTopic(e.target.value); setAiErr("") }}
                  placeholder="e.g. Photosynthesis, React Hooks, World War II..."
                  onKeyDown={e => e.key === "Enter" && generateAI()}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Save to Deck *</label>
                <div className="deck-picker">
                  {decks.length === 0
                    ? <p className="hint" style={{ padding: "10px 14px" }}>Create a deck first</p>
                    : decks.map(d => (
                      <div key={d.id} className={`deck-option ${aiDeck === d.id ? "sel" : ""}`} onClick={() => setAiDeck(d.id)}>
                        <span>{d.name}</span>
                        <span className="deck-opt-count">{d.cards.length} cards</span>
                      </div>
                    ))
                  }
                </div>
              </div>

              {aiErr && (
                <div style={{ background: "rgba(255,71,87,0.08)", border: "1px solid rgba(255,71,87,0.2)", borderRadius: "0.75rem", padding: "10px 14px" }}>
                  <p className="field-err" style={{ margin: 0 }}>⚠️ {aiErr}</p>
                </div>
              )}
              {aiSaved && <p className="field-ok">✔ Cards saved to deck successfully!</p>}

              <button className="btn-lime" onClick={generateAI} disabled={aiLoading}
                style={{ display: "flex", alignItems: "center", gap: 10, opacity: aiLoading ? 0.75 : 1 }}>
                {aiLoading ? (
                  <>
                    <div style={{ width: 15, height: 15, border: "2.5px solid #000", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                    Generating cards...
                  </>
                ) : "✨ Generate 10 Cards"}
              </button>

              {/* Cards Preview */}
              {aiCards && (
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 4 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, color: "rgba(235,235,235,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      Preview — {aiCards.filter(c => c.keep).length} / {aiCards.length} selected
                    </span>
                    <button className="btn-lime sm" onClick={saveAICards}
                      disabled={aiCards.filter(c => c.keep).length === 0}>
                      Save to Deck ✔
                    </button>
                  </div>

                  {aiCards.map((c, i) => (
                    <motion.div key={c.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: c.keep ? 1 : 0.35, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      style={{ background: "rgba(255,255,255,0.02)", border: `1px solid ${c.keep ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)"}`, borderRadius: "0.75rem", padding: "12px 14px", transition: "all 0.2s" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10 }}>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: 13, fontWeight: 600, color: "#ebebeb", marginBottom: 4 }}>
                            <span style={{ color: "#ccff00", fontFamily: "'JetBrains Mono',monospace", fontSize: 10, marginRight: 6 }}>Q{i + 1}</span>
                            {c.question}
                          </p>
                          <p style={{ fontSize: 12, color: "rgba(235,235,235,0.45)", lineHeight: 1.5 }}>→ {c.answer}</p>
                        </div>
                        <button
                          onClick={() => setAiCards(prev => prev.map((x, j) => j === i ? { ...x, keep: !x.keep } : x))}
                          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 16, color: c.keep ? "#ff4757" : "#ccff00", flexShrink: 0, padding: "2px 4px" }}
                          title={c.keep ? "Remove this card" : "Add back"}>
                          {c.keep ? "✕" : "↩"}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <BlurFade delay={0.2} inView>
        <button className="btn-ghost" onClick={() => setView("dashboard")}>← Back to Decks</button>
      </BlurFade>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

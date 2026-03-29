import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BlurFade } from "./ui/BlurFade"
import DeckCard from "./DeckCard"
import { getGreeting, getDailyQuote } from "../utils/helpers"

export default function Dashboard({ decks, onStartReview, onDeleteDeck, onDeleteCard, onUpdateCard, stats, setView, user, onQuickAddCard }) {
  const [showFAB, setShowFAB] = useState(false)
  const [fabQ, setFabQ] = useState("")
  const [fabA, setFabA] = useState("")
  const [fabDeck, setFabDeck] = useState("")
  const [fabMsg, setFabMsg] = useState("")

  const totalCards = decks.reduce((a, d) => a + d.cards.length, 0)
  const mastered = decks.reduce((a, d) => a + d.cards.filter(c => (c.confidence || 0) >= 4).length, 0)
  const lastStudied = decks.find(d => d.lastReviewed) || null
  const greeting = user ? getGreeting(user.name.split(" ")[0]) : "Welcome back 👋"
  const quote = getDailyQuote()

  const bentoStats = [
    { num: decks.length, label: "Decks" },
    { num: totalCards, label: "Cards" },
    { num: stats.streak, label: "Streak 🔥" },
    { num: mastered, label: "Mastered" },
  ]

  const handleFABSave = () => {
    if (!fabDeck || !fabQ.trim() || !fabA.trim()) { setFabMsg("Fill all fields."); return }
    const card = { id: Date.now().toString(36) + Math.random().toString(36).slice(2), question: fabQ.trim(), answer: fabA.trim(), confidence: 0, createdAt: new Date().toISOString() }
    onQuickAddCard(fabDeck, card)
    setFabQ(""); setFabA(""); setFabMsg("✔ Card added!")
    setTimeout(() => { setFabMsg(""); setShowFAB(false) }, 1500)
  }

  return (
    <div className="dashboard">
      {/* Hero */}
      <div className="hero-section">
        <div>
          <BlurFade delay={0} inView>
            <div className="hero-label"><div className="status-dot" />{greeting}</div>
          </BlurFade>
          <BlurFade delay={0.08} inView>
            <h1 className="hero-title">Your<br /><em>Knowledge</em><br />Hub</h1>
          </BlurFade>
          <BlurFade delay={0.15} inView>
            <p className="hero-sub" style={{ fontStyle: "italic", color: "rgba(235,235,235,0.4)", fontSize: 13, marginTop: 12, borderLeft: "2px solid rgba(204,255,0,0.3)", paddingLeft: 12 }}>
              "{quote}"
            </p>
          </BlurFade>
        </div>

        <BlurFade delay={0.2} inView>
          <div className="stats-bento">
            {bentoStats.map((s, i) => (
              <div key={i} className="bento-stat" onMouseMove={e => { const r = e.currentTarget.getBoundingClientRect(); e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`); e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`) }}>
                <div className="bento-num">{s.num}</div>
                <div className="bento-label">{s.label}</div>
              </div>
            ))}
          </div>
        </BlurFade>
      </div>

      {/* Continue Learning */}
      {lastStudied && (
        <BlurFade delay={0.25} inView>
          <div style={{ background: "rgba(204,255,0,0.04)", border: "1px solid rgba(204,255,0,0.15)", borderRadius: "1.5rem", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
            <div>
              <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#ccff00", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 6 }}>Continue Learning</div>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 18, fontWeight: 700, color: "#ebebeb", letterSpacing: "-0.03em" }}>{lastStudied.name}</div>
              <div style={{ fontSize: 12, color: "rgba(235,235,235,0.4)", marginTop: 4 }}>{lastStudied.cards.length} cards · Last studied {new Date(lastStudied.lastReviewed).toLocaleDateString()}</div>
            </div>
            <button className="btn-lime sm" onClick={() => onStartReview(lastStudied)}>▶ Resume</button>
          </div>
        </BlurFade>
      )}

      {/* Decks */}
      {decks.length === 0 ? (
        <BlurFade delay={0.3} inView>
          <div className="empty-state">
            <div className="empty-icon float-anim">📚</div>
            <h2 className="empty-title">No decks yet</h2>
            <p className="empty-sub">Start building your knowledge base</p>
            <button className="btn-lime" onClick={() => setView("create")}>+ Create First Deck</button>
          </div>
        </BlurFade>
      ) : (
        <>
          <div className="section-header">
            <div className="section-title">Your Decks</div>
            <button className="btn-ghost sm" onClick={() => setView("create")}>+ New Deck</button>
          </div>
          <div className="decks-grid">
            {decks.map((deck, i) => (
              <BlurFade key={deck.id} delay={i * 0.06} inView>
                <DeckCard deck={deck} onStartReview={onStartReview} onDeleteDeck={onDeleteDeck} onDeleteCard={onDeleteCard} onUpdateCard={onUpdateCard} />
              </BlurFade>
            ))}
          </div>
        </>
      )}

      {/* FAB */}
      <div style={{ position: "fixed", bottom: 32, right: 32, zIndex: 200 }}>
        <AnimatePresence>
          {showFAB && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1.5rem", padding: 20, width: 300, marginBottom: 12, boxShadow: "0 20px 60px rgba(0,0,0,0.5)" }}
            >
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 700, color: "#ebebeb", marginBottom: 14 }}>Quick Add Card</div>
              <select value={fabDeck} onChange={e => setFabDeck(e.target.value)}
                style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "0.75rem", padding: "10px 12px", color: fabDeck ? "#ebebeb" : "rgba(235,235,235,0.3)", fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, marginBottom: 10, outline: "none" }}>
                <option value="">Select deck...</option>
                {decks.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
              <textarea value={fabQ} onChange={e => setFabQ(e.target.value)} placeholder="Question" rows={2}
                style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "0.75rem", padding: "10px 12px", color: "#ebebeb", fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, resize: "none", outline: "none", boxSizing: "border-box", marginBottom: 8 }} />
              <textarea value={fabA} onChange={e => setFabA(e.target.value)} placeholder="Answer" rows={2}
                style={{ width: "100%", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "0.75rem", padding: "10px 12px", color: "#ebebeb", fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, resize: "none", outline: "none", boxSizing: "border-box", marginBottom: 10 }} />
              {fabMsg && <p style={{ fontSize: 12, color: fabMsg.startsWith("✔") ? "#ccff00" : "#ff4757", marginBottom: 8 }}>{fabMsg}</p>}
              <button className="btn-lime full" onClick={handleFABSave}>+ Add Card</button>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}
          onClick={() => setShowFAB(p => !p)}
          style={{ width: 56, height: 56, borderRadius: "50%", background: "#ccff00", border: "none", cursor: "pointer", fontSize: 24, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 30px rgba(204,255,0,0.35)", color: "#000", fontWeight: 900 }}>
          {showFAB ? "✕" : "+"}
        </motion.button>
      </div>
    </div>
  )
}

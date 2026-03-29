import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import FlashCardItem from "./FlashCardItem"

const COLORS = ["#ccff00", "#10b981", "#6366f1", "#f59e0b", "#ec4899", "#06b6d4"]

export default function DeckCard({ deck, onStartReview, onDeleteDeck, onDeleteCard, onUpdateCard }) {
  const [expanded, setExpanded] = useState(false)
  const mastered = deck.cards.filter(c => (c.confidence || 0) >= 4).length
  const progress = deck.cards.length > 0 ? (mastered / deck.cards.length) * 100 : 0
  const color = COLORS[parseInt(deck.id, 36) % COLORS.length]

  return (
    <div className="deck-card" style={{ "--deck-color": color }}>
      <div className="deck-accent-bar" />
      <div className="deck-body">
        <div className="deck-header-row">
          <div style={{ flex: 1 }}>
            <div className="deck-name">{deck.name}</div>
            {deck.description && <div className="deck-desc">{deck.description}</div>}
            <div className="deck-meta">
              <span>◈ {deck.cards.length} cards</span>
              <span style={{ color: "var(--text-30)" }}>·</span>
              <span>⭐ {mastered} mastered</span>
            </div>
          </div>
          <button className="btn-icon danger" onClick={() => onDeleteDeck(deck.id)}>🗑</button>
        </div>
      </div>
      <div className="progress-track"><div className="progress-fill" style={{ width: `${progress}%` }} /></div>
      <div className="progress-pct" style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10 }}>{Math.round(progress)}% mastered</div>
      <div className="deck-footer">
        <button className="btn-lime sm" onClick={() => onStartReview(deck)} disabled={deck.cards.length === 0}>▶ Review</button>
        <button className="btn-ghost sm" onClick={() => setExpanded(p => !p)}>{expanded ? "▲ Hide" : `▼ Cards (${deck.cards.length})`}</button>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: "hidden" }}>
            <div className="cards-list">
              {deck.cards.length === 0 ? <p className="hint" style={{ textAlign: "center", padding: "16px 0" }}>No cards yet</p> :
                deck.cards.map(card => <FlashCardItem key={card.id} card={card} deckId={deck.id} onDelete={onDeleteCard} onUpdate={onUpdateCard} />)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

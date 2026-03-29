import { useState } from "react"

const CONF = ["New", "Learning", "Familiar", "Good", "Great", "Mastered"]
const CONF_COLORS = ["#555", "#ff4757", "#f59e0b", "#06b6d4", "#10b981", "#ccff00"]

export default function FlashCardItem({ card, deckId, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false)
  const [q, setQ] = useState(card.question)
  const [a, setA] = useState(card.answer)
  const [err, setErr] = useState("")

  const save = () => {
    if (!q.trim() || !a.trim()) { setErr("Both fields required."); return }
    onUpdate(deckId, { ...card, question: q.trim(), answer: a.trim() })
    setEditing(false); setErr("")
  }
  const cancel = () => { setQ(card.question); setA(card.answer); setEditing(false); setErr("") }
  const conf = card.confidence || 0

  return (
    <div className="card-item">
      {editing ? (
        <div className="card-edit-form">
          <input className={`form-input ${err ? "err" : ""}`} value={q} onChange={e => setQ(e.target.value)} placeholder="Question" />
          <textarea className={`form-input ${err ? "err" : ""}`} value={a} onChange={e => setA(e.target.value)} placeholder="Answer" rows={2} />
          {err && <p className="field-err">{err}</p>}
          <div className="edit-row">
            <button className="btn-lime xs" onClick={save}>Save</button>
            <button className="btn-ghost xs" onClick={cancel}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className="card-q">Q: {card.question}</div>
          <div className="card-a">A: {card.answer}</div>
          <div className="card-footer-row">
            <span className="conf-badge" style={{ background: CONF_COLORS[conf] }}>{CONF[conf]}</span>
            <div style={{ display: "flex", gap: 4 }}>
              <button className="btn-icon" onClick={() => setEditing(true)}>✏️</button>
              <button className="btn-icon danger" onClick={() => onDelete(deckId, card.id)}>🗑</button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

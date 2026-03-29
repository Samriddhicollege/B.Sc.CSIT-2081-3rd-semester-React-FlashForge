import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const MODES = [
  { id: "mcq",       icon: "🃏", title: "Multiple Choice",  desc: "4 options per question. Pick the correct answer." },
  { id: "truefalse", icon: "⚖️", title: "True / False",     desc: "Is the shown answer correct? True or False." },
  { id: "survival",  icon: "❤️", title: "Survival",         desc: "3 lives. Wrong answer costs a heart. Don't die!" },
  { id: "timed",     icon: "⏱",  title: "Timed Mode",       desc: "10 seconds per question. Answer before time runs out!" },
]

export default function GameModeModal({ deck, onStart, onClose }) {
  const [selected, setSelected] = useState("mcq")

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          style={{ background: "#111", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "2rem", padding: 36, maxWidth: 540, width: "100%" }}
          onClick={e => e.stopPropagation()}
        >
          <div style={{ marginBottom: 28 }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: "#ccff00", marginBottom: 8 }}>
              {deck.name}
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 26, fontWeight: 700, letterSpacing: "-0.05em", color: "#ebebeb" }}>Choose Game Mode</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
            {MODES.map(m => (
              <button
                key={m.id}
                onClick={() => setSelected(m.id)}
                style={{
                  background: selected === m.id ? "rgba(204,255,0,0.08)" : "rgba(255,255,255,0.02)",
                  border: `1px solid ${selected === m.id ? "rgba(204,255,0,0.4)" : "rgba(255,255,255,0.07)"}`,
                  borderRadius: "1.25rem", padding: "16px 14px", cursor: "pointer",
                  textAlign: "left", transition: "all 0.2s",
                  boxShadow: selected === m.id ? "0 0 20px rgba(204,255,0,0.1)" : "none",
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 8 }}>{m.icon}</div>
                <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 700, color: selected === m.id ? "#ccff00" : "#ebebeb", marginBottom: 4 }}>{m.title}</div>
                <div style={{ fontSize: 12, color: "rgba(235,235,235,0.4)", lineHeight: 1.4 }}>{m.desc}</div>
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button
              onClick={() => onStart(selected)}
              style={{ flex: 1, background: "#ccff00", border: "none", borderRadius: 100, padding: "13px 24px", color: "#000", fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 0 24px rgba(204,255,0,0.25)" }}>
              ▶ Start {MODES.find(m => m.id === selected)?.title}
            </button>
            <button
              onClick={onClose}
              style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 100, padding: "13px 20px", color: "rgba(235,235,235,0.5)", fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, cursor: "pointer" }}>
              Cancel
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

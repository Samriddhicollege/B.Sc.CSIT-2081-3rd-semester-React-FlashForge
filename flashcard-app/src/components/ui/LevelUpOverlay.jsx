import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CharStagger } from "./TextAnimations"

export function LevelUpOverlay({ levelName, onDone }) {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 8 + 4,
    delay: Math.random() * 0.5,
    color: Math.random() > 0.5 ? "#ccff00" : "#10b981",
  }))

  useEffect(() => {
    const t = setTimeout(onDone, 3500)
    return () => clearTimeout(t)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,0.92)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: 24,
      }}
      onClick={onDone}
    >
      {/* Confetti particles */}
      {particles.map(p => (
        <motion.div
          key={p.id}
          initial={{ x: `${p.x}vw`, y: "-10vh", opacity: 1, rotate: 0 }}
          animate={{ y: "110vh", opacity: 0, rotate: 720 }}
          transition={{ delay: p.delay, duration: 2 + Math.random(), ease: "easeIn" }}
          style={{
            position: "fixed",
            width: p.size, height: p.size,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            background: p.color,
            left: 0, top: 0,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
          }}
        />
      ))}

      {/* Glow ring */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.6] }}
        transition={{ duration: 0.6 }}
        style={{
          width: 200, height: 200,
          borderRadius: "50%",
          border: "2px solid #ccff00",
          boxShadow: "0 0 60px rgba(204,255,0,0.5), inset 0 0 60px rgba(204,255,0,0.1)",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "absolute",
        }}
      />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        style={{ fontSize: 64, textAlign: "center" }}
      >
        🏆
      </motion.div>

      <div style={{ textAlign: "center" }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: "0.3em", color: "#ccff00", textTransform: "uppercase", marginBottom: 12 }}
        >
          Level Up!
        </motion.p>

        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(2rem,5vw,4rem)", fontWeight: 700, letterSpacing: "-0.06em", color: "#ebebeb" }}>
          <CharStagger text={levelName} delay={0.5} stagger={0.06} />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{ color: "rgba(235,235,235,0.4)", fontSize: 13, marginTop: 16, fontFamily: "'Space Grotesk',sans-serif" }}
        >
          Tap anywhere to continue
        </motion.p>
      </div>
    </motion.div>
  )
}

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { BlurFade } from "./ui/BlurFade"
import { shuffle } from "../utils/helpers"

const LETTERS = ["A", "B", "C", "D"]

function generateOptions(correct, allCards) {
  const wrong = shuffle(allCards.filter(c => c.id !== correct.id).map(c => c.answer)).slice(0, 3)
  const pads = ["None of the above", "Cannot be determined", "It depends", "All of the above"]
  while (wrong.length < 3) wrong.push(pads[wrong.length])
  return shuffle([correct.answer, ...wrong])
}

function CountdownRing({ seconds, total = 10 }) {
  const r = 26, circ = 2 * Math.PI * r
  const offset = circ * (1 - seconds / total)
  const color = seconds <= 3 ? "#ff4757" : seconds <= 6 ? "#f59e0b" : "#ccff00"
  return (
    <div style={{ position: "relative", width: 64, height: 64, flexShrink: 0 }}>
      <svg width="64" height="64" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="4" />
        <circle cx="32" cy="32" r={r} fill="none" stroke={color} strokeWidth="4"
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s linear, stroke 0.3s" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontWeight: 700, fontSize: 16, color }}>{seconds}</div>
    </div>
  )
}

function Hearts({ lives, max = 3 }) {
  return (
    <div style={{ display: "flex", gap: 4 }}>
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} style={{ fontSize: 20, opacity: i < lives ? 1 : 0.15, transition: "opacity 0.3s" }}>❤️</span>
      ))}
    </div>
  )
}

export default function ReviewMode({ deck, cards, gameMode = "mcq", onComplete, onExit }) {
  const [shuffled, setShuffled] = useState([])
  const [idx, setIdx] = useState(0)
  const [curOptions, setCurOptions] = useState([])
  const [selected, setSelected] = useState(null)
  const [answered, setAnswered] = useState(false)
  const [results, setResults] = useState([])
  const [done, setDone] = useState(false)
  const [timer, setTimer] = useState(0)
  const [lives, setLives] = useState(3)
  const [gameOver, setGameOver] = useState(false)
  const [countdown, setCountdown] = useState(10)
  const [shake, setShake] = useState(false)
  const cdRef = useRef(null)
  const answeredRef = useRef(false)

  useEffect(() => { setShuffled(shuffle(cards)) }, [cards])

  useEffect(() => {
    if (!shuffled.length || done || gameOver) return
    answeredRef.current = false
    setSelected(null); setAnswered(false)
    if (gameMode === "mcq" || gameMode === "survival" || gameMode === "timed") {
      setCurOptions(generateOptions(shuffled[idx], cards))
    } else if (gameMode === "truefalse") {
      const useCorrect = Math.random() > 0.5
      const wrongAnswers = shuffle(cards.filter(c => c.id !== shuffled[idx].id).map(c => c.answer))
      setCurOptions([{ text: useCorrect ? shuffled[idx].answer : (wrongAnswers[0] || "Wrong answer"), isCorrect: useCorrect }])
    }
    if (gameMode === "timed") {
      setCountdown(10)
      clearInterval(cdRef.current)
      cdRef.current = setInterval(() => {
        setCountdown(c => {
          if (c <= 1) { clearInterval(cdRef.current); if (!answeredRef.current) processAnswer(false); return 0 }
          return c - 1
        })
      }, 1000)
    }
    return () => clearInterval(cdRef.current)
  }, [idx, shuffled, gameMode])

  useEffect(() => {
    const t = setInterval(() => setTimer(s => s + 1), 1000)
    return () => { clearInterval(t); clearInterval(cdRef.current) }
  }, [])

  const current = shuffled[idx]
  const fmt = s => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`
  const progress = shuffled.length > 0 ? (idx / shuffled.length) * 100 : 0

  const processAnswer = (correct) => {
    if (answeredRef.current) return
    answeredRef.current = true
    clearInterval(cdRef.current)
    setAnswered(true)
    const newResults = [...results, { id: shuffled[idx].id, known: correct }]
    setResults(newResults)

    if (!correct && gameMode === "survival") {
      const newLives = lives - 1
      setLives(newLives)
      setShake(true); setTimeout(() => setShake(false), 500)
      if (newLives <= 0) { setTimeout(() => setGameOver(true), 1000); return }
    }
    if (gameMode === "survival" || gameMode === "timed") {
      setTimeout(() => { if (idx + 1 >= shuffled.length) setDone(true); else setIdx(i => i + 1) }, 1000)
    }
  }

  const handleMCQ = (optIdx) => { if (answered) return; setSelected(optIdx); processAnswer(curOptions[optIdx] === current.answer) }
  const handleTF = (isTrue) => { if (answered) return; setSelected(isTrue ? "T" : "F"); processAnswer(isTrue === curOptions[0]?.isCorrect) }
  const handleNext = () => { if (idx + 1 >= shuffled.length) setDone(true); else setIdx(i => i + 1) }

  const knownCount = results.filter(r => r.known).length

  if (!shuffled.length) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, paddingTop: 60, textAlign: "center" }}>
      <p style={{ color: "rgba(235,235,235,0.4)", fontSize: 15 }}>This deck has no cards.</p>
      <button className="btn-ghost" onClick={onExit}>← Back</button>
    </div>
  )

  if (gameOver) return (
    <BlurFade inView>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, textAlign: "center", maxWidth: 460, margin: "60px auto 0" }}>
        <div style={{ fontSize: 72 }}>💀</div>
        <h2 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 40, fontWeight: 700, letterSpacing: "-0.06em", color: "#ebebeb" }}>Game Over</h2>
        <p style={{ color: "rgba(235,235,235,0.5)", fontSize: 15 }}>You answered {knownCount} correctly before running out of lives.</p>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn-lime" onClick={() => onComplete(deck.id, results, timer)}>Save & Exit</button>
          <button className="btn-ghost" onClick={onExit}>Exit</button>
        </div>
      </div>
    </BlurFade>
  )

  return (
    <motion.div animate={shake ? { x: [-10, 10, -8, 8, -4, 0] } : {}} transition={{ duration: 0.4 }}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24, paddingBottom: 60 }}>

      {/* Top bar */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: 680 }}>
        <button className="btn-ghost sm" onClick={onExit}>✕ Exit</button>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 14, color: "#ebebeb" }}>{deck.name}</div>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "rgba(235,235,235,0.3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>⏱ {fmt(timer)}</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {gameMode === "survival" && <Hearts lives={lives} />}
          {gameMode === "timed" && !answered && !done && <CountdownRing seconds={countdown} />}
          <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: "rgba(235,235,235,0.5)" }}>
            {Math.min(idx + 1, shuffled.length)}/{shuffled.length}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="review-progress" style={{ width: "100%", maxWidth: 680 }}>
        <div className="review-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      {!done ? (
        <AnimatePresence mode="wait">
          <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            style={{ width: "100%", maxWidth: 680, display: "flex", flexDirection: "column", gap: 16 }}>

            <div className="mc-card">
              <div>
                <div className="mc-q-label">
                  <div className="status-dot" />
                  Question {idx + 1}
                  <span style={{ marginLeft: "auto", fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "rgba(235,235,235,0.3)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                    {gameMode === "mcq" ? "Multiple Choice" : gameMode === "truefalse" ? "True / False" : gameMode === "survival" ? "❤️ Survival" : "⏱ Timed"}
                  </span>
                </div>
                <div className="mc-question">{current?.question}</div>
              </div>

              {/* MCQ / Survival / Timed */}
              {(gameMode === "mcq" || gameMode === "survival" || gameMode === "timed") && (
                <div className="mc-options">
                  {curOptions.map((opt, i) => {
                    let cls = "mc-option"
                    if (answered) {
                      if (opt === current.answer) cls += " correct"
                      else if (i === selected) cls += " wrong"
                    }
                    return (
                      <button key={i} className={cls} onClick={() => handleMCQ(i)} disabled={answered}>
                        <span className="opt-letter">{LETTERS[i]}</span>
                        <span style={{ lineHeight: 1.4, textAlign: "left" }}>{opt}</span>
                      </button>
                    )
                  })}
                </div>
              )}

              {/* True/False */}
              {gameMode === "truefalse" && curOptions[0] && (
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "0.75rem", padding: "16px 18px" }}>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#ccff00", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 8 }}>Stated Answer</div>
                    <p style={{ fontSize: 15, color: "rgba(235,235,235,0.85)", fontStyle: "italic" }}>"{curOptions[0].text}"</p>
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    {[{ val: true, label: "✓ True", c: "#ccff00" }, { val: false, label: "✕ False", c: "#ff4757" }].map(({ val, label, c }) => {
                      const chose = selected === (val ? "T" : "F")
                      const correct = answered && curOptions[0].isCorrect === val
                      const wrong = answered && chose && !correct
                      return (
                        <button key={String(val)} onClick={() => handleTF(val)} disabled={answered}
                          style={{ flex: 1, padding: 16, borderRadius: "0.75rem", border: `1px solid ${correct ? "#ccff00" : wrong ? "#ff4757" : "rgba(255,255,255,0.08)"}`, background: correct ? "rgba(204,255,0,0.08)" : wrong ? "rgba(255,71,87,0.08)" : "rgba(255,255,255,0.02)", color: correct ? "#ccff00" : wrong ? "#ff4757" : "#ebebeb", fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700, cursor: answered ? "default" : "pointer", transition: "all 0.2s" }}>
                          {label}
                        </button>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Feedback for MCQ / TF */}
              <AnimatePresence>
                {answered && (gameMode === "mcq" || gameMode === "truefalse") && (
                  <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                    <div className={`mc-feedback ${results[results.length - 1]?.known ? "ok" : "no"}`}>
                      <span>
                        {results[results.length - 1]?.known ? "✓ Correct!" : `✕ Answer: ${current.answer}`}
                      </span>
                      <button className="btn-lime sm" onClick={handleNext}>
                        {idx + 1 < shuffled.length ? "Next →" : "Finish →"}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="live-score" style={{ justifyContent: "center" }}>
              <span className="ls-correct">✓ {results.filter(r => r.known).length}</span>
              <span style={{ color: "rgba(235,235,235,0.2)" }}>·</span>
              <span className="ls-wrong">✕ {results.filter(r => !r.known).length}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <BlurFade inView>
          <div className="results-screen">
            <div style={{ fontSize: 72 }}>{knownCount / shuffled.length >= 0.8 ? "🏆" : "👍"}</div>
            <h2 className="results-title">Done!</h2>
            <p className="results-sub">{knownCount} / {shuffled.length} correct</p>
            <div className="results-grid">
              <div className="result-tile r-ok"><div className="r-num">{knownCount}</div><div className="r-label">Correct</div></div>
              <div className="result-tile r-no"><div className="r-num">{shuffled.length - knownCount}</div><div className="r-label">Wrong</div></div>
              <div className="result-tile r-time"><div className="r-num">{fmt(timer)}</div><div className="r-label">Time</div></div>
            </div>
            <div className="results-actions">
              <button className="btn-lime" onClick={() => onComplete(deck.id, results, timer)}>Save & Finish</button>
              <button className="btn-ghost" onClick={onExit}>Exit</button>
            </div>
          </div>
        </BlurFade>
      )}
    </motion.div>
  )
}

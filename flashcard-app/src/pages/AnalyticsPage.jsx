import { useMemo } from "react"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { BlurFade } from "../components/ui/BlurFade"
import { formatTime } from "../utils/helpers"

const S = {
  label: { fontFamily: "'JetBrains Mono',monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(235,235,235,0.3)" },
  sectionTitle: { fontFamily: "'Space Grotesk',sans-serif", fontSize: 22, fontWeight: 700, letterSpacing: "-0.04em", color: "#ebebeb" },
  card: { background: "rgba(255,255,255,0.02)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "1.5rem", padding: 24 },
}

export default function AnalyticsPage({ sessions, decks, onStartWeakReview }) {
  const last7 = sessions.slice(-7)

  const deckAccuracy = useMemo(() => decks.map(d => {
    const deckSessions = sessions.filter(s => s.deckId === d.id)
    const total = deckSessions.reduce((a, s) => a + s.total, 0)
    const correct = deckSessions.reduce((a, s) => a + s.correct, 0)
    return { name: d.name, accuracy: total > 0 ? Math.round((correct / total) * 100) : 0, total }
  }), [sessions, decks])

  const weakCards = useMemo(() => {
    const arr = []
    decks.forEach(d => {
      d.cards.filter(c => (c.confidence || 0) <= 1).forEach(c => {
        arr.push({ ...c, deckName: d.name, deckId: d.id })
      })
    })
    return arr
  }, [decks])

  const totalStudyTime = sessions.reduce((a, s) => a + (s.duration || 0), 0)

  // 30-day heatmap
  const heatmap = useMemo(() => {
    const days = []
    const now = Date.now()
    for (let i = 29; i >= 0; i--) {
      const day = new Date(now - i * 86400000).toDateString()
      const active = sessions.some(s => new Date(s.date).toDateString() === day)
      days.push({ day, active })
    }
    return days
  }, [sessions])

  const CustomTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null
    return (
      <div style={{ background: "#161616", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "8px 14px" }}>
        <p style={{ color: "#ccff00", fontSize: 13, fontWeight: 700 }}>✓ {payload[0]?.value} correct</p>
        <p style={{ color: "#ff4757", fontSize: 13 }}>✕ {payload[1]?.value} wrong</p>
      </div>
    )
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <BlurFade delay={0} inView>
        <div>
          <div style={{ ...S.label, color: "#ccff00", display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#ccff00", animation: "pulse-dot 2s infinite" }} />
            Analytics
          </div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 700, letterSpacing: "-0.06em", color: "#ebebeb", lineHeight: 1 }}>
            Your Progress
          </h1>
        </div>
      </BlurFade>

      {/* Quick stats row */}
      <BlurFade delay={0.1} inView>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12 }}>
          {[
            { num: sessions.length, label: "Sessions" },
            { num: sessions.reduce((a, s) => a + s.total, 0), label: "Cards Reviewed" },
            { num: weakCards.length, label: "Weak Cards" },
            { num: formatTime(totalStudyTime), label: "Study Time" },
          ].map((s, i) => (
            <div key={i} style={S.card}>
              <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 30, fontWeight: 700, letterSpacing: "-0.04em", color: "#ccff00" }}>{s.num}</div>
              <div style={S.label}>{s.label}</div>
            </div>
          ))}
        </div>
      </BlurFade>

      {/* Session bar chart */}
      <BlurFade delay={0.15} inView>
        <div style={S.card}>
          <div style={{ marginBottom: 20 }}>
            <div style={S.label}>Last 7 Sessions</div>
            <div style={S.sectionTitle}>Correct vs Wrong</div>
          </div>
          {last7.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 0", color: "rgba(235,235,235,0.3)", fontSize: 14 }}>
              No sessions yet. Start a review to see data here.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={last7.map((s, i) => ({ name: `S${i + 1}`, correct: s.correct, wrong: s.total - s.correct }))}>
                <XAxis dataKey="name" tick={{ fill: "rgba(235,235,235,0.3)", fontFamily: "'JetBrains Mono',monospace", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "rgba(235,235,235,0.3)", fontFamily: "'JetBrains Mono',monospace", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />
                <Bar dataKey="correct" fill="#ccff00" radius={[4, 4, 0, 0]} />
                <Bar dataKey="wrong" fill="#ff4757" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </BlurFade>

      {/* Deck accuracy */}
      <BlurFade delay={0.2} inView>
        <div style={S.card}>
          <div style={{ marginBottom: 20 }}>
            <div style={S.label}>Per Deck</div>
            <div style={S.sectionTitle}>Accuracy Breakdown</div>
          </div>
          {deckAccuracy.length === 0 ? (
            <p style={{ color: "rgba(235,235,235,0.3)", fontSize: 14 }}>No decks yet.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {deckAccuracy.map((d, i) => (
                <div key={i}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 500, color: "#ebebeb" }}>{d.name}</span>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 12, color: d.accuracy >= 70 ? "#ccff00" : d.accuracy >= 40 ? "#f59e0b" : "#ff4757" }}>
                      {d.accuracy}%
                    </span>
                  </div>
                  <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 100, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${d.accuracy}%`, background: d.accuracy >= 70 ? "#ccff00" : d.accuracy >= 40 ? "#f59e0b" : "#ff4757", borderRadius: 100, transition: "width 1s ease" }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </BlurFade>

      {/* 30-Day Heatmap */}
      <BlurFade delay={0.25} inView>
        <div style={S.card}>
          <div style={{ marginBottom: 20 }}>
            <div style={S.label}>Activity</div>
            <div style={S.sectionTitle}>30-Day Streak Map</div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
            {heatmap.map((d, i) => (
              <div key={i} title={d.day}
                style={{ width: 20, height: 20, borderRadius: 4, background: d.active ? "#ccff00" : "rgba(255,255,255,0.05)", boxShadow: d.active ? "0 0 8px rgba(204,255,0,0.4)" : "none", transition: "all 0.2s", cursor: "default" }} />
            ))}
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: "#ccff00" }} />
              <span style={{ ...S.label, color: "rgba(235,235,235,0.4)" }}>Studied</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 12, height: 12, borderRadius: 3, background: "rgba(255,255,255,0.05)" }} />
              <span style={{ ...S.label, color: "rgba(235,235,235,0.4)" }}>Rest day</span>
            </div>
          </div>
        </div>
      </BlurFade>

      {/* Weak Cards */}
      <BlurFade delay={0.3} inView>
        <div style={S.card}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={S.label}>Needs Work</div>
              <div style={S.sectionTitle}>Weak Cards ({weakCards.length})</div>
            </div>
            {weakCards.length > 0 && (
              <button onClick={onStartWeakReview}
                style={{ background: "#ccff00", border: "none", borderRadius: 100, padding: "9px 20px", color: "#000", fontFamily: "'Space Grotesk',sans-serif", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
                Review Weak Cards →
              </button>
            )}
          </div>
          {weakCards.length === 0 ? (
            <p style={{ color: "rgba(235,235,235,0.3)", fontSize: 14 }}>
              🎉 No weak cards! You're mastering everything.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 320, overflowY: "auto" }}>
              {weakCards.map((c, i) => (
                <div key={i} style={{ background: "rgba(255,71,87,0.04)", border: "1px solid rgba(255,71,87,0.15)", borderRadius: "0.75rem", padding: "12px 16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 500, color: "#ebebeb" }}>{c.question}</p>
                      <p style={{ fontSize: 12, color: "rgba(235,235,235,0.4)", marginTop: 4 }}>{c.answer}</p>
                    </div>
                    <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "rgba(235,235,235,0.3)", textTransform: "uppercase", letterSpacing: "0.1em", flexShrink: 0 }}>{c.deckName}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </BlurFade>
    </div>
  )
}

import { motion } from "framer-motion"
import { CharStagger, WordSlide, ScrambleText, CountUp, FadeInUp } from "../components/ui/TextAnimations"

export default function LandingPage({ onLogin, onRegister }) {
  const radius = "2.5rem";
  const glassBg = "rgba(255,255,255,0.07)";
  const glassBgSoft = "rgba(255,255,255,0.05)";
  const glassBorder = "rgba(255,255,255,0.12)";
  const glassBorderHover = "rgba(204,255,0,0.38)";
  const transition = "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)";
  const glow40 = "0 0 40px rgba(204,255,0,0.15)";
  const glow60 = "0 0 60px rgba(204,255,0,0.35)";
  const emeraldGlow40 = "0 0 40px rgba(16,185,129,0.14)";
  const glassLit = "inset 0 1px 0 rgba(255,255,255,0.24), inset 0 0 45px rgba(204,255,0,0.10)";
  const glassShadowBase = `0 25px 80px rgba(0,0,0,0.62), ${glow40}, ${emeraldGlow40}, ${glassLit}`;
  const glassShadowHover = `0 30px 95px rgba(0,0,0,0.72), ${glow60}, ${emeraldGlow40}, inset 0 1px 0 rgba(255,255,255,0.28), inset 0 0 55px rgba(204,255,0,0.14)`;

  return (
    <div style={{
    minHeight: "100vh",
    background:
      "radial-gradient(900px circle at 10% 10%, rgba(204,255,0,0.10) 0%, rgba(204,255,0,0) 55%)," +
      "radial-gradient(800px circle at 90% 20%, rgba(16,185,129,0.12) 0%, rgba(16,185,129,0) 55%)," +
      "radial-gradient(700px circle at 50% 100%, rgba(204,255,0,0.06) 0%, rgba(0,0,0,0) 55%)," +
      "#000",
    backgroundAttachment: "fixed",
  position: "relative",
  padding: "40px 20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  fontFamily: "'Space Grotesk', sans-serif",
  overflowX: "hidden"
    }}>
      <style>
        {`
          @keyframes float-anim {
            0%, 100% { transform: translateY(0px) rotate(var(--rot, 0deg)); }
            50% { transform: translateY(-12px) rotate(var(--rot, 0deg)); }
          }
          @keyframes float-shell {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
          }
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          @keyframes pulse-dot {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.5); }
          }
          @keyframes text-shimmer {
            0% { background-position: 0% center; }
            100% { background-position: 200% center; }
          }
          * { box-sizing: border-box; }
          .landing-grid {
  position: fixed;
  inset: 0;
  background-image: linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
  z-index: 0;
}
        `}
      </style>

      {/* Two fixed glow spheres */}
      <div style={{ position: "fixed", width: 900, height: 900, borderRadius: "50%", background: "radial-gradient(circle, rgba(204,255,0,0.18) 0%, transparent 70%)", filter: "blur(90px)", top: -280, left: -220, zIndex: 0, pointerEvents: "none" }} />
      <div style={{ position: "fixed", width: 760, height: 760, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%)", filter: "blur(90px)", bottom: -260, right: -260, zIndex: 0, pointerEvents: "none" }} />
      <div style={{ position: "fixed", width: 460, height: 460, borderRadius: "50%", background: "radial-gradient(circle, rgba(204,255,0,0.12) 0%, transparent 70%)", filter: "blur(85px)", top: "28%", left: "72%", zIndex: 0, pointerEvents: "none" }} />
      <div style={{ position: "fixed", width: 410, height: 410, borderRadius: "50%", background: "radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)", filter: "blur(85px)", top: "68%", left: "10%", zIndex: 0, pointerEvents: "none" }} />
<div className="landing-grid" />
      {/* (1) Floating Shell */}
      <div style={{
        position: "relative",
        zIndex: 1,
        width: "100%",
        maxWidth: 1600,
        background:
          "radial-gradient(1200px circle at 20% 0%, rgba(204,255,0,0.08), rgba(12,12,12,0) 60%)," +
          "radial-gradient(900px circle at 90% 30%, rgba(16,185,129,0.10), rgba(12,12,12,0) 60%)," +
          "#0c0c0c",
        borderRadius: radius,
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow: `0 0 0 1px rgba(255,255,255,0.06), 0 30px 100px rgba(0,0,0,0.78), 0 0 70px rgba(204,255,0,0.06)`,
        overflow: "hidden"
      }}>

        {/* (2) Navbar */}
        <nav style={{
          position: "sticky",
          top: 0,
          padding: "24px 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 50,
          background: "rgba(12,12,12,0.72)",
          backdropFilter: "blur(18px)",
          borderBottom: "1px solid rgba(255,255,255,0.08)"
        }}>
          {/* Left */}
          <div style={{ width: 36, height: 36, background: "linear-gradient(180deg, #ccff00, #a6ff00)", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono', monospace", fontWeight: 900, color: "#000", fontSize: 16, boxShadow: "0 0 40px rgba(204,255,0,0.22)" }}>
            FF
          </div>

          {/* Center */}
          <div style={{
            background: glassBgSoft,
            backdropFilter: "blur(20px)",
            border: `1px solid rgba(255,255,255,0.12)`,
            borderRadius: 100,
            padding: "8px 24px",
            display: "flex",
            gap: 32
          }}>
            {['Features', 'How It Works', 'Get Started'].map(text => (
              <a key={text} href="#" style={{
                color: "rgba(255,255,255,0.7)",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 13,
                textDecoration: "none"
                ,transition: transition
              }}>
                {text}
              </a>
            ))}
          </div>

          {/* Right */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, background: glassBgSoft, padding: "6px 12px", borderRadius: 100, border: "1px solid rgba(255,255,255,0.10)", backdropFilter: "blur(20px)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.16)" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#ccff00", animation: "pulse-dot 2s infinite" }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.6)" }}>System Normal</span>
            </div>
            <button onClick={onRegister} style={{
              background: "linear-gradient(135deg, #ffffff, #e6ff7a)",
              color: "#000",
              border: "none",
              borderRadius: 100,
              padding: "10px 20px",
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer"
              ,boxShadow: "0 0 40px rgba(204,255,0,0.18)",
              transition: transition
            }}>
              Start Free →
            </button>
          </div>
        </nav>

        {/* (3) Hero Section */}
        <section style={{
          display: "grid",
          gridTemplateColumns: "7fr 5fr",
          minHeight: "90vh",
          alignItems: "center",
          gap: 60,
          padding: "120px 60px 80px"
        }}>
          {/* Left Side */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(204,255,0,0.08)", border: "1px solid rgba(204,255,0,0.24)", borderRadius: 100, padding: "6px 16px", marginBottom: 32, backdropFilter: "blur(18px)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 0 30px rgba(204,255,0,0.10)" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#ccff00", animation: "pulse-dot 2s infinite" }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: "#ccff00" }}>
                AI-Powered Learning System
              </span>
            </div>

            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(4rem, 8vw, 7.5rem)", fontWeight: 700, lineHeight: 0.85, letterSpacing: "-0.06em", color: "#ebebeb", marginBottom: 32, textShadow: "0 0 50px rgba(204,255,0,0.05)" }}>
            <div style={{ marginBottom: 32 }}>
              <div><CharStagger text="Master" delay={0.2} /></div>
              <div style={{ fontStyle: "italic" }}>
                <CharStagger text="Anything" delay={0.5} shimmer={true} />
              </div>
              <div><CharStagger text="Faster." delay={0.9} /></div>
            </div>
            </div>

            <div style={{ fontSize: 18, color: "rgba(235,235,235,0.6)", maxWidth: 520, margin: "0 0 24px 0", lineHeight: 1.5, fontFamily: "'Space Grotesk', sans-serif" }}>
              <WordSlide text="Build flashcard decks, study with AI-powered game modes, and track your mastery with real analytics." delay={1.1} />
            </div>

            <div style={{ fontFamily: "'JetBrains Mono', monospace", color: "rgba(235,235,235,0.3)", marginBottom: 40, letterSpacing: "0.1em", fontSize: 14 }}>
              <ScrambleText text="// learn smarter, not harder" delay={1.8} />
            </div>

            <div style={{ display: "flex", gap: 16, marginBottom: 60 }}>
               <motion.button
                onClick={onRegister}
                whileHover={{ scale: 1.04, boxShadow: glow60 }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                style={{ background: "#ccff00", color: "#000", fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, padding: "16px 36px", border: "none", borderRadius: 100, cursor: "pointer", boxShadow: "0 0 30px rgba(204,255,0,0.28)", transition: transition }}>
                 Start Learning Free →
               </motion.button>
               <button onClick={onLogin} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)", fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 500, padding: "16px 36px", borderRadius: 100, cursor: "pointer", transition: "background 0.2s, color 0.2s" }} onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "#fff"; }} onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}>
                 Sign In
               </button>
            </div>

            <div style={{ display: "flex", gap: 48 }}>
               {[
                 { target: 10000, suffix: "+", label: "Cards Created" },
                 { target: 500, suffix: "+", label: "Active Learners" },
                 { target: 98, suffix: "%", label: "Satisfaction" }
               ].map((s, i) => (
                 <div key={i}>
                   <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 28, fontWeight: 700, color: "#ccff00" }}>
                     <CountUp target={s.target} suffix={s.suffix} />
                   </div>
                   <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "rgba(235,235,235,0.4)", marginTop: 6 }}>
                     {s.label}
                   </div>
                 </div>
               ))}
            </div>

          </div>

          {/* Right Side Mockup */}
          <div style={{ position: "relative", width: "100%", height: 420 }}>
            {/* glassmorphism mockup shell */}
            <div style={{
              background:
                "radial-gradient(600px circle at 20% 10%, rgba(204,255,0,0.14), rgba(255,255,255,0) 55%)," +
                "radial-gradient(520px circle at 80% 30%, rgba(16,185,129,0.14), rgba(255,255,255,0) 55%)," +
                glassBg,
              backdropFilter: "blur(20px)",
              border: `1px solid ${glassBorder}`,
              borderRadius: "2.25rem",
              boxShadow: glassShadowBase,
              padding: 32, position: "relative", height: "100%", width: "100%",
              animation: "float-shell 6s ease-in-out infinite",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              
              {/* stacked mini flashcard divs */}
              {[
                { rot: "-6deg", delay: "-2s", z: 1, top: "8%", q: "What is the powerhouse of the cell?", a: "Mitochondria" },
                { rot: "4deg", delay: "-4s", z: 2, top: "25%", q: "Define HTTP in networking.", a: "Hypertext Transfer Protocol" },
                { rot: "-2deg", delay: "0s", z: 3, top: "42%", q: "How do you close a tag in HTML?", a: "</tag>" }
              ].map((c, i) => (
                 <div key={i} style={{
                   position: "absolute",
                   top: c.top, left: "12%", right: "12%",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "1.25rem",
                   padding: "16px 20px",
                   "--rot": c.rot,
                   animation: `float-anim 6s ease-in-out infinite`,
                   animationDelay: c.delay,
                   zIndex: c.z,
                  backdropFilter: "blur(18px)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.20), 0 18px 55px rgba(0,0,0,0.35)"
                 }}>
                   <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>Q:</div>
                   <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, color: "#fff", marginBottom: 16 }}>{c.q}</div>
                   <div style={{ height: 1, background: "rgba(255,255,255,0.1)", marginBottom: 12 }} />
                   <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "rgba(204,255,0,0.8)", marginBottom: 8 }}>A:</div>
                   <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, color: "#fff" }}>{c.a}</div>
                 </div>
              ))}

              {/* AI Cursor Label */}
              <div style={{
                background: "#ccff00", color: "#000", fontFamily: "'JetBrains Mono', monospace", fontSize: 10,
                textTransform: "uppercase", borderRadius: 100, padding: "6px 14px",
                position: "absolute", top: 20, right: 20, display: "flex", alignItems: "center", gap: 6, zIndex: 10
                ,boxShadow: "0 0 40px rgba(204,255,0,0.25)"
              }}>
                AI Cursor ✦
                <span style={{ width: 2, height: 10, background: "#000", animation: "blink 1s infinite" }} />
              </div>
            </div>
          </div>
        </section>

        {/* (4) Bento Grid Features */}
        <section style={{ padding: "80px 60px", background: "radial-gradient(800px circle at 10% 0%, rgba(204,255,0,0.06), rgba(12,12,12,0) 55%), radial-gradient(700px circle at 90% 40%, rgba(16,185,129,0.08), rgba(12,12,12,0) 60%), #0c0c0c" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", color: "#ccff00", fontSize: 12, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.1em" }}>Features</div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "2.5rem", color: "#fff", margin: 0 }}>
              Everything you need to <span style={{
                fontStyle: "italic",
                backgroundImage: "linear-gradient(135deg, #ccff00, #ffffff)",
                backgroundSize: "200% auto",
                backgroundPosition: "0% center",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "text-shimmer 3.2s linear infinite",
                padding: "0.2em 0.15em",
                margin: "-0.2em -0.15em"
              }}>learn fast</span>
            </h2>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gridAutoRows: "minmax(180px, auto)",
            gap: 16
          }}>
            {/* Card 1 */}
            <div style={{
              gridColumn: "span 2", gridRow: "span 2",
              background: glassBgSoft, backdropFilter: "blur(20px)",
              border: `1px solid rgba(255,255,255,0.12)`,
              borderRadius: radius, padding: 28, transition: transition,
              display: "flex", flexDirection: "column", justifyContent: "space-between"
              ,transform: "translateY(0px) scale(1)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.16), 0 20px 60px rgba(0,0,0,0.35)"
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(204,255,0,0.38)"; e.currentTarget.style.boxShadow = glassShadowHover; e.currentTarget.style.transform = "translateY(-6px) scale(1.03)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.16), 0 20px 60px rgba(0,0,0,0.35)"; e.currentTarget.style.transform = "translateY(0px) scale(1)"; }}
            >
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 24 }}>Progress Tracking</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 100 }}>
                {["30%", "60%", "45%", "80%", "55%", "90%", "40%", "70%"].map((h, i) => (
                  <div key={i} style={{ width: "100%", height: h, background: "linear-gradient(to top, rgba(204,255,0,0.3), #ccff00)", borderRadius: 4 }} />
                ))}
              </div>
            </div>

            {/* Card 2 */}
            <div style={{
              gridColumn: "span 1", gridRow: "span 2",
              background: glassBgSoft, backdropFilter: "blur(20px)",
              border: `1px solid rgba(255,255,255,0.12)`,
              borderRadius: radius, padding: 28, transition: transition,
              display: "flex", flexDirection: "column"
              ,transform: "translateY(0px) scale(1)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.16), 0 20px 60px rgba(0,0,0,0.35)"
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(204,255,0,0.38)"; e.currentTarget.style.boxShadow = glassShadowHover; e.currentTarget.style.transform = "translateY(-6px) scale(1.03)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.16), 0 20px 60px rgba(0,0,0,0.35)"; e.currentTarget.style.transform = "translateY(0px) scale(1)"; }}
            >
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 24 }}>Study Modes</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1, justifyContent: "center" }}>
                {[
                  { label: "MCQ", color: "#6366f1" },
                  { label: "True/False", color: "#10b981" },
                  { label: "Survival", color: "#ff4757" },
                  { label: "Timed", color: "#f59e0b" }
                ].map((m, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.03)", padding: "10px 16px", borderRadius: 100, border: "1px solid rgba(255,255,255,0.05)" }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: m.color }} />
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "#fff" }}>{m.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3 */}
            <div style={{
              gridColumn: "span 1", gridRow: "span 1",
              background:
                "linear-gradient(135deg, rgba(204,255,0,1), rgba(16,185,129,0.25))",
              color: "#000",
              borderRadius: radius, padding: 28, position: "relative", overflow: "hidden",
              display: "flex", flexDirection: "column", justifyContent: "center",
              transition: transition,
              boxShadow: "0 0 50px rgba(204,255,0,0.20), inset 0 1px 0 rgba(255,255,255,0.25)",
              transform: "translateY(0px) scale(1)"
            }}>
              <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.35), transparent 55%)", opacity: 0.35 }} />
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.08, pointerEvents: "none" }}>
                <filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" /></filter>
                <rect width="100%" height="100%" filter="url(#noiseFilter)" />
              </svg>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, marginBottom: 8 }}>AI Powered ⚡</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, fontWeight: 500, lineHeight: 1.4 }}>Generate 10 cards from any topic instantly</div>
              </div>
              <div
                onMouseEnter={(e) => {
                  e.currentTarget.parentElement.style.transform = "translateY(-6px) scale(1.03)";
                  e.currentTarget.parentElement.style.boxShadow = "0 0 70px rgba(204,255,0,0.35), inset 0 1px 0 rgba(255,255,255,0.25)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.parentElement.style.transform = "translateY(0px) scale(1)";
                  e.currentTarget.parentElement.style.boxShadow = "0 0 50px rgba(204,255,0,0.20), inset 0 1px 0 rgba(255,255,255,0.25)";
                }}
                style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "auto" }}
              />
            </div>

            {/* Card 4 */}
            <div style={{
              gridColumn: "span 2", gridRow: "span 1",
              background: glassBgSoft, backdropFilter: "blur(20px)",
              border: `1px solid rgba(255,255,255,0.12)`,
              borderRadius: radius, padding: 28, transition: transition,
              display: "flex", flexDirection: "column", justifyContent: "center"
              ,transform: "translateY(0px) scale(1)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.16), 0 20px 60px rgba(0,0,0,0.35)"
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(204,255,0,0.38)"; e.currentTarget.style.boxShadow = glassShadowHover; e.currentTarget.style.transform = "translateY(-6px) scale(1.03)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.16), 0 20px 60px rgba(0,0,0,0.35)"; e.currentTarget.style.transform = "translateY(0px) scale(1)"; }}
            >
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 16 }}>Streak System 🔥</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {Array.from({ length: 30 }).map((_, i) => (
                  <div key={i} style={{
                    width: 16, height: 16, borderRadius: 4,
                    background: (i % 5 === 0 || i % 7 === 0) ? "#ccff00" : "rgba(255,255,255,0.05)"
                  }} />
                ))}
              </div>
            </div>

            {/* Card 5 */}
            <div style={{
              gridColumn: "span 2", gridRow: "span 1",
              background: glassBgSoft, backdropFilter: "blur(20px)",
              border: `1px solid rgba(255,255,255,0.12)`,
              borderRadius: radius, padding: 28, transition: transition,
              display: "flex", flexDirection: "column", justifyContent: "center"
              ,transform: "translateY(0px) scale(1)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.16), 0 20px 60px rgba(0,0,0,0.35)"
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(204,255,0,0.38)"; e.currentTarget.style.boxShadow = glassShadowHover; e.currentTarget.style.transform = "translateY(-6px) scale(1.03)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.boxShadow = "inset 0 1px 0 rgba(255,255,255,0.16), 0 20px 60px rgba(0,0,0,0.35)"; e.currentTarget.style.transform = "translateY(0px) scale(1)"; }}
            >
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 16 }}>XP and Levels ⚡</div>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, fontWeight: 700, color: "#ccff00" }}>Scholar</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "rgba(255,255,255,0.6)" }}>1000 / 1400</span>
                </div>
                <div style={{ width: "100%", height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 100, overflow: "hidden" }}>
                  <div style={{ width: "65%", height: "100%", background: "linear-gradient(90deg, #ccff00, #10b981)", borderRadius: 100 }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* (5) Contrast Methodology Section */}
        <section style={{
          background:
            "radial-gradient(900px circle at 15% 0%, rgba(204,255,0,0.10), rgba(0,0,0,0) 55%)," +
            "radial-gradient(800px circle at 90% 35%, rgba(16,185,129,0.12), rgba(0,0,0,0) 60%)," +
            "rgba(255,255,255,0.02)",
          color: "#ebebeb",
          borderTopLeftRadius: radius, borderTopRightRadius: radius,
          padding: "80px 60px"
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#ccff00", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 16, fontWeight: 700 }}>How It Works</div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "3rem", fontWeight: 700, letterSpacing: "-0.05em", color: "#ebebeb", margin: "0 0 40px 0", lineHeight: 1.1 }}>Three steps to mastery</h2>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                {[
                  { num: "01", title: "Create a Deck", desc: "Organize your knowledge into decks by subject, chapter, or topic." },
                  { num: "02", title: "Add Cards or Use AI", desc: "Write your own Q&A cards or let AI generate them from any topic." },
                  { num: "03", title: "Review & Master", desc: "Study with game modes, track your XP, and watch your confidence grow." }
                ].map((s, i) => (
                   <div key={i} style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                     <div style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.14)", background: "rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono', monospace", fontSize: 14, fontWeight: 700, color: "#ebebeb", flexShrink: 0, boxShadow: "inset 0 1px 0 rgba(255,255,255,0.14)" }}>
                       {s.num}
                     </div>
                     <div>
                       <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: 18, marginBottom: 4 }}>{s.title}</div>
                       <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 14, color: "rgba(235,235,235,0.66)", lineHeight: 1.5 }}>{s.desc}</div>
                     </div>
                   </div>
                ))}
              </div>
            </div>
            
            <div style={{ position: "relative", display: "inline-block", margin: "0 auto", textAlign: "center" }}>
              <div style={{ width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle at 30% 20%, rgba(204,255,0,0.18), rgba(0,0,0,0) 55%), radial-gradient(circle at 70% 30%, rgba(16,185,129,0.18), rgba(0,0,0,0) 55%), linear-gradient(135deg, #1a1a1a, #2a2a2a)", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80, margin: "0 auto", boxShadow: "0 0 70px rgba(204,255,0,0.10), inset 0 1px 0 rgba(255,255,255,0.10)" }}>
                🎓
              </div>
              <div style={{
                position: "absolute", bottom: -20, left: "50%", transform: "translateX(-50%)", width: 280,
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "1rem", padding: 20,
                boxShadow: "0 20px 70px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.18)",
                textAlign: "left"
              }}>
                <div style={{ fontSize: 12, color: "#ccff00", letterSpacing: 2 }}>★★★★★</div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 13, color: "#ebebeb", margin: "8px 0", fontWeight: 500, lineHeight: 1.4 }}>
                  "FlashForge completely changed how I study. The AI generator saves me hours of prep time!"
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "rgba(0,0,0,0.5)" }}>Alex M.</div>
              </div>
            </div>
          </div>
        </section>

        {/* (6) Footer */}
        <section style={{ background: "radial-gradient(800px circle at 10% 10%, rgba(204,255,0,0.08), rgba(0,0,0,0) 55%), radial-gradient(700px circle at 90% 30%, rgba(16,185,129,0.10), rgba(0,0,0,0) 60%), #000000", padding: "80px 60px 40px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 0 }}>
            <span style={{ fontSize: "10rem", fontWeight: 900, color: "rgba(255,255,255,0.03)", letterSpacing: "-0.06em", whiteSpace: "nowrap", fontFamily: "'Space Grotesk', sans-serif" }}>
              FLASHFORGE
            </span>
          </div>
          
          <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", color: "#ccff00", fontSize: 12, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 16 }}>Start Learning Today</div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "3rem", fontWeight: 700, color: "#ebebeb", letterSpacing: "-0.05em", margin: "0 0 40px 0" }}>Ready to master anything?</h2>
            <motion.button 
              onClick={onRegister}
              whileHover={{ scale: 1.04, boxShadow: "0 0 60px rgba(204,255,0,0.5)" }}
              style={{
                background: "#ccff00", color: "#000", fontWeight: 700, fontSize: 18,
                borderRadius: 100, padding: "18px 56px", border: "none", cursor: "pointer",
                boxShadow: "0 0 40px rgba(204,255,0,0.3)", fontFamily: "'Space Grotesk', sans-serif",
                transition: transition
              }}
            >
              Start Free →
            </motion.button>
          </div>
          
          <div style={{ position: "relative", zIndex: 1, marginTop: 60, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 40, alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 40 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {["Privacy Policy", "Terms of Service", "Contact Us"].map(l => (
                <a key={l} href="#" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "rgba(235,235,235,0.25)", textDecoration: "none", transition: "color 0.25s, text-shadow 0.25s" }} onMouseEnter={e => { e.currentTarget.style.color = "rgba(204,255,0,0.75)"; e.currentTarget.style.textShadow = "0 0 20px rgba(204,255,0,0.18)"; }} onMouseLeave={e => { e.currentTarget.style.color = "rgba(235,235,235,0.25)"; e.currentTarget.style.textShadow = "none"; }}>
                  {l}
                </a>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
              {["🐙", "𝕏", "in"].map(icon => (
                <div key={icon} style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: "rgba(235,235,235,0.4)", cursor: "pointer", transition: transition, background: "rgba(255,255,255,0.02)" }} onMouseEnter={e => { e.currentTarget.style.borderColor = "#ccff00"; e.currentTarget.style.color = "#ccff00"; e.currentTarget.style.boxShadow = "0 0 40px rgba(204,255,0,0.18)"; }} onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; e.currentTarget.style.color = "rgba(235,235,235,0.4)"; e.currentTarget.style.boxShadow = "none"; }}>
                  {icon}
                </div>
              ))}
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: "rgba(235,235,235,0.2)", textAlign: "right" }}>
              © 2025 FlashForge. Built for learners.
            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

import { getLevelInfo } from "../utils/xp"

export default function Navbar({ view, setView, stats, xp, user, onLogout }) {
  const { current, next, progress } = getLevelInfo(xp)

  const navItems = [
    { id: "dashboard", icon: "◈", label: "Decks" },
    { id: "create",    icon: "+", label: "Create" },
    { id: "analytics", icon: "↗", label: "Analytics" },
  ]

  return (
    <nav className="navbar" style={{ flexWrap: "wrap", gap: 10 }}>
      {/* Brand */}
      <div className="nav-brand">
        <div className="brand-logo-box">FF</div>
        <span style={{ letterSpacing: "-0.06em" }}>FlashForge</span>
      </div>

      {/* Pill nav */}
      <div className="nav-pill-group">
        {navItems.map(item => (
          <button key={item.id} className={`nav-pill-btn ${view === item.id ? "active" : ""}`} onClick={() => setView(item.id)}>
            <span style={{ fontFamily: "monospace", fontSize: 12 }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </div>

      {/* Right: XP + user */}
      <div className="nav-right" style={{ gap: 16 }}>
        {/* XP bar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 3, minWidth: 120 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: "#ccff00", textTransform: "uppercase", letterSpacing: "0.1em" }}>{current.name}</span>
            <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 9, color: "rgba(235,235,235,0.3)", letterSpacing: "0.05em" }}>{xp} XP</span>
          </div>
          <div style={{ height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 100, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg,#ccff00,#10b981)", borderRadius: 100, transition: "width 0.8s ease" }} />
          </div>
        </div>

        {/* Streak */}
        <div className="system-status">
          <div className="status-dot" />
          <span>🔥 {stats.streak}d</span>
        </div>

        {/* Avatar + logout */}
        {user && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(204,255,0,0.15)", border: "1px solid rgba(204,255,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 13, color: "#ccff00" }}>
              {user.avatar || user.name.charAt(0).toUpperCase()}
            </div>
            <button onClick={onLogout} style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 100, padding: "5px 12px", color: "rgba(235,235,235,0.4)", fontFamily: "'Space Grotesk',sans-serif", fontSize: 12, cursor: "pointer" }}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}

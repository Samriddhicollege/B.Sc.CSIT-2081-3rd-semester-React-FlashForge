import { useState } from "react"
import { motion } from "framer-motion"
import { register, login, setCurrentUser } from "../utils/auth"
import { CharStagger, FadeInUp } from "../components/ui/TextAnimations"

function InputField({ label, type, value, onChange, placeholder, error }) {
  const [show, setShow] = useState(false)
  const isPassword = type === "password"
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
      <label style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(235,235,235,0.3)" }}>{label}</label>
      <div style={{ position: "relative" }}>
        <input
          type={isPassword && show ? "text" : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{
            width: "100%", background: "rgba(255,255,255,0.03)", border: `1px solid ${error ? "#ff4757" : "rgba(255,255,255,0.08)"}`,
            borderRadius: "0.75rem", padding: "12px 14px", color: "#ebebeb",
            fontFamily: "'Space Grotesk',sans-serif", fontSize: 14,
            outline: "none", transition: "all 0.2s", boxSizing: "border-box",
            paddingRight: isPassword ? 44 : 14,
          }}
          onFocus={e => { e.target.style.borderColor = "rgba(204,255,0,0.4)"; e.target.style.boxShadow = "0 0 0 3px rgba(204,255,0,0.08)" }}
          onBlur={e => { e.target.style.borderColor = error ? "#ff4757" : "rgba(255,255,255,0.08)"; e.target.style.boxShadow = "none" }}
        />
        {isPassword && (
          <button type="button" onClick={() => setShow(s => !s)}
            style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(235,235,235,0.3)", fontSize: 14 }}>
            {show ? "🙈" : "👁"}
          </button>
        )}
      </div>
      {error && <p style={{ fontSize: 12, color: "#ff4757", margin: 0 }}>{error}</p>}
    </div>
  )
}

export function LoginPage({ onSuccess, onGoRegister, onBack }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [remember, setRemember] = useState(false)
  const [errors, setErrors] = useState({})
  const [globalErr, setGlobalErr] = useState("")

  const validate = () => {
    const e = {}
    if (!email.trim()) e.email = "Email is required."
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Invalid email format."
    if (!password) e.password = "Password is required."
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    const result = login(email, password)
    if (result.error) { setGlobalErr(result.error); return }
    setCurrentUser(result.user)
    if (remember) localStorage.setItem("ff_remember", email)
    onSuccess(result.user)
  }

  return (
    <AuthShell>
      <FadeInUp delay={0.1}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: "#ccff00", marginBottom: 12 }}>Welcome back</div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, letterSpacing: "-0.06em", color: "#ebebeb" }}>
            <CharStagger text="Sign In" delay={0.2} />
          </h1>
        </div>
      </FadeInUp>

      <FadeInUp delay={0.3}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <InputField label="Email" type="email" value={email} onChange={e => { setEmail(e.target.value); setGlobalErr("") }} placeholder="you@example.com" error={errors.email} />
          <InputField label="Password" type="password" value={password} onChange={e => { setPassword(e.target.value); setGlobalErr("") }} placeholder="Your password" error={errors.password} />

          <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
            <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)}
              style={{ accentColor: "#ccff00", width: 15, height: 15 }} />
            <span style={{ fontSize: 13, color: "rgba(235,235,235,0.5)", fontFamily: "'Space Grotesk',sans-serif" }}>Remember me</span>
          </label>

          {globalErr && <p style={{ fontSize: 13, color: "#ff4757", textAlign: "center", background: "rgba(255,71,87,0.08)", border: "1px solid rgba(255,71,87,0.2)", borderRadius: 10, padding: "10px 14px" }}>{globalErr}</p>}

          <button onClick={handleSubmit}
            style={{ background: "#ccff00", border: "none", borderRadius: 100, padding: "13px 24px", color: "#000", fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 0 24px rgba(204,255,0,0.25)", marginTop: 4 }}>
            Sign In →
          </button>
        </div>
      </FadeInUp>

      <FadeInUp delay={0.5}>
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <span style={{ fontSize: 14, color: "rgba(235,235,235,0.4)", fontFamily: "'Space Grotesk',sans-serif" }}>
            Don't have an account?{" "}
            <button onClick={onGoRegister} style={{ background: "none", border: "none", color: "#ccff00", cursor: "pointer", fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600 }}>
              Register
            </button>
          </span>
        </div>
        <div style={{ textAlign: "center", marginTop: 12 }}>
          <button onClick={onBack} style={{ background: "none", border: "none", color: "rgba(235,235,235,0.3)", cursor: "pointer", fontFamily: "'Space Grotesk',sans-serif", fontSize: 13 }}>
            ← Back to home
          </button>
        </div>
      </FadeInUp>
    </AuthShell>
  )
}

export function RegisterPage({ onSuccess, onGoLogin, onBack }) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [errors, setErrors] = useState({})
  const [globalErr, setGlobalErr] = useState("")

  const validate = () => {
    const e = {}
    if (!name.trim()) e.name = "Name is required."
    if (!email.trim()) e.email = "Email is required."
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Invalid email."
    if (!password) e.password = "Password is required."
    else if (password.length < 8) e.password = "Minimum 8 characters."
    if (password !== confirm) e.confirm = "Passwords do not match."
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    const result = register(name, email, password)
    if (result.error) { setGlobalErr(result.error); return }
    setCurrentUser(result.user)
    onSuccess(result.user)
  }

  return (
    <AuthShell>
      <FadeInUp delay={0.1}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.2em", color: "#ccff00", marginBottom: 12 }}>Create account</div>
          <h1 style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 700, letterSpacing: "-0.06em", color: "#ebebeb" }}>
            <CharStagger text="Get Started" delay={0.2} />
          </h1>
        </div>
      </FadeInUp>

      <FadeInUp delay={0.3}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <InputField label="Full Name" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Alex Johnson" error={errors.name} />
          <InputField label="Email" type="email" value={email} onChange={e => { setEmail(e.target.value); setGlobalErr("") }} placeholder="you@example.com" error={errors.email} />
          <InputField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 8 characters" error={errors.password} />
          <InputField label="Confirm Password" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repeat password" error={errors.confirm} />

          {globalErr && <p style={{ fontSize: 13, color: "#ff4757", textAlign: "center", background: "rgba(255,71,87,0.08)", border: "1px solid rgba(255,71,87,0.2)", borderRadius: 10, padding: "10px 14px" }}>{globalErr}</p>}

          <button onClick={handleSubmit}
            style={{ background: "#ccff00", border: "none", borderRadius: 100, padding: "13px 24px", color: "#000", fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, fontWeight: 700, cursor: "pointer", boxShadow: "0 0 24px rgba(204,255,0,0.25)", marginTop: 4 }}>
            Create Account →
          </button>
        </div>
      </FadeInUp>

      <FadeInUp delay={0.5}>
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <span style={{ fontSize: 14, color: "rgba(235,235,235,0.4)", fontFamily: "'Space Grotesk',sans-serif" }}>
            Already have an account?{" "}
            <button onClick={onGoLogin} style={{ background: "none", border: "none", color: "#ccff00", cursor: "pointer", fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, fontWeight: 600 }}>
              Sign In
            </button>
          </span>
        </div>
        <div style={{ textAlign: "center", marginTop: 12 }}>
          <button onClick={onBack} style={{ background: "none", border: "none", color: "rgba(235,235,235,0.3)", cursor: "pointer", fontFamily: "'Space Grotesk',sans-serif", fontSize: 13 }}>
            ← Back to home
          </button>
        </div>
      </FadeInUp>
    </AuthShell>
  )
}

function AuthShell({ children }) {
  return (
    <div style={{ minHeight: "100vh", background: "#000", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, position: "relative" }}>
      <div style={{ position: "fixed", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.025) 1px,transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
      <div style={{ position: "fixed", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle,rgba(204,255,0,0.07) 0%,transparent 70%)", filter: "blur(80px)", top: -150, left: -100, pointerEvents: "none" }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: "100%", maxWidth: 440, background: "rgba(255,255,255,0.02)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "2rem", padding: "40px 36px", position: "relative", zIndex: 1 }}
      >
        {/* Brand */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 32, height: 32, background: "#ccff00", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'JetBrains Mono',monospace", fontWeight: 900, color: "#000", fontSize: 12 }}>FF</div>
            <span style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 16, letterSpacing: "-0.05em", color: "#ebebeb" }}>FlashForge</span>
          </div>
        </div>
        {children}
      </motion.div>
    </div>
  )
}

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"

// 1. Character Stagger — each letter animates in from below with blur
export function CharStagger({ text, className, delay = 0, stagger = 0.03, shimmer = false }) {
  const chars = text.split("")
  const shimmerStyle = {
    backgroundImage: "linear-gradient(135deg, #ccff00, #ffffff)",
    backgroundSize: "200% auto",
    backgroundPosition: "0% center",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: "text-shimmer 3.2s linear infinite",
    padding: "0.2em 0.15em",
    margin: "-0.2em -0.15em"
  }
  return (
    <span className={className} style={{ display: "inline-flex", flexWrap: "wrap" }}>
      {chars.map((ch, i) => (
        <motion.span
          key={i}
          initial={{ y: 40, opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{ delay: delay + i * stagger, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          style={{ 
            display: "inline-block", 
            whiteSpace: ch === " " ? "pre" : "normal",
            ...(shimmer ? shimmerStyle : {}) 
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </motion.span>
      ))}
    </span>
  )
}

// 2. Word Slide Up — words slide up staggered
export function WordSlide({ text, className, delay = 0, stagger = 0.08 }) {
  const words = text.split(" ")
  return (
    <span className={className} style={{ display: "inline-flex", flexWrap: "wrap", gap: "0.3em" }}>
      {words.map((word, i) => (
        <span key={i} style={{ overflow: "hidden", display: "inline-block" }}>
          <motion.span
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: delay + i * stagger, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            style={{ display: "inline-block" }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}

// 3. Scramble Text — hacker-style decode effect
export function ScrambleText({ text, className, delay = 0 }) {
  const [displayed, setDisplayed] = useState("")
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%"
  const started = useRef(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      let iteration = 0
      const interval = setInterval(() => {
        setDisplayed(
          text.split("").map((ch, i) => {
            if (i < iteration) return ch
            if (ch === " ") return " "
            return chars[Math.floor(Math.random() * chars.length)]
          }).join("")
        )
        iteration += 0.5
        if (iteration >= text.length) {
          clearInterval(interval)
          setDisplayed(text)
        }
      }, 40)
      return () => clearInterval(interval)
    }, delay * 1000)
    return () => clearTimeout(timeout)
  }, [text, delay])

  return <span className={className}>{displayed || text.replace(/./g, "█")}</span>
}

// 4. Count Up — number counts from 0 to target when in view
export function CountUp({ target, suffix = "", className, duration = 2 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const start = Date.now()
    const tick = () => {
      const elapsed = (Date.now() - start) / (duration * 1000)
      const ease = 1 - Math.pow(1 - Math.min(elapsed, 1), 3)
      setCount(Math.floor(ease * target))
      if (elapsed < 1) requestAnimationFrame(tick)
      else setCount(target)
    }
    requestAnimationFrame(tick)
  }, [inView, target, duration])

  return <span ref={ref} className={className}>{count.toLocaleString()}{suffix}</span>
}

// 5. Gradient Shimmer text
export function GradientText({ text, className }) {
  return (
    <span className={`gradient-shimmer ${className || ""}`}>{text}</span>
  )
}

// 6. Fade In Up (simple reusable)
export function FadeInUp({ children, delay = 0, className }) {
  return (
    <motion.div
      className={className}
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

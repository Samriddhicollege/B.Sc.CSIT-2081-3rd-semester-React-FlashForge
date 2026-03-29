import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import LandingPage from "./pages/LandingPage"
import { LoginPage, RegisterPage } from "./pages/AuthPages"
import AnalyticsPage from "./pages/AnalyticsPage"
import Dashboard from "./components/Dashboard"
import CreateCard from "./components/CreateCard"
import ReviewMode from "./components/ReviewMode"
import Navbar from "./components/Navbar"
import GameModeModal from "./components/GameModeModal"
import { LevelUpOverlay } from "./components/ui/LevelUpOverlay"
import { getCurrentUser, setCurrentUser, clearCurrentUser, getUserData, setUserData } from "./utils/auth"
import { getLevelInfo, XP_VALUES } from "./utils/xp"
import "./App.css"

const pv = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -16 } }
const pt = { duration: 0.3, ease: [0.4, 0, 0.2, 1] }

export default function App() {
  const [screen, setScreen] = useState("landing")
  const [user, setUser] = useState(null)
  const [view, setView] = useState("dashboard")
  const [decks, setDecks] = useState([])
  const [sessions, setSessions] = useState([])
  const [stats, setStats] = useState({ totalReviewed: 0, streak: 0, lastDate: null })
  const [xp, setXp] = useState(0)
  const [reviewDeck, setReviewDeck] = useState(null)
  const [showModeModal, setShowModeModal] = useState(false)
  const [gameMode, setGameMode] = useState("mcq")
  const [inReview, setInReview] = useState(false)
  const [levelUpName, setLevelUpName] = useState(null)

  useEffect(() => {
    const u = getCurrentUser()
    if (u) { setUser(u); loadUserData(u.id); setScreen("app") }
  }, [])

  const loadUserData = (uid) => {
    setDecks(getUserData(uid, "decks", []))
    setStats(getUserData(uid, "stats", { totalReviewed: 0, streak: 0, lastDate: null }))
    setXp(getUserData(uid, "xp", 0))
    setSessions(getUserData(uid, "sessions", []))
  }

  const saveDecks = (uid, data) => { setDecks(data); setUserData(uid, "decks", data) }
  const saveStats = (uid, data) => { setStats(data); setUserData(uid, "stats", data) }
  const saveXp = (uid, newXp) => {
    const oldLevel = getLevelInfo(xp).current.level
    const newLevel = getLevelInfo(newXp).current.level
    setXp(newXp); setUserData(uid, "xp", newXp)
    if (newLevel > oldLevel) setLevelUpName(getLevelInfo(newXp).current.name)
  }
  const saveSessions = (uid, data) => { setSessions(data); setUserData(uid, "sessions", data) }

  const handleLogin = (u) => { setUser(u); loadUserData(u.id); setCurrentUser(u); setScreen("app") }
  const handleLogout = () => { clearCurrentUser(); setUser(null); setDecks([]); setStats({ totalReviewed: 0, streak: 0, lastDate: null }); setXp(0); setSessions([]); setScreen("landing") }

  const handleCreateDeck = (deck) => saveDecks(user.id, [...decks, deck])
  const handleAddCard = (deckId, cardOrCards) => {
    const newCards = Array.isArray(cardOrCards) ? cardOrCards : [cardOrCards];
    saveDecks(user.id, decks.map(d => d.id === deckId ? { ...d, cards: [...d.cards, ...newCards] } : d));
  }
  const handleDeleteDeck = (deckId) => saveDecks(user.id, decks.filter(d => d.id !== deckId))
  const handleDeleteCard = (deckId, cardId) => saveDecks(user.id, decks.map(d => d.id === deckId ? { ...d, cards: d.cards.filter(c => c.id !== cardId) } : d))
  const handleUpdateCard = (deckId, updated) => saveDecks(user.id, decks.map(d => d.id === deckId ? { ...d, cards: d.cards.map(c => c.id === updated.id ? updated : c) } : d))

  const handleStartReview = (deck) => { setReviewDeck(deck); setShowModeModal(true) }
  const handleModeSelect = (mode) => { setGameMode(mode); setShowModeModal(false); setInReview(true) }

  const handleReviewComplete = (deckId, results, duration) => {
    const updatedDecks = decks.map(d => d.id !== deckId ? d : {
      ...d,
      cards: d.cards.map(c => {
        const r = results.find(x => x.id === c.id)
        if (!r) return c
        return { ...c, confidence: r.known ? Math.min((c.confidence || 0) + 1, 5) : Math.max((c.confidence || 0) - 1, 0), lastReviewed: new Date().toISOString() }
      }),
      lastReviewed: new Date().toISOString(),
    })
    saveDecks(user.id, updatedDecks)
    const correct = results.filter(r => r.known).length
    const wrong = results.length - correct
    saveXp(user.id, xp + correct * XP_VALUES.correct + wrong * XP_VALUES.wrong + XP_VALUES.sessionBonus)
    const today = new Date().toDateString()
    saveStats(user.id, {
      totalReviewed: stats.totalReviewed + results.length,
      streak: stats.lastDate === today ? stats.streak : stats.lastDate === new Date(Date.now() - 86400000).toDateString() ? stats.streak + 1 : 1,
      lastDate: today,
    })
    saveSessions(user.id, [...sessions, { id: Date.now().toString(36), deckId, date: new Date().toISOString(), correct, total: results.length, duration: duration || 0 }])
    setInReview(false); setReviewDeck(null)
  }

  const handleWeakReview = () => {
    const weakCards = []
    decks.forEach(d => d.cards.filter(c => (c.confidence || 0) <= 1).forEach(c => weakCards.push({ ...c })))
    if (!weakCards.length) return
    setReviewDeck({ id: "weak_review", name: "Weak Cards", cards: weakCards })
    setShowModeModal(true); setView("dashboard")
  }

  if (screen === "landing") return (
    <div style={{ position: "relative" }}>
      <div className="glow-sphere glow-sphere-1" />
      <div className="glow-sphere glow-sphere-2" />
      <motion.div key="landing" variants={pv} initial="initial" animate="animate" exit="exit" transition={pt}>
        <LandingPage onLogin={() => setScreen("login")} onRegister={() => setScreen("register")} />
      </motion.div>
    </div>
  )
  if (screen === "login") return (
    <div style={{ position: "relative" }}>
      <div className="glow-sphere glow-sphere-1" />
      <div className="glow-sphere glow-sphere-2" />
      <motion.div key="login" variants={pv} initial="initial" animate="animate" exit="exit" transition={pt}>
        <LoginPage onSuccess={handleLogin} onGoRegister={() => setScreen("register")} onBack={() => setScreen("landing")} />
      </motion.div>
    </div>
  )
  if (screen === "register") return (
    <div style={{ position: "relative" }}>
      <div className="glow-sphere glow-sphere-1" />
      <div className="glow-sphere glow-sphere-2" />
      <motion.div key="register" variants={pv} initial="initial" animate="animate" exit="exit" transition={pt}>
        <RegisterPage onSuccess={handleLogin} onGoLogin={() => setScreen("login")} onBack={() => setScreen("landing")} />
      </motion.div>
    </div>
  )

  return (
    <div className="app">
      <div className="glow-sphere glow-sphere-1" />
      <div className="glow-sphere glow-sphere-2" />
      <div className="shell">
        <Navbar view={inReview ? "review" : view} setView={setView} stats={stats} xp={xp} user={user} onLogout={handleLogout} />
        <main className="main-content">
          <AnimatePresence mode="wait">
            {inReview && reviewDeck ? (
              <motion.div key="review" variants={pv} initial="initial" animate="animate" exit="exit" transition={pt}>
                <ReviewMode
                  deck={reviewDeck}
                  cards={reviewDeck.id === "weak_review" ? reviewDeck.cards : (decks.find(d => d.id === reviewDeck.id)?.cards || [])}
                  gameMode={gameMode}
                  onComplete={handleReviewComplete}
                  onExit={() => { setInReview(false); setReviewDeck(null) }}
                />
              </motion.div>
            ) : view === "dashboard" ? (
              <motion.div key="dashboard" variants={pv} initial="initial" animate="animate" exit="exit" transition={pt}>
                <Dashboard decks={decks} onStartReview={handleStartReview} onDeleteDeck={handleDeleteDeck} onDeleteCard={handleDeleteCard} onUpdateCard={handleUpdateCard} stats={stats} setView={setView} user={user} onQuickAddCard={handleAddCard} />
              </motion.div>
            ) : view === "create" ? (
              <motion.div key="create" variants={pv} initial="initial" animate="animate" exit="exit" transition={pt}>
                <CreateCard decks={decks} onCreateDeck={handleCreateDeck} onAddCard={handleAddCard} setView={setView} />
              </motion.div>
            ) : view === "analytics" ? (
              <motion.div key="analytics" variants={pv} initial="initial" animate="animate" exit="exit" transition={pt}>
                <AnalyticsPage sessions={sessions} decks={decks} onStartWeakReview={handleWeakReview} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </main>
      </div>
      {showModeModal && reviewDeck && (
        <GameModeModal deck={reviewDeck} onStart={handleModeSelect} onClose={() => { setShowModeModal(false); setReviewDeck(null) }} />
      )}
      <AnimatePresence>
        {levelUpName && <LevelUpOverlay levelName={levelUpName} onDone={() => setLevelUpName(null)} />}
      </AnimatePresence>
    </div>
  )
}

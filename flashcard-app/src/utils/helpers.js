export const QUOTES = [
  "The expert in anything was once a beginner.",
  "Learning never exhausts the mind. — Leonardo da Vinci",
  "An investment in knowledge pays the best interest. — Benjamin Franklin",
  "Education is the passport to the future.",
  "The beautiful thing about learning is nobody can take it away from you.",
  "Live as if you were to die tomorrow. Learn as if you were to live forever.",
  "The more that you read, the more things you will know.",
  "Knowledge is power. — Francis Bacon",
  "Study hard what interests you the most in the most undisciplined way possible.",
  "Develop a passion for learning. If you do, you will never cease to grow.",
  "The capacity to learn is a gift; the ability to learn is a skill.",
  "Tell me and I forget. Teach me and I remember. Involve me and I learn.",
  "Education is not preparation for life; education is life itself.",
  "The mind is not a vessel to be filled but a fire to be kindled.",
  "Real learning comes about when the competitive spirit has ceased.",
  "The roots of education are bitter, but the fruit is sweet.",
  "You don't have to be great to start, but you have to start to be great.",
  "Success is the sum of small efforts repeated day in and day out.",
  "Consistency is the key to mastery.",
  "Every day is a new opportunity to learn something new.",
  "Push yourself, because no one else is going to do it for you.",
  "Great things never came from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Stay focused and never give up.",
  "The secret of getting ahead is getting started.",
  "It always seems impossible until it's done. — Nelson Mandela",
  "Hard work beats talent when talent doesn't work hard.",
  "Believe you can and you're halfway there.",
  "Don't watch the clock; do what it does. Keep going.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
]

export const getDailyQuote = () => {
  const day = Math.floor(Date.now() / 86400000)
  return QUOTES[day % QUOTES.length]
}

export const getGreeting = (name) => {
  const h = new Date().getHours()
  const time = h < 12 ? "morning" : h < 17 ? "afternoon" : "evening"
  return `Good ${time}, ${name} 👋`
}

export const formatTime = (seconds) => {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return `${h}h ${m}m`
  if (m > 0) return `${m}m ${s}s`
  return `${s}s`
}

export const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5)

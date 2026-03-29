export const LEVELS = [
  { level: 1,  name: "Novice",      xp: 0 },
  { level: 2,  name: "Novice II",   xp: 100 },
  { level: 3,  name: "Apprentice",  xp: 250 },
  { level: 4,  name: "Apprentice II",xp: 450 },
  { level: 5,  name: "Scholar",     xp: 700 },
  { level: 6,  name: "Scholar II",  xp: 1000 },
  { level: 7,  name: "Adept",       xp: 1400 },
  { level: 8,  name: "Adept II",    xp: 1900 },
  { level: 9,  name: "Expert",      xp: 2500 },
  { level: 10, name: "Expert II",   xp: 3200 },
  { level: 11, name: "Master",      xp: 4000 },
  { level: 12, name: "Master II",   xp: 5000 },
  { level: 13, name: "Grandmaster", xp: 6200 },
  { level: 14, name: "Grandmaster II", xp: 7600 },
  { level: 15, name: "Legend",      xp: 9200 },
  { level: 16, name: "Legend II",   xp: 11000 },
  { level: 17, name: "Mythic",      xp: 13200 },
  { level: 18, name: "Mythic II",   xp: 15800 },
  { level: 19, name: "Immortal",    xp: 18800 },
  { level: 20, name: "FlashGod",    xp: 22200 },
]

export const getLevelInfo = (xp) => {
  let current = LEVELS[0]
  let next = LEVELS[1]
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xp) {
      current = LEVELS[i]
      next = LEVELS[i + 1] || null
      break
    }
  }
  const progress = next
    ? ((xp - current.xp) / (next.xp - current.xp)) * 100
    : 100
  return { current, next, progress: Math.min(progress, 100) }
}

export const XP_VALUES = {
  correct: 10,
  wrong: 2,
  sessionBonus: 25,
}

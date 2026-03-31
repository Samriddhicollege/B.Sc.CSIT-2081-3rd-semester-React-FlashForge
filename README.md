<div align="center">

```
███████╗██╗      █████╗ ███████╗██╗  ██╗███████╗ ██████╗ ██████╗  ██████╗ ███████╗
██╔════╝██║     ██╔══██╗██╔════╝██║  ██║██╔════╝██╔═══██╗██╔══██╗██╔════╝ ██╔════╝
█████╗  ██║     ███████║███████╗███████║█████╗  ██║   ██║██████╔╝██║  ███╗█████╗  
██╔══╝  ██║     ██╔══██║╚════██║██╔══██║██╔══╝  ██║   ██║██╔══██╗██║   ██║██╔══╝  
██║     ███████╗██║  ██║███████║██║  ██║██║     ╚██████╔╝██║  ██║╚██████╔╝███████╗
╚═╝     ╚══════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝
```



Student Information
Name: Bibek Magar
Roll Number: 08
Course / Program: B.Sc.CSIT 2081
Semester / Year: 3rd Semester / 2026
Instructor Information
Instructor Name: Mr. Dipak Shrestha
Course Title: React Development
College Name: Samriddhi College

### ⚡ Master Anything. Faster.

*A premium AI-powered flashcard platform with game modes, XP progression, and real analytics.*

<br/>

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0055?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![OpenRouter](https://img.shields.io/badge/OpenRouter-AI-blueviolet?style=for-the-badge&logo=robot&logoColor=white)](https://openrouter.ai/)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-ccff00?style=for-the-badge)](LICENSE)

<br/>

[🚀 Live Demo](https://flashforge-chi.vercel.app/) · [🐛 Report Bug](https://github.com/yourusername/flashforge/issues) · [✨ Request Feature](https://github.com/yourusername/flashforge/issues)

</div>

---



## 🧠 What is FlashForge?

FlashForge is a full-featured, gamified flashcard application built with React. It combines the proven science of **active recall** and **spaced repetition** with AI-generated content, game modes, XP progression, and detailed analytics — all wrapped in a stunning **Obsidian & Lime** dark UI.

Whether you're studying for an exam, learning a new programming language, or picking up a new skill — FlashForge makes memorization feel like a game.

---

## ✨ Features

### 🎮 Four Game Modes
| Mode | Description |
|------|-------------|
| **Multiple Choice** | 4 options per question, AI-generated wrong answers |
| **True / False** | Quick-fire format to test recognition speed |
| **Survival** | 3 lives — wrong answer costs a heart ❤️ |
| **Timed** | 10-second SVG countdown ring per question ⏱ |

### 🤖 AI Card Generator
- Type any topic and **OpenRouter AI (Free Models)** generates 10 flashcards instantly
- Preview generated cards before saving
- Remove individual cards you don't want
- Powered by `openrouter/free` — completely free

### ⚡ XP & Level System
- Earn XP for every correct answer and completed session
- 20 levels from **Novice** all the way to **FlashGod**
- Animated level-up overlay with confetti particles
- XP bar always visible in the navbar

### 📊 Analytics Dashboard
- Bar chart of last 7 study sessions (correct vs wrong)
- Per-deck accuracy horizontal bars
- **30-day activity heatmap** (like GitHub contributions)
- Weak cards list — cards you keep getting wrong, with focused review
- Total study time tracked and formatted

### 🔐 Authentication
- Register and login with email and password
- Data is isolated per user — each account has its own decks, XP, and stats
- All stored in `localStorage` — no backend required
- Password hashed with `btoa` salting

### 🎨 Design System
- **Obsidian & Lime** dark theme (`#ccff00` accent on `#0c0c0c` surfaces)
- Glassmorphism cards with `blur(16px)` and subtle white overlays
- 60px grid background + noise texture overlay
- Animated glow spheres (lime + emerald)
- `Space Grotesk` headings + `JetBrains Mono` for technical labels

### 🌟 Landing Page
- Character stagger text animations
- Word slide-up reveals
- Scramble text decode effect
- Count-up statistics
- Gradient shimmer on brand name
- Floating glassmorphism flashcard mockup
- Full bento grid features section
- Contrast methodology section
- Professional footer with FLASHFORGE watermark

---

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| **React 18** | UI framework with hooks |
| **Vite 5** | Build tool and dev server |
| **Framer Motion** | Page transitions, animations, level-up overlay |
| **Recharts** | Analytics bar charts |
| **OpenRouter API** | AI flashcard generation |
| **Vanilla CSS** | Custom design system, glassmorphism |
| **localStorage** | User data persistence (no backend) |

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v18+`
- npm `v9+`
- A free OpenRouter API key from [openrouter.ai](https://openrouter.ai)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/flashforge.git

# 2. Navigate into the project
cd flashforge/flashcard-app

# 3. Install dependencies
npm install

# 4. Set up environment variables
cp .env.example .env
```

### Configure your API key

Open the `.env` file and add your OpenRouter API key:

```env
VITE_OPENROUTER_API_KEY=your_actual_api_key_here
```

> 🔑 Get your free key at [openrouter.ai](https://openrouter.ai) → Keys → Create Key

### Run the app

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔑 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_OPENROUTER_API_KEY` | OpenRouter API key for AI card generation | ✅ Yes |

> ⚠️ **Never commit your `.env` file to GitHub.** It is listed in `.gitignore` by default.
> Only commit `.env.example` which contains placeholder values.

---

## 🌍 Deploying to Vercel

1. **Push your code to GitHub** (make sure `.env` is in `.gitignore`)

2. **Go to [vercel.com](https://vercel.com)** and sign in

3. Click **Add New → Project** and import your GitHub repo

4. Set the **Root Directory** to `flashcard-app`

5. **Add Environment Variable** in the Vercel dashboard:
   - Name: `VITE_OPENROUTER_API_KEY`
   - Value: your actual OpenRouter API key

6. Click **Deploy** 🚀

---

## 📁 Project Structure

```
flashcard-app/
├── public/                  # Static assets
├── src/
│   ├── components/          # Reusable React components
│   │   ├── ui/              # BlurFade, TextAnimations, LevelUpOverlay
│   │   ├── Dashboard.jsx    # Main dashboard with stats and decks
│   │   ├── CreateCard.jsx   # Manual + AI card creation
│   │   ├── ReviewMode.jsx   # All 4 game modes
│   │   ├── DeckCard.jsx     # Individual deck display
│   │   ├── FlashCardItem.jsx# Single card with inline edit
│   │   ├── Navbar.jsx       # Navigation + XP bar + user avatar
│   │   └── GameModeModal.jsx# Game mode selector
│   ├── pages/
│   │   ├── LandingPage.jsx  # Full landing page with animations
│   │   ├── AuthPages.jsx    # Login and Register pages
│   │   └── AnalyticsPage.jsx# Charts, heatmap, weak cards
│   ├── hooks/
│   │   └── useDebounce.js   # Custom debounce hook
│   ├── utils/
│   │   ├── auth.js          # localStorage auth helpers
│   │   ├── xp.js            # XP levels and thresholds
│   │   └── helpers.js       # Quotes, greeting, shuffle
│   ├── App.jsx              # Main router and state
│   ├── App.css              # Global design system
│   └── main.jsx             # Entry point
├── .env                     # ⛔ Not committed (gitignored)
├── .env.example             # ✅ Committed (placeholder only)
├── .gitignore               # Git ignore rules
├── package.json             # Dependencies
├── vite.config.js           # Vite configuration
└── README.md                # You are here
```

---

## 🧪 How It Works

```
User visits landing page
       ↓
Register / Login (localStorage auth)
       ↓
Create a deck → Add cards manually OR use AI Generator
       ↓
Click Review → Choose game mode (MCQ / True-False / Survival / Timed)
       ↓
Answer questions → Earn XP → Update confidence per card
       ↓
View Analytics → See weak cards → Target focused review
       ↓
Level up → Celebrate 🎉
```

---

## 👨‍💻 Author

Built with ❤️ for learning and growth.

> https://www.linkedin.com/in/bibek-magar-2aa612340/
https://github.com/lajusam

---

## 📝 License

This project is licensed under the **MIT License** — feel free to use, modify, and distribute.

---

<div align="center">

**⚡ FlashForge — Learn smarter, not harder.**

*Built with React, powered by OpenRouter AI, designed with obsidian and lime.*

</div>

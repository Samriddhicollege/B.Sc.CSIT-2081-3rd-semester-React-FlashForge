# ⚡ FlashForge

> A premium, dynamic flashcard platform with game modes and AI-powered learning.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![Framer Motion](https://img.shields.io/badge/framer--motion-black.svg?style=for-the-badge&logo=framer&logoColor=blue)

## ✨ Features

- **Game Modes**: Learn with Multiple Choice (MCQ), True/False, Survival, and Timed mode.
- **AI Card Generator**: Automatically create flashcards for any topic using the Google Gemini API.
- **Progression**: Complete sets to gain XP and level up.
- **Analytics**: Beautiful dashboard featuring heatmaps and charts.
- **Authentication**: LocalStorage-based auth to keep track of your profile securely.
- **Landing Page**: Stunning UI with advanced text animations and a dark "Obsidian & Lime" aesthetic.

## 🛠 Tech Stack

- **Framework**: React.js with Vite
- **Styling**: Vanilla CSS, Flexbox/Grid layouts
- **Animations**: Framer Motion
- **AI Integration**: Google Gemini API

## 🚀 Getting Started

Follow these steps to run the application locally:

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/flashforge.git

# 2. Navigate to the project directory
cd flashforge/flashcard-app

# 3. Install dependencies
npm install

# 4. Set up environment variables
# Copy .env.example to .env and add your API key
cp .env.example .env

# 5. Start the development server
npm run dev
```

## 🔑 Environment Variables

To use the AI Flashcard Generator, you will need a Gemini API Key.

1. Go to [Google AI Studio](https://aistudio.google.com/).
2. Create standard API credentials and obtain your API key.
3. In your `.env` file, replace the placeholder with your actual key:
   \`\`\`
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   \`\`\`

## 🌍 Deployment

You can deploy this application easily on Vercel:

1. Push your code to a GitHub repository. (Make sure `.env` is NOT committed!).
2. Sign in to [Vercel](https://vercel.com) and click **Add New** > **Project**.
3. Import your GitHub repository.
4. **Important Environment Step**: Before deploying, in the "Environment Variables" section on the Vercel dashboard, add:
   - Name: `VITE_GEMINI_API_KEY`
   - Value: `[your-actual-api-key]`
5. Click **Deploy**.

## 📁 Project Structure

\`\`\`
├── public/                # Static assets
├── src/                   # Source files
│   ├── components/        # Reusable React components
│   ├── context/           # React Context providers (Auth, XP)
│   ├── pages/             # Route pages (Landing, Dashboard, etc.)
│   ├── App.jsx            # Main app router
│   ├── App.css            # Global unified styles
│   └── main.jsx           # App entry point
├── .env                   # Ignored environment variables
├── .env.example           # Example environment template
├── package.json           # Dependencies and scripts
└── vite.config.js         # Vite configuration
\`\`\`

## 📸 Screenshots

*Placeholder: Screenshots coming soon!*

## 📝 License

This project is licensed under the MIT License.

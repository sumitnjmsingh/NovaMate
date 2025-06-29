# 🧠 NovaMate — AI Voice Assistant

NovaMate is a smart, browser-based AI voice assistant that enables real-time interaction using natural voice commands. With Gemini AI at its core, NovaMate understands spoken input, responds conversationally, and even executes actions like opening websites, searching Google, and more — all hands-free.

> ✅ Best experienced in **Google Chrome**.  
> 🔐 Secured by Clerk for user authentication.

---

## 🚀 Features

- 🎙️ Real-time voice recognition
- 🤖 Smart AI responses via Gemini API
- 🧭 Executes commands like:
  - Open websites (`open_website`)
  - Search Google/YouTube
- 🗣️ Natural spoken output (Speech Synthesis)
- 🔐 Authentication using Clerk
- 🌐 Clean, responsive UI (mobile-friendly)

---

## 🛠️ Tech Stack

| Layer    | Tools Used                                           |
| -------- | ---------------------------------------------------- |
| Frontend | Next.js 14, React 18, TypeScript, Tailwind CSS       |
| UI Icons | Lucide React                                         |
| Auth     | Clerk                                                |
| AI       | Google Gemini API (gemini-2.0-flash)                 |
| Voice    | Web Speech API (SpeechRecognition + SpeechSynthesis) |
| Hosting  | Vercel (recommended)                                 |

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/sumitnjmsingh/novamate.git
cd novamate
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Create `.env` File

Create a `.env.local` file in the root and add:

```env
# Gemini API Key (get from https://makersuite.google.com/app/apikey)
GEMINI_API_KEY=your_gemini_api_key_here

# Clerk configuration
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SIGN_IN_URL=/sign-in
CLERK_SIGN_UP_URL=/sign-up
CLERK_AFTER_SIGN_IN_URL=/dashboard
CLERK_AFTER_SIGN_UP_URL=/dashboard
```

> 🔑 Get Clerk API keys from https://clerk.com and create a free project.

### 4. Run Locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 🧪 Demo

[Live Demo](https://nova-mate.vercel.app/)

## 🤝 Contributing

Pull requests are welcome. For major changes, open an issue first to discuss what you’d like to change.

---

## ⚠️ Notes

- NovaMate works best in **Google Chrome** (due to SpeechRecognition API).
- AI model limited to short responses unless prompted for more.

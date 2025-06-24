"use client";

import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import {
  Sparkles,
  Mic,
  Bot,
  ShieldCheck,
  Languages,
  Zap,
  Smile,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-white px-2">
      <header className="flex justify-between items-center max-w-8xl mx-auto px-3 py-3">
        <h1 className="text-2xl font-bold text-purple-600 flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-purple-400" /> NovaMate
        </h1>
        <div className="flex items-center gap-4">
        <SignedIn>
          <Link
            href="/dashboard"
            className="bg-purple-500 hover:bg-purple-600 text-white  px-3 py-1 rounded transition"
          >
            Dashboard
          </Link>
        </SignedIn>
        <SignedOut >
          <Link href="/dashboard">Dashboard</Link>
          <SignInButton mode="modal">
            <button className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded-lg transition">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        </div>
      </header>
      <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-100 text-gray-900 px-6 py-6">
        <section className="max-w-5xl mx-auto text-center space-y-10">
          <h2 className="text-5xl font-extrabold text-purple-600 leading-tight">
            Meet NovaMate
            <br />
            Your Personal AI Voice Assistant
          </h2>
          <p className="text-gray-600 text-lg">
            NovaMate helps you get more done, hands-free. Speak naturally to
            schedule reminders, search information, translate text, and more —
            all with your voice.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/dashboard"
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold shadow transition"
            >
              🎙️ Start Talking
            </Link>
          </div>
        </section>
        <section className="mt-16 max-w-3xl mx-auto bg-purple-50 border border-purple-200 text-purple-900 px-6 py-4 rounded-xl shadow-sm text-center">
          <p className="text-sm sm:text-base font-medium leading-relaxed">
            🔒 <span className="font-semibold">Important:</span> NovaMate’s
            voice recognition works in
            <span className="font-bold text-purple-600"> Google Chrome</span>.
            Please use Chrome for the best experience.
          </p>
        </section>

        <section className="mt-20 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={Mic}
            title="Real-Time Voice Recognition"
            description="Accurate, fast speech-to-text with natural language understanding."
          />
          <FeatureCard
            icon={Bot}
            title="Conversational AI"
            description="Powered by Google's Gemini, NovaMate gives thoughtful, context-aware replies."
          />
          <FeatureCard
            icon={Zap}
            title="Always-On Help"
            description="Get instant answers, reminders, and voice-controlled utility anytime."
          />
          <FeatureCard
            icon={Languages}
            title="Multilingual Support"
            description="Speak in your preferred language — NovaMate can understand and respond."
          />
          <FeatureCard
            icon={ShieldCheck}
            title="Secure & Private"
            description="All interactions are protected with Clerk authentication and never stored without consent."
          />
          <FeatureCard
            icon={Smile}
            title="Friendly Personality"
            description="A helpful, polite, and friendly voice that makes tech feel more human."
          />
        </section>

        <footer className="mt-24 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} NovaMate. All rights reserved.
        </footer>
      </main>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white border border-purple-200 p-6 rounded-xl text-left space-y-4 shadow-md hover:shadow-lg transition">
      <Icon className="w-6 h-6 text-purple-500" />
      <h3 className="text-xl font-semibold text-purple-700">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
}

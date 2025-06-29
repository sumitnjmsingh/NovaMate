"use client";

import {
  Mic,
  MicOff,
  Sparkles,
  Bot,
  User,
  AlertCircle,
  LogOut,
  Menu,
} from "lucide-react";
import { useState } from "react";
import { SignedIn, SignOutButton } from "@clerk/nextjs";
import Link from "next/link";

interface Props {
  recognizing: boolean;
  unsupported: boolean;
  transcript: string;
  response: string;
  onStart: () => void;
}

export const TalkUI = ({
  recognizing,
  unsupported,
  transcript,
  response,
  onStart,
}: Props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-purple-100 text-gray-900 flex flex-col">
      {/* Navbar */}
      <header className="w-full border-b border-purple-200 bg-white px-4 py-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2 text-purple-600 font-extrabold text-xl">
          <Sparkles className="w-6 h-6 text-purple-500" />
          NovaMate
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            href="/"
            className="text-gray-600 hover:text-purple-600 transition"
          >
            Home
          </Link>
          <SignedIn>
            <SignOutButton>
              <button className="text-white bg-purple-600 px-2 py-1 rounded-lg hover:cursor-pointer flex items-center gap-1 transition">
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </SignOutButton>
          </SignedIn>
        </nav>

        {/* Mobile nav toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-gray-700 hover:text-purple-600"
        >
          <Menu className="w-6 h-6" />
        </button>
      </header>

      {/* Mobile Nav Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white border-b border-purple-200 px-4 py-3 space-y-2 text-sm">
          <Link href="/" className="block text-gray-600 hover:text-purple-600">
            Home
          </Link>
          <SignedIn>
            <SignOutButton>
              <button className="text-red-500 hover:text-red-400 flex items-center gap-1">
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </SignOutButton>
          </SignedIn>
        </nav>
      )}

      {/* Main Assistant Panel */}
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-xl text-center space-y-6">
          <h1 className="text-4xl font-extrabold text-purple-600 tracking-tight drop-shadow-sm flex justify-center items-center gap-2">
            <Sparkles className="w-8 h-8 text-purple-400" />
            NovaMate — Your AI Voice Assistant
          </h1>

          <p className="text-gray-600 text-sm">
            Speak naturally. NovaMate is here to help you — hands-free.
          </p>

          <button
            onClick={onStart}
            disabled={recognizing || unsupported}
            className={`inline-flex items-center gap-2 text-lg px-6 py-3 rounded-full transition-all font-semibold shadow-md ${
              recognizing || unsupported
                ? "bg-gray-300 cursor-not-allowed text-gray-600"
                : "bg-purple-500 hover:bg-purple-600 text-white"
            }`}
          >
            {recognizing ? (
              <>
                <MicOff className="w-5 h-5 animate-pulse" />
                Listening...
              </>
            ) : (
              <>
                <Mic className="w-5 h-5" />
                Start Talking
              </>
            )}
          </button>

          {unsupported && (
            <div className="flex items-center justify-center bg-red-100 text-red-700 rounded p-3 shadow mt-4 gap-2 border border-red-300">
              <AlertCircle className="w-5 h-5" />
              Speech recognition not supported. Use Chrome.
            </div>
          )}

          {transcript && (
            <div className="bg-white border border-gray-200 rounded-lg p-4 mt-6 shadow">
              <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-1">
                <User className="w-4 h-4" />
                You said:
              </div>
              <p className="text-lg font-semibold text-gray-800">
                &quot;{transcript}&quot;
              </p>
            </div>
          )}

          {response && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mt-4 shadow">
              <div className="flex items-center gap-2 text-sm text-purple-500 font-medium mb-1">
                <Bot className="w-4 h-4" />
                NovaMate says:
              </div>
              <p className="text-lg font-semibold text-purple-900 leading-relaxed">
                &quot;{response}&quot;
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const messages = body.messages;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { response: "Invalid request: messages array is required." },
        { status: 400 }
      );
    }

    if (messages[0].role !== "user") {
      console.warn("Invalid history: must start with user.");
      return NextResponse.json(
        { response: "Conversation must start with a user message." },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const SYSTEM_PROMPT = {
  role: "user",
  parts: [
    {
      text: `
          You are NovaMate, an AI voice assistant that interprets commands and responds helpfully.

          If a command is detected, respond with **raw JSON only** (no code blocks or Markdown). Use one of these formats:

          🔗 Web Actions:
          - Open website: { "action": "open_website", "url": "https://example.com" }
          - Search Google: { "action": "search_google", "search_query": "latest tech news" }
          - Search YouTube: { "action": "search_youtube", "search_query": "chill beats" }

          📅 Utility:
          - Set timer: { "action": "set_timer", "duration": "10 minutes" }
          - Set reminder: { "action": "set_reminder", "message": "Drink water", "time": "3 PM" }
          - Get time: { "action": "get_time" }
          - Add calendar event: { "action": "add_event", "title": "Meeting", "datetime": "2025-06-26T14:00" }

          💬 Communication:
          - Send message: { "action": "send_message", "to": "Alice", "message": "Hi there" }
          - Compose email: { "action": "compose_email", "to": "john@example.com", "subject": "Hello", "body": "What's up?" }

          🌐 System/Web API:
          - Get weather: { "action": "get_weather", "location": "Tokyo" }
          - Get news: { "action": "get_news", "topic": "AI" }
          - Get stock: { "action": "get_stock", "symbol": "AAPL" }

          🧠 System Utility:
          - Change theme: { "action": "change_theme", "mode": "dark" }
          - Reload page: { "action": "reload_page" }

          If no command is found, reply naturally but concisely (limit to 50 words). Avoid using triple backticks or code blocks. Stay safe, respectful, and do not hallucinate or assume.

          `.trim(),
    },
  ],
};

    const chat = model.startChat({
        history: [SYSTEM_PROMPT, ...messages.slice(0, -1)],
    });

    const latestMessage = messages[messages.length - 1];

    if (
      latestMessage.role !== "user" ||
      !latestMessage.parts?.[0]?.text
    ) {
      return NextResponse.json(
        { response: "Last message must be from user with valid content." },
        { status: 400 }
      );
    }
    const result = await chat.sendMessage(latestMessage.parts[0].text);
    const text = result.response.text();

    return NextResponse.json({ response: text });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { response: "Sorry, I had a problem responding 😢" },
      { status: 500 }
    );
  }
}

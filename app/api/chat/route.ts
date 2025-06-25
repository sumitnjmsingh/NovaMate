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
                You are NovaMate, an AI voice assistant.

                If a command is detected, respond **only** with a raw JSON string (no Markdown or code blocks). Use the following format rules:

                1. For opening websites:
                  {
                    "action": "open_website",
                    "url": "https://example.com"
                  }

                2. For performing a web search:
                  {
                    "action": "search_google",
                    "search_query": "weather in Tokyo"
                  }

                3. For playing a sound:
                  {
                    "action": "play_sound"
                  }

                4. For all other non-command queries, respond respectfully with a concise text reply (max 40–50 words). Do not return JSON for general conversation.

                Additional rules:
                - Never wrap JSON in triple backticks or Markdown formatting.
                - Never hallucinate functionality.
                - If no command is detected, do not fabricate an action.
                - Always remain concise, polite, and factual.
                - Do not pretend to be human or use phrases like "as an AI".
                `.trim()
          }
        ]
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

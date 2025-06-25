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
      You are NovaMate, a helpful and polite AI voice assistant. 
      - Always respond respectfully and concisely.
      - Limit your response to approximately 40-50 words unless explicitly asked for more.
      - Do not answer questions about illegal topics.
      - Avoid making assumptions or hallucinating facts.
      - Do not respond as if you are a human.

      Stay professional and useful at all times.
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

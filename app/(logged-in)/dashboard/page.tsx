"use client";

import { useEffect, useState } from "react";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { speakText } from "@/utils/speakText";
import { TalkUI } from "@/components/TalkUI";

export default function Home() {
  const { transcript, recognizing, unsupported, startListening } =
    useSpeechRecognition();

  type Message = { role: string; parts: { text: string }[] };

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (!transcript) return;

    const userMessage = { role: "user", parts: [{ text: transcript }] };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);

    fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: updatedMessages }),
    })
      .then((res) => res.json())
      .then((data) => {
        const reply = data.response;
        const modelMessage = { role: "model", parts: [{ text: reply }] };
        setMessages((prev) => [...prev, modelMessage]);

        try {
          const parsed = JSON.parse(reply.trim());

          if (parsed.action) {
            switch (parsed.action) {
              case "open_website":
                if (typeof parsed.url === "string") {
                  window.open(parsed.url, "_blank");
                  speakText("Opening website...");
                } else {
                  speakText("I couldn't find a valid URL.");
                }
                break;

              case "search_google":
                const query = parsed?.search_query;
                if (query) {
                  window.open(
                    `https://www.google.com/search?q=${encodeURIComponent(
                      query
                    )}`,
                    "_blank"
                  );
                  speakText(`Searching Google for ${query}`);
                }
                break;
              default:
                speakText("I received a command I don't recognize.");
            }
          } else {
            speakText(reply);
          }
        } catch {
          speakText(reply);
        }
      })
      .catch((err) => {
        console.error("API error:", err);
        speakText("Sorry, I had trouble processing that.");
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript]);

  return (
    <TalkUI
      recognizing={recognizing}
      unsupported={unsupported}
      transcript={transcript}
      response={
        messages[messages.length - 1]?.role === "model"
          ? messages[messages.length - 1].parts[0].text
          : ""
      }
      onStart={startListening}
    />
  );
}

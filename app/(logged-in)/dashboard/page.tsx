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
                window.open(parsed.url, "_blank");
                speakText("Opening website.");
                break;

              case "search_google":
                window.open(
                  `https://www.google.com/search?q=${encodeURIComponent(
                    parsed.search_query
                  )}`,
                  "_blank"
                );
                speakText(`🔍 Searching Google for ${parsed.search_query}`);
                break;

              case "search_youtube":
                console.log("Searching YouTube:", parsed.search_query);
                window.open(
                  `https://www.youtube.com/results?search_query=${encodeURIComponent(
                    parsed.search_query
                  )}`,
                  "_blank"
                );
                speakText(`🎬 Searching YouTube for ${parsed.search_query}`);
                break;

              case "set_timer":
                speakText(`⏲️ Timer set for ${parsed.duration}`);
                break;

              case "set_reminder":
                speakText(
                  `📝 Reminder set for ${parsed.time}: ${parsed.message}`
                );
                break;

              case "get_time":
                speakText(
                  `🕒 The current time is ${new Date().toLocaleTimeString()}`
                );
                break;

              case "add_event":
                speakText(
                  `📅 Added event "${parsed.title}" at ${parsed.datetime}`
                );
                break;
              case "get_weather":
                speakText(`Fetching weather for ${parsed.location}`);
                break;

              case "get_news":
                speakText(`Getting news about ${parsed.topic}`);
                break;

              case "get_stock":
                speakText(`Checking stock price for ${parsed.symbol}`);
                break;

              case "change_theme":
                speakText(`Changing theme to ${parsed.mode}`);
                break;

              case "reload_page":
                speakText("Reloading page.");
                location.reload();
                break;
              default:
                speakText("I got a command I don't recognize.");
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

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
    if (transcript) {
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
          speakText(reply);
        })
        .catch((err) => {
          console.error("Error from API:", err);
          speakText("Sorry, I couldn't understand that.");
        });
    }
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

import { useEffect, useRef, useState } from "react";
import {
  ExtendedWindow,
  SpeechRecognition,
  SpeechRecognitionEvent,
  SpeechRecognitionErrorEvent,
} from "../types/speech";

export const useSpeechRecognition = () => {
  const [transcript, setTranscript] = useState("");
  const [recognizing, setRecognizing] = useState(false);
  const [unsupported, setUnsupported] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    const w = window as unknown as ExtendedWindow;
    const SpeechRecognitionConstructor =
      w.SpeechRecognition || w.webkitSpeechRecognition;

    if (!SpeechRecognitionConstructor) {
      setUnsupported(true);
      console.error("Speech Recognition not supported.");
      return;
    }

    const recognition = new SpeechRecognitionConstructor();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    recognition.maxAlternatives = 1;

    recognition.onstart = () => setRecognizing(true);
    recognition.onend = () => setRecognizing(false);
    recognition.onresult = (event: SpeechRecognitionEvent) => {
      setTranscript(event.results[0][0].transcript);
    };
    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
      setRecognizing(false);
      if (event.error === "no-speech") {
        alert("No speech detected. Please try again.");
      }
    };

    recognitionRef.current = recognition;
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !recognizing) {
      setTranscript("");
      recognitionRef.current.start();
    }
  };

  return { transcript, recognizing, unsupported, startListening };
};

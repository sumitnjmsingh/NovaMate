export const speakText = (text: string) => {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.pitch = 1.2;
  utterance.rate = 1;
  speechSynthesis.speak(utterance);
};

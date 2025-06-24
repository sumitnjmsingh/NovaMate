import { Mic, MicOff, Sparkles, Bot, User, AlertCircle } from "lucide-react";

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
}: Props) => (
  <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white px-6 py-12">
    <div className="w-full max-w-xl text-center space-y-6">
      <h1 className="text-4xl font-extrabold text-cyan-400 tracking-tight drop-shadow-lg flex justify-center items-center gap-2">
        <Sparkles className="w-8 h-8 text-cyan-300" />
        <div className="text-center">NovaMate — Your AI Voice Assistant</div>
      </h1>

      <p className="text-gray-300 text-sm">
        Speak naturally. NovaMate is here to help you — hands-free.
      </p>

      <button
        onClick={onStart}
        disabled={recognizing || unsupported}
        className={`inline-flex items-center gap-2 text-lg px-6 py-3 rounded-full transition-all font-semibold shadow-lg ${
          recognizing || unsupported
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-cyan-500 hover:bg-cyan-600"
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
        <div className="flex items-center justify-center bg-red-500 text-white rounded p-3 shadow mt-4 gap-2">
          <AlertCircle className="w-5 h-5" />
          Speech recognition not supported. Use Chrome.
        </div>
      )}

      {transcript && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mt-6">
          <div className="flex items-center gap-2 text-sm text-gray-400 font-medium mb-1">
            <User className="w-4 h-4" />
            You said:
          </div>
          <p className="text-lg font-semibold text-white">
            &quot;{transcript}&quot;
          </p>
        </div>
      )}

      {response && (
        <div className="bg-cyan-950 border border-cyan-800 rounded-lg p-4 mt-4">
          <div className="flex items-center gap-2 text-sm text-cyan-300 font-medium mb-1">
            <Bot className="w-4 h-4" />
            NovaMate says:
          </div>
          <p className="text-lg font-semibold text-cyan-100 leading-relaxed">
            &quot;{response}&quot;
          </p>
        </div>
      )}
    </div>
  </main>
);

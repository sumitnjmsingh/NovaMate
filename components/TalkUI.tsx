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
      <h1 className="text-4xl font-extrabold text-cyan-400 tracking-tight drop-shadow-lg">
        NovaMate — Your AI Voice Assistant
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
            <span className="animate-pulse">🎧 Listening...</span>
          </>
        ) : (
          <>
            <span>🎙️ Start Talking</span>
          </>
        )}
      </button>

      {unsupported && (
        <div className="bg-red-500 text-white rounded p-3 shadow mt-4">
          ❌ Speech recognition is not supported in this browser. Please use
          Google Chrome.
        </div>
      )}

      {transcript && (
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mt-6">
          <p className="text-sm text-gray-400 mb-1 font-medium">🗣️ You said:</p>
          <p className="text-lg font-semibold text-white">
            &quot;{transcript}&quot;
          </p>
        </div>
      )}

      {response && (
        <div className="bg-cyan-950 border border-cyan-800 rounded-lg p-4 mt-4">
          <p className="text-sm text-cyan-300 mb-1 font-medium">
            💬 NovaMate says:
          </p>
          <p className="text-lg font-semibold text-cyan-100 leading-relaxed">
            &quot;{response}&quot;
          </p>
        </div>
      )}
    </div>
  </main>
);

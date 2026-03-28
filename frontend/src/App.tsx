import { useChat } from './hooks/useChat';
import VirtualAvatar from './components/VirtualAvatar';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';

function App() {
  const { messages, isLoading, currentEmotion, error, sendMessage, clearMessages } = useChat();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col">
      {/* Header */}
      <header className="bg-gray-900/80 backdrop-blur-sm border-b border-purple-500/20 p-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
              <span className="text-xl">✨</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">aiAurora</h1>
              <p className="text-xs text-gray-400">Your Virtual Companion</p>
            </div>
          </div>
          <button
            onClick={clearMessages}
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            Clear Chat
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-4 gap-4">
        {/* Virtual Avatar */}
        <div className="flex justify-center py-4">
          <VirtualAvatar 
            emotion={currentEmotion} 
            isSpeaking={isLoading}
            size="lg"
          />
        </div>

        {/* Chat Area */}
        <div className="flex-1 min-h-[400px] flex flex-col gap-4">
          <ChatWindow messages={messages} isLoading={isLoading} />
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <ChatInput 
            onSend={sendMessage} 
            disabled={isLoading}
            placeholder="Say something to your companion..."
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-4 text-gray-500 text-sm">
        <p>Powered by OpenAI GPT-4o</p>
      </footer>
    </div>
  );
}

export default App;

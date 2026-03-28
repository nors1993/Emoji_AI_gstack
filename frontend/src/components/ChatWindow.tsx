import React, { useRef, useEffect } from 'react';
import { Message } from '../types';
import { EMOTION_CONFIG } from '../types';

interface ChatWindowProps {
  messages: Message[];
  isLoading?: boolean;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900/50 rounded-lg">
      {messages.length === 0 && (
        <div className="flex items-center justify-center h-full text-gray-500">
          <p>Start a conversation with your virtual companion!</p>
        </div>
      )}
      
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`
              max-w-[80%] px-4 py-2 rounded-lg
              ${message.role === 'user' 
                ? 'bg-purple-600 text-white' 
                : 'bg-gray-800 text-gray-100'
              }
            `}
          >
            {/* Show emotion for assistant messages */}
            {message.role === 'assistant' && message.emotion && (
              <div className="flex items-center gap-2 mb-1">
                <span>{EMOTION_CONFIG[message.emotion].emoji}</span>
                <span className="text-xs text-gray-400">
                  {EMOTION_CONFIG[message.emotion].label}
                </span>
              </div>
            )}
            
            <p className="whitespace-pre-wrap">{message.content}</p>
            
            <span className="text-xs text-gray-400 mt-1 block">
              {new Date(message.timestamp).toLocaleTimeString()}
            </span>
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start">
          <div className="bg-gray-800 px-4 py-2 rounded-lg">
            <div className="flex gap-1">
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
              <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatWindow;

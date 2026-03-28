import React, { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({ 
  onSend, 
  disabled = false,
  placeholder = 'Type a message...'
}) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <textarea
        ref={textareaRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder}
        rows={1}
        className="
          flex-1
          bg-gray-800
          text-white
          rounded-lg
          px-4 py-3
          resize-none
          focus:outline-none
          focus:ring-2
          focus:ring-purple-500
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      />
      <button
        type="submit"
        disabled={disabled || !input.trim()}
        className="
          px-6
          py-3
          bg-purple-600
          hover:bg-purple-700
          disabled:bg-gray-600
          disabled:cursor-not-allowed
          text-white
          rounded-lg
          font-medium
          transition-colors
          duration-200
        "
      >
        {disabled ? '...' : 'Send'}
      </button>
    </form>
  );
};

export default ChatInput;

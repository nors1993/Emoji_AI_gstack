import { useState, useCallback } from 'react';
import { Message, ChatRequest, ChatResponse, Emotion } from '../types';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<Emotion>('neutral');
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const request: ChatRequest = { message: content };
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ChatResponse = await response.json();

      // Add assistant message
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: data.response,
        emotion: data.emotion,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setCurrentEmotion(data.emotion);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      
      // Add error message
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, something went wrong. Please try again.',
        emotion: 'sad',
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, errorMsg]);
      setCurrentEmotion('sad');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setCurrentEmotion('neutral');
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    currentEmotion,
    error,
    sendMessage,
    clearMessages
  };
};

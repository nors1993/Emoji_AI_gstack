// Emotion types
export type Emotion = 
  | 'happy' 
  | 'sad' 
  | 'neutral' 
  | 'surprised' 
  | 'angry' 
  | 'fearful' 
  | 'disgusted';

// Message types
export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  emotion?: Emotion;
  timestamp: number;
}

// Chat request/response types
export interface ChatRequest {
  message: string;
}

export interface ChatResponse {
  response: string;
  emotion: Emotion;
}

// Emotion configuration
export interface EmotionConfig {
  label: string;
  emoji: string;
  description: string;
  animation: string;
}

export const EMOTION_CONFIG: Record<Emotion, EmotionConfig> = {
  happy: {
    label: 'Happy',
    emoji: '😊',
    description: 'Feeling joyful and positive',
    animation: 'bounce'
  },
  sad: {
    label: 'Sad',
    emoji: '😢',
    description: 'Feeling down or disappointed',
    animation: 'droop'
  },
  neutral: {
    label: 'Neutral',
    emoji: '😐',
    description: 'Calm and balanced',
    animation: 'idle'
  },
  surprised: {
    label: 'Surprised',
    emoji: '😲',
    description: 'Unexpected or amazed',
    animation: 'startle'
  },
  angry: {
    label: 'Angry',
    emoji: '😠',
    description: 'Frustrated or upset',
    animation: 'shake'
  },
  fearful: {
    label: 'Fearful',
    emoji: '😨',
    description: 'Scared or anxious',
    animation: 'tremble'
  },
  disgusted: {
    label: 'Disgusted',
    emoji: '😒',
    description: 'Displeased or disgusted',
    animation: 'turn-away'
  }
};

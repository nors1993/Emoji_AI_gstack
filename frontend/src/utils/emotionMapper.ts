import { Emotion, EMOTION_CONFIG } from '../types';

/**
 * Maps emotion strings to animation classes
 */
export const getEmotionAnimationClass = (emotion: Emotion): string => {
  const config = EMOTION_CONFIG[emotion];
  switch (config.animation) {
    case 'bounce':
      return 'animate-bounce';
    case 'droop':
      return 'animate-droop';
    case 'idle':
      return 'animate-idle';
    case 'startle':
      return 'animate-startle';
    case 'shake':
      return 'animate-shake';
    case 'tremble':
      return 'animate-tremble';
    case 'turn-away':
      return 'animate-turn-away';
    default:
      return 'animate-idle';
  }
};

/**
 * Get color scheme for emotion
 */
export const getEmotionColor = (emotion: Emotion): string => {
  switch (emotion) {
    case 'happy':
      return '#4ADE80'; // green
    case 'sad':
      return '#60A5FA'; // blue
    case 'neutral':
      return '#A1A1AA'; // gray
    case 'surprised':
      return '#FBBF24'; // yellow
    case 'angry':
      return '#F87171'; // red
    case 'fearful':
      return '#C084FC'; // purple
    case 'disgusted':
      return '#FB923C'; // orange
    default:
      return '#A1A1AA';
  }
};

/**
 * Get avatar expression for emotion (CSS-based)
 */
export const getAvatarExpression = (emotion: Emotion) => {
  const expressions: Record<Emotion, { eyes: string; mouth: string; cheeks: string }> = {
    happy: {
      eyes: '😊',
      mouth: 'curve',
      cheeks: 'visible'
    },
    sad: {
      eyes: '😢',
      mouth: 'frown',
      cheeks: 'hidden'
    },
    neutral: {
      eyes: '●',
      mouth: 'line',
      cheeks: 'hidden'
    },
    surprised: {
      eyes: '○',
      mouth: 'open',
      cheeks: 'visible'
    },
    angry: {
      eyes: '><',
      mouth: 'frown',
      cheeks: 'visible'
    },
    fearful: {
      eyes: '◎',
      mouth: 'open',
      cheeks: 'hidden'
    },
    disgusted: {
      eyes: '/',
      mouth: 'squint',
      cheeks: 'hidden'
    }
  };
  return expressions[emotion];
};

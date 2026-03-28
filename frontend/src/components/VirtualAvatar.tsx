import React from 'react';
import { Emotion, EMOTION_CONFIG } from '../types';
import { getAvatarExpression } from '../utils/emotionMapper';

interface VirtualAvatarProps {
  emotion: Emotion;
  isSpeaking?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const VirtualAvatar: React.FC<VirtualAvatarProps> = ({ 
  emotion, 
  isSpeaking = false,
  size = 'md'
}) => {
  const config = EMOTION_CONFIG[emotion];
  const expression = getAvatarExpression(emotion);

  const sizeClasses = {
    sm: 'w-24 h-24 text-4xl',
    md: 'w-40 h-40 text-6xl',
    lg: 'w-64 h-64 text-8xl'
  };

  return (
    <div className={`${sizeClasses[size]} relative flex items-center justify-center`}>
      {/* Avatar Container */}
      <div 
        className={`
          relative rounded-full flex items-center justify-center
          bg-gradient-to-b from-purple-400 to-purple-600
          shadow-lg shadow-purple-500/30
          transition-all duration-300
          ${isSpeaking ? 'scale-110 animate-pulse' : 'scale-100'}
        `}
        style={{
          boxShadow: `0 0 40px ${config.label === 'Happy' ? '#4ADE80' : config.label === 'Sad' ? '#60A5FA' : '#A1A1AA'}40`
        }}
      >
        {/* Face */}
        <div className="flex flex-col items-center">
          {/* Eyes */}
          <div className="flex gap-2 mb-2">
            <span className={`
              transition-all duration-300
              ${isSpeaking ? 'animate-bounce' : ''}
            `}>
              {expression.eyes === '😊' ? '👀' : 
               expression.eyes === '😢' ? '💧' :
               expression.eyes === '><' ? '😠' :
               expression.eyes === '◎' ? '😨' :
               expression.eyes === '/' ? '😒' : '👀'}
            </span>
          </div>
          
          {/* Cheeks (visible for happy/surprised/angry) */}
          {expression.cheeks === 'visible' && (
            <div className="flex gap-8 -mt-1">
              <div className="w-4 h-2 rounded-full bg-pink-400 opacity-60"></div>
              <div className="w-4 h-2 rounded-full bg-pink-400 opacity-60"></div>
            </div>
          )}
          
          {/* Mouth */}
          <div className={`
            mt-1
            ${expression.mouth === 'curve' ? 'text-3xl' : 'text-2xl'}
          `}>
            {expression.mouth === 'curve' ? '😊' :
             expression.mouth === 'frown' ? '😟' :
             expression.mouth === 'open' ? '😮' :
             expression.mouth === 'squint' ? '😕' : '😐'}
          </div>
        </div>

        {/* Emotion Indicator Ring */}
        <div 
          className="absolute inset-0 rounded-full animate-ping opacity-20"
          style={{ backgroundColor: config.label === 'Happy' ? '#4ADE80' : config.label === 'Sad' ? '#60A5FA' : '#A1A1AA' }}
        ></div>
      </div>

      {/* Emotion Label */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <span className="text-sm font-medium text-gray-400">
          {config.emoji} {config.label}
        </span>
      </div>
    </div>
  );
};

export default VirtualAvatar;

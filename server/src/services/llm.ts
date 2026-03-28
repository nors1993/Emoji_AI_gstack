/**
 * LLM Service - AI Chat with Emotion Detection
 * Uses Node.js https module for better connection control
 */

import 'dotenv/config';
import { ChatResponse, Emotion, SYSTEM_PROMPT } from '../types';
import * as https from 'https';
import { URL } from 'url';

const BASE_URL = process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1';
const API_KEY = process.env.OPENAI_API_KEY || 'your-api-key-here';
const MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';

console.log('=============== LLM Config ===============');
console.log('Base URL:', BASE_URL);
console.log('Model:', MODEL);
console.log('API Key starts with:', API_KEY.slice(0, 10));
console.log('==========================================');

// Emotion keywords for fallback parsing
const EMOTION_KEYWORDS: Record<Emotion, string[]> = {
  happy: ['happy', 'joy', 'excited', 'great', 'wonderful', 'love', 'thanks', 'grateful', 'amazing', 'awesome', 'fun', 'laugh', 'smile', 'celebrate'],
  sad: ['sad', 'sorry', 'miss', 'feel bad', 'cry', 'tears', 'unfortunate', 'unfortunately', 'depressed', 'down', 'upset'],
  neutral: ['okay', 'alright', 'sure', 'maybe', 'perhaps', 'think', 'consider', 'information', 'fact'],
  surprised: ['wow', 'unexpected', 'surprise', 'amazing', 'incredible', 'unbelievable', 'really', 'no way', 'wait'],
  angry: ['angry', 'mad', 'frustrated', 'annoyed', 'hate', 'stupid', 'ridiculous', 'unacceptable', 'terrible'],
  fearful: ['worried', 'concerned', 'afraid', 'scared', 'nervous', 'anxious', 'fear', 'panic', 'danger', 'risk'],
  disgusted: ['disgusting', 'gross', 'nasty', 'awful', 'yuck', 'repulsive', 'sickening']
};

function detectEmotion(text: string): Emotion {
  const lowerText = text.toLowerCase();
  const scores: Record<Emotion, number> = {
    happy: 0, sad: 0, neutral: 0, surprised: 0, angry: 0, fearful: 0, disgusted: 0
  };

  for (const [emotion, keywords] of Object.entries(EMOTION_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lowerText.includes(keyword)) scores[emotion as Emotion]++;
    }
  }

  let maxEmotion: Emotion = 'neutral';
  let maxScore = 0;
  for (const [emotion, score] of Object.entries(scores)) {
    if (score > maxScore) { maxScore = score; maxEmotion = emotion as Emotion; }
  }
  return maxEmotion;
}

function parseLLMResponse(content: string): { response: string; emotion: Emotion } {
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      if (parsed.response && parsed.emotion) {
        return { response: parsed.response, emotion: parsed.emotion as Emotion };
      }
    }
  } catch {}
  return { response: content.trim(), emotion: detectEmotion(content) };
}

function httpsRequest(urlStr: string, data: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(urlStr);
    
    const options = {
      hostname: parsedUrl.hostname,
      port: 443,
      path: parsedUrl.pathname + '/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      }
    };

    console.log('[HTTPS] Request to:', options.hostname, options.path);

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        console.log('[HTTPS] Response status:', res.statusCode);
        try {
          const json = JSON.parse(body);
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            resolve(json);
          } else {
            reject(new Error(json.error?.message || `HTTP ${res.statusCode}`));
          }
        } catch (e) {
          reject(new Error(`Invalid JSON: ${body.substring(0, 200)}`));
        }
      });
    });

    req.on('error', (e) => {
      console.error('[HTTPS] Error:', e.message);
      reject(e);
    });

    req.setTimeout(30000, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });

    req.write(JSON.stringify(data));
    req.end();
  });
}

export async function sendChatMessage(message: string, retries = 3): Promise<ChatResponse> {
  const requestData = {
    model: MODEL,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: message }
    ],
    temperature: 0.7,
    max_tokens: 500
  };

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      console.log(`[Attempt ${attempt}/${retries}] Sending request...`);
      
      const data = await httpsRequest(BASE_URL, requestData);
      const content = data.choices?.[0]?.message?.content || '';
      
      if (!content) {
        return { response: "I'm sorry, I couldn't generate a response.", emotion: 'neutral' };
      }

      console.log('[Success] Received response');
      return parseLLMResponse(content);
      
    } catch (error: any) {
      console.error(`[Attempt ${attempt}] Failed:`, error.message);
      
      if (attempt === retries) {
        return { response: `Error: ${error.message}`, emotion: 'sad' };
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
  
  return { response: 'Connection failed after retries', emotion: 'sad' };
}

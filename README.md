# aiAurora - Virtual Companion

A LLM-powered virtual companion with emotional expression through visual avatars.

## Features

- 🤖 **LLM-Powered Chat** - Powered by DeepSeek (OpenAI-compatible)
- 😊 **7 Emotional States** - Happy, Sad, Neutral, Surprised, Angry, Fearful, Disgusted
- 🎭 **Visual Emotion Display** - Animated avatar that reflects AI's emotional state
- 💬 **Real-time Conversation** - Smooth chat experience with loading states

## Quick Start

### Prerequisites

- Node.js 18+
- DeepSeek API Key (or other OpenAI-compatible API)

### Installation

1. **Clone the project:**

```bash
git clone https://github.com/YOUR_USERNAME/Emoji_AI.git
cd Emoji_AI
```

2. **Install dependencies:**

```bash
# Install frontend
cd frontend
npm install

# Install backend
cd ../server
npm install
```

3. **Configure environment:**

```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your API credentials
```

Edit `server/.env`:
```env
OPENAI_API_KEY=your-api-key-here
OPENAI_BASE_URL=https://api.deepseek.com/v1
OPENAI_MODEL=deepseek-chat
PORT=3001
```

4. **Run the application:**

```bash
# Terminal 1 - Start backend
cd server
npm run dev

# Terminal 2 - Start frontend
cd frontend
npm run dev
```

5. **Open browser:**

Navigate to http://localhost:3000

## Architecture

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│   Backend   │────▶│  DeepSeek   │
│   (React)   │◀────│  (Express)  │◀────│    API      │
└─────────────┘     └─────────────┘     └─────────────┘
```

## API Endpoints

### POST /api/chat

Send a chat message and receive a response with emotion.

**Request:**
```json
{
  "message": "Hello! How are you?"
}
```

**Response:**
```json
{
  "response": "Hello! I'm doing great, thanks for asking!",
  "emotion": "happy"
}
```

### GET /health

Health check endpoint.

### GET /api/test-connection

Test API connection.

## Tech Stack

- **Frontend:** React 18, TypeScript, Vite, Tailwind CSS
- **Backend:** Express.js, TypeScript
- **LLM:** DeepSeek (OpenAI-compatible)

## Supported LLM Providers

This project supports any OpenAI-compatible API:

- **DeepSeek** - https://api.deepseek.com/v1
- **SiliconFlow** - https://api.siliconflow.cn/v1
- **OpenAI** - https://api.openai.com/v1

## License

MIT

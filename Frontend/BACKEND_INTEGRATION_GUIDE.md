# 📂 Project Directory Structure

## **Root Level** (`EECE455/cryptotutor (1)/`)

```
├── client/              # Frontend React application
├── server/              # Backend Express server
├── shared/              # Shared code between client & server
├── patches/             # pnpm patches for dependencies
├── node_modules/        # Dependencies
├── package.json         # Project configuration & scripts
├── vite.config.ts       # Vite bundler configuration
├── tsconfig.json        # TypeScript configuration
└── todo.md              # Project tasks & progress
```

---

## **1. CLIENT Directory** (`client/`)

**Purpose**: Frontend React SPA (Single Page Application)

### Structure:
```
client/
├── index.html           # Entry HTML file
├── public/              # Static assets (images, fonts)
└── src/
    ├── main.tsx         # React entry point
    ├── App.tsx          # Root component with routing
    ├── index.css        # Global styles (Tailwind)
    │
    ├── pages/           # Page components
    │   └── Home.tsx     # Main page with chat + lessons
    │
    ├── components/      # React components
    │   ├── ChatPanel.tsx              # Chat interface
    │   ├── MessageBubble.tsx          # Individual messages
    │   ├── InteractiveLessonBox.tsx   # Lesson wrapper
    │   ├── AESLesson.tsx              # AES lesson
    │   ├── DESLesson.tsx              # DES lesson
    │   ├── HMACLesson.tsx             # HMAC lesson
    │   ├── RSAPerformanceLimits.tsx   # RSA performance lesson
    │   └── [other lessons]/
    │
    ├── hooks/           # React custom hooks
    │   ├── useChat.ts   # Chat state management
    │   └── use*LessonState.ts  # Lesson state hooks
    │
    ├── contexts/        # React contexts
    │   └── ThemeContext.tsx  # Dark/light mode
    │
    ├── lib/             # Utility functions
    │   └── utils.ts
    │
    └── const.ts         # Frontend constants
```

---

## **2. SERVER Directory** (`server/`)

**Purpose**: Backend Express server (currently minimal)

```
server/
└── index.ts    # Express server that:
                # - Serves static files in production
                # - Handles client-side routing (SPA)
                # - Currently NO API routes
```

**Current functionality:**
- Static file serving
- SPA fallback routing (all routes → `index.html`)
- **NO backend logic yet**

---

## **3. SHARED Directory** (`shared/`)

**Purpose**: Code shared between client & server

```
shared/
└── const.ts    # Shared constants (COOKIE_NAME, etc.)
```

---

# 🔌 **Backend Integration Guide**

## **Current Architecture: 100% Frontend**

Right now, **everything runs in the browser**:
- ✅ Chat message handling → `useChat.ts` hook
- ✅ Lesson triggering → `Home.tsx` keyword matching
- ✅ Responses → Hardcoded in `handleAddMessage()`

---

## **How to Move Logic to Backend**

### **Step 1: Add Backend API Routes**

**File**: `server/index.ts`

Add API endpoints:

```typescript
import express from "express";
import { createServer } from "http";

async function startServer() {
  const app = express();
  app.use(express.json()); // Parse JSON bodies

  // ============ NEW API ROUTES ============
  
  // 1. Chat endpoint - handles user messages
  app.post("/api/chat", async (req, res) => {
    const { message, conversationHistory } = req.body;
    
    // TODO: Call your LLM/AI backend here
    // Example: OpenAI, Claude, or custom model
    const response = await processUserMessage(message, conversationHistory);
    
    res.json({ 
      response: response.text,
      lessonToTrigger: response.lesson, // e.g., "rsa-performance"
      metadata: response.metadata
    });
  });

  // 2. Lesson prompt endpoint - get lesson intros
  app.get("/api/lessons/:lessonId/prompt", (req, res) => {
    const prompts = {
      "des": "I've opened the DES lesson...",
      "aes": "I've opened the AES lesson...",
      "rsa-performance": "Let's explore RSA performance..."
    };
    res.json({ prompt: prompts[req.params.lessonId] });
  });

  // ============ STATIC FILES (keep at end) ============
  app.use(express.static(staticPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}
```

---

### **Step 2: Update Frontend to Call Backend**

**File**: `client/src/hooks/useChat.ts`

Replace hardcoded logic with API calls:

```typescript
export function useChat() {
  // ... existing state ...

  const sendMessageToBackend = useCallback(async (message: string) => {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message, 
          conversationHistory: messages 
        })
      });
      
      const data = await response.json();
      return data; // { response, lessonToTrigger, metadata }
    } catch (error) {
      console.error('Backend error:', error);
      return { response: 'Sorry, something went wrong.' };
    }
  }, [messages]);

  return {
    messages,
    addMessage,
    sendMessageToBackend, // NEW: expose backend function
    simulateAssistantResponse,
  };
}
```

**File**: `client/src/pages/Home.tsx`

Update message handler:

```typescript
const handleAddMessage = async (content: string) => {
  addMessage(content, 'user');

  // ======= REPLACE THIS BLOCK =======
  // Old: keyword matching in frontend
  const lowerContent = content.toLowerCase();
  if (lowerContent.includes('des')) { ... }
  
  // New: call backend
  const backendResponse = await sendMessageToBackend(content);
  
  // Trigger lesson if backend says so
  if (backendResponse.lessonToTrigger) {
    setActiveLesson(backendResponse.lessonToTrigger);
  }
  
  // Display backend's response
  simulateAssistantResponse(backendResponse.response);
};
```

---

### **Step 3: Move Prompts to Backend**

Currently, prompts are in `Home.tsx`:

```typescript
// ❌ OLD: Hardcoded in frontend
simulateAssistantResponse('I\'ve opened the RSA Performance lesson!...');
```

**Move to backend**:

1. **Create prompt configuration file**: `server/prompts.ts`

```typescript
export const lessonPrompts = {
  "des": {
    trigger: "I've opened the interactive DES lesson for you. Let's explore how this classic encryption algorithm works!",
    description: "Learn about Data Encryption Standard",
    keywords: ["des", "data encryption standard"]
  },
  "rsa-performance": {
    trigger: "I've opened the RSA Performance lesson! Let's explore why RSA is slow and unsuitable for bulk data encryption.",
    description: "Understand RSA speed limitations",
    keywords: ["rsa", "performance", "slow", "speed", "bulk"]
  },
  // ... all other lessons
};

export function matchLessonByKeywords(message: string): string | null {
  const lower = message.toLowerCase();
  
  for (const [lessonId, config] of Object.entries(lessonPrompts)) {
    if (config.keywords.some(kw => lower.includes(kw))) {
      return lessonId;
    }
  }
  return null;
}
```

2. **Use in API**:

```typescript
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  
  // Match lesson
  const lessonId = matchLessonByKeywords(message);
  
  if (lessonId) {
    res.json({
      response: lessonPrompts[lessonId].trigger,
      lessonToTrigger: lessonId
    });
  } else {
    // Call LLM for general questions
    const aiResponse = await callYourLLM(message);
    res.json({ response: aiResponse });
  }
});
```

---

## **Where Each Piece Lives**

| Component | Current Location | Backend-Integrated Location |
|-----------|-----------------|---------------------------|
| **Chat UI** | `client/src/components/ChatPanel.tsx` | ✅ Stays in frontend |
| **Lesson Components** | `client/src/components/*Lesson.tsx` | ✅ Stays in frontend (visual) |
| **Message Routing** | `client/src/pages/Home.tsx` | ⚠️ Move to `server/index.ts` |
| **Prompt Text** | `client/src/pages/Home.tsx` | ⚠️ Move to `server/prompts.ts` |
| **Keyword Matching** | `client/src/pages/Home.tsx` | ⚠️ Move to `server/prompts.ts` |
| **LLM Calls** | ❌ None yet | ⚠️ Add to `server/index.ts` |

---

## **Key Considerations for Backend Integration**

### 1. **Lesson Triggering Flow**
```
User types "Why is RSA slow?" 
    ↓
Frontend sends to: POST /api/chat
    ↓
Backend matches keywords → "rsa-performance"
    ↓
Backend returns: { 
  response: "Let's explore...",
  lessonToTrigger: "rsa-performance" 
}
    ↓
Frontend: setActiveLesson("rsa-performance")
    ↓
Component <RSAPerformanceLimits /> renders
```

### 2. **Lesson Content**
- **Visual lessons** (`RSAPerformanceLimits.tsx`, etc.) → Stay in frontend
- **Text prompts** → Move to backend
- **Interactive animations** → Stay in frontend

### 3. **Environment Variables**
Add to `.env` (create if missing):
```bash
# LLM Configuration
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-...

# App Configuration
VITE_APP_TITLE="CryptoTutor"
PORT=3000
```

### 4. **API Client Helper**
Create `client/src/lib/api.ts`:
```typescript
export async function sendChatMessage(message: string, history: any[]) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, conversationHistory: history })
  });
  return res.json();
}

export async function getLessonPrompt(lessonId: string) {
  const res = await fetch(`/api/lessons/${lessonId}/prompt`);
  return res.json();
}
```

---

## **Testing the Integration**

1. **Start dev server**: `pnpm dev` (runs frontend on 3001)
2. **Add backend endpoint** in `server/index.ts`
3. **Test**: `curl -X POST http://localhost:3001/api/chat -H "Content-Type: application/json" -d '{"message":"why is rsa slow"}'`
4. **Frontend calls**: Update `Home.tsx` to use `fetch('/api/chat', ...)`

---

## **Summary**

✅ **Keep in Frontend**: UI, lessons, animations, state management  
⚠️ **Move to Backend**: Keyword matching, prompts, LLM calls, conversation logic  
📝 **Files to modify**:
- `server/index.ts` - Add API routes
- `server/prompts.ts` - NEW file for lesson configs
- `client/src/hooks/useChat.ts` - Add backend calls
- `client/src/pages/Home.tsx` - Replace keyword logic with API calls

The frontend becomes a **"dumb" delivery layer** that just renders what the backend tells it to show! 🎯

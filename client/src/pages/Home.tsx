/**
 * Home Page Component
 * 
 * This is the main page of the CryptoTutor application.
 * It manages the chat interface and all 8 interactive cryptography lessons.
 * 
 * Features:
 * - Welcome animation on first load
 * - Chat interface for asking questions
 * - Keyword-based lesson triggering
 * - 8 interactive lessons covering encryption, authentication, and protocols
 * - Dark/light theme toggle
 */

import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useChat } from '@/hooks/useChat';
import { ChatPanel } from '@/components/ChatPanel';
import { WelcomeAnimation } from '@/components/WelcomeAnimation';

// Import all 8 interactive lesson components
import { DESLesson } from '@/components/DESLesson';
import { AESLesson } from '@/components/AESLesson';
import { HMACLesson } from '@/components/HMACLesson';
import { MACOrderingLesson } from '@/components/MACOrderingLesson';
import { NonceAuthLesson } from '@/components/NonceAuthLesson';
import { FreshnessMechanismsLesson } from '@/components/FreshnessMechanismsLesson';
import { MutualAuthenticationDemo } from '@/components/MutualAuthenticationDemo';
import { RSAPerformanceLimits } from '@/components/RSAPerformanceLimits';

import { Button } from '@/components/ui/button';
import { Moon, Sun, ShieldCheck } from 'lucide-react';
import { APP_TITLE } from '@/const';

/**
 * Lesson Type Definition
 * Defines all possible lesson IDs that can be triggered.
 * Total: 8 interactive lessons
 */
type LessonType = 'des' | 'aes' | 'hmac' | 'mac-ordering' | 'nonce' | 'freshness' | 'mutual-auth' | 'rsa-performance' | null;

/**
 * Home Component
 * Main application component that renders the chat interface and lessons
 */
export default function Home() {
  // Get theme management functions (light/dark mode)
  const { theme, toggleTheme } = useTheme();
  
  // Get chat state and functions from custom hook
  const { messages, addMessage, simulateAssistantResponse } = useChat();
  
  // Track which lesson is currently active (null = no lesson shown)
  const [activLesson, setActiveLesson] = useState<LessonType>(null);
  
  // Track welcome animation state
  const [showWelcome, setShowWelcome] = useState(true);
  
  // Check if welcome animation has been shown before
  // During development, you can clear sessionStorage to see the animation again
  useEffect(() => {
    const hasSeenWelcome = sessionStorage.getItem('hasSeenWelcome');
    if (hasSeenWelcome) {
      setShowWelcome(false);
    }
    
    // Development mode: Log state for debugging
    if (import.meta.env.DEV) {
      console.log('Welcome animation state:', { showWelcome: !hasSeenWelcome });
      console.log('Tip: Press Ctrl+Shift+W to reset and see the welcome animation again');
    }
    
    // Development keyboard shortcut: Ctrl+Shift+W to reset welcome animation
    const handleKeyPress = (e: KeyboardEvent) => {
      if (import.meta.env.DEV && e.ctrlKey && e.shiftKey && e.key === 'W') {
        e.preventDefault();
        sessionStorage.removeItem('hasSeenWelcome');
        window.location.reload();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);
  
  /**
   * Handle Welcome Animation Complete
   * Called when the welcome animation finishes
   */
  const handleWelcomeComplete = () => {
    setShowWelcome(false);
    sessionStorage.setItem('hasSeenWelcome', 'true');
  };

  /**
   * Handle User Messages
   * 
   * This function processes user input and decides which lesson to trigger
   * based on keyword matching. In a backend-integrated version, this logic
   * would move to the server and use an LLM for more intelligent routing.
   * 
   * @param content - The user's message text
   */
  const handleAddMessage = (content: string) => {
    // Add user message to chat history
    addMessage(content, 'user');

    // Convert to lowercase for case-insensitive keyword matching
    const lowerContent = content.toLowerCase();
    
    // ========== LESSON 1: DES (Data Encryption Standard) ==========
    // Triggers: "des" (but not "aes")
    if (lowerContent.includes('des') && !lowerContent.includes('aes')) {
      setTimeout(() => {
        setActiveLesson('des');
        simulateAssistantResponse('I\'ve opened the interactive DES lesson for you. Let\'s explore how this classic encryption algorithm works!');
      }, 800);
    }
    
    // ========== LESSON 2: AES (Advanced Encryption Standard) ==========
    // Triggers: "aes"
    else if (lowerContent.includes('aes')) {
      setTimeout(() => {
        setActiveLesson('aes');
        simulateAssistantResponse('I\'ve opened the interactive AES lesson for you. Let\'s learn about the modern encryption standard!');
      }, 800);
    }
    
    // ========== LESSON 3: HMAC (Hash-based Message Authentication Code) ==========
    // Triggers: "hmac" (but not "mac ordering" or "encrypt")
    else if (lowerContent.includes('hmac') && !lowerContent.includes('mac ordering') && !lowerContent.includes('encrypt')) {
      setTimeout(() => {
        setActiveLesson('hmac');
        simulateAssistantResponse('I\'ve opened the HMAC Deep Dive lesson for you. Let\'s explore the internal structure of hash-based message authentication!');
      }, 800);
    }
    
    // ========== LESSON 4: MAC Ordering Security ==========
    // Triggers: "mac ordering", "encrypt-then-mac", "mac-then-encrypt"
    else if (lowerContent.includes('mac ordering') || lowerContent.includes('encrypt-then-mac') || lowerContent.includes('mac-then-encrypt')) {
      setTimeout(() => {
        setActiveLesson('mac-ordering');
        simulateAssistantResponse('I\'ve opened the MAC Ordering Security lesson! Let\'s learn why Encrypt-then-MAC is the only secure approach.');
      }, 800);
    }
    
    // ========== LESSON 5: Nonce Authentication ==========
    // Triggers: "nonce", "challenge-response", "replay attack"
    else if (lowerContent.includes('nonce') || lowerContent.includes('challenge-response') || lowerContent.includes('replay attack')) {
      setTimeout(() => {
        setActiveLesson('nonce');
        simulateAssistantResponse('I\'ve opened the Nonce Authentication lesson! Let\'s explore how nonces prevent replay attacks and ensure message freshness.');
      }, 800);
    }
    
    // ========== LESSON 6: Freshness Mechanisms ==========
    // Triggers: "freshness", "timestamp", "sequence number"
    else if (lowerContent.includes('freshness') || lowerContent.includes('timestamp') || (lowerContent.includes('sequence') && lowerContent.includes('number'))) {
      setTimeout(() => {
        setActiveLesson('freshness');
        simulateAssistantResponse('I\'ve opened the Freshness Mechanisms lesson! Let\'s compare Timestamp, Nonce, and Sequence Number approaches.');
      }, 800);
    }
    
    // ========== LESSON 7: Mutual Authentication ==========
    // Triggers: "mutual", "mtls", "two-way auth"
    else if (lowerContent.includes('mutual') || lowerContent.includes('mtls') || (lowerContent.includes('two-way') && lowerContent.includes('auth'))) {
      setTimeout(() => {
        setActiveLesson('mutual-auth');
        simulateAssistantResponse('I\'ve opened the Mutual Authentication lesson! Let\'s explore how two-way verification prevents MITM attacks.');
      }, 800);
    }
    
    // ========== LESSON 8: RSA Performance Limits ==========
    // Triggers: "rsa" + ("performance", "slow", "speed", or "bulk")
    else if (lowerContent.includes('rsa') && (lowerContent.includes('performance') || lowerContent.includes('slow') || lowerContent.includes('speed') || lowerContent.includes('bulk'))) {
      setTimeout(() => {
        setActiveLesson('rsa-performance');
        simulateAssistantResponse('I\'ve opened the RSA Performance lesson! Let\'s explore why RSA is slow and unsuitable for bulk data encryption.');
      }, 800);
    }
  };

  /**
   * Handle Lesson Close
   * Called when user clicks the X button on a lesson
   * Returns to chat view
   */
  const handleLessonClose = () => {
    setActiveLesson(null);
  };

  return (
    <>
      {/* ========== WELCOME ANIMATION ========== */}
      {showWelcome && <WelcomeAnimation onComplete={handleWelcomeComplete} />}
      
      <div className="h-screen flex flex-col bg-white dark:bg-slate-950 overflow-hidden">
      {/* ========== HEADER BAR ========== */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 z-50 flex-shrink-0">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* App Logo and Title */}
          <div className="flex items-center gap-3">
            {/* Logo Icon - Shield with checkmark representing cryptography security */}
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-600 to-teal-700 flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            {/* App Title - displays CRYP-THYNK Unlimited */}
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              {APP_TITLE}
            </h1>
          </div>
          
          {/* Theme Toggle Button (Dark/Light Mode) */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            ) : (
              <Sun className="w-5 h-5 text-slate-600 dark:text-slate-400" />
            )}
          </button>
        </div>
      </header>

      {/* ========== MAIN CHAT AREA ========== */}
      <main className="flex-1 max-w-4xl w-full mx-auto flex flex-col">
        <ChatPanel
          messages={messages}
          onAddMessage={handleAddMessage}
          onSimulateResponse={simulateAssistantResponse}
        >
          {/* Conditionally render lessons based on activLesson state */}
          {/* Only one lesson can be active at a time */}
          
          {/* LESSON 1: DES Encryption */}
          {activLesson === 'des' && <DESLesson onClose={handleLessonClose} />}
          
          {/* LESSON 2: AES Encryption */}
          {activLesson === 'aes' && <AESLesson onClose={handleLessonClose} />}
          
          {/* LESSON 3: HMAC Deep Dive */}
          {activLesson === 'hmac' && <HMACLesson onClose={handleLessonClose} />}
          
          {/* LESSON 4: MAC Ordering Security */}
          {activLesson === 'mac-ordering' && <MACOrderingLesson onClose={handleLessonClose} />}
          
          {/* LESSON 5: Nonce Authentication */}
          {activLesson === 'nonce' && <NonceAuthLesson onClose={handleLessonClose} />}
          
          {/* LESSON 6: Freshness Mechanisms */}
          {activLesson === 'freshness' && <FreshnessMechanismsLesson onClose={handleLessonClose} />}
          
          {/* LESSON 7: Mutual Authentication */}
          {activLesson === 'mutual-auth' && <MutualAuthenticationDemo onClose={handleLessonClose} />}
          
          {/* LESSON 8: RSA Performance Limits */}
          {activLesson === 'rsa-performance' && <RSAPerformanceLimits onClose={handleLessonClose} />}
        </ChatPanel>
      </main>
    </div>
    </>
  );
}

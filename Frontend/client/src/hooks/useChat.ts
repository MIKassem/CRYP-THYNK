/**
 * Chat Hook
 * 
 * Custom React hook that manages chat state and functionality.
 * Handles message history, typing indicators, and simulated responses.
 * 
 * In a backend-integrated version, this would make API calls
 * to a real LLM/AI service instead of using simulated responses.
 */

import { useState, useCallback, useRef } from 'react';

/**
 * Chat Message Interface
 * Defines the structure of each message in the chat
 */
export interface ChatMessage {
  id: string;              // Unique identifier for the message
  role: 'user' | 'assistant'; // Who sent the message
  content: string;         // The actual message text
  timestamp: Date;         // When the message was sent
  isTyping?: boolean;      // True if this is a typing indicator message
}

/**
 * useChat Hook
 * 
 * Manages all chat-related state and provides functions to:
 * - Add user and assistant messages
 * - Show/hide typing indicators
 * - Simulate delayed responses
 * 
 * @returns {Object} Chat state and functions
 */
export function useChat() {
  // Counter to ensure unique message IDs
  const messageCounterRef = useRef(0);

  /**
   * Generate Unique Message ID
   * Combines timestamp with counter for guaranteed uniqueness
   */
  const generateUniqueId = useCallback(() => {
    messageCounterRef.current += 1;
    return `msg-${Date.now()}-${messageCounterRef.current}`;
  }, []);

  /**
   * Messages State
   * Stores all chat messages, initialized with a welcome message
   */
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-initial-1',
      role: 'assistant',
      content: 'Hello! I\'m your cryptography tutor. I can teach you about encryption algorithms through interactive lessons. Choose a lesson to begin:\n\n**Encryption Algorithms:**\n• Type "DES" for Data Encryption Standard\n• Type "AES" for Advanced Encryption Standard\n\n**Message Authentication:**\n• Type "HMAC" for Hash-based Message Authentication Code\n• Type "MAC Ordering" for MAC Ordering Security\n\n**Authentication Protocols:**\n• Type "Nonce" for Nonce Authentication & Replay Attacks\n• Type "Freshness" for Freshness Mechanisms (Timestamp vs Nonce vs Sequence)\n• Type "Mutual Auth" for Mutual Authentication & MITM Prevention\n\n**Performance & Limitations:**\n• Type "RSA Performance" for RSA Performance Limits\n\nWhich would you like to explore?',
      timestamp: new Date(),
    },
  ]);

  /**
   * Add Message
   * Adds a new message to the chat history
   * 
   * @param content - The message text
   * @param role - Who is sending the message ('user' or 'assistant')
   * @returns {ChatMessage} The newly created message
   */
  const addMessage = useCallback((content: string, role: 'user' | 'assistant' = 'user') => {
    const newMessage: ChatMessage = {
      id: generateUniqueId(),
      role,
      content,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, [generateUniqueId]);

  /**
   * Add Typing Indicator
   * Shows "..." animation while assistant is "thinking"
   * 
   * @returns {string} ID of the typing indicator message
   */
  const addTypingIndicator = useCallback(() => {
    const typingMessage: ChatMessage = {
      id: generateUniqueId(),
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isTyping: true,
    };
    setMessages(prev => [...prev, typingMessage]);
    return typingMessage.id;
  }, [generateUniqueId]);

  /**
   * Remove Typing Indicator
   * Removes the typing indicator after response is ready
   * 
   * @param typingId - ID of the typing indicator to remove
   */
  const removeTypingIndicator = useCallback((typingId: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== typingId));
  }, []);

  /**
   * Simulate Assistant Response
   * Shows typing indicator, waits, then displays the response
   * 
   * In a real implementation, this would be replaced with an
   * API call to your backend/LLM service.
   * 
   * @param response - The message to display
   * @param delay - How long to wait before showing response (ms)
   */
  const simulateAssistantResponse = useCallback((response: string, delay: number = 1000) => {
    const typingId = addTypingIndicator();
    setTimeout(() => {
      removeTypingIndicator(typingId);
      addMessage(response, 'assistant');
    }, delay);
  }, [addMessage, addTypingIndicator, removeTypingIndicator]);

  // Return all chat state and functions
  return {
    messages,
    addMessage,
    addTypingIndicator,
    removeTypingIndicator,
    simulateAssistantResponse,
  };
}

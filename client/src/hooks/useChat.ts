import { useState, useCallback, useRef } from 'react';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

export function useChat() {
  const messageCounterRef = useRef(0);

  const generateUniqueId = useCallback(() => {
    messageCounterRef.current += 1;
    return `msg-${Date.now()}-${messageCounterRef.current}`;
  }, []);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-initial-1',
      role: 'assistant',
      content: 'Hello! I\'m your cryptography tutor. I can help you understand various encryption algorithms and concepts. Would you like to start with an interactive lesson on DES (Data Encryption Standard)?',
      timestamp: new Date(),
    },
  ]);

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

  const removeTypingIndicator = useCallback((typingId: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== typingId));
  }, []);

  const simulateAssistantResponse = useCallback((response: string, delay: number = 1000) => {
    const typingId = addTypingIndicator();
    setTimeout(() => {
      removeTypingIndicator(typingId);
      addMessage(response, 'assistant');
    }, delay);
  }, [addMessage, addTypingIndicator, removeTypingIndicator]);

  return {
    messages,
    addMessage,
    addTypingIndicator,
    removeTypingIndicator,
    simulateAssistantResponse,
  };
}

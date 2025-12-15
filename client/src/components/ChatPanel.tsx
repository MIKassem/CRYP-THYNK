import { useEffect, useRef, useState } from 'react';
import { ChatMessage, useChat } from '@/hooks/useChat';
import { MessageBubble } from './MessageBubble';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatPanelProps {
  messages: ChatMessage[];
  onAddMessage: (content: string) => void;
  onSimulateResponse: (response: string) => void;
  children?: React.ReactNode;
}

export function ChatPanel({
  messages,
  onAddMessage,
  onSimulateResponse,
  children,
}: ChatPanelProps) {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Scroll to bottom on initial mount
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'instant' });
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage = inputValue.trim();
    setInputValue('');
    setIsLoading(true);

    // Add user message
    onAddMessage(userMessage);

    // Simulate assistant response with demo logic
    setTimeout(() => {
      let response = '';
      const lowerMessage = userMessage.toLowerCase();

      if (lowerMessage.includes('des') && !lowerMessage.includes('aes')) {
        response = 'Great! DES (Data Encryption Standard) is a classic symmetric encryption algorithm. Would you like to start the interactive DES lesson to learn how it works step by step?';
      } else if (lowerMessage.includes('aes')) {
        response = 'Excellent choice! AES (Advanced Encryption Standard) is the modern encryption standard. Would you like to start the interactive AES lesson to see how it works?';
      } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        response = 'Hello! I\'m here to help you learn cryptography. You can explore interactive lessons on DES or AES. Which one interests you?';
      } else if (lowerMessage.includes('help')) {
        response = 'I can help you with:\n• Interactive DES lesson (classic encryption)\n• Interactive AES lesson (modern encryption)\n• Step-by-step algorithm walkthroughs\n\nType "DES" or "AES" to begin!';
      } else {
        response = 'That\'s an interesting question! I offer interactive lessons on encryption algorithms. Type "DES" for the classic Data Encryption Standard, or "AES" for the modern Advanced Encryption Standard.';
      }

      onSimulateResponse(response);
      setIsLoading(false);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e as any);
    }
  };

  return (
    <div className="flex flex-col h-full w-full bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
      {/* Messages Area - Flex 1 to take remaining space */}
      <div ref={containerRef} className="flex-1 overflow-y-auto px-4 w-full">
        <div className="min-h-full flex flex-col justify-end py-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
            {children}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-4 flex-shrink-0 w-full">
        <form onSubmit={handleSendMessage} className="flex flex-col gap-3">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              // Auto-grow textarea up to 3 lines
              const textarea = e.target;
              textarea.style.height = 'auto';
              const lineHeight = 24; // approximate line height
              const maxHeight = lineHeight * 3;
              const newHeight = Math.min(textarea.scrollHeight, maxHeight);
              textarea.style.height = newHeight + 'px';
            }}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about cryptography... (Shift+Enter for new line)"
            className={cn(
              'w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600',
              'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100',
              'placeholder-slate-500 dark:placeholder-slate-400',
              'focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400',
              'resize-none overflow-y-auto',
              'transition-all duration-200'
            )}
            rows={1}
            disabled={isLoading}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 text-white rounded-lg px-4 py-2 flex items-center gap-2"
            >
              <Send size={18} />
              Send
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

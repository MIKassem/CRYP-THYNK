import { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useChat } from '@/hooks/useChat';
import { ChatPanel } from '@/components/ChatPanel';
import { DESLesson } from '@/components/DESLesson';
import { Button } from '@/components/ui/button';
import { Moon, Sun, BookOpen } from 'lucide-react';
import { APP_TITLE } from '@/const';

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const { messages, addMessage, simulateAssistantResponse } = useChat();
  const [showLesson, setShowLesson] = useState(false);

  const handleAddMessage = (content: string) => {
    addMessage(content, 'user');

    // Handle specific user inputs
    if (content.toLowerCase().includes('des') || content.toLowerCase().includes('lesson')) {
      setTimeout(() => {
        setShowLesson(true);
        simulateAssistantResponse('I\'ve opened the interactive DES lesson for you. Let\'s explore how this classic encryption algorithm works!');
      }, 800);
    }
  };

  const handleLessonClose = () => {
    setShowLesson(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              {APP_TITLE}
            </h1>
          </div>
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

      {/* Main Chat Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto flex flex-col">
        <ChatPanel
          messages={messages}
          onAddMessage={handleAddMessage}
          onSimulateResponse={simulateAssistantResponse}
        >
          {showLesson && <DESLesson onClose={handleLessonClose} />}
        </ChatPanel>
      </main>
    </div>
  );
}

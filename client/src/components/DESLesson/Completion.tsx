import { Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CompletionProps {
  onFinish: () => void;
}

export function Completion({ onFinish }: CompletionProps) {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-emerald-50 to-cyan-50 dark:from-emerald-900/20 dark:to-cyan-900/20 rounded-lg p-8 border border-emerald-200 dark:border-emerald-700 text-center">
        {/* Celebration Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-400 dark:bg-emerald-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <CheckCircle2 size={80} className="text-emerald-600 dark:text-emerald-400 relative" />
          </div>
        </div>

        {/* Celebration Text */}
        <h2 className="text-3xl font-bold text-emerald-900 dark:text-emerald-100 mb-3">
          🎉 Lesson Complete!
        </h2>

        <p className="text-lg text-emerald-800 dark:text-emerald-200 mb-6">
          You now understand DES!
        </p>

        {/* Learning Summary */}
        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 mb-6 text-left border border-emerald-200 dark:border-emerald-700">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            <Sparkles size={18} className="text-emerald-500" />
            What You Learned
          </h3>

          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-slate-700 dark:text-slate-300">
                <strong>Encryption Basics:</strong> How plaintext is transformed into ciphertext using a key
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-slate-700 dark:text-slate-300">
                <strong>Symmetric Encryption:</strong> The same key encrypts and decrypts data
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-slate-700 dark:text-slate-300">
                <strong>DES Structure:</strong> Initial permutation, 16 Feistel rounds, and final permutation
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-slate-700 dark:text-slate-300">
                <strong>Feistel Network:</strong> How left and right halves are processed and swapped
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-slate-700 dark:text-slate-300">
                <strong>F-Function:</strong> Expansion, XOR, S-boxes, and permutation operations
              </span>
            </li>
          </ul>
        </div>

        {/* Finish Button */}
        <Button
          onClick={onFinish}
          className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-700 dark:hover:bg-emerald-800 text-white font-semibold py-3 text-lg rounded-lg transition-all transform hover:scale-105"
        >
          Finish Lesson
        </Button>

        {/* Footer Message */}
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-6">
          Great job! You've completed the DES learning journey. Ready to explore more cryptography topics?
        </p>
      </div>
    </div>
  );
}

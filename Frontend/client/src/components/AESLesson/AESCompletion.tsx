import { Sparkles, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AESCompletionProps {
  onFinish: () => void;
}

export function AESCompletion({ onFinish }: AESCompletionProps) {
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
          You now understand AES!
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
                <strong>AES Basics:</strong> How the Advanced Encryption Standard replaced DES with stronger 128/192/256-bit keys
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-slate-700 dark:text-slate-300">
                <strong>SubBytes Transformation:</strong> How the S-box provides non-linear substitution for security
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-slate-700 dark:text-slate-300">
                <strong>ShiftRows Operation:</strong> How cyclical row shifting spreads data for diffusion
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-slate-700 dark:text-slate-300">
                <strong>MixColumns Mixing:</strong> How Galois Field matrix multiplication achieves maximum diffusion
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-slate-700 dark:text-slate-300">
                <strong>AddRoundKey XOR:</strong> How the encryption key is incorporated through XOR operations
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-slate-700 dark:text-slate-300">
                <strong>Round Structure:</strong> How 10/12/14 rounds ensure strong encryption based on key size
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
          Excellent work! You've mastered AES, the gold standard of modern encryption. Ready to explore more cryptography topics?
        </p>
      </div>
    </div>
  );
}

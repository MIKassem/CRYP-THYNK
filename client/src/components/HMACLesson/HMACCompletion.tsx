import { Trophy, CheckCircle2, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HMACCompletionProps {
  onFinish: () => void;
}

export function HMACCompletion({ onFinish }: HMACCompletionProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
      {/* Congratulations Card */}
      <div className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl p-8 text-white text-center shadow-2xl">
        <div className="mb-4 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
            <Trophy className="w-12 h-12 text-white" />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-2">Congratulations!</h3>
        <p className="text-indigo-100 text-sm">
          You've completed the HMAC Deep Dive lesson
        </p>
      </div>

      {/* Summary Card */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <BookOpen size={18} className="text-indigo-500" />
          What You've Learned
        </h4>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                HMAC Fundamentals
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Understood what HMAC is and why it's essential for message authentication
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                Key Normalization
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Learned how keys are processed (padded or hashed) to match the hash block size
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                ipad and opad Constants
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Explored the 0x36 and 0x5C padding values and their role in key derivation
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                Nested Hash Structure
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Mastered the two-pass computation: inner hash and outer hash
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                Security Benefits
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Understood why HMAC resists length extension attacks
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Formula Reminder */}
      <div className="bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <h4 className="font-semibold text-slate-900 dark:text-white mb-3 text-center">
          HMAC Formula
        </h4>
        <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-3">
          <p className="text-sm font-mono text-center text-slate-900 dark:text-white">
            HMAC(K, M) = H((K ⊕ opad) || H((K ⊕ ipad) || M))
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded p-2 text-center">
            <p className="font-semibold text-indigo-900 dark:text-indigo-100">Inner Hash</p>
            <p className="text-indigo-700 dark:text-indigo-300 font-mono text-[10px]">
              H((K ⊕ 0x36) || M)
            </p>
          </div>
          <div className="bg-violet-100 dark:bg-violet-900/30 rounded p-2 text-center">
            <p className="font-semibold text-violet-900 dark:text-violet-100">Outer Hash</p>
            <p className="text-violet-700 dark:text-violet-300 font-mono text-[10px]">
              H((K ⊕ 0x5C) || inner)
            </p>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <ArrowRight size={18} className="text-sky-500" />
          What's Next?
        </h4>

        <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
          <p>
            Now that you understand HMAC's internal structure, you can explore:
          </p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start gap-2">
              <span className="text-sky-500 mt-1">•</span>
              <span>Implementing HMAC in your own projects</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-500 mt-1">•</span>
              <span>Different hash functions (SHA-1, SHA-256, SHA-512)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-500 mt-1">•</span>
              <span>Using HMAC for API authentication and JWTs</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-500 mt-1">•</span>
              <span>Password-based key derivation functions (PBKDF2)</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Close Button */}
      <div className="flex justify-center pt-4">
        <Button
          onClick={onFinish}
          size="lg"
          className="bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white px-8"
        >
          <CheckCircle2 className="w-5 h-5 mr-2" />
          Complete Lesson
        </Button>
      </div>
    </div>
  );
}

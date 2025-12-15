import { Trophy, CheckCircle2, BookOpen, ArrowRight, Shield, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NonceAuthCompletionProps {
  onFinish: () => void;
}

export function NonceAuthCompletion({ onFinish }: NonceAuthCompletionProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
      {/* Congratulations Card */}
      <div className="bg-gradient-to-br from-indigo-500 to-sky-600 rounded-2xl p-8 text-white text-center shadow-2xl">
        <div className="mb-4 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
            <Trophy className="w-12 h-12 text-white" />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-2">Congratulations!</h3>
        <p className="text-indigo-100 text-sm">
          You've mastered Nonce Authentication!
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
                Nonce Fundamentals
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Understood what nonces are and why they're critical for authentication
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                Challenge-Response Protocol
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Learned how servers challenge clients and verify responses
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                Replay Attack Demonstration
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Saw how replay attacks work without nonces and fail with nonces
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                Message Freshness
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Understood how nonces prove messages are recent, not replayed
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                Implementation Strategies
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Learned about nonce storage, generation, and expiration
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Concept Reminder */}
      <div className="bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <h4 className="font-semibold text-slate-900 dark:text-white mb-4 text-center flex items-center justify-center gap-2">
          <Shield size={18} className="text-indigo-500" />
          Nonce = Number Used ONCE
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-lg p-3 text-center">
            <p className="text-xs font-semibold text-indigo-900 dark:text-indigo-100 mb-1">
              Unique
            </p>
            <p className="text-xs text-indigo-700 dark:text-indigo-300">
              Never repeated
            </p>
          </div>
          <div className="bg-violet-100 dark:bg-violet-900/30 rounded-lg p-3 text-center">
            <p className="text-xs font-semibold text-violet-900 dark:text-violet-100 mb-1">
              Unpredictable
            </p>
            <p className="text-xs text-violet-700 dark:text-violet-300">
              Random or secure
            </p>
          </div>
          <div className="bg-sky-100 dark:bg-sky-900/30 rounded-lg p-3 text-center">
            <p className="text-xs font-semibold text-sky-900 dark:text-sky-100 mb-1">
              Fresh
            </p>
            <p className="text-xs text-sky-700 dark:text-sky-300">
              Proves recency
            </p>
          </div>
        </div>
      </div>

      {/* Protocol Reminder */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
          <Clock size={18} className="text-green-500" />
          Challenge-Response Flow
        </h4>
        <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[10px] font-bold">1</span>
              <span className="text-slate-700 dark:text-slate-300">Server generates unique nonce</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-bold">2</span>
              <span className="text-slate-700 dark:text-slate-300">Server sends nonce as challenge</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-violet-500 text-white flex items-center justify-center text-[10px] font-bold">3</span>
              <span className="text-slate-700 dark:text-slate-300">Client signs nonce with secret key</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-[10px] font-bold">4</span>
              <span className="text-slate-700 dark:text-slate-300">Server verifies signature</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold">5</span>
              <span className="text-slate-700 dark:text-slate-300">Server marks nonce as used</span>
            </div>
          </div>
        </div>
      </div>

      {/* Real-World Applications */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <ArrowRight size={18} className="text-sky-500" />
          Real-World Uses of Nonces
        </h4>

        <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
          <ul className="space-y-2 ml-4">
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 mt-1">•</span>
              <span><strong>TLS/SSL Handshake:</strong> Client and server random values prevent replay</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 mt-1">•</span>
              <span><strong>OAuth 2.0:</strong> State parameter acts as a nonce to prevent CSRF</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 mt-1">•</span>
              <span><strong>Kerberos:</strong> Timestamps + nonces for authentication</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 mt-1">•</span>
              <span><strong>Blockchain:</strong> Bitcoin mining nonce for proof-of-work</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 mt-1">•</span>
              <span><strong>AEAD Ciphers:</strong> AES-GCM uses nonces as initialization vectors</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 mt-1">•</span>
              <span><strong>API Security:</strong> Request signing with nonces prevents replay</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Close Button */}
      <div className="flex justify-center pt-4">
        <Button
          onClick={onFinish}
          size="lg"
          className="bg-gradient-to-r from-indigo-500 to-sky-600 hover:from-indigo-600 hover:to-sky-700 text-white px-8"
        >
          <CheckCircle2 className="w-5 h-5 mr-2" />
          Complete Lesson
        </Button>
      </div>
    </div>
  );
}

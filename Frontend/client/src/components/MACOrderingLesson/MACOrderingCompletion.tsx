import { Trophy, CheckCircle2, BookOpen, ArrowRight, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MACOrderingCompletionProps {
  onFinish: () => void;
}

export function MACOrderingCompletion({ onFinish }: MACOrderingCompletionProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
      {/* Congratulations Card */}
      <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white text-center shadow-2xl">
        <div className="mb-4 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
            <Trophy className="w-12 h-12 text-white" />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-2">Congratulations!</h3>
        <p className="text-green-100 text-sm">
          You've mastered MAC Ordering Security
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
                Three MAC Ordering Approaches
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Understood Encrypt-then-MAC, MAC-then-Encrypt, and Encrypt-and-MAC
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                Padding Oracle Attacks
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Learned how MAC-then-Encrypt enables attackers to decrypt through error messages
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                Ciphertext Malleability
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Explored vulnerabilities in Encrypt-and-MAC that allow ciphertext modification
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                Encrypt-then-MAC Best Practice
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Mastered why MAC verification before decryption prevents all these attacks
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                Attacker Perspectives
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Analyzed attacks from the adversary's viewpoint to understand real threats
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Comparison */}
      <div className="bg-gradient-to-br from-slate-50 to-green-50 dark:from-slate-900 dark:to-green-950 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <h4 className="font-semibold text-slate-900 dark:text-white mb-4 text-center flex items-center justify-center gap-2">
          <Shield size={18} className="text-green-500" />
          Security Summary
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-3 border-2 border-green-500">
            <p className="font-semibold text-sm text-green-900 dark:text-green-100 mb-1 text-center">
              ✓ Encrypt-then-MAC
            </p>
            <p className="text-xs text-green-800 dark:text-green-200 text-center">
              SECURE
            </p>
          </div>
          <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-3 border-2 border-red-500">
            <p className="font-semibold text-sm text-red-900 dark:text-red-100 mb-1 text-center">
              ✗ MAC-then-Encrypt
            </p>
            <p className="text-xs text-red-800 dark:text-red-200 text-center">
              VULNERABLE
            </p>
          </div>
          <div className="bg-orange-100 dark:bg-orange-900/30 rounded-lg p-3 border-2 border-orange-500">
            <p className="font-semibold text-sm text-orange-900 dark:text-orange-100 mb-1 text-center">
              ⚠ Encrypt-and-MAC
            </p>
            <p className="text-xs text-orange-800 dark:text-orange-200 text-center">
              RISKY
            </p>
          </div>
        </div>
      </div>

      {/* Implementation Reminder */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <h4 className="font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
          <Shield size={18} className="text-green-500" />
          Remember: Always Encrypt-then-MAC
        </h4>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
          <p className="text-sm font-mono text-green-900 dark:text-green-100 mb-3">
            Secure Implementation Pattern:
          </p>
          <div className="space-y-2 text-xs font-mono bg-white dark:bg-slate-800 rounded p-3">
            <div className="text-indigo-600 dark:text-indigo-400">// 1. Encrypt the message</div>
            <div className="text-slate-900 dark:text-white">C = Encrypt(K_enc, message)</div>
            <div className="text-indigo-600 dark:text-indigo-400 mt-2">// 2. MAC the ciphertext</div>
            <div className="text-slate-900 dark:text-white">T = HMAC(K_mac, C)</div>
            <div className="text-indigo-600 dark:text-indigo-400 mt-2">// 3. Transmit both</div>
            <div className="text-slate-900 dark:text-white">send(C, T)</div>
            <div className="text-green-600 dark:text-green-400 mt-3">// Receiver: Verify MAC BEFORE decrypt!</div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <ArrowRight size={18} className="text-sky-500" />
          Real-World Applications
        </h4>

        <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
          <p>
            Encrypt-then-MAC is used in many secure protocols:
          </p>
          <ul className="space-y-2 ml-4">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span><strong>IPsec ESP:</strong> Uses Encrypt-then-MAC for VPN security</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span><strong>TLS 1.3:</strong> Only supports AEAD ciphers (built-in authenticated encryption)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">✓</span>
              <span><strong>Signal Protocol:</strong> Implements Encrypt-then-MAC in its Double Ratchet</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-orange-500 mt-1">⚠</span>
              <span><strong>SSH:</strong> Uses Encrypt-and-MAC (less secure, but standardized)</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Close Button */}
      <div className="flex justify-center pt-4">
        <Button
          onClick={onFinish}
          size="lg"
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8"
        >
          <CheckCircle2 className="w-5 h-5 mr-2" />
          Complete Lesson
        </Button>
      </div>
    </div>
  );
}

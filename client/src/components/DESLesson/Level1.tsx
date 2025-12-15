import { Lock, Key, ArrowRight, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Level1Props {
  currentStep: number; // 0, 1, or 2
  onNext: () => void;
  onPrevious: () => void;
  onEncryptionAnimationTrigger: () => void;
  encryptionAnimationTriggered: boolean;
  onDecryptionTrigger: () => void;
  decryptionTriggered: boolean;
}

export function Level1({
  currentStep,
  onNext,
  onPrevious,
  onEncryptionAnimationTrigger,
  encryptionAnimationTriggered,
  onDecryptionTrigger,
  decryptionTriggered,
}: Level1Props) {
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-8 py-8">
              {/* Plaintext */}
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  HELLO
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Plaintext</p>
              </div>

              {/* Lock Animation */}
              <button
                onClick={onEncryptionAnimationTrigger}
                className="p-4 rounded-full bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-700 transition-all transform hover:scale-110"
                title="Click to encrypt"
              >
                <Lock className="w-8 h-8 text-white" />
              </button>

              {/* Ciphertext */}
              <div className="text-center">
                <div
                  className={`text-2xl font-bold mb-2 transition-all duration-500 ${
                    encryptionAnimationTriggered
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-400 dark:text-slate-500'
                  }`}
                >
                  {encryptionAnimationTriggered ? '7F2A9D' : '??????'}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Ciphertext</p>
              </div>
            </div>

            {/* Explanation */}
            <div className="bg-slate-800 dark:bg-slate-700 rounded-lg p-4 border border-slate-700 dark:border-slate-600">
              <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <Brain className="w-4 h-4 text-indigo-400" />
                What is Encryption?
              </h3>
              <p className="text-sm text-slate-300 dark:text-slate-200 mb-3">
                Encryption transforms readable text (plaintext) into secret data (ciphertext) using a mathematical key. Without the key, the ciphertext is useless gibberish.
              </p>
              <div className="bg-indigo-900 dark:bg-indigo-800 border border-indigo-700 dark:border-indigo-600 rounded p-3">
                <p className="text-xs text-indigo-100 dark:text-indigo-200">
                  <strong>The Key:</strong> A secret value that determines how data is scrambled. Both encryption and decryption use this key.
                </p>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              {/* Encryption Flow */}
              <div className="bg-slate-800 dark:bg-slate-700 rounded-lg p-4 border border-slate-700 dark:border-slate-600">
                <p className="text-xs font-semibold text-slate-300 dark:text-slate-200 mb-3">Encryption Process</p>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1 text-center">
                    <div className="text-sm font-bold text-slate-100 dark:text-slate-200">Plaintext</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">MESSAGE</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-indigo-400" />
                  <div className="flex-1 text-center">
                    <div className="text-sm font-bold text-slate-100 dark:text-slate-200">Key</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                      <Key className="w-3 h-3 inline" />
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-indigo-400" />
                  <div className="flex-1 text-center">
                    <div className="text-sm font-bold text-slate-100 dark:text-slate-200">Ciphertext</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">7F2A9D</div>
                  </div>
                </div>
              </div>

              {/* Decryption Flow */}
              <div className="bg-slate-800 dark:bg-slate-700 rounded-lg p-4 border border-slate-700 dark:border-slate-600">
                <p className="text-xs font-semibold text-slate-300 dark:text-slate-200 mb-3">Decryption Process</p>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1 text-center">
                    <div className="text-sm font-bold text-slate-100 dark:text-slate-200">Ciphertext</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">7F2A9D</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-indigo-400" />
                  <div className="flex-1 text-center">
                    <div className="text-sm font-bold text-slate-100 dark:text-slate-200">Key</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                      <Key className="w-3 h-3 inline" />
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-indigo-400" />
                  <div className="flex-1 text-center">
                    <div className="text-sm font-bold text-slate-100 dark:text-slate-200">Plaintext</div>
                    <div
                      className={`text-xs mt-1 transition-all duration-500 ${
                        decryptionTriggered
                          ? 'text-green-400 dark:text-green-300'
                          : 'text-slate-400 dark:text-slate-500'
                      }`}
                    >
                      {decryptionTriggered ? 'MESSAGE' : '??????'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decrypt Button */}
            <button
              onClick={onDecryptionTrigger}
              className="w-full py-3 px-4 rounded-lg bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800 text-white font-semibold transition-all transform hover:scale-105"
            >
              Try Decrypt
            </button>

            {/* Explanation */}
            <div className="bg-slate-800 dark:bg-slate-700 rounded-lg p-4 border border-slate-700 dark:border-slate-600">
              <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <Brain className="w-4 h-4 text-indigo-400" />
                Symmetric Encryption
              </h3>
              <p className="text-sm text-slate-300 dark:text-slate-200">
                In symmetric encryption, the same key is used for both encryption and decryption. This is fast and efficient, but requires secure key sharing between parties.
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-white mb-4">DES in Context: A Brief History</h3>
              </div>

              {/* Timeline */}
              <div className="space-y-3">
                {/* 1977 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                    <div className="w-0.5 h-12 bg-indigo-500 dark:bg-indigo-600"></div>
                  </div>
                  <div className="pb-4">
                    <p className="font-semibold text-white">1977 - DES Released</p>
                    <p className="text-sm text-slate-400 dark:text-slate-300">
                      The Data Encryption Standard becomes the official U.S. encryption standard, widely adopted globally.
                    </p>
                  </div>
                </div>

                {/* 1998 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-sky-500"></div>
                    <div className="w-0.5 h-12 bg-sky-500 dark:bg-sky-600"></div>
                  </div>
                  <div className="pb-4">
                    <p className="font-semibold text-white">1998 - 3DES Emerges</p>
                    <p className="text-sm text-slate-400 dark:text-slate-300">
                      Triple DES (3DES) is introduced to address DES's vulnerability to brute-force attacks by applying DES three times.
                    </p>
                  </div>
                </div>

                {/* 2001 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-violet-500"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-white">2001 - AES Standard</p>
                    <p className="text-sm text-slate-400 dark:text-slate-300">
                      The Advanced Encryption Standard (AES) replaces DES as the modern standard, offering stronger security and better performance.
                    </p>
                  </div>
                </div>
              </div>

              {/* Why Learn DES? */}
              <div className="bg-amber-900 dark:bg-amber-800 border border-amber-700 dark:border-amber-600 rounded-lg p-4 mt-6">
                <p className="text-sm font-semibold text-amber-100 dark:text-amber-200 mb-2">💡 Why Learn DES?</p>
                <p className="text-sm text-amber-50 dark:text-amber-100">
                  Although DES is no longer secure for real-world use, understanding its structure and mechanics is fundamental to learning modern cryptography. It's the foundation for understanding how symmetric encryption works.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return <div className="space-y-6">{renderStep()}</div>;
}

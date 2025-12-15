import { Lock, Key, ArrowRight, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AESLevel1Props {
  currentStep: number; // 0, 1, or 2
  onNext: () => void;
  onPrevious: () => void;
  onEncryptionAnimationTrigger: () => void;
  encryptionAnimationTriggered: boolean;
  onDecryptionTrigger: () => void;
  decryptionTriggered: boolean;
}

export function AESLevel1({
  currentStep,
  onNext,
  onPrevious,
  onEncryptionAnimationTrigger,
  encryptionAnimationTriggered,
  onDecryptionTrigger,
  decryptionTriggered,
}: AESLevel1Props) {
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-8 py-8">
              {/* Plaintext */}
              <div className="text-center">
                <div className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  SECURE
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
                  {encryptionAnimationTriggered ? 'A3F9C2' : '??????'}
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">Ciphertext</p>
              </div>
            </div>

            {/* Explanation */}
            <div className="bg-slate-800 dark:bg-slate-700 rounded-lg p-4 border border-slate-700 dark:border-slate-600">
              <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <Brain className="w-4 h-4 text-indigo-400" />
                What is AES?
              </h3>
              <p className="text-sm text-slate-300 dark:text-slate-200 mb-3">
                AES (Advanced Encryption Standard) is a modern symmetric encryption algorithm that replaced DES in 2001. It's faster, more secure, and uses larger key sizes (128, 192, or 256 bits).
              </p>
              <div className="bg-indigo-900 dark:bg-indigo-800 border border-indigo-700 dark:border-indigo-600 rounded p-3">
                <p className="text-xs text-indigo-100 dark:text-indigo-200">
                  <strong>Block Size:</strong> AES encrypts data in 128-bit blocks (16 bytes). Multiple rounds of transformations ensure strong security.
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
                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">128-bit block</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-indigo-400" />
                  <div className="flex-1 text-center">
                    <div className="text-sm font-bold text-slate-100 dark:text-slate-200">Key</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                      <Key className="w-3 h-3 inline" /> 128/192/256
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-indigo-400" />
                  <div className="flex-1 text-center">
                    <div className="text-sm font-bold text-slate-100 dark:text-slate-200">Ciphertext</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">A3F9C2</div>
                  </div>
                </div>
              </div>

              {/* Decryption Flow */}
              <div className="bg-slate-800 dark:bg-slate-700 rounded-lg p-4 border border-slate-700 dark:border-slate-600">
                <p className="text-xs font-semibold text-slate-300 dark:text-slate-200 mb-3">Decryption Process</p>
                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1 text-center">
                    <div className="text-sm font-bold text-slate-100 dark:text-slate-200">Ciphertext</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-1">A3F9C2</div>
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
                      {decryptionTriggered ? '128-bit block' : '??????'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 128-bit Block Visualization */}
            <div className="bg-slate-800 dark:bg-slate-700 rounded-lg p-4 border border-slate-700 dark:border-slate-600">
              <p className="text-xs font-semibold text-slate-300 dark:text-slate-200 mb-3">128-bit block (16 bytes):</p>
              <div className="grid grid-cols-8 gap-1">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-8 flex items-center justify-center text-xs font-semibold rounded bg-indigo-600 dark:bg-indigo-500 text-white"
                  >
                    {i.toString(16).toUpperCase()}
                  </div>
                ))}
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
                Like DES, AES is symmetric encryption—the same key encrypts and decrypts. But AES is much faster and supports stronger key sizes, making it the standard for modern secure communications.
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-white mb-4">AES in Context: Why It Matters</h3>
              </div>

              {/* Timeline */}
              <div className="space-y-3">
                {/* 2001 */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                    <div className="w-0.5 h-12 bg-indigo-500 dark:bg-indigo-600"></div>
                  </div>
                  <div className="pb-4">
                    <p className="font-semibold text-white">2001 - AES Adopted</p>
                    <p className="text-sm text-slate-400 dark:text-slate-300">
                      AES becomes the official U.S. encryption standard, replacing DES. Selected after a 5-year worldwide competition.
                    </p>
                  </div>
                </div>

                {/* Today */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-sky-500"></div>
                    <div className="w-0.5 h-12 bg-sky-500 dark:bg-sky-600"></div>
                  </div>
                  <div className="pb-4">
                    <p className="font-semibold text-white">Today - Universal Standard</p>
                    <p className="text-sm text-slate-400 dark:text-slate-300">
                      AES is used everywhere: HTTPS, WiFi (WPA2/WPA3), file encryption, VPNs, and more. It's trusted by governments and industries worldwide.
                    </p>
                  </div>
                </div>

                {/* Future */}
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-violet-500"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Post-Quantum Era</p>
                    <p className="text-sm text-slate-400 dark:text-slate-300">
                      While AES-256 is expected to resist quantum computing attacks, research continues on quantum-resistant algorithms for the future.
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Facts */}
              <div className="bg-amber-900 dark:bg-amber-800 border border-amber-700 dark:border-amber-600 rounded-lg p-4 mt-6">
                <p className="text-sm font-semibold text-amber-100 dark:text-amber-200 mb-2">💡 Why Learn AES?</p>
                <p className="text-sm text-amber-50 dark:text-amber-100">
                  AES is the backbone of modern cryptography. Understanding its structure helps you grasp how secure communication works in today's digital world—from banking apps to messaging platforms.
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

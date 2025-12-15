import { Cpu, FileText, Key, Brain, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RSAPerformanceLimitsLevel2Props {
  currentStep: number;
  onNext: () => void;
  onPrevious: () => void;
  onBulkDataAnimationTrigger: () => void;
  bulkDataAnimated: boolean;
  quizAnswers: Record<number, string>;
  onQuizAnswer: (questionId: number, answer: string) => void;
}

export function RSAPerformanceLimitsLevel2({
  currentStep,
  onNext,
  onPrevious,
  onBulkDataAnimationTrigger,
  bulkDataAnimated,
  quizAnswers,
  onQuizAnswer,
}: RSAPerformanceLimitsLevel2Props) {
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="bg-slate-800 dark:bg-slate-700 rounded-lg p-4 border border-slate-700 dark:border-slate-600">
              <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <Brain className="w-4 h-4 text-indigo-400" />
                Why Is RSA So Slow?
              </h3>
              <p className="text-sm text-slate-300 dark:text-slate-200 mb-4">
                RSA's slowness comes from the complex mathematics required for public-key cryptography.
              </p>

              <div className="space-y-3">
                <div className="bg-slate-900 dark:bg-slate-800 rounded p-3 border border-slate-700">
                  <div className="flex items-start gap-3">
                    <Calculator className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-semibold text-white mb-1">Massive Number Operations</h4>
                      <p className="text-xs text-slate-300">
                        RSA uses <strong>modular exponentiation</strong> with very large numbers (2048 bits or more). 
                        Computing <code className="text-amber-400">M^e mod n</code> requires hundreds of multiplications.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 dark:bg-slate-800 rounded p-3 border border-slate-700">
                  <div className="flex items-start gap-3">
                    <Cpu className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-semibold text-white mb-1">CPU-Intensive Math</h4>
                      <p className="text-xs text-slate-300">
                        Each RSA operation involves complex algorithms like the <strong>extended Euclidean algorithm</strong> and 
                        <strong> Chinese Remainder Theorem</strong>. AES uses simple XOR and table lookups.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 dark:bg-slate-800 rounded p-3 border border-slate-700">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-semibold text-white mb-1">Block Size Limitation</h4>
                      <p className="text-xs text-slate-300">
                        RSA can only encrypt data <strong>smaller than its key size</strong> (e.g., max ~245 bytes for RSA-2048). 
                        Large files must be split into tiny chunks, each encrypted separately.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-indigo-900 dark:bg-indigo-800 border border-indigo-700 dark:border-indigo-600 rounded-lg p-4">
              <p className="text-xs text-indigo-100 dark:text-indigo-200">
                <strong>Bottom Line:</strong> RSA's mathematical complexity makes every operation expensive, 
                while AES's symmetric design allows for fast, hardware-accelerated encryption.
              </p>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-slate-800 dark:bg-slate-700 rounded-lg p-4 border border-slate-700 dark:border-slate-600">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" />
                Bulk Data: The Problem Visualized
              </h3>

              <button
                onClick={onBulkDataAnimationTrigger}
                className="w-full mb-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                {bulkDataAnimated ? 'Reset Animation' : 'Visualize Bulk Encryption'}
              </button>

              {bulkDataAnimated && (
                <div className="space-y-4">
                  <div className="bg-slate-900 dark:bg-slate-800 rounded p-4 border border-slate-700">
                    <div className="text-xs font-semibold text-slate-200 mb-3">
                      Encrypting a 10MB file (10,240 KB)
                    </div>

                    {/* RSA Approach */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-red-400 font-semibold">❌ RSA Approach</span>
                      </div>
                      <div className="space-y-2 text-xs text-slate-300">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <span>Split into <strong>41,800+ chunks</strong> (max 245 bytes each)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <span>Each chunk: <strong>~1200ms</strong> to encrypt</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          <span><strong>Total time: ~14 hours</strong></span>
                        </div>
                      </div>
                      <div className="mt-3 h-4 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-red-500 animate-[expand_8s_ease-in-out_infinite]" style={{ width: '2%' }}></div>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 text-center">Still encrypting...</p>
                    </div>

                    {/* AES Approach */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-green-400 font-semibold">✅ AES Approach</span>
                      </div>
                      <div className="space-y-2 text-xs text-slate-300">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span>Process entire file as <strong>continuous stream</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span>Encrypt at <strong>~50 MB/s</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          <span><strong>Total time: ~200ms</strong></span>
                        </div>
                      </div>
                      <div className="mt-3 h-4 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 animate-[expand_1s_ease-out]" style={{ width: '100%' }}></div>
                      </div>
                      <p className="text-xs text-green-400 mt-1 text-center">✓ Complete!</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-amber-900 dark:bg-amber-800 border border-amber-700 dark:border-amber-600 rounded-lg p-4">
              <p className="text-xs text-amber-100 dark:text-amber-200">
                <strong>Reality Check:</strong> Using RSA for bulk data is like using a Ferrari to transport 
                sand—technically possible but completely impractical. The overhead is astronomical.
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-slate-800 dark:bg-slate-700 rounded-lg p-4 border border-slate-700 dark:border-slate-600">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <Key className="w-4 h-4 text-indigo-400" />
                The Solution: Hybrid Encryption
              </h3>

              <div className="space-y-4">
                <p className="text-sm text-slate-300 dark:text-slate-200">
                  Real-world systems combine RSA and AES to get the best of both:
                </p>

                <div className="bg-slate-900 dark:bg-slate-800 rounded-lg p-4 border border-slate-700">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                        1
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-slate-200 mb-1"><strong>Generate random AES key</strong></p>
                        <p className="text-xs text-slate-400">Create a 256-bit symmetric key (fast, one-time)</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                        2
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-slate-200 mb-1"><strong>Encrypt data with AES</strong></p>
                        <p className="text-xs text-slate-400">Fast encryption of any size file (~50 MB/s)</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                        3
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-slate-200 mb-1"><strong>Encrypt AES key with RSA</strong></p>
                        <p className="text-xs text-slate-400">Secure key exchange (only 32 bytes, ~1.2 seconds)</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                        4
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-slate-200 mb-1"><strong>Send both encrypted data & encrypted key</strong></p>
                        <p className="text-xs text-slate-400">Recipient uses RSA to decrypt key, then AES to decrypt data</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-900 dark:bg-green-800 border border-green-700 dark:border-green-600 rounded p-3">
                  <p className="text-xs text-green-100 dark:text-green-200">
                    <strong>Result:</strong> You get RSA's security benefits (no shared secret needed) with AES's speed. 
                    This is exactly how TLS/SSL, PGP, and modern encrypted messaging work.
                  </p>
                </div>
              </div>
            </div>

            {/* Quiz */}
            <div className="bg-slate-800 dark:bg-slate-700 rounded-lg p-4 border border-slate-700 dark:border-slate-600">
              <h4 className="text-xs font-semibold text-white mb-3">Quick Check</h4>
              <p className="text-xs text-slate-300 mb-3">
                What makes RSA unsuitable for encrypting large files?
              </p>
              <div className="space-y-2">
                {[
                  { id: 'a', text: 'RSA keys are too small' },
                  { id: 'b', text: 'RSA operations require complex, slow mathematics' },
                  { id: 'c', text: 'RSA is less secure than AES' },
                  { id: 'd', text: 'RSA cannot handle files over 1KB' },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => onQuizAnswer(1, option.id)}
                    className={`w-full text-left px-3 py-2 rounded text-xs transition-colors ${
                      quizAnswers[1] === option.id
                        ? option.id === 'b'
                          ? 'bg-green-900 dark:bg-green-800 border border-green-700 text-green-100'
                          : 'bg-red-900 dark:bg-red-800 border border-red-700 text-red-100'
                        : 'bg-slate-900 dark:bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {option.id.toUpperCase()}. {option.text}
                  </button>
                ))}
              </div>
              {quizAnswers[1] === 'b' && (
                <p className="text-xs text-green-400 mt-3">
                  ✓ Correct! RSA's mathematical complexity makes it impractical for bulk data.
                </p>
              )}
              {quizAnswers[1] && quizAnswers[1] !== 'b' && (
                <p className="text-xs text-red-400 mt-3">
                  ✗ Not quite. Think about the computational cost of the operations.
                </p>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {renderStep()}
    </div>
  );
}

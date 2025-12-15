import { Lock, Key, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HMACLevel1Props {
  currentStep: number; // 0-2
  onNext: () => void;
  onPrevious: () => void;
  onKeyNormalizationTrigger: () => void;
  keyNormalizationTriggered: boolean;
}

export function HMACLevel1({
  currentStep,
  onNext,
  onPrevious,
  onKeyNormalizationTrigger,
  keyNormalizationTriggered,
}: HMACLevel1Props) {
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Shield size={18} className="text-indigo-500" />
                What is HMAC?
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
                <strong>HMAC (Hash-based Message Authentication Code)</strong> is a mechanism for message authentication using cryptographic hash functions combined with a secret key.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 border border-indigo-200 dark:border-indigo-800">
                  <Lock className="w-6 h-6 text-indigo-500 mb-2" />
                  <h5 className="font-semibold text-sm text-indigo-900 dark:text-indigo-100 mb-2">
                    Authentication
                  </h5>
                  <p className="text-xs text-indigo-800 dark:text-indigo-200">
                    Verifies the message came from the claimed sender
                  </p>
                </div>

                <div className="bg-sky-50 dark:bg-sky-900/20 rounded-lg p-4 border border-sky-200 dark:border-sky-800">
                  <Key className="w-6 h-6 text-sky-500 mb-2" />
                  <h5 className="font-semibold text-sm text-sky-900 dark:text-sky-100 mb-2">
                    Integrity
                  </h5>
                  <p className="text-xs text-sky-800 dark:text-sky-200">
                    Ensures the message hasn't been altered in transit
                  </p>
                </div>
              </div>

              {/* HMAC Formula */}
              <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 mb-4">
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-2 font-mono">
                  HMAC Formula:
                </p>
                <p className="text-sm font-mono text-slate-900 dark:text-white text-center py-2">
                  HMAC(K, M) = H((K ⊕ opad) || H((K ⊕ ipad) || M))
                </p>
              </div>

              <div className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <p><strong>K:</strong> Secret key</p>
                <p><strong>M:</strong> Message to authenticate</p>
                <p><strong>H:</strong> Hash function (e.g., SHA-256)</p>
                <p><strong>ipad:</strong> Inner padding (0x36 repeated)</p>
                <p><strong>opad:</strong> Outer padding (0x5C repeated)</p>
                <p><strong>⊕:</strong> XOR operation</p>
                <p><strong>||:</strong> Concatenation</p>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Key size={18} className="text-violet-500" />
                Key Normalization
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                Before using the key in HMAC, it must be normalized to match the hash function's block size (64 bytes for SHA-256).
              </p>

              {/* Key Normalization Visualization */}
              <div className="space-y-6">
                {/* Short Key */}
                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
                    Case 1: Key Shorter than Block Size
                  </p>
                  <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex gap-1">
                        {['K1', 'K2', 'K3', 'K4'].map((k, i) => (
                          <div
                            key={i}
                            className="w-12 h-10 flex items-center justify-center text-xs font-semibold rounded bg-violet-500 text-white"
                          >
                            {k}
                          </div>
                        ))}
                      </div>
                      <ArrowRight className="text-slate-400" size={16} />
                      <span className="text-xs text-slate-600 dark:text-slate-400">Pad with zeros</span>
                    </div>
                    {keyNormalizationTriggered && (
                      <div className="flex gap-1 animate-in fade-in slide-in-from-left">
                        {['K1', 'K2', 'K3', 'K4', '00', '00', '...', '00'].map((k, i) => (
                          <div
                            key={i}
                            className={`w-12 h-10 flex items-center justify-center text-xs font-semibold rounded transition-all duration-300 ${
                              i < 4
                                ? 'bg-violet-500 text-white'
                                : 'bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                            }`}
                            style={{ transitionDelay: `${i * 50}ms` }}
                          >
                            {k}
                          </div>
                        ))}
                        <span className="flex items-center text-xs text-green-600 dark:text-green-400 ml-2">
                          ✓ 64 bytes
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Long Key */}
                <div>
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-2">
                    Case 2: Key Longer than Block Size
                  </p>
                  <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex gap-1">
                        {['K1', '...', 'K99'].map((k, i) => (
                          <div
                            key={i}
                            className="w-12 h-10 flex items-center justify-center text-xs font-semibold rounded bg-orange-500 text-white"
                          >
                            {k}
                          </div>
                        ))}
                      </div>
                      <ArrowRight className="text-slate-400" size={16} />
                      <span className="text-xs text-slate-600 dark:text-slate-400">Hash then pad</span>
                    </div>
                    {keyNormalizationTriggered && (
                      <div className="space-y-2 animate-in fade-in slide-in-from-left">
                        <div className="flex gap-1">
                          {['H1', 'H2', '...', 'H32'].map((k, i) => (
                            <div
                              key={i}
                              className="w-12 h-10 flex items-center justify-center text-xs font-semibold rounded bg-indigo-500 text-white transition-all duration-300"
                              style={{ transitionDelay: `${i * 50}ms` }}
                            >
                              {k}
                            </div>
                          ))}
                          <span className="flex items-center text-xs text-slate-500 ml-2">
                            32 bytes (SHA-256 output)
                          </span>
                        </div>
                        <div className="flex gap-1">
                          {['H1', 'H2', '...', 'H32', '00', '...', '00'].map((k, i) => (
                            <div
                              key={i}
                              className={`w-12 h-10 flex items-center justify-center text-xs font-semibold rounded transition-all duration-300 ${
                                i < 4
                                  ? 'bg-indigo-500 text-white'
                                  : 'bg-slate-300 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                              }`}
                              style={{ transitionDelay: `${(i + 4) * 50}ms` }}
                            >
                              {k}
                            </div>
                          ))}
                          <span className="flex items-center text-xs text-green-600 dark:text-green-400 ml-2">
                            ✓ 64 bytes
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <Button
                onClick={onKeyNormalizationTrigger}
                variant="outline"
                className="w-full mt-4"
              >
                {keyNormalizationTriggered ? 'Reset' : 'Visualize Key Normalization'}
              </Button>

              <div className="mt-4 bg-violet-50 dark:bg-violet-900/20 rounded p-3 border border-violet-200 dark:border-violet-800">
                <p className="text-xs text-violet-900 dark:text-violet-100">
                  <strong>Why normalize?</strong> Ensures consistent key length regardless of input size, preventing timing attacks and ensuring proper XOR operations.
                </p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Shield size={18} className="text-emerald-500" />
                Why HMAC Instead of Just Hashing?
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                You might wonder: why not just compute <code className="px-1 py-0.5 bg-slate-100 dark:bg-slate-900 rounded text-xs">H(K || M)</code>?
              </p>

              {/* Comparison Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold">
                      ✗
                    </div>
                    <h5 className="font-semibold text-sm text-red-900 dark:text-red-100">
                      Naive Hash: H(K || M)
                    </h5>
                  </div>
                  <ul className="space-y-2 text-xs text-red-800 dark:text-red-200">
                    <li>• Vulnerable to length extension attacks</li>
                    <li>• Attacker can append data without knowing K</li>
                    <li>• Works with Merkle-Damgård hashes (MD5, SHA-1, SHA-2)</li>
                  </ul>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center text-xs font-bold">
                      ✓
                    </div>
                    <h5 className="font-semibold text-sm text-green-900 dark:text-green-100">
                      HMAC Construction
                    </h5>
                  </div>
                  <ul className="space-y-2 text-xs text-green-800 dark:text-green-200">
                    <li>• Resistant to length extension attacks</li>
                    <li>• Two-pass design with nested hashing</li>
                    <li>• Proven secure with rigorous analysis</li>
                  </ul>
                </div>
              </div>

              {/* Length Extension Attack Example */}
              <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 mb-4">
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Length Extension Attack Example:
                </p>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600 dark:text-slate-400">Original:</span>
                    <code className="text-slate-900 dark:text-white">H(K || "transfer $10")</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-red-600 dark:text-red-400">Attacker:</span>
                    <code className="text-red-900 dark:text-red-100">H(K || "transfer $10" || "to Alice")</code>
                  </div>
                  <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                    <span>↳ Valid MAC without knowing K!</span>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded p-3 border border-emerald-200 dark:border-emerald-800">
                <p className="text-xs text-emerald-900 dark:text-emerald-100">
                  <strong>HMAC's nested structure</strong> with two different keys (K ⊕ ipad and K ⊕ opad) prevents these attacks by processing the key twice with different padding values.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
}

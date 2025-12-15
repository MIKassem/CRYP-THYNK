import { useState } from 'react';
import { Hash, ArrowRight, CheckCircle2, XCircle, GitBranch, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HMACLevel2Props {
  currentStep: number; // 0-5
  onNext: () => void;
  onPrevious: () => void;
  onIpadAnimationTrigger: () => void;
  ipadAnimationTriggered: boolean;
  onOpadAnimationTrigger: () => void;
  opadAnimationTriggered: boolean;
  onHMACComputationTrigger: () => void;
  hmacComputationTriggered: boolean;
  quizAnswers: Record<number, string>;
  onQuizAnswer: (questionId: number, answer: string) => void;
}

export function HMACLevel2({
  currentStep,
  onNext,
  onPrevious,
  onIpadAnimationTrigger,
  ipadAnimationTriggered,
  onOpadAnimationTrigger,
  opadAnimationTriggered,
  onHMACComputationTrigger,
  hmacComputationTriggered,
  quizAnswers,
  onQuizAnswer,
}: HMACLevel2Props) {
  const [computationStep, setComputationStep] = useState(0);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Hash size={18} className="text-indigo-500" />
                Understanding ipad and opad
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                HMAC uses two special padding constants that are XORed with the key to create inner and outer keys.
              </p>

              {/* ipad Visualization */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <h5 className="text-sm font-semibold text-slate-900 dark:text-white">
                    ipad (Inner Padding)
                  </h5>
                  <code className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded text-xs font-mono">
                    0x36 repeated
                  </code>
                </div>
                
                <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 mb-3">
                  <div className="flex gap-1 flex-wrap mb-3">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-12 h-10 flex items-center justify-center text-xs font-mono rounded bg-indigo-200 dark:bg-indigo-800 text-indigo-900 dark:text-indigo-100"
                      >
                        36
                      </div>
                    ))}
                    <span className="flex items-center text-xs text-slate-500 ml-2">... (64 bytes total)</span>
                  </div>
                  
                  {ipadAnimationTriggered && (
                    <div className="animate-in fade-in slide-in-from-top">
                      <div className="flex items-center gap-2 mb-2">
                        <ArrowRight className="text-slate-400" size={16} />
                        <span className="text-xs text-slate-600 dark:text-slate-400">XOR with normalized key</span>
                      </div>
                      <div className="flex gap-1 flex-wrap">
                        {Array.from({ length: 8 }).map((_, i) => {
                          const keyByte = (i * 17) % 256;
                          const result = (keyByte ^ 0x36).toString(16).padStart(2, '0').toUpperCase();
                          return (
                            <div
                              key={i}
                              className="w-12 h-10 flex items-center justify-center text-xs font-mono rounded bg-indigo-500 text-white transition-all duration-300"
                              style={{ transitionDelay: `${i * 50}ms` }}
                            >
                              {result}
                            </div>
                          );
                        })}
                        <span className="flex items-center text-xs text-green-600 dark:text-green-400 ml-2">
                          ✓ Inner Key
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  onClick={onIpadAnimationTrigger}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  {ipadAnimationTriggered ? 'Reset' : 'Apply ipad XOR'}
                </Button>
              </div>

              {/* opad Visualization */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <h5 className="text-sm font-semibold text-slate-900 dark:text-white">
                    opad (Outer Padding)
                  </h5>
                  <code className="px-2 py-1 bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 rounded text-xs font-mono">
                    0x5C repeated
                  </code>
                </div>
                
                <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 mb-3">
                  <div className="flex gap-1 flex-wrap mb-3">
                    {Array.from({ length: 8 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-12 h-10 flex items-center justify-center text-xs font-mono rounded bg-violet-200 dark:bg-violet-800 text-violet-900 dark:text-violet-100"
                      >
                        5C
                      </div>
                    ))}
                    <span className="flex items-center text-xs text-slate-500 ml-2">... (64 bytes total)</span>
                  </div>
                  
                  {opadAnimationTriggered && (
                    <div className="animate-in fade-in slide-in-from-top">
                      <div className="flex items-center gap-2 mb-2">
                        <ArrowRight className="text-slate-400" size={16} />
                        <span className="text-xs text-slate-600 dark:text-slate-400">XOR with normalized key</span>
                      </div>
                      <div className="flex gap-1 flex-wrap">
                        {Array.from({ length: 8 }).map((_, i) => {
                          const keyByte = (i * 17) % 256;
                          const result = (keyByte ^ 0x5C).toString(16).padStart(2, '0').toUpperCase();
                          return (
                            <div
                              key={i}
                              className="w-12 h-10 flex items-center justify-center text-xs font-mono rounded bg-violet-500 text-white transition-all duration-300"
                              style={{ transitionDelay: `${i * 50}ms` }}
                            >
                              {result}
                            </div>
                          );
                        })}
                        <span className="flex items-center text-xs text-green-600 dark:text-green-400 ml-2">
                          ✓ Outer Key
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  onClick={onOpadAnimationTrigger}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  {opadAnimationTriggered ? 'Reset' : 'Apply opad XOR'}
                </Button>
              </div>

              <div className="mt-6 bg-indigo-50 dark:bg-indigo-900/20 rounded p-3 border border-indigo-200 dark:border-indigo-800">
                <p className="text-xs text-indigo-900 dark:text-indigo-100">
                  <strong>Why different constants?</strong> Using 0x36 and 0x5C ensures the inner and outer keys are sufficiently different, preventing related-key attacks.
                </p>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <GitBranch size={18} className="text-sky-500" />
                Step 1: Prepare Inner Key
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                XOR the normalized key with ipad to create the inner key.
              </p>

              <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <div className="text-center">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">Normalized Key (K)</p>
                    <div className="flex gap-1">
                      {['K1', 'K2', 'K3', '...'].map((k, i) => (
                        <div
                          key={i}
                          className="w-10 h-10 flex items-center justify-center text-xs font-semibold rounded bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                        >
                          {k}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-2xl text-slate-400">⊕</div>

                  <div className="text-center">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">ipad (0x36...)</p>
                    <div className="flex gap-1">
                      {['36', '36', '36', '...'].map((k, i) => (
                        <div
                          key={i}
                          className="w-10 h-10 flex items-center justify-center text-xs font-mono rounded bg-indigo-300 dark:bg-indigo-700 text-indigo-900 dark:text-indigo-100"
                        >
                          {k}
                        </div>
                      ))}
                    </div>
                  </div>

                  <ArrowRight className="text-slate-400" size={20} />

                  <div className="text-center">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">Inner Key (K ⊕ ipad)</p>
                    <div className="flex gap-1">
                      {['I1', 'I2', 'I3', '...'].map((k, i) => (
                        <div
                          key={i}
                          className="w-10 h-10 flex items-center justify-center text-xs font-semibold rounded bg-indigo-500 text-white"
                        >
                          {k}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-sky-50 dark:bg-sky-900/20 rounded p-3 border border-sky-200 dark:border-sky-800">
                <p className="text-xs text-sky-900 dark:text-sky-100">
                  The XOR operation combines the key with ipad bit-by-bit, creating a derived key for the inner hash.
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
                <Hash size={18} className="text-emerald-500" />
                Step 2: Inner Hash
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                Concatenate the inner key with the message and hash them together.
              </p>

              <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 mb-4">
                <div className="space-y-4">
                  {/* Inner Key + Message */}
                  <div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">Concatenate:</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="flex gap-1">
                        {['I1', 'I2', '...', 'I64'].map((k, i) => (
                          <div
                            key={i}
                            className="w-10 h-10 flex items-center justify-center text-xs font-semibold rounded bg-indigo-500 text-white"
                          >
                            {k}
                          </div>
                        ))}
                      </div>
                      <span className="text-slate-400">||</span>
                      <div className="flex gap-1">
                        {['M1', 'M2', '...', 'Mn'].map((k, i) => (
                          <div
                            key={i}
                            className="w-10 h-10 flex items-center justify-center text-xs font-semibold rounded bg-sky-300 dark:bg-sky-700 text-sky-900 dark:text-sky-100"
                          >
                            {k}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <ArrowRight className="text-slate-400" size={20} />
                  </div>

                  {/* Hash Result */}
                  <div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                      Inner Hash: H((K ⊕ ipad) || M)
                    </p>
                    <div className="flex gap-1">
                      {['H1', 'H2', 'H3', '...', 'H32'].map((k, i) => (
                        <div
                          key={i}
                          className="w-10 h-10 flex items-center justify-center text-xs font-semibold rounded bg-emerald-500 text-white"
                        >
                          {k}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-2">
                      ✓ 32 bytes (for SHA-256)
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded p-3 border border-emerald-200 dark:border-emerald-800">
                <p className="text-xs text-emerald-900 dark:text-emerald-100">
                  This inner hash authenticates the message with the derived inner key.
                </p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <GitBranch size={18} className="text-violet-500" />
                Step 3: Prepare Outer Key
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                XOR the normalized key with opad to create the outer key.
              </p>

              <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <div className="text-center">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">Normalized Key (K)</p>
                    <div className="flex gap-1">
                      {['K1', 'K2', 'K3', '...'].map((k, i) => (
                        <div
                          key={i}
                          className="w-10 h-10 flex items-center justify-center text-xs font-semibold rounded bg-slate-300 dark:bg-slate-700 text-slate-900 dark:text-slate-100"
                        >
                          {k}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-2xl text-slate-400">⊕</div>

                  <div className="text-center">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">opad (0x5C...)</p>
                    <div className="flex gap-1">
                      {['5C', '5C', '5C', '...'].map((k, i) => (
                        <div
                          key={i}
                          className="w-10 h-10 flex items-center justify-center text-xs font-mono rounded bg-violet-300 dark:bg-violet-700 text-violet-900 dark:text-violet-100"
                        >
                          {k}
                        </div>
                      ))}
                    </div>
                  </div>

                  <ArrowRight className="text-slate-400" size={20} />

                  <div className="text-center">
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">Outer Key (K ⊕ opad)</p>
                    <div className="flex gap-1">
                      {['O1', 'O2', 'O3', '...'].map((k, i) => (
                        <div
                          key={i}
                          className="w-10 h-10 flex items-center justify-center text-xs font-semibold rounded bg-violet-500 text-white"
                        >
                          {k}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-violet-50 dark:bg-violet-900/20 rounded p-3 border border-violet-200 dark:border-violet-800">
                <p className="text-xs text-violet-900 dark:text-violet-100">
                  The outer key will be used to hash the result of the inner hash, adding another layer of security.
                </p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Layers size={18} className="text-orange-500" />
                Step 4: Final HMAC Computation
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                Concatenate the outer key with the inner hash result and hash them together to produce the final HMAC.
              </p>

              <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4 mb-4">
                <div className="space-y-4">
                  {/* Outer Key + Inner Hash */}
                  <div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">Concatenate:</p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="flex gap-1">
                        {['O1', 'O2', '...', 'O64'].map((k, i) => (
                          <div
                            key={i}
                            className="w-10 h-10 flex items-center justify-center text-xs font-semibold rounded bg-violet-500 text-white"
                          >
                            {k}
                          </div>
                        ))}
                      </div>
                      <span className="text-slate-400">||</span>
                      <div className="flex gap-1">
                        {['H1', 'H2', '...', 'H32'].map((k, i) => (
                          <div
                            key={i}
                            className="w-10 h-10 flex items-center justify-center text-xs font-semibold rounded bg-emerald-500 text-white"
                          >
                            {k}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <ArrowRight className="text-slate-400" size={20} />
                  </div>

                  {/* Final HMAC */}
                  <div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mb-2">
                      Final HMAC: H((K ⊕ opad) || H((K ⊕ ipad) || M))
                    </p>
                    <div className="flex gap-1">
                      {['A1', 'A2', 'A3', '...', 'A32'].map((k, i) => (
                        <div
                          key={i}
                          className="w-10 h-10 flex items-center justify-center text-xs font-semibold rounded bg-gradient-to-br from-orange-500 to-pink-500 text-white shadow-lg"
                        >
                          {k}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-orange-600 dark:text-orange-400 mt-2 font-semibold">
                      ✓ HMAC Complete! (32 bytes for SHA-256)
                    </p>
                  </div>
                </div>
              </div>

              {/* Full Flow Diagram */}
              <div className="bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3">Complete HMAC Flow:</p>
                <div className="space-y-2 text-xs font-mono text-slate-700 dark:text-slate-300">
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500">1.</span>
                    <span>Inner_Key = K ⊕ ipad</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500">2.</span>
                    <span>Inner_Hash = H(Inner_Key || Message)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500">3.</span>
                    <span>Outer_Key = K ⊕ opad</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-slate-500">4.</span>
                    <span className="font-semibold text-orange-600 dark:text-orange-400">HMAC = H(Outer_Key || Inner_Hash)</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-orange-50 dark:bg-orange-900/20 rounded p-3 border border-orange-200 dark:border-orange-800">
                <p className="text-xs text-orange-900 dark:text-orange-100">
                  <strong>Two-pass design:</strong> The nested hashing structure provides strong security guarantees and resistance to various cryptographic attacks.
                </p>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-green-500" />
                Knowledge Check: HMAC Quiz
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                Test your understanding of HMAC's internal structure!
              </p>

              {/* Quiz Questions */}
              <div className="space-y-6">
                {/* Question 1 */}
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                    1. What happens to a key that is shorter than the hash block size in HMAC?
                  </p>
                  <div className="space-y-2">
                    {[
                      { id: 'q1a', text: 'It is rejected as invalid' },
                      { id: 'q1b', text: 'It is padded with zeros to reach the block size' },
                      { id: 'q1c', text: 'It is hashed first, then padded' },
                      { id: 'q1d', text: 'It is repeated until reaching block size' },
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => onQuizAnswer(1, option.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                          quizAnswers[1] === option.id
                            ? option.id === 'q1b'
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-100'
                              : 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{option.text}</span>
                          {quizAnswers[1] === option.id && (
                            option.id === 'q1b' ? (
                              <CheckCircle2 size={18} className="text-green-600" />
                            ) : (
                              <XCircle size={18} className="text-red-600" />
                            )
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  {quizAnswers[1] && quizAnswers[1] !== 'q1b' && (
                    <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                      Short keys are padded with zeros to match the block size.
                    </p>
                  )}
                </div>

                {/* Question 2 */}
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                    2. What are the hexadecimal values of ipad and opad?
                  </p>
                  <div className="space-y-2">
                    {[
                      { id: 'q2a', text: 'ipad = 0x36, opad = 0x5C' },
                      { id: 'q2b', text: 'ipad = 0x00, opad = 0xFF' },
                      { id: 'q2c', text: 'ipad = 0x5C, opad = 0x36' },
                      { id: 'q2d', text: 'ipad = 0xAA, opad = 0x55' },
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => onQuizAnswer(2, option.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                          quizAnswers[2] === option.id
                            ? option.id === 'q2a'
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-100'
                              : 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-mono">{option.text}</span>
                          {quizAnswers[2] === option.id && (
                            option.id === 'q2a' ? (
                              <CheckCircle2 size={18} className="text-green-600" />
                            ) : (
                              <XCircle size={18} className="text-red-600" />
                            )
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  {quizAnswers[2] && quizAnswers[2] !== 'q2a' && (
                    <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                      Correct answer: ipad = 0x36 (repeated), opad = 0x5C (repeated).
                    </p>
                  )}
                </div>

                {/* Question 3 */}
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                    3. Why does HMAC use a nested hash structure instead of just H(K || M)?
                  </p>
                  <div className="space-y-2">
                    {[
                      { id: 'q3a', text: 'To make computation faster' },
                      { id: 'q3b', text: 'To prevent length extension attacks' },
                      { id: 'q3c', text: 'To reduce memory usage' },
                      { id: 'q3d', text: 'To support longer keys' },
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => onQuizAnswer(3, option.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                          quizAnswers[3] === option.id
                            ? option.id === 'q3b'
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-100'
                              : 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{option.text}</span>
                          {quizAnswers[3] === option.id && (
                            option.id === 'q3b' ? (
                              <CheckCircle2 size={18} className="text-green-600" />
                            ) : (
                              <XCircle size={18} className="text-red-600" />
                            )
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  {quizAnswers[3] && quizAnswers[3] !== 'q3b' && (
                    <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                      The nested structure prevents length extension attacks that work on simple H(K || M) constructions.
                    </p>
                  )}
                </div>
              </div>

              {/* Score Display */}
              {Object.keys(quizAnswers).length === 3 && (
                <div className="mt-6 bg-gradient-to-r from-indigo-50 to-sky-50 dark:from-indigo-950 dark:to-sky-950 rounded-lg p-4 border border-indigo-200 dark:border-indigo-800">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                    Your Score: {
                      [quizAnswers[1] === 'q1b', quizAnswers[2] === 'q2a', quizAnswers[3] === 'q3b']
                        .filter(Boolean).length
                    } / 3
                  </p>
                  <p className="text-xs text-slate-700 dark:text-slate-300">
                    {[quizAnswers[1] === 'q1b', quizAnswers[2] === 'q2a', quizAnswers[3] === 'q3b']
                      .filter(Boolean).length === 3
                      ? '🎉 Perfect! You understand HMAC thoroughly!'
                      : 'Review the incorrect answers to strengthen your understanding.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return <div>{renderStep()}</div>;
}

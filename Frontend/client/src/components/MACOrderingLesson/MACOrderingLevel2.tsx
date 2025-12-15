import { useState } from 'react';
import { Skull, Shield, CheckCircle2, XCircle, AlertTriangle, Eye, Lock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MACOrderingLevel2Props {
  currentStep: number; // 0-3
  onNext: () => void;
  onPrevious: () => void;
  onPaddingOracleAttackTrigger: () => void;
  paddingOracleAttackAnimated: boolean;
  onBestPracticeTrigger: () => void;
  bestPracticeAnimated: boolean;
  quizAnswers: Record<number, string>;
  onQuizAnswer: (questionId: number, answer: string) => void;
}

export function MACOrderingLevel2({
  currentStep,
  onNext,
  onPrevious,
  onPaddingOracleAttackTrigger,
  paddingOracleAttackAnimated,
  onBestPracticeTrigger,
  bestPracticeAnimated,
  quizAnswers,
  onQuizAnswer,
}: MACOrderingLevel2Props) {
  const [attackStep, setAttackStep] = useState(0);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Skull size={18} className="text-red-500" />
                Attacker Perspective: Padding Oracle Attack
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                When using <strong>MAC-then-Encrypt</strong>, an attacker can exploit decryption errors to gradually reveal the plaintext without knowing the key.
              </p>

              {/* Attack Scenario */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 rounded-lg p-6 border-2 border-red-300 dark:border-red-700 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                    <Skull className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-red-900 dark:text-red-100">Mallory (Attacker)</p>
                    <p className="text-xs text-red-700 dark:text-red-300">Intercepted ciphertext: C</p>
                  </div>
                </div>

                {/* Attack Steps - initially hidden, shown one by one */}
                <div className="space-y-3">
                  {/* Step 1: Intercept */}
                  {paddingOracleAttackAnimated && (
                    <div className="bg-white dark:bg-slate-800 rounded p-3 border border-red-200 dark:border-red-800 animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-xs font-bold">1</div>
                        <p className="text-xs font-semibold text-slate-900 dark:text-white">Intercept Ciphertext</p>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 ml-8">
                        Mallory captures: C = Enc(M || MAC(M))
                      </p>
                    </div>
                  )}

                  {/* Step 2: Modify */}
                  {paddingOracleAttackAnimated && (
                    <div className="bg-white dark:bg-slate-800 rounded p-3 border border-orange-200 dark:border-orange-800 animate-in fade-in slide-in-from-top-4 duration-500" style={{ animationDelay: '200ms' }}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold">2</div>
                        <p className="text-xs font-semibold text-slate-900 dark:text-white">Modify Last Block</p>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 ml-8">
                        Mallory creates: C' = C with modified last byte
                      </p>
                    </div>
                  )}

                  {/* Step 3: Send */}
                  {paddingOracleAttackAnimated && (
                    <div className="bg-white dark:bg-slate-800 rounded p-3 border border-yellow-200 dark:border-yellow-800 animate-in fade-in slide-in-from-top-4 duration-500" style={{ animationDelay: '400ms' }}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-yellow-500 text-white flex items-center justify-center text-xs font-bold">3</div>
                        <p className="text-xs font-semibold text-slate-900 dark:text-white">Send to Victim</p>
                      </div>
                      <p className="text-xs text-slate-700 dark:text-slate-300 ml-8">
                        Victim receives C' and must decrypt to verify MAC
                      </p>
                    </div>
                  )}

                  {/* Step 4: Observe */}
                  {paddingOracleAttackAnimated && (
                    <div className="bg-white dark:bg-slate-800 rounded p-3 border border-purple-200 dark:border-purple-800 animate-in fade-in slide-in-from-top-4 duration-500" style={{ animationDelay: '600ms' }}>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 rounded-full bg-purple-500 text-white flex items-center justify-center text-xs font-bold">4</div>
                        <p className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          Observe Response
                        </p>
                      </div>
                    <div className="ml-8 space-y-2">
                      <div className="flex items-start gap-2 text-xs">
                        <span className="text-red-600 dark:text-red-400">❌</span>
                        <span className="text-slate-700 dark:text-slate-300">"Padding error" → Decryption failed at padding</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs">
                        <span className="text-orange-600 dark:text-orange-400">❌</span>
                        <span className="text-slate-700 dark:text-slate-300">"MAC verification failed" → Padding OK, MAC wrong</span>
                      </div>
                      <div className="flex items-start gap-2 text-xs">
                        <span className="text-green-600 dark:text-green-400">✓</span>
                        <span className="text-slate-700 dark:text-slate-300">"Accepted" → Valid padding and MAC (rare)</span>
                      </div>
                    </div>
                  </div>
                  )}

                  {/* Step 5: Learn */}
                  {paddingOracleAttackAnimated && (
                    <div className="bg-gradient-to-r from-red-100 to-orange-100 dark:from-red-900/40 dark:to-orange-900/40 rounded p-3 border-2 border-red-400 dark:border-red-600 animate-in fade-in slide-in-from-top-4 duration-500" style={{ animationDelay: '800ms' }}>
                      <div className="flex items-center gap-2 mb-2">
                        <Skull className="w-5 h-5 text-red-600" />
                        <p className="text-xs font-semibold text-red-900 dark:text-red-100">Information Leaked!</p>
                      </div>
                      <p className="text-xs text-red-800 dark:text-red-200">
                        Different error messages reveal information about the plaintext. By trying many modifications, Mallory can decrypt byte-by-byte!
                      </p>
                    </div>
                  )}
                </div>

                <Button
                  onClick={onPaddingOracleAttackTrigger}
                  variant="outline"
                  className="w-full mt-4 border-red-300 hover:bg-red-50 dark:border-red-700 dark:hover:bg-red-900/20"
                >
                  {paddingOracleAttackAnimated ? 'Reset Attack' : 'Start Padding Oracle Attack'}
                </Button>
              </div>

              {/* Why It Works */}
              <div className="bg-red-50 dark:bg-red-900/20 rounded p-4 border border-red-200 dark:border-red-800">
                <p className="text-xs font-semibold text-red-900 dark:text-red-100 mb-2">
                  Why MAC-then-Encrypt Enables This Attack:
                </p>
                <ul className="space-y-2 text-xs text-red-800 dark:text-red-200">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Server must <strong>decrypt before verifying MAC</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Decryption errors leak timing/error information</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Attacker learns about plaintext structure without the key</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Can decrypt entire message through repeated queries</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Skull size={18} className="text-orange-500" />
                Attacker Perspective: Encrypt-and-MAC Issues
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                With <strong>Encrypt-and-MAC</strong>, the attacker can exploit the fact that the MAC doesn't protect the ciphertext itself.
              </p>

              {/* Attack Vectors */}
              <div className="space-y-4 mb-6">
                {/* Attack 1: Ciphertext Malleability */}
                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950 dark:to-yellow-950 rounded-lg p-5 border-2 border-orange-300 dark:border-orange-700">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center">
                      <Skull className="w-5 h-5 text-white" />
                    </div>
                    <p className="font-semibold text-orange-900 dark:text-orange-100">Attack 1: Ciphertext Malleability</p>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-white dark:bg-slate-800 rounded p-3 border border-orange-200 dark:border-orange-800">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white mb-2">Original Transmission:</p>
                      <div className="space-y-1 text-xs font-mono">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-600 dark:text-slate-400">C:</span>
                          <code className="text-indigo-600 dark:text-indigo-400">Enc("Transfer $100")</code>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-600 dark:text-slate-400">T:</span>
                          <code className="text-green-600 dark:text-green-400">MAC("Transfer $100")</code>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center">
                      <AlertTriangle className="w-5 h-5 text-orange-500" />
                    </div>

                    <div className="bg-red-100 dark:bg-red-900/30 rounded p-3 border border-red-300 dark:border-red-700">
                      <p className="text-xs font-semibold text-red-900 dark:text-red-100 mb-2">Attacker Modifies:</p>
                      <div className="space-y-1 text-xs font-mono">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-600 dark:text-slate-400">C':</span>
                          <code className="text-red-600 dark:text-red-400">Modified_Enc (bit flipped)</code>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-600 dark:text-slate-400">T:</span>
                          <code className="text-green-600 dark:text-green-400">MAC("Transfer $100") ← Unchanged!</code>
                        </div>
                      </div>
                    </div>

                    <div className="bg-orange-100 dark:bg-orange-900/30 rounded p-3 border border-orange-300 dark:border-orange-700">
                      <p className="text-xs text-orange-900 dark:text-orange-100">
                        <strong>Problem:</strong> MAC is still valid for the original plaintext, but ciphertext was modified! Depending on encryption mode (like CBC), bit flips can cause predictable changes.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Attack 2: Information Leakage */}
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950 rounded-lg p-5 border-2 border-yellow-300 dark:border-yellow-700">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center">
                      <Eye className="w-5 h-5 text-white" />
                    </div>
                    <p className="font-semibold text-yellow-900 dark:text-yellow-100">Attack 2: MAC May Leak Info</p>
                  </div>

                  <div className="space-y-3 text-xs text-yellow-800 dark:text-yellow-200">
                    <p>
                      Since MAC is computed on the <em>plaintext</em>, it might reveal information:
                    </p>
                    <ul className="space-y-2 ml-4">
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span><strong>Message length hints:</strong> MAC size correlates with message structure</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span><strong>Replay detection limited:</strong> Same message = same MAC</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span>•</span>
                        <span><strong>Side-channel risks:</strong> MAC computation timing may leak data</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 rounded p-4 border border-orange-200 dark:border-orange-800">
                <p className="text-xs font-semibold text-orange-900 dark:text-orange-100 mb-2">
                  Why Encrypt-and-MAC is Risky:
                </p>
                <ul className="space-y-2 text-xs text-orange-800 dark:text-orange-200">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>MAC doesn't authenticate the <strong>ciphertext</strong>, only plaintext</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Opens door to ciphertext manipulation attacks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>MAC on plaintext may leak information about the message</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Shield size={18} className="text-green-500" />
                Best Practice: Encrypt-then-MAC
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                <strong>Encrypt-then-MAC</strong> is the only truly secure approach. Here's why it defeats all the attacks we've seen.
              </p>

              {/* Defense Timeline */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg p-6 border-2 border-green-300 dark:border-green-700 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-900 dark:text-green-100">Secure Implementation</p>
                    <p className="text-xs text-green-700 dark:text-green-300">How Encrypt-then-MAC stops attacks</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Step 1: Sender */}
                  {bestPracticeAnimated && (
                    <div className="bg-white dark:bg-slate-800 rounded p-4 border border-green-200 dark:border-green-800 animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="flex items-center gap-2 mb-3">
                        <Lock className="w-5 h-5 text-indigo-500" />
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Sender: Encrypt First</p>
                      </div>
                      <div className="text-xs font-mono bg-slate-100 dark:bg-slate-900 rounded p-2 mb-2">
                        C = AES(K₁, "Transfer $100")
                      </div>
                      <div className="text-xs font-mono bg-slate-100 dark:bg-slate-900 rounded p-2">
                        T = HMAC(K₂, C)
                      </div>
                    </div>
                  )}

                  {/* Attacker Attempts */}
                  {bestPracticeAnimated && (
                    <div className="bg-red-50 dark:bg-red-900/20 rounded p-4 border border-red-300 dark:border-red-700 animate-in fade-in slide-in-from-top-4 duration-500" style={{ animationDelay: '200ms' }}>
                      <div className="flex items-center gap-2 mb-3">
                        <Skull className="w-5 h-5 text-red-500" />
                        <p className="text-sm font-semibold text-red-900 dark:text-red-100">Attacker: Tries to Modify C</p>
                      </div>
                      <div className="space-y-2 text-xs text-red-800 dark:text-red-200">
                        <p className="flex items-center gap-2">
                          <AlertTriangle size={14} />
                          Mallory intercepts (C, T) and modifies: C' = C ⊕ modifications
                        </p>
                        <p className="flex items-center gap-2">
                          <Skull size={14} />
                          Mallory sends: (C', T) to victim
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Defender Wins */}
                  {bestPracticeAnimated && (
                    <div className="bg-green-100 dark:bg-green-900/30 rounded p-4 border-2 border-green-400 dark:border-green-600 animate-in fade-in slide-in-from-top-4 duration-500" style={{ animationDelay: '400ms' }}>
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                        <p className="text-sm font-semibold text-green-900 dark:text-green-100">Receiver: Verifies MAC First!</p>
                      </div>
                      <div className="space-y-2 text-xs text-green-800 dark:text-green-200">
                        <div className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded p-2">
                          <span className="font-mono">T' = HMAC(K₂, C')</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white dark:bg-slate-800 rounded p-2">
                          <XCircle size={14} className="text-red-500" />
                          <span className="font-semibold">T' ≠ T → REJECT!</span>
                        </div>
                        <div className="bg-green-200 dark:bg-green-900/40 rounded p-2">
                          <p className="font-semibold text-green-900 dark:text-green-100">
                            ✅ Attack Defeated: No decryption happens!
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  onClick={onBestPracticeTrigger}
                  variant="outline"
                  className="w-full mt-4 border-green-300 hover:bg-green-50 dark:border-green-700 dark:hover:bg-green-900/20"
                >
                  {bestPracticeAnimated ? 'Reset' : 'Start Secure Defense'}
                </Button>
              </div>

              {/* Why It's Secure */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 rounded p-4 border border-green-200 dark:border-green-800">
                  <p className="text-xs font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
                    <CheckCircle2 size={14} />
                    Prevents Padding Oracle
                  </p>
                  <p className="text-xs text-green-800 dark:text-green-200">
                    MAC checked first → modified ciphertext rejected before decryption
                  </p>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded p-4 border border-green-200 dark:border-green-800">
                  <p className="text-xs font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
                    <CheckCircle2 size={14} />
                    Authenticates Ciphertext
                  </p>
                  <p className="text-xs text-green-800 dark:text-green-200">
                    MAC protects the actual transmitted data (ciphertext)
                  </p>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded p-4 border border-green-200 dark:border-green-800">
                  <p className="text-xs font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
                    <CheckCircle2 size={14} />
                    No Plaintext Leakage
                  </p>
                  <p className="text-xs text-green-800 dark:text-green-200">
                    MAC computed on ciphertext reveals nothing about plaintext
                  </p>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded p-4 border border-green-200 dark:border-green-800">
                  <p className="text-xs font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
                    <CheckCircle2 size={14} />
                    Provably Secure
                  </p>
                  <p className="text-xs text-green-800 dark:text-green-200">
                    Mathematical proof of security under standard assumptions
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-green-500" />
                Knowledge Check: MAC Ordering Quiz
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                Test your understanding of MAC ordering security!
              </p>

              {/* Quiz Questions */}
              <div className="space-y-6">
                {/* Question 1 */}
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                    1. Which MAC ordering approach is considered the most secure?
                  </p>
                  <div className="space-y-2">
                    {[
                      { id: 'q1a', text: 'MAC-then-Encrypt' },
                      { id: 'q1b', text: 'Encrypt-and-MAC' },
                      { id: 'q1c', text: 'Encrypt-then-MAC' },
                      { id: 'q1d', text: 'All are equally secure' },
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => onQuizAnswer(1, option.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                          quizAnswers[1] === option.id
                            ? option.id === 'q1c'
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-100'
                              : 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{option.text}</span>
                          {quizAnswers[1] === option.id && (
                            option.id === 'q1c' ? (
                              <CheckCircle2 size={18} className="text-green-600" />
                            ) : (
                              <XCircle size={18} className="text-red-600" />
                            )
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  {quizAnswers[1] && quizAnswers[1] !== 'q1c' && (
                    <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                      Encrypt-then-MAC is the recommended approach because MAC verification happens before decryption.
                    </p>
                  )}
                </div>

                {/* Question 2 */}
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                    2. What makes MAC-then-Encrypt vulnerable to padding oracle attacks?
                  </p>
                  <div className="space-y-2">
                    {[
                      { id: 'q2a', text: 'The MAC is too short' },
                      { id: 'q2b', text: 'Decryption must happen before MAC verification' },
                      { id: 'q2c', text: 'The encryption key is weak' },
                      { id: 'q2d', text: 'The MAC algorithm is insecure' },
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => onQuizAnswer(2, option.id)}
                        className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                          quizAnswers[2] === option.id
                            ? option.id === 'q2b'
                              ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-100'
                              : 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100'
                            : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{option.text}</span>
                          {quizAnswers[2] === option.id && (
                            option.id === 'q2b' ? (
                              <CheckCircle2 size={18} className="text-green-600" />
                            ) : (
                              <XCircle size={18} className="text-red-600" />
                            )
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  {quizAnswers[2] && quizAnswers[2] !== 'q2b' && (
                    <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                      The receiver must decrypt to access the MAC, allowing attackers to learn from decryption errors.
                    </p>
                  )}
                </div>

                {/* Question 3 */}
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                    3. In Encrypt-then-MAC, when does the receiver verify the MAC?
                  </p>
                  <div className="space-y-2">
                    {[
                      { id: 'q3a', text: 'After decryption' },
                      { id: 'q3b', text: 'Before decryption' },
                      { id: 'q3c', text: 'During decryption' },
                      { id: 'q3d', text: 'MAC verification is optional' },
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
                      The MAC is verified BEFORE decryption, ensuring tampered ciphertext is rejected immediately.
                    </p>
                  )}
                </div>
              </div>

              {/* Score Display */}
              {Object.keys(quizAnswers).length === 3 && (
                <div className="mt-6 bg-gradient-to-r from-indigo-50 to-sky-50 dark:from-indigo-950 dark:to-sky-950 rounded-lg p-4 border border-indigo-200 dark:border-indigo-800">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                    Your Score: {
                      [quizAnswers[1] === 'q1c', quizAnswers[2] === 'q2b', quizAnswers[3] === 'q3b']
                        .filter(Boolean).length
                    } / 3
                  </p>
                  <p className="text-xs text-slate-700 dark:text-slate-300">
                    {[quizAnswers[1] === 'q1c', quizAnswers[2] === 'q2b', quizAnswers[3] === 'q3b']
                      .filter(Boolean).length === 3
                      ? '🎉 Excellent! You understand MAC ordering security!'
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

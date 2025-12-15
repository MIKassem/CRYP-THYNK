import { Shield, Lock, ArrowRight, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MACOrderingLevel1Props {
  currentStep: number; // 0-3
  onNext: () => void;
  onPrevious: () => void;
  onEncryptThenMacTrigger: () => void;
  encryptThenMacAnimated: boolean;
  onMacThenEncryptTrigger: () => void;
  macThenEncryptAnimated: boolean;
  onEncryptAndMacTrigger: () => void;
  encryptAndMacAnimated: boolean;
}

export function MACOrderingLevel1({
  currentStep,
  onNext,
  onPrevious,
  onEncryptThenMacTrigger,
  encryptThenMacAnimated,
  onMacThenEncryptTrigger,
  macThenEncryptAnimated,
  onEncryptAndMacTrigger,
  encryptAndMacAnimated,
}: MACOrderingLevel1Props) {
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Shield size={18} className="text-indigo-500" />
                The Order Matters: Encryption + MAC
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                When combining encryption and message authentication codes (MAC), the order of operations critically impacts security. There are three common approaches, but only one is truly secure.
              </p>

              {/* Three Approaches Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-2 border-green-500">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <h5 className="font-semibold text-sm text-green-900 dark:text-green-100">
                      Encrypt-then-MAC
                    </h5>
                  </div>
                  <p className="text-xs text-green-800 dark:text-green-200 mb-2">
                    MAC the ciphertext
                  </p>
                  <div className="text-xs font-mono text-green-700 dark:text-green-300">
                    C = Enc(M)<br/>
                    T = MAC(C)
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    <CheckCircle2 size={12} className="text-green-600" />
                    <span className="text-xs font-semibold text-green-700 dark:text-green-300">SECURE ✓</span>
                  </div>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-2 border-red-500">
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-5 h-5 text-red-600" />
                    <h5 className="font-semibold text-sm text-red-900 dark:text-red-100">
                      MAC-then-Encrypt
                    </h5>
                  </div>
                  <p className="text-xs text-red-800 dark:text-red-200 mb-2">
                    Encrypt the MAC
                  </p>
                  <div className="text-xs font-mono text-red-700 dark:text-red-300">
                    T = MAC(M)<br/>
                    C = Enc(M || T)
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    <AlertTriangle size={12} className="text-red-600" />
                    <span className="text-xs font-semibold text-red-700 dark:text-red-300">VULNERABLE</span>
                  </div>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border-2 border-orange-500">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                    <h5 className="font-semibold text-sm text-orange-900 dark:text-orange-100">
                      Encrypt-and-MAC
                    </h5>
                  </div>
                  <p className="text-xs text-orange-800 dark:text-orange-200 mb-2">
                    MAC and encrypt separately
                  </p>
                  <div className="text-xs font-mono text-orange-700 dark:text-orange-300">
                    C = Enc(M)<br/>
                    T = MAC(M)
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    <AlertTriangle size={12} className="text-orange-600" />
                    <span className="text-xs font-semibold text-orange-700 dark:text-orange-300">RISKY</span>
                  </div>
                </div>
              </div>

              {/* Key Question */}
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 border border-indigo-200 dark:border-indigo-800">
                <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-100 mb-2">
                  Why does order matter?
                </p>
                <p className="text-xs text-indigo-800 dark:text-indigo-200">
                  The timing of MAC verification determines when you can detect tampering. Early detection prevents dangerous decryption operations that could leak information to attackers.
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
                <CheckCircle2 size={18} className="text-green-500" />
                Encrypt-then-MAC (The Correct Way)
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                First encrypt the message, then compute a MAC over the ciphertext. This is the <strong>recommended approach</strong>.
              </p>

              {/* Timeline Visualization */}
              <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-6 mb-4">
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-4">
                  Sender's Operations:
                </p>
                
                <div className="space-y-4">
                  {/* Step 1: Message */}
                  {encryptThenMacAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center text-xs font-bold">
                          1
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Original Message</p>
                          <div className="bg-slate-200 dark:bg-slate-800 rounded px-3 py-2">
                            <span className="text-sm font-mono text-slate-900 dark:text-white">
                              "Transfer $100 to Bob"
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {encryptThenMacAnimated && (
                    <div className="flex justify-center animate-in fade-in duration-500">
                      <ArrowRight className="text-slate-400" />
                    </div>
                  )}

                  {/* Step 2: Encrypt */}
                  {encryptThenMacAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-300">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold text-white">
                          2
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Lock className="w-4 h-4 text-indigo-500" />
                            <p className="text-xs text-slate-600 dark:text-slate-400">Encrypt with Key K₁</p>
                          </div>
                          <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded px-3 py-2 border border-indigo-300 dark:border-indigo-700">
                            <span className="text-sm font-mono text-indigo-900 dark:text-indigo-100">
                              C = AES(K₁, M) = 0x7A3F9B...
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {encryptThenMacAnimated && (
                    <div className="flex justify-center animate-in fade-in duration-500 delay-300">
                      <ArrowRight className="text-slate-400" />
                    </div>
                  )}

                  {/* Step 3: MAC */}
                  {encryptThenMacAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-600">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-xs font-bold text-white">
                          3
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Shield className="w-4 h-4 text-green-500" />
                            <p className="text-xs text-slate-600 dark:text-slate-400">MAC the Ciphertext with Key K₂</p>
                          </div>
                          <div className="bg-green-100 dark:bg-green-900/30 rounded px-3 py-2 border border-green-300 dark:border-green-700">
                            <span className="text-sm font-mono text-green-900 dark:text-green-100">
                              T = HMAC(K₂, C) = 0x2E8C...
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {encryptThenMacAnimated && (
                    <div className="flex justify-center animate-in fade-in duration-500 delay-600">
                      <ArrowRight className="text-slate-400" />
                    </div>
                  )}

                  {/* Step 4: Send */}
                  {encryptThenMacAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-900">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center text-xs font-bold text-white">
                          4
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Send Both</p>
                          <div className="bg-gradient-to-r from-indigo-100 to-green-100 dark:from-indigo-900/30 dark:to-green-900/30 rounded px-3 py-2 border border-violet-300 dark:border-violet-700">
                            <span className="text-sm font-mono text-violet-900 dark:text-violet-100">
                              Send: (C, T)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  onClick={onEncryptThenMacTrigger}
                  variant="outline"
                  className="w-full mt-6"
                >
                  {encryptThenMacAnimated ? 'Reset Animation' : 'Animate Encrypt-then-MAC'}
                </Button>
              </div>

              {/* Receiver's Process */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800 mb-4">
                <p className="text-xs font-semibold text-green-900 dark:text-green-100 mb-3">
                  Receiver's Verification (Critical Order!):
                </p>
                <ol className="space-y-2 text-xs text-green-800 dark:text-green-200">
                  <li className="flex items-start gap-2">
                    <span className="font-bold">1.</span>
                    <span><strong>Verify MAC first:</strong> T' = HMAC(K₂, C), check if T' == T</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">2.</span>
                    <span><strong>If MAC fails:</strong> REJECT immediately, don't decrypt!</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">3.</span>
                    <span><strong>If MAC passes:</strong> Decrypt: M = Decrypt(K₁, C)</span>
                  </li>
                </ol>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded p-3 border border-green-200 dark:border-green-800">
                <p className="text-xs text-green-900 dark:text-green-100">
                  <strong>Why it's secure:</strong> Tampering is detected <em>before</em> decryption. The receiver never processes invalid ciphertext, preventing oracle attacks.
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
                <XCircle size={18} className="text-red-500" />
                MAC-then-Encrypt (Dangerous!)
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                First compute a MAC, then encrypt both the message and MAC together. This approach has serious vulnerabilities.
              </p>

              {/* Timeline Visualization */}
              <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-6 mb-4">
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-4">
                  Sender's Operations:
                </p>
                
                <div className="space-y-4">
                  {/* Step 1: Message */}
                  {macThenEncryptAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center text-xs font-bold">
                          1
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Original Message</p>
                          <div className="bg-slate-200 dark:bg-slate-800 rounded px-3 py-2">
                            <span className="text-sm font-mono text-slate-900 dark:text-white">
                              "Transfer $100 to Bob"
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {macThenEncryptAnimated && (
                    <div className="flex justify-center animate-in fade-in duration-500">
                      <ArrowRight className="text-slate-400" />
                    </div>
                  )}

                  {/* Step 2: MAC */}
                  {macThenEncryptAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-300">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-xs font-bold text-white">
                          2
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Shield className="w-4 h-4 text-orange-500" />
                            <p className="text-xs text-slate-600 dark:text-slate-400">MAC the Plaintext with Key K₂</p>
                          </div>
                          <div className="bg-orange-100 dark:bg-orange-900/30 rounded px-3 py-2 border border-orange-300 dark:border-orange-700">
                            <span className="text-sm font-mono text-orange-900 dark:text-orange-100">
                              T = HMAC(K₂, M) = 0x5A1D...
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {macThenEncryptAnimated && (
                    <div className="flex justify-center animate-in fade-in duration-500 delay-300">
                      <ArrowRight className="text-slate-400" />
                    </div>
                  )}

                  {/* Step 3: Combine and Encrypt */}
                  {macThenEncryptAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-600">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-xs font-bold text-white">
                          3
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <Lock className="w-4 h-4 text-red-500" />
                            <p className="text-xs text-slate-600 dark:text-slate-400">Encrypt Message + MAC with Key K₁</p>
                          </div>
                          <div className="bg-red-100 dark:bg-red-900/30 rounded px-3 py-2 border border-red-300 dark:border-red-700">
                            <span className="text-sm font-mono text-red-900 dark:text-red-100">
                              C = AES(K₁, M || T) = 0xB4E2...
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {macThenEncryptAnimated && (
                    <div className="flex justify-center animate-in fade-in duration-500 delay-600">
                      <ArrowRight className="text-slate-400" />
                    </div>
                  )}

                  {/* Step 4: Send */}
                  {macThenEncryptAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-900">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center text-xs font-bold text-white">
                          4
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Send Ciphertext</p>
                          <div className="bg-red-100 dark:bg-red-900/30 rounded px-3 py-2 border border-violet-300 dark:border-violet-700">
                            <span className="text-sm font-mono text-violet-900 dark:text-violet-100">
                              Send: C
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  onClick={onMacThenEncryptTrigger}
                  variant="outline"
                  className="w-full mt-6"
                >
                  {macThenEncryptAnimated ? 'Reset Animation' : 'Animate MAC-then-Encrypt'}
                </Button>
              </div>

              {/* The Problem */}
              <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-300 dark:border-red-700 mb-4">
                <p className="text-xs font-semibold text-red-900 dark:text-red-100 mb-3 flex items-center gap-2">
                  <AlertTriangle size={14} />
                  Receiver's Process (The Vulnerability!):
                </p>
                <ol className="space-y-2 text-xs text-red-800 dark:text-red-200">
                  <li className="flex items-start gap-2">
                    <span className="font-bold">1.</span>
                    <span><strong>Must decrypt first:</strong> (M || T) = Decrypt(K₁, C)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">2.</span>
                    <span><strong>Parse M and T from decrypted data</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">3.</span>
                    <span><strong>Verify MAC:</strong> T' = HMAC(K₂, M), check if T' == T</span>
                  </li>
                  <li className="flex items-start gap-2 bg-red-200 dark:bg-red-900/40 -mx-2 px-2 py-1 rounded">
                    <span className="font-bold">⚠</span>
                    <span><strong className="text-red-900 dark:text-red-100">DANGER:</strong> Decryption happens before MAC verification!</span>
                  </li>
                </ol>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 rounded p-3 border border-red-200 dark:border-red-800">
                <p className="text-xs text-red-900 dark:text-red-100">
                  <strong>Why it's vulnerable:</strong> The receiver must decrypt <em>before</em> verifying integrity. This creates timing channels and padding oracle attacks where an attacker learns about plaintext by observing decryption errors.
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
                <AlertTriangle size={18} className="text-orange-500" />
                Encrypt-and-MAC (Also Problematic)
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                Encrypt the message and compute a MAC on the plaintext separately. This is used by SSH but has subtle issues.
              </p>

              {/* Timeline Visualization */}
              <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-6 mb-4">
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-4">
                  Sender's Operations (Parallel):
                </p>
                
                <div className="space-y-4">
                  {/* Step 1: Message */}
                  {encryptAndMacAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center text-xs font-bold">
                          1
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Original Message</p>
                          <div className="bg-slate-200 dark:bg-slate-800 rounded px-3 py-2">
                            <span className="text-sm font-mono text-slate-900 dark:text-white">
                              "Transfer $100 to Bob"
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {encryptAndMacAnimated && (
                    <div className="flex justify-center gap-12 animate-in fade-in duration-500">
                      <ArrowRight className="text-slate-400" />
                      <ArrowRight className="text-slate-400" />
                    </div>
                  )}

                  {/* Step 2: Parallel Operations */}
                  {encryptAndMacAnimated && (
                    <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-4 duration-500 delay-300">
                      <div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-bold text-white">
                            2a
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Lock className="w-4 h-4 text-indigo-500" />
                              <p className="text-xs text-slate-600 dark:text-slate-400">Encrypt</p>
                            </div>
                            <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded px-2 py-2 border border-indigo-300 dark:border-indigo-700">
                              <span className="text-xs font-mono text-indigo-900 dark:text-indigo-100">
                                C = AES(K₁, M)
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-xs font-bold text-white">
                            2b
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <Shield className="w-4 h-4 text-orange-500" />
                              <p className="text-xs text-slate-600 dark:text-slate-400">MAC Plaintext</p>
                            </div>
                            <div className="bg-orange-100 dark:bg-orange-900/30 rounded px-2 py-2 border border-orange-300 dark:border-orange-700">
                              <span className="text-xs font-mono text-orange-900 dark:text-orange-100">
                                T = HMAC(K₂, M)
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {encryptAndMacAnimated && (
                    <div className="flex justify-center animate-in fade-in duration-500 delay-600">
                      <ArrowRight className="text-slate-400" />
                    </div>
                  )}

                  {/* Step 3: Send Both */}
                  {encryptAndMacAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-900">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-violet-500 flex items-center justify-center text-xs font-bold text-white">
                          3
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Send Both</p>
                          <div className="bg-gradient-to-r from-indigo-100 to-orange-100 dark:from-indigo-900/30 dark:to-orange-900/30 rounded px-3 py-2 border border-violet-300 dark:border-violet-700">
                            <span className="text-sm font-mono text-violet-900 dark:text-violet-100">
                              Send: (C, T)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  onClick={onEncryptAndMacTrigger}
                  variant="outline"
                  className="w-full mt-6"
                >
                  {encryptAndMacAnimated ? 'Reset Animation' : 'Animate Encrypt-and-MAC'}
                </Button>
              </div>

              {/* The Issues */}
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 border border-orange-300 dark:border-orange-700 mb-4">
                <p className="text-xs font-semibold text-orange-900 dark:text-orange-100 mb-3 flex items-center gap-2">
                  <AlertTriangle size={14} />
                  Problems with This Approach:
                </p>
                <ol className="space-y-2 text-xs text-orange-800 dark:text-orange-200">
                  <li className="flex items-start gap-2">
                    <span className="font-bold">1.</span>
                    <span><strong>MAC reveals plaintext information:</strong> The MAC is computed on plaintext, potentially leaking info about the message</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">2.</span>
                    <span><strong>No ciphertext integrity:</strong> MAC doesn't authenticate the ciphertext, only the plaintext</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold">3.</span>
                    <span><strong>Ciphertext malleability:</strong> Attacker can modify ciphertext; MAC won't detect it directly</span>
                  </li>
                </ol>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-100 dark:bg-slate-900 rounded p-3 border border-slate-300 dark:border-slate-700">
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                    Receiver can verify MAC first
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    T' = HMAC(K₂, Decrypt(K₁, C))
                  </p>
                </div>

                <div className="bg-orange-100 dark:bg-orange-900/30 rounded p-3 border border-orange-300 dark:border-orange-700">
                  <p className="text-xs font-semibold text-orange-700 dark:text-orange-300 mb-2">
                    But still must decrypt first!
                  </p>
                  <p className="text-xs text-orange-600 dark:text-orange-400">
                    No protection against ciphertext attacks
                  </p>
                </div>
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

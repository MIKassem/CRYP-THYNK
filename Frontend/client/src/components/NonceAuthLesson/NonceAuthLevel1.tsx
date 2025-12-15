import { Shield, User, Server, ArrowRight, Key, AlertTriangle, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NonceAuthLevel1Props {
  currentStep: number; // 0-2
  onNext: () => void;
  onPrevious: () => void;
  onChallengeResponseTrigger: () => void;
  challengeResponseAnimated: boolean;
}

export function NonceAuthLevel1({
  currentStep,
  onNext,
  onPrevious,
  onChallengeResponseTrigger,
  challengeResponseAnimated,
}: NonceAuthLevel1Props) {
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Shield size={18} className="text-indigo-500" />
                What is a Nonce?
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                A <strong>nonce</strong> (Number used ONCE) is a random value used in authentication protocols to ensure message <strong>freshness</strong> and prevent replay attacks.
              </p>

              {/* Key Properties */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 border border-indigo-200 dark:border-indigo-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="w-5 h-5 text-indigo-500" />
                    <h5 className="font-semibold text-sm text-indigo-900 dark:text-indigo-100">
                      Used Only Once
                    </h5>
                  </div>
                  <p className="text-xs text-indigo-800 dark:text-indigo-200">
                    Each nonce should never be repeated in the lifetime of a key
                  </p>
                </div>

                <div className="bg-violet-50 dark:bg-violet-900/20 rounded-lg p-4 border border-violet-200 dark:border-violet-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Key className="w-5 h-5 text-violet-500" />
                    <h5 className="font-semibold text-sm text-violet-900 dark:text-violet-100">
                      Unpredictable
                    </h5>
                  </div>
                  <p className="text-xs text-violet-800 dark:text-violet-200">
                    Generated randomly or using a secure counter
                  </p>
                </div>

                <div className="bg-sky-50 dark:bg-sky-900/20 rounded-lg p-4 border border-sky-200 dark:border-sky-800">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="w-5 h-5 text-sky-500" />
                    <h5 className="font-semibold text-sm text-sky-900 dark:text-sky-100">
                      Ensures Freshness
                    </h5>
                  </div>
                  <p className="text-xs text-sky-800 dark:text-sky-200">
                    Proves the message was created recently, not replayed
                  </p>
                </div>

                <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-lg p-4 border border-emerald-200 dark:border-emerald-800">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-emerald-500" />
                    <h5 className="font-semibold text-sm text-emerald-900 dark:text-emerald-100">
                      Prevents Replay
                    </h5>
                  </div>
                  <p className="text-xs text-emerald-800 dark:text-emerald-200">
                    Old authentication messages can't be reused by attackers
                  </p>
                </div>
              </div>

              {/* Common Uses */}
              <div className="bg-slate-100 dark:bg-slate-900 rounded-lg p-4">
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Common Uses of Nonces:
                </p>
                <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-500">•</span>
                    <span><strong>Challenge-Response Authentication:</strong> Server sends nonce, client proves knowledge of secret</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-500">•</span>
                    <span><strong>Encryption IVs:</strong> Initialization vectors in AES-GCM must be unique</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-500">•</span>
                    <span><strong>API Request Signing:</strong> Prevents replay of authenticated API calls</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-indigo-500">•</span>
                    <span><strong>TLS Handshake:</strong> Client and server exchange random nonces</span>
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
                <Key size={18} className="text-violet-500" />
                Challenge-Response Authentication
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                In challenge-response, the server sends a random nonce (challenge), and the client must respond with a cryptographic proof using their secret key.
              </p>

              {/* Protocol Flow */}
              <div className="bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950 rounded-lg p-6 border border-slate-200 dark:border-slate-700 mb-6">
                <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-4">
                  Authentication Protocol Flow:
                </p>

                <div className="space-y-4">
                  {/* Step 1: Login Request */}
                  {challengeResponseAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-slate-900 dark:text-white">
                              1. Client (Alice) → Server
                            </p>
                          </div>
                          <ArrowRight className="text-slate-400" size={16} />
                        </div>
                        <div className="ml-11 bg-blue-50 dark:bg-blue-900/20 rounded px-3 py-2">
                          <p className="text-xs font-mono text-blue-900 dark:text-blue-100">
                            "I am Alice, please authenticate me"
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Challenge */}
                  {challengeResponseAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-300">
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                            <Server className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-slate-900 dark:text-white">
                              2. Server → Client (Alice)
                            </p>
                          </div>
                          <ArrowRight className="text-slate-400 rotate-180" size={16} />
                        </div>
                        <div className="ml-11 space-y-2">
                          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded px-3 py-2">
                            <p className="text-xs text-indigo-700 dark:text-indigo-300 mb-1">Challenge (Nonce):</p>
                            <p className="text-xs font-mono text-indigo-900 dark:text-indigo-100">
                              nonce = "a7f3c2d9e1b4..."
                            </p>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                            "Prove you have the secret key by signing this nonce"
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Response */}
                  {challengeResponseAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-600">
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-slate-900 dark:text-white">
                              3. Client (Alice) → Server
                            </p>
                          </div>
                          <ArrowRight className="text-slate-400" size={16} />
                        </div>
                        <div className="ml-11 space-y-2">
                          <div className="bg-green-50 dark:bg-green-900/20 rounded px-3 py-2">
                            <p className="text-xs text-green-700 dark:text-green-300 mb-1">Response (Signed Nonce):</p>
                            <p className="text-xs font-mono text-green-900 dark:text-green-100">
                              signature = HMAC(secret_key, nonce)
                            </p>
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 italic">
                            Alice computes MAC/signature using her secret key
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Verification */}
                  {challengeResponseAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-900">
                      <div className="bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 rounded-lg p-4 border-2 border-green-400 dark:border-green-600">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                            <Server className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-emerald-900 dark:text-emerald-100">
                              4. Server Verifies
                            </p>
                          </div>
                        </div>
                        <div className="ml-11 space-y-2">
                          <div className="bg-white dark:bg-slate-800 rounded px-3 py-2">
                            <p className="text-xs font-mono text-slate-900 dark:text-white">
                              expected = HMAC(Alice's_key, nonce)
                            </p>
                            <p className="text-xs font-mono text-slate-900 dark:text-white">
                              if (signature == expected) → ✅ Authenticated!
                            </p>
                          </div>
                          <p className="text-xs text-green-700 dark:text-green-300 font-semibold">
                            ✓ Alice proved she has the secret key without sending it!
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  onClick={onChallengeResponseTrigger}
                  variant="outline"
                  className="w-full mt-6"
                >
                  {challengeResponseAnimated ? 'Reset' : 'Start Challenge-Response'}
                </Button>
              </div>

              {/* Key Benefits */}
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded p-4 border border-indigo-200 dark:border-indigo-800">
                <p className="text-xs font-semibold text-indigo-900 dark:text-indigo-100 mb-2">
                  Why This is Secure:
                </p>
                <ul className="space-y-2 text-xs text-indigo-800 dark:text-indigo-200">
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span><strong>Password never transmitted:</strong> Only the signature is sent</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span><strong>Unique every time:</strong> Different nonce = different signature</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span><strong>Can't be replayed:</strong> Old signatures won't work with new nonces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span><strong>Proves freshness:</strong> Response must be created after challenge</span>
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
                <AlertTriangle size={18} className="text-orange-500" />
                Why Do We Need Nonces?
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                Without nonces, authentication systems are vulnerable to <strong>replay attacks</strong> where an attacker captures and reuses valid authentication messages.
              </p>

              {/* Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Without Nonce */}
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border-2 border-red-300 dark:border-red-700">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-red-500 flex items-center justify-center text-white text-xs font-bold">
                      ✗
                    </div>
                    <h5 className="font-semibold text-sm text-red-900 dark:text-red-100">
                      Without Nonce (Vulnerable)
                    </h5>
                  </div>

                  <div className="space-y-3 text-xs text-red-800 dark:text-red-200">
                    <div className="bg-white dark:bg-slate-800 rounded p-2">
                      <p className="font-mono text-red-700 dark:text-red-300">
                        Auth = HMAC(key, "login")
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="font-semibold">Problems:</p>
                      <ul className="space-y-1 ml-3">
                        <li>• Same message every time</li>
                        <li>• Attacker can capture it</li>
                        <li>• Replay endlessly</li>
                        <li>• No way to detect reuse</li>
                      </ul>
                    </div>

                    <div className="bg-red-100 dark:bg-red-900/40 rounded p-2 text-center">
                      <p className="font-semibold text-red-900 dark:text-red-100">
                        🚨 Replay Attack Possible!
                      </p>
                    </div>
                  </div>
                </div>

                {/* With Nonce */}
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border-2 border-green-500">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
                      ✓
                    </div>
                    <h5 className="font-semibold text-sm text-green-900 dark:text-green-100">
                      With Nonce (Secure)
                    </h5>
                  </div>

                  <div className="space-y-3 text-xs text-green-800 dark:text-green-200">
                    <div className="bg-white dark:bg-slate-800 rounded p-2">
                      <p className="font-mono text-green-700 dark:text-green-300">
                        Auth = HMAC(key, nonce)
                      </p>
                      <p className="text-[10px] text-slate-500 mt-1">
                        nonce = random & unique
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="font-semibold">Benefits:</p>
                      <ul className="space-y-1 ml-3">
                        <li>• Different every time</li>
                        <li>• Server tracks used nonces</li>
                        <li>• Replay detected instantly</li>
                        <li>• Proves message freshness</li>
                      </ul>
                    </div>

                    <div className="bg-green-100 dark:bg-green-900/40 rounded p-2 text-center">
                      <p className="font-semibold text-green-900 dark:text-green-100">
                        ✅ Replay Attack Prevented!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Real-World Scenario */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 rounded-lg p-5 border border-orange-200 dark:border-orange-800">
                <p className="text-sm font-semibold text-orange-900 dark:text-orange-100 mb-3 flex items-center gap-2">
                  <AlertTriangle size={16} />
                  Real-World Attack Example
                </p>
                <div className="space-y-3 text-xs text-orange-800 dark:text-orange-200">
                  <div className="bg-white dark:bg-slate-800 rounded p-3">
                    <p className="font-semibold mb-2">Scenario: Car Key Fob</p>
                    <p className="mb-2">
                      <strong>Without nonce:</strong> Attacker records your key fob signal when you unlock your car. Later, they replay the exact same signal to unlock it.
                    </p>
                    <p>
                      <strong>With nonce:</strong> Car sends different challenge each time. Your key fob signs the challenge. Attacker's recorded signal won't work because it's for an old challenge.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-sky-50 dark:bg-sky-900/20 rounded p-3 border border-sky-200 dark:border-sky-800">
                <p className="text-xs text-sky-900 dark:text-sky-100">
                  <strong>Key Takeaway:</strong> Nonces ensure that each authentication attempt is unique and time-bound, making replay attacks impossible even if the attacker captures all network traffic.
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

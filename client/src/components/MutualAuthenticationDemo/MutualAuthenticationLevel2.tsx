import { Skull, Shield, User, Server, AlertTriangle, CheckCircle2, XCircle, Eye, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MutualAuthenticationLevel2Props {
  currentStep: number; // 0-2
  onNext: () => void;
  onPrevious: () => void;
  onMitmWithoutMutualAuthTrigger: () => void;
  mitmWithoutMutualAuthAnimated: boolean;
  onMitmWithMutualAuthTrigger: () => void;
  mitmWithMutualAuthAnimated: boolean;
  onInteractiveDemoTrigger: () => void;
  interactiveDemoAnimated: boolean;
  mutualAuthEnabled: boolean;
  onToggleMutualAuth: () => void;
  quizAnswers: Record<number, string>;
  onQuizAnswer: (questionId: number, answer: string) => void;
}

export function MutualAuthenticationLevel2({
  currentStep,
  onNext,
  onPrevious,
  onMitmWithoutMutualAuthTrigger,
  mitmWithoutMutualAuthAnimated,
  onMitmWithMutualAuthTrigger,
  mitmWithMutualAuthAnimated,
  onInteractiveDemoTrigger,
  interactiveDemoAnimated,
  mutualAuthEnabled,
  onToggleMutualAuth,
  quizAnswers,
  onQuizAnswer,
}: MutualAuthenticationLevel2Props) {
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Skull size={18} className="text-red-500" />
                MITM Attack Without Mutual Authentication
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                When only the client authenticates, an attacker can <strong>impersonate the server</strong> and steal credentials.
              </p>

              {/* MITM Attack Visualization */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 rounded-lg p-6 border-2 border-red-300 dark:border-red-700 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Skull className="w-6 h-6 text-red-600" />
                  <p className="font-semibold text-red-900 dark:text-red-100">Man-in-the-Middle Attack</p>
                </div>

                <div className="space-y-4">
                  {/* Setup */}
                  <div className={`transition-all duration-500 ${mitmWithoutMutualAuthAnimated ? 'opacity-100' : 'opacity-50'}`}>
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white mb-3">
                        Network Setup
                      </p>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex-1 bg-blue-100 dark:bg-blue-900/30 rounded p-3 text-center">
                          <User className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                          <p className="text-xs font-semibold text-blue-900 dark:text-blue-100">Alice (Client)</p>
                          <p className="text-[10px] text-blue-700 dark:text-blue-300">Wants to login</p>
                        </div>
                        <div className="flex-1 bg-red-100 dark:bg-red-900/30 rounded p-3 text-center border-2 border-red-500">
                          <Skull className="w-6 h-6 text-red-600 mx-auto mb-1" />
                          <p className="text-xs font-semibold text-red-900 dark:text-red-100">Mallory (Attacker)</p>
                          <p className="text-[10px] text-red-700 dark:text-red-300">Fake server</p>
                        </div>
                        <div className="flex-1 bg-green-100 dark:bg-green-900/30 rounded p-3 text-center opacity-50">
                          <Server className="w-6 h-6 text-green-600 mx-auto mb-1" />
                          <p className="text-xs font-semibold text-green-900 dark:text-green-100">Real Server</p>
                          <p className="text-[10px] text-green-700 dark:text-green-300">Never reached</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 1: Client connects to fake server */}
                  <div className={`transition-all duration-500 ${mitmWithoutMutualAuthAnimated ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`} style={{ transitionDelay: '300ms' }}>
                    <div className="bg-orange-100 dark:bg-orange-900/30 rounded-lg p-4 border border-orange-300 dark:border-orange-700">
                      <p className="text-xs font-semibold text-orange-900 dark:text-orange-100 mb-2">
                        Step 1: Alice connects to what she thinks is the bank
                      </p>
                      <div className="bg-white dark:bg-slate-800 rounded p-3 text-xs font-mono space-y-1">
                        <div className="text-blue-700 dark:text-blue-300">Alice → "bank.com" (actually Mallory's fake server)</div>
                        <div className="text-red-700 dark:text-red-300">Mallory: "Hello! I'm bank.com, please login"</div>
                        <div className="text-slate-600 dark:text-slate-400 italic">Alice has NO way to verify this is the real bank!</div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Client sends credentials */}
                  <div className={`transition-all duration-500 ${mitmWithoutMutualAuthAnimated ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`} style={{ transitionDelay: '600ms' }}>
                    <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-4 border-2 border-red-500 dark:border-red-700">
                      <p className="text-xs font-semibold text-red-900 dark:text-red-100 mb-2">
                        Step 2: Alice sends credentials to the fake server
                      </p>
                      <div className="bg-white dark:bg-slate-800 rounded p-3 text-xs font-mono space-y-1">
                        <div className="text-blue-700 dark:text-blue-300">Alice → Mallory: username="alice"</div>
                        <div className="text-blue-700 dark:text-blue-300">Alice → Mallory: password="my_secret_123"</div>
                        <div className="flex items-center gap-2 text-red-900 dark:text-red-100 font-semibold mt-2 pt-2 border-t border-red-300">
                          <Eye className="w-4 h-4" />
                          <span>Mallory now has Alice's credentials!</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Attacker uses credentials */}
                  <div className={`transition-all duration-500 ${mitmWithoutMutualAuthAnimated ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`} style={{ transitionDelay: '900ms' }}>
                    <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-4 border-2 border-red-500 dark:border-red-700">
                      <p className="text-xs font-semibold text-red-900 dark:text-red-100 mb-2">
                        Step 3: Mallory logs into real bank with stolen credentials
                      </p>
                      <div className="bg-white dark:bg-slate-800 rounded p-3 text-xs font-mono space-y-1">
                        <div className="text-red-700 dark:text-red-300">Mallory → Real Server: username="alice"</div>
                        <div className="text-red-700 dark:text-red-300">Mallory → Real Server: password="my_secret_123"</div>
                        <div className="text-green-700 dark:text-green-300">Real Server: "Access granted! ✓"</div>
                        <div className="flex items-center gap-2 text-red-900 dark:text-red-100 font-semibold mt-2 pt-2 border-t border-red-300">
                          <AlertTriangle className="w-4 h-4" />
                          <span>Mallory can now access Alice's account! 🚨</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Outcome */}
                  <div className={`transition-all duration-500 ${mitmWithoutMutualAuthAnimated ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`} style={{ transitionDelay: '1200ms' }}>
                    <div className="bg-gradient-to-r from-red-200 to-orange-200 dark:from-red-900/50 dark:to-orange-900/50 rounded-lg p-4 border-2 border-red-600">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertTriangle className="w-5 h-5 text-red-700 dark:text-red-300" />
                        <p className="text-sm font-semibold text-red-900 dark:text-red-100">
                          Attack Succeeds!
                        </p>
                      </div>
                      <div className="space-y-1 text-xs text-red-800 dark:text-red-200">
                        <p>✗ Alice sent credentials to fake server</p>
                        <p>✗ Mallory intercepted and captured credentials</p>
                        <p>✗ Mallory accessed Alice's real account</p>
                        <p className="font-semibold bg-red-300 dark:bg-red-900/70 rounded p-2 text-center text-red-900 dark:text-red-100 mt-2">
                          Problem: Client never verified server identity!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={onMitmWithoutMutualAuthTrigger}
                  variant="outline"
                  className="w-full mt-6 border-red-300 hover:bg-red-50 dark:border-red-700 dark:hover:bg-red-900/20"
                >
                  {mitmWithoutMutualAuthAnimated ? 'Reset' : 'Show MITM Attack (No Mutual Auth) 🎯'}
                </Button>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 rounded p-4 border border-red-200 dark:border-red-800">
                <p className="text-xs font-semibold text-red-900 dark:text-red-100 mb-2">
                  Why This Works:
                </p>
                <ul className="space-y-1 text-xs text-red-800 dark:text-red-200">
                  <li>• Client has <strong>no way</strong> to verify server's identity</li>
                  <li>• Attacker can set up fake server with same interface</li>
                  <li>• Client trusts whoever responds (phishing vulnerability)</li>
                  <li>• Common in fake WiFi hotspots, phishing sites, DNS spoofing</li>
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
                <Shield size={18} className="text-green-500" />
                MITM Attack BLOCKED by Mutual Authentication
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                With mutual authentication, the client <strong>verifies the server's certificate</strong> before sending any credentials.
              </p>

              {/* MITM Defense Visualization */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg p-6 border-2 border-green-300 dark:border-green-700 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                  <p className="font-semibold text-green-900 dark:text-green-100">Mutual Auth Prevents MITM</p>
                </div>

                <div className="space-y-4">
                  {/* Setup */}
                  <div className={`transition-all duration-500 ${mitmWithMutualAuthAnimated ? 'opacity-100' : 'opacity-50'}`}>
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white mb-3">
                        Same Attack Attempt
                      </p>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex-1 bg-blue-100 dark:bg-blue-900/30 rounded p-3 text-center">
                          <User className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                          <p className="text-xs font-semibold text-blue-900 dark:text-blue-100">Alice (Client)</p>
                          <p className="text-[10px] text-blue-700 dark:text-blue-300">Mutual auth enabled</p>
                        </div>
                        <div className="flex-1 bg-red-100 dark:bg-red-900/30 rounded p-3 text-center border-2 border-red-500">
                          <Skull className="w-6 h-6 text-red-600 mx-auto mb-1" />
                          <p className="text-xs font-semibold text-red-900 dark:text-red-100">Mallory (Attacker)</p>
                          <p className="text-[10px] text-red-700 dark:text-red-300">Fake server</p>
                        </div>
                        <div className="flex-1 bg-green-100 dark:bg-green-900/30 rounded p-3 text-center">
                          <Server className="w-6 h-6 text-green-600 mx-auto mb-1" />
                          <p className="text-xs font-semibold text-green-900 dark:text-green-100">Real Server</p>
                          <p className="text-[10px] text-green-700 dark:text-green-300">Has valid cert</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 1: Attacker responds */}
                  <div className={`transition-all duration-500 ${mitmWithMutualAuthAnimated ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`} style={{ transitionDelay: '300ms' }}>
                    <div className="bg-orange-100 dark:bg-orange-900/30 rounded-lg p-4 border border-orange-300 dark:border-orange-700">
                      <p className="text-xs font-semibold text-orange-900 dark:text-orange-100 mb-2">
                        Step 1: Mallory tries to impersonate the bank
                      </p>
                      <div className="bg-white dark:bg-slate-800 rounded p-3 text-xs font-mono space-y-1">
                        <div className="text-blue-700 dark:text-blue-300">Alice → "bank.com"</div>
                        <div className="text-red-700 dark:text-red-300">Mallory: "Hello! Here's my certificate..."</div>
                        <div className="text-red-700 dark:text-red-300">certificate: self-signed (not from trusted CA)</div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Client verifies and REJECTS */}
                  <div className={`transition-all duration-500 ${mitmWithMutualAuthAnimated ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`} style={{ transitionDelay: '600ms' }}>
                    <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-4 border-2 border-green-500 dark:border-green-700">
                      <p className="text-xs font-semibold text-green-900 dark:text-green-100 mb-2">
                        Step 2: Alice's client verifies the certificate
                      </p>
                      <div className="bg-white dark:bg-slate-800 rounded p-3 text-xs font-mono space-y-1">
                        <div className="text-slate-700 dark:text-slate-300">Alice's client: Checking certificate...</div>
                        <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                          <XCircle size={14} />
                          <span>✗ Certificate not signed by trusted CA</span>
                        </div>
                        <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                          <XCircle size={14} />
                          <span>✗ Domain mismatch (certificate for "evil.com", not "bank.com")</span>
                        </div>
                        <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                          <XCircle size={14} />
                          <span>✗ Self-signed certificate</span>
                        </div>
                        <div className="flex items-center gap-2 text-green-900 dark:text-green-100 font-semibold mt-2 pt-2 border-t border-green-300">
                          <Shield className="w-4 h-4" />
                          <span>CERTIFICATE VERIFICATION FAILED!</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Connection terminated */}
                  <div className={`transition-all duration-500 ${mitmWithMutualAuthAnimated ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`} style={{ transitionDelay: '900ms' }}>
                    <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-4 border border-red-300 dark:border-red-700">
                      <p className="text-xs font-semibold text-red-900 dark:text-red-100 mb-2">
                        Step 3: Client terminates connection immediately
                      </p>
                      <div className="bg-white dark:bg-slate-800 rounded p-3 text-xs font-mono space-y-1">
                        <div className="text-blue-700 dark:text-blue-300">Alice's client: "Invalid certificate! Disconnecting..."</div>
                        <div className="text-red-700 dark:text-red-300">Connection closed.</div>
                        <div className="text-blue-700 dark:text-blue-300">Alert shown: "This site's certificate is invalid. Your connection is not secure."</div>
                        <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 mt-2 pt-2 border-t border-slate-300 italic">
                          <span>Credentials were NEVER sent!</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Outcome */}
                  <div className={`transition-all duration-500 ${mitmWithMutualAuthAnimated ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`} style={{ transitionDelay: '1200ms' }}>
                    <div className="bg-gradient-to-r from-green-200 to-emerald-200 dark:from-green-900/50 dark:to-emerald-900/50 rounded-lg p-4 border-2 border-green-600">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-5 h-5 text-green-700 dark:text-green-300" />
                        <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                          Attack BLOCKED!
                        </p>
                      </div>
                      <div className="space-y-1 text-xs text-green-800 dark:text-green-200">
                        <p>✓ Client verified server's certificate</p>
                        <p>✓ Certificate verification failed (not from trusted CA)</p>
                        <p>✓ Connection terminated before sending credentials</p>
                        <p>✓ User warned about untrusted server</p>
                        <p className="font-semibold bg-green-300 dark:bg-green-900/70 rounded p-2 text-center text-green-900 dark:text-green-100 mt-2">
                          Credentials safe! MITM attack prevented! 🛡️
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={onMitmWithMutualAuthTrigger}
                  variant="outline"
                  className="w-full mt-6 border-green-300 hover:bg-green-50 dark:border-green-700 dark:hover:bg-green-900/20"
                >
                  {mitmWithMutualAuthAnimated ? 'Reset' : 'Show MITM Defense (Mutual Auth) 🛡️'}
                </Button>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded p-4 border border-green-200 dark:border-green-800">
                <p className="text-xs font-semibold text-green-900 dark:text-green-100 mb-2">
                  How Mutual Auth Prevents MITM:
                </p>
                <ul className="space-y-1 text-xs text-green-800 dark:text-green-200">
                  <li>• <strong>Certificate verification:</strong> Client checks server's certificate before trusting</li>
                  <li>• <strong>CA trust chain:</strong> Certificate must be signed by trusted Certificate Authority</li>
                  <li>• <strong>Domain validation:</strong> Certificate must match the domain being accessed</li>
                  <li>• <strong>Immediate detection:</strong> Fake certificates detected before credentials sent</li>
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
                <Lock size={18} className="text-indigo-500" />
                Interactive Demo: Toggle Mutual Authentication
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                See the difference yourself! <strong>Enable or disable</strong> mutual authentication and observe what happens when an attacker intercepts the connection.
              </p>

              {/* Toggle Control */}
              <div className="bg-gradient-to-br from-indigo-50 to-sky-50 dark:from-indigo-950 dark:to-sky-950 rounded-lg p-6 border border-indigo-200 dark:border-indigo-700 mb-6">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-indigo-200 dark:border-indigo-800">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white mb-1">
                      Mutual Authentication
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-400">
                      {mutualAuthEnabled ? 'Client verifies server certificate ✓' : 'Client trusts any server ✗'}
                    </p>
                  </div>
                  <button
                    onClick={onToggleMutualAuth}
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                      mutualAuthEnabled ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                        mutualAuthEnabled ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Scenario Visualization */}
                <div className="space-y-4">
                  {/* Current State */}
                  <div className={`transition-all duration-500 ${interactiveDemoAnimated ? 'opacity-100' : 'opacity-50'}`}>
                    <div className={`rounded-lg p-4 border-2 ${
                      mutualAuthEnabled
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-500'
                        : 'bg-red-50 dark:bg-red-900/20 border-red-500'
                    }`}>
                      <p className="text-xs font-semibold mb-3 ${mutualAuthEnabled ? 'text-green-900 dark:text-green-100' : 'text-red-900 dark:text-red-100'}">
                        Current Configuration:
                      </p>
                      {mutualAuthEnabled ? (
                        <div className="space-y-2 text-xs text-green-800 dark:text-green-200">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-green-600" />
                            <span><strong>Server Authentication:</strong> ENABLED</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-green-600" />
                            <span><strong>Certificate Verification:</strong> ON</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-green-600" />
                            <span><strong>MITM Protection:</strong> ACTIVE</span>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2 text-xs text-red-800 dark:text-red-200">
                          <div className="flex items-center gap-2">
                            <XCircle size={14} className="text-red-600" />
                            <span><strong>Server Authentication:</strong> DISABLED</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <XCircle size={14} className="text-red-600" />
                            <span><strong>Certificate Verification:</strong> OFF</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <AlertTriangle size={14} className="text-red-600" />
                            <span><strong>MITM Protection:</strong> VULNERABLE</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Attack Outcome */}
                  <div className={`transition-all duration-500 ${interactiveDemoAnimated ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`} style={{ transitionDelay: '300ms' }}>
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white mb-3">
                        Attacker intercepts connection...
                      </p>

                      {mutualAuthEnabled ? (
                        <div className="space-y-2">
                          <div className="bg-green-50 dark:bg-green-900/20 rounded p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <Shield className="w-5 h-5 text-green-600" />
                              <p className="text-xs font-semibold text-green-900 dark:text-green-100">
                                Attack Detected & Blocked
                              </p>
                            </div>
                            <div className="space-y-1 text-xs text-green-800 dark:text-green-200">
                              <p>1. Client requests server certificate</p>
                              <p>2. Attacker sends fake certificate</p>
                              <p>3. Client verifies: ✗ Certificate invalid!</p>
                              <p>4. Client: <strong>"Connection refused - untrusted server"</strong></p>
                              <p className="pt-2 mt-2 border-t border-green-200 dark:border-green-800 font-semibold">
                                → Credentials never sent. User warned. ✓
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="bg-red-50 dark:bg-red-900/20 rounded p-3">
                            <div className="flex items-center gap-2 mb-2">
                              <Skull className="w-5 h-5 text-red-600" />
                              <p className="text-xs font-semibold text-red-900 dark:text-red-100">
                                Attack Succeeds
                              </p>
                            </div>
                            <div className="space-y-1 text-xs text-red-800 dark:text-red-200">
                              <p>1. Client connects without verification</p>
                              <p>2. Client: "Hello! Please authenticate me"</p>
                              <p>3. Client sends: username, password</p>
                              <p>4. Attacker captures credentials</p>
                              <p className="pt-2 mt-2 border-t border-red-200 dark:border-red-800 font-semibold">
                                → Credentials stolen. Account compromised. 🚨
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Try It */}
                  <div className={`transition-all duration-500 ${interactiveDemoAnimated ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`} style={{ transitionDelay: '600ms' }}>
                    <div className="bg-indigo-100 dark:bg-indigo-900/30 rounded-lg p-4 border border-indigo-300 dark:border-indigo-700 text-center">
                      <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-100 mb-2">
                        Try switching the toggle above!
                      </p>
                      <p className="text-xs text-indigo-800 dark:text-indigo-200">
                        See how the outcome changes when mutual authentication is enabled vs disabled.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={onInteractiveDemoTrigger}
                  variant="outline"
                  className="w-full mt-6"
                >
                  {interactiveDemoAnimated ? 'Reset' : 'Run Interactive Demo'}
                </Button>
              </div>

              {/* Quiz */}
              <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                  <strong>Question:</strong> In which scenario is mutual authentication MOST critical?
                </p>
                <div className="space-y-2">
                  {[
                    { id: 'q1a', text: 'Public WiFi at a coffee shop' },
                    { id: 'q1b', text: 'Banking API for corporate clients' },
                    { id: 'q1c', text: 'Reading public news websites' },
                    { id: 'q1d', text: 'Downloading files from a public FTP server' },
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
                {quizAnswers[1] && quizAnswers[1] === 'q1b' && (
                  <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded text-xs text-green-800 dark:text-green-200">
                    ✓ Correct! Banking APIs must verify both client (to prevent unauthorized access) and server (to prevent phishing/MITM). 
                    Corporate clients need assurance they're connecting to the real bank server.
                  </div>
                )}
                {quizAnswers[1] && quizAnswers[1] !== 'q1b' && (
                  <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded text-xs text-red-800 dark:text-red-200">
                    ✗ While mutual auth can be useful in other scenarios, banking APIs require the strongest security. 
                    Both parties must verify each other to prevent fraud and MITM attacks.
                  </div>
                )}
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

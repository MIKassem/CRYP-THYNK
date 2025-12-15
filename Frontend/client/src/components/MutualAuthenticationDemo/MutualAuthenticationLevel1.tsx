import { User, Server, Shield, ArrowRight, CheckCircle2, AlertTriangle, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MutualAuthenticationLevel1Props {
  currentStep: number; // 0-2
  onNext: () => void;
  onPrevious: () => void;
  onClientOnlyAuthDemoTrigger: () => void;
  clientOnlyAuthDemoAnimated: boolean;
  onMutualAuthDemoTrigger: () => void;
  mutualAuthDemoAnimated: boolean;
  onComparisonViewTrigger: () => void;
  comparisonViewAnimated: boolean;
}

export function MutualAuthenticationLevel1({
  currentStep,
  onNext,
  onPrevious,
  onClientOnlyAuthDemoTrigger,
  clientOnlyAuthDemoAnimated,
  onMutualAuthDemoTrigger,
  mutualAuthDemoAnimated,
  onComparisonViewTrigger,
  comparisonViewAnimated,
}: MutualAuthenticationLevel1Props) {
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Shield size={18} className="text-indigo-500" />
                What is Mutual Authentication?
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                Most authentication systems are <strong>one-way</strong>: the client proves their identity to the server. 
                But how does the client know they're talking to the <strong>real server</strong>?
              </p>

              {/* Comparison Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {/* Client-Only Authentication */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 rounded-lg p-5 border-2 border-orange-300 dark:border-orange-700">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-orange-900 dark:text-orange-100">
                        Client-Only Auth
                      </h5>
                      <p className="text-xs text-orange-700 dark:text-orange-300">One-way verification</p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs">
                        <ArrowRight size={14} className="text-orange-500" />
                        <span className="text-slate-700 dark:text-slate-300">Client proves identity to server</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <AlertTriangle size={14} className="text-red-500" />
                        <span className="text-slate-700 dark:text-slate-300">Server identity NOT verified</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-100 dark:bg-red-900/30 rounded p-3">
                    <p className="text-xs font-semibold text-red-900 dark:text-red-100 mb-1">
                      Vulnerability:
                    </p>
                    <p className="text-xs text-red-800 dark:text-red-200">
                      Client might connect to a <strong>fake server</strong> (MITM attack)
                    </p>
                  </div>
                </div>

                {/* Mutual Authentication */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg p-5 border-2 border-green-300 dark:border-green-700">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h5 className="font-semibold text-green-900 dark:text-green-100">
                        Mutual Auth
                      </h5>
                      <p className="text-xs text-green-700 dark:text-green-300">Two-way verification</p>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-slate-800 rounded-lg p-4 mb-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs">
                        <CheckCircle2 size={14} className="text-green-500" />
                        <span className="text-slate-700 dark:text-slate-300">Client proves identity to server</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <CheckCircle2 size={14} className="text-green-500" />
                        <span className="text-slate-700 dark:text-slate-300">Server proves identity to client</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-100 dark:bg-green-900/30 rounded p-3">
                    <p className="text-xs font-semibold text-green-900 dark:text-green-100 mb-1">
                      Protection:
                    </p>
                    <p className="text-xs text-green-800 dark:text-green-200">
                      <strong>Both parties</strong> verify each other - prevents MITM attacks
                    </p>
                  </div>
                </div>
              </div>

              {/* Real-World Example */}
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 border border-indigo-200 dark:border-indigo-800">
                <p className="text-xs font-semibold text-indigo-900 dark:text-indigo-100 mb-2">
                  Real-World Example:
                </p>
                <div className="space-y-2 text-xs text-indigo-800 dark:text-indigo-200">
                  <p>
                    <strong>HTTPS (TLS):</strong> When you visit a website, the server sends a certificate to prove it's the real server. 
                    Your browser verifies this certificate. However, TLS also supports <strong>client certificates</strong> for mutual authentication 
                    (commonly used in corporate environments, banking APIs, and secure IoT devices).
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <User size={18} className="text-orange-500" />
                Client-Only Authentication Flow
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                In traditional authentication, <strong>only the client</strong> proves their identity. The server is trusted by default.
              </p>

              {/* Client-Only Auth Flow */}
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950 dark:to-yellow-950 rounded-lg p-6 border border-orange-200 dark:border-orange-700 mb-6">
                <div className="space-y-4">
                  {/* Step 1: Client Request */}
                  {clientOnlyAuthDemoAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border-l-4 border-blue-500">
                        <div className="flex items-center gap-3 mb-2">
                          <User className="w-5 h-5 text-blue-600" />
                          <span className="text-xs font-semibold text-slate-900 dark:text-white">
                            Step 1: Client initiates connection
                          </span>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-3 text-xs font-mono">
                          Client → Server: "Hello, I want to connect"
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Client Authenticates */}
                  {clientOnlyAuthDemoAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-300">
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border-l-4 border-violet-500">
                        <div className="flex items-center gap-3 mb-2">
                          <Key className="w-5 h-5 text-violet-600" />
                          <span className="text-xs font-semibold text-slate-900 dark:text-white">
                            Step 2: Client sends credentials
                          </span>
                        </div>
                        <div className="bg-violet-50 dark:bg-violet-900/20 rounded p-3 text-xs font-mono space-y-1">
                          <div>Client → Server: username="alice"</div>
                          <div>Client → Server: password_hash=HMAC(...)</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Server Accepts */}
                  {clientOnlyAuthDemoAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-600">
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border-l-4 border-green-500">
                        <div className="flex items-center gap-3 mb-2">
                          <Server className="w-5 h-5 text-green-600" />
                          <span className="text-xs font-semibold text-slate-900 dark:text-white">
                            Step 3: Server verifies and grants access
                          </span>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/20 rounded p-3 text-xs font-mono">
                          Server → Client: "Access granted! Session token: xyz123"
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Warning */}
                  {clientOnlyAuthDemoAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-900">
                      <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-4 border-2 border-red-500 dark:border-red-700">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                          <p className="text-xs font-semibold text-red-900 dark:text-red-100">
                            Critical Problem:
                          </p>
                        </div>
                        <p className="text-xs text-red-800 dark:text-red-200">
                          The client <strong>never verified</strong> the server's identity! What if this is a fake server 
                          set up by an attacker? The client would happily send their credentials to the attacker.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  onClick={onClientOnlyAuthDemoTrigger}
                  variant="outline"
                  className="w-full mt-6 border-orange-300 hover:bg-orange-50 dark:border-orange-700 dark:hover:bg-orange-900/20"
                >
                  {clientOnlyAuthDemoAnimated ? 'Reset' : 'Show Client-Only Authentication Flow'}
                </Button>
              </div>

              {/* Key Points */}
              <div className="bg-orange-50 dark:bg-orange-900/20 rounded p-4 border border-orange-200 dark:border-orange-800">
                <p className="text-xs font-semibold text-orange-900 dark:text-orange-100 mb-2">
                  Problems with Client-Only Auth:
                </p>
                <ul className="space-y-1 text-xs text-orange-800 dark:text-orange-200">
                  <li>• <strong>Phishing risk:</strong> Users might connect to fake login pages</li>
                  <li>• <strong>MITM attacks:</strong> Attacker intercepts and impersonates server</li>
                  <li>• <strong>Credential theft:</strong> User sends password to fake server</li>
                  <li>• <strong>No verification:</strong> Client trusts whoever responds</li>
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
                Mutual Authentication Flow
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                With mutual authentication, <strong>both parties</strong> prove their identities to each other before exchanging sensitive data.
              </p>

              {/* Mutual Auth Flow */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg p-6 border border-green-200 dark:border-green-700 mb-6">
                <div className="space-y-4">
                  {/* Step 1: Handshake */}
                  {mutualAuthDemoAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border-l-4 border-blue-500">
                        <div className="flex items-center gap-3 mb-2">
                          <User className="w-5 h-5 text-blue-600" />
                          <span className="text-xs font-semibold text-slate-900 dark:text-white">
                            Step 1: Client initiates connection
                          </span>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-3 text-xs font-mono">
                          Client → Server: "Hello, I want secure connection"
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Server Proves Identity */}
                  {mutualAuthDemoAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-300">
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border-l-4 border-indigo-500">
                        <div className="flex items-center gap-3 mb-2">
                          <Server className="w-5 h-5 text-indigo-600" />
                          <span className="text-xs font-semibold text-slate-900 dark:text-white">
                            Step 2: Server sends certificate (proves identity)
                          </span>
                        </div>
                        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded p-3 text-xs font-mono space-y-1">
                          <div>Server → Client: server_certificate</div>
                          <div className="text-indigo-700 dark:text-indigo-300">Certificate contains: server public key, signature from CA</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Client Verifies Server */}
                  {mutualAuthDemoAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-600">
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border-l-4 border-violet-500">
                        <div className="flex items-center gap-3 mb-2">
                          <CheckCircle2 className="w-5 h-5 text-violet-600" />
                          <span className="text-xs font-semibold text-slate-900 dark:text-white">
                            Step 3: Client verifies server certificate
                          </span>
                        </div>
                        <div className="bg-violet-50 dark:bg-violet-900/20 rounded p-3 text-xs font-mono space-y-1">
                          <div>Client: Verify signature with CA public key ✓</div>
                          <div>Client: Check certificate not expired ✓</div>
                          <div>Client: Check domain matches ✓</div>
                          <div className="text-green-600 font-semibold">→ Server identity VERIFIED</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Client Sends Certificate */}
                  {mutualAuthDemoAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-900">
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border-l-4 border-sky-500">
                        <div className="flex items-center gap-3 mb-2">
                          <Key className="w-5 h-5 text-sky-600" />
                          <span className="text-xs font-semibold text-slate-900 dark:text-white">
                            Step 4: Client sends certificate (proves identity)
                          </span>
                        </div>
                        <div className="bg-sky-50 dark:bg-sky-900/20 rounded p-3 text-xs font-mono space-y-1">
                          <div>Client → Server: client_certificate</div>
                          <div className="text-sky-700 dark:text-sky-300">Certificate contains: client public key, signature from CA</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 5: Server Verifies Client */}
                  {mutualAuthDemoAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500" style={{ animationDelay: '1200ms' }}>
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border-l-4 border-green-500">
                        <div className="flex items-center gap-3 mb-2">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          <span className="text-xs font-semibold text-slate-900 dark:text-white">
                            Step 5: Server verifies client certificate
                          </span>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/20 rounded p-3 text-xs font-mono space-y-1">
                          <div>Server: Verify signature with CA public key ✓</div>
                          <div>Server: Check certificate not expired ✓</div>
                          <div>Server: Check certificate in allowed list ✓</div>
                          <div className="text-green-600 font-semibold">→ Client identity VERIFIED</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 6: Secure Communication */}
                  {mutualAuthDemoAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500" style={{ animationDelay: '1500ms' }}>
                      <div className="bg-gradient-to-r from-green-200 to-emerald-200 dark:from-green-900/50 dark:to-emerald-900/50 rounded-lg p-4 border-2 border-green-500 dark:border-green-600">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="w-5 h-5 text-green-700 dark:text-green-300" />
                          <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                            ✓ Mutual Trust Established!
                          </p>
                        </div>
                        <div className="space-y-1 text-xs text-green-800 dark:text-green-200">
                          <p>✓ Client verified server is authentic</p>
                          <p>✓ Server verified client is authorized</p>
                          <p>✓ Both parties can now exchange data securely</p>
                          <p className="font-semibold bg-green-300 dark:bg-green-900/70 rounded p-2 text-center text-green-900 dark:text-green-100 mt-2">
                            No MITM attacks possible! 🛡️
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  onClick={onMutualAuthDemoTrigger}
                  variant="outline"
                  className="w-full mt-6 border-green-300 hover:bg-green-50 dark:border-green-700 dark:hover:bg-green-900/20"
                >
                  {mutualAuthDemoAnimated ? 'Reset' : 'Show Mutual Authentication Flow'}
                </Button>
              </div>

              {/* Key Benefits */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded p-4 border border-green-200 dark:border-green-800">
                <p className="text-xs font-semibold text-green-900 dark:text-green-100 mb-2">
                  Benefits of Mutual Authentication:
                </p>
                <ul className="space-y-1 text-xs text-green-800 dark:text-green-200">
                  <li>• <strong>MITM prevention:</strong> Fake servers cannot impersonate the real server</li>
                  <li>• <strong>Phishing protection:</strong> Clients verify server before sending credentials</li>
                  <li>• <strong>Two-way trust:</strong> Both parties confident in each other's identity</li>
                  <li>• <strong>Enterprise security:</strong> Ensures only authorized clients connect</li>
                </ul>
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

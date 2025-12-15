import { useState } from 'react';
import { Skull, Shield, CheckCircle2, XCircle, AlertTriangle, Clock, Database, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NonceAuthLevel2Props {
  currentStep: number; // 0-3
  onNext: () => void;
  onPrevious: () => void;
  onReplayAttackTrigger: () => void;
  replayAttackAnimated: boolean;
  onNonceDefenseTrigger: () => void;
  nonceDefenseAnimated: boolean;
  onFreshnessDemoTrigger: () => void;
  freshnessDemoAnimated: boolean;
  quizAnswers: Record<number, string>;
  onQuizAnswer: (questionId: number, answer: string) => void;
}

export function NonceAuthLevel2({
  currentStep,
  onNext,
  onPrevious,
  onReplayAttackTrigger,
  replayAttackAnimated,
  onNonceDefenseTrigger,
  nonceDefenseAnimated,
  onFreshnessDemoTrigger,
  freshnessDemoAnimated,
  quizAnswers,
  onQuizAnswer,
}: NonceAuthLevel2Props) {
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Skull size={18} className="text-red-500" />
                Interactive: Replay Attack Without Nonce
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                Let's see how a replay attack works when authentication doesn't use nonces. <strong>Click the button below</strong> to trigger the attacker's replay attempt!
              </p>

              {/* Attack Scenario */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 rounded-lg p-6 border-2 border-red-300 dark:border-red-700 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                    <Skull className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-red-900 dark:text-red-100">Mallory (Attacker)</p>
                    <p className="text-xs text-red-700 dark:text-red-300">Attempting replay attack</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Original Transaction */}
                  {replayAttackAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                        <p className="text-xs font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                          <Clock size={14} />
                          Day 1, 10:00 AM - Original Transaction
                        </p>
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-3 space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600 dark:text-slate-400">From:</span>
                            <span className="font-mono text-blue-900 dark:text-blue-100">Alice</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600 dark:text-slate-400">Message:</span>
                            <span className="font-mono text-blue-900 dark:text-blue-100">"Transfer $100 to Bob"</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600 dark:text-slate-400">Auth:</span>
                            <span className="font-mono text-blue-900 dark:text-blue-100">HMAC(key, msg) = 0x7A3F...</span>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center gap-2 text-xs text-green-600 dark:text-green-400">
                          <CheckCircle2 size={14} />
                          <span>✓ Server accepts - Transaction complete</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Attacker Captures */}
                  {replayAttackAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-300">
                      <div className="bg-orange-100 dark:bg-orange-900/30 rounded-lg p-4 border border-orange-300 dark:border-orange-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Skull className="w-5 h-5 text-orange-600" />
                          <p className="text-xs font-semibold text-orange-900 dark:text-orange-100">
                            Mallory intercepts network traffic
                          </p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 rounded p-3 text-xs font-mono text-orange-900 dark:text-orange-100">
                          Captured: ("Transfer $100 to Bob", 0x7A3F...)
                        </div>
                        <p className="mt-2 text-xs text-orange-800 dark:text-orange-200 italic">
                          "Perfect! I'll save this for later..."
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Replay Attempt */}
                  {replayAttackAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-600">
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-red-300 dark:border-red-700">
                        <p className="text-xs font-semibold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                          <Clock size={14} />
                          Day 2, 3:00 PM - Replay Attack
                        </p>
                        <div className="bg-red-50 dark:bg-red-900/20 rounded p-3 space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600 dark:text-slate-400">From:</span>
                            <span className="font-mono text-red-900 dark:text-red-100">Mallory (pretending to be Alice)</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600 dark:text-slate-400">Message:</span>
                            <span className="font-mono text-red-900 dark:text-red-100">"Transfer $100 to Bob"</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600 dark:text-slate-400">Auth:</span>
                            <span className="font-mono text-red-900 dark:text-red-100">HMAC = 0x7A3F... (REPLAYED!)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Attack Success */}
                  {replayAttackAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-900">
                      <div className="bg-gradient-to-r from-red-200 to-orange-200 dark:from-red-900/50 dark:to-orange-900/50 rounded-lg p-4 border-2 border-red-500 dark:border-red-600">
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-5 h-5 text-red-700 dark:text-red-300" />
                          <p className="text-sm font-semibold text-red-900 dark:text-red-100">
                            🚨 Attack Succeeds!
                          </p>
                        </div>
                        <div className="space-y-2 text-xs text-red-800 dark:text-red-200">
                          <p className="flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-red-600" />
                            Server validates the signature (it's correct!)
                          </p>
                          <p className="flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-red-600" />
                            Server has NO way to detect it's a replay
                          </p>
                          <p className="flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-red-600" />
                            Another $100 transferred to Bob!
                          </p>
                          <p className="font-semibold bg-red-300 dark:bg-red-900/70 rounded p-2 text-center text-red-900 dark:text-red-100 mt-3">
                            Mallory just stole $100 without knowing Alice's key!
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  onClick={onReplayAttackTrigger}
                  variant="outline"
                  className="w-full mt-6 border-red-300 hover:bg-red-50 dark:border-red-700 dark:hover:bg-red-900/20"
                >
                  {replayAttackAnimated ? 'Reset' : 'Start Replay Attack 🎯'}
                </Button>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 rounded p-4 border border-red-200 dark:border-red-800">
                <p className="text-xs font-semibold text-red-900 dark:text-red-100 mb-2">
                  Why This Attack Works:
                </p>
                <ul className="space-y-2 text-xs text-red-800 dark:text-red-200">
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>The authentication message is <strong>valid</strong> - signature checks out</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Server has <strong>no context</strong> about when the message was created</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Nothing ties the auth to a <strong>specific session or time</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>•</span>
                    <span>Attacker doesn't need to break encryption or forge signatures</span>
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
                <Shield size={18} className="text-green-500" />
                How Nonces Prevent Replay Attacks
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                Now let's see the same scenario <strong>with nonces</strong>. Watch how the server detects and rejects the replay attempt!
              </p>

              {/* Secure Scenario */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg p-6 border-2 border-green-300 dark:border-green-700 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-900 dark:text-green-100">Secure Authentication with Nonce</p>
                    <p className="text-xs text-green-700 dark:text-green-300">Replay attack defense active</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Original Transaction with Nonce */}
                  {nonceDefenseAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                        <p className="text-xs font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                          <Clock size={14} />
                          Day 1, 10:00 AM - Original Transaction
                        </p>
                        
                        <div className="space-y-3">
                          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded p-3">
                            <p className="text-xs text-indigo-700 dark:text-indigo-300 mb-1">1. Server generates nonce:</p>
                            <p className="text-xs font-mono text-indigo-900 dark:text-indigo-100">
                              nonce₁ = "n_a7f3c2d9"
                            </p>
                          </div>

                          <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-3">
                            <p className="text-xs text-blue-700 dark:text-blue-300 mb-1">2. Alice signs message + nonce:</p>
                            <p className="text-xs font-mono text-blue-900 dark:text-blue-100">
                              sig₁ = HMAC(key, "Transfer $100" || nonce₁)
                            </p>
                          </div>

                          <div className="bg-green-50 dark:bg-green-900/20 rounded p-3">
                            <p className="text-xs text-green-700 dark:text-green-300 mb-1">3. Server verifies and marks nonce as used:</p>
                            <div className="flex items-center justify-between text-xs">
                              <span className="font-mono text-green-900 dark:text-green-100">used_nonces: ["n_a7f3c2d9"]</span>
                              <CheckCircle2 size={14} className="text-green-600" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Attacker Captures */}
                  {nonceDefenseAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-300">
                      <div className="bg-orange-100 dark:bg-orange-900/30 rounded-lg p-4 border border-orange-300 dark:border-orange-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Skull className="w-5 h-5 text-orange-600" />
                          <p className="text-xs font-semibold text-orange-900 dark:text-orange-100">
                            Mallory intercepts
                          </p>
                        </div>
                        <div className="bg-white dark:bg-slate-800 rounded p-3 text-xs font-mono">
                          <div className="text-orange-900 dark:text-orange-100">
                            Captured: ("Transfer $100", nonce₁, sig₁)
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Replay Attempt FAILS */}
                  {nonceDefenseAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-600">
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-red-300 dark:border-red-700">
                        <p className="text-xs font-semibold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                          <Clock size={14} />
                          Day 2, 3:00 PM - Replay Attempt
                        </p>
                        
                        <div className="space-y-3">
                          <div className="bg-red-50 dark:bg-red-900/20 rounded p-3">
                            <p className="text-xs text-red-700 dark:text-red-300 mb-1">Mallory sends captured data:</p>
                            <p className="text-xs font-mono text-red-900 dark:text-red-100">
                              ("Transfer $100", nonce₁, sig₁) ← OLD NONCE!
                            </p>
                          </div>

                          <div className="bg-slate-100 dark:bg-slate-900 rounded p-3">
                            <p className="text-xs text-slate-700 dark:text-slate-300 mb-2">Server checks:</p>
                            <div className="space-y-1 text-xs font-mono">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 size={12} className="text-green-500" />
                                <span className="text-slate-900 dark:text-white">Signature valid? ✓ Yes</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <XCircle size={12} className="text-red-500" />
                                <span className="text-slate-900 dark:text-white">Nonce already used? ✓ Yes (in used_nonces)</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Attack BLOCKED */}
                  {nonceDefenseAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-900">
                      <div className="bg-gradient-to-r from-green-200 to-emerald-200 dark:from-green-900/50 dark:to-emerald-900/50 rounded-lg p-4 border-2 border-green-500 dark:border-green-600">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="w-5 h-5 text-green-700 dark:text-green-300" />
                          <p className="text-sm font-semibold text-green-900 dark:text-green-100">
                            ✅ Attack BLOCKED!
                          </p>
                        </div>
                        <div className="space-y-2 text-xs text-green-800 dark:text-green-200">
                          <p className="flex items-center gap-2">
                            <XCircle size={14} className="text-green-600" />
                            Server rejects: "Nonce already used - possible replay attack"
                          </p>
                          <p className="flex items-center gap-2">
                            <Shield size={14} className="text-green-600" />
                            Transaction blocked - no money transferred
                          </p>
                          <p className="flex items-center gap-2">
                            <AlertTriangle size={14} className="text-green-600" />
                            Security team alerted about replay attempt
                          </p>
                          <p className="font-semibold bg-green-300 dark:bg-green-900/70 rounded p-2 text-center text-green-900 dark:text-green-100 mt-3">
                            Mallory's attack completely neutralized! 🛡️
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  onClick={onNonceDefenseTrigger}
                  variant="outline"
                  className="w-full mt-6 border-green-300 hover:bg-green-50 dark:border-green-700 dark:hover:bg-green-900/20"
                >
                  {nonceDefenseAnimated ? 'Reset' : 'Start Nonce Defense 🛡️'}
                </Button>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded p-4 border border-green-200 dark:border-green-800">
                <p className="text-xs font-semibold text-green-900 dark:text-green-100 mb-2">
                  How the Defense Works:
                </p>
                <ul className="space-y-2 text-xs text-green-800 dark:text-green-200">
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span><strong>Server generates unique nonce</strong> for each authentication</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span><strong>Nonce included in signature</strong> - binds response to challenge</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span><strong>Server tracks used nonces</strong> in database or memory</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span><strong>Replay detected instantly</strong> when duplicate nonce appears</span>
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
                <Clock size={18} className="text-sky-500" />
                Understanding Freshness
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                <strong>Freshness</strong> means proving that a message was created recently, not hours or days ago. Nonces provide freshness guarantees.
              </p>

              {/* Freshness Concept */}
              <div className="bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-950 dark:to-blue-950 rounded-lg p-6 border border-sky-200 dark:border-sky-700 mb-6">
                <p className="text-xs font-semibold text-sky-900 dark:text-sky-100 mb-4">
                  Freshness Demonstration:
                </p>

                <div className="space-y-4">
                  {/* Time T1 */}
                  {freshnessDemoAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border-l-4 border-green-500">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                            <Clock size={14} className="text-green-500" />
                            Time T₁ (Now)
                          </p>
                          <span className="text-xs text-green-600 dark:text-green-400 font-semibold">FRESH</span>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/20 rounded p-3 text-xs">
                          <p className="text-green-700 dark:text-green-300 mb-2">
                            Server: "Please authenticate with nonce_123"
                          </p>
                          <p className="text-green-700 dark:text-green-300">
                            Client: "Here's my signature of nonce_123"
                          </p>
                          <div className="mt-2 flex items-center gap-2 text-green-900 dark:text-green-100 font-semibold">
                            <CheckCircle2 size={14} />
                            <span>Server accepts - this response is FRESH</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Time T2 */}
                  {freshnessDemoAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-300">
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border-l-4 border-yellow-500">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                            <Clock size={14} className="text-yellow-500" />
                            Time T₂ (5 minutes later)
                          </p>
                          <span className="text-xs text-yellow-600 dark:text-yellow-400 font-semibold">STALE</span>
                        </div>
                        <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded p-3 text-xs">
                          <p className="text-yellow-700 dark:text-yellow-300 mb-2">
                            Attacker: "Here's signature of nonce_123" (replayed)
                          </p>
                          <div className="mt-2 flex items-center gap-2 text-yellow-900 dark:text-yellow-100 font-semibold">
                            <AlertTriangle size={14} />
                            <span>Server: "nonce_123 already used - this is STALE"</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Time T3 */}
                  {freshnessDemoAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-600">
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border-l-4 border-green-500">
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-xs font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                            <Clock size={14} className="text-green-500" />
                            Time T₃ (Now, new session)
                          </p>
                          <span className="text-xs text-green-600 dark:text-green-400 font-semibold">FRESH</span>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/20 rounded p-3 text-xs">
                          <p className="text-green-700 dark:text-green-300 mb-2">
                            Server: "Please authenticate with nonce_789" (NEW)
                          </p>
                          <p className="text-green-700 dark:text-green-300">
                            Client: "Here's my signature of nonce_789"
                          </p>
                          <div className="mt-2 flex items-center gap-2 text-green-900 dark:text-green-100 font-semibold">
                            <CheckCircle2 size={14} />
                            <span>Server accepts - new nonce = FRESH again</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  onClick={onFreshnessDemoTrigger}
                  variant="outline"
                  className="w-full mt-6"
                >
                  {freshnessDemoAnimated ? 'Reset' : 'Start Freshness Timeline'}
                </Button>
              </div>

              {/* Nonce Storage Strategy */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 mb-3">
                    <Database className="w-5 h-5 text-indigo-500" />
                    <h5 className="font-semibold text-sm text-slate-900 dark:text-white">
                      Nonce Storage
                    </h5>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span><strong>In-memory cache:</strong> Fast lookup for recent nonces</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span><strong>Database:</strong> Persistent storage for long-term tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span><strong>Time window:</strong> Expire old nonces after timeout</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2 mb-3">
                    <Zap className="w-5 h-5 text-violet-500" />
                    <h5 className="font-semibold text-sm text-slate-900 dark:text-white">
                      Nonce Generation
                    </h5>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span><strong>Random:</strong> Cryptographically secure random bytes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span><strong>Counter:</strong> Incrementing sequence number</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span><strong>Timestamp + Random:</strong> Hybrid approach</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-sky-50 dark:bg-sky-900/20 rounded p-4 border border-sky-200 dark:border-sky-800">
                <p className="text-xs font-semibold text-sky-900 dark:text-sky-100 mb-2">
                  Key Freshness Principles:
                </p>
                <ul className="space-y-2 text-xs text-sky-800 dark:text-sky-200">
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span><strong>Temporal binding:</strong> Nonce ties response to specific time/session</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span><strong>One-time use:</strong> Each nonce valid for exactly one authentication</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span><strong>Challenge-specific:</strong> Response only valid for the nonce it signs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>✓</span>
                    <span><strong>Expiration:</strong> Old nonces can be garbage collected after timeout</span>
                  </li>
                </ul>
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
                Knowledge Check: Nonce Authentication Quiz
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                Test your understanding of nonce-based authentication!
              </p>

              {/* Quiz Questions */}
              <div className="space-y-6">
                {/* Question 1 */}
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                    1. What is the main purpose of using a nonce in authentication?
                  </p>
                  <div className="space-y-2">
                    {[
                      { id: 'q1a', text: 'To encrypt the password' },
                      { id: 'q1b', text: 'To prove message freshness and prevent replay attacks' },
                      { id: 'q1c', text: 'To compress the authentication data' },
                      { id: 'q1d', text: 'To speed up the authentication process' },
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
                      Nonces ensure each authentication is unique and recent, preventing attackers from replaying old messages.
                    </p>
                  )}
                </div>

                {/* Question 2 */}
                <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                    2. How does a server detect a replay attack when using nonces?
                  </p>
                  <div className="space-y-2">
                    {[
                      { id: 'q2a', text: 'By checking if the signature is valid' },
                      { id: 'q2b', text: 'By tracking used nonces and rejecting duplicates' },
                      { id: 'q2c', text: 'By comparing timestamps in the message' },
                      { id: 'q2d', text: 'By analyzing network traffic patterns' },
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
                      The server maintains a list of used nonces and rejects any authentication attempt using a nonce that has already been seen.
                    </p>
                  )}
                </div>
              </div>

              {/* Score Display */}
              {Object.keys(quizAnswers).length === 2 && (
                <div className="mt-6 bg-gradient-to-r from-indigo-50 to-sky-50 dark:from-indigo-950 dark:to-sky-950 rounded-lg p-4 border border-indigo-200 dark:border-indigo-800">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                    Your Score: {
                      [quizAnswers[1] === 'q1b', quizAnswers[2] === 'q2b']
                        .filter(Boolean).length
                    } / 2
                  </p>
                  <p className="text-xs text-slate-700 dark:text-slate-300">
                    {[quizAnswers[1] === 'q1b', quizAnswers[2] === 'q2b']
                      .filter(Boolean).length === 2
                      ? '🎉 Perfect! You understand nonce authentication!'
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

import { Skull, Shield, CheckCircle2, XCircle, AlertTriangle, Clock, Hash, ListOrdered, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FreshnessMechanismsLevel2Props {
  currentStep: number; // 0-3
  onNext: () => void;
  onPrevious: () => void;
  onTimestampReplayAttackTrigger: () => void;
  timestampReplayAttackAnimated: boolean;
  onNonceReplayAttackTrigger: () => void;
  nonceReplayAttackAnimated: boolean;
  onSequenceReplayAttackTrigger: () => void;
  sequenceReplayAttackAnimated: boolean;
  onComparisonViewTrigger: () => void;
  comparisonViewAnimated: boolean;
  quizAnswers: Record<number, string>;
  onQuizAnswer: (questionId: number, answer: string) => void;
}

export function FreshnessMechanismsLevel2({
  currentStep,
  onNext,
  onPrevious,
  onTimestampReplayAttackTrigger,
  timestampReplayAttackAnimated,
  onNonceReplayAttackTrigger,
  nonceReplayAttackAnimated,
  onSequenceReplayAttackTrigger,
  sequenceReplayAttackAnimated,
  onComparisonViewTrigger,
  comparisonViewAnimated,
  quizAnswers,
  onQuizAnswer,
}: FreshnessMechanismsLevel2Props) {
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Skull size={18} className="text-red-500" />
                Replay Attack: Timestamp Vulnerability
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                Timestamps have a <strong>replay window</strong> during which an attacker can replay captured messages. Let's see this in action!
              </p>

              {/* Timestamp Replay Attack */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950 dark:to-orange-950 rounded-lg p-6 border-2 border-red-300 dark:border-red-700 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Clock className="w-6 h-6 text-red-600" />
                  <p className="font-semibold text-red-900 dark:text-red-100">Timestamp Window Attack</p>
                </div>

                <div className="space-y-4">
                  {/* Original Message */}
                  <div className={`transition-all duration-500 ${timestampReplayAttackAnimated ? 'opacity-100' : 'opacity-50'}`}>
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white mb-2">
                        T = 0s - Alice sends legitimate message
                      </p>
                      <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-3 text-xs font-mono">
                        <div>timestamp: 10:00:00</div>
                        <div>msg: "Transfer $100 to Alice"</div>
                        <div className="text-green-600">✓ Server accepts (within 30s window)</div>
                      </div>
                    </div>
                  </div>

                  {/* Attacker Captures */}
                  <div className={`transition-all duration-500 ${timestampReplayAttackAnimated ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`} style={{ transitionDelay: '300ms' }}>
                    <div className="bg-orange-100 dark:bg-orange-900/30 rounded-lg p-4 border border-orange-300 dark:border-orange-700">
                      <div className="flex items-center gap-2 mb-2">
                        <Skull className="w-5 h-5 text-orange-600" />
                        <p className="text-xs font-semibold text-orange-900 dark:text-orange-100">
                          Attacker intercepts message
                        </p>
                      </div>
                      <div className="text-xs font-mono text-orange-800 dark:text-orange-200">
                        Captured: (timestamp=10:00:00, msg, signature)
                      </div>
                    </div>
                  </div>

                  {/* Success - Within Window */}
                  <div className={`transition-all duration-500 ${timestampReplayAttackAnimated ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`} style={{ transitionDelay: '600ms' }}>
                    <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-4 border-2 border-red-500 dark:border-red-700">
                      <p className="text-xs font-semibold text-red-900 dark:text-red-100 mb-2">
                        T = 10s - Attacker replays message (WITHIN 30s window)
                      </p>
                      <div className="bg-white dark:bg-slate-800 rounded p-3 text-xs font-mono space-y-1">
                        <div className="text-red-700 dark:text-red-300">timestamp: 10:00:00 (same)</div>
                        <div className="text-red-700 dark:text-red-300">msg: "Transfer $100 to Alice"</div>
                        <div className="text-red-700 dark:text-red-300">Server time: 10:00:10</div>
                        <div className="text-red-700 dark:text-red-300">Time diff: 10s &lt; 30s window</div>
                        <div className="flex items-center gap-2 text-red-900 dark:text-red-100 font-semibold mt-2 pt-2 border-t border-red-200 dark:border-red-800">
                          <AlertTriangle size={14} />
                          <span>✓ Server ACCEPTS - Attack SUCCEEDS! 🚨</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Failure - Outside Window */}
                  <div className={`transition-all duration-500 ${timestampReplayAttackAnimated ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`} style={{ transitionDelay: '900ms' }}>
                    <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-4 border border-green-500 dark:border-green-700">
                      <p className="text-xs font-semibold text-green-900 dark:text-green-100 mb-2">
                        T = 60s - Attacker replays again (OUTSIDE 30s window)
                      </p>
                      <div className="bg-white dark:bg-slate-800 rounded p-3 text-xs font-mono space-y-1">
                        <div className="text-slate-700 dark:text-slate-300">timestamp: 10:00:00 (same)</div>
                        <div className="text-slate-700 dark:text-slate-300">Server time: 10:01:00</div>
                        <div className="text-slate-700 dark:text-slate-300">Time diff: 60s &gt; 30s window</div>
                        <div className="flex items-center gap-2 text-green-900 dark:text-green-100 font-semibold mt-2 pt-2 border-t border-green-200 dark:border-green-800">
                          <Shield size={14} />
                          <span>✗ Server REJECTS - Timestamp too old</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={onTimestampReplayAttackTrigger}
                  variant="outline"
                  className="w-full mt-6 border-red-300 hover:bg-red-50 dark:border-red-700 dark:hover:bg-red-900/20"
                >
                  {timestampReplayAttackAnimated ? 'Reset' : 'Trigger Timestamp Replay Attack 🎯'}
                </Button>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 rounded p-4 border border-red-200 dark:border-red-800">
                <p className="text-xs font-semibold text-red-900 dark:text-red-100 mb-2">
                  Critical Problem:
                </p>
                <p className="text-xs text-red-800 dark:text-red-200">
                  Timestamps create a <strong>replay window</strong> during which the same message can be replayed successfully. 
                  The attacker has up to 30 seconds to exploit captured messages!
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
                <Shield size={18} className="text-green-500" />
                Replay Attack: Nonce Defense
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                Nonces provide <strong>perfect replay protection</strong> by ensuring each challenge is used exactly once.
              </p>

              {/* Nonce Replay Attack */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg p-6 border-2 border-green-300 dark:border-green-700 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Hash className="w-6 h-6 text-green-600" />
                  <p className="font-semibold text-green-900 dark:text-green-100">Nonce-Based Protection</p>
                </div>

                <div className="space-y-4">
                  {/* Original Exchange */}
                  <div className={`transition-all duration-500 ${nonceReplayAttackAnimated ? 'opacity-100' : 'opacity-50'}`}>
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white mb-2">
                        Original Authentication
                      </p>
                      <div className="bg-green-50 dark:bg-green-900/20 rounded p-3 text-xs font-mono space-y-1">
                        <div className="text-indigo-700 dark:text-indigo-300">Server → nonce: "xyz789"</div>
                        <div className="text-blue-700 dark:text-blue-300">Client → HMAC(key, msg || "xyz789")</div>
                        <div className="text-green-700 dark:text-green-300">✓ Server accepts, marks "xyz789" as USED</div>
                      </div>
                    </div>
                  </div>

                  {/* Attacker Captures */}
                  <div className={`transition-all duration-500 ${nonceReplayAttackAnimated ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`} style={{ transitionDelay: '300ms' }}>
                    <div className="bg-orange-100 dark:bg-orange-900/30 rounded-lg p-4 border border-orange-300 dark:border-orange-700">
                      <div className="flex items-center gap-2 mb-2">
                        <Skull className="w-5 h-5 text-orange-600" />
                        <p className="text-xs font-semibold text-orange-900 dark:text-orange-100">
                          Attacker intercepts
                        </p>
                      </div>
                      <div className="text-xs font-mono text-orange-800 dark:text-orange-200">
                        Captured: (msg, nonce="xyz789", signature)
                      </div>
                    </div>
                  </div>

                  {/* First Replay - Instant */}
                  <div className={`transition-all duration-500 ${nonceReplayAttackAnimated ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`} style={{ transitionDelay: '600ms' }}>
                    <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-4 border-2 border-red-500 dark:border-red-700">
                      <p className="text-xs font-semibold text-red-900 dark:text-red-100 mb-2">
                        Replay Attempt #1 (0.5 seconds later - INSTANT!)
                      </p>
                      <div className="bg-white dark:bg-slate-800 rounded p-3 text-xs font-mono space-y-1">
                        <div className="text-red-700 dark:text-red-300">Attacker sends: (msg, nonce="xyz789", sig)</div>
                        <div className="text-slate-700 dark:text-slate-300">Server checks: Is "xyz789" in used_nonces?</div>
                        <div className="text-slate-700 dark:text-slate-300">used_nonces = ["xyz789"] ← Found!</div>
                        <div className="flex items-center gap-2 text-red-900 dark:text-red-100 font-semibold mt-2 pt-2 border-t border-red-200 dark:border-red-800">
                          <XCircle size={14} />
                          <span>✗ REJECTED - Nonce already used!</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Second Replay - Later */}
                  <div className={`transition-all duration-500 ${nonceReplayAttackAnimated ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`} style={{ transitionDelay: '900ms' }}>
                    <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-4 border-2 border-red-500 dark:border-red-700">
                      <p className="text-xs font-semibold text-red-900 dark:text-red-100 mb-2">
                        Replay Attempt #2 (5 days later - STILL FAILS!)
                      </p>
                      <div className="bg-white dark:bg-slate-800 rounded p-3 text-xs font-mono space-y-1">
                        <div className="text-red-700 dark:text-red-300">Attacker sends same: (msg, nonce="xyz789", sig)</div>
                        <div className="text-slate-700 dark:text-slate-300">Server checks: Is "xyz789" in used_nonces?</div>
                        <div className="text-slate-700 dark:text-slate-300">used_nonces = [..., "xyz789", ...] ← Still there!</div>
                        <div className="flex items-center gap-2 text-red-900 dark:text-red-100 font-semibold mt-2 pt-2 border-t border-red-200 dark:border-red-800">
                          <XCircle size={14} />
                          <span>✗ REJECTED - No time window bypass!</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={onNonceReplayAttackTrigger}
                  variant="outline"
                  className="w-full mt-6 border-green-300 hover:bg-green-50 dark:border-green-700 dark:hover:bg-green-900/20"
                >
                  {nonceReplayAttackAnimated ? 'Reset' : 'Show Nonce Replay Defense 🛡️'}
                </Button>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded p-4 border border-green-200 dark:border-green-800">
                <p className="text-xs font-semibold text-green-900 dark:text-green-100 mb-2">
                  Perfect Protection:
                </p>
                <p className="text-xs text-green-800 dark:text-green-200">
                  Nonces provide <strong>immediate</strong> replay detection with <strong>no time window</strong>. 
                  Even instant replays (0.5s) are detected and blocked. The trade-off is server must maintain the used nonce database.
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
                <AlertTriangle size={18} className="text-violet-500" />
                Replay Attack: Sequence Number Fragility
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                Sequence numbers are <strong>efficient but fragile</strong>. A single dropped message or out-of-order delivery breaks the entire protocol.
              </p>

              {/* Sequence Replay Attack */}
              <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950 dark:to-purple-950 rounded-lg p-6 border-2 border-violet-300 dark:border-violet-700 mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <ListOrdered className="w-6 h-6 text-violet-600" />
                  <p className="font-semibold text-violet-900 dark:text-violet-100">Sequence Number Vulnerabilities</p>
                </div>

                <div className="space-y-4">
                  {/* Normal Flow */}
                  <div className={`transition-all duration-500 ${sequenceReplayAttackAnimated ? 'opacity-100' : 'opacity-50'}`}>
                    <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white mb-2">
                        Normal Operation
                      </p>
                      <div className="bg-green-50 dark:bg-green-900/20 rounded p-3 text-xs font-mono space-y-1">
                        <div className="text-blue-700 dark:text-blue-300">Client sends: seq=1 → ✓ Accepted (expect 2)</div>
                        <div className="text-blue-700 dark:text-blue-300">Client sends: seq=2 → ✓ Accepted (expect 3)</div>
                        <div className="text-blue-700 dark:text-blue-300">Client sends: seq=3 → ✓ Accepted (expect 4)</div>
                      </div>
                    </div>
                  </div>

                  {/* Replay Blocked */}
                  <div className={`transition-all duration-500 ${sequenceReplayAttackAnimated ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`} style={{ transitionDelay: '300ms' }}>
                    <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-4 border border-green-500 dark:border-green-700">
                      <p className="text-xs font-semibold text-green-900 dark:text-green-100 mb-2">
                        ✓ Replay Attack Blocked
                      </p>
                      <div className="bg-white dark:bg-slate-800 rounded p-3 text-xs font-mono space-y-1">
                        <div className="text-red-700 dark:text-red-300">Attacker replays: seq=2 (old message)</div>
                        <div className="text-slate-700 dark:text-slate-300">Server expects: seq=4</div>
                        <div className="text-slate-700 dark:text-slate-300">2 &lt; 4 → Old sequence number</div>
                        <div className="flex items-center gap-2 text-green-900 dark:text-green-100 font-semibold mt-2">
                          <Shield size={14} />
                          <span>✗ REJECTED - Sequence too old</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desync Problem */}
                  <div className={`transition-all duration-500 ${sequenceReplayAttackAnimated ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`} style={{ transitionDelay: '600ms' }}>
                    <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-4 border-2 border-red-500 dark:border-red-700">
                      <p className="text-xs font-semibold text-red-900 dark:text-red-100 mb-2">
                        🚨 Critical Flaw: Message Loss
                      </p>
                      <div className="bg-white dark:bg-slate-800 rounded p-3 text-xs font-mono space-y-1">
                        <div className="text-blue-700 dark:text-blue-300">Client sends: seq=4</div>
                        <div className="text-red-700 dark:text-red-300">❌ Network drops packet (never arrives)</div>
                        <div className="text-blue-700 dark:text-blue-300 mt-2">Client sends: seq=5</div>
                        <div className="text-slate-700 dark:text-slate-300">Server expects: seq=4 (still!)</div>
                        <div className="text-slate-700 dark:text-slate-300">Got: seq=5, Expected: 4</div>
                        <div className="flex items-center gap-2 text-red-900 dark:text-red-100 font-semibold mt-2 pt-2 border-t border-red-200 dark:border-red-800">
                          <AlertTriangle size={14} />
                          <span>✗ REJECTED - Desynchronized! All future messages fail!</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Out of Order */}
                  <div className={`transition-all duration-500 ${sequenceReplayAttackAnimated ? 'opacity-100 scale-100' : 'opacity-50 scale-95'}`} style={{ transitionDelay: '900ms' }}>
                    <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-4 border-2 border-red-500 dark:border-red-700">
                      <p className="text-xs font-semibold text-red-900 dark:text-red-100 mb-2">
                        🚨 Another Flaw: Out-of-Order Delivery
                      </p>
                      <div className="bg-white dark:bg-slate-800 rounded p-3 text-xs font-mono space-y-1">
                        <div className="text-blue-700 dark:text-blue-300">Client sends: seq=10, then seq=11</div>
                        <div className="text-orange-700 dark:text-orange-300">Network delivers seq=11 first (reordering)</div>
                        <div className="text-slate-700 dark:text-slate-300">Server expects: seq=10</div>
                        <div className="text-slate-700 dark:text-slate-300">Got: seq=11 → 11 &gt; 10 (future sequence)</div>
                        <div className="flex items-center gap-2 text-red-900 dark:text-red-100 font-semibold mt-2 pt-2 border-t border-red-200 dark:border-red-800">
                          <AlertTriangle size={14} />
                          <span>✗ REJECTED - Must process in strict order!</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={onSequenceReplayAttackTrigger}
                  variant="outline"
                  className="w-full mt-6 border-violet-300 hover:bg-violet-50 dark:border-violet-700 dark:hover:bg-violet-900/20"
                >
                  {sequenceReplayAttackAnimated ? 'Reset' : 'Show Sequence Number Problems ⚠️'}
                </Button>
              </div>

              <div className="bg-red-50 dark:bg-red-900/20 rounded p-4 border border-red-200 dark:border-red-800">
                <p className="text-xs font-semibold text-red-900 dark:text-red-100 mb-2">
                  Fatal Weakness:
                </p>
                <p className="text-xs text-red-800 dark:text-red-200">
                  Sequence numbers work great in <strong>perfect network conditions</strong>, but a single packet loss or reordering 
                  <strong> permanently breaks the protocol</strong>. No recovery mechanism exists without manual resynchronization.
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
                <Zap size={18} className="text-indigo-500" />
                Scenario-Based Quiz: Choosing the Right Mechanism
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                Each freshness mechanism has ideal use cases. Can you choose the right one for each scenario?
              </p>

              {/* Question 1 */}
              <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700 mb-6">
                <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                  <strong>Scenario 1:</strong> IoT sensor sends temperature readings every 10 minutes to a cloud server. 
                  Network is unreliable (packets often lost or arrive out of order). Which mechanism is best?
                </p>
                <div className="space-y-2">
                  {[
                    { id: 'q1a', text: 'Timestamp - Sensors can include current time, no server state needed' },
                    { id: 'q1b', text: 'Nonce - Server sends challenge before each reading' },
                    { id: 'q1c', text: 'Sequence Number - Simple counter that increments per reading' },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => onQuizAnswer(1, option.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                        quizAnswers[1] === option.id
                          ? option.id === 'q1a'
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-100'
                            : 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{option.text}</span>
                        {quizAnswers[1] === option.id && (
                          option.id === 'q1a' ? (
                            <CheckCircle2 size={18} className="text-green-600" />
                          ) : (
                            <XCircle size={18} className="text-red-600" />
                          )
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                {quizAnswers[1] && quizAnswers[1] === 'q1a' && (
                  <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded text-xs text-green-800 dark:text-green-200">
                    ✓ Correct! Timestamps are perfect here: no extra round trip needed (nonce would require challenge-response), 
                    resilient to packet loss (sequence numbers would desync), and sensors can use local clocks.
                  </div>
                )}
                {quizAnswers[1] && quizAnswers[1] === 'q1b' && (
                  <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded text-xs text-red-800 dark:text-red-200">
                    ✗ Nonces require extra round trip per reading (expensive for battery-powered IoT). With unreliable network, 
                    challenge might not reach sensor.
                  </div>
                )}
                {quizAnswers[1] && quizAnswers[1] === 'q1c' && (
                  <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded text-xs text-red-800 dark:text-red-200">
                    ✗ Sequence numbers would permanently break after first packet loss. With unreliable network, this fails immediately.
                  </div>
                )}
              </div>

              {/* Question 2 */}
              <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700 mb-6">
                <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                  <strong>Scenario 2:</strong> Banking API processing high-value transactions. Absolute security is critical. 
                  Network is reliable. Which mechanism is best?
                </p>
                <div className="space-y-2">
                  {[
                    { id: 'q2a', text: 'Timestamp - Fast and stateless, good enough for most cases' },
                    { id: 'q2b', text: 'Nonce - Perfect replay protection with zero time window vulnerability' },
                    { id: 'q2c', text: 'Sequence Number - Most efficient, minimal server state' },
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
                {quizAnswers[2] && quizAnswers[2] === 'q2b' && (
                  <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded text-xs text-green-800 dark:text-green-200">
                    ✓ Correct! For high-value banking, nonce provides strongest security. The replay window of timestamps 
                    (even 30 seconds) is unacceptable. Extra round trip is worth it for perfect protection.
                  </div>
                )}
                {quizAnswers[2] && quizAnswers[2] === 'q2a' && (
                  <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded text-xs text-red-800 dark:text-red-200">
                    ✗ Timestamps have a replay window (typically 30s) during which captured transactions can be replayed. 
                    For high-value banking, this is unacceptable risk.
                  </div>
                )}
                {quizAnswers[2] && quizAnswers[2] === 'q2c' && (
                  <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded text-xs text-red-800 dark:text-red-200">
                    ✗ Sequence numbers can desync (though network is reliable, still possible). For banking, the fragility 
                    and lack of recovery is too risky.
                  </div>
                )}
              </div>

              {/* Question 3 */}
              <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 border border-slate-200 dark:border-slate-700 mb-6">
                <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                  <strong>Scenario 3:</strong> Video streaming protocol over reliable TCP connection. Messages must arrive in order. 
                  Efficiency is critical (millions of packets/second). Which mechanism is best?
                </p>
                <div className="space-y-2">
                  {[
                    { id: 'q3a', text: 'Timestamp - Include timestamp in every video frame' },
                    { id: 'q3b', text: 'Nonce - Server generates nonce for each frame' },
                    { id: 'q3c', text: 'Sequence Number - TCP guarantees ordering, minimal overhead' },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => onQuizAnswer(3, option.id)}
                      className={`w-full text-left px-4 py-3 rounded-lg border transition-all ${
                        quizAnswers[3] === option.id
                          ? option.id === 'q3c'
                            ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-900 dark:text-green-100'
                            : 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-900 dark:text-red-100'
                          : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm">{option.text}</span>
                        {quizAnswers[3] === option.id && (
                          option.id === 'q3c' ? (
                            <CheckCircle2 size={18} className="text-green-600" />
                          ) : (
                            <XCircle size={18} className="text-red-600" />
                          )
                        )}
                      </div>
                    </button>
                  ))}
                </div>
                {quizAnswers[3] && quizAnswers[3] === 'q3c' && (
                  <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 rounded text-xs text-green-800 dark:text-green-200">
                    ✓ Correct! Sequence numbers are perfect here: TCP already guarantees ordering (no desync risk), 
                    minimal overhead (just increment counter), and extremely efficient for high-throughput streams.
                  </div>
                )}
                {quizAnswers[3] && quizAnswers[3] === 'q3a' && (
                  <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded text-xs text-red-800 dark:text-red-200">
                    ✗ Timestamps add overhead (64-bit value) and require clock sync. For high-throughput streams, 
                    sequence numbers are more efficient.
                  </div>
                )}
                {quizAnswers[3] && quizAnswers[3] === 'q3b' && (
                  <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 rounded text-xs text-red-800 dark:text-red-200">
                    ✗ Nonces require server to generate and track millions per second - huge overhead. Also requires 
                    challenge-response round trip per frame (impossible for streaming).
                  </div>
                )}
              </div>

              {/* Score Display */}
              {Object.keys(quizAnswers).length === 3 && (
                <div className="bg-gradient-to-r from-indigo-50 to-sky-50 dark:from-indigo-950 dark:to-sky-950 rounded-lg p-4 border border-indigo-200 dark:border-indigo-800">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mb-2">
                    Your Score: {
                      [quizAnswers[1] === 'q1a', quizAnswers[2] === 'q2b', quizAnswers[3] === 'q3c']
                        .filter(Boolean).length
                    } / 3
                  </p>
                  <p className="text-xs text-slate-700 dark:text-slate-300">
                    {[quizAnswers[1] === 'q1a', quizAnswers[2] === 'q2b', quizAnswers[3] === 'q3c']
                      .filter(Boolean).length === 3
                      ? '🎉 Perfect! You understand when to use each freshness mechanism!'
                      : 'Review the explanations to understand the trade-offs better.'}
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

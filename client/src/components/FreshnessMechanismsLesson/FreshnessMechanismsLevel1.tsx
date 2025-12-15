import { Clock, Hash, ListOrdered, Shield, User, Server, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FreshnessMechanismsLevel1Props {
  currentStep: number; // 0-2
  onNext: () => void;
  onPrevious: () => void;
  onTimestampDemoTrigger: () => void;
  timestampDemoAnimated: boolean;
  onNonceDemoTrigger: () => void;
  nonceDemoAnimated: boolean;
  onSequenceDemoTrigger: () => void;
  sequenceDemoAnimated: boolean;
}

export function FreshnessMechanismsLevel1({
  currentStep,
  onNext,
  onPrevious,
  onTimestampDemoTrigger,
  timestampDemoAnimated,
  onNonceDemoTrigger,
  nonceDemoAnimated,
  onSequenceDemoTrigger,
  sequenceDemoAnimated,
}: FreshnessMechanismsLevel1Props) {
  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Shield size={18} className="text-indigo-500" />
                Three Ways to Ensure Message Freshness
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                To prevent replay attacks, we need to prove that a message is <strong>fresh</strong> (recently created). 
                There are three main approaches, each with different trade-offs:
              </p>

              {/* The Three Mechanisms */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {/* Timestamp */}
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded-lg p-5 border-2 border-blue-300 dark:border-blue-700">
                  <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mb-3 mx-auto">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <h5 className="font-semibold text-center text-blue-900 dark:text-blue-100 mb-2">
                    Timestamp
                  </h5>
                  <p className="text-xs text-center text-blue-800 dark:text-blue-200 mb-3">
                    Include current time in message
                  </p>
                  <div className="bg-white dark:bg-slate-800 rounded p-3 text-xs font-mono text-blue-900 dark:text-blue-100">
                    msg = "Transfer $100"<br/>
                    t = 1702650000<br/>
                    sig = HMAC(key, msg || t)
                  </div>
                </div>

                {/* Nonce */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg p-5 border-2 border-green-300 dark:border-green-700">
                  <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center mb-3 mx-auto">
                    <Hash className="w-7 h-7 text-white" />
                  </div>
                  <h5 className="font-semibold text-center text-green-900 dark:text-green-100 mb-2">
                    Nonce
                  </h5>
                  <p className="text-xs text-center text-green-800 dark:text-green-200 mb-3">
                    Server provides random challenge
                  </p>
                  <div className="bg-white dark:bg-slate-800 rounded p-3 text-xs font-mono text-green-900 dark:text-green-100">
                    nonce = random()<br/>
                    msg = "Transfer $100"<br/>
                    sig = HMAC(key, msg || nonce)
                  </div>
                </div>

                {/* Sequence Number */}
                <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950 dark:to-purple-950 rounded-lg p-5 border-2 border-violet-300 dark:border-violet-700">
                  <div className="w-12 h-12 rounded-full bg-violet-500 flex items-center justify-center mb-3 mx-auto">
                    <ListOrdered className="w-7 h-7 text-white" />
                  </div>
                  <h5 className="font-semibold text-center text-violet-900 dark:text-violet-100 mb-2">
                    Sequence Number
                  </h5>
                  <p className="text-xs text-center text-violet-800 dark:text-violet-200 mb-3">
                    Increment counter for each message
                  </p>
                  <div className="bg-white dark:bg-slate-800 rounded p-3 text-xs font-mono text-violet-900 dark:text-violet-100">
                    seq = counter++<br/>
                    msg = "Transfer $100"<br/>
                    sig = HMAC(key, msg || seq)
                  </div>
                </div>
              </div>

              {/* The Common Protocol */}
              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 border border-indigo-200 dark:border-indigo-800">
                <p className="text-xs font-semibold text-indigo-900 dark:text-indigo-100 mb-3 text-center">
                  All Three Use the Same Basic Protocol:
                </p>
                <div className="space-y-2 text-xs text-indigo-800 dark:text-indigo-200">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[10px] font-bold">1</span>
                    <span>Client includes <strong>freshness value</strong> (timestamp/nonce/sequence) in message</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[10px] font-bold">2</span>
                    <span>Client signs: <code className="bg-indigo-100 dark:bg-indigo-900 px-1 rounded">HMAC(key, message || freshness_value)</code></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[10px] font-bold">3</span>
                    <span>Server verifies signature</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[10px] font-bold">4</span>
                    <span>Server checks if <strong>freshness value is valid</strong> (recent/unused/in-order)</span>
                  </div>
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
                <Clock size={18} className="text-blue-500" />
                Mechanism 1: Timestamps
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                Timestamps include the <strong>current time</strong> in each message. The server accepts messages only if they're within a time window.
              </p>

              {/* Timestamp Demo */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 rounded-lg p-6 border border-blue-200 dark:border-blue-700 mb-6">
                <div className="space-y-4">
                  {/* Message 1 */}
                  {timestampDemoAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-3 mb-3">
                          <User className="w-5 h-5 text-blue-600" />
                          <span className="text-xs font-semibold text-slate-900 dark:text-white">Alice sends message</span>
                        </div>
                        <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-3 space-y-2 text-xs font-mono">
                          <div className="flex justify-between">
                            <span className="text-slate-600 dark:text-slate-400">Time:</span>
                            <span className="text-blue-900 dark:text-blue-100">2024-12-15 10:00:00</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600 dark:text-slate-400">Message:</span>
                            <span className="text-blue-900 dark:text-blue-100">"Transfer $100"</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600 dark:text-slate-400">Signature:</span>
                            <span className="text-blue-900 dark:text-blue-100">HMAC(key, msg || time)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Server Check */}
                  {timestampDemoAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-300">
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-3 mb-3">
                          <Server className="w-5 h-5 text-green-600" />
                          <span className="text-xs font-semibold text-slate-900 dark:text-white">Server validates</span>
                        </div>
                        <div className="bg-green-50 dark:bg-green-900/20 rounded p-3 space-y-2 text-xs">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-green-600" />
                            <span className="text-green-900 dark:text-green-100">Signature valid ✓</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 size={14} className="text-green-600" />
                            <span className="text-green-900 dark:text-green-100">Server time: 2024-12-15 10:00:02 (within 30s window) ✓</span>
                          </div>
                          <div className="mt-2 pt-2 border-t border-green-200 dark:border-green-800 font-semibold text-green-900 dark:text-green-100">
                            → Message ACCEPTED
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Replay Attempt */}
                  {timestampDemoAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500 delay-600">
                      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-red-300 dark:border-red-700">
                        <div className="flex items-center gap-3 mb-3">
                          <AlertTriangle className="w-5 h-5 text-orange-600" />
                          <span className="text-xs font-semibold text-slate-900 dark:text-white">Attacker replays (5 minutes later)</span>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/20 rounded p-3 space-y-2 text-xs">
                          <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                            <span>Same message with timestamp: 2024-12-15 10:00:00</span>
                          </div>
                          <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                            <span>Server time now: 2024-12-15 10:05:00</span>
                          </div>
                          <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                            <span>Time difference: 5 minutes &gt; 30s window</span>
                          </div>
                          <div className="mt-2 pt-2 border-t border-red-200 dark:border-red-800 font-semibold text-red-900 dark:text-red-100">
                            → Message REJECTED (too old)
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  onClick={onTimestampDemoTrigger}
                  variant="outline"
                  className="w-full mt-6 border-blue-300 hover:bg-blue-50 dark:border-blue-700 dark:hover:bg-blue-900/20"
                >
                  {timestampDemoAnimated ? 'Reset' : 'Show Timestamp Protocol 🕐'}
                </Button>
              </div>

              {/* Pros and Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                  <p className="text-xs font-semibold text-green-900 dark:text-green-100 mb-2 flex items-center gap-2">
                    <CheckCircle2 size={14} />
                    Advantages
                  </p>
                  <ul className="space-y-1 text-xs text-green-800 dark:text-green-200">
                    <li>• <strong>No server state</strong> - No need to store used values</li>
                    <li>• <strong>Stateless</strong> - Server doesn't track anything</li>
                    <li>• <strong>Simple</strong> - Just check current time vs message time</li>
                  </ul>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 border border-red-200 dark:border-red-800">
                  <p className="text-xs font-semibold text-red-900 dark:text-red-100 mb-2 flex items-center gap-2">
                    <AlertTriangle size={14} />
                    Disadvantages
                  </p>
                  <ul className="space-y-1 text-xs text-red-800 dark:text-red-200">
                    <li>• <strong>Clock sync required</strong> - Client & server clocks must agree</li>
                    <li>• <strong>Replay window</strong> - Vulnerable within time window</li>
                    <li>• <strong>Clock skew issues</strong> - Network delays can cause false rejections</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
                Mechanisms 2 & 3: Nonce and Sequence Number
              </h4>

              {/* Nonce */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Hash className="w-5 h-5 text-green-500" />
                  <h5 className="font-semibold text-slate-900 dark:text-white">Nonce (Challenge-Response)</h5>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 rounded-lg p-6 border border-green-200 dark:border-green-700 mb-4">
                  <div className="space-y-4">
                    {nonceDemoAnimated && (
                      <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="bg-white dark:bg-slate-800 rounded p-3 text-xs font-mono space-y-1">
                          <div className="text-green-700 dark:text-green-300">Server → Client: nonce = "abc123"</div>
                          <div className="text-blue-700 dark:text-blue-300">Client → Server: HMAC(key, msg || "abc123")</div>
                          <div className="text-green-700 dark:text-green-300">Server: Check if nonce used before → ✓ Not used → Accept</div>
                          <div className="text-green-700 dark:text-green-300">Server: Mark "abc123" as used</div>
                        </div>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={onNonceDemoTrigger}
                    variant="outline"
                    className="w-full mt-4 border-green-300 hover:bg-green-50 dark:border-green-700 dark:hover:bg-green-900/20"
                    size="sm"
                  >
                    {nonceDemoAnimated ? 'Reset' : 'Show Nonce Protocol'}
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded p-3 border border-green-200 dark:border-green-800">
                    <p className="text-xs font-semibold text-green-900 dark:text-green-100 mb-2">✓ Advantages</p>
                    <ul className="space-y-1 text-xs text-green-800 dark:text-green-200">
                      <li>• <strong>No clock sync</strong> needed</li>
                      <li>• <strong>Perfect replay protection</strong></li>
                      <li>• <strong>Server controls</strong> freshness</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 rounded p-3 border border-red-200 dark:border-red-800">
                    <p className="text-xs font-semibold text-red-900 dark:text-red-100 mb-2">✗ Disadvantages</p>
                    <ul className="space-y-1 text-xs text-red-800 dark:text-red-200">
                      <li>• <strong>Extra round trip</strong> (server sends nonce first)</li>
                      <li>• <strong>Server state</strong> - Must track used nonces</li>
                      <li>• <strong>Storage overhead</strong> - Growing nonce database</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Sequence Number */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <ListOrdered className="w-5 h-5 text-violet-500" />
                  <h5 className="font-semibold text-slate-900 dark:text-white">Sequence Number (Counter)</h5>
                </div>

                <div className="bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950 dark:to-purple-950 rounded-lg p-6 border border-violet-200 dark:border-violet-700 mb-4">
                  <div className="space-y-4">
                    {sequenceDemoAnimated && (
                      <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="bg-white dark:bg-slate-800 rounded p-3 text-xs font-mono space-y-1">
                          <div className="text-violet-700 dark:text-violet-300">Client: seq = 1, send HMAC(key, msg || seq)</div>
                          <div className="text-green-700 dark:text-green-300">Server: Expect seq=1 → ✓ Correct → Accept (expect 2 next)</div>
                          <div className="text-violet-700 dark:text-violet-300">Client: seq = 2, send HMAC(key, msg || seq)</div>
                          <div className="text-green-700 dark:text-green-300">Server: Expect seq=2 → ✓ Correct → Accept (expect 3 next)</div>
                        </div>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={onSequenceDemoTrigger}
                    variant="outline"
                    className="w-full mt-4 border-violet-300 hover:bg-violet-50 dark:border-violet-700 dark:hover:bg-violet-900/20"
                    size="sm"
                  >
                    {sequenceDemoAnimated ? 'Reset' : 'Show Sequence Protocol'}
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 dark:bg-green-900/20 rounded p-3 border border-green-200 dark:border-green-800">
                    <p className="text-xs font-semibold text-green-900 dark:text-green-100 mb-2">✓ Advantages</p>
                    <ul className="space-y-1 text-xs text-green-800 dark:text-green-200">
                      <li>• <strong>Minimal server state</strong> - Just one counter</li>
                      <li>• <strong>No clock sync</strong> needed</li>
                      <li>• <strong>Efficient</strong> - Simple increment check</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 dark:bg-red-900/20 rounded p-3 border border-red-200 dark:border-red-800">
                    <p className="text-xs font-semibold text-red-900 dark:text-red-100 mb-2">✗ Disadvantages</p>
                    <ul className="space-y-1 text-xs text-red-800 dark:text-red-200">
                      <li>• <strong>Desync issues</strong> - Lost messages break sequence</li>
                      <li>• <strong>No recovery</strong> - Single dropped message fails all future</li>
                      <li>• <strong>Ordering required</strong> - Messages must arrive in order</li>
                    </ul>
                  </div>
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

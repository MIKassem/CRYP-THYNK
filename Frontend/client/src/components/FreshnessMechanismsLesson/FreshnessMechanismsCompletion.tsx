import { Trophy, CheckCircle2, BookOpen, ArrowRight, Clock, Hash, ListOrdered } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface FreshnessMechanismsCompletionProps {
  onFinish: () => void;
}

export function FreshnessMechanismsCompletion({ onFinish }: FreshnessMechanismsCompletionProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-500">
      {/* Congratulations Card */}
      <div className="bg-gradient-to-br from-indigo-500 to-sky-600 rounded-2xl p-8 text-white text-center shadow-2xl">
        <div className="mb-4 flex justify-center">
          <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
            <Trophy className="w-12 h-12 text-white" />
          </div>
        </div>
        <h3 className="text-2xl font-bold mb-2">Congratulations!</h3>
        <p className="text-indigo-100 text-sm">
          You've mastered Freshness Mechanisms!
        </p>
      </div>

      {/* Summary Card */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <BookOpen size={18} className="text-indigo-500" />
          What You've Learned
        </h4>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                Three Freshness Mechanisms
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Timestamp, Nonce, and Sequence Number - each with unique trade-offs
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                Replay Attack Vulnerabilities
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Saw how each mechanism handles replay attempts differently
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                Practical Trade-offs
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Clock sync vs server state vs network reliability requirements
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                Scenario-Based Decision Making
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Choosing the right mechanism based on requirements and constraints
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Summary */}
      <div className="bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <h4 className="font-semibold text-slate-900 dark:text-white mb-4 text-center">
          Quick Comparison Chart
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Timestamp */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-blue-600" />
              <p className="font-semibold text-blue-900 dark:text-blue-100">Timestamp</p>
            </div>
            <div className="space-y-2 text-xs">
              <div className="text-green-700 dark:text-green-300">✓ No server state</div>
              <div className="text-green-700 dark:text-green-300">✓ Stateless protocol</div>
              <div className="text-red-700 dark:text-red-300">✗ Clock sync required</div>
              <div className="text-red-700 dark:text-red-300">✗ Replay window</div>
            </div>
            <p className="text-xs text-blue-800 dark:text-blue-200 mt-3 pt-3 border-t border-blue-200 dark:border-blue-800 font-semibold">
              Best for: IoT, distributed systems
            </p>
          </div>

          {/* Nonce */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-3">
              <Hash className="w-5 h-5 text-green-600" />
              <p className="font-semibold text-green-900 dark:text-green-100">Nonce</p>
            </div>
            <div className="space-y-2 text-xs">
              <div className="text-green-700 dark:text-green-300">✓ Perfect replay protection</div>
              <div className="text-green-700 dark:text-green-300">✓ No clock sync</div>
              <div className="text-red-700 dark:text-red-300">✗ Extra round trip</div>
              <div className="text-red-700 dark:text-red-300">✗ Server state required</div>
            </div>
            <p className="text-xs text-green-800 dark:text-green-200 mt-3 pt-3 border-t border-green-200 dark:border-green-800 font-semibold">
              Best for: Banking, high-security
            </p>
          </div>

          {/* Sequence */}
          <div className="bg-violet-50 dark:bg-violet-900/20 rounded-lg p-4 border border-violet-200 dark:border-violet-800">
            <div className="flex items-center gap-2 mb-3">
              <ListOrdered className="w-5 h-5 text-violet-600" />
              <p className="font-semibold text-violet-900 dark:text-violet-100">Sequence</p>
            </div>
            <div className="space-y-2 text-xs">
              <div className="text-green-700 dark:text-green-300">✓ Minimal overhead</div>
              <div className="text-green-700 dark:text-green-300">✓ Efficient checking</div>
              <div className="text-red-700 dark:text-red-300">✗ Desync fragility</div>
              <div className="text-red-700 dark:text-red-300">✗ Strict ordering</div>
            </div>
            <p className="text-xs text-violet-800 dark:text-violet-200 mt-3 pt-3 border-t border-violet-200 dark:border-violet-800 font-semibold">
              Best for: Streaming, TCP connections
            </p>
          </div>
        </div>
      </div>

      {/* Decision Tree */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <ArrowRight size={18} className="text-sky-500" />
          Decision Guide
        </h4>

        <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
            <p className="font-semibold text-slate-900 dark:text-white mb-2">When to use Timestamps:</p>
            <ul className="space-y-1 text-xs ml-4">
              <li>• Clients can have synchronized clocks</li>
              <li>• Server should be stateless</li>
              <li>• Small replay window (30s) is acceptable</li>
              <li>• Network may be unreliable (IoT sensors)</li>
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
            <p className="font-semibold text-slate-900 dark:text-white mb-2">When to use Nonces:</p>
            <ul className="space-y-1 text-xs ml-4">
              <li>• Absolute replay protection required</li>
              <li>• High-value transactions (banking, payments)</li>
              <li>• Extra round trip is acceptable</li>
              <li>• Server can maintain nonce database</li>
            </ul>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
            <p className="font-semibold text-slate-900 dark:text-white mb-2">When to use Sequence Numbers:</p>
            <ul className="space-y-1 text-xs ml-4">
              <li>• Connection-oriented protocol (TCP)</li>
              <li>• Network is reliable</li>
              <li>• Ordered delivery guaranteed</li>
              <li>• High throughput required (streaming, gaming)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Real-World Examples */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
          Real-World Protocol Examples
        </h4>

        <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
          <ul className="space-y-2 ml-4">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-1">•</span>
              <span><strong>TLS 1.3:</strong> Uses nonces (random values) in handshake for perfect replay protection</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-1">•</span>
              <span><strong>Kerberos:</strong> Uses timestamps for ticket validity (5-minute window typical)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-violet-500 mt-1">•</span>
              <span><strong>TCP:</strong> Uses sequence numbers to detect dropped/reordered packets</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 mt-1">•</span>
              <span><strong>IPsec:</strong> Uses sequence numbers for replay prevention in tunnel mode</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-sky-500 mt-1">•</span>
              <span><strong>OAuth 2.0:</strong> Uses nonce (state parameter) to prevent CSRF attacks</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-cyan-500 mt-1">•</span>
              <span><strong>Bitcoin:</strong> Uses timestamp + nonce in block mining (proof-of-work)</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Close Button */}
      <div className="flex justify-center pt-4">
        <Button
          onClick={onFinish}
          size="lg"
          className="bg-gradient-to-r from-indigo-500 to-sky-600 hover:from-indigo-600 hover:to-sky-700 text-white px-8"
        >
          <CheckCircle2 className="w-5 h-5 mr-2" />
          Complete Lesson
        </Button>
      </div>
    </div>
  );
}

import { Clock, Zap, TrendingUp, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

interface RSAPerformanceLimitsLevel1Props {
  currentStep: number;
  onNext: () => void;
  onPrevious: () => void;
  onRSATimingTrigger: () => void;
  rsaTimingTriggered: boolean;
  onAESTimingTrigger: () => void;
  aesTimingTriggered: boolean;
  onComparisonTrigger: () => void;
  comparisonTriggered: boolean;
}

export function RSAPerformanceLimitsLevel1({
  currentStep,
  onNext,
  onPrevious,
  onRSATimingTrigger,
  rsaTimingTriggered,
  onAESTimingTrigger,
  aesTimingTriggered,
  onComparisonTrigger,
  comparisonTriggered,
}: RSAPerformanceLimitsLevel1Props) {
  const [rsaTime, setRsaTime] = useState<number | null>(null);
  const [aesTime, setAesTime] = useState<number | null>(null);
  const [isRSAMeasuring, setIsRSAMeasuring] = useState(false);
  const [isAESMeasuring, setIsAESMeasuring] = useState(false);

  // Simulate RSA timing
  useEffect(() => {
    if (rsaTimingTriggered && rsaTime === null) {
      setIsRSAMeasuring(true);
      setTimeout(() => {
        setRsaTime(1200); // ~1200ms for RSA
        setIsRSAMeasuring(false);
      }, 1500);
    }
  }, [rsaTimingTriggered, rsaTime]);

  // Simulate AES timing
  useEffect(() => {
    if (aesTimingTriggered && aesTime === null) {
      setIsAESMeasuring(true);
      setTimeout(() => {
        setAesTime(5); // ~5ms for AES
        setIsAESMeasuring(false);
      }, 800);
    }
  }, [aesTimingTriggered, aesTime]);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="bg-slate-800 dark:bg-slate-700 rounded-lg p-4 border border-slate-700 dark:border-slate-600">
              <h3 className="text-sm font-semibold text-white mb-2 flex items-center gap-2">
                <Brain className="w-4 h-4 text-indigo-400" />
                The Speed Problem
              </h3>
              <p className="text-sm text-slate-300 dark:text-slate-200 mb-3">
                RSA is powerful for secure key exchange, but it has a critical limitation: <strong>it's extremely slow</strong> compared to symmetric encryption algorithms like AES.
              </p>
              <div className="bg-amber-900 dark:bg-amber-800 border border-amber-700 dark:border-amber-600 rounded p-3 mb-3">
                <p className="text-xs text-amber-100 dark:text-amber-200">
                  <strong>Challenge:</strong> Can RSA encrypt a 100MB video file in real-time? Let's find out why the answer is no.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* RSA Timing Test */}
              <div className="bg-slate-800 dark:bg-slate-700 rounded-lg p-4 border border-slate-700 dark:border-slate-600">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-red-400" />
                    <span className="text-sm font-semibold text-white">RSA-2048 Encryption</span>
                  </div>
                  <Button
                    size="sm"
                    onClick={onRSATimingTrigger}
                    disabled={isRSAMeasuring || rsaTime !== null}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    {isRSAMeasuring ? 'Measuring...' : rsaTime !== null ? 'Measured' : 'Measure Time'}
                  </Button>
                </div>
                {rsaTime !== null && (
                  <div className="text-center py-4">
                    <div className="text-4xl font-bold text-red-400 mb-1">{rsaTime}ms</div>
                    <p className="text-xs text-slate-400">to encrypt 1KB of data</p>
                  </div>
                )}
                {isRSAMeasuring && (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-400"></div>
                  </div>
                )}
              </div>

              {/* AES Timing Test */}
              <div className="bg-slate-800 dark:bg-slate-700 rounded-lg p-4 border border-slate-700 dark:border-slate-600">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-green-400" />
                    <span className="text-sm font-semibold text-white">AES-256 Encryption</span>
                  </div>
                  <Button
                    size="sm"
                    onClick={onAESTimingTrigger}
                    disabled={isAESMeasuring || aesTime !== null}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    {isAESMeasuring ? 'Measuring...' : aesTime !== null ? 'Measured' : 'Measure Time'}
                  </Button>
                </div>
                {aesTime !== null && (
                  <div className="text-center py-4">
                    <div className="text-4xl font-bold text-green-400 mb-1">{aesTime}ms</div>
                    <p className="text-xs text-slate-400">to encrypt 1KB of data</p>
                  </div>
                )}
                {isAESMeasuring && (
                  <div className="flex justify-center py-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="bg-slate-800 dark:bg-slate-700 rounded-lg p-4 border border-slate-700 dark:border-slate-600">
              <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-400" />
                Speed Comparison
              </h3>
              
              <button
                onClick={onComparisonTrigger}
                className="w-full mb-4 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
              >
                {comparisonTriggered ? 'Refresh Comparison' : 'Show Visual Comparison'}
              </button>

              {comparisonTriggered && (
                <div className="space-y-4">
                  {/* RSA Bar */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-red-400">RSA-2048</span>
                      <span className="text-xs text-slate-400">~240x slower</span>
                    </div>
                    <div className="h-8 bg-slate-900 dark:bg-slate-800 rounded-lg overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-red-500 to-red-600 animate-[expand_2s_ease-out]"
                        style={{ width: '100%' }}
                      ></div>
                    </div>
                    <div className="text-right mt-1">
                      <span className="text-xs text-slate-400">1200ms / 1KB</span>
                    </div>
                  </div>

                  {/* AES Bar */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-semibold text-green-400">AES-256</span>
                      <span className="text-xs text-slate-400">baseline</span>
                    </div>
                    <div className="h-8 bg-slate-900 dark:bg-slate-800 rounded-lg overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-green-500 to-green-600 animate-[expand_1.5s_ease-out]"
                        style={{ width: '0.4%' }}
                      ></div>
                    </div>
                    <div className="text-right mt-1">
                      <span className="text-xs text-slate-400">5ms / 1KB</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-indigo-900 dark:bg-indigo-800 border border-indigo-700 dark:border-indigo-600 rounded-lg p-4">
              <p className="text-xs text-indigo-100 dark:text-indigo-200">
                <strong>Key Insight:</strong> RSA is approximately <strong>240 times slower</strong> than AES for the same amount of data. This makes RSA impractical for encrypting large files.
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="bg-slate-800 dark:bg-slate-700 rounded-lg p-4 border border-slate-700 dark:border-slate-600">
              <h3 className="text-sm font-semibold text-white mb-3">Real-World Impact</h3>
              
              <div className="space-y-3">
                <div className="bg-slate-900 dark:bg-slate-800 rounded p-3 border border-slate-700">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-slate-200">Small Email (10KB)</span>
                    <span className="text-xs text-slate-400">Practical size</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-red-400">RSA:</span> <strong className="text-white">~12 seconds</strong>
                    </div>
                    <div>
                      <span className="text-green-400">AES:</span> <strong className="text-white">~50ms</strong>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 dark:bg-slate-800 rounded p-3 border border-slate-700">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-slate-200">Photo (5MB)</span>
                    <span className="text-xs text-slate-400">Common file</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-red-400">RSA:</span> <strong className="text-white">~100 minutes</strong>
                    </div>
                    <div>
                      <span className="text-green-400">AES:</span> <strong className="text-white">~25ms</strong>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900 dark:bg-slate-800 rounded p-3 border border-slate-700">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-semibold text-slate-200">Video (100MB)</span>
                    <span className="text-xs text-slate-400">Large file</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-red-400">RSA:</span> <strong className="text-white">~33 hours</strong>
                    </div>
                    <div>
                      <span className="text-green-400">AES:</span> <strong className="text-white">~500ms</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-amber-900 dark:bg-amber-800 border border-amber-700 dark:border-amber-600 rounded-lg p-4">
              <p className="text-xs text-amber-100 dark:text-amber-200 mb-2">
                <strong>The Verdict:</strong> RSA is completely impractical for bulk data encryption.
              </p>
              <p className="text-xs text-amber-100 dark:text-amber-200">
                This is why real systems use <strong>hybrid encryption</strong>: RSA encrypts a small AES key, then AES encrypts the actual data.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      {renderStep()}
    </div>
  );
}

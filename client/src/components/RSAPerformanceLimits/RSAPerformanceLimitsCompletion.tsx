import { CheckCircle, Zap, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface RSAPerformanceLimitsCompletionProps {
  onFinish: () => void;
}

export function RSAPerformanceLimitsCompletion({ onFinish }: RSAPerformanceLimitsCompletionProps) {
  return (
    <div className="space-y-6 text-center py-6">
      <div className="flex justify-center">
        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
          Lesson Complete!
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          You've mastered RSA performance limitations
        </p>
      </div>

      <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6 space-y-4">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
          Key Takeaways
        </h3>
        
        <div className="space-y-3 text-left">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-slate-700 dark:text-slate-300">
              <strong>RSA is ~240x slower than AES</strong> for the same amount of data due to 
              complex mathematical operations with large numbers.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-slate-700 dark:text-slate-300">
              <strong>Bulk data encryption with RSA is impractical</strong> — encrypting a 10MB 
              file would take hours, while AES does it in milliseconds.
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-slate-700 dark:text-slate-300">
              <strong>Hybrid encryption is the solution</strong> — use RSA to securely exchange 
              an AES key, then use AES to encrypt the actual data. Best of both worlds!
            </div>
          </div>
        </div>
      </div>

      <div className="bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-800 rounded-lg p-4">
        <p className="text-xs text-indigo-900 dark:text-indigo-200">
          <strong>Real-World Impact:</strong> Every HTTPS connection, encrypted email (PGP), 
          and secure messaging app uses this hybrid approach — RSA/ECC for key exchange, 
          AES for data encryption.
        </p>
      </div>

      <Button
        onClick={onFinish}
        className="bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-8 py-2"
      >
        Finish Lesson
      </Button>
    </div>
  );
}

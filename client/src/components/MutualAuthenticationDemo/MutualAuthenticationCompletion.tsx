import { Trophy, CheckCircle2, BookOpen, ArrowRight, Shield, User, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MutualAuthenticationCompletionProps {
  onFinish: () => void;
}

export function MutualAuthenticationCompletion({ onFinish }: MutualAuthenticationCompletionProps) {
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
          You've mastered Mutual Authentication!
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
                Client-Only vs Mutual Authentication
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Understood the difference between one-way and two-way verification
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                MITM Attack Vulnerability
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Saw how attackers can impersonate servers when only client authenticates
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                Certificate Verification
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Learned how clients verify server certificates to prevent MITM attacks
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <CheckCircle2 size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">
                Interactive Security Toggle
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Experienced the impact of enabling/disabling mutual authentication
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Concept */}
      <div className="bg-gradient-to-br from-slate-50 to-indigo-50 dark:from-slate-900 dark:to-indigo-950 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <h4 className="font-semibold text-slate-900 dark:text-white mb-4 text-center flex items-center justify-center gap-2">
          <Shield size={18} className="text-indigo-500" />
          Mutual Authentication = Two-Way Trust
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Client Authenticates */}
          <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-2">
              <User className="w-5 h-5 text-blue-600" />
              <p className="text-xs font-semibold text-blue-900 dark:text-blue-100">
                Client → Server
              </p>
            </div>
            <p className="text-xs text-blue-800 dark:text-blue-200">
              Client proves identity with credentials or certificate
            </p>
          </div>

          {/* Server Authenticates */}
          <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-4 border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 mb-2">
              <Server className="w-5 h-5 text-green-600" />
              <p className="text-xs font-semibold text-green-900 dark:text-green-100">
                Server → Client
              </p>
            </div>
            <p className="text-xs text-green-800 dark:text-green-200">
              Server proves identity with certificate signed by trusted CA
            </p>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
          Quick Comparison
        </h4>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="text-left p-2 text-slate-900 dark:text-white">Aspect</th>
                <th className="text-left p-2 text-orange-900 dark:text-orange-100">Client-Only Auth</th>
                <th className="text-left p-2 text-green-900 dark:text-green-100">Mutual Auth</th>
              </tr>
            </thead>
            <tbody className="text-slate-700 dark:text-slate-300">
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="p-2 font-medium">Client verifies server</td>
                <td className="p-2 text-red-600">✗ No</td>
                <td className="p-2 text-green-600">✓ Yes</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="p-2 font-medium">Server verifies client</td>
                <td className="p-2 text-green-600">✓ Yes</td>
                <td className="p-2 text-green-600">✓ Yes</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="p-2 font-medium">MITM protection</td>
                <td className="p-2 text-red-600">✗ Vulnerable</td>
                <td className="p-2 text-green-600">✓ Protected</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="p-2 font-medium">Phishing risk</td>
                <td className="p-2 text-red-600">High</td>
                <td className="p-2 text-green-600">Low</td>
              </tr>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <td className="p-2 font-medium">Setup complexity</td>
                <td className="p-2 text-green-600">Simple</td>
                <td className="p-2 text-orange-600">Moderate</td>
              </tr>
              <tr>
                <td className="p-2 font-medium">Use case</td>
                <td className="p-2">General web apps</td>
                <td className="p-2">Banking, APIs, IoT</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Real-World Applications */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <ArrowRight size={18} className="text-sky-500" />
          Real-World Uses of Mutual Authentication
        </h4>

        <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
          <ul className="space-y-2 ml-4">
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 mt-1">•</span>
              <span><strong>Banking APIs:</strong> Corporate clients use certificates to prove identity, bank server also proves legitimacy</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 mt-1">•</span>
              <span><strong>IoT Devices:</strong> Smart home devices authenticate to cloud servers, and verify they're connecting to real cloud (not attacker)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 mt-1">•</span>
              <span><strong>VPN Connections:</strong> Both client and VPN gateway verify each other with certificates</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 mt-1">•</span>
              <span><strong>Enterprise Email:</strong> Email clients verify mail server, server verifies authorized employee</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 mt-1">•</span>
              <span><strong>Payment Terminals:</strong> Credit card terminals and payment processors mutually authenticate</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-indigo-500 mt-1">•</span>
              <span><strong>Government Systems:</strong> Classified networks require mutual auth for all connections</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Implementation Guide */}
      <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
        <h4 className="font-semibold text-slate-900 dark:text-white mb-4">
          How to Implement Mutual Auth
        </h4>

        <div className="space-y-3">
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
            <p className="text-xs font-semibold text-slate-900 dark:text-white mb-2">
              1. Certificate Authority (CA) Setup
            </p>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Establish trusted CA to issue certificates for both clients and servers. Can use public CAs (Let's Encrypt) or internal CA for private networks.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
            <p className="text-xs font-semibold text-slate-900 dark:text-white mb-2">
              2. Server Certificate Configuration
            </p>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Configure server with certificate + private key. Server presents certificate during TLS handshake.
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
            <p className="text-xs font-semibold text-slate-900 dark:text-white mb-2">
              3. Client Certificate Distribution
            </p>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Issue certificates to authorized clients. Store securely (hardware tokens, encrypted storage, TPM chips).
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4">
            <p className="text-xs font-semibold text-slate-900 dark:text-white mb-2">
              4. Enable TLS Client Authentication
            </p>
            <p className="text-xs text-slate-700 dark:text-slate-300">
              Configure server to request client certificates during TLS handshake. Verify certificate chain and check revocation status.
            </p>
          </div>
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

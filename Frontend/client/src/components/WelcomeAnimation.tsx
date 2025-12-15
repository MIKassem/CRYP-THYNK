/**
 * Welcome Animation Component
 * 
 * Full-screen welcome animation that displays when the app first loads.
 * Shows the CRYP-THYNK logo with animated lock unlocking effect.
 * Automatically fades out after 2-3 seconds.
 */

import { useEffect, useState } from 'react';

interface WelcomeAnimationProps {
  onComplete: () => void;
}

export function WelcomeAnimation({ onComplete }: WelcomeAnimationProps) {
  const [stage, setStage] = useState<'enter' | 'unlocking' | 'fadeout'>('enter');

  useEffect(() => {
    // Stage 1: Show logo with lock (0-800ms)
    const timer1 = setTimeout(() => {
      setStage('unlocking');
    }, 800);

    // Stage 2: Unlock animation (800-2000ms)
    const timer2 = setTimeout(() => {
      setStage('fadeout');
    }, 2000);

    // Stage 3: Complete and notify parent (2000-2500ms)
    const timer3 = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 transition-opacity duration-500 ${
        stage === 'fadeout' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Brain + Lock Logo */}
        <div className="relative">
          {/* Brain SVG */}
          <svg
            width="160"
            height="160"
            viewBox="0 0 160 160"
            className={`transition-all duration-700 ${
              stage === 'enter' ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
            }`}
          >
            {/* Brain outline */}
            <path
              d="M 40 80 Q 40 50, 60 35 Q 75 30, 80 35 Q 85 30, 90 35 Q 110 50, 110 80 Q 110 90, 105 95 Q 110 100, 110 110 Q 110 120, 100 125 Q 95 130, 85 127 Q 80 130, 75 127 Q 70 130, 65 125 Q 55 120, 55 110 Q 55 100, 60 95 Q 55 90, 55 80 Q 55 70, 60 65 Q 65 60, 70 62 Q 75 60, 80 62 Q 85 60, 90 62 Q 95 60, 100 65 Q 105 70, 105 80"
              fill="#2d6a4f"
              stroke="#1b4332"
              strokeWidth="2"
              className="animate-pulse"
            />
          </svg>

          {/* Lock - Positioned over brain */}
          <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
              stage === 'unlocking' ? 'translate-y-[-30px] opacity-0' : 'translate-y-0 opacity-100'
            }`}
          >
            <svg width="60" height="80" viewBox="0 0 60 80">
              {/* Lock body */}
              <rect
                x="10"
                y="35"
                width="40"
                height="40"
                rx="5"
                fill="#e8f4f8"
                stroke="#94a3b8"
                strokeWidth="2"
              />
              {/* Lock shackle */}
              <path
                d="M 20 35 L 20 25 Q 20 15, 30 15 Q 40 15, 40 25 L 40 35"
                fill="none"
                stroke="#e8f4f8"
                strokeWidth="5"
                strokeLinecap="round"
              />
              {/* Keyhole */}
              <circle cx="30" cy="50" r="4" fill="#64748b" />
              <rect x="28" y="50" width="4" height="12" rx="2" fill="#64748b" />
            </svg>
          </div>

          {/* Unlocked checkmark - appears after unlock */}
          {stage === 'unlocking' && (
            <div className="absolute inset-0 flex items-center justify-center animate-in zoom-in duration-500">
              <svg width="80" height="80" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="30" fill="#10b981" opacity="0.2" />
                <path
                  d="M 25 40 L 35 50 L 55 30"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="animate-in draw-in duration-500"
                  style={{
                    strokeDasharray: '100',
                    strokeDashoffset: stage === 'unlocking' ? '0' : '100',
                  }}
                />
              </svg>
            </div>
          )}
        </div>

        {/* Welcome Text */}
        <div
          className={`text-center space-y-2 transition-all duration-700 ${
            stage === 'enter' ? 'translate-y-10 opacity-0' : 'translate-y-0 opacity-100'
          }`}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400 tracking-wider">
            CRYP-THYNK
          </h1>
          <p className="text-lg md:text-xl text-slate-300 tracking-widest font-light">
            UNLIMITED
          </p>
          <p className="text-sm text-slate-400 mt-4 animate-pulse">
            {stage === 'unlocking' ? 'Unlocking knowledge...' : 'Welcome to cryptography mastery'}
          </p>
        </div>

        {/* Loading dots */}
        <div className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-indigo-400 animate-bounce"
              style={{
                animationDelay: `${i * 150}ms`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

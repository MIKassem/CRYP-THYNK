import { useState } from 'react';
import { Zap, Grid3x3, Shuffle, Lock, CheckCircle2, Puzzle, Layers, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AESLevel2Props {
  currentStep: number; // 0-7
  onNext: () => void;
  onPrevious: () => void;
  onSubBytesAnimationTrigger: () => void;
  subBytesAnimated: boolean;
  onShiftRowsAnimationTrigger: () => void;
  shiftRowsAnimated: boolean;
  onMixColumnsAnimationTrigger: () => void;
  mixColumnsAnimated: boolean;
  quizAnswers: Record<number, string>;
  onQuizAnswer: (questionId: number, answer: string) => void;
}

interface DragItem {
  id: string;
  label: string;
}

interface DropZone {
  id: string;
  label: string;
  filled: boolean;
  filledWith?: string;
}

export function AESLevel2({
  currentStep,
  onNext,
  onPrevious,
  onSubBytesAnimationTrigger,
  subBytesAnimated,
  onShiftRowsAnimationTrigger,
  shiftRowsAnimated,
  onMixColumnsAnimationTrigger,
  mixColumnsAnimated,
  quizAnswers,
  onQuizAnswer,
}: AESLevel2Props) {
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [addRoundKeyAnimated, setAddRoundKeyAnimated] = useState(false);
  const [dropZones, setDropZones] = useState<DropZone[]>([
    { id: 'zone1', label: 'Step 1', filled: false },
    { id: 'zone2', label: 'Step 2', filled: false },
    { id: 'zone3', label: 'Step 3', filled: false },
    { id: 'zone4', label: 'Step 4', filled: false },
    { id: 'zone5', label: 'Step 5', filled: false },
    { id: 'zone6', label: 'Step 6', filled: false },
    { id: 'zone7', label: 'Step 7', filled: false },
  ]);

  // Shuffled drag items to make puzzle harder
  const dragItems: DragItem[] = [
    { id: 'item4', label: 'MixColumns' },
    { id: 'item7', label: 'Final Round AddRoundKey' },
    { id: 'item2', label: 'SubBytes' },
    { id: 'item6', label: 'Final Round ShiftRows' },
    { id: 'item1', label: 'Initial AddRoundKey' },
    { id: 'item5', label: 'AddRoundKey' },
    { id: 'item3', label: 'ShiftRows' },
  ];

  const correctMapping: Record<string, string> = {
    'zone1': 'Initial AddRoundKey',
    'zone2': 'SubBytes',
    'zone3': 'ShiftRows',
    'zone4': 'MixColumns',
    'zone5': 'AddRoundKey',
    'zone6': 'Final Round ShiftRows',
    'zone7': 'Final Round AddRoundKey',
  };

  const handleDragStart = (item: DragItem) => {
    setDraggedItem(item);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (zoneId: string) => {
    if (!draggedItem) return;

    setDropZones(
      dropZones.map((zone) =>
        zone.id === zoneId
          ? { ...zone, filled: true, filledWith: draggedItem.label }
          : zone
      )
    );
    setDraggedItem(null);
  };

  const handleRemoveFromZone = (zoneId: string) => {
    setDropZones(
      dropZones.map((zone) =>
        zone.id === zoneId
          ? { ...zone, filled: false, filledWith: undefined }
          : zone
      )
    );
  };

  const isPuzzleCorrect = dropZones.every(
    (zone) => zone.filledWith === correctMapping[zone.id]
  );

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Grid3x3 size={18} className="text-indigo-500" />
                SubBytes (S-box Substitution)
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
                The first transformation in AES. Each byte in the state is replaced with another byte using a substitution table (S-box), providing <strong>non-linearity</strong>.
              </p>

              {/* State Grid Visualization */}
              <div className="mb-6">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">{subBytesAnimated ? 'After SubBytes (substituted):' : 'Before SubBytes (original):'}</p>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {Array.from({ length: 16 }).map((_, i) => {
                    const originalByte = (i * 17).toString(16).padStart(2, '0').toUpperCase();
                    const substitutedByte = ((i * 23 + 42) % 256).toString(16).padStart(2, '0').toUpperCase();
                    return (
                      <div
                        key={i}
                        className={`h-12 flex items-center justify-center text-xs font-semibold rounded transition-all duration-500 ${
                          subBytesAnimated
                            ? 'bg-indigo-500 text-white transform scale-105'
                            : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                        }`}
                        style={{
                          transitionDelay: subBytesAnimated ? `${i * 30}ms` : '0ms'
                        }}
                      >
                        {subBytesAnimated ? substitutedByte : originalByte}
                      </div>
                    );
                  })}
                </div>

                <Button
                  onClick={onSubBytesAnimationTrigger}
                  variant="outline"
                  className="w-full"
                >
                  {subBytesAnimated ? 'Reset' : 'Click to Apply SubBytes'}
                </Button>
              </div>

              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded p-3 border border-indigo-200 dark:border-indigo-800">
                <p className="text-xs text-indigo-900 dark:text-indigo-100">
                  <strong>S-box:</strong> A lookup table that maps each input byte to a different output byte. This non-linear transformation is crucial for AES security.
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
                <Shuffle size={18} className="text-sky-500" />
                ShiftRows
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                The second transformation. Each row of the state is cyclically shifted left by a different offset, providing <strong>diffusion</strong>.
              </p>

              {/* Before ShiftRows */}
              <div className="mb-4">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Before ShiftRows:</p>
                  <div className="space-y-1 mb-4">
                    <div className="flex gap-1">
                      {['A', 'B', 'C', 'D'].map((val, i) => (
                        <div key={i} className="flex-1 h-10 flex items-center justify-center text-sm font-semibold rounded bg-red-200 dark:bg-red-700 text-red-900 dark:text-red-100">
                          {val}
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-1">
                      {['E', 'F', 'G', 'H'].map((val, i) => (
                        <div key={i} className="flex-1 h-10 flex items-center justify-center text-sm font-semibold rounded bg-orange-200 dark:bg-orange-700 text-orange-900 dark:text-orange-100">
                          {val}
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-1">
                      {['I', 'J', 'K', 'L'].map((val, i) => (
                        <div key={i} className="flex-1 h-10 flex items-center justify-center text-sm font-semibold rounded bg-yellow-200 dark:bg-yellow-700 text-yellow-900 dark:text-yellow-100">
                          {val}
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-1">
                      {['M', 'N', 'O', 'P'].map((val, i) => (
                        <div key={i} className="flex-1 h-10 flex items-center justify-center text-sm font-semibold rounded bg-green-200 dark:bg-green-700 text-green-900 dark:text-green-100">
                          {val}
                        </div>
                      ))}
                    </div>
                  </div>
              </div>

              {/* After ShiftRows - only shown after animation is triggered */}
              {shiftRowsAnimated && (
                <div className="mb-4">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">After ShiftRows (rows shifted left):</p>
                  <div className="space-y-1 mb-4">
                    <div className="flex gap-1">
                      {['A', 'B', 'C', 'D'].map((val, i) => (
                        <div key={i} className="flex-1 h-10 flex items-center justify-center text-sm font-semibold rounded bg-red-500 text-white transform scale-105 transition-all duration-500"
                          style={{ transitionDelay: `${i * 100}ms` }}>
                          {val}
                        </div>
                      ))}
                      <p className="text-xs text-slate-500 ml-2 flex items-center">← No shift</p>
                    </div>
                    <div className="flex gap-1">
                      {['F', 'G', 'H', 'E'].map((val, i) => (
                        <div key={i} className="flex-1 h-10 flex items-center justify-center text-sm font-semibold rounded bg-orange-500 text-white transform scale-105 transition-all duration-500"
                          style={{ transitionDelay: `${(i + 4) * 100}ms` }}>
                          {val}
                        </div>
                      ))}
                      <p className="text-xs text-slate-500 ml-2 flex items-center">← Shift 1</p>
                    </div>
                    <div className="flex gap-1">
                      {['K', 'L', 'I', 'J'].map((val, i) => (
                        <div key={i} className="flex-1 h-10 flex items-center justify-center text-sm font-semibold rounded bg-yellow-500 text-white transform scale-105 transition-all duration-500"
                          style={{ transitionDelay: `${(i + 8) * 100}ms` }}>
                          {val}
                        </div>
                      ))}
                      <p className="text-xs text-slate-500 ml-2 flex items-center">← Shift 2</p>
                    </div>
                    <div className="flex gap-1">
                      {['P', 'M', 'N', 'O'].map((val, i) => (
                        <div key={i} className="flex-1 h-10 flex items-center justify-center text-sm font-semibold rounded bg-green-500 text-white transform scale-105 transition-all duration-500"
                          style={{ transitionDelay: `${(i + 12) * 100}ms` }}>
                          {val}
                        </div>
                      ))}
                      <p className="text-xs text-slate-500 ml-2 flex items-center">← Shift 3</p>
                    </div>
                  </div>
                </div>
              )}

              {/* ShiftRows Button */}
              <Button
                onClick={onShiftRowsAnimationTrigger}
                variant="outline"
                className="w-full mb-4"
              >
                {shiftRowsAnimated ? 'Reset' : 'Click to Shift Rows'}
              </Button>

              <div className="bg-sky-50 dark:bg-sky-900/20 rounded p-3 border border-sky-200 dark:border-sky-800">
                <p className="text-xs text-sky-900 dark:text-sky-100">
                  <strong>Diffusion:</strong> ShiftRows ensures that bytes from each column are spread across different columns, mixing data vertically.
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
                <Layers size={18} className="text-violet-500" />
                MixColumns
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                The third transformation. Each column is multiplied by a fixed matrix in Galois Field arithmetic, providing <strong>maximum diffusion</strong>.
              </p>

              {/* MixColumns Visualization */}
              <div className="mb-6">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Before MixColumns:</p>
                <div className="grid grid-cols-4 gap-2 mb-4">
                  {Array.from({ length: 4 }).map((_, colIdx) => (
                    <div key={colIdx} className="space-y-1">
                      {Array.from({ length: 4 }).map((_, rowIdx) => {
                        const idx = rowIdx * 4 + colIdx;
                        const beforeVals = ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3', 'C4', 'D1', 'D2', 'D3', 'D4'];
                        return (
                          <div
                            key={idx}
                            className="h-10 flex items-center justify-center text-xs font-semibold rounded bg-violet-200 dark:bg-violet-700 text-violet-900 dark:text-violet-100"
                          >
                            {beforeVals[idx]}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* After MixColumns - only shown after animation is triggered */}
                {mixColumnsAnimated && (
                  <div className="mb-4">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">After MixColumns (mixed via matrix multiplication):</p>
                    <div className="grid grid-cols-4 gap-2 mb-4">
                      {Array.from({ length: 4 }).map((_, colIdx) => (
                        <div key={colIdx} className="space-y-1">
                          {Array.from({ length: 4 }).map((_, rowIdx) => {
                            const idx = rowIdx * 4 + colIdx;
                            const afterVals = ['M1', 'M2', 'M3', 'M4', 'X1', 'X2', 'X3', 'X4', 'Y1', 'Y2', 'Y3', 'Y4', 'Z1', 'Z2', 'Z3', 'Z4'];
                            return (
                              <div
                                key={idx}
                                className="h-10 flex items-center justify-center text-xs font-semibold rounded bg-violet-500 text-white transform scale-105 transition-all duration-700"
                                style={{
                                  transitionDelay: `${colIdx * 150}ms`
                                }}
                              >
                                {afterVals[idx]}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Button
                  onClick={onMixColumnsAnimationTrigger}
                  variant="outline"
                  className="w-full"
                >
                  {mixColumnsAnimated ? 'Reset' : 'Click to Mix Columns'}
                </Button>
              </div>

              <div className="bg-violet-50 dark:bg-violet-900/20 rounded p-3 border border-violet-200 dark:border-violet-800">
                <p className="text-xs text-violet-900 dark:text-violet-100">
                  <strong>Matrix Multiplication:</strong> Each column is treated as a 4-byte vector and multiplied by a fixed 4×4 matrix using Galois Field GF(2⁸) arithmetic.
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
                <Lock size={18} className="text-orange-500" />
                AddRoundKey
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                The fourth transformation. Each byte of the state is XORed with a byte from the round key, incorporating the <strong>encryption key</strong> into the data.
              </p>

              {/* AddRoundKey Visualization */}
              <div className="mb-6">
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">State:</p>
                    <div className="grid grid-cols-4 gap-2">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div
                          key={i}
                          className="h-10 flex items-center justify-center text-xs font-semibold rounded bg-orange-200 dark:bg-orange-700 text-orange-900 dark:text-orange-100"
                        >
                          {(i * 11).toString(16).padStart(2, '0').toUpperCase()}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-center text-lg font-bold text-orange-500">⊕</div>

                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Round Key:</p>
                    <div className="grid grid-cols-4 gap-2">
                      {Array.from({ length: 16 }).map((_, i) => (
                        <div
                          key={i}
                          className="h-10 flex items-center justify-center text-xs font-semibold rounded bg-red-200 dark:bg-red-700 text-red-900 dark:text-red-100"
                        >
                          {(i * 7).toString(16).padStart(2, '0').toUpperCase()}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => setAddRoundKeyAnimated(!addRoundKeyAnimated)}
                    variant="outline"
                    className="w-full"
                  >
                    {addRoundKeyAnimated ? 'Reset' : 'Click to XOR'}
                  </Button>

                  {addRoundKeyAnimated && (
                    <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                      <div className="text-center text-lg font-bold text-green-500 mb-2">= Result</div>
                      <div className="grid grid-cols-4 gap-2">
                        {Array.from({ length: 16 }).map((_, i) => {
                          const result = (i * 11 ^ i * 7).toString(16).padStart(2, '0').toUpperCase();
                          return (
                            <div
                              key={i}
                              className="h-10 flex items-center justify-center text-xs font-semibold rounded bg-green-500 text-white"
                            >
                              {result}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-orange-50 dark:bg-orange-900/20 rounded p-3 border border-orange-200 dark:border-orange-800">
                <p className="text-xs text-orange-900 dark:text-orange-100">
                  <strong>XOR Operation:</strong> AddRoundKey is the only step that directly uses the encryption key, making it essential for security.
                </p>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Zap size={18} className="text-cyan-500" />
                AES Round Structure
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                AES applies multiple rounds of the four transformations. The number of rounds depends on the key size:
              </p>

              {/* Round Info */}
              <div className="space-y-3 mb-6">
                <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded p-3 border border-cyan-200 dark:border-cyan-800">
                  <p className="text-sm font-semibold text-cyan-900 dark:text-cyan-100 mb-1">🔑 AES-128</p>
                  <p className="text-xs text-cyan-800 dark:text-cyan-200">128-bit key → <strong>10 rounds</strong></p>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 rounded p-3 border border-blue-200 dark:border-blue-800">
                  <p className="text-sm font-semibold text-blue-900 dark:text-blue-100 mb-1">🔑 AES-192</p>
                  <p className="text-xs text-blue-800 dark:text-blue-200">192-bit key → <strong>12 rounds</strong></p>
                </div>

                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded p-3 border border-indigo-200 dark:border-indigo-800">
                  <p className="text-sm font-semibold text-indigo-900 dark:text-indigo-100 mb-1">🔑 AES-256</p>
                  <p className="text-xs text-indigo-800 dark:text-indigo-200">256-bit key → <strong>14 rounds</strong></p>
                </div>
              </div>

              {/* Round Process */}
              <div className="bg-slate-100 dark:bg-slate-700 rounded p-4">
                <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">Standard Round (1-9 for AES-128):</p>
                <ol className="text-xs text-slate-700 dark:text-slate-300 space-y-1 ml-4">
                  <li>1. SubBytes</li>
                  <li>2. ShiftRows</li>
                  <li>3. MixColumns</li>
                  <li>4. AddRoundKey</li>
                </ol>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Shuffle size={18} className="text-pink-500" />
                Final Round
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                The last round of AES is slightly different—it <strong>skips the MixColumns step</strong> to ensure encryption and decryption are symmetric.
              </p>

              {/* Final Round Steps */}
              <div className="space-y-3 mb-6">
                <div className="bg-pink-50 dark:bg-pink-900/20 rounded p-3 border border-pink-200 dark:border-pink-800">
                  <p className="text-xs font-semibold text-pink-900 dark:text-pink-100 mb-1">1️⃣ SubBytes</p>
                  <p className="text-xs text-pink-800 dark:text-pink-200">Apply S-box substitution</p>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-3 border border-purple-200 dark:border-purple-800">
                  <p className="text-xs font-semibold text-purple-900 dark:text-purple-100 mb-1">2️⃣ ShiftRows</p>
                  <p className="text-xs text-purple-800 dark:text-purple-200">Cyclically shift rows</p>
                </div>

                <div className="bg-slate-200 dark:bg-slate-600 rounded p-3 border border-slate-400 dark:border-slate-500 opacity-50">
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1 line-through">3️⃣ MixColumns</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Skipped in final round</p>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded p-3 border border-green-200 dark:border-green-800">
                  <p className="text-xs font-semibold text-green-900 dark:text-green-100 mb-1">4️⃣ AddRoundKey</p>
                  <p className="text-xs text-green-800 dark:text-green-200">Final XOR with round key</p>
                </div>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 rounded p-3 border border-amber-200 dark:border-amber-800">
                <p className="text-xs text-amber-900 dark:text-amber-100">
                  <strong>Why skip MixColumns?</strong> This design choice ensures the encryption and decryption processes are mirror images of each other, simplifying implementation.
                </p>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Mini Quiz</h4>

              <div className="space-y-6">
                {/* Question 1 */}
                <div className="border-b border-slate-200 dark:border-slate-600 pb-4">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                    1. How many rounds does AES-256 use?
                  </p>
                  <div className="space-y-2">
                    {['10', '12', '14', '16'].map((option) => (
                      <label key={option} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="q1"
                          value={option}
                          checked={quizAnswers[1] === option}
                          onChange={(e) => onQuizAnswer(1, e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className={`text-sm ${quizAnswers[1] === option ? 'font-semibold text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300'}`}>
                          {option}
                        </span>
                        {quizAnswers[1] === option && option === '14' && (
                          <CheckCircle2 size={16} className="text-green-500" />
                        )}
                        {quizAnswers[1] === option && option !== '14' && (
                          <XCircle size={16} className="text-red-500" />
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 2 */}
                <div className="border-b border-slate-200 dark:border-slate-600 pb-4">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                    2. Which step is skipped in the final round of AES?
                  </p>
                  <div className="space-y-2">
                    {['SubBytes', 'ShiftRows', 'MixColumns', 'AddRoundKey'].map((option) => (
                      <label key={option} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="q2"
                          value={option}
                          checked={quizAnswers[2] === option}
                          onChange={(e) => onQuizAnswer(2, e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className={`text-sm ${quizAnswers[2] === option ? 'font-semibold text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300'}`}>
                          {option}
                        </span>
                        {quizAnswers[2] === option && option === 'MixColumns' && (
                          <CheckCircle2 size={16} className="text-green-500" />
                        )}
                        {quizAnswers[2] === option && option !== 'MixColumns' && (
                          <XCircle size={16} className="text-red-500" />
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 3 */}
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                    3. What is the block size of AES?
                  </p>
                  <div className="space-y-2">
                    {['64 bits', '128 bits', '192 bits', '256 bits'].map((option) => (
                      <label key={option} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="q3"
                          value={option}
                          checked={quizAnswers[3] === option}
                          onChange={(e) => onQuizAnswer(3, e.target.value)}
                          className="w-4 h-4"
                        />
                        <span className={`text-sm ${quizAnswers[3] === option ? 'font-semibold text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300'}`}>
                          {option}
                        </span>
                        {quizAnswers[3] === option && option === '128 bits' && (
                          <CheckCircle2 size={16} className="text-green-500" />
                        )}
                        {quizAnswers[3] === option && option !== '128 bits' && (
                          <XCircle size={16} className="text-red-500" />
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Puzzle size={18} className="text-emerald-500" />
                Build the AES Flow
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                Drag the components to build the correct AES encryption flow (one complete round + final round):
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Drop Zones */}
                <div className="lg:col-span-2 space-y-3">
                  {dropZones.map((zone) => (
                    <div
                      key={zone.id}
                      onDragOver={handleDragOver}
                      onDrop={() => handleDrop(zone.id)}
                      className={`p-4 rounded-lg border-2 border-dashed transition-all ${
                        zone.filled
                          ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-400 dark:border-emerald-600'
                          : 'bg-slate-50 dark:bg-slate-700 border-slate-300 dark:border-slate-600 hover:border-emerald-400 dark:hover:border-emerald-600'
                      }`}
                    >
                      {zone.filled && zone.filledWith ? (
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                            {zone.filledWith}
                          </span>
                          <button
                            onClick={() => handleRemoveFromZone(zone.id)}
                            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <p className="text-xs text-slate-500 dark:text-slate-400">Drop here: {zone.label}</p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Draggable Items */}
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-3">Components:</p>
                  {dragItems.map((item) => {
                    const isUsed = dropZones.some((zone) => zone.filledWith === item.label);
                    return (
                      <div
                        key={item.id}
                        draggable={!isUsed}
                        onDragStart={() => handleDragStart(item)}
                        className={`p-3 rounded-lg border text-xs font-semibold cursor-move transition-all ${
                          isUsed
                            ? 'bg-slate-100 dark:bg-slate-700 border-slate-300 dark:border-slate-600 text-slate-400 dark:text-slate-500 opacity-50 cursor-not-allowed'
                            : 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-400 dark:border-emerald-600 text-emerald-900 dark:text-emerald-100 hover:bg-emerald-200 dark:hover:bg-emerald-900/50'
                        }`}
                      >
                        {item.label}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Feedback */}
              {dropZones.every((zone) => zone.filled) && (
                <div className={`mt-6 p-4 rounded-lg ${isPuzzleCorrect ? 'bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-700' : 'bg-amber-50 dark:bg-amber-900/20 border border-amber-300 dark:border-amber-700'}`}>
                  <p className={`text-sm font-semibold ${isPuzzleCorrect ? 'text-green-900 dark:text-green-100' : 'text-amber-900 dark:text-amber-100'}`}>
                    {isPuzzleCorrect ? '✅ Correct! You understand the AES flow!' : '❌ Try again - check the order'}
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

  return <div className="space-y-6">{renderStep()}</div>;
}

import { useState } from 'react';
import { Zap, Grid3x3, Shuffle, Lock, CheckCircle2, Puzzle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Level2Props {
  currentStep: number; // 0-7
  onNext: () => void;
  onPrevious: () => void;
  onPermutationTrigger: () => void;
  permutationAnimated: boolean;
  selectedRound: number;
  onRoundChange: (round: number) => void;
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

export function Level2({
  currentStep,
  onNext,
  onPrevious,
  onPermutationTrigger,
  permutationAnimated,
  selectedRound,
  onRoundChange,
  quizAnswers,
  onQuizAnswer,
}: Level2Props) {
  const [draggedItem, setDraggedItem] = useState<DragItem | null>(null);
  const [dropZones, setDropZones] = useState<DropZone[]>([
    { id: 'zone1', label: 'Initial Permutation', filled: false },
    { id: 'zone2', label: 'Split L0/R0', filled: false },
    { id: 'zone3', label: '16 Feistel Rounds', filled: false },
    { id: 'zone4', label: 'Swap Halves', filled: false },
    { id: 'zone5', label: 'Final Permutation', filled: false },
  ]);

  const dragItems: DragItem[] = [
    { id: 'item1', label: 'Initial Permutation' },
    { id: 'item2', label: 'Split into L and R' },
    { id: 'item3', label: '16-Round Feistel Network' },
    { id: 'item4', label: 'Swap Halves' },
    { id: 'item5', label: 'Final Permutation' },
  ];

  const correctMapping: Record<string, string> = {
    'zone1': 'Initial Permutation',
    'zone2': 'Split into L and R',
    'zone3': '16-Round Feistel Network',
    'zone4': 'Swap Halves',
    'zone5': 'Final Permutation',
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
                Input & Initial Permutation
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-4">
                DES starts with a 64-bit input block. The first step is an <strong>initial permutation</strong> that reorders all the bits according to a fixed pattern.
              </p>

              {/* Bit Grid Visualization */}
              <div className="mb-6">
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">64-bit input block:</p>
                <div className="grid grid-cols-8 gap-1 mb-4">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-6 h-6 flex items-center justify-center text-xs font-semibold rounded transition-all duration-500 ${
                        permutationAnimated
                          ? 'bg-indigo-500 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {i % 10}
                    </div>
                  ))}
                </div>

                <Button
                  onClick={onPermutationTrigger}
                  variant="outline"
                  className="w-full"
                >
                  {permutationAnimated ? 'Reset' : 'Click to Permute'}
                </Button>
              </div>

              <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded p-3 border border-indigo-200 dark:border-indigo-800">
                <p className="text-xs text-indigo-900 dark:text-indigo-100">
                  <strong>Permutation:</strong> Rearranging bits doesn't change their values, but it spreads the input across the algorithm, making patterns harder to detect.
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
                Split into Halves
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                After the initial permutation, the 64-bit block is split into two 32-bit halves: <strong>Left (L₀)</strong> and <strong>Right (R₀)</strong>.
              </p>

              {/* Visual Split */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Left Half (L₀) - 32 bits:</p>
                  <div className="grid grid-cols-8 gap-1">
                    {Array.from({ length: 32 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 flex items-center justify-center text-xs font-semibold rounded bg-indigo-200 dark:bg-indigo-700 text-indigo-900 dark:text-indigo-100"
                      >
                        {i % 10}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Right Half (R₀) - 32 bits:</p>
                  <div className="grid grid-cols-8 gap-1">
                    {Array.from({ length: 32 }).map((_, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 flex items-center justify-center text-xs font-semibold rounded bg-sky-200 dark:bg-sky-700 text-sky-900 dark:text-sky-100"
                      >
                        {i % 10}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-sky-50 dark:bg-sky-900/20 rounded p-3 border border-sky-200 dark:border-sky-800">
                <p className="text-xs text-sky-900 dark:text-sky-100">
                  <strong>Why split?</strong> DES uses the Feistel network, which processes one half at a time, making it efficient and reversible.
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
                <Zap size={18} className="text-violet-500" />
                Feistel Round Animation
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                DES applies <strong>16 rounds</strong> of the Feistel function. Each round transforms the data using a round key derived from the main key.
              </p>

              {/* Round Slider */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-slate-900 dark:text-white mb-2 block">
                  Round: {selectedRound}
                </label>
                <input
                  type="range"
                  min="1"
                  max="16"
                  value={selectedRound}
                  onChange={(e) => onRoundChange(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Feistel Formula */}
              <div className="bg-violet-50 dark:bg-violet-900/20 rounded p-4 border border-violet-200 dark:border-violet-800 mb-6">
                <p className="text-xs text-violet-900 dark:text-violet-100 font-mono">
                  L<sub>i</sub> = R<sub>i-1</sub>
                  <br />
                  R<sub>i</sub> = L<sub>i-1</sub> ⊕ F(R<sub>i-1</sub>, K<sub>i</sub>)
                </p>
              </div>

              <div className="bg-slate-100 dark:bg-slate-700 rounded p-4">
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  <strong>Round {selectedRound}:</strong> The right half is processed through the F-function with the round key, then XORed with the left half. The halves are then swapped for the next round.
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
                Inside the F-Function
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                The F-function is the heart of DES. It takes the right half and a round key, then applies four operations:
              </p>

              {/* F-Function Steps */}
              <div className="space-y-3">
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded p-3 border border-orange-200 dark:border-orange-800">
                  <p className="text-xs font-semibold text-orange-900 dark:text-orange-100 mb-1">1️⃣ Expansion</p>
                  <p className="text-xs text-orange-800 dark:text-orange-200">32-bit input → 48-bit output (bits are duplicated at boundaries)</p>
                </div>

                <div className="bg-red-50 dark:bg-red-900/20 rounded p-3 border border-red-200 dark:border-red-800">
                  <p className="text-xs font-semibold text-red-900 dark:text-red-100 mb-1">2️⃣ XOR with Round Key</p>
                  <p className="text-xs text-red-800 dark:text-red-200">48-bit expanded value ⊕ 48-bit round key</p>
                </div>

                <div className="bg-pink-50 dark:bg-pink-900/20 rounded p-3 border border-pink-200 dark:border-pink-800">
                  <p className="text-xs font-semibold text-pink-900 dark:text-pink-100 mb-1">3️⃣ S-Box Substitution</p>
                  <p className="text-xs text-pink-800 dark:text-pink-200">48 bits → 32 bits (nonlinear substitution using lookup tables)</p>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 rounded p-3 border border-purple-200 dark:border-purple-800">
                  <p className="text-xs font-semibold text-purple-900 dark:text-purple-100 mb-1">4️⃣ Permutation</p>
                  <p className="text-xs text-purple-800 dark:text-purple-200">32 bits are rearranged according to a fixed pattern</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Shuffle size={18} className="text-cyan-500" />
                Swap & Final Permutation
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                After 16 rounds, the left and right halves are <strong>swapped</strong>, then the entire 64-bit block undergoes a <strong>final permutation</strong> to produce the ciphertext.
              </p>

              {/* Merge Visualization */}
              <div className="space-y-4 mb-6">
                <div className="bg-slate-100 dark:bg-slate-700 rounded p-4">
                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 font-semibold">After 16 Rounds:</p>
                  <div className="flex gap-2 mb-3">
                    <div className="flex-1 bg-indigo-300 dark:bg-indigo-600 rounded p-2 text-center">
                      <p className="text-xs font-semibold text-indigo-900 dark:text-indigo-100">L₁₆</p>
                    </div>
                    <div className="flex-1 bg-sky-300 dark:bg-sky-600 rounded p-2 text-center">
                      <p className="text-xs font-semibold text-sky-900 dark:text-sky-100">R₁₆</p>
                    </div>
                  </div>
                </div>

                <div className="text-center text-xs text-slate-500 dark:text-slate-400">↓ Swap Halves ↓</div>

                <div className="bg-slate-100 dark:bg-slate-700 rounded p-4">
                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 font-semibold">After Swap:</p>
                  <div className="flex gap-2 mb-3">
                    <div className="flex-1 bg-sky-300 dark:bg-sky-600 rounded p-2 text-center">
                      <p className="text-xs font-semibold text-sky-900 dark:text-sky-100">R₁₆</p>
                    </div>
                    <div className="flex-1 bg-indigo-300 dark:bg-indigo-600 rounded p-2 text-center">
                      <p className="text-xs font-semibold text-indigo-900 dark:text-indigo-100">L₁₆</p>
                    </div>
                  </div>
                </div>

                <div className="text-center text-xs text-slate-500 dark:text-slate-400">↓ Final Permutation ↓</div>

                <div className="bg-cyan-100 dark:bg-cyan-900/30 rounded p-4 border border-cyan-300 dark:border-cyan-700">
                  <p className="text-xs font-semibold text-cyan-900 dark:text-cyan-100">Ciphertext (64 bits)</p>
                </div>
              </div>

              <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded p-3 border border-cyan-200 dark:border-cyan-800">
                <p className="text-xs text-cyan-900 dark:text-cyan-100">
                  <strong>Final Permutation:</strong> The inverse of the initial permutation, ensuring the output is properly scrambled.
                </p>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4">Mini Quiz</h4>

              <div className="space-y-6">
                {/* Question 1 */}
                <div className="border-b border-slate-200 dark:border-slate-600 pb-4">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                    1. How many rounds does DES perform?
                  </p>
                  <div className="space-y-2">
                    {['8', '16', '32', '64'].map((option) => (
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
                        {quizAnswers[1] === option && option === '16' && (
                          <CheckCircle2 size={16} className="text-green-500" />
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 2 */}
                <div className="border-b border-slate-200 dark:border-slate-600 pb-4">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                    2. Is DES symmetric encryption?
                  </p>
                  <div className="space-y-2">
                    {['Yes', 'No'].map((option) => (
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
                        {quizAnswers[2] === option && option === 'Yes' && (
                          <CheckCircle2 size={16} className="text-green-500" />
                        )}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 3 */}
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                    3. What is the main advantage of the Feistel network?
                  </p>
                  <div className="space-y-2">
                    {['Speed', 'Reversibility', 'Simplicity', 'All of the above'].map((option) => (
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
                        {quizAnswers[3] === option && option === 'Reversibility' && (
                          <CheckCircle2 size={16} className="text-green-500" />
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 border border-slate-200 dark:border-slate-700">
              <h4 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Puzzle size={18} className="text-emerald-500" />
                Build the DES Flow
              </h4>

              <p className="text-sm text-slate-700 dark:text-slate-300 mb-6">
                Drag the components from the right to build the correct DES encryption flow:
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
                          <div className="flex items-center gap-2">
                            <CheckCircle2 size={18} className="text-emerald-500" />
                            <span className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">
                              {zone.filledWith}
                            </span>
                          </div>
                          <button
                            onClick={() => handleRemoveFromZone(zone.id)}
                            className="text-xs text-emerald-600 dark:text-emerald-400 hover:underline"
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
                    {isPuzzleCorrect ? '✅ Correct! You understand the DES flow!' : '❌ Try again - check the order'}
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

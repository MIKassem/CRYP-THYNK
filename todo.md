# CryptoTutor TODO

## Level 1 - Beginner Concepts
- [x] What is Encryption? (visual transformation animation with lock icon)
- [x] Symmetric Encryption (encrypt/decrypt flow with interactive button)
- [x] DES in Context (historical timeline with 1977, 1998, 2001 milestones)
- [x] Smooth transitions between Level 1 steps

## Level 2 - How DES Works
- [x] Input & Initial Permutation (64-bit grid visualization with animation)
- [x] Split into Halves (L0 and R0 visualization)
- [x] Feistel Rounds (animated flowchart with round slider 1-16)
- [x] Inside the F-Function (expansion, XOR, S-box, permutation breakdown)
- [x] Final Permutation (merge and reshuffle animation)
- [x] Knowledge Check Quiz (3 MCQ questions with instant feedback)
- [x] Completion Card (summary and next steps)

## Design & Styling
- [x] Modern calm aesthetic (Coursera/Brilliant style)
- [x] Light mode: indigo-50 to sky-100 gradient
- [x] Dark mode: gray-900 to indigo-950 gradient
- [x] Smooth animations and transitions
- [x] Responsive design (mobile and desktop)
- [x] Tailwind CSS + shadcn/ui components
- [x] Lucide React icons (Lock, Key, ArrowRight, Brain, etc.)

## Component Structure
- [x] Enhanced useLessonState hook (supports two levels)
- [x] Level1.tsx component (3 steps with interactions)
- [x] Level2.tsx component (7 steps with visualizations)
- [x] Updated DESLesson.tsx (orchestrates both levels)
- [x] InteractiveLessonBox wrapper (unchanged)

## Testing & Verification
- [x] Level 1 encryption animation works
- [x] Level 1 decryption animation works
- [x] Level 1 historical timeline displays correctly
- [x] Level 2 permutation animation works
- [x] Theme toggle works in both levels
- [x] Progress indicators update correctly
- [x] Navigation between steps works smoothly
- [x] All interactive elements are responsive

## Known Features (Preserved from Previous Version)
- [x] Chat interface with message bubbles
- [x] Theme toggle (light/dark mode)
- [x] Message composer with multiline support
- [x] Typing indicator animation
- [x] Auto-scroll to latest message
- [x] Message fade/slide-in animations


## Bug Fixes & Improvements
- [ ] Remove duplicate Back/Next button pairs (keep only one pair)
- [ ] Fix lesson getting stuck after completion (should close/reset)
- [ ] Fix chat input scrolling (should start from bottom)
- [ ] Add full DES workflow visualization before quiz
- [ ] Fix error appearing when starting DES lesson

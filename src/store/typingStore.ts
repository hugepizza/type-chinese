import { create } from "zustand";
import { Word } from "../pages/typing/TypingContent";

type TypingStatus = "NOT_STARTED" | "PAUSED" | "TYPING";
export type TypingRecord = {
  duration: number;
  keystrokes: number;
  accuracy: number;
  inaccuracy: number;
  words: number;
  inaccuracyWords: string[];
  plan: number;
  startTime: Date | null;
  textbook: string;
};

export type Typing = TypingRecord & {
  status: TypingStatus;
  wordsList: Word[];
  reset: () => void;
  setStartTime: (v: Date | null) => void;
  setDuration: (v: number) => void;
  incKeystrokes: () => void;
  incAccuracy: () => void;
  incInaccuracy: () => void;
  incWords: () => void;
  setPlan: (v: number) => void;
  setTextbook: (v: string) => void;
  setStatus: (v: TypingStatus) => void;
  setWordsList: (v: Word[]) => void;
  pushAnaccuracyWords: (word: string) => void;
};

const useTypingStore = create<Typing>()((set) => ({
  status: "NOT_STARTED",
  duration: 0,
  keystrokes: 0,
  accuracy: 0,
  inaccuracy: 0,
  words: 0,
  inaccuracyWords: [],
  plan: 50,
  startTime: null,
  textbook: "",
  wordsList: [],
  reset: () =>
    set((state) => ({
      duration: 0,
      keystrokes: 0,
      accuracy: 0,
      inaccuracy: 0,
      words: 0,
      inaccuracyWords: [],
      plan: state.plan,
      textbook: state.textbook,
      startTime: null,
    })),
  setStatus: (status: TypingStatus) => set(() => ({ status })),
  setStartTime: (startAt: Date | null) => set(() => ({ startTime: startAt })),
  setDuration: (duration: number) => set(() => ({ duration })),
  incKeystrokes: () => set((state) => ({ keystrokes: state.keystrokes + 1 })),
  incAccuracy: () => set((state) => ({ accuracy: state.accuracy + 1 })),
  incInaccuracy: () => set((state) => ({ inaccuracy: state.inaccuracy + 1 })),
  incWords: () => set((state) => ({ words: state.words + 1 })),
  setPlan: (plan: number) => set(() => ({ plan })),
  setTextbook: (textbook: string) => set(() => ({ textbook })),
  setWordsList: (wordsList: Word[]) => set(() => ({ wordsList })),
  pushAnaccuracyWords: (word: string) =>
    set((state) => ({ inaccuracyWords: state.inaccuracyWords.concat(word) })),
}));

export default useTypingStore;

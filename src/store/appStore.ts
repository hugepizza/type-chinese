import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { subscribeWithSelector } from "zustand/middleware";

export type TypingState = {
  duration: number;
  keystrokes: number;
  accuracy: number;
  inaccuracy: number;
  words: number;
  inaccuracyWords: string[];
};

export type Textbook = {
  name: string;
  path: string;
};

export type AppState = {
  skipSpace: boolean;
  showTone: boolean;
  memoryMode: boolean;
  currentTextbook: Textbook;
  textbooks: Textbook[];

  toggleSkipSpace: () => void;
  toggleShowTone: () => void;
  toggleMemoryMode: () => void;
  setTextbooks: (books: Textbook[]) => void;
  setCurrentTextbook: (book: Textbook) => void;
};

const useAppStore = create<AppState>()(
  // subscribeWithSelector(() => ({ paw: true, snout: true, fur: true })),
  subscribeWithSelector(
    immer((set) => ({
      skipSpace: true,
      showTone: true,
      memoryMode: false,
      textbooks: [
        {
          name: "HKS1",
          path: "https://pub-f5fecce066d5492698e57a84754d6aae.r2.dev/hsk/1.json",
        },
        {
          name: "HKS2",
          path: "https://pub-f5fecce066d5492698e57a84754d6aae.r2.dev/hsk/2.json",
        },
        {
          name: "HKS3",
          path: "https://pub-f5fecce066d5492698e57a84754d6aae.r2.dev/hsk/3.json",
        },
        {
          name: "HKS4",
          path: "https://pub-f5fecce066d5492698e57a84754d6aae.r2.dev/hsk/4.json",
        },
        {
          name: "HKS5",
          path: "https://pub-f5fecce066d5492698e57a84754d6aae.r2.dev/hsk/5.json",
        },
        {
          name: "HKS6",
          path: "https://pub-f5fecce066d5492698e57a84754d6aae.r2.dev/hsk/6.json",
        },
      ],
      currentTextbook: {
        name: "HKS1",
        path: "https://pub-f5fecce066d5492698e57a84754d6aae.r2.dev/hsk/1.json",
      },

      toggleSkipSpace: () =>
        set((state) => {
          state.skipSpace = !state.skipSpace;
        }),

      toggleShowTone: () =>
        set((state) => {
          state.showTone = !state.showTone;
        }),

      toggleMemoryMode: () =>
        set((state) => {
          state.memoryMode = !state.memoryMode;
        }),

      setTextbooks: (textbooks: Textbook[]) =>
        set((state) => {
          state.textbooks = textbooks;
        }),

      setCurrentTextbook: (textbook: Textbook) =>
        set((state) => {
          state.currentTextbook = textbook;
        }),
    }))
  )
);

export default useAppStore;

import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { subscribeWithSelector } from "zustand/middleware";

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

const useSettingStore = create<AppState>()(
  // subscribeWithSelector(() => ({ paw: true, snout: true, fur: true })),
  subscribeWithSelector(
    immer((set) => ({
      skipSpace: true,
      showTone: true,
      memoryMode: false,
      textbooks: [
        {
          name: "HKS1",
          path: "https://book.typechinese.online/hsk/1.json",
        },
        {
          name: "HKS2",
          path: "https://book.typechinese.online/hsk/2.json",
        },
        {
          name: "HKS3",
          path: "https://book.typechinese.online/hsk/3.json",
        },
        {
          name: "HKS4",
          path: "https://book.typechinese.online/hsk/4.json",
        },
        {
          name: "HKS5",
          path: "https://book.typechinese.online/hsk/5.json",
        },
        {
          name: "HKS6",
          path: "https://book.typechinese.online/hsk/6.json",
        },
      ],
      currentTextbook: {
        name: "HKS1",
        path: "https://book.typechinese.online/hsk/1.json",
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

export default useSettingStore;

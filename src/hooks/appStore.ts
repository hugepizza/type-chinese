import { create } from "zustand";

export type Config = {
  skipSpace: boolean;
  showTone: boolean;
  currentTextbook: Textbook;
  textbooks: Textbook[];
};

export type State = {
  duration: number;
  keystrokes: number;
  accuracy: number;
  inaccuracy: number;
  words: number;
};

export type Textbook = {
  name: string;
  path: string;
};

export type AppState = {
  config: Config;
  setConfigField: (field: Partial<Config>) => void;
  toggleSkipSpace: () => void;
  toggleShowTone: () => void;
  setTextbooks: (books: Textbook[]) => void;
  setCurrentTextbook: (book: Textbook) => void;
};

const useAppStore = create<AppState>()((set) => ({
  config: {
    skipSpace: true,
    showTone: true,
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
  } as Config,

  toggleSkipSpace: () =>
    set((state) => ({
      ...state,
      config: {
        ...state.config,
        skipSpace: !state.config.skipSpace,
      },
    })),
  toggleShowTone: () =>
    set((state) => ({
      ...state,
      config: {
        ...state.config,
        showTone: !state.config.showTone,
      },
    })),

  setTextbooks: (textbooks: Textbook[]) =>
    set((state) => ({
      ...state,
      config: { ...state.config, textbooks: textbooks },
    })),

  setCurrentTextbook: (textbook: Textbook) =>
    set((state) => ({
      ...state,
      config: { ...state.config, currentTextbook: textbook },
    })),

  setConfigField: (field: Partial<Config>) =>
    set((state) => ({ ...state, config: { ...state.config, ...field } })),
}));

export default useAppStore;

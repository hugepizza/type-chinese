import { create } from "zustand";

export type Config = {
  skipSpace: boolean;
  showTone: boolean;
};

export type State = {
  duration: number;
  keystrokes: number;
  accuracy: number;
  inaccuracy: number;
};

export type AppState = {
  config: Config;
  setConfigField: (field: Partial<Config>) => void;
  toggleSkipSpace: () => void;
  toggleShowTone: () => void;
};

const useAppStore = create<AppState>()((set) => ({
  config: {
    skipSpace: true,
    showTone: true,
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

  setConfigField: (field: Partial<Config>) =>
    set((state) => ({ ...state, config: { ...state.config, ...field } })),
}));

export default useAppStore;

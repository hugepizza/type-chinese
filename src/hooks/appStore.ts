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
  state: State;
  config: Config;
  pause: () => void;
  resume: () => void;

  setConfigField: (field: Partial<Config>) => void;
  setStateField: (field: Partial<State>) => void;
  setPause: (f: () => void) => void;
  setResume: (f: () => void) => void;
  toggleSkipSpace: () => void;
  toggleShowTone: () => void;
  incrStateKeystrokes: () => void;
  incrStateAccuracy: () => void;
  incrStateInaccuracy: () => void;
};

const useAppStore = create<AppState>()((set) => ({
  config: {
    skipSpace: true,
    showTone: true,
  } as Config,
  state: {
    duration: 0,
    keystrokes: 0,
    accuracy: 0,
    inaccuracy: 0,
  } as State,
  pause: () => {},
  resume: () => {},

  setPause: (f: () => void) => set(() => ({ pause: f })),
  setResume: (f: () => void) => set(() => ({ resume: f })),

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
        skipSpace: !state.config.skipSpace,
      },
    })),
  incrStateKeystrokes: () =>
    set((rootState) => ({
      ...rootState,
      state: { ...rootState.state, keystrokes: ++rootState.state.keystrokes },
    })),
  incrStateAccuracy: () =>
    set((rootState) => ({
      ...rootState,
      state: { ...rootState.state, accuracy: ++rootState.state.accuracy },
    })),
  incrStateInaccuracy: () =>
    set((rootState) => ({
      ...rootState,
      state: { ...rootState.state, inaccuracy: ++rootState.state.inaccuracy },
    })),

  setConfigField: (field: Partial<Config>) =>
    set((state) => ({ ...state, config: { ...state.config, ...field } })),
  setStateField: (field: Partial<State>) =>
    set((state) => ({ ...state, state: { ...state.state, ...field } })),
}));

export default useAppStore;

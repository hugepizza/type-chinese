import { createContext } from "react";

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

export type ContextType = {
  state: State;
  setState: React.Dispatch<React.SetStateAction<State>>;
  config: Config;
  setConfig: React.Dispatch<React.SetStateAction<Config>>;
  pause: () => void;
  resume: () => void;
  // end: () => void;
};

const AppContext = createContext({
  config: {} as Config,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setConfig: (_: Config) => {},
  state: {} as State,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setState: (_: State) => {},
  pause: () => {},
  resume: () => {},
  // end: () => {},
} as ContextType);

export default AppContext;

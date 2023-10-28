import "./App.css";
import data from "./assets/hsk/1.json";

import { pinyin } from "pinyin-pro";
import Typing, { Letter, Word } from "./components/typing/Typing";
import ControlPanel from "./components/controlPanel/ControlPanel";
import { useEffect, useState } from "react";
import AppContext, { Config, State } from "./context/AppContext";
import StatePanel from "./components/statePanel/StatePanel";
import Footer from "./components/layout/Footer";
import useTimer from "./hooks/useTimer";

function App() {
  const [config, setConfig] = useState<Config>({
    skipSpace: true,
    showTone: true,
  });
  const { duration, pause, resume } = useTimer();
  const [state, setState] = useState<State>({
    duration: duration,
    keystrokes: 0,
    accuracy: 0,
    inaccuracy: 0,
  });

  useEffect(() => {
    setState((prevState) => ({ ...prevState, duration: duration }));
  }, [duration]);

  const [content, setContent] = useState<Word[]>([]);
  useEffect(() => {
    const segs = data.data.map((word) => ({ cn: word.cn, en: word.en }));
    const words: Word[] = segs.map((seg) => {
      const keys = pinyin(seg.cn, { toneType: "none" }).split("");
      const holder = pinyin(seg.cn).split("");
      const letters: Letter[] = keys.map((ele, index) => ({
        key: ele,
        holder: holder[index],
      }));
      return {
        pingyin: letters,
        chinese: seg.cn,
        english: seg.en,
      };
    });
    setContent(words);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <AppContext.Provider
        value={{
          config,
          setConfig,
          state,
          setState,
          pause,
          resume,
        }}
      >
        <main className="flex flex-col flex-grow justify-center items-center">
          <ControlPanel />
          {content.length > 0 && <Typing rawWords={content} />}
          <StatePanel />
        </main>
        <Footer />
      </AppContext.Provider>
    </div>
  );
}

export default App;

import "./App.css";
import data from "./assets/hsk/1.json";

import { pinyin } from "pinyin-pro";
import Typing, { Letter, Word } from "./components/typing/Typing";
import ControlPanel from "./components/controlPanel/ControlPanel";
import { useEffect, useState } from "react";
import AppContext, { Config, State } from "./context/configContext";
import StatePanel from "./components/statePanel/StatePanel";
import Footer from "./components/layout/Footer";

function App() {
  const [startTime] = useState<Date>(new Date());
  const [config, setConfig] = useState<Config>({
    skipSpace: true,
    showTone: true,
  });
  const [state, setState] = useState<State>({
    duration: 0,
    keystrokes: 0,
    accuracy: 0,
    inaccuracy: 0,
  });
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

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const duration = Math.floor((now.getTime() - startTime.getTime()) / 1000);
      setState((prev) => ({ ...prev, duration }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <AppContext.Provider value={{ config, setConfig, state, setState }}>
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

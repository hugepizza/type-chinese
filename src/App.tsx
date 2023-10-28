import "./App.css";
import data from "./assets/hsk/1.json";

import { pinyin } from "pinyin-pro";
import TypingPanel from "./components/typing/TypingPanel";
import ControlPanel from "./components/controlPanel/ControlPanel";
import { useEffect, useState } from "react";
import Footer from "./components/layout/Footer";
import { Letter, Word } from "./components/typing/TypingContent";

function App() {
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
      <main className="flex flex-col flex-grow justify-center items-center">
        <ControlPanel />
        {content.length > 0 && <TypingPanel rawWords={content} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;

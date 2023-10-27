import "./App.css";
import data from "./assets/hsk/1.json";

import { pinyin } from "pinyin-pro";
import Typing, { Letter, Word } from "./components/typing/Typing";
import ControlPanel from "./components/controlPanel/ControlPanel";
import { useEffect, useState } from "react";
import AppContext, { Config, State } from "./context/configContext";
import StatePanel from "./components/statePanel/StatePanel";

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
function Footer() {
  return (
    <footer className="footer items-center p-4 text-neutral-content">
      <aside className="items-center grid-flow-col">
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          className="fill-current"
        >
          <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
        </svg>
        <p>Copyright © 2023 - All right reserved</p>
      </aside>
      <nav className="grid-flow-col">
        <a href="https://github.com/hugepizza/type-chinese">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 96 96"
            className="fill-current"
          >
            <path d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" />
          </svg>
        </a>
        <a href="https:lei.cool">
          <svg
            height="24"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 491.398 491.398"
            className="fill-current"
          >
            <g>
              <g id="Icons_19_">
                <path
                  d="M481.765,220.422L276.474,15.123c-16.967-16.918-44.557-16.942-61.559,0.023L9.626,220.422
			c-12.835,12.833-12.835,33.65,0,46.483c12.843,12.842,33.646,12.842,46.487,0l27.828-27.832v214.872
			c0,19.343,15.682,35.024,35.027,35.024h74.826v-97.62c0-7.584,6.146-13.741,13.743-13.741h76.352
			c7.59,0,13.739,6.157,13.739,13.741v97.621h74.813c19.346,0,35.027-15.681,35.027-35.024V239.091l27.812,27.815
			c6.425,6.421,14.833,9.63,23.243,9.63c8.408,0,16.819-3.209,23.242-9.63C494.609,254.072,494.609,233.256,481.765,220.422z"
                />
              </g>
            </g>
          </svg>
        </a>
      </nav>
    </footer>
  );
}
export default App;

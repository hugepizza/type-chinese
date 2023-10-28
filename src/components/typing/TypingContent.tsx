import { useEffect, useRef, useState } from "react";
import "./styles.css";
import useAppStore, { State } from "../../hooks/appStore";
export type Letter = {
  key: string;
  holder: string;
};
export type Word = {
  pingyin: Letter[];
  chinese: string;
  english: string;
};
const inMonitoringKeys = (key: string) =>
  key.length === 1 &&
  ((key >= "A" && key <= "Z") || (key >= "a" && key <= "z") || key === " ");
const reset = (
  w: {
    pingyin: {
      state: string;
      key: string;
      holder: string;
    }[];
    chinese: string;
    english: string;
  },
  showTone: boolean
) => ({
  ...w,
  pingyin: w.pingyin.map((ele) => ({
    ...ele,
    holder: showTone ? ele.holder : ele.key,
    state: "pending",
  })),
});

// update holder while tone changed
// find tone from raw word
const changeTone = (
  w: {
    pingyin: {
      state: string;
      key: string;
      holder: string;
    }[];
    chinese: string;
    english: string;
  },
  word: Word,
  showTone: boolean
) => {
  const newc = {
    ...w,
    pingyin: w.pingyin.map((ele, index) => ({
      ...ele,
      holder: showTone ? word.pingyin[index].holder : word.pingyin[index].key,
    })),
  };

  return newc;
};

export default function TypingContent({
  rawWords,
  setState,
  pause,
  resume,
  isPaused,
}: {
  rawWords: Word[];
  setState: React.Dispatch<React.SetStateAction<State>>;
  pause: () => void;
  resume: () => void;
  isPaused: boolean;
}) {
  const {
    config: { skipSpace, showTone },
  } = useAppStore();
  const [shake, setShake] = useState(false);
  const content = rawWords.map((ele) => ({
    ...ele,
    pingyin: ele.pingyin.map((p) => ({
      ...p,
      holder: showTone ? p.holder : p.key,
      state: "pending",
    })),
  }));

  // cursor in words liet
  const [contentCursor, setContentCursor] = useState(0);
  // current word, use it to keep letters's state
  const [currentContent, setCurrentContent] = useState(content[contentCursor]);
  // cursor in pingyin list
  const [cursor, setCursor] = useState(0);

  // ref in call back
  const isPausedRef = useRef(isPaused);
  const cursorRef = useRef(cursor);
  const contentCursorRef = useRef(contentCursor);
  const currentContentRef = useRef(currentContent);
  const skipSpaceRef = useRef(skipSpace);
  const showToneRef = useRef(showTone);

  // update tone
  useEffect(() => {
    console.log("tone update", showTone);
    setCurrentContent((prev) =>
      changeTone(prev, rawWords[contentCursor], showTone)
    );
    showToneRef.current = showTone;
  }, [showTone]);

  useEffect(() => {
    console.log("skipSpace effect", skipSpace);

    skipSpaceRef.current = skipSpace;
  }, [skipSpace]);

  useEffect(() => {
    currentContentRef.current = currentContent;
  }, [currentContent]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    cursorRef.current = cursor;
  }, [cursor]);

  useEffect(() => {
    contentCursorRef.current = contentCursor;
  }, [contentCursor]);

  const handleKeyDown = (e: KeyboardEvent) => {
    e.stopPropagation();
    const typedKey = e.key;

    if (!isPausedRef.current) {
      if (typedKey === "Escape") {
        pause();
      }
      if (typedKey === "Tab") {
        setContentCursor(contentCursorRef.current + 1);
        setCurrentContent(content[contentCursorRef.current + 1]);
        setCursor(0);
        return;
      }
      if (!inMonitoringKeys(typedKey)) {
        return;
      }

      let expectedKey =
        currentContentRef.current.pingyin[cursorRef.current].key;
      console.log(
        "expected, typed",
        expectedKey === " " ? "space" : expectedKey,
        typedKey === " " ? "space" : typedKey
      );

      let tiggeredSkipSpace = false;
      let stepAfterCorrect = 1;
      // skip space
      // next cursor + 2
      // change one more letter color
      if (expectedKey === " " && skipSpaceRef.current) {
        expectedKey =
          currentContentRef.current.pingyin[cursorRef.current + 1].key;
        tiggeredSkipSpace = true;
        stepAfterCorrect = 2;
      }
      console.log(
        "after space, expected, typed",
        expectedKey === " " ? "space" : expectedKey,
        typedKey === " " ? "space" : typedKey
      );
      setState((prev) => ({ ...prev, keystrokes: ++prev.keystrokes }));
      // correct
      if (expectedKey === typedKey) {
        setState((prev) => ({ ...prev, accuracy: ++prev.accuracy }));
        // next letter
        setCurrentContent((prev) => ({
          ...prev,
          pingyin: prev.pingyin.map((ele, index) => {
            if (
              index <=
              (tiggeredSkipSpace ? cursorRef.current + 1 : cursorRef.current)
            ) {
              return { ...ele, state: "correct" };
            }
            return ele;
          }),
        }));
        setCursor(cursorRef.current + stepAfterCorrect);
        // next word
        if (
          cursorRef.current ===
          currentContentRef.current.pingyin.length - 1
        ) {
          setContentCursor(contentCursorRef.current + 1);
          setCurrentContent(content[contentCursorRef.current + 1]);
          setCursor(0);
        }
      } else {
        // wrong
        setState((prev) => ({ ...prev, inaccuracy: ++prev.inaccuracy }));
        setCursor(0);
        setShake(true);
        setTimeout(() => setShake(false), 100);
        setCurrentContent((prev) => reset(prev, showToneRef.current));
      }
    } else {
      resume();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <section className="my-32">
      <div className={`mb-4 ${shake ? "shake" : ""}`}>
        <h1>
          {currentContent.pingyin.map((ele, index) => (
            <span
              className={`${
                ele.state === "pending" ? "text-slate-400" : "text-black"
              } font-semibold`}
              key={ele.holder + index}
            >
              {ele.holder}
            </span>
          ))}
        </h1>
        <h1>{currentContent.chinese}</h1>
        <span className="text-3xl text-stone-400">
          {currentContent.english}
        </span>
      </div>
      <div className="read-the-docs">
        <div className="flex flex-col items-center">
          <p>
            <kbd className="kbd kbd-sm">ESC</kbd> to pause.
          </p>
          <p>
            <kbd className="kbd kbd-sm">Tab</kbd> to skip.
          </p>
        </div>
      </div>
    </section>
  );
}
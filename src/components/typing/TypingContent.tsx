import { useEffect, useRef, useState } from "react";
import "./styles.css";
import useAppStore, { State } from "../../hooks/appStore";
import Mask from "./Mask";
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

// update holder while tone changed
const changeTone = (words: Word[], showTone: boolean): Word[] => {
  return words.map((ele) => ({
    ...ele,
    pingyin: ele.pingyin.map((p) => ({
      ...p,
      holder: showTone ? p.holder : p.key,
    })),
  }));
};

export default function TypingContent({
  words,
  setState,
  pause,
  resume,
  end,
  start,
  typingStatus,
}: {
  words: Word[];
  setState: React.Dispatch<React.SetStateAction<State>>;
  pause: () => void;
  resume: () => void;
  end: () => void;
  start: () => void;
  typingStatus: "NOT_STARTED" | "PAUSED" | "TYPING";
}) {
  const {
    config: { skipSpace, showTone },
  } = useAppStore();
  // never change
  const [originalWords] = useState(words);

  const [shake, setShake] = useState(false);

  const [displayWords, setDisplayWords] = useState(
    changeTone(originalWords, showTone)
  );

  const [wordCursor, setWordCursor] = useState(0);

  const [letterCursor, setLetterCursor] = useState(0);

  // ref in call back
  const displayWordsRef = useRef(displayWords);
  const typingStatusRef = useRef(typingStatus);
  const letterCursorRef = useRef(letterCursor);
  const wordCursorRef = useRef(wordCursor);
  const skipSpaceRef = useRef(skipSpace);
  const showToneRef = useRef(showTone);

  // update tone
  useEffect(() => {
    console.log("tone update", showTone);
    setDisplayWords(changeTone(originalWords, showTone));
    showToneRef.current = showTone;
  }, [showTone]);

  useEffect(() => {
    skipSpaceRef.current = skipSpace;
  }, [skipSpace]);

  useEffect(() => {
    typingStatusRef.current = typingStatus;
  }, [typingStatus]);

  useEffect(() => {
    letterCursorRef.current = letterCursor;
    console.log("letterCursor changed");
  }, [letterCursor]);

  useEffect(() => {
    wordCursorRef.current = wordCursor;
  }, [wordCursor]);

  useEffect(() => {
    displayWordsRef.current = displayWords;
  }, [displayWords]);

  const handleKeyDown = (e: KeyboardEvent) => {
    e.stopPropagation();
    const typedKey = e.key;

    if (typingStatusRef.current === "NOT_STARTED") {
      if (typedKey === "Enter") {
        start();
      }
    } else if (typingStatusRef.current === "PAUSED") {
      if (typedKey === "Escape") {
        setLetterCursor(0);
        setWordCursor(0);
        end();
      }
      if (typedKey === "Enter") {
        resume();
      }
    } else if (typingStatusRef.current === "TYPING") {
      if (typedKey === "Escape") {
        pause();
      }
      if (typedKey === "Tab") {
        setWordCursor(wordCursorRef.current + 1);
        setLetterCursor(0);
        return;
      }
      if (!inMonitoringKeys(typedKey)) {
        return;
      }

      let expectedKey =
        displayWordsRef.current[wordCursorRef.current].pingyin[
          letterCursorRef.current
        ].key;
      console.log(
        "expected, typed",
        expectedKey === " " ? "space" : expectedKey,
        typedKey === " " ? "space" : typedKey
      );

      let stepAfterCorrect = 1;
      // skip space
      // next cursor + 2
      // change one more letter color
      if (expectedKey === " " && skipSpaceRef.current) {
        expectedKey =
          displayWordsRef.current[wordCursorRef.current].pingyin[
            letterCursorRef.current + 1
          ].key;

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
        setLetterCursor(letterCursorRef.current + stepAfterCorrect);
        // next word
        if (
          letterCursorRef.current ===
          displayWords[wordCursorRef.current].pingyin.length - 1
        ) {
          setState((prev) => ({ ...prev, words: ++prev.words }));
          setWordCursor(wordCursorRef.current + 1);
          setLetterCursor(0);
        }
      } else {
        // wrong
        setState((prev) => ({ ...prev, inaccuracy: prev.inaccuracy + 1 }));
        setLetterCursor(0);
        setShake(true);
        setTimeout(() => setShake(false), 100);
      }
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
      <div className={`relative ${shake ? "shake" : ""}`}>
        <Mask typingStatus={typingStatus} />
        <div>
          <h1>
            {displayWords[wordCursor].pingyin.map((ele, index) => (
              <span
                className={`${
                  letterCursor > index ? "text-black" : "text-slate-400"
                } font-semibold`}
                key={ele.holder + index}
              >
                {ele.holder}
              </span>
            ))}
          </h1>
          <h1>{displayWords[wordCursor].chinese}</h1>
          <span className="text-3xl text-stone-400">
            {displayWords[wordCursor].english}
          </span>
        </div>
      </div>
      <div className="read-the-docs">
        <div className="flex flex-col items-center">
          <p>
            Press<kbd className="kbd kbd-sm">ESC</kbd> to pause.
          </p>
          <p>
            Press<kbd className="kbd kbd-sm">Tab</kbd> to skip.
          </p>
        </div>
      </div>
    </section>
  );
}

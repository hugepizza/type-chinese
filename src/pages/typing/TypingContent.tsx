import { useCallback, useEffect, useRef, useState } from "react";
import "./styles.css";
import useSettingStore from "../../store/settingStore";
import Mask from "./mask/Mask";
import { useShallow } from "zustand/react/shallow";
import useTypingStore from "../../store/typingStore";
import useHistoryStore from "../../store/historyStore";
export type Letter = {
  key: string;
  tone: string;
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

export default function TypingContent({
  pause,
  resume,
  end,
  disrupt,
  start,
}: {
  pause: () => void;
  resume: () => void;
  end: () => void;
  disrupt: () => void;
  start: () => void;
}) {
  console.log("rerender");
  const {
    wordsList: words,
    status: typingStatus,
    plan: plan,
    incAccuracy,
    incInaccuracy,
    incKeystrokes,
    pushAnaccuracyWords,
    incWords,
  } = useTypingStore(
    useShallow((state) => ({
      wordsList: state.wordsList,
      status: state.status,
      plan: state.plan,
      incAccuracy: state.incAccuracy,
      incInaccuracy: state.incInaccuracy,
      incKeystrokes: state.incKeystrokes,
      pushAnaccuracyWords: state.pushAnaccuracyWords,
      incWords: state.incWords,
    }))
  );
  const { showTone, memoryMode } = useSettingStore(
    useShallow((state) => ({
      showTone: state.showTone,
      memoryMode: state.memoryMode,
    }))
  );

  const [shake, setShake] = useState(false);
  const [wordCursor, setWordCursor] = useState(0);
  const [letterCursor, setLetterCursor] = useState(0);

  const endCurrentTying = useCallback(() => {
    console.log("endCurrentTying");
    setLetterCursor(0);
    setWordCursor(0);
    useHistoryStore.getState().addHistory({ ...useTypingStore.getState() });
    useTypingStore.getState().reset();
    end();
  }, []);
  const disruptCurrentTying = useCallback(() => {
    console.log("disruptCurrentTying");
    setLetterCursor(0);
    setWordCursor(0);
    disrupt();
  }, []);

  // ref in call back
  const typingStatusRef = useRef(typingStatus);
  const letterCursorRef = useRef(letterCursor);
  const wordCursorRef = useRef(wordCursor);
  const wordsRef = useRef(words);
  const planRef = useRef(plan);

  // const skipSpace = useAppStore(useShallow((state) => state.skipSpace));
  const skipSpace = useSettingStore.getState().skipSpace;
  const skipSpaceRef = useRef(skipSpace);
  useEffect(() => {
    const unsubscribe = useSettingStore.subscribe(
      (state) => state.skipSpace,
      (newSkipSpace, prevSkipSpace) => {
        if (newSkipSpace !== prevSkipSpace) {
          skipSpaceRef.current = newSkipSpace;
        }
      }
    );
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    typingStatusRef.current = typingStatus;
  }, [typingStatus]);

  useEffect(() => {
    letterCursorRef.current = letterCursor;
  }, [letterCursor]);

  useEffect(() => {
    wordCursorRef.current = wordCursor;
  }, [wordCursor]);

  useEffect(() => {
    wordsRef.current = words;
    planRef.current = plan;
    disruptCurrentTying();
  }, [words, plan]);

  const handleKeyDown = (e: KeyboardEvent) => {
    e.stopPropagation();
    const typedKey = e.key;

    if (typingStatusRef.current === "NOT_STARTED") {
      if (typedKey === "Enter") {
        start();
      }
    } else if (typingStatusRef.current === "PAUSED") {
      if (typedKey === "Escape") {
        disruptCurrentTying();
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
        wordsRef.current[wordCursorRef.current].pingyin[letterCursorRef.current]
          .key;
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
          wordsRef.current[wordCursorRef.current].pingyin[
            letterCursorRef.current + 1
          ].key;

        stepAfterCorrect = 2;
      }
      console.log(
        "after space, expected, typed",
        expectedKey === " " ? "space" : expectedKey,
        typedKey === " " ? "space" : typedKey
      );

      incKeystrokes();
      // correct
      if (expectedKey === typedKey) {
        incAccuracy();
        // next letter
        setLetterCursor(letterCursorRef.current + stepAfterCorrect);
        // next word
        if (
          letterCursorRef.current ===
          wordsRef.current[wordCursorRef.current].pingyin.length - 1
        ) {
          incWords();
          if (wordCursorRef.current >= planRef.current - 1) {
            endCurrentTying();
          } else {
            setTimeout(() => {
              setWordCursor(wordCursorRef.current + 1);
              setLetterCursor(0);
            }, 180);
          }
        }
      } else {
        // wrong
        const word = wordsRef.current[wordCursorRef.current];
        pushAnaccuracyWords(word.chinese);
        incInaccuracy();
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
  if (words.length === 0) {
    return <section className="my-32 w-full"></section>;
  }

  return (
    <section className="my-32 w-full">
      <div className={`relative ${shake ? "shake" : ""}`}>
        <Mask typingStatus={typingStatus} />
        <div>
          <h1>
            {words[wordCursor].pingyin.map((ele, index) => (
              <span
                className={`${
                  letterCursor > index ? "text-black" : "text-slate-400"
                } font-semibold`}
                key={ele.tone + index}
              >
                {memoryMode && letterCursor <= index
                  ? ele.key === " "
                    ? " "
                    : "*"
                  : showTone
                  ? ele.tone
                  : ele.key}
              </span>
            ))}
          </h1>
          <h1>{words[wordCursor].chinese}</h1>
          <span className="text-3xl text-stone-400">
            {words[wordCursor].english}
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

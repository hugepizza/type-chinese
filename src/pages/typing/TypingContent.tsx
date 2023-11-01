import { useEffect, useRef, useState } from "react";
import "./styles.css";
import useAppStore, { TypingState } from "../../store/appStore";
import Mask from "./Mask";
import { produce } from "immer";
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
  words,
  setTypingState,
  pause,
  resume,
  end,
  disrupt,
  start,
  typingStatus,
}: {
  words: Word[];
  setTypingState: React.Dispatch<React.SetStateAction<TypingState>>;
  pause: () => void;
  resume: () => void;
  end: () => void;
  disrupt: () => void;
  start: () => void;
  typingStatus: "NOT_STARTED" | "PAUSED" | "TYPING";
}) {
  const {
    config: { skipSpace, showTone, memoryMode },
  } = useAppStore();

  const [shake, setShake] = useState(false);

  const [wordCursor, setWordCursor] = useState(0);

  const [letterCursor, setLetterCursor] = useState(0);

  const endCurrentTying = () => {
    console.log("endCurrentTying");
    setLetterCursor(0);
    setWordCursor(0);
    end();
  };

  const disruptCurrentTying = () => {
    console.log("disruptCurrentTying");
    setLetterCursor(0);
    setWordCursor(0);
    disrupt();
  };
  // ref in call back
  const typingStatusRef = useRef(typingStatus);
  const letterCursorRef = useRef(letterCursor);
  const wordCursorRef = useRef(wordCursor);
  const skipSpaceRef = useRef(skipSpace);
  const wordsRef = useRef(words);

  useEffect(() => {
    skipSpaceRef.current = skipSpace;
  }, [skipSpace]);

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
    disruptCurrentTying();
  }, [words]);

  const handleKeyDown = (e: KeyboardEvent) => {
    e.stopPropagation();
    const typedKey = e.key;

    if (typingStatusRef.current === "NOT_STARTED") {
      if (typedKey === "Enter") {
        start();
      }
    } else if (typingStatusRef.current === "PAUSED") {
      if (typedKey === "Escape") {
        endCurrentTying();
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
      setTypingState((prev) =>
        produce(prev, (draft) => {
          ++draft.keystrokes;
        })
      );
      // correct
      if (expectedKey === typedKey) {
        setTypingState((prev) =>
          produce(prev, (draft) => {
            ++draft.accuracy;
          })
        );
        // next letter
        setLetterCursor(letterCursorRef.current + stepAfterCorrect);
        // next word
        if (
          letterCursorRef.current ===
          wordsRef.current[wordCursorRef.current].pingyin.length - 1
        ) {
          setTimeout(() => {
            setTypingState((prev) =>
              produce(prev, (draft) => {
                ++draft.words;
              })
            );
            setWordCursor(wordCursorRef.current + 1);
            setLetterCursor(0);
          }, 180);
        }
      } else {
        // wrong
        setTypingState((prev) =>
          produce(prev, (draft) => {
            ++draft.inaccuracy;
          })
        );
        setTypingState((prev) =>
          produce(prev, (draft) => {
            const word = wordsRef.current[wordCursorRef.current];
            const index = draft.inaccuracyWords.findIndex(
              (ele) => ele === word.chinese
            );
            if (index === -1) {
              draft.inaccuracyWords.push(word.chinese);
            }
          })
        );

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

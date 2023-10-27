import { useContext, useEffect, useRef, useState } from "react";
import "./styles.css";
import AppContext from "../../context/configContext";
export type Letter = {
  key: string;
  holder: string;
};
export type Word = {
  pingyin: Letter[];
  chinese: string;
  english: string;
};

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

export default function Typing({ rawWords }: { rawWords: Word[] }) {
  const {
    config: { skipSpace, showTone },
    setState,
  } = useContext(AppContext);

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
  // control pause
  const [typing, setTyping] = useState(false);

  // ref in call back
  const typingRef = useRef(typing);
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
    typingRef.current = typing;
  }, [typing]);

  useEffect(() => {
    cursorRef.current = cursor;
  }, [cursor]);

  useEffect(() => {
    contentCursorRef.current = contentCursor;
  }, [contentCursor]);

  const handleKeyDown = (e: KeyboardEvent) => {
    e.stopPropagation();
    const typedKey = e.key;

    if (typingRef.current) {
      if (typedKey === "Escape") {
        setTyping(false);
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

      setState((prev) => ({ ...prev, keystrokes: prev.keystrokes + 1 }));
      // correct
      if (expectedKey === typedKey) {
        setState((prev) => ({ ...prev, accuracy: prev.accuracy + 1 }));
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
        setState((prev) => ({ ...prev, inaccuracy: prev.inaccuracy + 1 }));
        setCursor(0);
        setCurrentContent((prev) => reset(prev, showToneRef.current));
      }
    } else {
      setTyping(true);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <section className=" mb-24">
      <h1>
        {currentContent.pingyin.map((ele, index) => (
          <span
            className={`${
              ele.state === "pending" ? "text-slate-400" : "text-black"
            }`}
            key={ele.holder + index}
          >
            {ele.holder}
          </span>
        ))}
      </h1>
      <h1>{currentContent.chinese}</h1>
      <h3>{currentContent.english}</h3>
      <p className="read-the-docs">
        {typing ? (
          "typing..."
        ) : (
          <div className="flex flex-col justify-center items-center absolute w-screen h-screen left-0 top-0 z-40 bg-black opacity-80">
            <div className="flex justify-center gap-1 my-1 w-full">
              <kbd className="kbd">q</kbd>
              <kbd className="kbd">w</kbd>
              <kbd className="kbd">e</kbd>
              <kbd className="kbd">r</kbd>
              <kbd className="kbd">t</kbd>
              <kbd className="kbd">y</kbd>
              <kbd className="kbd">u</kbd>
              <kbd className="kbd">i</kbd>
              <kbd className="kbd">o</kbd>
              <kbd className="kbd">p</kbd>
            </div>
            <div className="flex justify-center gap-1 my-1 w-full">
              <kbd className="kbd">a</kbd>
              <kbd className="kbd">s</kbd>
              <kbd className="kbd">d</kbd>
              <kbd className="kbd">f</kbd>
              <kbd className="kbd">g</kbd>
              <kbd className="kbd">h</kbd>
              <kbd className="kbd">j</kbd>
              <kbd className="kbd">k</kbd>
              <kbd className="kbd">l</kbd>
            </div>
            <div className="flex justify-center gap-1 my-1 w-full">
              <kbd className="kbd">z</kbd>
              <kbd className="kbd">x</kbd>
              <kbd className="kbd">c</kbd>
              <kbd className="kbd">v</kbd>
              <kbd className="kbd">b</kbd>
              <kbd className="kbd">n</kbd>
              <kbd className="kbd">m</kbd>
              <kbd className="kbd">/</kbd>
            </div>
            <h1>press any key to start</h1>
          </div>
        )}
      </p>
    </section>
  );
}

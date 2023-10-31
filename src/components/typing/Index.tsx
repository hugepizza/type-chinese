import "./styles.css";
import TypingContent, { Word } from "./TypingContent";
import StatePanel from "./StatePanel";
import useTimer from "../../hooks/useTimer";

import { useEffect, useRef, useState } from "react";
import React from "react";

const EndupModal = React.lazy(() => import("./EndupModal"));

export default function TypingPanel({ words }: { words: Word[] }) {
  const { typingStatus, duration, pause, resume, end, start } = useTimer();
  const [popping, setPopping] = useState(false);

  const [state, setState] = useState({
    duration: 0,
    keystrokes: 0,
    accuracy: 0,
    inaccuracy: 0,
    words: 0,
  });
  const resetState = () => {
    setState({
      duration: 0,
      keystrokes: 0,
      accuracy: 0,
      inaccuracy: 0,
      words: 0,
    });
  };

  useEffect(() => {
    return () => {
      console.log("unmount");
    };
  }, []);

  useEffect(() => {
    setState((prev) => ({ ...prev, duration: duration }));
  }, [duration]);

  const poppingRef = useRef(popping);
  useEffect(() => {
    poppingRef.current = popping;
  }, [popping]);

  return (
    <section>
      <TypingContent
        {...{
          typingStatus,
          setState,
          words,
          pause,
          resume,
          start: () => {
            console.log("popping", poppingRef.current);
            if (poppingRef.current) {
              return;
            }
            start();
          },
          end: () => {
            setPopping(true);
            end();
            resetState();
          },
        }}
      />
      <StatePanel state={state} />
      <EndupModal state={state} visible={popping} setVisible={setPopping} />
    </section>
  );
}

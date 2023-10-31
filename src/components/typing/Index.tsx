import "./styles.css";
import TypingContent, { Word } from "./TypingContent";
import StatePanel from "./StatePanel";
import useTimer from "../../hooks/useTimer";

import { useEffect, useRef, useState } from "react";
import React from "react";
import { TypingState } from "../../store/appStore";
import useHistoryStore from "../../store/historyStore";

const EndupModal = React.lazy(() => import("./EndupModal"));

export default function TypingPanel({
  textbook,
  words,
}: {
  textbook: string;
  words: Word[];
}) {
  const { typingStatus, duration, pause, resume, end, start, startTime } =
    useTimer();
  const [popping, setPopping] = useState(false);
  const { addHistory } = useHistoryStore();
  const [state, setState] = useState<TypingState>({
    duration: 0,
    keystrokes: 0,
    accuracy: 0,
    inaccuracy: 0,
    words: 0,
    inaccuracyWords: [],
  });
  const resetState = () => {
    setState({
      duration: 0,
      keystrokes: 0,
      accuracy: 0,
      inaccuracy: 0,
      words: 0,
      inaccuracyWords: [],
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

  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  return (
    <section>
      <TypingContent
        {...{
          typingStatus,
          setTypingState: setState,
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
            const lastState = { ...stateRef.current };
            // console.log(state);
            // console.log(lastState);

            addHistory({
              ...lastState,
              textbook: textbook,
              startAt: startTime || new Date(),
            });
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

import "./styles.css";
import TypingContent, { Word } from "./TypingContent";
import StatePanel from "./StatePanel";
import PauseMask from "./PauseMask";
import useTimer from "../../hooks/useTimer";

import { useEffect, useState } from "react";

export default function TypingPanel({ rawWords }: { rawWords: Word[] }) {
  const { isPaused, duration, pause, resume } = useTimer();
  const [state, setState] = useState({
    duration: 0,
    keystrokes: 0,
    accuracy: 0,
    inaccuracy: 0,
  });

  useEffect(() => {
    setState((prev) => ({ ...prev, duration: duration }));
  }, [duration]);

  return (
    <section className="">
      <TypingContent {...{ isPaused, rawWords, pause, resume, setState }} />
      <StatePanel state={state} />
      {isPaused && <PauseMask />}
    </section>
  );
}

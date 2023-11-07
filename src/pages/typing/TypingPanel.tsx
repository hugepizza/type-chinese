import "./styles.css";
import TypingContent from "./TypingContent";
import useTimer from "../../hooks/useTimer";

import { useEffect, useRef, useState } from "react";
import React from "react";
import useTextbook from "../../hooks/useTextbook";

const EndupModal = React.lazy(() => import("./EndupModal"));

export default function TypingPanel() {
  useTextbook();
  const { pause, resume, end: endTimer, start: startTimer } = useTimer();
  const [popping, setPopping] = useState(false);
  const poppingRef = useRef(popping);
  useEffect(() => {
    poppingRef.current = popping;
  }, [popping]);

  return (
    <section className="w-full">
      <TypingContent
        {...{
          pause,
          resume,
          start: () => {
            if (poppingRef.current) {
              return;
            }
            startTimer();
          },
          disrupt: () => {
            // disrupt typing and drop data
            endTimer();
          },
          end: () => {
            setPopping(true);
            endTimer();
          },
        }}
      />
      <EndupModal visible={popping} setVisible={setPopping} />
    </section>
  );
}

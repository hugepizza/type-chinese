import { Controller, animated } from "@react-spring/web";
import { useRef, useState } from "react";

export default function AnimatedLetter({ letter }: { letter: string }) {
  const frictionValue = useRef(300);
  const [color, setColor] = useState("red");

  const ctrl = useRef(
    new Controller({ color: "red", config: { friction: 300 } })
  );
  ctrl.current.update({ color });

  const adjustFrictionValue = () => {
    frictionValue.current -= 200;
    ctrl.current.update({
      config: {
        friction: frictionValue.current,
      },
    });
  };

  return (
    <animated.span
      style={{ fontSize: "100px", ...ctrl.current.springs }}
      onClick={() => {
        setColor("blue");
      }}
    >
      {letter}
      <button onClick={adjustFrictionValue}></button>
    </animated.span>
  );
}

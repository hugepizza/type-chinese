import { useEffect, useState } from "react";
import useTypingStore from "../../../store/typingStore";
import { useShallow } from "zustand/react/shallow";

function useDebounced(input: number, delay: number) {
  const [content, setContent] = useState(input);
  useEffect(() => {
    const timer = setTimeout(() => {
      setContent(input);
      console.log("set debouncedPlan", input);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [input]);
  return content;
}
export default function NotStart() {
  const { setPlan, plan } = useTypingStore(
    useShallow((state) => ({
      setPlan: state.setPlan,
      plan: state.plan,
    }))
  );
  const [inputPlan, setInputPlan] = useState(plan);
  const [stepPlan, setStepPlan] = useState(plan);
  const debouncedPlan = useDebounced(inputPlan, 300);

  useEffect(() => {
    setInputPlan(stepPlan);
  }, [stepPlan]);

  useEffect(() => {
    console.log("set plan", debouncedPlan);

    setStepPlan(debouncedPlan);
    setPlan(debouncedPlan);
  }, [debouncedPlan]);

  return (
    <div className="flex flex-col space-y-4 w-full">
      <div className="flex flex-row w-full justify-center items-center space-x-2">
        <div className="flex flex-col w-full">
          <input
            type="range"
            min={1}
            max={100}
            value={stepPlan.toString()}
            className="range"
            step={5}
            onChange={(e) =>
              setStepPlan(parseInt(e.currentTarget.value, 10) || 1)
            }
          />

          <div className="w-full flex justify-between text-xs px-2">
            <span>1</span>
            <span>20</span>
            <span>40</span>
            <span>60</span>
            <span>80</span>
            <span>100</span>
          </div>
        </div>
        <input
          className=" w-24 border-none focus:border-none outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          type="number"
          value={inputPlan.toString()}
          onChange={(e) =>
            setInputPlan(parseInt(e.currentTarget.value, 10) || 1)
          }
        />
      </div>
      <span>Set A Plan</span>
      <div className="text-sm">
        Press<kbd className="kbd kbd-sm mx-2">Enter</kbd> to start
      </div>
    </div>
  );
}

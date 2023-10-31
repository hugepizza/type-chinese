import { useEffect, useState } from "react";
import { TypingState } from "../../store/appStore";

export default function EndupModal({
  state,
  visible,
  setVisible,
}: {
  state: TypingState;
  visible: boolean;
  setVisible: (v: boolean) => void;
}) {
  const [localState, setLocalState] = useState<TypingState | null>(null);

  useEffect(() => {
    if (
      state.duration === 0 &&
      state.keystrokes === 0 &&
      state.accuracy === 0 &&
      state.inaccuracy === 0
    ) {
      return;
    }
    setLocalState(state);
  }, [state]);
  return (
    <>
      <input
        type="checkbox"
        id="my_modal_6"
        className="modal-toggle"
        checked={visible}
        readOnly
      />
      <div className={`modal`}>
        <div className={`modal-box`}>
          <h3 className="font-bold text-lg">Congratulations!</h3>
          <p className="py-1">You'v finished this tying practice.</p>
          <div className="flex justify-center">
            <ol>
              <li className="py-1 text-start">
                ⏰ spent {" " + ((localState?.duration || 0) / 1000).toFixed(2)}{" "}
                s
              </li>
              <li className="py-1  text-start">
                ⌨️ tpyed {" " + localState?.keystrokes} keys
              </li>
              <li className="py-1  text-start">
                ⭕️ typed{" " + localState?.accuracy} accuracy keys
              </li>
              <li className="py-1  text-start">
                🔤 typed {" " + localState?.words} words
              </li>
            </ol>
          </div>

          <div className="modal-action">
            <form method="dialog">
              <button
                className="btn"
                onClick={() => {
                  setVisible(false);
                }}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

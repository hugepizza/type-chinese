import useHistoryStore from "../../store/historyStore";

export default function EndupModal({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: (v: boolean) => void;
}) {
  const { typingHistory } = useHistoryStore();
  if (typingHistory.length === 0) {
    return <></>;
  }
  const { duration, keystrokes, accuracy, words } =
    typingHistory[typingHistory.length - 1];
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
                ⏰ spent {" " + ((duration || 0) / 1000).toFixed(2)} s
              </li>
              <li className="py-1  text-start">
                ⌨️ tpyed {" " + keystrokes} keys
              </li>
              <li className="py-1  text-start">
                ⭕️ typed{" " + accuracy} accuracy keys
              </li>
              <li className="py-1  text-start">🔤 typed {" " + words} words</li>
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

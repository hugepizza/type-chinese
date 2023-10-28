import useAppStore from "../../hooks/appStore";

export default function StatePanel() {
  const {
    state: { duration, keystrokes, accuracy, inaccuracy },
  } = useAppStore();
  return (
    <section className="card flex-row shadow-lg p-4">
      <div className="px-4 py-2">
        <div className="stat-value text-lg">
          {(duration / 1000).toFixed(0)}s
        </div>
        <div className="stat-title text-xs">Duration</div>
      </div>
      <div className="px-4 py-2">
        <div className="stat-value text-lg">
          {isNaN((keystrokes / duration) * 1000)
            ? "0"
            : ((keystrokes / duration) * 1000).toFixed(2)}
        </div>
        <div className="stat-title text-xs">Keystrokes/Sec</div>
      </div>
      <div className="px-4 py-2">
        <div className="stat-value text-lg">{keystrokes}</div>
        <div className="stat-title text-xs">Keystrokes</div>
      </div>
      <div className="px-4 py-2">
        <div className="stat-value text-lg">
          {((accuracy / (accuracy + inaccuracy)) * 100 || 100).toFixed(2)}%
        </div>
        <div className="stat-title text-xs">Accuracy Rate</div>
      </div>
    </section>
  );
}

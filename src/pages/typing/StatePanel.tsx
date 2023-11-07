import { useShallow } from "zustand/react/shallow";
import useTypingStore from "../../store/typingStore";

export default function StatePanel() {
  const { words, duration, inaccuracy } = useTypingStore(
    useShallow((state) => ({
      words: state.words,
      duration: state.duration,
      inaccuracy: state.inaccuracy,
    }))
  );
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
          {isNaN((words / duration) * 1000)
            ? "0"
            : ((words / duration) * 1000).toFixed(2)}
        </div>
        <div className="stat-title text-xs">Words/Sec</div>
      </div>
      <div className="px-4 py-2">
        <div className="stat-value text-lg">{words}</div>
        <div className="stat-title text-xs">Words</div>
      </div>
      <div className="px-4 py-2">
        <div className="stat-value text-lg">
          {((words / (words + inaccuracy)) * 100 || 100).toFixed(2)}%
        </div>
        <div className="stat-title text-xs">Accuracy Rate</div>
      </div>
    </section>
  );
}

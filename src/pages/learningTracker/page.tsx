import NavButton from "../../components/NavButton";
import useHistoryStore from "../../store/historyStore";
import HistoryList from "./HistoryList";
import Summary from "./Summary";

function LearningTracker() {
  const typingHistory = useHistoryStore((state) => state.typingHistory);
  console.log("typingHistory", typingHistory);
  const endAt = new Date();
  const startAt = new Date(endAt.getFullYear(), endAt.getMonth(), 1, 0, 0, 0);
  const month = typingHistory.filter(
    (ele) =>
      new Date(ele.startTime!) <= endAt && new Date(ele.startTime!) >= startAt
  );
  return (
    <main className="flex flex-col items-start justify-start mt-4">
      <NavButton to="/" />
      <Summary history={month} />
      <HistoryList history={month} />
    </main>
  );
}
export default LearningTracker;

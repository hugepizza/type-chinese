import { TypingRecord } from "../../store/historyStore";

export default function HistoryList({ history }: { history: TypingRecord[] }) {
  return (
    <table className="table">
      {/* head */}
      <thead>
        <tr>
          <th></th>
          <th>Started At</th>
          <th>Duration</th>
          <th>Textbook</th>
          <th>Typed Words</th>
        </tr>
      </thead>
      <tbody>
        {history.map((ele, index) => (
          <tr key={ele.startAt.toString()}>
            <th>{index + 1}</th>
            <td>{new Date(ele.startAt).toLocaleString()}</td>
            <td>{(ele.duration / 1000).toFixed(0) + "s"}</td>
            <td>{ele.textbook}</td>
            <td>{ele.words.toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

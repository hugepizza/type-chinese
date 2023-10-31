import useAppStore from "../../hooks/appStore";
import Textbook from "./Textbook";

const preventKeyTigger = (event: React.KeyboardEvent<HTMLInputElement>) => {
  event.preventDefault();
};
export default function Panel() {
  const {
    config: { skipSpace, showTone },
    toggleSkipSpace,
    toggleShowTone,
  } = useAppStore();
  return (
    <div className="card  items-center flex-row absolute m-4 right-0 top-0 p-4 shadow-xl ">
      <label className="label flex-col">
        <input
          type="checkbox"
          className="toggle"
          checked={skipSpace}
          onKeyDown={preventKeyTigger}
          onChange={() => {
            toggleSkipSpace();
          }}
        />
        <span className="label-text">skip space</span>
      </label>
      <label className="label  flex-col">
        <input
          type="checkbox"
          className="toggle"
          checked={showTone}
          onKeyDown={preventKeyTigger}
          onChange={() => {
            toggleShowTone();
          }}
        />
        <span className="label-text"> show tone</span>
      </label>
      <Textbook />
    </div>
  );
}

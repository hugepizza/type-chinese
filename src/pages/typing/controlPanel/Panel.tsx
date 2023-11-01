import { useShallow } from "zustand/react/shallow";
import useAppStore from "../../../store/appStore";
import TextbookButton from "./TextbookButton";
import TrackerButton from "./TrackerButton";

const preventKeyTigger = (event: React.KeyboardEvent<HTMLInputElement>) => {
  event.preventDefault();
};
export default function Panel() {
  const {
    skipSpace,
    showTone,
    memoryMode,
    toggleSkipSpace,
    toggleShowTone,
    toggleMemoryMode,
  } = useAppStore(
    useShallow((state) => ({
      skipSpace: state.skipSpace,
      showTone: state.showTone,
      memoryMode: state.memoryMode,
      toggleSkipSpace: state.toggleSkipSpace,
      toggleShowTone: state.toggleShowTone,
      toggleMemoryMode: state.toggleMemoryMode,
    }))
  );
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
      <label className="label  flex-col">
        <input
          type="checkbox"
          className="toggle"
          checked={memoryMode}
          onKeyDown={preventKeyTigger}
          onChange={() => {
            toggleMemoryMode();
          }}
        />
        <span className="label-text"> memory mode</span>
      </label>
      <TextbookButton />
      <TrackerButton />
    </div>
  );
}

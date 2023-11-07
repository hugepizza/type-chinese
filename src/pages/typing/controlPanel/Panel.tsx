import { useShallow } from "zustand/react/shallow";
import useSettingStore from "../../../store/settingStore";
import TextbookButton from "./TextbookButton";
import TrackerButton from "./TrackerButton";

const preventKeyTigger = (event: React.KeyboardEvent<HTMLInputElement>) => {
  event.preventDefault();
};
export default function Panel() {
  const {
    currentTextbook,
    skipSpace,
    showTone,
    memoryMode,
    toggleSkipSpace,
    toggleShowTone,
    toggleMemoryMode,
  } = useSettingStore(
    useShallow((state) => ({
      currentTextbook: state.currentTextbook,
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
      <Item title="Skip Space">
        <input
          type="checkbox"
          className="toggle"
          checked={skipSpace}
          onKeyDown={preventKeyTigger}
          onChange={() => {
            toggleSkipSpace();
          }}
        />
      </Item>
      <Item title="Show Tone">
        <input
          type="checkbox"
          className="toggle"
          checked={showTone}
          onKeyDown={preventKeyTigger}
          onChange={() => {
            toggleShowTone();
          }}
        />
      </Item>

      <Item title="Memory Mode">
        <input
          type="checkbox"
          className="toggle"
          checked={memoryMode}
          onKeyDown={preventKeyTigger}
          onChange={() => {
            toggleMemoryMode();
          }}
        />
      </Item>
      <Item title={currentTextbook.name}>
        <TextbookButton />
      </Item>
      <Item title="history">
        <TrackerButton />
      </Item>
    </div>
  );
}

function Item({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="label flex-col w-24">
      {children}
      <span className="mt-2 text-xs">{title}</span>
    </div>
  );
}

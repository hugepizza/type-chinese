import useAppStore from "../../hooks/appStore";

const preventKeyTigger = (event: React.KeyboardEvent<HTMLInputElement>) => {
  event.preventDefault();
};
export default function ControlPanel() {
  const {
    config: { skipSpace, showTone },
    toggleSkipSpace,
    toggleShowTone,
  } = useAppStore();
  return (
    <section className="card flex-row absolute m-4 right-0 top-0 p-4 shadow-xl">
      <label className="label">
        <span className="label-text">skip space</span>
        <input
          type="checkbox"
          className="toggle"
          checked={skipSpace}
          onKeyDown={preventKeyTigger}
          onChange={() => {
            toggleSkipSpace();
          }}
        />
      </label>

      <label className="label">
        <span className="label-text"> show tone</span>
        <input
          type="checkbox"
          className="toggle"
          checked={showTone}
          onKeyDown={preventKeyTigger}
          onChange={() => {
            toggleShowTone();
          }}
        />
      </label>
    </section>
  );
}

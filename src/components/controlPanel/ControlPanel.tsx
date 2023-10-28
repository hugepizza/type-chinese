import { useContext } from "react";
import AppContext from "../../context/AppContext";

const preventKeyTigger = (event: React.KeyboardEvent<HTMLInputElement>) => {
  event.preventDefault();
};
export default function ControlPanel() {
  const { config, setConfig } = useContext(AppContext);
  return (
    <section className="card flex-row absolute m-4 right-0 top-0 p-4 shadow-xl">
      <label className="label">
        <span className="label-text">skip space</span>
        <input
          type="checkbox"
          className="toggle"
          checked={config.skipSpace}
          onKeyDown={preventKeyTigger}
          onChange={(e) => {
            console.log("change skip", e.currentTarget.value);
            console.log(!config.skipSpace);

            setConfig((prev) => ({ ...config, skipSpace: !prev.skipSpace }));
          }}
        />
      </label>

      <label className="label">
        <span className="label-text"> show tone</span>
        <input
          type="checkbox"
          className="toggle"
          checked={config.showTone}
          onKeyDown={preventKeyTigger}
          onChange={() => {
            setConfig((prev) => ({ ...config, showTone: !prev.showTone }));
          }}
        />
      </label>
    </section>
  );
}

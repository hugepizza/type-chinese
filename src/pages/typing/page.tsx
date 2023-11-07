import Footer from "../../components/layout/Footer";
import StatePanel from "./StatePanel";

import TypingPanel from "./TypingPanel";
import ControlPanel from "./controlPanel/Index";

function Typing() {
  console.log("render typing");

  return (
    <div className="flex flex-col h-screen">
      <main className="flex flex-col flex-grow justify-center items-center">
        <ControlPanel />
        <TypingPanel />
        <StatePanel />
      </main>
      <Footer />
    </div>
  );
}

export default Typing;

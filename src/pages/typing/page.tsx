import Footer from "../../components/layout/Footer";

import useTextbook from "../../hooks/useTextbook";
import TypingPanel from "./TypingPanel";
import ControlPanel from "./controlPanel/Index";

function Typing() {
  const { name: textbookName, content: words } = useTextbook();
  return (
    <div className="flex flex-col h-screen">
      <main className="flex flex-col flex-grow justify-center items-center">
        <ControlPanel />
        {words.length > 0 && (
          <TypingPanel words={words} textbook={textbookName} />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Typing;

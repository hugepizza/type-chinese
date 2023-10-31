import "./App.css";
import TypingPanel from "./components/typing/Index";
import ControlPanel from "./components/controlPanel/Index";
import Footer from "./components/layout/Footer";
import useTextbook from "./hooks/useTextbook";
import { inject } from "@vercel/analytics";
import { enableMapSet } from "immer";

enableMapSet();
inject();

function App() {
  const { name: textbookName, content: words } = useTextbook();

  return (
    <div className="flex flex-col h-screen">
      <main className="flex flex-col flex-grow justify-center items-center">
        <ControlPanel />
        {words.length > 0 && (
          <TypingPanel
            words={words}
            textbook={textbookName}
            key={textbookName}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;

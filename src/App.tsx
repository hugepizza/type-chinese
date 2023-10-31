import "./App.css";
import TypingPanel from "./components/typing/Index";
import ControlPanel from "./components/controlPanel/Index";
import Footer from "./components/layout/Footer";
import useTextbook from "./hooks/useTextbook";
import { inject } from "@vercel/analytics";

inject();

function App() {
  const { name: textbookName, content: words } = useTextbook();
  console.log("words.length", words.length);

  return (
    <div className="flex flex-col h-screen">
      <main className="flex flex-col flex-grow justify-center items-center">
        {textbookName}
        <ControlPanel />
        {words.length > 0 && <TypingPanel words={words} key={textbookName} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;

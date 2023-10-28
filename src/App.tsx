import "./App.css";
import TypingPanel from "./components/typing/TypingPanel";
import ControlPanel from "./components/controlPanel/ControlPanel";
import Footer from "./components/layout/Footer";
import useTextBook from "./hooks/useTextBoos";

function App() {
  const words = useTextBook({ shuffle: true });
  return (
    <div className="flex flex-col h-screen">
      <main className="flex flex-col flex-grow justify-center items-center">
        <ControlPanel />
        {words.length > 0 && <TypingPanel rawWords={words} />}
      </main>
      <Footer />
    </div>
  );
}

export default App;

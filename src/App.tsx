import "./App.css";

import { inject } from "@vercel/analytics";
import { enableMapSet } from "immer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Typing from "./pages/typing/page";
import LearningTracker from "./pages/learningTracker/page";

enableMapSet();
inject();

function App() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Typing />} />
        <Route path="/tracker" element={<LearningTracker />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

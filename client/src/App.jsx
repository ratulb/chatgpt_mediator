import { Navbar, About, Actions, Preferences, Home } from "./components/navbar";
import { Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/actions" element={<Actions />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;


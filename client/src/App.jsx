import { Navbar, About, Capabilities, Settings, Home } from "./components/navbar";
import { Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/capabilities" element={<Capabilities />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;


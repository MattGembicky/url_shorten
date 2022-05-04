import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//styles
import "./styles/App.css";

//components
import Wrapper from "./components/Wrapper";
import Redirector from "./components/Redirector";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Wrapper />} />
          <Route path="/:id" element={<Redirector />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

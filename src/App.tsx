import React, { useEffect, useState } from "react";

//styles
import "./styles/App.css";

//components
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import Redirector from "./components/Redirector";
import PopUp from "./components/PopUp";

//Errors
import errors from "./errors.json";

//types
export type ErrorNumber = number | null;

function getErrorMsg(errNum: ErrorNumber): string {
  if (errNum === null) {
    return "";
  }
  const id = Math.floor(errNum / 100) - 1;
  const index = errNum % 100;
  try {
    switch (id) {
      case 0: {
        return errors.database[index];
      }
      case 1: {
        return errors.validation[index];
      }
      default: {
        return "Unknown Error occured";
      }
    }
  } catch {
    return "Unknown Error occured";
  }
}

function App() {
  const [errorNumber, setErrorNumber] = useState<ErrorNumber>(null);
  const [popUpVisible, setPopUpVisible] = useState(false);

  useEffect(() => {
    setPopUpVisible(errorNumber === null ? false : true);
  }, [errorNumber]);

  function handlePopUp() {
    setErrorNumber(null);
  }

  return (
    <div className="App">
      {popUpVisible && (
        <PopUp popUpText={getErrorMsg(errorNumber)} click={handlePopUp} />
      )}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Wrapper setErrorNumber={setErrorNumber} />}
          />
          <Route
            path="/:id"
            element={<Redirector setErrorNumber={setErrorNumber} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

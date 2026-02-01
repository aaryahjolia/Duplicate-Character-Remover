import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Screen1 from "./screens/Screen1";
import Screen2 from "./screens/Screen2";
import "./App.css";

function App() {

  const [inputString, setInputString] = useState('')

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>

          <Route
            exact
            path="/"
            element={<Screen1 setInputString={setInputString} />}
          ></Route>

          <Route
            exact
            path="/screen2"
            element={<Screen2 inputString={inputString} />}
          ></Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

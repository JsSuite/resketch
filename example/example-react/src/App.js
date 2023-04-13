import "./App.css";
import React from "react";
import { drawExample } from "./drawExample";

function App() {
  React.useEffect(() => {
    drawExample();
  });

  return (
    <div className="App">
      <h1>React Vizat Example</h1>
      <div id="viz-container"></div>
    </div>
  );
}

export default App;

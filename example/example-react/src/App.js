import "./App.css";
import React from "react";
import Viz from "vizat";

function App() {
  React.useEffect(() => {
    let primaryColor = "blueviolet";
    let secondaryColor = "deeppink";
    const config = {
      height: "150vh",
      width: "100vw",
      background: "#333",
    };

    const wrapper = new Viz.Wrapper("viz-container", config);
    const canvas = new Viz.Canvas(config);
    wrapper.add(canvas);
    return () => {};
  }, []);

  return (
    <div className="App">
      <h1>React Vizat Example</h1>
      <div id="viz-container"></div>
    </div>
  );
}

export default App;

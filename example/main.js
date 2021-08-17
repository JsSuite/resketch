const RDW = window.REDRAW;

const config = {
  height: "100vh",
  width: "100vw",
  background: "whitesmoke",
};

const wrapper = new RDW.Wrapper("redraw-container", config);
const canvas = new RDW.Canvas(config);

wrapper.add(canvas);

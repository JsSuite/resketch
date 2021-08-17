const RDW = window.REDRAW;

const config = {
  height: "100vh",
  width: "100vw",
  background: "whitesmoke",
};

const wrapper = new RDW.Wrapper("redraw-container", config);
const canvas = new RDW.Canvas(config);

wrapper.add(canvas);

const lineExample = new RDW.Line({
  points: [
    [100, 100],
    [200, 200],
    [300, 300],
  ],
  options: {
    strokeStyle: "limegreen",
    lineWidth: 20,
  },
});

canvas.add(lineExample);

const rectExample = new RDW.Rect({});

canvas.add(rectExample);

canvas.draw();

const RDW = window.REDRAW;

let primaryColor = "blueviolet";
let secondaryColor = "deeppink";
const config = {
  height: "100vh",
  width: "100vw",
  background: "whitesmoke",
};

const wrapper = new RDW.Wrapper("redraw-container", config);
const canvas = new RDW.Canvas(config);
wrapper.add(canvas);

setInterval(() => {
  primaryColor = primaryColor === "blueviolet" ? "lightsalmon" : "blueviolet";
  secondaryColor = secondaryColor === "deeppink" ? "orchid" : "orchid";
  drawExample();
}, [1000]);

function drawExample() {
  //Clear before draw
  canvas.clear();

  //Simple Line
  const lineExample = new RDW.Line({
    points: [
      [100, 100],
      [200, 200],
      [300, 300],
    ],
    options: {
      strokeStyle: primaryColor,
      lineWidth: 10,
      lineCap: "butt",
    },
  });

  canvas.add(lineExample);

  //Transparent Rect with Border
  const rectExample = new RDW.Rect({
    x: 400,
    y: 100,
    width: 200,
    height: 200,
    options: {
      strokeStyle: primaryColor,
      lineWidth: 5,
      lineCap: "round",
    },
  });

  canvas.add(rectExample);

  //Filled Rect with Border
  const rectExampleFilled = new RDW.Rect({
    x: 700,
    y: 100,
    width: 200,
    height: 200,
    options: {
      strokeStyle: secondaryColor,
      lineWidth: 5,
      lineCap: "round",
      fillStyle: primaryColor,
    },
  });

  canvas.add(rectExampleFilled);

  //Bezier Curve Line
  const curveExampleBz = new RDW.Curve({
    points: [
      [1000, 105, 1300, 120, 1100, 200],
      [1100, 200, 900, 270, 1200, 305],
    ],
    type: "bezier",
    options: {
      strokeStyle: primaryColor,
      lineWidth: 10,
      lineCap: "butt",
    },
  });

  //Quadratic Curve Line
  const curveExampleQd = new RDW.Curve({
    points: [
      [1400, 105, 1200, 120, 1440, 200],
      [1480, 200, 1500, 220, 1400, 300],
    ],
    type: "quadratic",
    options: {
      strokeStyle: primaryColor,
      lineWidth: 10,
      lineCap: "butt",
    },
  });

  canvas.add(curveExampleBz);
  canvas.add(curveExampleQd);

  //Hollowed Text with Border
  const textExample = new RDW.Text({
    text: "Hello",
    x: 100,
    y: 500,
    options: {
      strokeStyle: primaryColor,
      font: "bold 100px calibri",
      lineWidth: 5,
    },
  });

  canvas.add(textExample);

  //Filled Text with Border
  const textExampleFilled = new RDW.Text({
    text: "Redraw",
    x: 400,
    y: 500,
    options: {
      strokeStyle: secondaryColor,
      fillStyle: primaryColor,
      lineWidth: 10,
      font: "bold 100px calibri",
    },
  });

  canvas.add(textExampleFilled);
  canvas.draw();
}

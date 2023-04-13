import Viz from "vizat";

export function drawExample() {
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
  //Clear before draw
  canvas.clear();

  //Simple Line
  const lineExample = new Viz.Line({
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
  const rectExample = new Viz.Rect({
    x: 400,
    y: 100,
    width: 200,
    height: 200,
    options: {
      strokeStyle: primaryColor,
      lineWidth: 10,
      lineCap: "round",
    },
  });

  canvas.add(rectExample);

  //Filled Rect with Border
  const rectExampleFilled = new Viz.Rect({
    x: 700,
    y: 100,
    width: 200,
    height: 200,
    options: {
      strokeStyle: secondaryColor,
      lineWidth: 15,
      lineCap: "round",
      fillStyle: primaryColor,
    },
  });

  canvas.add(rectExampleFilled);

  //Bezier Curve Line
  const curveExampleBz = new Viz.Curve({
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
  const curveExampleQd = new Viz.Curve({
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

  //Dashed line crossed
  const lineDashCrossedLeft = new Viz.Line({
    points: [
      [1600, 105],
      [1800, 305],
    ],
    options: {
      strokeStyle: primaryColor,
      lineWidth: 10,
      lineCap: "butt",
      dash: [10, 5],
    },
  });
  const lineDashCrossedRight = new Viz.Line({
    points: [
      [1800, 105],
      [1600, 305],
    ],
    options: {
      strokeStyle: primaryColor,
      lineWidth: 10,
      lineCap: "butt",
      dash: [10, 5],
    },
  });

  canvas.add(lineDashCrossedLeft);
  canvas.add(lineDashCrossedRight);

  //Hollowed Text with Border
  const textExample = new Viz.Text({
    text: "Hello",
    x: 100,
    y: 550,
    options: {
      strokeStyle: primaryColor,
      font: "bold 100px calibri",
      lineWidth: 5,
    },
  });

  canvas.add(textExample);

  //Filled Text with Border
  const textExampleFilled = new Viz.Text({
    text: "Vizat",
    x: 400,
    y: 550,
    options: {
      strokeStyle: secondaryColor,
      fillStyle: primaryColor,
      lineWidth: 10,
      font: "bold 100px calibri",
    },
  });

  canvas.add(textExampleFilled);

  //Hollowed Circle with Border
  const circleExample = new Viz.Circle({
    radius: 100,
    x: 900,
    y: 500,
    options: {
      strokeStyle: primaryColor,
      lineWidth: 10,
    },
  });

  canvas.add(circleExample);

  //Filled Circle with Border
  const circleExampleFilled = new Viz.Circle({
    radius: 100,
    x: 1200,
    y: 500,
    options: {
      strokeStyle: secondaryColor,
      fillStyle: primaryColor,
      lineWidth: 10,
    },
  });

  canvas.add(circleExampleFilled);

  //Filled Rect with shadow
  const rectExampleShadow = new Viz.Rect({
    x: 1400,
    y: 400,
    width: 200,
    height: 200,
    options: {
      shadowColor: "black",
      shadowBlur: 10,
      shadowOffsetX: 10,
      shadowOffsetY: 10,
      lineWidth: 15,
      lineCap: "round",
      fillStyle: secondaryColor,
    },
  });

  canvas.add(rectExampleShadow);

  //Filled Rect with linear gradient
  const sampleGrad1 = new Viz.Gradient({
    type: "linear",
    colors: [
      [0, secondaryColor],
      [1, primaryColor],
    ],
    points: [1650, 350, 1850, 550],
  });

  const rectExampleGrad = new Viz.Rect({
    x: 1650,
    y: 400,
    width: 200,
    height: 200,
    options: {
      fillStyle: sampleGrad1,
    },
  });

  canvas.add(rectExampleGrad);

  //Filled Diamond with radial gradient
  const sampleGrad2 = new Viz.Gradient({
    type: "radial",
    colors: [
      [0, primaryColor],
      [0.5, secondaryColor],
      [1, secondaryColor],
    ],
    points: [200, 780, 100, 180, 780, 20],
  });

  const rectExampleGradRadial = new Viz.Circle({
    radius: 100,
    x: 200,
    y: 780,
    options: {
      fillStyle: sampleGrad2,
    },
  });

  canvas.add(rectExampleGradRadial);

  const rotatedRect = new Viz.Rect({
    x: 420,
    y: 680,
    width: 180,
    height: 180,
    options: {
      fillStyle: secondaryColor,
      rotation: 45,
    },
  });

  canvas.add(rotatedRect);

  const loadedImage = new Image();
  loadedImage.src =
    "https://images-na.ssl-images-amazon.com/images/I/6120xNlsj5L.jpg";
  loadedImage.onload = () => {
    const imgExample = new Viz.Image({
      dx: 720,
      dy: 680,
      dWidth: 200,
      dHeight: 200,
      sWidth: 180,
      sHeight: 280,
      sx: 720,
      sy: 680,
      image: loadedImage,
    });

    const imgExample2 = new Viz.Image({
      dx: 1020,
      dy: 680,
      dWidth: 620,
      dHeight: 680,
      sWidth: 800,
      sHeight: 800,
      sx: 620,
      sy: 680,
      image: loadedImage,
      options: {
        shadowColor: "black",
        shadowBlur: 10,
        shadowOffsetX: 10,
        shadowOffsetY: 10,
        lineWidth: 15,
        lineCap: "round",
      },
    });

    canvas.add(imgExample);
    canvas.add(imgExample2);

    canvas.draw();
  };
}

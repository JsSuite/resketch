import Drawable from "./Drawable";

class Canvas extends Drawable {
  constructor(config = {}) {
    super();

    this.__items = [];
    this.__canvas = document.createElement("canvas");

    this.__canvas.style.height = config.height || "873px";
    this.__canvas.style.width = config.width || "1440px";
    this.__canvas.style.background = config.background || "transparent";

    if (config.height.includes("vh")) {
      this.__canvas.height = parseInt(config.height) * 9.69 || 0;
    } else {
      this.__canvas.height = parseInt(config.height) || 0;
    }

    if (config.width.includes("vw")) {
      this.__canvas.width = parseInt(config.width) * 19.2 || 0;
    } else {
      this.__canvas.width = parseInt(config.width) || 0;
    }
  }

  getCanvas() {
    return this.__canvas;
  }

  getContext() {
    return this.__canvas.getContext("2d");
  }

  add(item) {
    this.__items.push(item);
  }

  clear() {
    this.__items = [];
  }
}

export default Canvas;

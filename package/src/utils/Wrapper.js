import { Canvas } from "./Canvas";
import { Drawable } from "./Drawable";

export class Wrapper extends Drawable {
  constructor(id, config = {}) {
    super();

    this.__items = [];
    this.__wrapper = document.getElementById(id);

    if (!(this.__wrapper instanceof HTMLElement)) {
      return console.warn(
        `[VIZAT] - Warning - There is no DOM element with ID ${id}`
      );
    }

    this.__wrapper.style.height = config.height || "873px";
    this.__wrapper.style.width = config.width || "1440px";
    this.__wrapper.style.background = config.background || "transparent";
  }

  add(canvas) {
    if (this.__wrapper.hasChildNodes()) {
      return; //skip duplicate rendering
    }

    if (!(canvas instanceof Canvas)) {
      return console.error(
        `[VIZAT] - Error - The provided item is not of Vizat Canvas type.`
      );
    }

    if (this.__wrapper instanceof HTMLElement) {
      const addingCanvas = canvas.getCanvas();
      this.__wrapper.appendChild(addingCanvas);
    }

    this.__items.push(canvas);
  }
}

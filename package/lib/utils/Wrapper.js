(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./Canvas", "./Drawable"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./Canvas"), require("./Drawable"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Canvas, global.Drawable);
    global.Wrapper = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _Canvas, _Drawable) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Wrapper = void 0;
  class Wrapper extends _Drawable.Drawable {
    constructor(id, config = {}) {
      super();
      this.__items = [];
      this.__wrapper = document.getElementById(id);
      if (!(this.__wrapper instanceof HTMLElement)) {
        return console.warn(`[VIZAT] - Warning - There is no DOM element with ID ${id}`);
      }
      this.__wrapper.style.height = config.height || "873px";
      this.__wrapper.style.width = config.width || "1440px";
      this.__wrapper.style.background = config.background || "transparent";
    }
    add(canvas) {
      if (this.__wrapper.hasChildNodes()) {
        return; //skip duplicate rendering
      }

      if (!(canvas instanceof _Canvas.Canvas)) {
        return console.error(`[VIZAT] - Error - The provided item is not of Vizat Canvas type.`);
      }
      if (this.__wrapper instanceof HTMLElement) {
        const addingCanvas = canvas.getCanvas();
        this.__wrapper.appendChild(addingCanvas);
      }
      this.__items.push(canvas);
    }
  }
  _exports.Wrapper = Wrapper;
});
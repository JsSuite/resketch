(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./Drawable"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./Drawable"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Drawable);
    global.Canvas = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _Drawable) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Canvas = void 0;
  class Canvas extends _Drawable.Drawable {
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
  _exports.Canvas = Canvas;
});
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
    global.Circle = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _Drawable) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Circle = void 0;
  class Circle extends _Drawable.Drawable {
    constructor(config = {}) {
      super();
      this.x = config.x || 0;
      this.y = config.y || 0;
      this.radius = config.radius || 0;
      this.options = config.options || {};
    }
    draw(ctx) {
      ctx.beginPath();
      this.setCtxProperties(ctx);
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
      if (this.options.fillStyle) {
        ctx.fill();
      }
      if (this.options.strokeStyle) {
        ctx.stroke();
      }
      this.resetCtxProperties(ctx);
    }
  }
  _exports.Circle = Circle;
});
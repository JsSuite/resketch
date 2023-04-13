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
    global.Curve = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _Drawable) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Curve = void 0;
  class Curve extends _Drawable.Drawable {
    constructor(config = {}) {
      super();
      this.points = config.points || [];
      this.options = config.options || {};
      this.type = config.type || "quadratic";
    }
    draw(ctx) {
      ctx.beginPath();
      this.setCtxProperties(ctx);
      this.points.forEach((point, index) => {
        if (!Array.isArray(point)) {
          throw new Error(`[VIZAT] - Error - Curve points needs to be an array.`);
        }
        if (this.type === "quadratic" && point.length !== 6) {
          throw new Error(`[VIZAT] - Error - Quadratic curve needs to have three points. Read more at https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/quadraticCurveTo`);
        }
        if (this.type === "bezier" && point.length !== 6) {
          throw new Error(`[VIZAT] - Error - Bezier curve needs to have three points. Read more at https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/bezierCurveTo`);
        }
        if (this.type === "quadratic") {
          const startPoint = [point[0], point[1]];
          if (index === 0) {
            ctx.beginPath();
            ctx.moveTo(...startPoint);
          }
          return ctx.quadraticCurveTo(point[2], point[3], point[4], point[5]);
        }
        ctx.bezierCurveTo(...point);
      });
      ctx.stroke();
      this.resetCtxProperties(ctx);
    }
  }
  _exports.Curve = Curve;
});
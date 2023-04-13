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
    global.Line = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _Drawable) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Line = void 0;
  class Line extends _Drawable.Drawable {
    constructor(config = {}) {
      super();
      this.points = config.points || [];
      this.options = config.options || {};
    }
    draw(ctx) {
      ctx.beginPath();
      this.setCtxProperties(ctx);
      this.points.forEach((point, index) => {
        if (!Array.isArray(point) || point?.length <= 1) {
          throw new Error(`[VIZAT] - Error - Line needs to have X,Y points as an array.`);
        }
        if (index === 0) {
          return ctx.moveTo(...point);
        }
        ctx.lineTo(...point);
      });
      ctx.stroke();
      this.resetCtxProperties(ctx);
    }
  }
  _exports.Line = Line;
});
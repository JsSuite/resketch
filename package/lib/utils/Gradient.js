(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.Gradient = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Gradient = void 0;
  class Gradient {
    constructor(config = {}) {
      this.type = config.type || "linear";
      this.colors = config.colors || [];
      this.points = config.points || [];
      this.gradient = {};
    }
    getGradient(ctx) {
      if (this.type === "linear") {
        this.gradient = ctx.createLinearGradient(...this.points);
      }
      if (this.type === "radial") {
        this.gradient = ctx.createRadialGradient(...this.points);
      }
      this.colors.forEach(color => {
        if (!Array.isArray(color)) {
          throw new Error(`[VIZAT] - Error - Gradient color needs to have offset and color as an array. Read more at https://developer.mozilla.org/en-US/docs/Web/API/CanvasGradient/addColorStop`);
        }
        this.gradient.addColorStop(...color);
      });
      return this.gradient;
    }
  }
  _exports.Gradient = Gradient;
});
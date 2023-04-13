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
    global.Rect = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _Drawable) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Rect = void 0;
  class Rect extends _Drawable.Drawable {
    constructor(config = {}) {
      super();
      this.x = config.x || 0;
      this.y = config.y || 0;
      this.height = config.height || 0;
      this.width = config.width || 0;
      this.options = config.options || {};
    }
    draw(ctx) {
      this.setCtxProperties(ctx);
      const translateX = this.x + this.width / 2;
      const translateY = this.y + this.height / 2;
      if (!!this.options.rotation) {
        ctx.translate(translateX, translateY);
        ctx.rotate(this.options.rotation * Math.PI / 180);
        ctx.translate(-translateX, -translateY);
      }
      if (this.options.strokeStyle) {
        ctx.strokeRect(this.x, this.y, this.width, this.height);
      }
      if (this.options.fillStyle) {
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
      this.resetCtxProperties(ctx);
      if (!!this.options.rotation) {
        ctx.translate(translateX, translateY);
        ctx.rotate(-this.options.rotation * Math.PI / 180);
        ctx.translate(-translateX, -translateY);
      }
    }
  }
  _exports.Rect = Rect;
});
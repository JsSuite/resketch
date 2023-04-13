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
    global.Image = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _Drawable) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Image = void 0;
  class Image extends _Drawable.Drawable {
    constructor(config = {}) {
      super();
      this.dx = config.dx || 0;
      this.dy = config.dy || 0;
      this.dWidth = config.dWidth;
      this.dHeight = config.dHeight;
      this.sx = config.sx;
      this.sy = config.sy;
      this.sWidth = config.sWidth;
      this.sHeight = config.sHeight;
      this.image = config.image;
      this.options = config.options || {};
    }
    draw(ctx) {
      this.setCtxProperties(ctx);
      if (!this.dWidth || !this.dHeight) {
        ctx.drawImage(this.image, this.dx, this.dy);
      } else if (this.sx && this.sy && this.sWidth && this.sHeight && this.dWidth && this.dHeight) {
        ctx.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, this.dx, this.dy, this.dWidth, this.dHeight);
      } else if (this.dWidth && this.dHeight) {
        ctx.drawImage(this.image, this.dx, this.dy, this.dWidth, this.dHeight);
      }
      this.resetCtxProperties(ctx);
    }
  }
  _exports.Image = Image;
});
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
    global.Text = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _Drawable) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Text = void 0;
  class Text extends _Drawable.Drawable {
    constructor(config = {}) {
      super();
      this.x = config.x || 0;
      this.y = config.y || 0;
      this.height = config.height || 0;
      this.width = config.width || 0;
      this.text = config.text || "";
      this.options = config.options || {};
    }
    draw(ctx) {
      this.setCtxProperties(ctx);
      if (this.options.strokeStyle) {
        ctx.strokeText(this.text, this.x, this.y);
      }
      if (this.options.fillStyle) {
        ctx.fillText(this.text, this.x, this.y);
      }
      this.resetCtxProperties(ctx);
    }
  }
  _exports.Text = Text;
});
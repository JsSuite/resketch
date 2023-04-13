(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./Gradient"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./Gradient"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Gradient);
    global.Drawable = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _Gradient) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Drawable = void 0;
  class Drawable {
    constructor() {
      this.originalCtx = {};
    }
    setCtxProperties(ctx) {
      Object.keys(this.options).forEach(key => {
        if (key === "dash") {
          this.originalCtx.dash = ctx.getLineDash();
          return ctx.setLineDash(this.options[key]);
        }
        if ((key === "fillStyle" || key === "strokeStyle") && this.options[key] instanceof _Gradient.Gradient) {
          this.originalCtx[key] = ctx[key];
          return ctx[key] = this.options[key].getGradient(ctx);
        }
        this.originalCtx[key] = ctx[key];
        ctx[key] = this.options[key];
      });
    }
    resetCtxProperties(ctx) {
      Object.keys(this.options).forEach(key => {
        if (key === "dash") {
          return ctx.setLineDash(this.originalCtx.dash);
        }
        ctx[key] = this.originalCtx[key];
      });
    }
    draw() {
      try {
        window.requestAnimationFrame(() => {
          this.__items.forEach(item => {
            item.draw(this.getContext());
          });
        }, 0);
      } catch (ex) {
        console.warn(`[VIZAT] - Error - ${ex.message}`);
        console.error(ex);
      }
    }
  }
  _exports.Drawable = Drawable;
});
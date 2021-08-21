import Gradient from "./Gradient";

class Drawable {
  constructor() {
    this.originalCtx = {};
  }

  setCtxProperties(ctx) {
    Object.keys(this.options).forEach((key) => {
      if (key === "dash") {
        this.originalCtx.dash = ctx.getLineDash();
        return ctx.setLineDash(this.options[key]);
      }

      if (
        (key === "fillStyle" || key === "strokeStyle") &&
        this.options[key] instanceof Gradient
      ) {
        this.originalCtx[key] = ctx[key];
        return (ctx[key] = this.options[key].getGradient(ctx));
      }

      this.originalCtx[key] = ctx[key];
      ctx[key] = this.options[key];
    });
  }

  resetCtxProperties(ctx) {
    Object.keys(this.options).forEach((key) => {
      if (key === "dash") {
        return ctx.setLineDash(this.originalCtx.dash);
      }

      if (key === "rotation") {
        return ctx.rotate(this.originalCtx.rotation);
      }

      ctx[key] = this.originalCtx[key];
    });
  }

  draw() {
    try {
      window.requestAnimationFrame(() => {
        this.__items.forEach((item) => {
          item.draw(this.getContext());
        });
      }, 0);
    } catch (ex) {
      console.warn(`[VIZAT] - Error - ${ex.message}`);
      console.error(ex);
    }
  }
}

export default Drawable;

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

      this.originalCtx[key] = ctx[key];
      ctx[key] = this.options[key];
    });
  }

  resetCtxProperties(ctx) {
    Object.keys(this.options).forEach((key) => {
      if (key === "dash") {
        return ctx.setLineDash(this.originalCtx.dash);
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
      console.warn(`[RESKETCH] - Error - ${ex.message}`);
      console.error(ex);
    }
  }
}

export default Drawable;

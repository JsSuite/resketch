import Drawable from "./Drawable";

class Text extends Drawable {
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

export default Text;

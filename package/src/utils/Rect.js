import Drawable from "./Drawable";

class Rect extends Drawable {
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

    if (!!this.options.rotation) {
      const translateX = this.x + this.width / 2;
      const translateY = this.y + this.height / 2;

      ctx.translate(translateX, translateY);
      ctx.rotate((this.options.rotation * Math.PI) / 180);
      ctx.translate(-translateX, -translateY);
    }

    if (this.options.strokeStyle) {
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }
    if (this.options.fillStyle) {
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.resetCtxProperties(ctx);
  }
}

export default Rect;

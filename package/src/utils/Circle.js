import Drawable from "./Drawable";

class Circle extends Drawable {
  constructor(config = {}) {
    super();
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.radius = config.radius || 0;
    this.options = config.options || {};
  }

  draw(ctx) {
    ctx.beginPath();
    this.setCtxProperties(ctx);

    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);

    if (this.options.fillStyle) {
      ctx.fill();
    }
    ctx.stroke();

    this.resetCtxProperties(ctx);
  }
}

export default Circle;

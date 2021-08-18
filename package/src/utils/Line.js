import Drawable from "./Drawable";

class Line extends Drawable {
  constructor(config = {}) {
    super();
    this.points = config.points || [];
    this.options = config.options || {};
  }

  draw(ctx) {
    ctx.beginPath();
    this.setCtxProperties(ctx);

    this.points.forEach((point, index) => {
      if (!Array.isArray(point)) {
        return;
      }
      if (index === 0) {
        return ctx.moveTo(...point);
      }
      ctx.lineTo(...point);
    });

    ctx.stroke();
    this.resetCtxProperties(ctx);
  }
}

export default Line;

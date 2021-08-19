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
      if (!Array.isArray(point) || point?.length <= 1) {
        throw new Error(`[RESKETCH] - Error - Line needs to have X,Y point.`);
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

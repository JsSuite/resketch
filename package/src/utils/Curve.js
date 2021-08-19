import Drawable from "./Drawable";

class Curve extends Drawable {
  constructor(config = {}) {
    super();
    this.points = config.points || [];
    this.options = config.options || {};

    this.type = config.type || "quadratic";
  }

  draw(ctx) {
    ctx.beginPath();
    this.setCtxProperties(ctx);

    this.points.forEach((point, index) => {
      if (!Array.isArray(point)) {
        throw new Error(
          `[RESKETCH] - Error - Curve points needs to be an array.`
        );
      }
      if (this.type === "quadratic" && point.length !== 6) {
        throw new Error(
          `[RESKETCH] - Error - Quadratic curve needs to have three points. Read more at https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/quadraticCurveTo`
        );
      }

      if (this.type === "bezier" && point.length !== 6) {
        throw new Error(
          `[RESKETCH] - Error - Bezier curve needs to have three points. Read more at https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/bezierCurveTo`
        );
      }

      if (this.type === "quadratic") {
        const startPoint = [point[0], point[1]];
        if (index === 0) {
          ctx.beginPath();
          ctx.moveTo(...startPoint);
        }

        return ctx.quadraticCurveTo(point[2], point[3], point[4], point[5]);
      }

      ctx.bezierCurveTo(...point);
    });

    ctx.stroke();
    this.resetCtxProperties(ctx);
  }
}

export default Curve;

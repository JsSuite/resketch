class Line {
  constructor(config = {}) {
    this.__line = {};
    this.__line.points = config.points || [];
    this.__line.options = config.options || {};
  }

  draw(ctx) {
    ctx.beginPath();

    Object.keys(this.__line.options).forEach((key) => {
      ctx[key] = this.__line.options[key];
    });

    this.__line.points.forEach((point, index) => {
      if (!Array.isArray(point)) {
        return;
      }
      if (index === 0) {
        return ctx.moveTo(...point);
      }
      ctx.lineTo(...point);
    });

    ctx.stroke();
  }
}

export default Line;

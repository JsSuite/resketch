class Rect {
  constructor(config = {}) {
    this.__rect = {};
    this.__rect.config = config;
  }

  draw(ctx) {
    ctx.strokeStyle = "#FF0000";
    ctx.strokeRect(300, 20, 150, 100);
  }
}

export default Rect;

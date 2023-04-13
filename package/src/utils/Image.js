import { Drawable } from "./Drawable";

export class Image extends Drawable {
  constructor(config = {}) {
    super();
    this.dx = config.dx || 0;
    this.dy = config.dy || 0;
    this.dWidth = config.dWidth;
    this.dHeight = config.dHeight;

    this.sx = config.sx;
    this.sy = config.sy;
    this.sWidth = config.sWidth;
    this.sHeight = config.sHeight;

    this.image = config.image;
    this.options = config.options || {};
  }

  draw(ctx) {
    this.setCtxProperties(ctx);

    if (!this.dWidth || !this.dHeight) {
      ctx.drawImage(this.image, this.dx, this.dy);
    } else if (
      this.sx &&
      this.sy &&
      this.sWidth &&
      this.sHeight &&
      this.dWidth &&
      this.dHeight
    ) {
      ctx.drawImage(
        this.image,
        this.sx,
        this.sy,
        this.sWidth,
        this.sHeight,
        this.dx,
        this.dy,
        this.dWidth,
        this.dHeight
      );
    } else if (this.dWidth && this.dHeight) {
      ctx.drawImage(this.image, this.dx, this.dy, this.dWidth, this.dHeight);
    }

    this.resetCtxProperties(ctx);
  }
}

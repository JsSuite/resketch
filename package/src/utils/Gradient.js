class Gradient {
  constructor(config = {}) {
    this.type = config.type || "linear";
    this.colors = config.colors || [];
    this.points = config.points || [];
    this.gradient = {};
  }

  getGradient(ctx) {
    if (this.type === "linear") {
      this.gradient = ctx.createLinearGradient(...this.points);
    }

    if (this.type === "radial") {
      this.gradient = ctx.createRadialGradient(...this.points);
    }

    this.colors.forEach((color) => {
      if (!Array.isArray(color)) {
        throw new Error(
          `[RESKETCH] - Error - Gradient color needs to have offset and color as an array. Read more at https://developer.mozilla.org/en-US/docs/Web/API/CanvasGradient/addColorStop`
        );
      }

      this.gradient.addColorStop(...color);
    });

    return this.gradient;
  }
}

export default Gradient;

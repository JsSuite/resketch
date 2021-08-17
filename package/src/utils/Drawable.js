class Drawable {
  constructor() {}

  draw() {
    window.requestAnimationFrame(() => {
      this.__items.forEach((item) => {
        item.draw(this.getContext());
      });
    }, 0);
  }
}

export default Drawable;

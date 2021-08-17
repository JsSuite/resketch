import wrapper from "./utils/Wrapper";
import canvas from "./utils/Canvas";
import line from "./utils/Line";

const redraw = {
  Wrapper: wrapper,
  Canvas: canvas,
  Line: line,
};

if (window) {
  window.REDRAW = redraw;
}

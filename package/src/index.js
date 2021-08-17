import Wrapper from "./utils/Wrapper";
import Canvas from "./utils/Canvas";
import Line from "./utils/Line";
import Rect from "./utils/Rect";

const redraw = {
  Wrapper,
  Canvas,
  Line,
  Rect,
};

if (window) {
  window.REDRAW = redraw;
}

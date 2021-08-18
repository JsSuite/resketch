import Wrapper from "./utils/Wrapper";
import Canvas from "./utils/Canvas";
import Line from "./utils/Line";
import Rect from "./utils/Rect";
import Curve from "./utils/Curve";
import Text from "./utils/Text";

const redraw = {
  Wrapper,
  Canvas,
  Line,
  Rect,
  Curve,
  Text,
};

if (window) {
  window.REDRAW = redraw;
}

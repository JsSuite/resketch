(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./utils/Wrapper", "./utils/Canvas", "./utils/Line", "./utils/Rect", "./utils/Curve", "./utils/Text", "./utils/Circle", "./utils/Gradient", "./utils/Image"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./utils/Wrapper"), require("./utils/Canvas"), require("./utils/Line"), require("./utils/Rect"), require("./utils/Curve"), require("./utils/Text"), require("./utils/Circle"), require("./utils/Gradient"), require("./utils/Image"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Wrapper, global.Canvas, global.Line, global.Rect, global.Curve, global.Text, global.Circle, global.Gradient, global.Image);
    global.index = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _Wrapper, _Canvas, _Line, _Rect, _Curve, _Text, _Circle, _Gradient, _Image) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;
  var _default = {
    Wrapper: _Wrapper.Wrapper,
    Canvas: _Canvas.Canvas,
    Line: _Line.Line,
    Rect: _Rect.Rect,
    Curve: _Curve.Curve,
    Text: _Text.Text,
    Circle: _Circle.Circle,
    Gradient: _Gradient.Gradient,
    Image: _Image.Image
  };
  _exports.default = _default;
});
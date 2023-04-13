(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["./utils/Wrapper", "./utils/Canvas", "./utils/Line", "./utils/Rect", "./utils/Curve", "./utils/Text", "./utils/Circle", "./utils/Gradient", "./utils/Image"], factory);
  } else if (typeof exports !== "undefined") {
    factory(require("./utils/Wrapper"), require("./utils/Canvas"), require("./utils/Line"), require("./utils/Rect"), require("./utils/Curve"), require("./utils/Text"), require("./utils/Circle"), require("./utils/Gradient"), require("./utils/Image"));
  } else {
    var mod = {
      exports: {}
    };
    factory(global.Wrapper, global.Canvas, global.Line, global.Rect, global.Curve, global.Text, global.Circle, global.Gradient, global.Image);
    global.vizat = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_Wrapper, _Canvas, _Line, _Rect, _Curve, _Text, _Circle, _Gradient, _Image) {
  "use strict";

  if (window) {
    window.VIZAT = {
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
  }
});
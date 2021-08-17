(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _Wrapper = _interopRequireDefault(require("./utils/Wrapper"));

var _Canvas = _interopRequireDefault(require("./utils/Canvas"));

var _Line = _interopRequireDefault(require("./utils/Line"));

var _Rect = _interopRequireDefault(require("./utils/Rect"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const redraw = {
  Wrapper: _Wrapper.default,
  Canvas: _Canvas.default,
  Line: _Line.default,
  Rect: _Rect.default
};

if (window) {
  window.REDRAW = redraw;
}

},{"./utils/Canvas":2,"./utils/Line":4,"./utils/Rect":5,"./utils/Wrapper":6}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Drawable = _interopRequireDefault(require("./Drawable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Canvas extends _Drawable.default {
  constructor(config = {}) {
    super();
    this.__items = [];
    this.__canvas = document.createElement("canvas");
    this.__canvas.style.height = config.height || "873px";
    this.__canvas.style.width = config.width || "1440px";
    this.__canvas.style.background = config.background || "transparent";

    if (config.height.includes("vh")) {
      this.__canvas.height = parseInt(config.height) * 19.2 || 0;
    } else {
      this.__canvas.height = parseInt(config.height) || 0;
    }

    if (config.width.includes("vw")) {
      this.__canvas.width = parseInt(config.width) * 19.2 || 0;
    } else {
      this.__canvas.width = parseInt(config.width) || 0;
    }
  }

  getCanvas() {
    return this.__canvas;
  }

  getContext() {
    return this.__canvas.getContext("2d");
  }

  add(item) {
    this.__items.push(item);
  }

}

var _default = Canvas;
exports.default = _default;

},{"./Drawable":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Drawable {
  constructor() {}

  draw() {
    window.requestAnimationFrame(() => {
      this.__items.forEach(item => {
        item.draw(this.getContext());
      });
    }, 0);
  }

}

var _default = Drawable;
exports.default = _default;

},{}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Line {
  constructor(config = {}) {
    this.__line = {};
    this.__line.points = config.points || [];
    this.__line.options = config.options || {};
  }

  draw(ctx) {
    ctx.beginPath();
    Object.keys(this.__line.options).forEach(key => {
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

var _default = Line;
exports.default = _default;

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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

var _default = Rect;
exports.default = _default;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Canvas = _interopRequireDefault(require("./Canvas"));

var _Drawable = _interopRequireDefault(require("./Drawable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Wrapper extends _Drawable.default {
  constructor(id, config = {}) {
    super();
    this.__items = [];
    this.__wrapper = document.getElementById(id);

    if (!(this.__wrapper instanceof HTMLElement)) {
      return console.warn(`[REDRAW] - Warning - There is no DOM element with ID ${id}`);
    }

    this.__wrapper.style.height = config.height || "873px";
    this.__wrapper.style.width = config.width || "1440px";
    this.__wrapper.style.background = config.background || "transparent";
  }

  add(canvas) {
    if (!(canvas instanceof _Canvas.default)) {
      return console.error(`[REDRAW] - Error - The provided item is not of Redraw Canvas type.`);
    }

    if (this.__wrapper instanceof HTMLElement) {
      const addingCanvas = canvas.getCanvas();

      this.__wrapper.appendChild(addingCanvas);
    }

    this.__items.push(canvas);
  }

}

var _default = Wrapper;
exports.default = _default;

},{"./Canvas":2,"./Drawable":3}]},{},[1]);

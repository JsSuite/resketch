(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _Wrapper = _interopRequireDefault(require("./utils/Wrapper"));

var _Canvas = _interopRequireDefault(require("./utils/Canvas"));

var _Line = _interopRequireDefault(require("./utils/Line"));

var _Rect = _interopRequireDefault(require("./utils/Rect"));

var _Curve = _interopRequireDefault(require("./utils/Curve"));

var _Text = _interopRequireDefault(require("./utils/Text"));

var _Circle = _interopRequireDefault(require("./utils/Circle"));

var _Gradient = _interopRequireDefault(require("./utils/Gradient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const resketch = {
  Wrapper: _Wrapper.default,
  Canvas: _Canvas.default,
  Line: _Line.default,
  Rect: _Rect.default,
  Curve: _Curve.default,
  Text: _Text.default,
  Circle: _Circle.default,
  Gradient: _Gradient.default
};

if (window) {
  window.RESKETCH = resketch;
}

},{"./utils/Canvas":2,"./utils/Circle":3,"./utils/Curve":4,"./utils/Gradient":6,"./utils/Line":7,"./utils/Rect":8,"./utils/Text":9,"./utils/Wrapper":10}],2:[function(require,module,exports){
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
      this.__canvas.height = parseInt(config.height) * 9.69 || 0;
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

  clear() {
    this.__items = [];
  }

}

var _default = Canvas;
exports.default = _default;

},{"./Drawable":5}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Drawable = _interopRequireDefault(require("./Drawable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Circle extends _Drawable.default {
  constructor(config = {}) {
    super();
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.radius = config.radius || 0;
    this.options = config.options || {};
  }

  draw(ctx) {
    ctx.beginPath();
    this.setCtxProperties(ctx);
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);

    if (this.options.fillStyle) {
      ctx.fill();
    }

    if (this.options.strokeStyle) {
      ctx.stroke();
    }

    this.resetCtxProperties(ctx);
  }

}

var _default = Circle;
exports.default = _default;

},{"./Drawable":5}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Drawable = _interopRequireDefault(require("./Drawable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Curve extends _Drawable.default {
  constructor(config = {}) {
    super();
    this.points = config.points || [];
    this.options = config.options || {};
    this.type = config.type || "quadratic";
  }

  draw(ctx) {
    ctx.beginPath();
    this.setCtxProperties(ctx);
    this.points.forEach((point, index) => {
      if (!Array.isArray(point)) {
        throw new Error(`[RESKETCH] - Error - Curve points needs to be an array.`);
      }

      if (this.type === "quadratic" && point.length !== 6) {
        throw new Error(`[RESKETCH] - Error - Quadratic curve needs to have three points. Read more at https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/quadraticCurveTo`);
      }

      if (this.type === "bezier" && point.length !== 6) {
        throw new Error(`[RESKETCH] - Error - Bezier curve needs to have three points. Read more at https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/bezierCurveTo`);
      }

      if (this.type === "quadratic") {
        const startPoint = [point[0], point[1]];

        if (index === 0) {
          ctx.beginPath();
          ctx.moveTo(...startPoint);
        }

        return ctx.quadraticCurveTo(point[2], point[3], point[4], point[5]);
      }

      ctx.bezierCurveTo(...point);
    });
    ctx.stroke();
    this.resetCtxProperties(ctx);
  }

}

var _default = Curve;
exports.default = _default;

},{"./Drawable":5}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Gradient = _interopRequireDefault(require("./Gradient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Drawable {
  constructor() {
    this.originalCtx = {};
  }

  setCtxProperties(ctx) {
    Object.keys(this.options).forEach(key => {
      if (key === "dash") {
        this.originalCtx.dash = ctx.getLineDash();
        return ctx.setLineDash(this.options[key]);
      }

      if ((key === "fillStyle" || key === "strokeStyle") && this.options[key] instanceof _Gradient.default) {
        this.originalCtx[key] = ctx[key];
        return ctx[key] = this.options[key].getGradient(ctx);
      }

      this.originalCtx[key] = ctx[key];
      ctx[key] = this.options[key];
    });
  }

  resetCtxProperties(ctx) {
    Object.keys(this.options).forEach(key => {
      if (key === "dash") {
        return ctx.setLineDash(this.originalCtx.dash);
      }

      ctx[key] = this.originalCtx[key];
    });
  }

  draw() {
    try {
      window.requestAnimationFrame(() => {
        this.__items.forEach(item => {
          item.draw(this.getContext());
        });
      }, 0);
    } catch (ex) {
      console.warn(`[RESKETCH] - Error - ${ex.message}`);
      console.error(ex);
    }
  }

}

var _default = Drawable;
exports.default = _default;

},{"./Gradient":6}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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

    this.colors.forEach(color => {
      if (!Array.isArray(color)) {
        throw new Error(`[RESKETCH] - Error - Gradient color needs to have offset and color as an array. Read more at https://developer.mozilla.org/en-US/docs/Web/API/CanvasGradient/addColorStop`);
      }

      this.gradient.addColorStop(...color);
    });
    return this.gradient;
  }

}

var _default = Gradient;
exports.default = _default;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Drawable = _interopRequireDefault(require("./Drawable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Line extends _Drawable.default {
  constructor(config = {}) {
    super();
    this.points = config.points || [];
    this.options = config.options || {};
  }

  draw(ctx) {
    ctx.beginPath();
    this.setCtxProperties(ctx);
    this.points.forEach((point, index) => {
      if (!Array.isArray(point) || point?.length <= 1) {
        throw new Error(`[RESKETCH] - Error - Line needs to have X,Y points as an array.`);
      }

      if (index === 0) {
        return ctx.moveTo(...point);
      }

      ctx.lineTo(...point);
    });
    ctx.stroke();
    this.resetCtxProperties(ctx);
  }

}

var _default = Line;
exports.default = _default;

},{"./Drawable":5}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Drawable = _interopRequireDefault(require("./Drawable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Rect extends _Drawable.default {
  constructor(config = {}) {
    super();
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.height = config.height || 0;
    this.width = config.width || 0;
    this.options = config.options || {};
  }

  draw(ctx) {
    this.setCtxProperties(ctx);

    if (this.options.strokeStyle) {
      ctx.strokeRect(this.x, this.y, this.width, this.height);
    }

    if (this.options.fillStyle) {
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    this.resetCtxProperties(ctx);
  }

}

var _default = Rect;
exports.default = _default;

},{"./Drawable":5}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Drawable = _interopRequireDefault(require("./Drawable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Text extends _Drawable.default {
  constructor(config = {}) {
    super();
    this.x = config.x || 0;
    this.y = config.y || 0;
    this.height = config.height || 0;
    this.width = config.width || 0;
    this.text = config.text || "";
    this.options = config.options || {};
  }

  draw(ctx) {
    this.setCtxProperties(ctx);

    if (this.options.strokeStyle) {
      ctx.strokeText(this.text, this.x, this.y);
    }

    if (this.options.fillStyle) {
      ctx.fillText(this.text, this.x, this.y);
    }

    this.resetCtxProperties(ctx);
  }

}

var _default = Text;
exports.default = _default;

},{"./Drawable":5}],10:[function(require,module,exports){
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
      return console.warn(`[RESKETCH] - Warning - There is no DOM element with ID ${id}`);
    }

    this.__wrapper.style.height = config.height || "873px";
    this.__wrapper.style.width = config.width || "1440px";
    this.__wrapper.style.background = config.background || "transparent";
  }

  add(canvas) {
    if (!(canvas instanceof _Canvas.default)) {
      return console.error(`[RESKETCH] - Error - The provided item is not of RESKETCH Canvas type.`);
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

},{"./Canvas":2,"./Drawable":5}]},{},[1]);

(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./Drawable"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./Drawable"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Drawable);
    global.Canvas = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _Drawable) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Canvas = void 0;
  class Canvas extends _Drawable.Drawable {
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
  _exports.Canvas = Canvas;
});

},{"./Drawable":4}],2:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./Drawable"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./Drawable"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Drawable);
    global.Circle = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _Drawable) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Circle = void 0;
  class Circle extends _Drawable.Drawable {
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
  _exports.Circle = Circle;
});

},{"./Drawable":4}],3:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./Drawable"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./Drawable"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Drawable);
    global.Curve = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _Drawable) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Curve = void 0;
  class Curve extends _Drawable.Drawable {
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
          throw new Error(`[VIZAT] - Error - Curve points needs to be an array.`);
        }
        if (this.type === "quadratic" && point.length !== 6) {
          throw new Error(`[VIZAT] - Error - Quadratic curve needs to have three points. Read more at https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/quadraticCurveTo`);
        }
        if (this.type === "bezier" && point.length !== 6) {
          throw new Error(`[VIZAT] - Error - Bezier curve needs to have three points. Read more at https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/bezierCurveTo`);
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
  _exports.Curve = Curve;
});

},{"./Drawable":4}],4:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./Gradient"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./Gradient"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Gradient);
    global.Drawable = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _Gradient) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Drawable = void 0;
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
        if ((key === "fillStyle" || key === "strokeStyle") && this.options[key] instanceof _Gradient.Gradient) {
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
        console.warn(`[VIZAT] - Error - ${ex.message}`);
        console.error(ex);
      }
    }
  }
  _exports.Drawable = Drawable;
});

},{"./Gradient":5}],5:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.Gradient = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Gradient = void 0;
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
          throw new Error(`[VIZAT] - Error - Gradient color needs to have offset and color as an array. Read more at https://developer.mozilla.org/en-US/docs/Web/API/CanvasGradient/addColorStop`);
        }
        this.gradient.addColorStop(...color);
      });
      return this.gradient;
    }
  }
  _exports.Gradient = Gradient;
});

},{}],6:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./Drawable"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./Drawable"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Drawable);
    global.Image = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _Drawable) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Image = void 0;
  class Image extends _Drawable.Drawable {
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
      } else if (this.sx && this.sy && this.sWidth && this.sHeight && this.dWidth && this.dHeight) {
        ctx.drawImage(this.image, this.sx, this.sy, this.sWidth, this.sHeight, this.dx, this.dy, this.dWidth, this.dHeight);
      } else if (this.dWidth && this.dHeight) {
        ctx.drawImage(this.image, this.dx, this.dy, this.dWidth, this.dHeight);
      }
      this.resetCtxProperties(ctx);
    }
  }
  _exports.Image = Image;
});

},{"./Drawable":4}],7:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./Drawable"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./Drawable"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Drawable);
    global.Line = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _Drawable) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Line = void 0;
  class Line extends _Drawable.Drawable {
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
          throw new Error(`[VIZAT] - Error - Line needs to have X,Y points as an array.`);
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
  _exports.Line = Line;
});

},{"./Drawable":4}],8:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./Drawable"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./Drawable"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Drawable);
    global.Rect = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _Drawable) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Rect = void 0;
  class Rect extends _Drawable.Drawable {
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
      const translateX = this.x + this.width / 2;
      const translateY = this.y + this.height / 2;
      if (!!this.options.rotation) {
        ctx.translate(translateX, translateY);
        ctx.rotate(this.options.rotation * Math.PI / 180);
        ctx.translate(-translateX, -translateY);
      }
      if (this.options.strokeStyle) {
        ctx.strokeRect(this.x, this.y, this.width, this.height);
      }
      if (this.options.fillStyle) {
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
      this.resetCtxProperties(ctx);
      if (!!this.options.rotation) {
        ctx.translate(translateX, translateY);
        ctx.rotate(-this.options.rotation * Math.PI / 180);
        ctx.translate(-translateX, -translateY);
      }
    }
  }
  _exports.Rect = Rect;
});

},{"./Drawable":4}],9:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./Drawable"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./Drawable"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Drawable);
    global.Text = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _Drawable) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Text = void 0;
  class Text extends _Drawable.Drawable {
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
  _exports.Text = Text;
});

},{"./Drawable":4}],10:[function(require,module,exports){
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "./Canvas", "./Drawable"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("./Canvas"), require("./Drawable"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Canvas, global.Drawable);
    global.Wrapper = mod.exports;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : this, function (_exports, _Canvas, _Drawable) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.Wrapper = void 0;
  class Wrapper extends _Drawable.Drawable {
    constructor(id, config = {}) {
      super();
      this.__items = [];
      this.__wrapper = document.getElementById(id);
      if (!(this.__wrapper instanceof HTMLElement)) {
        return console.warn(`[VIZAT] - Warning - There is no DOM element with ID ${id}`);
      }
      this.__wrapper.style.height = config.height || "873px";
      this.__wrapper.style.width = config.width || "1440px";
      this.__wrapper.style.background = config.background || "transparent";
    }
    add(canvas) {
      if (!(canvas instanceof _Canvas.Canvas)) {
        return console.error(`[VIZAT] - Error - The provided item is not of Vizat Canvas type.`);
      }
      if (this.__wrapper instanceof HTMLElement) {
        const addingCanvas = canvas.getCanvas();
        this.__wrapper.appendChild(addingCanvas);
      }
      this.__items.push(canvas);
    }
  }
  _exports.Wrapper = Wrapper;
});

},{"./Canvas":1,"./Drawable":4}],11:[function(require,module,exports){
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

},{"./utils/Canvas":1,"./utils/Circle":2,"./utils/Curve":3,"./utils/Gradient":5,"./utils/Image":6,"./utils/Line":7,"./utils/Rect":8,"./utils/Text":9,"./utils/Wrapper":10}]},{},[11]);

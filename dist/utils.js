"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = require("react");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function isReactComponent(element) {
  return typeof element.type === "function";
}
function decorateChild(child, props) {
  return /*#__PURE__*/(0, _react.cloneElement)(child, props);
}
function shouldDecorateChild(child) {
  return !!child && isReactComponent(child);
}
function decorateChildren(children, props) {
  return _react.Children.map(children, function (child) {
    return shouldDecorateChild(child) ? decorateChild(child, props) : child;
  });
}
function preventDefault(e) {
  e.preventDefault();
}
function convertRange(oldMin, oldMax, newMin, newMax, oldValue) {
  var percent = (oldValue - oldMin) / (oldMax - oldMin);
  return percent * (newMax - newMin) + newMin;
}
function limitPosition(minX, maxX, minY, maxY) {
  var itemPosition = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var position = _objectSpread({}, itemPosition);
  if (minX !== undefined && position.x < minX) {
    position.x = minX;
  } else if (maxX !== undefined && position.x > maxX) {
    position.x = maxX;
  }
  if (minY !== undefined && position.y < minY) {
    position.y = minY;
  } else if (maxY !== undefined && position.y > maxY) {
    position.y = maxY;
  }
  return position;
}
function createAdjustedLimits(minX, maxX, minY, maxY) {
  var elemDimensions = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var itemDimensions = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
  var limitBySize = arguments.length > 6 ? arguments[6] : undefined;
  var internal = arguments.length > 7 ? arguments[7] : undefined;
  var limits = {
    minX: minX,
    maxX: maxX,
    minY: minY,
    maxY: maxY
  };
  if (limits.maxX < 0) {
    limits.maxX = elemDimensions.width + limits.maxX;
  }
  if (limits.maxY < 0) {
    limits.maxY = elemDimensions.height + limits.maxY;
  }
  if (!limitBySize) {
    return limits;
  }
  if (internal) {
    limits.minX = 0;
    limits.minY = 0;
    limits.maxX = elemDimensions.width - itemDimensions.width;
    limits.maxY = elemDimensions.height - itemDimensions.height;
    if (itemDimensions.width > elemDimensions.width || itemDimensions.height > elemDimensions.height) {
      limits.maxX = 0;
      limits.maxY = 0;
    }
  } else if (itemDimensions.width || itemDimensions.height) {
    limits.maxX = 0;
    limits.maxY = 0;
    limits.minX = -itemDimensions.width + elemDimensions.width;
    limits.minY = -itemDimensions.height + elemDimensions.height;
    if (itemDimensions.width < elemDimensions.width || itemDimensions.height < elemDimensions.height) {
      limits.minX = 0;
      limits.minY = 0;
    }
  }
  return limits;
}
function calculateItemPosition() {
  var itemPosition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var prevActivePosition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var activePosition = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var multiplier = arguments.length > 3 ? arguments[3] : undefined;
  var newItemPosition = _objectSpread({}, itemPosition);
  var moveX = (activePosition.x - prevActivePosition.x) * multiplier;
  var moveY = (activePosition.y - prevActivePosition.y) * multiplier;
  newItemPosition.x += moveX;
  newItemPosition.y += moveY;
  return newItemPosition;
}
function alignItemOnPosition() {
  var elemDimensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var itemDimensions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var position = arguments.length > 2 ? arguments[2] : undefined;
  var oldMaxX = elemDimensions.width;
  var newMaxX = -(itemDimensions.width || 0) + elemDimensions.width;
  var oldMaxY = elemDimensions.height;
  var newMaxY = -(itemDimensions.height || 0) + elemDimensions.height;
  return {
    x: convertRange(0, oldMaxX, 0, newMaxX, position.x),
    y: convertRange(0, oldMaxY, 0, newMaxY, position.y)
  };
}
function centerItemOnPosition() {
  var elemDimensions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var itemDimensions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var position = arguments.length > 2 ? arguments[2] : undefined;
  var itemPosition = alignItemOnPosition(elemDimensions, itemDimensions, position);
  itemPosition.x += elemDimensions.width / 2 - position.x;
  itemPosition.y += elemDimensions.height / 2 - position.y;
  return itemPosition;
}
var _default = {
  decorateChildren: decorateChildren,
  preventDefault: preventDefault,
  convertRange: convertRange,
  limitPosition: limitPosition,
  createAdjustedLimits: createAdjustedLimits,
  calculateItemPosition: calculateItemPosition,
  alignItemOnPosition: alignItemOnPosition,
  centerItemOnPosition: centerItemOnPosition
};
exports["default"] = _default;
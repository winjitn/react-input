"use strict";

var _utils = _interopRequireDefault(require("../utils"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
describe("prevent default", function () {
  it("calls preventDefault on event", function () {
    var mockEvent = {
      preventDefault: jest.fn()
    };
    _utils["default"].preventDefault(mockEvent);
    expect(mockEvent.preventDefault).toHaveBeenCalled();
  });
});
describe("convert range", function () {
  it("converts number to equivalent in new range", function () {
    expect(_utils["default"].convertRange(0, 10, 100, 200, 5)).toBe(150);
    expect(_utils["default"].convertRange(0, 50, 50, 100, 5)).toBe(55);
  });
});
describe("limit position", function () {
  var position = {
    x: 5,
    y: 5
  };
  it("doesn't change valid position", function () {
    expect(_utils["default"].limitPosition(0, 10, 0, 10, position)).toEqual(position);
  });
  it("limits X to max", function () {
    expect(_utils["default"].limitPosition(0, 4, 0, 10, position)).toEqual({
      x: 4,
      y: 5
    });
  });
  it("limits X to min", function () {
    expect(_utils["default"].limitPosition(6, 10, 0, 10, position)).toEqual({
      x: 6,
      y: 5
    });
  });
  it("limits Y to min", function () {
    expect(_utils["default"].limitPosition(0, 10, 0, 4, position)).toEqual({
      x: 5,
      y: 4
    });
  });
  it("limits Y to max", function () {
    expect(_utils["default"].limitPosition(0, 10, 6, 10, position)).toEqual({
      x: 5,
      y: 6
    });
  });
});
describe("create adjusted limits", function () {
  var elemDimensions = {
    width: 100,
    height: 100
  };
  var smallItemDimensions = {
    width: 50,
    height: 50
  };
  var bigItemDimensions = {
    width: 150,
    height: 150
  };
  it("doesn't adjust if not limited by size", function () {
    expect(_utils["default"].createAdjustedLimits(0, 10, 0, 10, elemDimensions, bigItemDimensions, false, false)).toEqual({
      minX: 0,
      maxX: 10,
      minY: 0,
      maxY: 10
    });
  });
  it("uses element dimensions with negative max limits", function () {
    expect(_utils["default"].createAdjustedLimits(0, -10, 0, -10, elemDimensions, bigItemDimensions, false, false)).toEqual({
      minX: 0,
      maxX: 90,
      minY: 0,
      maxY: 90
    });
  });
  it("limits by size", function () {
    expect(_utils["default"].createAdjustedLimits(0, 0, 0, 0, elemDimensions, bigItemDimensions, true, false)).toEqual({
      minX: -50,
      maxX: 0,
      minY: -50,
      maxY: 0
    });
  });
  it("limits by size using undefined itemDimensions", function () {
    expect(_utils["default"].createAdjustedLimits(0, 0, 0, 0, elemDimensions, {}, true, false)).toEqual({
      minX: 0,
      maxX: 0,
      minY: 0,
      maxY: 0
    });
  });
  it("limits by size - internal", function () {
    expect(_utils["default"].createAdjustedLimits(0, 0, 0, 0, elemDimensions, smallItemDimensions, true, true)).toEqual({
      minX: 0,
      maxX: 50,
      minY: 0,
      maxY: 50
    });
  });
  it("returns zeroed position when limiting by invalid size", function () {
    expect(_utils["default"].createAdjustedLimits(0, 0, 0, 0, elemDimensions, smallItemDimensions, true, false)).toEqual({
      minX: 0,
      maxX: 0,
      minY: 0,
      maxY: 0
    });
  });
  it("returns zeroed position when limiting by invalid size - internal", function () {
    expect(_utils["default"].createAdjustedLimits(0, 0, 0, 0, elemDimensions, bigItemDimensions, true, true)).toEqual({
      minX: 0,
      maxX: 0,
      minY: 0,
      maxY: 0
    });
  });
});
describe("calculate item position", function () {
  var itemPosition = {
    x: 50,
    y: 50
  };
  var activePosition = {
    x: 75,
    y: 75
  };
  var prevActivePosition = {
    x: 80,
    y: 90
  };
  it("calculates position with 1x multiplier", function () {
    expect(_utils["default"].calculateItemPosition(itemPosition, prevActivePosition, activePosition, 1)).toEqual({
      x: 45,
      y: 35
    });
  });
  it("calculates position with 2x multiplier", function () {
    expect(_utils["default"].calculateItemPosition(itemPosition, prevActivePosition, activePosition, 2)).toEqual({
      x: 40,
      y: 20
    });
  });
});
describe("align item on position", function () {
  var elementDimensions = {
    width: 100,
    height: 100
  };
  var itemDimensions = {
    width: 300,
    height: 300
  };
  var position = {
    x: 20,
    y: 20
  };
  it("aligns item based on cursor position", function () {
    expect(_utils["default"].alignItemOnPosition(elementDimensions, itemDimensions, position)).toEqual({
      x: -40,
      y: -40
    });
  });
  it("handles undefined item dimensions", function () {
    expect(_utils["default"].alignItemOnPosition(elementDimensions, {}, position)).toEqual({
      x: 20,
      y: 20
    });
  });
});
describe("center item on position", function () {
  var elementDimensions = {
    width: 100,
    height: 100
  };
  var itemDimensions = {
    width: 300,
    height: 300
  };
  var position = {
    x: 20,
    y: 20
  };
  it("centers specific spot on item within element based on cursor position", function () {
    expect(_utils["default"].centerItemOnPosition(elementDimensions, itemDimensions, position)).toEqual({
      x: -10,
      y: -10
    });
  });
});
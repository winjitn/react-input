"use strict";

var _touchActivation = _interopRequireDefault(require("../touchActivation"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var mockComponent;
var clearTimeoutSpy;
var event;
beforeAll(function () {
  clearTimeoutSpy = jest.spyOn(window, "clearTimeout");
});
beforeEach(function () {
  mockComponent = {
    startTapTimer: jest.fn(),
    startDoubleTapTimer: jest.fn(),
    startLongTouchTimer: jest.fn(),
    toggleActive: jest.fn(),
    setPosition: jest.fn(),
    activate: jest.fn(),
    deactivate: jest.fn(),
    state: {
      active: false
    },
    props: {
      longTouchMoveLimit: 10
    },
    getState: function getState() {
      return this.state;
    }
  };
  event = {
    touches: [{
      clientX: 40,
      clientY: 50
    }],
    changedTouches: [{
      clientX: 40,
      clientY: 50
    }],
    preventDefault: jest.fn(),
    cancelable: true
  };
});
afterEach(function () {
  clearTimeoutSpy.mockReset();
});
afterAll(function () {
  clearTimeoutSpy.mockRestore();
});
describe("touch - tap activation event handlers", function () {
  var _touchHandlers$tap = _touchActivation["default"].tap,
    touchStart = _touchHandlers$tap.touchStart,
    touchEnd = _touchHandlers$tap.touchEnd,
    touchMove = _touchHandlers$tap.touchMove,
    touchCancel = _touchHandlers$tap.touchCancel;
  it("sets correct properties and starts tap timer on touch start", function () {
    touchStart.call(mockComponent);
    expect(mockComponent.touched).toBe(true);
    expect(mockComponent.startTapTimer).toHaveBeenCalledTimes(1);
  });
  it("calls toggleActive on touch end if tapTimer hasn't expired", function () {
    var clearTimeoutSpy = jest.spyOn(window, "clearTimeout");
    mockComponent.touched = true;
    touchEnd.call(mockComponent, event);
    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(mockComponent.toggleActive).toHaveBeenCalledTimes(1);
    expect(mockComponent.toggleActive).toHaveBeenCalledWith({
      x: 40,
      y: 50
    });
    expect(mockComponent.touched).toBe(false);
    expect(mockComponent.tapTimedOut).toBe(false);
  });
  it("doesn't call toggleActive on touch end if tapTimer expired", function () {
    mockComponent.tapTimedOut = true;
    touchEnd.call(mockComponent, {});
    expect(mockComponent.toggleActive).toHaveBeenCalledTimes(0);
    expect(mockComponent.tapTimedOut).toBe(false);
  });
  it("does nothing on touch move when inactive", function () {
    touchMove.call(mockComponent);
    expect(mockComponent.setPosition).toHaveBeenCalledTimes(0);
  });
  it("calls setPosition on touch move when active", function () {
    mockComponent.state.active = true;
    mockComponent.touched = true;
    touchMove.call(mockComponent, event);
    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    expect(mockComponent.setPosition).toHaveBeenCalledTimes(1);
    expect(mockComponent.setPosition).toHaveBeenCalledWith({
      x: 40,
      y: 50
    }, true);
  });
  it("doesn't call preventDefault on touch move when not cancelable", function () {
    event.cancelable = false;
    mockComponent.state.active = true;
    touchMove.call(mockComponent, event);
    expect(event.preventDefault).toHaveBeenCalledTimes(0);
  });
  it("calls deactivate on touch cancel", function () {
    touchCancel.call(mockComponent);
    expect(mockComponent.deactivate).toHaveBeenCalledTimes(1);
  });
});
describe("touch - double tap activation event handlers", function () {
  var _touchHandlers$double = _touchActivation["default"].doubleTap,
    touchStart = _touchHandlers$double.touchStart,
    touchEnd = _touchHandlers$double.touchEnd,
    touchMove = _touchHandlers$double.touchMove,
    touchCancel = _touchHandlers$double.touchCancel;
  it("sets correct properties and starts tap timer on touch start", function () {
    touchStart.call(mockComponent);
    expect(mockComponent.touched).toBe(true);
    expect(mockComponent.startTapTimer).toHaveBeenCalledTimes(1);
  });
  it("sets tapped to true on touch end if tapTimer hasn't expired - first tap", function () {
    mockComponent.touched = true;
    mockComponent.tapTimedOut = false;
    touchEnd.call(mockComponent, {});
    expect(mockComponent.tapped).toBe(true);
    expect(mockComponent.touched).toBe(false);
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(mockComponent.startDoubleTapTimer).toHaveBeenCalledTimes(1);
  });
  it("sets tapTimedOut to false if tapTimer expired", function () {
    mockComponent.touched = true;
    mockComponent.tapTimedOut = true;
    touchEnd.call(mockComponent, {});
    expect(mockComponent.tapTimedOut).toBe(false);
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(0);
  });
  it("calls toggleActive on touch end if doubleTapTimer hasn't expired - second tap", function () {
    mockComponent.touched = true;
    mockComponent.tapped = true;
    mockComponent.doubleTapTimedOut = false;
    touchEnd.call(mockComponent, event);
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(2);
    expect(mockComponent.toggleActive).toHaveBeenCalledTimes(1);
    expect(mockComponent.toggleActive).toHaveBeenCalledWith({
      x: 40,
      y: 50
    });
    expect(mockComponent.touched).toBe(false);
    expect(mockComponent.tapped).toBe(false);
  });
  it("it sets correct properties when doubleTapTimer has expired - second tap", function () {
    mockComponent.touched = true;
    mockComponent.tapTimedOut = false;
    touchEnd.call(mockComponent, {});
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(mockComponent.toggleActive).toHaveBeenCalledTimes(0);
    expect(mockComponent.tapTimedOut).toBe(false);
    expect(mockComponent.doubleTapTimedOut).toBe(false);
    expect(mockComponent.tapped).toBe(true);
    expect(mockComponent.startDoubleTapTimer).toHaveBeenCalledTimes(1);
  });
  it("calls setPosition on touch move when active", function () {
    mockComponent.touched = true;
    mockComponent.state.active = true;
    touchMove.call(mockComponent, event);
    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    expect(mockComponent.setPosition).toHaveBeenCalledTimes(1);
    expect(mockComponent.setPosition).toHaveBeenCalledWith({
      x: 40,
      y: 50
    }, true);
  });
  it("does nothing on touch move when inactive", function () {
    mockComponent.state.active = false;
    touchMove.call(mockComponent, {});
    expect(mockComponent.setPosition).toHaveBeenCalledTimes(0);
  });
  it("doesn't call preventDefault on touch move when not cancelable", function () {
    event.cancelable = false;
    mockComponent.state.active = true;
    touchMove.call(mockComponent, event);
    expect(event.preventDefault).toHaveBeenCalledTimes(0);
  });
  it("calls deactivate on touch cancel", function () {
    touchCancel.call(mockComponent);
    expect(mockComponent.deactivate).toHaveBeenCalledTimes(1);
  });
});
describe("touch - touch activation event handlers", function () {
  var _touchHandlers$touch = _touchActivation["default"].touch,
    touchStart = _touchHandlers$touch.touchStart,
    touchEnd = _touchHandlers$touch.touchEnd,
    touchMove = _touchHandlers$touch.touchMove,
    touchCancel = _touchHandlers$touch.touchCancel;
  it("calls activate on touch start", function () {
    touchStart.call(mockComponent, event);
    expect(mockComponent.touched).toBe(true);
    expect(mockComponent.activate).toHaveBeenCalledTimes(1);
    expect(mockComponent.activate).toHaveBeenCalledWith({
      x: 40,
      y: 50
    });
  });
  it("calls deactive on touch end", function () {
    touchEnd.call(mockComponent, event);
    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    expect(mockComponent.touched).toBe(false);
    expect(mockComponent.deactivate).toHaveBeenCalledTimes(1);
  });
  it("doesn't call preventDefault on touch end when not cancelable", function () {
    event.cancelable = false;
    touchEnd.call(mockComponent, event);
    expect(event.preventDefault).toHaveBeenCalledTimes(0);
  });
  it("calls setPosition on touch move when active", function () {
    mockComponent.touched = true;
    mockComponent.state.active = true;
    touchMove.call(mockComponent, event);
    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    expect(mockComponent.setPosition).toHaveBeenCalledTimes(1);
    expect(mockComponent.setPosition).toHaveBeenCalledWith({
      x: 40,
      y: 50
    }, true);
  });
  it("does nothing on touch move when inactive", function () {
    touchMove.call(mockComponent, event);
    expect(mockComponent.setPosition).toHaveBeenCalledTimes(0);
  });
  it("doesn't call preventDefault on touch move when not cancelable", function () {
    event.cancelable = false;
    mockComponent.state.active = true;
    touchMove.call(mockComponent, event);
    expect(event.preventDefault).toHaveBeenCalledTimes(0);
  });
  it("calls deactivate on touch cancel", function () {
    touchCancel.call(mockComponent);
    expect(mockComponent.deactivate).toHaveBeenCalledTimes(1);
  });
});
describe("touch - long touch activation event handlers", function () {
  var _touchHandlers$longTo = _touchActivation["default"].longTouch,
    touchStart = _touchHandlers$longTo.touchStart,
    touchEnd = _touchHandlers$longTo.touchEnd,
    touchMove = _touchHandlers$longTo.touchMove,
    touchCancel = _touchHandlers$longTo.touchCancel;
  it("starts longTouchTimer on touch start", function () {
    touchStart.call(mockComponent, event);
    expect(mockComponent.touched).toBe(true);
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(mockComponent.longTouchStartRef).toBe(90);
    expect(mockComponent.startLongTouchTimer).toHaveBeenCalledTimes(1);
    expect(mockComponent.startLongTouchTimer).toHaveBeenCalledWith({
      x: 40,
      y: 50
    });
  });
  it("sets touched to false on touch end", function () {
    touchEnd.call(mockComponent, event);
    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    expect(mockComponent.touched).toBe(false);
  });
  it("doesn't call preventDefault on touch end when not cancelable", function () {
    event.cancelable = false;
    touchEnd.call(mockComponent, event);
    expect(event.preventDefault).toHaveBeenCalledTimes(0);
  });
  it("calls setPosition and clearTimeout on touch move", function () {
    mockComponent.state.active = true;
    mockComponent.touched = true;
    touchMove.call(mockComponent, event);
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(0);
    expect(event.preventDefault).toHaveBeenCalledTimes(1);
    expect(mockComponent.setPosition).toHaveBeenCalledTimes(1);
    expect(mockComponent.setPosition).toHaveBeenCalledWith({
      x: 40,
      y: 50
    }, true);
  });
  it("calls only clearTimeout on touch move when exceeding move limit and inactive", function () {
    mockComponent.longTouchStartRef = 200;
    mockComponent.state.active = false;
    mockComponent.touched = true;
    touchMove.call(mockComponent, event);
    expect(clearTimeoutSpy).toHaveBeenCalledTimes(1);
    expect(mockComponent.setPosition).toHaveBeenCalledTimes(0);
  });
  it("doesn't call preventDefault on touch move when not cancelable", function () {
    event.cancelable = false;
    mockComponent.state.active = true;
    touchMove.call(mockComponent, event);
    expect(event.preventDefault).toHaveBeenCalledTimes(0);
  });
  it("calls deactivate on touch cancel", function () {
    touchCancel.call(mockComponent);
    expect(mockComponent.deactivate).toHaveBeenCalledTimes(1);
  });
});
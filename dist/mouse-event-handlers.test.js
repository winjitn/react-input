"use strict";

var _mouseActivation = _interopRequireDefault(require("../mouseActivation"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var mockComponent;
beforeEach(function () {
  mockComponent = {
    toggleActive: jest.fn(),
    setPosition: jest.fn(),
    setPassivePosition: jest.fn(),
    activate: jest.fn(),
    deactivate: jest.fn(),
    props: {
      mouseDownAllowOutside: false
    },
    state: {
      active: false
    },
    getState: function getState() {
      return this.state;
    }
  };
});
describe("mouse - click activation event handlers", function () {
  var _mouseHandlers$click = _mouseActivation["default"].click,
    mouseDown = _mouseHandlers$click.mouseDown,
    mouseUp = _mouseHandlers$click.mouseUp,
    mouseMove = _mouseHandlers$click.mouseMove,
    mouseLeave = _mouseHandlers$click.mouseLeave;
  it("sets correct properties on mouse down", function () {
    mouseDown.call(mockComponent, {
      clientX: 40,
      clientY: 50
    });
    expect(mockComponent.mouseDown).toBe(true);
    expect(mockComponent.clickMoveStartRef).toBe(90);
  });
  it("calls toggleActive on mouse up", function () {
    mockComponent.mouseDown = true;
    mockComponent.props = {
      clickMoveLimit: 20
    };
    mockComponent.clickMoveStartRef = 90;
    mouseUp.call(mockComponent, {
      clientX: 40,
      clientY: 50
    });
    expect(mockComponent.mouseDown).toBe(false);
    expect(mockComponent.toggleActive).toHaveBeenCalledTimes(1);
    expect(mockComponent.toggleActive).toHaveBeenCalledWith({
      x: 40,
      y: 50
    });
  });
  it("doesn't call toggleActive on mouse up when exceeding clickMoveLimit", function () {
    mockComponent.mouseDown = true;
    mockComponent.props = {
      clickMoveLimit: 20
    };
    mockComponent.clickMoveStartRef = 90;
    mouseUp.call(mockComponent, {
      clientX: 40,
      clientY: 25
    });
    expect(mockComponent.toggleActive).toHaveBeenCalledTimes(0);
  });
  it("does nothing on mouse up with no preceeding mouse down event", function () {
    mouseUp.call(mockComponent, {
      clientX: 40,
      clientY: 50
    });
    expect(mockComponent.mouseDown).toBe(undefined);
    expect(mockComponent.toggleActive).toHaveBeenCalledTimes(0);
  });
  it("calls setPassivePosition on mouse move when inactive", function () {
    mouseMove.call(mockComponent, {
      clientX: 40,
      clientY: 50
    });
    expect(mockComponent.setPassivePosition).toHaveBeenCalledTimes(1);
    expect(mockComponent.setPassivePosition).toHaveBeenCalledWith({
      x: 40,
      y: 50
    });
    expect(mockComponent.setPosition).toHaveBeenCalledTimes(0);
  });
  it("calls setPosition on mouse move when active", function () {
    mockComponent.state.active = true;
    mockComponent.mouseDown = true;
    mouseMove.call(mockComponent, {
      clientX: 40,
      clientY: 50
    });
    expect(mockComponent.setPosition).toHaveBeenCalledTimes(1);
    expect(mockComponent.setPosition).toHaveBeenCalledWith({
      x: 40,
      y: 50
    }, true);
  });
  it("sets correct properties on mouse leave", function () {
    mockComponent.mouseDown = true;
    mouseLeave.call(mockComponent);
    expect(mockComponent.mouseDown).toBe(false);
  });
});
describe("mouse - double click activation event handlers", function () {
  var _mouseHandlers$double = _mouseActivation["default"].doubleClick,
    mouseDown = _mouseHandlers$double.mouseDown,
    mouseUp = _mouseHandlers$double.mouseUp,
    dblClick = _mouseHandlers$double.dblClick,
    mouseMove = _mouseHandlers$double.mouseMove,
    mouseLeave = _mouseHandlers$double.mouseLeave;
  it("sets correct properties on mouse down", function () {
    mouseDown.call(mockComponent);
    expect(mockComponent.mouseDown).toBe(true);
  });
  it("sets correct properties on mouse up", function () {
    mouseUp.call(mockComponent);
    expect(mockComponent.mouseDown).toBe(false);
  });
  it("calls toggleActive on double click", function () {
    dblClick.call(mockComponent, {
      clientX: 40,
      clientY: 50
    });
    expect(mockComponent.toggleActive).toHaveBeenCalledTimes(1);
    expect(mockComponent.toggleActive).toHaveBeenCalledWith({
      x: 40,
      y: 50
    });
  });
  it("calls setPassivePosition on mouse move when inactive", function () {
    mouseMove.call(mockComponent, {
      clientX: 40,
      clientY: 50
    });
    expect(mockComponent.setPassivePosition).toHaveBeenCalledTimes(1);
    expect(mockComponent.setPassivePosition).toHaveBeenCalledWith({
      x: 40,
      y: 50
    });
    expect(mockComponent.setPosition).toHaveBeenCalledTimes(0);
  });
  it("calls setPosition on mouse move when active", function () {
    mockComponent.state.active = true;
    mockComponent.mouseDown = true;
    mouseMove.call(mockComponent, {
      clientX: 40,
      clientY: 50
    });
    expect(mockComponent.setPosition).toHaveBeenCalledTimes(1);
    expect(mockComponent.setPosition).toHaveBeenCalledWith({
      x: 40,
      y: 50
    }, true);
  });
  it("sets correct properties on mouse leave", function () {
    mockComponent.mouseDown = true;
    mouseLeave.call(mockComponent);
    expect(mockComponent.mouseDown).toBe(false);
  });
});
describe("mouse - hover activation event handlers", function () {
  var _mouseHandlers$hover = _mouseActivation["default"].hover,
    mouseDown = _mouseHandlers$hover.mouseDown,
    mouseUp = _mouseHandlers$hover.mouseUp,
    mouseMove = _mouseHandlers$hover.mouseMove,
    mouseEnter = _mouseHandlers$hover.mouseEnter,
    mouseLeave = _mouseHandlers$hover.mouseLeave;
  it("sets correct properties on mouse down", function () {
    mouseDown.call(mockComponent);
    expect(mockComponent.mouseDown).toBe(true);
  });
  it("sets correct properties on mouse up", function () {
    mouseUp.call(mockComponent);
    expect(mockComponent.mouseDown).toBe(false);
  });
  it("calls active on mouse move when inactive", function () {
    mouseMove.call(mockComponent, {
      clientX: 40,
      clientY: 50
    });
    expect(mockComponent.activate).toHaveBeenCalledTimes(1);
    expect(mockComponent.activate).toHaveBeenCalledWith({
      x: 40,
      y: 50
    });
    expect(mockComponent.setPosition).toHaveBeenCalledTimes(0);
  });
  it("calls setPosition on mouse move when active", function () {
    mockComponent.state.active = true;
    mockComponent.mouseDown = true;
    mouseMove.call(mockComponent, {
      clientX: 40,
      clientY: 50
    });
    expect(mockComponent.setPosition).toHaveBeenCalledTimes(1);
    expect(mockComponent.setPosition).toHaveBeenCalledWith({
      x: 40,
      y: 50
    }, true);
  });
  it("calls activate on mouse enter", function () {
    mouseEnter.call(mockComponent, {
      clientX: 40,
      clientY: 50
    });
    expect(mockComponent.activate).toHaveBeenCalledTimes(1);
    expect(mockComponent.activate).toHaveBeenCalledWith({
      x: 40,
      y: 50
    });
  });
  it("calls deactive and sets correct properties on mouse leave", function () {
    mockComponent.mouseDown = true;
    mouseLeave.call(mockComponent);
    expect(mockComponent.deactivate).toHaveBeenCalledTimes(1);
    expect(mockComponent.mouseDown).toBe(false);
  });
});
describe("mouse - mouse down activation event handlers", function () {
  var _mouseHandlers$mouseD = _mouseActivation["default"].mouseDown,
    mouseDown = _mouseHandlers$mouseD.mouseDown,
    mouseUp = _mouseHandlers$mouseD.mouseUp,
    mouseMove = _mouseHandlers$mouseD.mouseMove,
    mouseLeave = _mouseHandlers$mouseD.mouseLeave;
  it("calls activate on mouse down", function () {
    mouseDown.call(mockComponent, {
      clientX: 40,
      clientY: 50
    });
    expect(mockComponent.activate).toHaveBeenCalledTimes(1);
    expect(mockComponent.activate).toHaveBeenCalledWith({
      x: 40,
      y: 50
    });
  });
  it("calls deactivate on mouse up", function () {
    mouseUp.call(mockComponent);
    expect(mockComponent.deactivate).toHaveBeenCalledTimes(1);
  });
  it("calls setPassivePosition on mouse move when inactive", function () {
    mouseMove.call(mockComponent, {
      clientX: 40,
      clientY: 50
    });
    expect(mockComponent.setPassivePosition).toHaveBeenCalledTimes(1);
    expect(mockComponent.setPassivePosition).toHaveBeenCalledWith({
      x: 40,
      y: 50
    });
    expect(mockComponent.setPosition).toHaveBeenCalledTimes(0);
  });
  it("calls setPosition on mouse move when active", function () {
    mockComponent.state.active = true;
    mouseMove.call(mockComponent, {
      clientX: 40,
      clientY: 50
    });
    expect(mockComponent.setPosition).toHaveBeenCalledTimes(1);
    expect(mockComponent.setPosition).toHaveBeenCalledWith({
      x: 40,
      y: 50
    }, true);
  });
  it("calls deactivate on mouse leave when active", function () {
    mockComponent.state.active = true;
    mouseLeave.call(mockComponent);
    expect(mockComponent.deactivate).toHaveBeenCalledTimes(1);
  });
  it("does nothing on mouse leave when inactive", function () {
    mouseLeave.call(mockComponent);
    expect(mockComponent.deactivate).toHaveBeenCalledTimes(0);
  });
});
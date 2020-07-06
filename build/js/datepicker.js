"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _dateView = _interopRequireDefault(require("./date-view"));

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _chronoNode = _interopRequireDefault(require("chrono-node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DEFAULT_DATE_FORMAT = "MM/DD/YYYY";
var DEFAULT_DATE_TIME_FORMAT = "MM/DD/YYYY h:mm a";
var ENTER_KEY = "Enter";

var DatePicker = /*#__PURE__*/function (_React$Component) {
  _inherits(DatePicker, _React$Component);

  var _super = _createSuper(DatePicker);

  function DatePicker(props) {
    var _this;

    _classCallCheck(this, DatePicker);

    _this = _super.call(this, props);
    var endDate = _this.props.defaultEndDate;
    var startDate = _this.props.defaultDate;

    if (!startDate) {
      startDate = _momentTimezone["default"].tz(_this.props.timezone);
    } else {
      startDate.tz(_this.props.timezone);
    }

    if (!endDate) {
      endDate = _momentTimezone["default"].tz(startDate, _this.props.timezone).add(1, "months");
    } else {
      endDate.tz(_this.props.timezone);
    }

    var dateFormat;

    if (props.format) {
      dateFormat = props.format;
    } else if (props.enableTime) {
      dateFormat = DEFAULT_DATE_TIME_FORMAT;
    } else {
      dateFormat = DEFAULT_DATE_FORMAT;
    }

    _this.state = {
      datepickerVisible: null,
      endDate: endDate,
      endDateInputValue: endDate.format(dateFormat),
      // String value of date
      endInputHasChanged: false,
      startDate: startDate,
      startDateInputValue: startDate.format(dateFormat),
      // String value of date
      startInputHasChanged: false,
      format: dateFormat
    };

    var toggleFunction = _this.toggleDatepicker.bind(_assertThisInitialized(_this), null);

    _this.naturalBinders = getBinders(toggleFunction);
    _this.dateView = /*#__PURE__*/_react["default"].createRef();
    return _this;
  }

  _createClass(DatePicker, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.isRange) {
        this.props.onChange({
          startDate: clone(this.state.startDate, this.props.timezone),
          endDate: clone(this.state.endDate, this.props.timezone)
        });
      } else {
        this.props.onChange({
          date: clone(this.state.startDate, this.props.timezone)
        });
      }
    }
  }, {
    key: "getValue",
    value: function getValue() {
      if (this.props.isRange) {
        return {
          startDate: clone(this.state.startDate, this.props.timezone),
          endDate: clone(this.state.endDate, this.props.timezone)
        };
      } else {
        return {
          date: clone(this.state.startDate, this.props.timezone)
        };
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(newProps) {
      // if the date has changed from the parent AND
      // it's different than the date we have in state, use it
      if (!this.state.endDate.isSame(newProps.defaultEndDate) && newProps.defaultEndDate !== this.props.defaultEndDate && !newProps.defaultEndDate.isSame(this.props.defaultEndDate) || !this.state.startDate.isSame(newProps.defaultDate) && !newProps.defaultDate !== this.props.defaultDate && !newProps.defaultDate.isSame(this.props.defaultDate)) {
        var endDate = newProps.defaultEndDate;
        var startDate = newProps.defaultDate;

        if (!startDate) {
          startDate = _momentTimezone["default"].tz(newProps.timezone);
        } else {
          startDate = startDate.tz(newProps.timezone);
        }

        if (!endDate) {
          endDate = clone(startDate, newProps.timezone).add(1, "months");
        } else {
          endDate = endDate.tz(newProps.timezone);
        }

        this.setState({
          endDate: endDate,
          startDate: startDate,
          endDateInputValue: endDate.format(this.state.format),
          startDateInputValue: startDate.format(this.state.format)
        });
      }
    }
  }, {
    key: "toggleGlobalClickBinding",
    value: function toggleGlobalClickBinding() {
      if (this.state.datepickerVisible) {
        this.naturalBinders.bind();
      } else {
        this.naturalBinders.unbind();
      }
    }
    /**** helpers ****/

  }, {
    key: "getMinDateForType",
    value: function getMinDateForType(type) {
      if (type === "startDate") {
        return this.props.minDate;
      } else if (type === "endDate") {
        if (this.state.startDate.isAfter(this.props.minDate)) {
          return this.state.startDate;
        } else {
          return this.props.minDate;
        }
      } else {
        throw Error("unknown type sent to getMinDateForType. type: " + type);
      }
    }
  }, {
    key: "getMaxDateForType",
    value: function getMaxDateForType(type) {
      if (type === "endDate") {
        return this.props.maxDate;
      } else if (type === "startDate") {
        if (this.state.endDate.isBefore(this.props.maxDate) && this.props.isRange) {
          return this.state.endDate;
        } else {
          return this.props.maxDate;
        }
      } else {
        throw Error("unknown type sent to getMaxDateForType. type: " + type);
      }
    }
  }, {
    key: "validateDateString",
    value: function validateDateString(string) {
      // add the timezone onto the string so it's properly converted
      // Chrono returns a datetime stamp for valid dates, and for invalid dates, returns null
      var date = _chronoNode["default"].parseDate(string + " " + _momentTimezone["default"].tz(this.props.timezone).format('Z'));

      return date;
    }
    /**** handlers ****/

  }, {
    key: "toggleDatepicker",
    value: function toggleDatepicker(type, e) {
      if (e) {
        e.stopPropagation();
      }

      this.setState({
        datepickerVisible: type
      }, this.toggleGlobalClickBinding.bind(this));
    }
  }, {
    key: "openDatepicker",
    value: function openDatepicker(type, e) {
      if (e) {
        e.stopPropagation();
      }

      this.setState({
        datepickerVisible: type
      });
    }
  }, {
    key: "closeDatepicker",
    value: function closeDatepicker(type, e) {
      if (e) {
        e.stopPropagation();
      }

      if (type === "startDate") {
        this.handleStartDateSet();
      } else if (type === "endDate") {
        this.handleEndDateSet();
      }

      this.toggleGlobalClickBinding();
    }
  }, {
    key: "handleDateSelection",
    value: function handleDateSelection(type, date, options) {
      var mutableDate = clone(date, this.props.timezone); // round to make sure it's simply the same date;

      mutableDate.hour(0).minute(0).second(0).millisecond(0);

      if (mutableDate.isBefore(this.props.minDate) || mutableDate.isAfter(this.props.maxDate)) {
        return false;
      }

      if (type === "endDate") {
        if (date.isSameOrBefore(this.state.startDate)) {
          return false;
        }
      } else if (type === "startDate") {
        if (date.isSameOrAfter(this.state.endDate) && this.props.isRange) {
          return false;
        }
      }

      var newState = {};
      newState.datepickerVisible = null;

      if (options && typeof options.collapse === "boolean") {
        if (!options.collapse) {
          newState.datepickerVisible = type;
        }
      }

      newState[type] = date;

      if (this.props.inputEditable) {
        newState["".concat(type, "InputValue")] = date.format(this.state.format);
      }

      this.setState(newState, this.handleOnChange.bind(this));
    }
  }, {
    key: "handleStartDateInputChange",
    value: function handleStartDateInputChange(e) {
      this.setState({
        startDateInputValue: e.target.value,
        startInputHasChanged: true
      });
    }
  }, {
    key: "handleEndDateInputChange",
    value: function handleEndDateInputChange(e) {
      this.setState({
        endDateInputValue: e.target.value,
        endInputHasChanged: true
      });
    }
  }, {
    key: "handleStartDateKeyPress",
    value: function handleStartDateKeyPress(e) {
      if (e.key === ENTER_KEY) {
        this.handleStartDateSet();
      }
    }
  }, {
    key: "handleEndDateKeyPress",
    value: function handleEndDateKeyPress(e) {
      if (e.key === ENTER_KEY) {
        this.handleEndDateSet();
      }
    }
  }, {
    key: "handleStartDateSet",
    value: function handleStartDateSet() {
      var _this2 = this;

      var _this$state = this.state,
          startInputHasChanged = _this$state.startInputHasChanged,
          startDateInputValue = _this$state.startDateInputValue,
          format = _this$state.format;
      var _this$props = this.props,
          enableTime = _this$props.enableTime,
          timezone = _this$props.timezone;
      var dateString = this.validateDateString(startDateInputValue);

      var startDate = _momentTimezone["default"].tz(dateString, timezone);

      var minDate = this.getMinDateForType("startDate");
      var maxDate = this.getMaxDateForType("startDate");

      if (!enableTime) {
        // round to make sure it's simply the same date;
        startDate.hour(0).minute(0).second(0).millisecond(0);
      } // If it's a valid date string and the date is within range, set the start date to be the input value


      if (startInputHasChanged && dateString && startDate.isSameOrAfter(minDate) && startDate.isSameOrBefore(maxDate)) {
        this.setState({
          startDate: startDate,
          startDateInputValue: startDate.format(format),
          startInputHasChanged: false
        }, function () {
          _this2.handleOnChange();

          if (_this2.dateView.current) {
            _this2.dateView.current.reset();
          }
        });
      } else {
        // maybe we need to move this
        // If invalid date, set input value back to the last validated date
        this.setState({
          startDateInputValue: this.state.startDate.format(format)
        });
      }
    }
  }, {
    key: "handleEndDateSet",
    value: function handleEndDateSet() {
      var _this3 = this;

      var _this$state2 = this.state,
          endInputHasChanged = _this$state2.endInputHasChanged,
          endDateInputValue = _this$state2.endDateInputValue,
          format = _this$state2.format;
      var _this$props2 = this.props,
          enableTime = _this$props2.enableTime,
          timezone = _this$props2.timezone;
      var dateString = this.validateDateString(endDateInputValue);

      var endDate = _momentTimezone["default"].tz(dateString, timezone);

      var minDate = this.getMinDateForType("endDate");
      var maxDate = this.getMaxDateForType("endDate");

      if (!enableTime) {
        // round to make sure it's simply the same date;
        endDate.hour(0).minute(0).second(0).millisecond(0);
      } // If it's a valid date string and the date is within range, set the start date to be the input value


      if (endInputHasChanged && dateString && endDate.isSameOrAfter(minDate) && endDate.isSameOrBefore(maxDate)) {
        this.setState({
          endDate: endDate,
          endDateInputValue: endDate.format(format),
          endInputHasChanged: false
        }, function () {
          _this3.handleOnChange();

          if (_this3.dateView.current) {
            _this3.dateView.current.reset();
          }
        });
      } else {
        // If invalid date, set input value back to the last validated date
        this.setState({
          endDateInputValue: this.state.endDate.format(format)
        });
      }
    }
  }, {
    key: "handleOnChange",
    value: function handleOnChange() {
      if (this.props.isRange) {
        this.props.onChange({
          startDate: this.state.startDate,
          endDate: this.state.endDate
        });
      } else {
        this.props.onChange({
          date: this.state.startDate
        });
      }

      this.toggleGlobalClickBinding();
    }
    /**** render methods ****/

  }, {
    key: "renderDatepicker",
    value: function renderDatepicker(type) {
      if (this.state.datepickerVisible === type) {
        return /*#__PURE__*/_react["default"].createElement(_dateView["default"], {
          ref: this.dateView,
          enableTime: this.props.enableTime,
          selectedDate: clone(this.state[type], this.props.timezone),
          timezone: this.props.timezone,
          maxDate: this.getMaxDateForType(type),
          minDate: this.getMinDateForType(type),
          handleSelection: this.handleDateSelection.bind(this, type)
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var endDateDatepicker = null,
          divider = null,
          styles = {};

      if (this.props.inputWidth) {
        styles.width = this.props.inputWidth + "px";
      } else if (this.props.enableTime) {
        styles.width = "165px";
      } else {
        styles.width = "115px";
      }

      if (this.props.isRange) {
        var endDateValue = this.props.inputEditable ? this.state.endDateInputValue : this.state.endDate.format(this.state.format);
        endDateDatepicker = /*#__PURE__*/_react["default"].createElement("div", {
          className: "datepicker-container"
        }, /*#__PURE__*/_react["default"].createElement("i", {
          className: "fa fa-calendar"
        }), /*#__PURE__*/_react["default"].createElement("input", {
          style: styles,
          className: "datepicker-input",
          readOnly: !this.props.inputEditable,
          value: endDateValue,
          type: "text",
          onChange: this.handleEndDateInputChange.bind(this),
          onBlur: this.closeDatepicker.bind(this, "endDate"),
          onFocus: this.openDatepicker.bind(this, "endDate"),
          onKeyPress: this.handleEndDateKeyPress.bind(this)
        }), this.renderDatepicker("endDate"));
        divider = /*#__PURE__*/_react["default"].createElement("span", {
          className: "datepicker-divider"
        }, "-");
      }

      var startDateValue = this.props.inputEditable ? this.state.startDateInputValue : this.state.startDate.format(this.state.format);

      var content = /*#__PURE__*/_react["default"].createElement("div", {
        onClick: stopBubble,
        className: "datepicker-wrapper"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "datepicker-container"
      }, /*#__PURE__*/_react["default"].createElement("i", {
        className: "fa fa-calendar"
      }), /*#__PURE__*/_react["default"].createElement("input", {
        style: styles,
        className: "datepicker-input",
        readOnly: !this.props.inputEditable,
        value: startDateValue,
        type: "text",
        onBlur: this.closeDatepicker.bind(this, "startDate"),
        onFocus: this.openDatepicker.bind(this, "startDate"),
        onChange: this.handleStartDateInputChange.bind(this),
        onKeyPress: this.handleStartDateKeyPress.bind(this)
      }), this.renderDatepicker("startDate")), divider, endDateDatepicker);

      return content;
    }
  }]);

  return DatePicker;
}(_react["default"].Component);

_defineProperty(DatePicker, "propTypes", {
  isRange: _propTypes["default"].bool,
  minDate: _propTypes["default"].instanceOf(_momentTimezone["default"]),
  maxDate: _propTypes["default"].instanceOf(_momentTimezone["default"]),
  ignoreFontAwesome: _propTypes["default"].bool,
  enableTime: _propTypes["default"].bool,
  format: _propTypes["default"].string,
  inputWidth: _propTypes["default"].number,
  inputEditable: _propTypes["default"].bool,
  onChange: _propTypes["default"].func,
  timezone: _propTypes["default"].string,
  defaultDate: _propTypes["default"].instanceOf(_momentTimezone["default"]),
  defaultEndDate: _propTypes["default"].instanceOf(_momentTimezone["default"]) // TODO: validate that it's b/w dates

});

_defineProperty(DatePicker, "defaultProps", {
  isRange: false,
  inputEditable: true,
  minDate: (0, _momentTimezone["default"])().subtract(50, "years"),
  maxDate: (0, _momentTimezone["default"])().add(50, "years"),
  ignoreFontAwesome: false,
  enableTime: false,
  timezone: "UTC",
  onChange: noop
});

function stopBubble(e) {
  e.nativeEvent.stopImmediatePropagation();
}

function getBinders(callback) {
  return {
    bind: function bind() {
      document.addEventListener("click", callback, false);
    },
    unbind: function unbind() {
      document.removeEventListener("click", callback, false);
    }
  };
}

function noop(data) {
  console.log("changing", data);
}

function clone(m, tz) {
  return _momentTimezone["default"].tz(m.valueOf(), tz);
}

module.exports = DatePicker;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9qcy9kYXRlcGlja2VyLmpzeCJdLCJuYW1lcyI6WyJERUZBVUxUX0RBVEVfRk9STUFUIiwiREVGQVVMVF9EQVRFX1RJTUVfRk9STUFUIiwiRU5URVJfS0VZIiwiRGF0ZVBpY2tlciIsInByb3BzIiwiZW5kRGF0ZSIsImRlZmF1bHRFbmREYXRlIiwic3RhcnREYXRlIiwiZGVmYXVsdERhdGUiLCJtb21lbnQiLCJ0eiIsInRpbWV6b25lIiwiYWRkIiwiZGF0ZUZvcm1hdCIsImZvcm1hdCIsImVuYWJsZVRpbWUiLCJzdGF0ZSIsImRhdGVwaWNrZXJWaXNpYmxlIiwiZW5kRGF0ZUlucHV0VmFsdWUiLCJlbmRJbnB1dEhhc0NoYW5nZWQiLCJzdGFydERhdGVJbnB1dFZhbHVlIiwic3RhcnRJbnB1dEhhc0NoYW5nZWQiLCJ0b2dnbGVGdW5jdGlvbiIsInRvZ2dsZURhdGVwaWNrZXIiLCJiaW5kIiwibmF0dXJhbEJpbmRlcnMiLCJnZXRCaW5kZXJzIiwiZGF0ZVZpZXciLCJSZWFjdCIsImNyZWF0ZVJlZiIsImlzUmFuZ2UiLCJvbkNoYW5nZSIsImNsb25lIiwiZGF0ZSIsIm5ld1Byb3BzIiwiaXNTYW1lIiwic2V0U3RhdGUiLCJ1bmJpbmQiLCJ0eXBlIiwibWluRGF0ZSIsImlzQWZ0ZXIiLCJFcnJvciIsIm1heERhdGUiLCJpc0JlZm9yZSIsInN0cmluZyIsImNocm9ubyIsInBhcnNlRGF0ZSIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJ0b2dnbGVHbG9iYWxDbGlja0JpbmRpbmciLCJoYW5kbGVTdGFydERhdGVTZXQiLCJoYW5kbGVFbmREYXRlU2V0Iiwib3B0aW9ucyIsIm11dGFibGVEYXRlIiwiaG91ciIsIm1pbnV0ZSIsInNlY29uZCIsIm1pbGxpc2Vjb25kIiwiaXNTYW1lT3JCZWZvcmUiLCJpc1NhbWVPckFmdGVyIiwibmV3U3RhdGUiLCJjb2xsYXBzZSIsImlucHV0RWRpdGFibGUiLCJoYW5kbGVPbkNoYW5nZSIsInRhcmdldCIsInZhbHVlIiwia2V5IiwiZGF0ZVN0cmluZyIsInZhbGlkYXRlRGF0ZVN0cmluZyIsImdldE1pbkRhdGVGb3JUeXBlIiwiZ2V0TWF4RGF0ZUZvclR5cGUiLCJjdXJyZW50IiwicmVzZXQiLCJoYW5kbGVEYXRlU2VsZWN0aW9uIiwiZW5kRGF0ZURhdGVwaWNrZXIiLCJkaXZpZGVyIiwic3R5bGVzIiwiaW5wdXRXaWR0aCIsIndpZHRoIiwiZW5kRGF0ZVZhbHVlIiwiaGFuZGxlRW5kRGF0ZUlucHV0Q2hhbmdlIiwiY2xvc2VEYXRlcGlja2VyIiwib3BlbkRhdGVwaWNrZXIiLCJoYW5kbGVFbmREYXRlS2V5UHJlc3MiLCJyZW5kZXJEYXRlcGlja2VyIiwic3RhcnREYXRlVmFsdWUiLCJjb250ZW50Iiwic3RvcEJ1YmJsZSIsImhhbmRsZVN0YXJ0RGF0ZUlucHV0Q2hhbmdlIiwiaGFuZGxlU3RhcnREYXRlS2V5UHJlc3MiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJib29sIiwiaW5zdGFuY2VPZiIsImlnbm9yZUZvbnRBd2Vzb21lIiwibnVtYmVyIiwiZnVuYyIsInN1YnRyYWN0Iiwibm9vcCIsIm5hdGl2ZUV2ZW50Iiwic3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIiwiY2FsbGJhY2siLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJtIiwidmFsdWVPZiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxtQkFBbUIsR0FBRyxZQUE1QjtBQUNBLElBQU1DLHdCQUF3QixHQUFHLG1CQUFqQztBQUNBLElBQU1DLFNBQVMsR0FBRyxPQUFsQjs7SUFFTUMsVTs7Ozs7QUE0QkYsc0JBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQTs7QUFDZiw4QkFBTUEsS0FBTjtBQUVBLFFBQUlDLE9BQU8s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QUNvRCxXQUFGLENBQWNDLHdCQUFkO0FBQ0g7O0FBRUQsU0FBUzFFLFVBQVQsQ0FBb0IyRSxRQUFwQixFQUE4QjtBQUUxQixTQUFPO0FBQ0g3RSxJQUFBQSxJQUFJLEVBQUUsZ0JBQVU7QUFDWjhFLE1BQUFBLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUNGLFFBQW5DLEVBQTZDLEtBQTdDO0FBQ0gsS0FIRTtBQUtIaEUsSUFBQUEsTUFBTSxFQUFFLGtCQUFXO0FBQ2ZpRSxNQUFBQSxRQUFRLENBQUNFLG1CQUFULENBQTZCLE9BQTdCLEVBQXNDSCxRQUF0QyxFQUFnRCxLQUFoRDtBQUNIO0FBUEUsR0FBUDtBQVNIOztBQUVELFNBQVNILElBQVQsQ0FBY08sSUFBZCxFQUFvQjtBQUNoQkMsRUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVksVUFBWixFQUF3QkYsSUFBeEI7QUFDSDs7QUFFRCxTQUFTekUsS0FBVCxDQUFlNEUsQ0FBZixFQUFrQmxHLEVBQWxCLEVBQXNCO0FBQ3BCLFNBQU9ELDJCQUFPQyxFQUFQLENBQVVrRyxDQUFDLENBQUNDLE9BQUYsRUFBVixFQUF1Qm5HLEVBQXZCLENBQVA7QUFDRDs7QUFHRG9HLE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQjVHLFVBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gXCJyZWFjdC1kb21cIjtcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSBcInByb3AtdHlwZXNcIjtcbmltcG9ydCBEYXRlVmlldyBmcm9tIFwiLi9kYXRlLXZpZXdcIjtcbmltcG9ydCBtb21lbnQgZnJvbSBcIm1vbWVudC10aW1lem9uZVwiO1xuaW1wb3J0IGNocm9ubyBmcm9tIFwiY2hyb25vLW5vZGVcIjtcblxuY29uc3QgREVGQVVMVF9EQVRFX0ZPUk1BVCA9IFwiTU0vREQvWVlZWVwiO1xuY29uc3QgREVGQVVMVF9EQVRFX1RJTUVfRk9STUFUID0gXCJNTS9ERC9ZWVlZIGg6bW0gYVwiO1xuY29uc3QgRU5URVJfS0VZID0gXCJFbnRlclwiO1xuXG5jbGFzcyBEYXRlUGlja2VyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcblxuICAgIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgICAgIGlzUmFuZ2U6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBtaW5EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihtb21lbnQpLFxuICAgICAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihtb21lbnQpLFxuICAgICAgICBpZ25vcmVGb250QXdlc29tZTogUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIGVuYWJsZVRpbWU6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBmb3JtYXQ6IFByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgIGlucHV0V2lkdGg6IFByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgIGlucHV0RWRpdGFibGU6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBvbkNoYW5nZTogUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIHRpbWV6b25lOiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBkZWZhdWx0RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YobW9tZW50KSxcbiAgICAgICAgZGVmYXVsdEVuZERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKG1vbWVudCkgLy8gVE9ETzogdmFsaWRhdGUgdGhhdCBpdCdzIGIvdyBkYXRlc1xuICAgIH07XG5cbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzID0ge1xuICAgICAgICBpc1JhbmdlOiBmYWxzZSxcbiAgICAgICAgaW5wdXRFZGl0YWJsZTogdHJ1ZSxcbiAgICAgICAgbWluRGF0ZTogbW9tZW50KCkuc3VidHJhY3QoNTAsIFwieWVhcnNcIiksXG4gICAgICAgIG1heERhdGU6IG1vbWVudCgpLmFkZCg1MCwgXCJ5ZWFyc1wiKSxcbiAgICAgICAgaWdub3JlRm9udEF3ZXNvbWU6IGZhbHNlLFxuICAgICAgICBlbmFibGVUaW1lOiBmYWxzZSxcbiAgICAgICAgdGltZXpvbmU6IFwiVVRDXCIsXG4gICAgICAgIG9uQ2hhbmdlOiBub29wXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcblxuICAgICAgICBsZXQgZW5kRGF0ZSA9IHRoaXMucHJvcHMuZGVmYXVsdEVuZERhdGU7XG4gICAgICAgIGxldCBzdGFydERhdGUgPSB0aGlzLnByb3BzLmRlZmF1bHREYXRlO1xuXG5cbiAgICAgICAgaWYgKCFzdGFydERhdGUpIHtcbiAgICAgICAgICBzdGFydERhdGUgPSBtb21lbnQudHoodGhpcy5wcm9wcy50aW1lem9uZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3RhcnREYXRlLnR6KHRoaXMucHJvcHMudGltZXpvbmUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFlbmREYXRlKSB7XG4gICAgICAgICAgZW5kRGF0ZSA9IG1vbWVudC50eihzdGFydERhdGUsIHRoaXMucHJvcHMudGltZXpvbmUpLmFkZCgxLCBcIm1vbnRoc1wiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBlbmREYXRlLnR6KHRoaXMucHJvcHMudGltZXpvbmUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGRhdGVGb3JtYXQ7XG4gICAgICAgIGlmIChwcm9wcy5mb3JtYXQpIHtcbiAgICAgICAgICAgIGRhdGVGb3JtYXQgPSBwcm9wcy5mb3JtYXQ7XG4gICAgICAgIH0gZWxzZSBpZiAocHJvcHMuZW5hYmxlVGltZSkge1xuICAgICAgICAgICAgZGF0ZUZvcm1hdCA9IERFRkFVTFRfREFURV9USU1FX0ZPUk1BVDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRhdGVGb3JtYXQgPSBERUZBVUxUX0RBVEVfRk9STUFUO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGRhdGVwaWNrZXJWaXNpYmxlOiBudWxsLFxuICAgICAgICAgICAgZW5kRGF0ZTogZW5kRGF0ZSxcbiAgICAgICAgICAgIGVuZERhdGVJbnB1dFZhbHVlOiBlbmREYXRlLmZvcm1hdChkYXRlRm9ybWF0KSwgLy8gU3RyaW5nIHZhbHVlIG9mIGRhdGVcbiAgICAgICAgICAgIGVuZElucHV0SGFzQ2hhbmdlZDogZmFsc2UsXG4gICAgICAgICAgICBzdGFydERhdGU6IHN0YXJ0RGF0ZSxcbiAgICAgICAgICAgIHN0YXJ0RGF0ZUlucHV0VmFsdWU6IHN0YXJ0RGF0ZS5mb3JtYXQoZGF0ZUZvcm1hdCksIC8vIFN0cmluZyB2YWx1ZSBvZiBkYXRlXG4gICAgICAgICAgICBzdGFydElucHV0SGFzQ2hhbmdlZDogZmFsc2UsXG4gICAgICAgICAgICBmb3JtYXQ6IGRhdGVGb3JtYXRcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgdG9nZ2xlRnVuY3Rpb24gPSB0aGlzLnRvZ2dsZURhdGVwaWNrZXIuYmluZCh0aGlzLCBudWxsKTtcblxuICAgICAgICB0aGlzLm5hdHVyYWxCaW5kZXJzID0gZ2V0QmluZGVycyh0b2dnbGVGdW5jdGlvbik7XG5cbiAgICAgICAgdGhpcy5kYXRlVmlldyA9IFJlYWN0LmNyZWF0ZVJlZigpO1xuXG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmlzUmFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2Uoe1xuICAgICAgICAgICAgICAgIHN0YXJ0RGF0ZTogY2xvbmUodGhpcy5zdGF0ZS5zdGFydERhdGUsIHRoaXMucHJvcHMudGltZXpvbmUpLFxuICAgICAgICAgICAgICAgIGVuZERhdGU6IGNsb25lKHRoaXMuc3RhdGUuZW5kRGF0ZSwgdGhpcy5wcm9wcy50aW1lem9uZSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh7XG4gICAgICAgICAgICAgICAgZGF0ZTogY2xvbmUodGhpcy5zdGF0ZS5zdGFydERhdGUsIHRoaXMucHJvcHMudGltZXpvbmUpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFZhbHVlKCkge1xuICAgICAgaWYgKHRoaXMucHJvcHMuaXNSYW5nZSkge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIHN0YXJ0RGF0ZTogY2xvbmUodGhpcy5zdGF0ZS5zdGFydERhdGUsIHRoaXMucHJvcHMudGltZXpvbmUpLFxuICAgICAgICAgICAgICBlbmREYXRlOiBjbG9uZSh0aGlzLnN0YXRlLmVuZERhdGUsIHRoaXMucHJvcHMudGltZXpvbmUpXG4gICAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgZGF0ZTogY2xvbmUodGhpcy5zdGF0ZS5zdGFydERhdGUsIHRoaXMucHJvcHMudGltZXpvbmUpXG4gICAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzKSB7XG4gICAgICAgIC8vIGlmIHRoZSBkYXRlIGhhcyBjaGFuZ2VkIGZyb20gdGhlIHBhcmVudCBBTkRcbiAgICAgICAgLy8gaXQncyBkaWZmZXJlbnQgdGhhbiB0aGUgZGF0ZSB3ZSBoYXZlIGluIHN0YXRlLCB1c2UgaXRcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgKCF0aGlzLnN0YXRlLmVuZERhdGUuaXNTYW1lKG5ld1Byb3BzLmRlZmF1bHRFbmREYXRlKVxuICAgICAgICAgICAgJiYgbmV3UHJvcHMuZGVmYXVsdEVuZERhdGUgIT09IHRoaXMucHJvcHMuZGVmYXVsdEVuZERhdGVcbiAgICAgICAgICAgICYmICFuZXdQcm9wcy5kZWZhdWx0RW5kRGF0ZS5pc1NhbWUodGhpcy5wcm9wcy5kZWZhdWx0RW5kRGF0ZSkpXG4gICAgICAgICAgICB8fFxuICAgICAgICAgICAgKCF0aGlzLnN0YXRlLnN0YXJ0RGF0ZS5pc1NhbWUobmV3UHJvcHMuZGVmYXVsdERhdGUpXG4gICAgICAgICAgICAmJiAhbmV3UHJvcHMuZGVmYXVsdERhdGUgIT09IHRoaXMucHJvcHMuZGVmYXVsdERhdGVcbiAgICAgICAgICAgICYmICFuZXdQcm9wcy5kZWZhdWx0RGF0ZS5pc1NhbWUodGhpcy5wcm9wcy5kZWZhdWx0RGF0ZSkpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgIGxldCBlbmREYXRlID0gbmV3UHJvcHMuZGVmYXVsdEVuZERhdGU7XG4gICAgICAgICAgICBsZXQgc3RhcnREYXRlID0gbmV3UHJvcHMuZGVmYXVsdERhdGU7XG5cbiAgICAgICAgICAgIGlmICghc3RhcnREYXRlKSB7XG4gICAgICAgICAgICAgIHN0YXJ0RGF0ZSA9IG1vbWVudC50eihuZXdQcm9wcy50aW1lem9uZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzdGFydERhdGUgPSBzdGFydERhdGUudHoobmV3UHJvcHMudGltZXpvbmUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIWVuZERhdGUpIHtcbiAgICAgICAgICAgICAgZW5kRGF0ZSA9IGNsb25lKHN0YXJ0RGF0ZSwgbmV3UHJvcHMudGltZXpvbmUpLmFkZCgxLCBcIm1vbnRoc1wiKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGVuZERhdGUgPSBlbmREYXRlLnR6KG5ld1Byb3BzLnRpbWV6b25lKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZW5kRGF0ZTogZW5kRGF0ZSxcbiAgICAgICAgICAgICAgICBzdGFydERhdGU6IHN0YXJ0RGF0ZSxcbiAgICAgICAgICAgICAgICBlbmREYXRlSW5wdXRWYWx1ZTogZW5kRGF0ZS5mb3JtYXQodGhpcy5zdGF0ZS5mb3JtYXQpLFxuICAgICAgICAgICAgICAgIHN0YXJ0RGF0ZUlucHV0VmFsdWU6IHN0YXJ0RGF0ZS5mb3JtYXQodGhpcy5zdGF0ZS5mb3JtYXQpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgdG9nZ2xlR2xvYmFsQ2xpY2tCaW5kaW5nKCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5kYXRlcGlja2VyVmlzaWJsZSkge1xuICAgICAgICAgICAgdGhpcy5uYXR1cmFsQmluZGVycy5iaW5kKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm5hdHVyYWxCaW5kZXJzLnVuYmluZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqKiogaGVscGVycyAqKioqL1xuXG4gICAgZ2V0TWluRGF0ZUZvclR5cGUodHlwZSkge1xuICAgICAgICBpZiAodHlwZSA9PT0gXCJzdGFydERhdGVcIikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMubWluRGF0ZTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBcImVuZERhdGVcIikge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuc3RhcnREYXRlLmlzQWZ0ZXIodGhpcy5wcm9wcy5taW5EYXRlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlLnN0YXJ0RGF0ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMubWluRGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwidW5rbm93biB0eXBlIHNlbnQgdG8gZ2V0TWluRGF0ZUZvclR5cGUuIHR5cGU6IFwiICsgdHlwZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRNYXhEYXRlRm9yVHlwZSh0eXBlKSB7XG4gICAgICAgIGlmICh0eXBlID09PSBcImVuZERhdGVcIikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMubWF4RGF0ZTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBcInN0YXJ0RGF0ZVwiKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5lbmREYXRlLmlzQmVmb3JlKHRoaXMucHJvcHMubWF4RGF0ZSkgJiYgdGhpcy5wcm9wcy5pc1JhbmdlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuZW5kRGF0ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMubWF4RGF0ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IEVycm9yKFwidW5rbm93biB0eXBlIHNlbnQgdG8gZ2V0TWF4RGF0ZUZvclR5cGUuIHR5cGU6IFwiICsgdHlwZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YWxpZGF0ZURhdGVTdHJpbmcoc3RyaW5nKSB7XG4gICAgICAvLyBhZGQgdGhlIHRpbWV6b25lIG9udG8gdGhlIHN0cmluZyBzbyBpdCdzIHByb3Blcmx5IGNvbnZlcnRlZFxuICAgICAgLy8gQ2hyb25vIHJldHVybnMgYSBkYXRldGltZSBzdGFtcCBmb3IgdmFsaWQgZGF0ZXMsIGFuZCBmb3IgaW52YWxpZCBkYXRlcywgcmV0dXJucyBudWxsXG4gICAgICBjb25zdCBkYXRlID0gY2hyb25vLnBhcnNlRGF0ZShzdHJpbmcgKyBcIiBcIiArIG1vbWVudC50eih0aGlzLnByb3BzLnRpbWV6b25lKS5mb3JtYXQoJ1onKSk7XG4gICAgICByZXR1cm4gZGF0ZTtcbiAgICB9XG5cbiAgICAvKioqKiBoYW5kbGVycyAqKioqL1xuXG4gICAgdG9nZ2xlRGF0ZXBpY2tlcih0eXBlLCBlKSB7XG4gICAgICAgIGlmIChlKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRlcGlja2VyVmlzaWJsZTogdHlwZVxuICAgICAgICB9LCB0aGlzLnRvZ2dsZUdsb2JhbENsaWNrQmluZGluZy5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBvcGVuRGF0ZXBpY2tlcih0eXBlLCBlKSB7XG4gICAgICAgIGlmIChlKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRlcGlja2VyVmlzaWJsZTogdHlwZVxuICAgICAgICB9KTtcbiAgICB9XG5cblxuICAgIGNsb3NlRGF0ZXBpY2tlcih0eXBlLCBlKSB7XG4gICAgICAgIGlmIChlKSB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGUgPT09IFwic3RhcnREYXRlXCIpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlU3RhcnREYXRlU2V0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJlbmREYXRlXCIpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlRW5kRGF0ZVNldCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50b2dnbGVHbG9iYWxDbGlja0JpbmRpbmcoKTtcbiAgICB9XG5cbiAgICBoYW5kbGVEYXRlU2VsZWN0aW9uKHR5cGUsIGRhdGUsIG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIG11dGFibGVEYXRlID0gY2xvbmUoZGF0ZSwgdGhpcy5wcm9wcy50aW1lem9uZSk7XG5cbiAgICAgICAgLy8gcm91bmQgdG8gbWFrZSBzdXJlIGl0J3Mgc2ltcGx5IHRoZSBzYW1lIGRhdGU7XG4gICAgICAgIG11dGFibGVEYXRlLmhvdXIoMCkubWludXRlKDApLnNlY29uZCgwKS5taWxsaXNlY29uZCgwKTtcbiAgICAgICAgaWYgKG11dGFibGVEYXRlLmlzQmVmb3JlKHRoaXMucHJvcHMubWluRGF0ZSkgfHwgbXV0YWJsZURhdGUuaXNBZnRlcih0aGlzLnByb3BzLm1heERhdGUpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZSA9PT0gXCJlbmREYXRlXCIpIHtcbiAgICAgICAgICAgIGlmIChkYXRlLmlzU2FtZU9yQmVmb3JlKHRoaXMuc3RhdGUuc3RhcnREYXRlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlID09PSBcInN0YXJ0RGF0ZVwiKSB7XG4gICAgICAgICAgICBpZiAoZGF0ZS5pc1NhbWVPckFmdGVyKHRoaXMuc3RhdGUuZW5kRGF0ZSkgJiYgdGhpcy5wcm9wcy5pc1JhbmdlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG5ld1N0YXRlID0ge307XG4gICAgICAgIG5ld1N0YXRlLmRhdGVwaWNrZXJWaXNpYmxlID0gbnVsbDtcblxuICAgICAgICBpZiAob3B0aW9ucyAmJiB0eXBlb2Ygb3B0aW9ucy5jb2xsYXBzZSA9PT0gXCJib29sZWFuXCIpIHtcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy5jb2xsYXBzZSkge1xuICAgICAgICAgICAgICAgIG5ld1N0YXRlLmRhdGVwaWNrZXJWaXNpYmxlID0gdHlwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG5ld1N0YXRlW3R5cGVdID0gZGF0ZTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5wdXRFZGl0YWJsZSkge1xuICAgICAgICAgICAgbmV3U3RhdGVbYCR7dHlwZX1JbnB1dFZhbHVlYF0gPSBkYXRlLmZvcm1hdCh0aGlzLnN0YXRlLmZvcm1hdCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKG5ld1N0YXRlLCB0aGlzLmhhbmRsZU9uQ2hhbmdlLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIGhhbmRsZVN0YXJ0RGF0ZUlucHV0Q2hhbmdlKGUpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBzdGFydERhdGVJbnB1dFZhbHVlOiBlLnRhcmdldC52YWx1ZSxcbiAgICAgICAgICAgIHN0YXJ0SW5wdXRIYXNDaGFuZ2VkOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGhhbmRsZUVuZERhdGVJbnB1dENoYW5nZShlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZW5kRGF0ZUlucHV0VmFsdWU6IGUudGFyZ2V0LnZhbHVlLFxuICAgICAgICAgICAgZW5kSW5wdXRIYXNDaGFuZ2VkOiB0cnVlXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGhhbmRsZVN0YXJ0RGF0ZUtleVByZXNzKGUpIHtcbiAgICAgICAgaWYgKGUua2V5ID09PSBFTlRFUl9LRVkpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlU3RhcnREYXRlU2V0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVFbmREYXRlS2V5UHJlc3MoZSkge1xuICAgICAgICBpZiAoZS5rZXkgPT09IEVOVEVSX0tFWSkge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVFbmREYXRlU2V0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIGhhbmRsZVN0YXJ0RGF0ZVNldCgpIHtcblxuICAgICAgICBjb25zdCB7c3RhcnRJbnB1dEhhc0NoYW5nZWQsIHN0YXJ0RGF0ZUlucHV0VmFsdWUsIGZvcm1hdH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCB7ZW5hYmxlVGltZSwgdGltZXpvbmV9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IHRoaXMudmFsaWRhdGVEYXRlU3RyaW5nKHN0YXJ0RGF0ZUlucHV0VmFsdWUpO1xuICAgICAgICBjb25zdCBzdGFydERhdGUgPSBtb21lbnQudHooZGF0ZVN0cmluZywgdGltZXpvbmUpO1xuICAgICAgICBjb25zdCBtaW5EYXRlID0gdGhpcy5nZXRNaW5EYXRlRm9yVHlwZShcInN0YXJ0RGF0ZVwiKTtcbiAgICAgICAgY29uc3QgbWF4RGF0ZSA9IHRoaXMuZ2V0TWF4RGF0ZUZvclR5cGUoXCJzdGFydERhdGVcIik7XG5cbiAgICAgICAgaWYgKCFlbmFibGVUaW1lKSB7XG4gICAgICAgICAgICAvLyByb3VuZCB0byBtYWtlIHN1cmUgaXQncyBzaW1wbHkgdGhlIHNhbWUgZGF0ZTtcbiAgICAgICAgICAgIHN0YXJ0RGF0ZS5ob3VyKDApLm1pbnV0ZSgwKS5zZWNvbmQoMCkubWlsbGlzZWNvbmQoMCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgaXQncyBhIHZhbGlkIGRhdGUgc3RyaW5nIGFuZCB0aGUgZGF0ZSBpcyB3aXRoaW4gcmFuZ2UsIHNldCB0aGUgc3RhcnQgZGF0ZSB0byBiZSB0aGUgaW5wdXQgdmFsdWVcbiAgICAgICAgaWYgKHN0YXJ0SW5wdXRIYXNDaGFuZ2VkICYmIGRhdGVTdHJpbmcgJiYgc3RhcnREYXRlLmlzU2FtZU9yQWZ0ZXIobWluRGF0ZSkgJiYgc3RhcnREYXRlLmlzU2FtZU9yQmVmb3JlKG1heERhdGUpKSB7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHN0YXJ0RGF0ZTogc3RhcnREYXRlLFxuICAgICAgICAgICAgICAgIHN0YXJ0RGF0ZUlucHV0VmFsdWU6IHN0YXJ0RGF0ZS5mb3JtYXQoZm9ybWF0KSxcbiAgICAgICAgICAgICAgICBzdGFydElucHV0SGFzQ2hhbmdlZDogZmFsc2VcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU9uQ2hhbmdlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0ZVZpZXcuY3VycmVudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVWaWV3LmN1cnJlbnQucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIG1heWJlIHdlIG5lZWQgdG8gbW92ZSB0aGlzXG4gICAgICAgICAgICAvLyBJZiBpbnZhbGlkIGRhdGUsIHNldCBpbnB1dCB2YWx1ZSBiYWNrIHRvIHRoZSBsYXN0IHZhbGlkYXRlZCBkYXRlXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBzdGFydERhdGVJbnB1dFZhbHVlOiB0aGlzLnN0YXRlLnN0YXJ0RGF0ZS5mb3JtYXQoZm9ybWF0KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVFbmREYXRlU2V0KCkge1xuICAgICAgICBjb25zdCB7ZW5kSW5wdXRIYXNDaGFuZ2VkLCBlbmREYXRlSW5wdXRWYWx1ZSwgZm9ybWF0fSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIGNvbnN0IHtlbmFibGVUaW1lLCB0aW1lem9uZX0gPSB0aGlzLnByb3BzO1xuICAgICAgICBjb25zdCBkYXRlU3RyaW5nID0gdGhpcy52YWxpZGF0ZURhdGVTdHJpbmcoZW5kRGF0ZUlucHV0VmFsdWUpO1xuICAgICAgICBjb25zdCBlbmREYXRlID0gbW9tZW50LnR6KGRhdGVTdHJpbmcsIHRpbWV6b25lKTtcbiAgICAgICAgY29uc3QgbWluRGF0ZSA9IHRoaXMuZ2V0TWluRGF0ZUZvclR5cGUoXCJlbmREYXRlXCIpO1xuICAgICAgICBjb25zdCBtYXhEYXRlID0gdGhpcy5nZXRNYXhEYXRlRm9yVHlwZShcImVuZERhdGVcIik7XG5cblxuICAgICAgICBpZiAoIWVuYWJsZVRpbWUpIHtcbiAgICAgICAgICAgIC8vIHJvdW5kIHRvIG1ha2Ugc3VyZSBpdCdzIHNpbXBseSB0aGUgc2FtZSBkYXRlO1xuICAgICAgICAgICAgZW5kRGF0ZS5ob3VyKDApLm1pbnV0ZSgwKS5zZWNvbmQoMCkubWlsbGlzZWNvbmQoMCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgaXQncyBhIHZhbGlkIGRhdGUgc3RyaW5nIGFuZCB0aGUgZGF0ZSBpcyB3aXRoaW4gcmFuZ2UsIHNldCB0aGUgc3RhcnQgZGF0ZSB0byBiZSB0aGUgaW5wdXQgdmFsdWVcbiAgICAgICAgaWYgKGVuZElucHV0SGFzQ2hhbmdlZCAmJiBkYXRlU3RyaW5nICYmIGVuZERhdGUuaXNTYW1lT3JBZnRlcihtaW5EYXRlKSAmJiBlbmREYXRlLmlzU2FtZU9yQmVmb3JlKG1heERhdGUpKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBlbmREYXRlOiBlbmREYXRlLFxuICAgICAgICAgICAgICAgIGVuZERhdGVJbnB1dFZhbHVlOiBlbmREYXRlLmZvcm1hdChmb3JtYXQpLFxuICAgICAgICAgICAgICAgIGVuZElucHV0SGFzQ2hhbmdlZDogZmFsc2VcbiAgICAgICAgICAgIH0sICgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZU9uQ2hhbmdlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZGF0ZVZpZXcuY3VycmVudCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRhdGVWaWV3LmN1cnJlbnQucmVzZXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIElmIGludmFsaWQgZGF0ZSwgc2V0IGlucHV0IHZhbHVlIGJhY2sgdG8gdGhlIGxhc3QgdmFsaWRhdGVkIGRhdGVcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGVuZERhdGVJbnB1dFZhbHVlOiB0aGlzLnN0YXRlLmVuZERhdGUuZm9ybWF0KGZvcm1hdClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlT25DaGFuZ2UoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmlzUmFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2Uoe1xuICAgICAgICAgICAgICAgIHN0YXJ0RGF0ZTogdGhpcy5zdGF0ZS5zdGFydERhdGUsXG4gICAgICAgICAgICAgICAgZW5kRGF0ZTogdGhpcy5zdGF0ZS5lbmREYXRlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2Uoe1xuICAgICAgICAgICAgICAgIGRhdGU6IHRoaXMuc3RhdGUuc3RhcnREYXRlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudG9nZ2xlR2xvYmFsQ2xpY2tCaW5kaW5nKCk7XG5cbiAgICB9XG5cbiAgICAvKioqKiByZW5kZXIgbWV0aG9kcyAqKioqL1xuXG4gICAgcmVuZGVyRGF0ZXBpY2tlcih0eXBlKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmRhdGVwaWNrZXJWaXNpYmxlID09PSB0eXBlKSB7XG4gICAgICAgICAgICByZXR1cm4gPERhdGVWaWV3XG4gICAgICAgICAgICAgICAgcmVmPXt0aGlzLmRhdGVWaWV3fVxuICAgICAgICAgICAgICAgIGVuYWJsZVRpbWU9e3RoaXMucHJvcHMuZW5hYmxlVGltZX1cbiAgICAgICAgICAgICAgICBzZWxlY3RlZERhdGU9e2Nsb25lKHRoaXMuc3RhdGVbdHlwZV0sIHRoaXMucHJvcHMudGltZXpvbmUpfVxuICAgICAgICAgICAgICAgIHRpbWV6b25lPXt0aGlzLnByb3BzLnRpbWV6b25lfVxuICAgICAgICAgICAgICAgIG1heERhdGU9e3RoaXMuZ2V0TWF4RGF0ZUZvclR5cGUodHlwZSl9XG4gICAgICAgICAgICAgICAgbWluRGF0ZT17dGhpcy5nZXRNaW5EYXRlRm9yVHlwZSh0eXBlKX1cbiAgICAgICAgICAgICAgICBoYW5kbGVTZWxlY3Rpb249e3RoaXMuaGFuZGxlRGF0ZVNlbGVjdGlvbi5iaW5kKHRoaXMsIHR5cGUpfSAvPjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgdmFyIGVuZERhdGVEYXRlcGlja2VyID0gbnVsbCwgZGl2aWRlciA9IG51bGwsIHN0eWxlcyA9IHt9O1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmlucHV0V2lkdGgpIHtcbiAgICAgICAgICAgIHN0eWxlcy53aWR0aCA9IHRoaXMucHJvcHMuaW5wdXRXaWR0aCArIFwicHhcIjtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLmVuYWJsZVRpbWUpIHtcbiAgICAgICAgICAgIHN0eWxlcy53aWR0aCA9IFwiMTY1cHhcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0eWxlcy53aWR0aCA9IFwiMTE1cHhcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmlzUmFuZ2UpIHtcbiAgICAgICAgICAgIGNvbnN0IGVuZERhdGVWYWx1ZSA9IHRoaXMucHJvcHMuaW5wdXRFZGl0YWJsZSA/IHRoaXMuc3RhdGUuZW5kRGF0ZUlucHV0VmFsdWUgOiB0aGlzLnN0YXRlLmVuZERhdGUuZm9ybWF0KHRoaXMuc3RhdGUuZm9ybWF0KTtcbiAgICAgICAgICAgIGVuZERhdGVEYXRlcGlja2VyID0gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGF0ZXBpY2tlci1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtY2FsZW5kYXJcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBzdHlsZT17c3R5bGVzfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZGF0ZXBpY2tlci1pbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IXRoaXMucHJvcHMuaW5wdXRFZGl0YWJsZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtlbmREYXRlVmFsdWV9XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUVuZERhdGVJbnB1dENoYW5nZS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLmNsb3NlRGF0ZXBpY2tlci5iaW5kKHRoaXMsIFwiZW5kRGF0ZVwiKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMub3BlbkRhdGVwaWNrZXIuYmluZCh0aGlzLCBcImVuZERhdGVcIil9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbktleVByZXNzPXt0aGlzLmhhbmRsZUVuZERhdGVLZXlQcmVzcy5iaW5kKHRoaXMpfSAvPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJEYXRlcGlja2VyKFwiZW5kRGF0ZVwiKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBkaXZpZGVyID0gPHNwYW4gY2xhc3NOYW1lPVwiZGF0ZXBpY2tlci1kaXZpZGVyXCI+LTwvc3Bhbj47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3RhcnREYXRlVmFsdWUgPSB0aGlzLnByb3BzLmlucHV0RWRpdGFibGUgPyB0aGlzLnN0YXRlLnN0YXJ0RGF0ZUlucHV0VmFsdWUgOiB0aGlzLnN0YXRlLnN0YXJ0RGF0ZS5mb3JtYXQodGhpcy5zdGF0ZS5mb3JtYXQpO1xuXG4gICAgICAgIHZhciBjb250ZW50ID0gKFxuICAgICAgICAgICAgPGRpdiBvbkNsaWNrPXtzdG9wQnViYmxlfSBjbGFzc05hbWU9XCJkYXRlcGlja2VyLXdyYXBwZXJcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRhdGVwaWNrZXItY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cImZhIGZhLWNhbGVuZGFyXCI+PC9pPlxuICAgICAgICAgICAgICAgICAgICA8aW5wdXQgc3R5bGU9e3N0eWxlc31cbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImRhdGVwaWNrZXItaW5wdXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyF0aGlzLnByb3BzLmlucHV0RWRpdGFibGV9XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17c3RhcnREYXRlVmFsdWV9XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMuY2xvc2VEYXRlcGlja2VyLmJpbmQodGhpcywgXCJzdGFydERhdGVcIil9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLm9wZW5EYXRlcGlja2VyLmJpbmQodGhpcywgXCJzdGFydERhdGVcIil9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVTdGFydERhdGVJbnB1dENoYW5nZS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25LZXlQcmVzcz17dGhpcy5oYW5kbGVTdGFydERhdGVLZXlQcmVzcy5iaW5kKHRoaXMpfSAvPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJEYXRlcGlja2VyKFwic3RhcnREYXRlXCIpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIHtkaXZpZGVyfVxuICAgICAgICAgICAgICAgIHtlbmREYXRlRGF0ZXBpY2tlcn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gY29udGVudDtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHN0b3BCdWJibGUoZSkge1xuICAgIGUubmF0aXZlRXZlbnQuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG59XG5cbmZ1bmN0aW9uIGdldEJpbmRlcnMoY2FsbGJhY2spIHtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGJpbmQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2FsbGJhY2ssIGZhbHNlKTtcbiAgICAgICAgfSxcblxuICAgICAgICB1bmJpbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGNhbGxiYWNrLCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9O1xufVxuXG5mdW5jdGlvbiBub29wKGRhdGEpIHtcbiAgICBjb25zb2xlLmxvZyhcImNoYW5naW5nXCIsIGRhdGEpO1xufVxuXG5mdW5jdGlvbiBjbG9uZShtLCB0eikge1xuICByZXR1cm4gbW9tZW50LnR6KG0udmFsdWVPZigpLCB0eik7XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBEYXRlUGlja2VyO1xuIl19
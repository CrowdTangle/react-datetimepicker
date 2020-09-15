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
      var startDate = (0, _momentTimezone["default"])(startDateInputValue, "MM/DD/YYYY hh:mm a").tz(timezone, true);
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
      var endDate = (0, _momentTimezone["default"])(endDateInputValue, "MM/DD/YYYY hh:mm a").tz(timezone, true);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9qcy9kYXRlcGlja2VyLmpzeCJdLCJuYW1lcyI6WyJERUZBVUxUX0RBVEVfRk9STUFUIiwiREVGQVVMVF9EQVRFX1RJTUVfRk9STUFUIiwiRU5URVJfS0VZIiwiRGF0ZVBpY2tlciIsInByb3BzIiwiZW5kRGF0ZSIsImRlZmF1bHRFbmREYXRlIiwic3RhcnREYXRlIiwiZGVmYXVsdERhdGUiLCJtb21lbnQiLCJ0eiIsInRpbWV6b25lIiwiYWRkIiwiZGF0ZUZvcm1hdCIsImZvcm1hdCIsImVuYWJsZVRpbWUiLCJzdGF0ZSIsImRhdGVwaWNrZXJWaXNpYmxlIiwiZW5kRGF0ZUlucHV0VmFsdWUiLCJlbmRJbnB1dEhhc0NoYW5nZWQiLCJzdGFydERhdGVJbnB1dFZhbHVlIiwic3RhcnRJbnB1dEhhc0NoYW5nZWQiLCJ0b2dnbGVGdW5jdGlvbiIsInRvZ2dsZURhdGVwaWNrZXIiLCJiaW5kIiwibmF0dXJhbEJpbmRlcnMiLCJnZXRCaW5kZXJzIiwiZGF0ZVZpZXciLCJSZWFjdCIsImNyZWF0ZVJlZiIsImlzUmFuZ2UiLCJvbkNoYW5nZSIsImNsb25lIiwiZGF0ZSIsIm5ld1Byb3BzIiwiaXNTYW1lIiwic2V0U3RhdGUiLCJ1bmJpbmQiLCJ0eXBlIiwibWluRGF0ZSIsImlzQWZ0ZXIiLCJFcnJvciIsIm1heERhdGUiLCJpc0JlZm9yZSIsInN0cmluZyIsImNocm9ubyIsInBhcnNlRGF0ZSIsImUiLCJzdG9wUHJvcGFnYXRpb24iLCJ0b2dnbGVHbG9iYWxDbGlja0JpbmRpbmciLCJoYW5kbGVTdGFydERhdGVTZXQiLCJoYW5kbGVFbmREYXRlU2V0Iiwib3B0aW9ucyIsIm11dGFibGVEYXRlIiwiaG91ciIsIm1pbnV0ZSIsInNlY29uZCIsIm1pbGxpc2Vjb25kIiwiaXNTYW1lT3JCZWZvcmUiLCJpc1NhbWVPckFmdGVyIiwibmV3U3RhdGUiLCJjb2xsYXBzZSIsImlucHV0RWRpdGFibGUiLCJoYW5kbGVPbkNoYW5nZSIsInRhcmdldCIsInZhbHVlIiwia2V5IiwiZGF0ZVN0cmluZyIsInZhbGlkYXRlRGF0ZVN0cmluZyIsImdldE1pbkRhdGVGb3JUeXBlIiwiZ2V0TWF4RGF0ZUZvclR5cGUiLCJjdXJyZW50IiwicmVzZXQiLCJoYW5kbGVEYXRlU2VsZWN0aW9uIiwiZW5kRGF0ZURhdGVwaWNrZXIiLCJkaXZpZGVyIiwic3R5bGVzIiwiaW5wdXRXaWR0aCIsIndpZHRoIiwiZW5kRGF0ZVZhbHVlIiwiaGFuZGxlRW5kRGF0ZUlucHV0Q2hhbmdlIiwiY2xvc2VEYXRlcGlja2VyIiwib3BlbkRhdGVwaWNrZXIiLCJoYW5kbGVFbmREYXRlS2V5UHJlc3MiLCJyZW5kZXJEYXRlcGlja2VyIiwic3RhcnREYXRlVmFsdWUiLCJjb250ZW50Iiwic3RvcEJ1YmJsZSIsImhhbmRsZVN0YXJ0RGF0ZUlucHV0Q2hhbmdlIiwiaGFuZGxlU3RhcnREYXRlS2V5UHJlc3MiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJib29sIiwiaW5zdGFuY2VPZiIsImlnbm9yZUZvbnRBd2Vzb21lIiwibnVtYmVyIiwiZnVuYyIsInN1YnRyYWN0Iiwibm9vcCIsIm5hdGl2ZUV2ZW50Iiwic3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uIiwiY2FsbGJhY2siLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZGF0YSIsImNvbnNvbGUiLCJsb2ciLCJtIiwidmFsdWVPZiIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxtQkFBbUIsR0FBRyxZQUE1QjtBQUNBLElBQU1DLHdCQUF3QixHQUFHLG1CQUFqQztBQUNBLElBQU1DLFNBQVMsR0FBRyxPQUFsQjs7SUFFTUMsVTs7Ozs7QUE0QkYsc0JBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQTs7QUFDZiw4QkFBTUEsS0FBTjtBQUVBLFFBQUlDLE9BQU8sR0FBRyxNQUFLRCxLQUFMLENBQVdFLGNBQXpCO0FBQ0EsUUFBSUMsU0FBUyxHQUFHLE1BQUtILEtBQUwsQ0FBV0ksV0FBM0I7O0FBR0EsUUFBSSxDQUFDRCxTQUFMLEVBQWdCO0FBQ2RBLE1BQUFBLFNBQVMsR0FBR0UsMkJBQU9DLEVBQVAsQ0FBVSxNQUFLTixLQUFMLENBQVdPLFFBQXJCLENBQVo7QUFDRCxLQUZELE1BRU87QUFDTEosTUFBQUEsU0FBUyxDQUFDRyxFQUFWLENBQWEsTUFBS04sS0FBTCxDQUFXTyxRQUF4QjtBQUNEOztBQUVELFFBQUksQ0FBQ04sT0FBTCxFQUFjO0FBQ1pBLE1BQUFBLE9BQU8sR0FBR0ksMkJBQU9DLEVBQVAsQ0FBVUgsU0FBVixFQUFxQixNQUFLSCxLQUFMLENBQVdPLFFBQWhDLEVBQTBDQyxHQUExQyxDQUE4QyxDQUE5QyxFQUFpRCxRQUFqRCxDQUFWO0FBQ0QsS0FGRCxNQUVPO0FBQ0xQLE1BQUFBLE9BQU8sQ0FBQ0ssRUFBUixDQUFXLE1BQUtOLEtBQUwsQ0FBV08sUUFBdEI7QUFDRDs7QUFFRCxRQUFJRSxVQUFKOztBQUNBLFFBQUlULEtBQUssQ0FBQ1UsTUFBVixFQUFrQjtBQUNkRCxNQUFBQSxVQUFVLEdBQUdULEtBQUssQ0FBQ1UsTUFBbkI7QUFDSCxLQUZELE1BRU8sSUFBSVYsS0FBSyxDQUFDVyxVQUFWLEVBQXNCO0FBQ3pCRixNQUFBQSxVQUFVLEdBQUdaLHdCQUFiO0FBQ0gsS0FGTSxNQUVBO0FBQ0hZLE1BQUFBLFVBQVUsR0FBR2IsbUJBQWI7QUFDSDs7QUFFRCxVQUFLZ0IsS0FBTCxHQUFhO0FBQ1RDLE1BQUFBLGlCQUFpQixFQUFFLElBRFY7QUFFVFosTUFBQUEsT0FBTyxFQUFFQSxPQUZBO0FBR1RhLE1BQUFBLGlCQUFpQixFQUFFYixPQUFPLENBQUNTLE1BQVIsQ0FBZUQsVUFBZixDQUhWO0FBR3NDO0FBQy9DTSxNQUFBQSxrQkFBa0IsRUFBRSxLQUpYO0FBS1RaLE1BQUFBLFNBQVMsRUFBRUEsU0FMRjtBQU1UYSxNQUFBQSxtQkFBbUIsRUFBRWIsU0FBUyxDQUFDTyxNQUFWLENBQWlCRCxVQUFqQixDQU5aO0FBTTBDO0FBQ25EUSxNQUFBQSxvQkFBb0IsRUFBRSxLQVBiO0FBUVRQLE1BQUFBLE1BQU0sRUFBRUQ7QUFSQyxLQUFiOztBQVdBLFFBQUlTLGNBQWMsR0FBRyxNQUFLQyxnQkFBTCxDQUFzQkMsSUFBdEIsZ0NBQWlDLElBQWpDLENBQXJCOztBQUVBLFVBQUtDLGNBQUwsR0FBc0JDLFVBQVUsQ0FBQ0osY0FBRCxDQUFoQztBQUVBLFVBQUtLLFFBQUwsZ0JBQWdCQyxrQkFBTUMsU0FBTixFQUFoQjtBQTNDZTtBQTZDbEI7Ozs7d0NBRW1CO0FBQ2hCLFVBQUksS0FBS3pCLEtBQUwsQ0FBVzBCLE9BQWYsRUFBd0I7QUFDcEIsYUFBSzFCLEtBQUwsQ0FBVzJCLFFBQVgsQ0FBb0I7QUFDaEJ4QixVQUFBQSxTQUFTLEVBQUV5QixLQUFLLENBQUMsS0FBS2hCLEtBQUwsQ0FBV1QsU0FBWixFQUF1QixLQUFLSCxLQUFMLENBQVdPLFFBQWxDLENBREE7QUFFaEJOLFVBQUFBLE9BQU8sRUFBRTJCLEtBQUssQ0FBQyxLQUFLaEIsS0FBTCxDQUFXWCxPQUFaLEVBQXFCLEtBQUtELEtBQUwsQ0FBV08sUUFBaEM7QUFGRSxTQUFwQjtBQUlILE9BTEQsTUFLTztBQUNILGFBQUtQLEtBQUwsQ0FBVzJCLFFBQVgsQ0FBb0I7QUFDaEJFLFVBQUFBLElBQUksRUFBRUQsS0FBSyxDQUFDLEtBQUtoQixLQUFMLENBQVdULFNBQVosRUFBdUIsS0FBS0gsS0FBTCxDQUFXTyxRQUFsQztBQURLLFNBQXBCO0FBR0g7QUFDSjs7OytCQUVVO0FBQ1QsVUFBSSxLQUFLUCxLQUFMLENBQVcwQixPQUFmLEVBQXdCO0FBQ3BCLGVBQU87QUFDSHZCLFVBQUFBLFNBQVMsRUFBRXlCLEtBQUssQ0FBQyxLQUFLaEIsS0FBTCxDQUFXVCxTQUFaLEVBQXVCLEtBQUtILEtBQUwsQ0FBV08sUUFBbEMsQ0FEYjtBQUVITixVQUFBQSxPQUFPLEVBQUUyQixLQUFLLENBQUMsS0FBS2hCLEtBQUwsQ0FBV1gsT0FBWixFQUFxQixLQUFLRCxLQUFMLENBQVdPLFFBQWhDO0FBRlgsU0FBUDtBQUlILE9BTEQsTUFLTztBQUNILGVBQU87QUFDSHNCLFVBQUFBLElBQUksRUFBRUQsS0FBSyxDQUFDLEtBQUtoQixLQUFMLENBQVdULFNBQVosRUFBdUIsS0FBS0gsS0FBTCxDQUFXTyxRQUFsQztBQURSLFNBQVA7QUFHSDtBQUNGOzs7OENBRXlCdUIsUSxFQUFVO0FBQ2hDO0FBQ0E7QUFDQSxVQUNLLENBQUMsS0FBS2xCLEtBQUwsQ0FBV1gsT0FBWCxDQUFtQjhCLE1BQW5CLENBQTBCRCxRQUFRLENBQUM1QixjQUFuQyxDQUFELElBQ0U0QixRQUFRLENBQUM1QixjQUFULEtBQTRCLEtBQUtGLEtBQUwsQ0FBV0UsY0FEekMsSUFFRSxDQUFDNEIsUUFBUSxDQUFDNUIsY0FBVCxDQUF3QjZCLE1BQXhCLENBQStCLEtBQUsvQixLQUFMLENBQVdFLGNBQTFDLENBRkosSUFJQyxDQUFDLEtBQUtVLEtBQUwsQ0FBV1QsU0FBWCxDQUFxQjRCLE1BQXJCLENBQTRCRCxRQUFRLENBQUMxQixXQUFyQyxDQUFELElBQ0UsQ0FBQzBCLFFBQVEsQ0FBQzFCLFdBQVYsS0FBMEIsS0FBS0osS0FBTCxDQUFXSSxXQUR2QyxJQUVFLENBQUMwQixRQUFRLENBQUMxQixXQUFULENBQXFCMkIsTUFBckIsQ0FBNEIsS0FBSy9CLEtBQUwsQ0FBV0ksV0FBdkMsQ0FQUixFQVFNO0FBQ0YsWUFBSUgsT0FBTyxHQUFHNkIsUUFBUSxDQUFDNUIsY0FBdkI7QUFDQSxZQUFJQyxTQUFTLEdBQUcyQixRQUFRLENBQUMxQixXQUF6Qjs7QUFFQSxZQUFJLENBQUNELFNBQUwsRUFBZ0I7QUFDZEEsVUFBQUEsU0FBUyxHQUFHRSwyQkFBT0MsRUFBUCxDQUFVd0IsUUFBUSxDQUFDdkIsUUFBbkIsQ0FBWjtBQUNELFNBRkQsTUFFTztBQUNMSixVQUFBQSxTQUFTLEdBQUdBLFNBQVMsQ0FBQ0csRUFBVixDQUFhd0IsUUFBUSxDQUFDdkIsUUFBdEIsQ0FBWjtBQUNEOztBQUVELFlBQUksQ0FBQ04sT0FBTCxFQUFjO0FBQ1pBLFVBQUFBLE9BQU8sR0FBRzJCLEtBQUssQ0FBQ3pCLFNBQUQsRUFBWTJCLFFBQVEsQ0FBQ3ZCLFFBQXJCLENBQUwsQ0FBb0NDLEdBQXBDLENBQXdDLENBQXhDLEVBQTJDLFFBQTNDLENBQVY7QUFDRCxTQUZELE1BRU87QUFDTFAsVUFBQUEsT0FBTyxHQUFHQSxPQUFPLENBQUNLLEVBQVIsQ0FBV3dCLFFBQVEsQ0FBQ3ZCLFFBQXBCLENBQVY7QUFDRDs7QUFFRCxhQUFLeUIsUUFBTCxDQUFjO0FBQ1YvQixVQUFBQSxPQUFPLEVBQUVBLE9BREM7QUFFVkUsVUFBQUEsU0FBUyxFQUFFQSxTQUZEO0FBR1ZXLFVBQUFBLGlCQUFpQixFQUFFYixPQUFPLENBQUNTLE1BQVIsQ0FBZSxLQUFLRSxLQUFMLENBQVdGLE1BQTFCLENBSFQ7QUFJVk0sVUFBQUEsbUJBQW1CLEVBQUViLFNBQVMsQ0FBQ08sTUFBVixDQUFpQixLQUFLRSxLQUFMLENBQVdGLE1BQTVCO0FBSlgsU0FBZDtBQU1IO0FBQ0o7OzsrQ0FHMEI7QUFDdkIsVUFBSSxLQUFLRSxLQUFMLENBQVdDLGlCQUFmLEVBQWtDO0FBQzlCLGFBQUtRLGNBQUwsQ0FBb0JELElBQXBCO0FBQ0gsT0FGRCxNQUVPO0FBQ0gsYUFBS0MsY0FBTCxDQUFvQlksTUFBcEI7QUFDSDtBQUNKO0FBRUQ7Ozs7c0NBRWtCQyxJLEVBQU07QUFDcEIsVUFBSUEsSUFBSSxLQUFLLFdBQWIsRUFBMEI7QUFDdEIsZUFBTyxLQUFLbEMsS0FBTCxDQUFXbUMsT0FBbEI7QUFDSCxPQUZELE1BRU8sSUFBSUQsSUFBSSxLQUFLLFNBQWIsRUFBd0I7QUFDM0IsWUFBSSxLQUFLdEIsS0FBTCxDQUFXVCxTQUFYLENBQXFCaUMsT0FBckIsQ0FBNkIsS0FBS3BDLEtBQUwsQ0FBV21DLE9BQXhDLENBQUosRUFBc0Q7QUFDbEQsaUJBQU8sS0FBS3ZCLEtBQUwsQ0FBV1QsU0FBbEI7QUFDSCxTQUZELE1BRU87QUFDSCxpQkFBTyxLQUFLSCxLQUFMLENBQVdtQyxPQUFsQjtBQUNIO0FBQ0osT0FOTSxNQU1BO0FBQ0gsY0FBTUUsS0FBSyxDQUFDLG1EQUFtREgsSUFBcEQsQ0FBWDtBQUNIO0FBQ0o7OztzQ0FFaUJBLEksRUFBTTtBQUNwQixVQUFJQSxJQUFJLEtBQUssU0FBYixFQUF3QjtBQUNwQixlQUFPLEtBQUtsQyxLQUFMLENBQVdzQyxPQUFsQjtBQUNILE9BRkQsTUFFTyxJQUFJSixJQUFJLEtBQUssV0FBYixFQUEwQjtBQUM3QixZQUFJLEtBQUt0QixLQUFMLENBQVdYLE9BQVgsQ0FBbUJzQyxRQUFuQixDQUE0QixLQUFLdkMsS0FBTCxDQUFXc0MsT0FBdkMsS0FBbUQsS0FBS3RDLEtBQUwsQ0FBVzBCLE9BQWxFLEVBQTJFO0FBQ3ZFLGlCQUFPLEtBQUtkLEtBQUwsQ0FBV1gsT0FBbEI7QUFDSCxTQUZELE1BRU87QUFDSCxpQkFBTyxLQUFLRCxLQUFMLENBQVdzQyxPQUFsQjtBQUNIO0FBQ0osT0FOTSxNQU1BO0FBQ0gsY0FBTUQsS0FBSyxDQUFDLG1EQUFtREgsSUFBcEQsQ0FBWDtBQUNIO0FBQ0o7Ozt1Q0FFa0JNLE0sRUFBUTtBQUN6QjtBQUNBO0FBQ0EsVUFBTVgsSUFBSSxHQUFHWSx1QkFBT0MsU0FBUCxDQUFpQkYsTUFBTSxHQUFHLEdBQVQsR0FBZW5DLDJCQUFPQyxFQUFQLENBQVUsS0FBS04sS0FBTCxDQUFXTyxRQUFyQixFQUErQkcsTUFBL0IsQ0FBc0MsR0FBdEMsQ0FBaEMsQ0FBYjs7QUFDQSxhQUFPbUIsSUFBUDtBQUNEO0FBRUQ7Ozs7cUNBRWlCSyxJLEVBQU1TLEMsRUFBRztBQUN0QixVQUFJQSxDQUFKLEVBQU87QUFDSEEsUUFBQUEsQ0FBQyxDQUFDQyxlQUFGO0FBQ0g7O0FBRUQsV0FBS1osUUFBTCxDQUFjO0FBQ1ZuQixRQUFBQSxpQkFBaUIsRUFBRXFCO0FBRFQsT0FBZCxFQUVHLEtBQUtXLHdCQUFMLENBQThCekIsSUFBOUIsQ0FBbUMsSUFBbkMsQ0FGSDtBQUdIOzs7bUNBRWNjLEksRUFBTVMsQyxFQUFHO0FBQ3BCLFVBQUlBLENBQUosRUFBTztBQUNIQSxRQUFBQSxDQUFDLENBQUNDLGVBQUY7QUFDSDs7QUFFRCxXQUFLWixRQUFMLENBQWM7QUFDVm5CLFFBQUFBLGlCQUFpQixFQUFFcUI7QUFEVCxPQUFkO0FBR0g7OztvQ0FHZUEsSSxFQUFNUyxDLEVBQUc7QUFDckIsVUFBSUEsQ0FBSixFQUFPO0FBQ0hBLFFBQUFBLENBQUMsQ0FBQ0MsZUFBRjtBQUNIOztBQUVELFVBQUlWLElBQUksS0FBSyxXQUFiLEVBQTBCO0FBQ3RCLGFBQUtZLGtCQUFMO0FBQ0gsT0FGRCxNQUVPLElBQUlaLElBQUksS0FBSyxTQUFiLEVBQXdCO0FBQzNCLGFBQUthLGdCQUFMO0FBQ0g7O0FBRUQsV0FBS0Ysd0JBQUw7QUFDSDs7O3dDQUVtQlgsSSxFQUFNTCxJLEVBQU1tQixPLEVBQVM7QUFDckMsVUFBSUMsV0FBVyxHQUFHckIsS0FBSyxDQUFDQyxJQUFELEVBQU8sS0FBSzdCLEtBQUwsQ0FBV08sUUFBbEIsQ0FBdkIsQ0FEcUMsQ0FHckM7O0FBQ0EwQyxNQUFBQSxXQUFXLENBQUNDLElBQVosQ0FBaUIsQ0FBakIsRUFBb0JDLE1BQXBCLENBQTJCLENBQTNCLEVBQThCQyxNQUE5QixDQUFxQyxDQUFyQyxFQUF3Q0MsV0FBeEMsQ0FBb0QsQ0FBcEQ7O0FBQ0EsVUFBSUosV0FBVyxDQUFDVixRQUFaLENBQXFCLEtBQUt2QyxLQUFMLENBQVdtQyxPQUFoQyxLQUE0Q2MsV0FBVyxDQUFDYixPQUFaLENBQW9CLEtBQUtwQyxLQUFMLENBQVdzQyxPQUEvQixDQUFoRCxFQUF5RjtBQUNyRixlQUFPLEtBQVA7QUFDSDs7QUFFRCxVQUFJSixJQUFJLEtBQUssU0FBYixFQUF3QjtBQUNwQixZQUFJTCxJQUFJLENBQUN5QixjQUFMLENBQW9CLEtBQUsxQyxLQUFMLENBQVdULFNBQS9CLENBQUosRUFBK0M7QUFDM0MsaUJBQU8sS0FBUDtBQUNIO0FBQ0osT0FKRCxNQUlPLElBQUkrQixJQUFJLEtBQUssV0FBYixFQUEwQjtBQUM3QixZQUFJTCxJQUFJLENBQUMwQixhQUFMLENBQW1CLEtBQUszQyxLQUFMLENBQVdYLE9BQTlCLEtBQTBDLEtBQUtELEtBQUwsQ0FBVzBCLE9BQXpELEVBQWtFO0FBQzlELGlCQUFPLEtBQVA7QUFDSDtBQUNKOztBQUVELFVBQUk4QixRQUFRLEdBQUcsRUFBZjtBQUNBQSxNQUFBQSxRQUFRLENBQUMzQyxpQkFBVCxHQUE2QixJQUE3Qjs7QUFFQSxVQUFJbUMsT0FBTyxJQUFJLE9BQU9BLE9BQU8sQ0FBQ1MsUUFBZixLQUE0QixTQUEzQyxFQUFzRDtBQUNsRCxZQUFJLENBQUNULE9BQU8sQ0FBQ1MsUUFBYixFQUF1QjtBQUNuQkQsVUFBQUEsUUFBUSxDQUFDM0MsaUJBQVQsR0FBNkJxQixJQUE3QjtBQUNIO0FBQ0o7O0FBRURzQixNQUFBQSxRQUFRLENBQUN0QixJQUFELENBQVIsR0FBaUJMLElBQWpCOztBQUNBLFVBQUksS0FBSzdCLEtBQUwsQ0FBVzBELGFBQWYsRUFBOEI7QUFDMUJGLFFBQUFBLFFBQVEsV0FBSXRCLElBQUosZ0JBQVIsR0FBZ0NMLElBQUksQ0FBQ25CLE1BQUwsQ0FBWSxLQUFLRSxLQUFMLENBQVdGLE1BQXZCLENBQWhDO0FBQ0g7O0FBRUQsV0FBS3NCLFFBQUwsQ0FBY3dCLFFBQWQsRUFBd0IsS0FBS0csY0FBTCxDQUFvQnZDLElBQXBCLENBQXlCLElBQXpCLENBQXhCO0FBQ0g7OzsrQ0FFMEJ1QixDLEVBQUc7QUFDMUIsV0FBS1gsUUFBTCxDQUFjO0FBQ1ZoQixRQUFBQSxtQkFBbUIsRUFBRTJCLENBQUMsQ0FBQ2lCLE1BQUYsQ0FBU0MsS0FEcEI7QUFFVjVDLFFBQUFBLG9CQUFvQixFQUFFO0FBRlosT0FBZDtBQUlIOzs7NkNBRXdCMEIsQyxFQUFHO0FBQ3hCLFdBQUtYLFFBQUwsQ0FBYztBQUNWbEIsUUFBQUEsaUJBQWlCLEVBQUU2QixDQUFDLENBQUNpQixNQUFGLENBQVNDLEtBRGxCO0FBRVY5QyxRQUFBQSxrQkFBa0IsRUFBRTtBQUZWLE9BQWQ7QUFJSDs7OzRDQUV1QjRCLEMsRUFBRztBQUN2QixVQUFJQSxDQUFDLENBQUNtQixHQUFGLEtBQVVoRSxTQUFkLEVBQXlCO0FBQ3JCLGFBQUtnRCxrQkFBTDtBQUNIO0FBQ0o7OzswQ0FFcUJILEMsRUFBRztBQUNyQixVQUFJQSxDQUFDLENBQUNtQixHQUFGLEtBQVVoRSxTQUFkLEVBQXlCO0FBQ3JCLGFBQUtpRCxnQkFBTDtBQUNIO0FBQ0o7Ozt5Q0FHb0I7QUFBQTs7QUFBQSx3QkFFMkMsS0FBS25DLEtBRmhEO0FBQUEsVUFFVkssb0JBRlUsZUFFVkEsb0JBRlU7QUFBQSxVQUVZRCxtQkFGWixlQUVZQSxtQkFGWjtBQUFBLFVBRWlDTixNQUZqQyxlQUVpQ0EsTUFGakM7QUFBQSx3QkFHYyxLQUFLVixLQUhuQjtBQUFBLFVBR1ZXLFVBSFUsZUFHVkEsVUFIVTtBQUFBLFVBR0VKLFFBSEYsZUFHRUEsUUFIRjtBQUlqQixVQUFNd0QsVUFBVSxHQUFHLEtBQUtDLGtCQUFMLENBQXdCaEQsbUJBQXhCLENBQW5CO0FBQ0EsVUFBTWIsU0FBUyxHQUFHLGdDQUFPYSxtQkFBUCxFQUE0QixvQkFBNUIsRUFBa0RWLEVBQWxELENBQXFEQyxRQUFyRCxFQUErRCxJQUEvRCxDQUFsQjtBQUNBLFVBQU00QixPQUFPLEdBQUcsS0FBSzhCLGlCQUFMLENBQXVCLFdBQXZCLENBQWhCO0FBQ0EsVUFBTTNCLE9BQU8sR0FBRyxLQUFLNEIsaUJBQUwsQ0FBdUIsV0FBdkIsQ0FBaEI7O0FBRUEsVUFBSSxDQUFDdkQsVUFBTCxFQUFpQjtBQUNiO0FBQ0FSLFFBQUFBLFNBQVMsQ0FBQytDLElBQVYsQ0FBZSxDQUFmLEVBQWtCQyxNQUFsQixDQUF5QixDQUF6QixFQUE0QkMsTUFBNUIsQ0FBbUMsQ0FBbkMsRUFBc0NDLFdBQXRDLENBQWtELENBQWxEO0FBQ0gsT0FaZ0IsQ0FhakI7OztBQUNBLFVBQUlwQyxvQkFBb0IsSUFBSThDLFVBQXhCLElBQXNDNUQsU0FBUyxDQUFDb0QsYUFBVixDQUF3QnBCLE9BQXhCLENBQXRDLElBQTBFaEMsU0FBUyxDQUFDbUQsY0FBVixDQUF5QmhCLE9BQXpCLENBQTlFLEVBQWlIO0FBRTdHLGFBQUtOLFFBQUwsQ0FBYztBQUNWN0IsVUFBQUEsU0FBUyxFQUFFQSxTQUREO0FBRVZhLFVBQUFBLG1CQUFtQixFQUFFYixTQUFTLENBQUNPLE1BQVYsQ0FBaUJBLE1BQWpCLENBRlg7QUFHVk8sVUFBQUEsb0JBQW9CLEVBQUU7QUFIWixTQUFkLEVBSUcsWUFBTTtBQUNMLFVBQUEsTUFBSSxDQUFDMEMsY0FBTDs7QUFDQSxjQUFJLE1BQUksQ0FBQ3BDLFFBQUwsQ0FBYzRDLE9BQWxCLEVBQTJCO0FBQ3ZCLFlBQUEsTUFBSSxDQUFDNUMsUUFBTCxDQUFjNEMsT0FBZCxDQUFzQkMsS0FBdEI7QUFDSDtBQUNKLFNBVEQ7QUFVSCxPQVpELE1BWU87QUFDSDtBQUNBO0FBQ0EsYUFBS3BDLFFBQUwsQ0FBYztBQUNWaEIsVUFBQUEsbUJBQW1CLEVBQUUsS0FBS0osS0FBTCxDQUFXVCxTQUFYLENBQXFCTyxNQUFyQixDQUE0QkEsTUFBNUI7QUFEWCxTQUFkO0FBR0g7QUFDSjs7O3VDQUVrQjtBQUFBOztBQUFBLHlCQUN5QyxLQUFLRSxLQUQ5QztBQUFBLFVBQ1JHLGtCQURRLGdCQUNSQSxrQkFEUTtBQUFBLFVBQ1lELGlCQURaLGdCQUNZQSxpQkFEWjtBQUFBLFVBQytCSixNQUQvQixnQkFDK0JBLE1BRC9CO0FBQUEseUJBRWdCLEtBQUtWLEtBRnJCO0FBQUEsVUFFUlcsVUFGUSxnQkFFUkEsVUFGUTtBQUFBLFVBRUlKLFFBRkosZ0JBRUlBLFFBRko7QUFHZixVQUFNd0QsVUFBVSxHQUFHLEtBQUtDLGtCQUFMLENBQXdCbEQsaUJBQXhCLENBQW5CO0FBQ0EsVUFBTWIsT0FBTyxHQUFHLGdDQUFPYSxpQkFBUCxFQUEwQixvQkFBMUIsRUFBZ0RSLEVBQWhELENBQW1EQyxRQUFuRCxFQUE2RCxJQUE3RCxDQUFoQjtBQUNBLFVBQU00QixPQUFPLEdBQUcsS0FBSzhCLGlCQUFMLENBQXVCLFNBQXZCLENBQWhCO0FBQ0EsVUFBTTNCLE9BQU8sR0FBRyxLQUFLNEIsaUJBQUwsQ0FBdUIsU0FBdkIsQ0FBaEI7O0FBR0EsVUFBSSxDQUFDdkQsVUFBTCxFQUFpQjtBQUNiO0FBQ0FWLFFBQUFBLE9BQU8sQ0FBQ2lELElBQVIsQ0FBYSxDQUFiLEVBQWdCQyxNQUFoQixDQUF1QixDQUF2QixFQUEwQkMsTUFBMUIsQ0FBaUMsQ0FBakMsRUFBb0NDLFdBQXBDLENBQWdELENBQWhEO0FBQ0gsT0FaYyxDQWFmOzs7QUFDQSxVQUFJdEMsa0JBQWtCLElBQUlnRCxVQUF0QixJQUFvQzlELE9BQU8sQ0FBQ3NELGFBQVIsQ0FBc0JwQixPQUF0QixDQUFwQyxJQUFzRWxDLE9BQU8sQ0FBQ3FELGNBQVIsQ0FBdUJoQixPQUF2QixDQUExRSxFQUEyRztBQUN2RyxhQUFLTixRQUFMLENBQWM7QUFDVi9CLFVBQUFBLE9BQU8sRUFBRUEsT0FEQztBQUVWYSxVQUFBQSxpQkFBaUIsRUFBRWIsT0FBTyxDQUFDUyxNQUFSLENBQWVBLE1BQWYsQ0FGVDtBQUdWSyxVQUFBQSxrQkFBa0IsRUFBRTtBQUhWLFNBQWQsRUFJRyxZQUFNO0FBQ0wsVUFBQSxNQUFJLENBQUM0QyxjQUFMOztBQUNBLGNBQUksTUFBSSxDQUFDcEMsUUFBTCxDQUFjNEMsT0FBbEIsRUFBMkI7QUFDdkIsWUFBQSxNQUFJLENBQUM1QyxRQUFMLENBQWM0QyxPQUFkLENBQXNCQyxLQUF0QjtBQUNIO0FBQ0osU0FURDtBQVVILE9BWEQsTUFXTztBQUNIO0FBQ0EsYUFBS3BDLFFBQUwsQ0FBYztBQUNWbEIsVUFBQUEsaUJBQWlCLEVBQUUsS0FBS0YsS0FBTCxDQUFXWCxPQUFYLENBQW1CUyxNQUFuQixDQUEwQkEsTUFBMUI7QUFEVCxTQUFkO0FBR0g7QUFDSjs7O3FDQUVnQjtBQUNiLFVBQUksS0FBS1YsS0FBTCxDQUFXMEIsT0FBZixFQUF3QjtBQUNwQixhQUFLMUIsS0FBTCxDQUFXMkIsUUFBWCxDQUFvQjtBQUNoQnhCLFVBQUFBLFNBQVMsRUFBRSxLQUFLUyxLQUFMLENBQVdULFNBRE47QUFFaEJGLFVBQUFBLE9BQU8sRUFBRSxLQUFLVyxLQUFMLENBQVdYO0FBRkosU0FBcEI7QUFJSCxPQUxELE1BS087QUFDSCxhQUFLRCxLQUFMLENBQVcyQixRQUFYLENBQW9CO0FBQ2hCRSxVQUFBQSxJQUFJLEVBQUUsS0FBS2pCLEtBQUwsQ0FBV1Q7QUFERCxTQUFwQjtBQUdIOztBQUVELFdBQUswQyx3QkFBTDtBQUVIO0FBRUQ7Ozs7cUNBRWlCWCxJLEVBQU07QUFDbkIsVUFBSSxLQUFLdEIsS0FBTCxDQUFXQyxpQkFBWCxLQUFpQ3FCLElBQXJDLEVBQTJDO0FBQ3ZDLDRCQUFPLGdDQUFDLG9CQUFEO0FBQ0gsVUFBQSxHQUFHLEVBQUUsS0FBS1gsUUFEUDtBQUVILFVBQUEsVUFBVSxFQUFFLEtBQUt2QixLQUFMLENBQVdXLFVBRnBCO0FBR0gsVUFBQSxZQUFZLEVBQUVpQixLQUFLLENBQUMsS0FBS2hCLEtBQUwsQ0FBV3NCLElBQVgsQ0FBRCxFQUFtQixLQUFLbEMsS0FBTCxDQUFXTyxRQUE5QixDQUhoQjtBQUlILFVBQUEsUUFBUSxFQUFFLEtBQUtQLEtBQUwsQ0FBV08sUUFKbEI7QUFLSCxVQUFBLE9BQU8sRUFBRSxLQUFLMkQsaUJBQUwsQ0FBdUJoQyxJQUF2QixDQUxOO0FBTUgsVUFBQSxPQUFPLEVBQUUsS0FBSytCLGlCQUFMLENBQXVCL0IsSUFBdkIsQ0FOTjtBQU9ILFVBQUEsZUFBZSxFQUFFLEtBQUttQyxtQkFBTCxDQUF5QmpELElBQXpCLENBQThCLElBQTlCLEVBQW9DYyxJQUFwQztBQVBkLFVBQVA7QUFRSDtBQUNKOzs7NkJBRVE7QUFDTCxVQUFJb0MsaUJBQWlCLEdBQUcsSUFBeEI7QUFBQSxVQUE4QkMsT0FBTyxHQUFHLElBQXhDO0FBQUEsVUFBOENDLE1BQU0sR0FBRyxFQUF2RDs7QUFFQSxVQUFJLEtBQUt4RSxLQUFMLENBQVd5RSxVQUFmLEVBQTJCO0FBQ3ZCRCxRQUFBQSxNQUFNLENBQUNFLEtBQVAsR0FBZSxLQUFLMUUsS0FBTCxDQUFXeUUsVUFBWCxHQUF3QixJQUF2QztBQUNILE9BRkQsTUFFTyxJQUFJLEtBQUt6RSxLQUFMLENBQVdXLFVBQWYsRUFBMkI7QUFDOUI2RCxRQUFBQSxNQUFNLENBQUNFLEtBQVAsR0FBZSxPQUFmO0FBQ0gsT0FGTSxNQUVBO0FBQ0hGLFFBQUFBLE1BQU0sQ0FBQ0UsS0FBUCxHQUFlLE9BQWY7QUFDSDs7QUFFRCxVQUFJLEtBQUsxRSxLQUFMLENBQVcwQixPQUFmLEVBQXdCO0FBQ3BCLFlBQU1pRCxZQUFZLEdBQUcsS0FBSzNFLEtBQUwsQ0FBVzBELGFBQVgsR0FBMkIsS0FBSzlDLEtBQUwsQ0FBV0UsaUJBQXRDLEdBQTBELEtBQUtGLEtBQUwsQ0FBV1gsT0FBWCxDQUFtQlMsTUFBbkIsQ0FBMEIsS0FBS0UsS0FBTCxDQUFXRixNQUFyQyxDQUEvRTtBQUNBNEQsUUFBQUEsaUJBQWlCLGdCQUNiO0FBQUssVUFBQSxTQUFTLEVBQUM7QUFBZix3QkFDSTtBQUFHLFVBQUEsU0FBUyxFQUFDO0FBQWIsVUFESixlQUVJO0FBQU8sVUFBQSxLQUFLLEVBQUVFLE1BQWQ7QUFDSSxVQUFBLFNBQVMsRUFBQyxrQkFEZDtBQUVJLFVBQUEsUUFBUSxFQUFFLENBQUMsS0FBS3hFLEtBQUwsQ0FBVzBELGFBRjFCO0FBR0ksVUFBQSxLQUFLLEVBQUVpQixZQUhYO0FBSUksVUFBQSxJQUFJLEVBQUMsTUFKVDtBQU1JLFVBQUEsUUFBUSxFQUFFLEtBQUtDLHdCQUFMLENBQThCeEQsSUFBOUIsQ0FBbUMsSUFBbkMsQ0FOZDtBQU9JLFVBQUEsTUFBTSxFQUFFLEtBQUt5RCxlQUFMLENBQXFCekQsSUFBckIsQ0FBMEIsSUFBMUIsRUFBZ0MsU0FBaEMsQ0FQWjtBQVFJLFVBQUEsT0FBTyxFQUFFLEtBQUswRCxjQUFMLENBQW9CMUQsSUFBcEIsQ0FBeUIsSUFBekIsRUFBK0IsU0FBL0IsQ0FSYjtBQVNJLFVBQUEsVUFBVSxFQUFFLEtBQUsyRCxxQkFBTCxDQUEyQjNELElBQTNCLENBQWdDLElBQWhDO0FBVGhCLFVBRkosRUFZSyxLQUFLNEQsZ0JBQUwsQ0FBc0IsU0FBdEIsQ0FaTCxDQURKO0FBZ0JBVCxRQUFBQSxPQUFPLGdCQUFHO0FBQU0sVUFBQSxTQUFTLEVBQUM7QUFBaEIsZUFBVjtBQUNIOztBQUNELFVBQU1VLGNBQWMsR0FBRyxLQUFLakYsS0FBTCxDQUFXMEQsYUFBWCxHQUEyQixLQUFLOUMsS0FBTCxDQUFXSSxtQkFBdEMsR0FBNEQsS0FBS0osS0FBTCxDQUFXVCxTQUFYLENBQXFCTyxNQUFyQixDQUE0QixLQUFLRSxLQUFMLENBQVdGLE1BQXZDLENBQW5GOztBQUVBLFVBQUl3RSxPQUFPLGdCQUNQO0FBQUssUUFBQSxPQUFPLEVBQUVDLFVBQWQ7QUFBMEIsUUFBQSxTQUFTLEVBQUM7QUFBcEMsc0JBQ0k7QUFBSyxRQUFBLFNBQVMsRUFBQztBQUFmLHNCQUNJO0FBQUcsUUFBQSxTQUFTLEVBQUM7QUFBYixRQURKLGVBRUk7QUFBTyxRQUFBLEtBQUssRUFBRVgsTUFBZDtBQUNJLFFBQUEsU0FBUyxFQUFDLGtCQURkO0FBRUksUUFBQSxRQUFRLEVBQUUsQ0FBQyxLQUFLeEUsS0FBTCxDQUFXMEQsYUFGMUI7QUFHSSxRQUFBLEtBQUssRUFBRXVCLGNBSFg7QUFJSSxRQUFBLElBQUksRUFBQyxNQUpUO0FBS0ksUUFBQSxNQUFNLEVBQUUsS0FBS0osZUFBTCxDQUFxQnpELElBQXJCLENBQTBCLElBQTFCLEVBQWdDLFdBQWhDLENBTFo7QUFNSSxRQUFBLE9BQU8sRUFBRSxLQUFLMEQsY0FBTCxDQUFvQjFELElBQXBCLENBQXlCLElBQXpCLEVBQStCLFdBQS9CLENBTmI7QUFPSSxRQUFBLFFBQVEsRUFBRSxLQUFLZ0UsMEJBQUwsQ0FBZ0NoRSxJQUFoQyxDQUFxQyxJQUFyQyxDQVBkO0FBUUksUUFBQSxVQUFVLEVBQUUsS0FBS2lFLHVCQUFMLENBQTZCakUsSUFBN0IsQ0FBa0MsSUFBbEM7QUFSaEIsUUFGSixFQVdLLEtBQUs0RCxnQkFBTCxDQUFzQixXQUF0QixDQVhMLENBREosRUFjS1QsT0FkTCxFQWVLRCxpQkFmTCxDQURKOztBQW1CQSxhQUFPWSxPQUFQO0FBQ0g7Ozs7RUFuYm9CMUQsa0JBQU04RCxTOztnQkFBekJ2RixVLGVBRWlCO0FBQ2YyQixFQUFBQSxPQUFPLEVBQUU2RCxzQkFBVUMsSUFESjtBQUVmckQsRUFBQUEsT0FBTyxFQUFFb0Qsc0JBQVVFLFVBQVYsQ0FBcUJwRiwwQkFBckIsQ0FGTTtBQUdmaUMsRUFBQUEsT0FBTyxFQUFFaUQsc0JBQVVFLFVBQVYsQ0FBcUJwRiwwQkFBckIsQ0FITTtBQUlmcUYsRUFBQUEsaUJBQWlCLEVBQUVILHNCQUFVQyxJQUpkO0FBS2Y3RSxFQUFBQSxVQUFVLEVBQUU0RSxzQkFBVUMsSUFMUDtBQU1mOUUsRUFBQUEsTUFBTSxFQUFFNkUsc0JBQVUvQyxNQU5IO0FBT2ZpQyxFQUFBQSxVQUFVLEVBQUVjLHNCQUFVSSxNQVBQO0FBUWZqQyxFQUFBQSxhQUFhLEVBQUU2QixzQkFBVUMsSUFSVjtBQVNmN0QsRUFBQUEsUUFBUSxFQUFFNEQsc0JBQVVLLElBVEw7QUFVZnJGLEVBQUFBLFFBQVEsRUFBRWdGLHNCQUFVL0MsTUFWTDtBQVdmcEMsRUFBQUEsV0FBVyxFQUFFbUYsc0JBQVVFLFVBQVYsQ0FBcUJwRiwwQkFBckIsQ0FYRTtBQVlmSCxFQUFBQSxjQUFjLEVBQUVxRixzQkFBVUUsVUFBVixDQUFxQnBGLDBCQUFyQixDQVpELENBWThCOztBQVo5QixDOztnQkFGakJOLFUsa0JBaUJvQjtBQUNsQjJCLEVBQUFBLE9BQU8sRUFBRSxLQURTO0FBRWxCZ0MsRUFBQUEsYUFBYSxFQUFFLElBRkc7QUFHbEJ2QixFQUFBQSxPQUFPLEVBQUUsa0NBQVMwRCxRQUFULENBQWtCLEVBQWxCLEVBQXNCLE9BQXRCLENBSFM7QUFJbEJ2RCxFQUFBQSxPQUFPLEVBQUUsa0NBQVM5QixHQUFULENBQWEsRUFBYixFQUFpQixPQUFqQixDQUpTO0FBS2xCa0YsRUFBQUEsaUJBQWlCLEVBQUUsS0FMRDtBQU1sQi9FLEVBQUFBLFVBQVUsRUFBRSxLQU5NO0FBT2xCSixFQUFBQSxRQUFRLEVBQUUsS0FQUTtBQVFsQm9CLEVBQUFBLFFBQVEsRUFBRW1FO0FBUlEsQzs7QUFxYTFCLFNBQVNYLFVBQVQsQ0FBb0J4QyxDQUFwQixFQUF1QjtBQUNuQkEsRUFBQUEsQ0FBQyxDQUFDb0QsV0FBRixDQUFjQyx3QkFBZDtBQUNIOztBQUVELFNBQVMxRSxVQUFULENBQW9CMkUsUUFBcEIsRUFBOEI7QUFFMUIsU0FBTztBQUNIN0UsSUFBQUEsSUFBSSxFQUFFLGdCQUFVO0FBQ1o4RSxNQUFBQSxRQUFRLENBQUNDLGdCQUFULENBQTBCLE9BQTFCLEVBQW1DRixRQUFuQyxFQUE2QyxLQUE3QztBQUNILEtBSEU7QUFLSGhFLElBQUFBLE1BQU0sRUFBRSxrQkFBVztBQUNmaUUsTUFBQUEsUUFBUSxDQUFDRSxtQkFBVCxDQUE2QixPQUE3QixFQUFzQ0gsUUFBdEMsRUFBZ0QsS0FBaEQ7QUFDSDtBQVBFLEdBQVA7QUFTSDs7QUFFRCxTQUFTSCxJQUFULENBQWNPLElBQWQsRUFBb0I7QUFDaEJDLEVBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZLFVBQVosRUFBd0JGLElBQXhCO0FBQ0g7O0FBRUQsU0FBU3pFLEtBQVQsQ0FBZTRFLENBQWYsRUFBa0JsRyxFQUFsQixFQUFzQjtBQUNwQixTQUFPRCwyQkFBT0MsRUFBUCxDQUFVa0csQ0FBQyxDQUFDQyxPQUFGLEVBQVYsRUFBdUJuRyxFQUF2QixDQUFQO0FBQ0Q7O0FBR0RvRyxNQUFNLENBQUNDLE9BQVAsR0FBaUI1RyxVQUFqQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBSZWFjdERPTSBmcm9tIFwicmVhY3QtZG9tXCI7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gXCJwcm9wLXR5cGVzXCI7XG5pbXBvcnQgRGF0ZVZpZXcgZnJvbSBcIi4vZGF0ZS12aWV3XCI7XG5pbXBvcnQgbW9tZW50IGZyb20gXCJtb21lbnQtdGltZXpvbmVcIjtcbmltcG9ydCBjaHJvbm8gZnJvbSBcImNocm9uby1ub2RlXCI7XG5cbmNvbnN0IERFRkFVTFRfREFURV9GT1JNQVQgPSBcIk1NL0REL1lZWVlcIjtcbmNvbnN0IERFRkFVTFRfREFURV9USU1FX0ZPUk1BVCA9IFwiTU0vREQvWVlZWSBoOm1tIGFcIjtcbmNvbnN0IEVOVEVSX0tFWSA9IFwiRW50ZXJcIjtcblxuY2xhc3MgRGF0ZVBpY2tlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBpc1JhbmdlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YobW9tZW50KSxcbiAgICAgICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YobW9tZW50KSxcbiAgICAgICAgaWdub3JlRm9udEF3ZXNvbWU6IFByb3BUeXBlcy5ib29sLFxuICAgICAgICBlbmFibGVUaW1lOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgZm9ybWF0OiBQcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICBpbnB1dFdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICBpbnB1dEVkaXRhYmxlOiBQcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgb25DaGFuZ2U6IFByb3BUeXBlcy5mdW5jLFxuICAgICAgICB0aW1lem9uZTogUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgZGVmYXVsdERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKG1vbWVudCksXG4gICAgICAgIGRlZmF1bHRFbmREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihtb21lbnQpIC8vIFRPRE86IHZhbGlkYXRlIHRoYXQgaXQncyBiL3cgZGF0ZXNcbiAgICB9O1xuXG4gICAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IHtcbiAgICAgICAgaXNSYW5nZTogZmFsc2UsXG4gICAgICAgIGlucHV0RWRpdGFibGU6IHRydWUsXG4gICAgICAgIG1pbkRhdGU6IG1vbWVudCgpLnN1YnRyYWN0KDUwLCBcInllYXJzXCIpLFxuICAgICAgICBtYXhEYXRlOiBtb21lbnQoKS5hZGQoNTAsIFwieWVhcnNcIiksXG4gICAgICAgIGlnbm9yZUZvbnRBd2Vzb21lOiBmYWxzZSxcbiAgICAgICAgZW5hYmxlVGltZTogZmFsc2UsXG4gICAgICAgIHRpbWV6b25lOiBcIlVUQ1wiLFxuICAgICAgICBvbkNoYW5nZTogbm9vcFxuICAgIH07XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG5cbiAgICAgICAgbGV0IGVuZERhdGUgPSB0aGlzLnByb3BzLmRlZmF1bHRFbmREYXRlO1xuICAgICAgICBsZXQgc3RhcnREYXRlID0gdGhpcy5wcm9wcy5kZWZhdWx0RGF0ZTtcblxuXG4gICAgICAgIGlmICghc3RhcnREYXRlKSB7XG4gICAgICAgICAgc3RhcnREYXRlID0gbW9tZW50LnR6KHRoaXMucHJvcHMudGltZXpvbmUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0YXJ0RGF0ZS50eih0aGlzLnByb3BzLnRpbWV6b25lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghZW5kRGF0ZSkge1xuICAgICAgICAgIGVuZERhdGUgPSBtb21lbnQudHooc3RhcnREYXRlLCB0aGlzLnByb3BzLnRpbWV6b25lKS5hZGQoMSwgXCJtb250aHNcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZW5kRGF0ZS50eih0aGlzLnByb3BzLnRpbWV6b25lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkYXRlRm9ybWF0O1xuICAgICAgICBpZiAocHJvcHMuZm9ybWF0KSB7XG4gICAgICAgICAgICBkYXRlRm9ybWF0ID0gcHJvcHMuZm9ybWF0O1xuICAgICAgICB9IGVsc2UgaWYgKHByb3BzLmVuYWJsZVRpbWUpIHtcbiAgICAgICAgICAgIGRhdGVGb3JtYXQgPSBERUZBVUxUX0RBVEVfVElNRV9GT1JNQVQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkYXRlRm9ybWF0ID0gREVGQVVMVF9EQVRFX0ZPUk1BVDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBkYXRlcGlja2VyVmlzaWJsZTogbnVsbCxcbiAgICAgICAgICAgIGVuZERhdGU6IGVuZERhdGUsXG4gICAgICAgICAgICBlbmREYXRlSW5wdXRWYWx1ZTogZW5kRGF0ZS5mb3JtYXQoZGF0ZUZvcm1hdCksIC8vIFN0cmluZyB2YWx1ZSBvZiBkYXRlXG4gICAgICAgICAgICBlbmRJbnB1dEhhc0NoYW5nZWQ6IGZhbHNlLFxuICAgICAgICAgICAgc3RhcnREYXRlOiBzdGFydERhdGUsXG4gICAgICAgICAgICBzdGFydERhdGVJbnB1dFZhbHVlOiBzdGFydERhdGUuZm9ybWF0KGRhdGVGb3JtYXQpLCAvLyBTdHJpbmcgdmFsdWUgb2YgZGF0ZVxuICAgICAgICAgICAgc3RhcnRJbnB1dEhhc0NoYW5nZWQ6IGZhbHNlLFxuICAgICAgICAgICAgZm9ybWF0OiBkYXRlRm9ybWF0XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHRvZ2dsZUZ1bmN0aW9uID0gdGhpcy50b2dnbGVEYXRlcGlja2VyLmJpbmQodGhpcywgbnVsbCk7XG5cbiAgICAgICAgdGhpcy5uYXR1cmFsQmluZGVycyA9IGdldEJpbmRlcnModG9nZ2xlRnVuY3Rpb24pO1xuXG4gICAgICAgIHRoaXMuZGF0ZVZpZXcgPSBSZWFjdC5jcmVhdGVSZWYoKTtcblxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5pc1JhbmdlKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlKHtcbiAgICAgICAgICAgICAgICBzdGFydERhdGU6IGNsb25lKHRoaXMuc3RhdGUuc3RhcnREYXRlLCB0aGlzLnByb3BzLnRpbWV6b25lKSxcbiAgICAgICAgICAgICAgICBlbmREYXRlOiBjbG9uZSh0aGlzLnN0YXRlLmVuZERhdGUsIHRoaXMucHJvcHMudGltZXpvbmUpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25DaGFuZ2Uoe1xuICAgICAgICAgICAgICAgIGRhdGU6IGNsb25lKHRoaXMuc3RhdGUuc3RhcnREYXRlLCB0aGlzLnByb3BzLnRpbWV6b25lKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXRWYWx1ZSgpIHtcbiAgICAgIGlmICh0aGlzLnByb3BzLmlzUmFuZ2UpIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBzdGFydERhdGU6IGNsb25lKHRoaXMuc3RhdGUuc3RhcnREYXRlLCB0aGlzLnByb3BzLnRpbWV6b25lKSxcbiAgICAgICAgICAgICAgZW5kRGF0ZTogY2xvbmUodGhpcy5zdGF0ZS5lbmREYXRlLCB0aGlzLnByb3BzLnRpbWV6b25lKVxuICAgICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGRhdGU6IGNsb25lKHRoaXMuc3RhdGUuc3RhcnREYXRlLCB0aGlzLnByb3BzLnRpbWV6b25lKVxuICAgICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXdQcm9wcykge1xuICAgICAgICAvLyBpZiB0aGUgZGF0ZSBoYXMgY2hhbmdlZCBmcm9tIHRoZSBwYXJlbnQgQU5EXG4gICAgICAgIC8vIGl0J3MgZGlmZmVyZW50IHRoYW4gdGhlIGRhdGUgd2UgaGF2ZSBpbiBzdGF0ZSwgdXNlIGl0XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICghdGhpcy5zdGF0ZS5lbmREYXRlLmlzU2FtZShuZXdQcm9wcy5kZWZhdWx0RW5kRGF0ZSlcbiAgICAgICAgICAgICYmIG5ld1Byb3BzLmRlZmF1bHRFbmREYXRlICE9PSB0aGlzLnByb3BzLmRlZmF1bHRFbmREYXRlXG4gICAgICAgICAgICAmJiAhbmV3UHJvcHMuZGVmYXVsdEVuZERhdGUuaXNTYW1lKHRoaXMucHJvcHMuZGVmYXVsdEVuZERhdGUpKVxuICAgICAgICAgICAgfHxcbiAgICAgICAgICAgICghdGhpcy5zdGF0ZS5zdGFydERhdGUuaXNTYW1lKG5ld1Byb3BzLmRlZmF1bHREYXRlKVxuICAgICAgICAgICAgJiYgIW5ld1Byb3BzLmRlZmF1bHREYXRlICE9PSB0aGlzLnByb3BzLmRlZmF1bHREYXRlXG4gICAgICAgICAgICAmJiAhbmV3UHJvcHMuZGVmYXVsdERhdGUuaXNTYW1lKHRoaXMucHJvcHMuZGVmYXVsdERhdGUpKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICBsZXQgZW5kRGF0ZSA9IG5ld1Byb3BzLmRlZmF1bHRFbmREYXRlO1xuICAgICAgICAgICAgbGV0IHN0YXJ0RGF0ZSA9IG5ld1Byb3BzLmRlZmF1bHREYXRlO1xuXG4gICAgICAgICAgICBpZiAoIXN0YXJ0RGF0ZSkge1xuICAgICAgICAgICAgICBzdGFydERhdGUgPSBtb21lbnQudHoobmV3UHJvcHMudGltZXpvbmUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc3RhcnREYXRlID0gc3RhcnREYXRlLnR6KG5ld1Byb3BzLnRpbWV6b25lKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFlbmREYXRlKSB7XG4gICAgICAgICAgICAgIGVuZERhdGUgPSBjbG9uZShzdGFydERhdGUsIG5ld1Byb3BzLnRpbWV6b25lKS5hZGQoMSwgXCJtb250aHNcIik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlbmREYXRlID0gZW5kRGF0ZS50eihuZXdQcm9wcy50aW1lem9uZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGVuZERhdGU6IGVuZERhdGUsXG4gICAgICAgICAgICAgICAgc3RhcnREYXRlOiBzdGFydERhdGUsXG4gICAgICAgICAgICAgICAgZW5kRGF0ZUlucHV0VmFsdWU6IGVuZERhdGUuZm9ybWF0KHRoaXMuc3RhdGUuZm9ybWF0KSxcbiAgICAgICAgICAgICAgICBzdGFydERhdGVJbnB1dFZhbHVlOiBzdGFydERhdGUuZm9ybWF0KHRoaXMuc3RhdGUuZm9ybWF0KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cblxuICAgIHRvZ2dsZUdsb2JhbENsaWNrQmluZGluZygpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZGF0ZXBpY2tlclZpc2libGUpIHtcbiAgICAgICAgICAgIHRoaXMubmF0dXJhbEJpbmRlcnMuYmluZCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5uYXR1cmFsQmluZGVycy51bmJpbmQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKioqIGhlbHBlcnMgKioqKi9cblxuICAgIGdldE1pbkRhdGVGb3JUeXBlKHR5cGUpIHtcbiAgICAgICAgaWYgKHR5cGUgPT09IFwic3RhcnREYXRlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLm1pbkRhdGU7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJlbmREYXRlXCIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnN0YXJ0RGF0ZS5pc0FmdGVyKHRoaXMucHJvcHMubWluRGF0ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5zdGFydERhdGU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLm1pbkRhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcInVua25vd24gdHlwZSBzZW50IHRvIGdldE1pbkRhdGVGb3JUeXBlLiB0eXBlOiBcIiArIHR5cGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0TWF4RGF0ZUZvclR5cGUodHlwZSkge1xuICAgICAgICBpZiAodHlwZSA9PT0gXCJlbmREYXRlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLm1heERhdGU7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJzdGFydERhdGVcIikge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuZW5kRGF0ZS5pc0JlZm9yZSh0aGlzLnByb3BzLm1heERhdGUpICYmIHRoaXMucHJvcHMuaXNSYW5nZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXRlLmVuZERhdGU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLm1heERhdGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBFcnJvcihcInVua25vd24gdHlwZSBzZW50IHRvIGdldE1heERhdGVGb3JUeXBlLiB0eXBlOiBcIiArIHR5cGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFsaWRhdGVEYXRlU3RyaW5nKHN0cmluZykge1xuICAgICAgLy8gYWRkIHRoZSB0aW1lem9uZSBvbnRvIHRoZSBzdHJpbmcgc28gaXQncyBwcm9wZXJseSBjb252ZXJ0ZWRcbiAgICAgIC8vIENocm9ubyByZXR1cm5zIGEgZGF0ZXRpbWUgc3RhbXAgZm9yIHZhbGlkIGRhdGVzLCBhbmQgZm9yIGludmFsaWQgZGF0ZXMsIHJldHVybnMgbnVsbFxuICAgICAgY29uc3QgZGF0ZSA9IGNocm9uby5wYXJzZURhdGUoc3RyaW5nICsgXCIgXCIgKyBtb21lbnQudHoodGhpcy5wcm9wcy50aW1lem9uZSkuZm9ybWF0KCdaJykpO1xuICAgICAgcmV0dXJuIGRhdGU7XG4gICAgfVxuXG4gICAgLyoqKiogaGFuZGxlcnMgKioqKi9cblxuICAgIHRvZ2dsZURhdGVwaWNrZXIodHlwZSwgZSkge1xuICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0ZXBpY2tlclZpc2libGU6IHR5cGVcbiAgICAgICAgfSwgdGhpcy50b2dnbGVHbG9iYWxDbGlja0JpbmRpbmcuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgb3BlbkRhdGVwaWNrZXIodHlwZSwgZSkge1xuICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0ZXBpY2tlclZpc2libGU6IHR5cGVcbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICBjbG9zZURhdGVwaWNrZXIodHlwZSwgZSkge1xuICAgICAgICBpZiAoZSkge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlID09PSBcInN0YXJ0RGF0ZVwiKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZVN0YXJ0RGF0ZVNldCgpO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IFwiZW5kRGF0ZVwiKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZUVuZERhdGVTZXQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudG9nZ2xlR2xvYmFsQ2xpY2tCaW5kaW5nKCk7XG4gICAgfVxuXG4gICAgaGFuZGxlRGF0ZVNlbGVjdGlvbih0eXBlLCBkYXRlLCBvcHRpb25zKSB7XG4gICAgICAgIHZhciBtdXRhYmxlRGF0ZSA9IGNsb25lKGRhdGUsIHRoaXMucHJvcHMudGltZXpvbmUpO1xuXG4gICAgICAgIC8vIHJvdW5kIHRvIG1ha2Ugc3VyZSBpdCdzIHNpbXBseSB0aGUgc2FtZSBkYXRlO1xuICAgICAgICBtdXRhYmxlRGF0ZS5ob3VyKDApLm1pbnV0ZSgwKS5zZWNvbmQoMCkubWlsbGlzZWNvbmQoMCk7XG4gICAgICAgIGlmIChtdXRhYmxlRGF0ZS5pc0JlZm9yZSh0aGlzLnByb3BzLm1pbkRhdGUpIHx8IG11dGFibGVEYXRlLmlzQWZ0ZXIodGhpcy5wcm9wcy5tYXhEYXRlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGUgPT09IFwiZW5kRGF0ZVwiKSB7XG4gICAgICAgICAgICBpZiAoZGF0ZS5pc1NhbWVPckJlZm9yZSh0aGlzLnN0YXRlLnN0YXJ0RGF0ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gXCJzdGFydERhdGVcIikge1xuICAgICAgICAgICAgaWYgKGRhdGUuaXNTYW1lT3JBZnRlcih0aGlzLnN0YXRlLmVuZERhdGUpICYmIHRoaXMucHJvcHMuaXNSYW5nZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBuZXdTdGF0ZSA9IHt9O1xuICAgICAgICBuZXdTdGF0ZS5kYXRlcGlja2VyVmlzaWJsZSA9IG51bGw7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMuY29sbGFwc2UgPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMuY29sbGFwc2UpIHtcbiAgICAgICAgICAgICAgICBuZXdTdGF0ZS5kYXRlcGlja2VyVmlzaWJsZSA9IHR5cGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBuZXdTdGF0ZVt0eXBlXSA9IGRhdGU7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmlucHV0RWRpdGFibGUpIHtcbiAgICAgICAgICAgIG5ld1N0YXRlW2Ake3R5cGV9SW5wdXRWYWx1ZWBdID0gZGF0ZS5mb3JtYXQodGhpcy5zdGF0ZS5mb3JtYXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZShuZXdTdGF0ZSwgdGhpcy5oYW5kbGVPbkNoYW5nZS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICBoYW5kbGVTdGFydERhdGVJbnB1dENoYW5nZShlKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgc3RhcnREYXRlSW5wdXRWYWx1ZTogZS50YXJnZXQudmFsdWUsXG4gICAgICAgICAgICBzdGFydElucHV0SGFzQ2hhbmdlZDogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVFbmREYXRlSW5wdXRDaGFuZ2UoZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGVuZERhdGVJbnB1dFZhbHVlOiBlLnRhcmdldC52YWx1ZSxcbiAgICAgICAgICAgIGVuZElucHV0SGFzQ2hhbmdlZDogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVTdGFydERhdGVLZXlQcmVzcyhlKSB7XG4gICAgICAgIGlmIChlLmtleSA9PT0gRU5URVJfS0VZKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZVN0YXJ0RGF0ZVNldCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRW5kRGF0ZUtleVByZXNzKGUpIHtcbiAgICAgICAgaWYgKGUua2V5ID09PSBFTlRFUl9LRVkpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlRW5kRGF0ZVNldCgpO1xuICAgICAgICB9XG4gICAgfVxuXG5cbiAgICBoYW5kbGVTdGFydERhdGVTZXQoKSB7XG5cbiAgICAgICAgY29uc3Qge3N0YXJ0SW5wdXRIYXNDaGFuZ2VkLCBzdGFydERhdGVJbnB1dFZhbHVlLCBmb3JtYXR9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgY29uc3Qge2VuYWJsZVRpbWUsIHRpbWV6b25lfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IGRhdGVTdHJpbmcgPSB0aGlzLnZhbGlkYXRlRGF0ZVN0cmluZyhzdGFydERhdGVJbnB1dFZhbHVlKTtcbiAgICAgICAgY29uc3Qgc3RhcnREYXRlID0gbW9tZW50KHN0YXJ0RGF0ZUlucHV0VmFsdWUsIFwiTU0vREQvWVlZWSBoaDptbSBhXCIpLnR6KHRpbWV6b25lLCB0cnVlKTtcbiAgICAgICAgY29uc3QgbWluRGF0ZSA9IHRoaXMuZ2V0TWluRGF0ZUZvclR5cGUoXCJzdGFydERhdGVcIik7XG4gICAgICAgIGNvbnN0IG1heERhdGUgPSB0aGlzLmdldE1heERhdGVGb3JUeXBlKFwic3RhcnREYXRlXCIpO1xuXG4gICAgICAgIGlmICghZW5hYmxlVGltZSkge1xuICAgICAgICAgICAgLy8gcm91bmQgdG8gbWFrZSBzdXJlIGl0J3Mgc2ltcGx5IHRoZSBzYW1lIGRhdGU7XG4gICAgICAgICAgICBzdGFydERhdGUuaG91cigwKS5taW51dGUoMCkuc2Vjb25kKDApLm1pbGxpc2Vjb25kKDApO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIGl0J3MgYSB2YWxpZCBkYXRlIHN0cmluZyBhbmQgdGhlIGRhdGUgaXMgd2l0aGluIHJhbmdlLCBzZXQgdGhlIHN0YXJ0IGRhdGUgdG8gYmUgdGhlIGlucHV0IHZhbHVlXG4gICAgICAgIGlmIChzdGFydElucHV0SGFzQ2hhbmdlZCAmJiBkYXRlU3RyaW5nICYmIHN0YXJ0RGF0ZS5pc1NhbWVPckFmdGVyKG1pbkRhdGUpICYmIHN0YXJ0RGF0ZS5pc1NhbWVPckJlZm9yZShtYXhEYXRlKSkge1xuXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBzdGFydERhdGU6IHN0YXJ0RGF0ZSxcbiAgICAgICAgICAgICAgICBzdGFydERhdGVJbnB1dFZhbHVlOiBzdGFydERhdGUuZm9ybWF0KGZvcm1hdCksXG4gICAgICAgICAgICAgICAgc3RhcnRJbnB1dEhhc0NoYW5nZWQ6IGZhbHNlXG4gICAgICAgICAgICB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVPbkNoYW5nZSgpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmRhdGVWaWV3LmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kYXRlVmlldy5jdXJyZW50LnJlc2V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBtYXliZSB3ZSBuZWVkIHRvIG1vdmUgdGhpc1xuICAgICAgICAgICAgLy8gSWYgaW52YWxpZCBkYXRlLCBzZXQgaW5wdXQgdmFsdWUgYmFjayB0byB0aGUgbGFzdCB2YWxpZGF0ZWQgZGF0ZVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgc3RhcnREYXRlSW5wdXRWYWx1ZTogdGhpcy5zdGF0ZS5zdGFydERhdGUuZm9ybWF0KGZvcm1hdClcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaGFuZGxlRW5kRGF0ZVNldCgpIHtcbiAgICAgICAgY29uc3Qge2VuZElucHV0SGFzQ2hhbmdlZCwgZW5kRGF0ZUlucHV0VmFsdWUsIGZvcm1hdH0gPSB0aGlzLnN0YXRlO1xuICAgICAgICBjb25zdCB7ZW5hYmxlVGltZSwgdGltZXpvbmV9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3QgZGF0ZVN0cmluZyA9IHRoaXMudmFsaWRhdGVEYXRlU3RyaW5nKGVuZERhdGVJbnB1dFZhbHVlKTtcbiAgICAgICAgY29uc3QgZW5kRGF0ZSA9IG1vbWVudChlbmREYXRlSW5wdXRWYWx1ZSwgXCJNTS9ERC9ZWVlZIGhoOm1tIGFcIikudHoodGltZXpvbmUsIHRydWUpO1xuICAgICAgICBjb25zdCBtaW5EYXRlID0gdGhpcy5nZXRNaW5EYXRlRm9yVHlwZShcImVuZERhdGVcIik7XG4gICAgICAgIGNvbnN0IG1heERhdGUgPSB0aGlzLmdldE1heERhdGVGb3JUeXBlKFwiZW5kRGF0ZVwiKTtcblxuXG4gICAgICAgIGlmICghZW5hYmxlVGltZSkge1xuICAgICAgICAgICAgLy8gcm91bmQgdG8gbWFrZSBzdXJlIGl0J3Mgc2ltcGx5IHRoZSBzYW1lIGRhdGU7XG4gICAgICAgICAgICBlbmREYXRlLmhvdXIoMCkubWludXRlKDApLnNlY29uZCgwKS5taWxsaXNlY29uZCgwKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiBpdCdzIGEgdmFsaWQgZGF0ZSBzdHJpbmcgYW5kIHRoZSBkYXRlIGlzIHdpdGhpbiByYW5nZSwgc2V0IHRoZSBzdGFydCBkYXRlIHRvIGJlIHRoZSBpbnB1dCB2YWx1ZVxuICAgICAgICBpZiAoZW5kSW5wdXRIYXNDaGFuZ2VkICYmIGRhdGVTdHJpbmcgJiYgZW5kRGF0ZS5pc1NhbWVPckFmdGVyKG1pbkRhdGUpICYmIGVuZERhdGUuaXNTYW1lT3JCZWZvcmUobWF4RGF0ZSkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGVuZERhdGU6IGVuZERhdGUsXG4gICAgICAgICAgICAgICAgZW5kRGF0ZUlucHV0VmFsdWU6IGVuZERhdGUuZm9ybWF0KGZvcm1hdCksXG4gICAgICAgICAgICAgICAgZW5kSW5wdXRIYXNDaGFuZ2VkOiBmYWxzZVxuICAgICAgICAgICAgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlT25DaGFuZ2UoKTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kYXRlVmlldy5jdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0ZVZpZXcuY3VycmVudC5yZXNldCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gSWYgaW52YWxpZCBkYXRlLCBzZXQgaW5wdXQgdmFsdWUgYmFjayB0byB0aGUgbGFzdCB2YWxpZGF0ZWQgZGF0ZVxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgZW5kRGF0ZUlucHV0VmFsdWU6IHRoaXMuc3RhdGUuZW5kRGF0ZS5mb3JtYXQoZm9ybWF0KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVPbkNoYW5nZSgpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaXNSYW5nZSkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh7XG4gICAgICAgICAgICAgICAgc3RhcnREYXRlOiB0aGlzLnN0YXRlLnN0YXJ0RGF0ZSxcbiAgICAgICAgICAgICAgICBlbmREYXRlOiB0aGlzLnN0YXRlLmVuZERhdGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh7XG4gICAgICAgICAgICAgICAgZGF0ZTogdGhpcy5zdGF0ZS5zdGFydERhdGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50b2dnbGVHbG9iYWxDbGlja0JpbmRpbmcoKTtcblxuICAgIH1cblxuICAgIC8qKioqIHJlbmRlciBtZXRob2RzICoqKiovXG5cbiAgICByZW5kZXJEYXRlcGlja2VyKHR5cGUpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZGF0ZXBpY2tlclZpc2libGUgPT09IHR5cGUpIHtcbiAgICAgICAgICAgIHJldHVybiA8RGF0ZVZpZXdcbiAgICAgICAgICAgICAgICByZWY9e3RoaXMuZGF0ZVZpZXd9XG4gICAgICAgICAgICAgICAgZW5hYmxlVGltZT17dGhpcy5wcm9wcy5lbmFibGVUaW1lfVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkRGF0ZT17Y2xvbmUodGhpcy5zdGF0ZVt0eXBlXSwgdGhpcy5wcm9wcy50aW1lem9uZSl9XG4gICAgICAgICAgICAgICAgdGltZXpvbmU9e3RoaXMucHJvcHMudGltZXpvbmV9XG4gICAgICAgICAgICAgICAgbWF4RGF0ZT17dGhpcy5nZXRNYXhEYXRlRm9yVHlwZSh0eXBlKX1cbiAgICAgICAgICAgICAgICBtaW5EYXRlPXt0aGlzLmdldE1pbkRhdGVGb3JUeXBlKHR5cGUpfVxuICAgICAgICAgICAgICAgIGhhbmRsZVNlbGVjdGlvbj17dGhpcy5oYW5kbGVEYXRlU2VsZWN0aW9uLmJpbmQodGhpcywgdHlwZSl9IC8+O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB2YXIgZW5kRGF0ZURhdGVwaWNrZXIgPSBudWxsLCBkaXZpZGVyID0gbnVsbCwgc3R5bGVzID0ge307XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5wdXRXaWR0aCkge1xuICAgICAgICAgICAgc3R5bGVzLndpZHRoID0gdGhpcy5wcm9wcy5pbnB1dFdpZHRoICsgXCJweFwiO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcHMuZW5hYmxlVGltZSkge1xuICAgICAgICAgICAgc3R5bGVzLndpZHRoID0gXCIxNjVweFwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3R5bGVzLndpZHRoID0gXCIxMTVweFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaXNSYW5nZSkge1xuICAgICAgICAgICAgY29uc3QgZW5kRGF0ZVZhbHVlID0gdGhpcy5wcm9wcy5pbnB1dEVkaXRhYmxlID8gdGhpcy5zdGF0ZS5lbmREYXRlSW5wdXRWYWx1ZSA6IHRoaXMuc3RhdGUuZW5kRGF0ZS5mb3JtYXQodGhpcy5zdGF0ZS5mb3JtYXQpO1xuICAgICAgICAgICAgZW5kRGF0ZURhdGVwaWNrZXIgPSAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkYXRlcGlja2VyLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1jYWxlbmRhclwiPjwvaT5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHN0eWxlPXtzdHlsZXN9XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJkYXRlcGlja2VyLWlucHV0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlYWRPbmx5PXshdGhpcy5wcm9wcy5pbnB1dEVkaXRhYmxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2VuZERhdGVWYWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcblxuICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlRW5kRGF0ZUlucHV0Q2hhbmdlLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMuY2xvc2VEYXRlcGlja2VyLmJpbmQodGhpcywgXCJlbmREYXRlXCIpfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25Gb2N1cz17dGhpcy5vcGVuRGF0ZXBpY2tlci5iaW5kKHRoaXMsIFwiZW5kRGF0ZVwiKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uS2V5UHJlc3M9e3RoaXMuaGFuZGxlRW5kRGF0ZUtleVByZXNzLmJpbmQodGhpcyl9IC8+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckRhdGVwaWNrZXIoXCJlbmREYXRlXCIpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGRpdmlkZXIgPSA8c3BhbiBjbGFzc05hbWU9XCJkYXRlcGlja2VyLWRpdmlkZXJcIj4tPC9zcGFuPjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdGFydERhdGVWYWx1ZSA9IHRoaXMucHJvcHMuaW5wdXRFZGl0YWJsZSA/IHRoaXMuc3RhdGUuc3RhcnREYXRlSW5wdXRWYWx1ZSA6IHRoaXMuc3RhdGUuc3RhcnREYXRlLmZvcm1hdCh0aGlzLnN0YXRlLmZvcm1hdCk7XG5cbiAgICAgICAgdmFyIGNvbnRlbnQgPSAoXG4gICAgICAgICAgICA8ZGl2IG9uQ2xpY2s9e3N0b3BCdWJibGV9IGNsYXNzTmFtZT1cImRhdGVwaWNrZXItd3JhcHBlclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZGF0ZXBpY2tlci1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtY2FsZW5kYXJcIj48L2k+XG4gICAgICAgICAgICAgICAgICAgIDxpbnB1dCBzdHlsZT17c3R5bGVzfVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZGF0ZXBpY2tlci1pbnB1dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IXRoaXMucHJvcHMuaW5wdXRFZGl0YWJsZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtzdGFydERhdGVWYWx1ZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQmx1cj17dGhpcy5jbG9zZURhdGVwaWNrZXIuYmluZCh0aGlzLCBcInN0YXJ0RGF0ZVwiKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMub3BlbkRhdGVwaWNrZXIuYmluZCh0aGlzLCBcInN0YXJ0RGF0ZVwiKX1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZVN0YXJ0RGF0ZUlucHV0Q2hhbmdlLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICBvbktleVByZXNzPXt0aGlzLmhhbmRsZVN0YXJ0RGF0ZUtleVByZXNzLmJpbmQodGhpcyl9IC8+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckRhdGVwaWNrZXIoXCJzdGFydERhdGVcIil9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAge2RpdmlkZXJ9XG4gICAgICAgICAgICAgICAge2VuZERhdGVEYXRlcGlja2VyfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH1cbn1cblxuZnVuY3Rpb24gc3RvcEJ1YmJsZShlKSB7XG4gICAgZS5uYXRpdmVFdmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbn1cblxuZnVuY3Rpb24gZ2V0QmluZGVycyhjYWxsYmFjaykge1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYmluZDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBjYWxsYmFjaywgZmFsc2UpO1xuICAgICAgICB9LFxuXG4gICAgICAgIHVuYmluZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgY2FsbGJhY2ssIGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIG5vb3AoZGF0YSkge1xuICAgIGNvbnNvbGUubG9nKFwiY2hhbmdpbmdcIiwgZGF0YSk7XG59XG5cbmZ1bmN0aW9uIGNsb25lKG0sIHR6KSB7XG4gIHJldHVybiBtb21lbnQudHoobS52YWx1ZU9mKCksIHR6KTtcbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IERhdGVQaWNrZXI7XG4iXX0=
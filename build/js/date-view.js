"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _monthView = _interopRequireDefault(require("./month-view"));

var _classnames = _interopRequireDefault(require("classnames"));

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

var DEFAULT_HOUR_VAL = 12;
var DEFAULT_MINUTE_VAL = 0;

var DatePicker = /*#__PURE__*/function (_React$Component) {
  _inherits(DatePicker, _React$Component);

  var _super = _createSuper(DatePicker);

  function DatePicker(props) {
    var _this;

    _classCallCheck(this, DatePicker);

    _this = _super.call(this, props);
    _this.state = {
      date: _this.props.selectedDate,
      timepickerVisible: false
    };
    return _this;
  }

  _createClass(DatePicker, [{
    key: "reset",
    value: function reset() {
      this.setState({
        date: this.props.selectedDate
      });
    }
  }, {
    key: "shiftDate",
    value: function shiftDate(direction) {
      var date = this.state.date.clone();

      if (direction === "back") {
        date = date.subtract(1, "months");
      } else {
        date = date.add(1, "months");
      }

      this.setState({
        date: date
      });
    }
  }, {
    key: "getMinute",
    value: function getMinute() {
      var minute = this.state.date.minute();

      if (isNaN(minute)) {
        minute = DEFAULT_MINUTE_VAL;
      }

      if (minute < 10) {
        minute = "0" + minute;
      }

      return minute;
    }
  }, {
    key: "getHour",
    value: function getHour() {
      var hour = this.state.date.hour();

      if (isNaN(hour)) {
        hour = DEFAULT_HOUR_VAL;
      }

      if (hour > 12) {
        hour = hour - 12;
      }

      if (hour === 0) {
        hour = 12;
      }

      return hour;
    }
  }, {
    key: "getAmPm",
    value: function getAmPm() {
      return this.state.date.format("a");
    }
  }, {
    key: "handleSelection",
    value: function handleSelection(date, options) {
      date.hour(this.state.date.hour());
      date.minute(this.state.date.minute());
      this.props.handleSelection(date, options);
    }
  }, {
    key: "handleHourChange",
    value: function handleHourChange() {
      var date = this.state.date;
      var hourVal = parseInt(this.hour.value);
      var value = DEFAULT_HOUR_VAL;

      if (!isNaN(hourVal)) {
        value = hourVal;
      }

      if (this.getAmPm() === "pm") {
        value += 12;
      }

      date.hour(value);
      this.setState({
        date: date
      });
    }
  }, {
    key: "handleMinuteChange",
    value: function handleMinuteChange() {
      var date = this.state.date;
      var minuteVal = parseInt(this.minute.value);
      var value = DEFAULT_MINUTE_VAL;

      if (!isNaN(minuteVal)) {
        value = minuteVal;
      }

      date.minute(value);
      this.setState({
        date: date
      });
    }
  }, {
    key: "handleAmPmChange",
    value: function handleAmPmChange() {
      var currentValue = this.getAmPm(),
          changedValue = this.ampm.value,
          hour = this.state.date.hour();

      if (currentValue != changedValue) {
        if (changedValue === "am" && hour >= 12) {
          hour -= 12;
        } else if (changedValue === "pm" && hour < 12) {
          hour += 12;
        }

        var date = this.state.date;
        date.hour(hour);
        this.setState({
          date: date
        });
      }
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(e) {
      var key = e.which || e.keyCode,
          wasEnter = key === 13;

      if (wasEnter) {
        this.toggleTimepicker();
      }
    }
  }, {
    key: "toggleTimepicker",
    value: function toggleTimepicker() {
      this.setState({
        timepickerVisible: !this.state.timepickerVisible
      }, function () {
        if (!this.state.timepickerVisible) {
          this.handleSelection(this.state.date, {
            collapse: false
          });
        }
      }.bind(this));
    }
  }, {
    key: "renderArrow",
    value: function renderArrow(direction) {
      var classes = "month-switcher " + direction,
          content;

      if (this.props.ignoreFontAwesome) {
        if (direction === "back") {
          content = /*#__PURE__*/_react["default"].createElement("span", null, "\u2039");
        } else {
          content = /*#__PURE__*/_react["default"].createElement("span", null, "\u203A");
        }
      } else {
        var styles = {
          fontSize: "13px"
        };

        if (direction === "back") {
          content = /*#__PURE__*/_react["default"].createElement("i", {
            style: styles,
            className: "fa fa-chevron-left"
          });
        } else {
          content = /*#__PURE__*/_react["default"].createElement("i", {
            style: styles,
            className: "fa fa-chevron-right"
          });
        }
      }

      return /*#__PURE__*/_react["default"].createElement("span", {
        onClick: this.shiftDate.bind(this, direction),
        className: classes
      }, content);
    }
  }, {
    key: "renderDayLetters",
    value: function renderDayLetters() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "datepicker-day-headers"
      }, /*#__PURE__*/_react["default"].createElement("span", null, "SUN"), /*#__PURE__*/_react["default"].createElement("span", null, "MON"), /*#__PURE__*/_react["default"].createElement("span", null, "TUE"), /*#__PURE__*/_react["default"].createElement("span", null, "WED"), /*#__PURE__*/_react["default"].createElement("span", null, "THU"), /*#__PURE__*/_react["default"].createElement("span", null, "FRI"), /*#__PURE__*/_react["default"].createElement("span", null, "SAT"));
    }
  }, {
    key: "renderTimePickerHeaderContent",
    value: function renderTimePickerHeaderContent() {
      var content = /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("i", {
        className: "fa fa-clock-o"
      }), /*#__PURE__*/_react["default"].createElement("span", {
        className: "header-time"
      }, this.getHour(), ":", this.getMinute(), "\xA0", this.getAmPm()));

      if (this.state.timepickerVisible) {
        content = /*#__PURE__*/_react["default"].createElement("span", null, "done");
      }

      return content;
    }
  }, {
    key: "renderTimePicker",
    value: function renderTimePicker() {
      var _this2 = this;

      if (!this.props.enableTime) {
        return;
      }

      var classes = (0, _classnames["default"])("datepicker-timepicker", {
        "visible": this.state.timepickerVisible
      });
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: classes
      }, /*#__PURE__*/_react["default"].createElement("div", {
        onClick: this.toggleTimepicker.bind(this),
        className: "datepicker-timepicker-header"
      }, this.renderTimePickerHeaderContent()), /*#__PURE__*/_react["default"].createElement("div", {
        className: "timepicker-inputs"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: "input-row"
      }, /*#__PURE__*/_react["default"].createElement("input", {
        className: "input-hours",
        ref: function ref(h) {
          _this2.hour = h;
        },
        value: this.getHour(),
        type: "number",
        min: 1,
        max: 12,
        maxLength: 2,
        onChange: this.handleHourChange.bind(this),
        onKeyDown: this.handleKeyDown.bind(this),
        tabIndex: "-1"
      }), ":", /*#__PURE__*/_react["default"].createElement("input", {
        className: "input-minutes",
        ref: function ref(m) {
          _this2.minute = m;
        },
        value: this.getMinute(),
        type: "number",
        min: 0,
        max: 59,
        maxLength: 2,
        onChange: this.handleMinuteChange.bind(this),
        onKeyDown: this.handleKeyDown.bind(this),
        tabIndex: "-1"
      }), /*#__PURE__*/_react["default"].createElement("select", {
        className: "ampm-picker ignore-chosen",
        ref: function ref(ampm) {
          _this2.ampm = ampm;
        },
        value: this.getAmPm(),
        onChange: this.handleAmPmChange.bind(this),
        tabIndex: "-1"
      }, /*#__PURE__*/_react["default"].createElement("option", {
        value: "am"
      }, "AM"), /*#__PURE__*/_react["default"].createElement("option", {
        value: "pm"
      }, "PM")))));
    }
  }, {
    key: "render",
    value: function render() {
      var classes = (0, _classnames["default"])("datepicker", {
        "time-enabled": this.props.enableTime
      });
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: classes
      }, /*#__PURE__*/_react["default"].createElement("h3", null, this.renderArrow("back"), /*#__PURE__*/_react["default"].createElement("span", null, this.state.date.format("MMMM YYYY")), this.renderArrow("forward")), this.renderDayLetters(), /*#__PURE__*/_react["default"].createElement(_monthView["default"], {
        timezone: this.props.timezone,
        selectedDate: this.props.selectedDate,
        minDate: this.props.minDate,
        maxDate: this.props.maxDate,
        handleSelection: this.handleSelection.bind(this),
        date: this.state.date
      }), this.renderTimePicker());
    }
  }]);

  return DatePicker;
}(_react["default"].Component);

_defineProperty(DatePicker, "propTypes", {
  minDate: _propTypes["default"].instanceOf(_momentTimezone["default"]),
  maxDate: _propTypes["default"].instanceOf(_momentTimezone["default"]),
  selectedDate: _propTypes["default"].instanceOf(_momentTimezone["default"]),
  // todo validate that it's between min and max
  enableTime: _propTypes["default"].bool
});

module.exports = DatePicker;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9qcy9kYXRlLXZpZXcuanN4Il0sIm5hbWVzIjpbIkRFRkFVTFRfSE9VUl9WQUwiLCJERUZBVUxUX01JTlVURV9WQUwiLCJEYXRlUGlja2VyIiwicHJvcHMiLCJzdGF0ZSIsImRhdGUiLCJzZWxlY3RlZERhdGUiLCJ0aW1lcGlja2VyVmlzaWJsZSIsInNldFN0YXRlIiwiZGlyZWN0aW9uIiwiY2xvbmUiLCJzdWJ0cmFjdCIsImFkZCIsIm1pbnV0ZSIsImlzTmFOIiwiaG91ciIsImZvcm1hdCIsIm9wdGlvbnMiLCJoYW5kbGVTZWxlY3Rpb24iLCJob3VyVmFsIiwicGFyc2VJbnQiLCJ2YWx1ZSIsImdldEFtUG0iLCJtaW51dGVWYWwiLCJjdXJyZW50VmFsdWUiLCJjaGFuZ2VkVmFsdWUiLCJhbXBtIiwiZSIsImtleSIsIndoaWNoIiwia2V5Q29kZSIsIndhc0VudGVyIiwidG9nZ2xlVGltZXBpY2tlciIsImNvbGxhcHNlIiwiYmluZCIsImNsYXNzZXMiLCJjb250ZW50IiwiaWdub3JlRm9udEF3ZXNvbWUiLCJzdHlsZXMiLCJmb250U2l6ZSIsInNoaWZ0RGF0ZSIsImdldEhvdXIiLCJnZXRNaW51dGUiLCJlbmFibGVUaW1lIiwicmVuZGVyVGltZVBpY2tlckhlYWRlckNvbnRlbnQiLCJoIiwiaGFuZGxlSG91ckNoYW5nZSIsImhhbmRsZUtleURvd24iLCJtIiwiaGFuZGxlTWludXRlQ2hhbmdlIiwiaGFuZGxlQW1QbUNoYW5nZSIsInJlbmRlckFycm93IiwicmVuZGVyRGF5TGV0dGVycyIsInRpbWV6b25lIiwibWluRGF0ZSIsIm1heERhdGUiLCJyZW5kZXJUaW1lUGlja2VyIiwiUmVhY3QiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJpbnN0YW5jZU9mIiwibW9tZW50IiwiYm9vbCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQSxJQUFNQSxnQkFBZ0IsR0FBRyxFQUF6QjtBQUNBLElBQU1DLGtCQUFrQixHQUFHLENBQTNCOztJQUVNQyxVOzs7OztBQVNGLHNCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUE7O0FBQ2YsOEJBQU1BLEtBQU47QUFDQSxVQUFLQyxLQUFMLEdBQWE7QUFDVEMsTUFBQUEsSUFBSSxFQUFFLE1BQUtGLEtBQUwsQ0FBV0csWUFEUjtBQUVUQyxNQUFBQSxpQkFBaUIsRUFBRTtBQUZWLEtBQWI7QUFGZTtBQU1sQjs7Ozs0QkFFTztBQUNOLFdBQUtDLFFBQUwsQ0FBYztBQUNaSCxRQUFBQSxJQUFJLEVBQUUsS0FBS0YsS0FBTCxDQUFXRztBQURMLE9BQWQ7QUFHRDs7OzhCQUVTRyxTLEVBQVc7QUFDakIsVUFBSUosSUFBSSxHQUFHLEtBQUtELEtBQUwsQ0FBV0MsSUFBWCxDQUFnQkssS0FBaEIsRUFBWDs7QUFDQSxVQUFHRCxTQUFTLEtBQUssTUFBakIsRUFBeUI7QUFDckJKLFFBQUFBLElBQUksR0FBR0EsSUFBSSxDQUFDTSxRQUFMLENBQWMsQ0FBZCxFQUFpQixRQUFqQixDQUFQO0FBQ0gsT0FGRCxNQUVPO0FBQ0hOLFFBQUFBLElBQUksR0FBR0EsSUFBSSxDQUFDTyxHQUFMLENBQVMsQ0FBVCxFQUFZLFFBQVosQ0FBUDtBQUNIOztBQUVELFdBQUtKLFFBQUwsQ0FBYztBQUNWSCxRQUFBQSxJQUFJLEVBQUVBO0FBREksT0FBZDtBQUdIOzs7Z0NBRVc7QUFDUixVQUFJUSxNQUFNLEdBQUcsS0FBS1QsS0FBTCxDQUFXQyxJQUFYLENBQWdCUSxNQUFoQixFQUFiOztBQUNBLFVBQUlDLEtBQUssQ0FBQ0QsTUFBRCxDQUFULEVBQW1CO0FBQ2ZBLFFBQUFBLE1BQU0sR0FBR1osa0JBQVQ7QUFDSDs7QUFFRCxVQUFHWSxNQUFNLEdBQUcsRUFBWixFQUFnQjtBQUNaQSxRQUFBQSxNQUFNLEdBQUcsTUFBTUEsTUFBZjtBQUNIOztBQUVELGFBQU9BLE1BQVA7QUFDSDs7OzhCQUVTO0FBQ04sVUFBSUUsSUFBSSxHQUFHLEtBQUtYLEtBQUwsQ0FBV0MsSUFBWCxDQUFnQlUsSUFBaEIsRUFBWDs7QUFDQSxVQUFJRCxLQUFLLENBQUNDLElBQUQsQ0FBVCxFQUFpQjtBQUNiQSxRQUFBQSxJQUFJLEdBQUdmLGdCQUFQO0FBQ0g7O0FBQ0QsVUFBR2UsSUFBSSxHQUFHLEVBQVYsRUFBYztBQUNWQSxRQUFBQSxJQUFJLEdBQUdBLElBQUksR0FBRyxFQUFkO0FBQ0g7O0FBRUQsVUFBR0EsSUFBSSxLQUFLLENBQVosRUFBZTtBQUNYQSxRQUFBQSxJQUFJLEdBQUcsRUFBUDtBQUNIOztBQUVELGFBQU9BLElBQVA7QUFDSDs7OzhCQUVTO0FBQ04sYUFBTyxLQUFLWCxLQUFMLENBQVdDLElBQVgsQ0FBZ0JXLE1BQWhCLENBQXVCLEdBQXZCLENBQVA7QUFDSDs7O29DQUVlWCxJLEVBQU1ZLE8sRUFBUztBQUMzQlosTUFBQUEsSUFBSSxDQUFDVSxJQUFMLENBQVUsS0FBS1gsS0FBTCxDQUFXQyxJQUFYLENBQWdCVSxJQUFoQixFQUFWO0FBQ0FWLE1BQUFBLElBQUksQ0FBQ1EsTUFBTCxDQUFZLEtBQUtULEtBQUwsQ0FBV0MsSUFBWCxDQUFnQlEsTUFBaEIsRUFBWjtBQUNBLFdBQUtWLEtBQUwsQ0FBV2UsZUFBWCxDQUEyQmIsSUFBM0IsRUFBaUNZLE9BQWpDO0FBQ0g7Ozt1Q0FFa0I7QUFDZixVQUFJWixJQUFJLEdBQUcsS0FBS0QsS0FBTCxDQUFXQyxJQUF0QjtBQUNBLFVBQU1jLE9BQU8sR0FBR0MsUUFBUSxDQUFDLEtBQUtMLElBQUwsQ0FBVU0sS0FBWCxDQUF4QjtBQUNBLFVBQUlBLEtBQUssR0FBR3JCLGdCQUFaOztBQUVBLFVBQUksQ0FBQ2MsS0FBSyxDQUFDSyxPQUFELENBQVYsRUFBcUI7QUFDakJFLFFBQUFBLEtBQUssR0FBR0YsT0FBUjtBQUNIOztBQUVELFVBQUcsS0FBS0csT0FBTCxPQUFtQixJQUF0QixFQUE0QjtBQUN4QkQsUUFBQUEsS0FBSyxJQUFJLEVBQVQ7QUFDSDs7QUFFRGhCLE1BQUFBLElBQUksQ0FBQ1UsSUFBTCxDQUFVTSxLQUFWO0FBRUEsV0FBS2IsUUFBTCxDQUFjO0FBQ1ZILFFBQUFBLElBQUksRUFBRUE7QUFESSxPQUFkO0FBR0g7Ozt5Q0FFb0I7QUFDakIsVUFBSUEsSUFBSSxHQUFHLEtBQUtELEtBQUwsQ0FBV0MsSUFBdEI7QUFDQSxVQUFNa0IsU0FBUyxHQUFHSCxRQUFRLENBQUMsS0FBS1AsTUFBTCxDQUFZUSxLQUFiLENBQTFCO0FBQ0EsVUFBSUEsS0FBSyxHQUFHcEIsa0JBQVo7O0FBRUEsVUFBSSxDQUFDYSxLQUFLLENBQUNTLFNBQUQsQ0FBVixFQUF1QjtBQUNuQkYsUUFBQUEsS0FBSyxHQUFHRSxTQUFSO0FBQ0g7O0FBRURsQixNQUFBQSxJQUFJLENBQUNRLE1BQUwsQ0FBWVEsS0FBWjtBQUVBLFdBQUtiLFFBQUwsQ0FBYztBQUNWSCxRQUFBQSxJQUFJLEVBQUVBO0FBREksT0FBZDtBQUdIOzs7dUNBRWtCO0FBQ2YsVUFBSW1CLFlBQVksR0FBRyxLQUFLRixPQUFMLEVBQW5CO0FBQUEsVUFDSUcsWUFBWSxHQUFHLEtBQUtDLElBQUwsQ0FBVUwsS0FEN0I7QUFBQSxVQUVJTixJQUFJLEdBQUcsS0FBS1gsS0FBTCxDQUFXQyxJQUFYLENBQWdCVSxJQUFoQixFQUZYOztBQUlBLFVBQUdTLFlBQVksSUFBSUMsWUFBbkIsRUFBaUM7QUFDN0IsWUFBR0EsWUFBWSxLQUFLLElBQWpCLElBQXlCVixJQUFJLElBQUksRUFBcEMsRUFBd0M7QUFDcENBLFVBQUFBLElBQUksSUFBSSxFQUFSO0FBQ0gsU0FGRCxNQUVPLElBQUdVLFlBQVksS0FBSyxJQUFqQixJQUF5QlYsSUFBSSxHQUFHLEVBQW5DLEVBQXVDO0FBQzFDQSxVQUFBQSxJQUFJLElBQUksRUFBUjtBQUNIOztBQUVELFlBQUlWLElBQUksR0FBRyxLQUFLRCxLQUFMLENBQVdDLElBQXRCO0FBQ0FBLFFBQUFBLElBQUksQ0FBQ1UsSUFBTCxDQUFVQSxJQUFWO0FBRUEsYUFBS1AsUUFBTCxDQUFjO0FBQ1ZILFVBQUFBLElBQUksRUFBRUE7QUFESSxTQUFkO0FBR0g7QUFDSjs7O2tDQUVhc0IsQyxFQUFHO0FBQ2IsVUFBSUMsR0FBRyxHQUFHRCxDQUFDLENBQUNFLEtBQUYsSUFBV0YsQ0FBQyxDQUFDRyxPQUF2QjtBQUFBLFVBQ0lDLFFBQVEsR0FBR0gsR0FBRyxLQUFLLEVBRHZCOztBQUdBLFVBQUdHLFFBQUgsRUFBYTtBQUNULGFBQUtDLGdCQUFMO0FBQ0g7QUFDSjs7O3VDQUVrQjtBQUNmLFdBQUt4QixRQUFMLENBQWM7QUFDVkQsUUFBQUEsaUJBQWlCLEVBQUUsQ0FBQyxLQUFLSCxLQUFMLENBQVdHO0FBRHJCLE9BQWQsRUFFRyxZQUFXO0FBQ1YsWUFBRyxDQUFDLEtBQUtILEtBQUwsQ0FBV0csaUJBQWYsRUFBa0M7QUFDOUIsZUFBS1csZUFBTCxDQUFxQixLQUFLZCxLQUFMLENBQVdDLElBQWhDLEVBQXNDO0FBQ2xDNEIsWUFBQUEsUUFBUSxFQUFFO0FBRHdCLFdBQXRDO0FBR0g7QUFFSixPQVBFLENBT0RDLElBUEMsQ0FPSSxJQVBKLENBRkg7QUFVSDs7O2dDQUVXekIsUyxFQUFXO0FBQ25CLFVBQUkwQixPQUFPLEdBQUcsb0JBQW9CMUIsU0FBbEM7QUFBQSxVQUE2QzJCLE9BQTdDOztBQUNBLFVBQUcsS0FBS2pDLEtBQUwsQ0FBV2tDLGlCQUFkLEVBQWlDO0FBQzdCLFlBQUc1QixTQUFTLEtBQUssTUFBakIsRUFBeUI7QUFDckIyQixVQUFBQSxPQUFPLGdCQUFHLHVEQUFWO0FBQ0gsU0FGRCxNQUVPO0FBQ0hBLFVBQUFBLE9BQU8sZ0JBQUcsdURBQVY7QUFDSDtBQUVKLE9BUEQsTUFPTztBQUNILFlBQUlFLE1BQU0sR0FBRztBQUNUQyxVQUFBQSxRQUFRLEVBQUU7QUFERCxTQUFiOztBQUdBLFlBQUc5QixTQUFTLEtBQUssTUFBakIsRUFBeUI7QUFDckIyQixVQUFBQSxPQUFPLGdCQUFHO0FBQUcsWUFBQSxLQUFLLEVBQUVFLE1BQVY7QUFBa0IsWUFBQSxTQUFTLEVBQUM7QUFBNUIsWUFBVjtBQUNILFNBRkQsTUFFTztBQUNIRixVQUFBQSxPQUFPLGdCQUFHO0FBQUcsWUFBQSxLQUFLLEVBQUVFLE1BQVY7QUFBa0IsWUFBQSxTQUFTLEVBQUM7QUFBNUIsWUFBVjtBQUNIO0FBQ0o7O0FBRUQsMEJBQU87QUFBTSxRQUFBLE9BQU8sRUFBRSxLQUFLRSxTQUFMLENBQWVOLElBQWYsQ0FBb0IsSUFBcEIsRUFBMEJ6QixTQUExQixDQUFmO0FBQXFELFFBQUEsU0FBUyxFQUFFMEI7QUFBaEUsU0FBMEVDLE9BQTFFLENBQVA7QUFDSDs7O3VDQUVrQjtBQUNmLDBCQUNJO0FBQUssUUFBQSxTQUFTLEVBQUM7QUFBZixzQkFDSSxvREFESixlQUVJLG9EQUZKLGVBR0ksb0RBSEosZUFJSSxvREFKSixlQUtJLG9EQUxKLGVBTUksb0RBTkosZUFPSSxvREFQSixDQURKO0FBV0g7OztvREFFK0I7QUFDNUIsVUFBSUEsT0FBTyxnQkFDUCwyREFDSTtBQUFHLFFBQUEsU0FBUyxFQUFDO0FBQWIsUUFESixlQUVJO0FBQU0sUUFBQSxTQUFTLEVBQUM7QUFBaEIsU0FDSyxLQUFLSyxPQUFMLEVBREwsT0FDc0IsS0FBS0MsU0FBTCxFQUR0QixVQUM4QyxLQUFLcEIsT0FBTCxFQUQ5QyxDQUZKLENBREo7O0FBU0EsVUFBRyxLQUFLbEIsS0FBTCxDQUFXRyxpQkFBZCxFQUFpQztBQUM3QjZCLFFBQUFBLE9BQU8sZ0JBQUcscURBQVY7QUFDSDs7QUFFRCxhQUFPQSxPQUFQO0FBQ0g7Ozt1Q0FFa0I7QUFBQTs7QUFDZixVQUFHLENBQUMsS0FBS2pDLEtBQUwsQ0FBV3dDLFVBQWYsRUFBMkI7QUFBRTtBQUFTOztBQUV0QyxVQUFJUixPQUFPLEdBQUcsNEJBQVcsdUJBQVgsRUFBb0M7QUFDOUMsbUJBQVcsS0FBSy9CLEtBQUwsQ0FBV0c7QUFEd0IsT0FBcEMsQ0FBZDtBQUlBLDBCQUNJO0FBQUssUUFBQSxTQUFTLEVBQUU0QjtBQUFoQixzQkFDSTtBQUFLLFFBQUEsT0FBTyxFQUFFLEtBQUtILGdCQUFMLENBQXNCRSxJQUF0QixDQUEyQixJQUEzQixDQUFkO0FBQWdELFFBQUEsU0FBUyxFQUFDO0FBQTFELFNBQ0ssS0FBS1UsNkJBQUwsRUFETCxDQURKLGVBSUk7QUFBSyxRQUFBLFNBQVMsRUFBQztBQUFmLHNCQUNJO0FBQUssUUFBQSxTQUFTLEVBQUM7QUFBZixzQkFDSTtBQUFPLFFBQUEsU0FBUyxFQUFDLGFBQWpCO0FBQ08sUUFBQSxHQUFHLEVBQUUsYUFBQ0MsQ0FBRCxFQUFPO0FBQUUsVUFBQSxNQUFJLENBQUM5QixJQUFMLEdBQVk4QixDQUFaO0FBQWdCLFNBRHJDO0FBRU8sUUFBQSxLQUFLLEVBQUUsS0FBS0osT0FBTCxFQUZkO0FBR08sUUFBQSxJQUFJLEVBQUMsUUFIWjtBQUlPLFFBQUEsR0FBRyxFQUFFLENBSlo7QUFLTyxRQUFBLEdBQUcsRUFBRSxFQUxaO0FBTU8sUUFBQSxTQUFTLEVBQUUsQ0FObEI7QUFPTyxRQUFBLFFBQVEsRUFBRSxLQUFLSyxnQkFBTCxDQUFzQlosSUFBdEIsQ0FBMkIsSUFBM0IsQ0FQakI7QUFRTyxRQUFBLFNBQVMsRUFBRSxLQUFLYSxhQUFMLENBQW1CYixJQUFuQixDQUF3QixJQUF4QixDQVJsQjtBQVNPLFFBQUEsUUFBUSxFQUFDO0FBVGhCLFFBREosb0JBV0k7QUFBTyxRQUFBLFNBQVMsRUFBQyxlQUFqQjtBQUNPLFFBQUEsR0FBRyxFQUFFLGFBQUNjLENBQUQsRUFBTztBQUFFLFVBQUEsTUFBSSxDQUFDbkMsTUFBTCxHQUFjbUMsQ0FBZDtBQUFrQixTQUR2QztBQUVPLFFBQUEsS0FBSyxFQUFFLEtBQUtOLFNBQUwsRUFGZDtBQUdPLFFBQUEsSUFBSSxFQUFDLFFBSFo7QUFJTyxRQUFBLEdBQUcsRUFBRSxDQUpaO0FBS08sUUFBQSxHQUFHLEVBQUUsRUFMWjtBQU1PLFFBQUEsU0FBUyxFQUFFLENBTmxCO0FBT08sUUFBQSxRQUFRLEVBQUUsS0FBS08sa0JBQUwsQ0FBd0JmLElBQXhCLENBQTZCLElBQTdCLENBUGpCO0FBUU8sUUFBQSxTQUFTLEVBQUUsS0FBS2EsYUFBTCxDQUFtQmIsSUFBbkIsQ0FBd0IsSUFBeEIsQ0FSbEI7QUFTTyxRQUFBLFFBQVEsRUFBQztBQVRoQixRQVhKLGVBcUJJO0FBQVEsUUFBQSxTQUFTLEVBQUMsMkJBQWxCO0FBQ1EsUUFBQSxHQUFHLEVBQUUsYUFBQ1IsSUFBRCxFQUFVO0FBQUUsVUFBQSxNQUFJLENBQUNBLElBQUwsR0FBWUEsSUFBWjtBQUFtQixTQUQ1QztBQUVRLFFBQUEsS0FBSyxFQUFFLEtBQUtKLE9BQUwsRUFGZjtBQUdRLFFBQUEsUUFBUSxFQUFFLEtBQUs0QixnQkFBTCxDQUFzQmhCLElBQXRCLENBQTJCLElBQTNCLENBSGxCO0FBSVEsUUFBQSxRQUFRLEVBQUM7QUFKakIsc0JBS0k7QUFBUSxRQUFBLEtBQUssRUFBQztBQUFkLGNBTEosZUFNSTtBQUFRLFFBQUEsS0FBSyxFQUFDO0FBQWQsY0FOSixDQXJCSixDQURKLENBSkosQ0FESjtBQXVDSDs7OzZCQUVRO0FBQ0wsVUFBSUMsT0FBTyxHQUFHLDRCQUFXLFlBQVgsRUFBeUI7QUFDbkMsd0JBQWdCLEtBQUtoQyxLQUFMLENBQVd3QztBQURRLE9BQXpCLENBQWQ7QUFJQSwwQkFDSTtBQUFLLFFBQUEsU0FBUyxFQUFFUjtBQUFoQixzQkFDSSw0Q0FDSyxLQUFLZ0IsV0FBTCxDQUFpQixNQUFqQixDQURMLGVBRUksOENBQU8sS0FBSy9DLEtBQUwsQ0FBV0MsSUFBWCxDQUFnQlcsTUFBaEIsQ0FBdUIsV0FBdkIsQ0FBUCxDQUZKLEVBR0ssS0FBS21DLFdBQUwsQ0FBaUIsU0FBakIsQ0FITCxDQURKLEVBTUssS0FBS0MsZ0JBQUwsRUFOTCxlQU9JLGdDQUFDLHFCQUFEO0FBQVcsUUFBQSxRQUFRLEVBQUUsS0FBS2pELEtBQUwsQ0FBV2tELFFBQWhDO0FBQTBDLFFBQUEsWUFBWSxFQUFFLEtBQUtsRCxLQUFMLENBQVdHLFlBQW5FO0FBQWlGLFFBQUEsT0FBTyxFQUFFLEtBQUtILEtBQUwsQ0FBV21ELE9BQXJHO0FBQThHLFFBQUEsT0FBTyxFQUFFLEtBQUtuRCxLQUFMLENBQVdvRCxPQUFsSTtBQUEySSxRQUFBLGVBQWUsRUFBRSxLQUFLckMsZUFBTCxDQUFxQmdCLElBQXJCLENBQTBCLElBQTFCLENBQTVKO0FBQTZMLFFBQUEsSUFBSSxFQUFFLEtBQUs5QixLQUFMLENBQVdDO0FBQTlNLFFBUEosRUFRSyxLQUFLbUQsZ0JBQUwsRUFSTCxDQURKO0FBWUg7Ozs7RUFqUm9CQyxrQkFBTUMsUzs7Z0JBQXpCeEQsVSxlQUVpQjtBQUNmb0QsRUFBQUEsT0FBTyxFQUFFSyxzQkFBVUMsVUFBVixDQUFxQkMsMEJBQXJCLENBRE07QUFFZk4sRUFBQUEsT0FBTyxFQUFFSSxzQkFBVUMsVUFBVixDQUFxQkMsMEJBQXJCLENBRk07QUFHZnZELEVBQUFBLFlBQVksRUFBRXFELHNCQUFVQyxVQUFWLENBQXFCQywwQkFBckIsQ0FIQztBQUc2QjtBQUM1Q2xCLEVBQUFBLFVBQVUsRUFBRWdCLHNCQUFVRztBQUpQLEM7O0FBbVJ2QkMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCOUQsVUFBakIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQtdGltZXpvbmUnO1xuaW1wb3J0IE1vbnRoVmlldyBmcm9tICcuL21vbnRoLXZpZXcnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNvbnN0IERFRkFVTFRfSE9VUl9WQUwgPSAxMjtcbmNvbnN0IERFRkFVTFRfTUlOVVRFX1ZBTCA9IDA7XG5cbmNsYXNzIERhdGVQaWNrZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YobW9tZW50KSxcbiAgICAgICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YobW9tZW50KSxcbiAgICAgICAgc2VsZWN0ZWREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihtb21lbnQpLCAvLyB0b2RvIHZhbGlkYXRlIHRoYXQgaXQncyBiZXR3ZWVuIG1pbiBhbmQgbWF4XG4gICAgICAgIGVuYWJsZVRpbWU6IFByb3BUeXBlcy5ib29sXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGRhdGU6IHRoaXMucHJvcHMuc2VsZWN0ZWREYXRlLFxuICAgICAgICAgICAgdGltZXBpY2tlclZpc2libGU6IGZhbHNlXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmVzZXQoKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgZGF0ZTogdGhpcy5wcm9wcy5zZWxlY3RlZERhdGVcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHNoaWZ0RGF0ZShkaXJlY3Rpb24pIHtcbiAgICAgICAgdmFyIGRhdGUgPSB0aGlzLnN0YXRlLmRhdGUuY2xvbmUoKTtcbiAgICAgICAgaWYoZGlyZWN0aW9uID09PSBcImJhY2tcIikge1xuICAgICAgICAgICAgZGF0ZSA9IGRhdGUuc3VidHJhY3QoMSwgXCJtb250aHNcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkYXRlID0gZGF0ZS5hZGQoMSwgXCJtb250aHNcIik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGRhdGU6IGRhdGVcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBnZXRNaW51dGUoKSB7XG4gICAgICAgIGxldCBtaW51dGUgPSB0aGlzLnN0YXRlLmRhdGUubWludXRlKCk7XG4gICAgICAgIGlmIChpc05hTihtaW51dGUpKSB7XG4gICAgICAgICAgICBtaW51dGUgPSBERUZBVUxUX01JTlVURV9WQUw7XG4gICAgICAgIH1cblxuICAgICAgICBpZihtaW51dGUgPCAxMCkge1xuICAgICAgICAgICAgbWludXRlID0gXCIwXCIgKyBtaW51dGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbWludXRlO1xuICAgIH1cblxuICAgIGdldEhvdXIoKSB7XG4gICAgICAgIGxldCBob3VyID0gdGhpcy5zdGF0ZS5kYXRlLmhvdXIoKTtcbiAgICAgICAgaWYgKGlzTmFOKGhvdXIpKSB7XG4gICAgICAgICAgICBob3VyID0gREVGQVVMVF9IT1VSX1ZBTDtcbiAgICAgICAgfVxuICAgICAgICBpZihob3VyID4gMTIpIHtcbiAgICAgICAgICAgIGhvdXIgPSBob3VyIC0gMTI7XG4gICAgICAgIH1cblxuICAgICAgICBpZihob3VyID09PSAwKSB7XG4gICAgICAgICAgICBob3VyID0gMTI7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaG91cjtcbiAgICB9XG5cbiAgICBnZXRBbVBtKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5kYXRlLmZvcm1hdChcImFcIik7XG4gICAgfVxuXG4gICAgaGFuZGxlU2VsZWN0aW9uKGRhdGUsIG9wdGlvbnMpIHtcbiAgICAgICAgZGF0ZS5ob3VyKHRoaXMuc3RhdGUuZGF0ZS5ob3VyKCkpO1xuICAgICAgICBkYXRlLm1pbnV0ZSh0aGlzLnN0YXRlLmRhdGUubWludXRlKCkpO1xuICAgICAgICB0aGlzLnByb3BzLmhhbmRsZVNlbGVjdGlvbihkYXRlLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBoYW5kbGVIb3VyQ2hhbmdlKCkge1xuICAgICAgICBsZXQgZGF0ZSA9IHRoaXMuc3RhdGUuZGF0ZTtcbiAgICAgICAgY29uc3QgaG91clZhbCA9IHBhcnNlSW50KHRoaXMuaG91ci52YWx1ZSk7XG4gICAgICAgIGxldCB2YWx1ZSA9IERFRkFVTFRfSE9VUl9WQUw7XG5cbiAgICAgICAgaWYgKCFpc05hTihob3VyVmFsKSkge1xuICAgICAgICAgICAgdmFsdWUgPSBob3VyVmFsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGhpcy5nZXRBbVBtKCkgPT09IFwicG1cIikge1xuICAgICAgICAgICAgdmFsdWUgKz0gMTI7XG4gICAgICAgIH1cblxuICAgICAgICBkYXRlLmhvdXIodmFsdWUpO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgZGF0ZTogZGF0ZVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGhhbmRsZU1pbnV0ZUNoYW5nZSgpIHtcbiAgICAgICAgbGV0IGRhdGUgPSB0aGlzLnN0YXRlLmRhdGU7XG4gICAgICAgIGNvbnN0IG1pbnV0ZVZhbCA9IHBhcnNlSW50KHRoaXMubWludXRlLnZhbHVlKTtcbiAgICAgICAgbGV0IHZhbHVlID0gREVGQVVMVF9NSU5VVEVfVkFMO1xuXG4gICAgICAgIGlmICghaXNOYU4obWludXRlVmFsKSkge1xuICAgICAgICAgICAgdmFsdWUgPSBtaW51dGVWYWw7XG4gICAgICAgIH1cblxuICAgICAgICBkYXRlLm1pbnV0ZSh2YWx1ZSk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBkYXRlOiBkYXRlXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgaGFuZGxlQW1QbUNoYW5nZSgpIHtcbiAgICAgICAgdmFyIGN1cnJlbnRWYWx1ZSA9IHRoaXMuZ2V0QW1QbSgpLFxuICAgICAgICAgICAgY2hhbmdlZFZhbHVlID0gdGhpcy5hbXBtLnZhbHVlLFxuICAgICAgICAgICAgaG91ciA9IHRoaXMuc3RhdGUuZGF0ZS5ob3VyKCk7XG5cbiAgICAgICAgaWYoY3VycmVudFZhbHVlICE9IGNoYW5nZWRWYWx1ZSkge1xuICAgICAgICAgICAgaWYoY2hhbmdlZFZhbHVlID09PSBcImFtXCIgJiYgaG91ciA+PSAxMikge1xuICAgICAgICAgICAgICAgIGhvdXIgLT0gMTI7XG4gICAgICAgICAgICB9IGVsc2UgaWYoY2hhbmdlZFZhbHVlID09PSBcInBtXCIgJiYgaG91ciA8IDEyKSB7XG4gICAgICAgICAgICAgICAgaG91ciArPSAxMjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGRhdGUgPSB0aGlzLnN0YXRlLmRhdGU7XG4gICAgICAgICAgICBkYXRlLmhvdXIoaG91cik7XG5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGRhdGU6IGRhdGVcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGUpIHtcbiAgICAgICAgdmFyIGtleSA9IGUud2hpY2ggfHwgZS5rZXlDb2RlLFxuICAgICAgICAgICAgd2FzRW50ZXIgPSBrZXkgPT09IDEzO1xuXG4gICAgICAgIGlmKHdhc0VudGVyKSB7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVRpbWVwaWNrZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZVRpbWVwaWNrZXIoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgdGltZXBpY2tlclZpc2libGU6ICF0aGlzLnN0YXRlLnRpbWVwaWNrZXJWaXNpYmxlXG4gICAgICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYoIXRoaXMuc3RhdGUudGltZXBpY2tlclZpc2libGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVNlbGVjdGlvbih0aGlzLnN0YXRlLmRhdGUsIHtcbiAgICAgICAgICAgICAgICAgICAgY29sbGFwc2U6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgIH1cblxuICAgIHJlbmRlckFycm93KGRpcmVjdGlvbikge1xuICAgICAgICB2YXIgY2xhc3NlcyA9IFwibW9udGgtc3dpdGNoZXIgXCIgKyBkaXJlY3Rpb24sIGNvbnRlbnQ7XG4gICAgICAgIGlmKHRoaXMucHJvcHMuaWdub3JlRm9udEF3ZXNvbWUpIHtcbiAgICAgICAgICAgIGlmKGRpcmVjdGlvbiA9PT0gXCJiYWNrXCIpIHtcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gPHNwYW4+JmxzYXF1bzs8L3NwYW4+O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gPHNwYW4+JnJzYXF1bzs8L3NwYW4+O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgc3R5bGVzID0ge1xuICAgICAgICAgICAgICAgIGZvbnRTaXplOiBcIjEzcHhcIlxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoZGlyZWN0aW9uID09PSBcImJhY2tcIikge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSA8aSBzdHlsZT17c3R5bGVzfSBjbGFzc05hbWU9XCJmYSBmYS1jaGV2cm9uLWxlZnRcIj48L2k+O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gPGkgc3R5bGU9e3N0eWxlc30gY2xhc3NOYW1lPVwiZmEgZmEtY2hldnJvbi1yaWdodFwiPjwvaT47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gPHNwYW4gb25DbGljaz17dGhpcy5zaGlmdERhdGUuYmluZCh0aGlzLCBkaXJlY3Rpb24pfSBjbGFzc05hbWU9e2NsYXNzZXN9Pntjb250ZW50fTwvc3Bhbj5cbiAgICB9XG5cbiAgICByZW5kZXJEYXlMZXR0ZXJzKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJkYXRlcGlja2VyLWRheS1oZWFkZXJzXCI+XG4gICAgICAgICAgICAgICAgPHNwYW4+U1VOPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuPk1PTjwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5UVUU8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+V0VEPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuPlRIVTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5GUkk8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+U0FUPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyVGltZVBpY2tlckhlYWRlckNvbnRlbnQoKSB7XG4gICAgICAgIHZhciBjb250ZW50ID0gKFxuICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtY2xvY2stb1wiPjwvaT5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoZWFkZXItdGltZVwiPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5nZXRIb3VyKCl9Ont0aGlzLmdldE1pbnV0ZSgpfSZuYnNwO3t0aGlzLmdldEFtUG0oKX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICk7XG5cbiAgICAgICAgaWYodGhpcy5zdGF0ZS50aW1lcGlja2VyVmlzaWJsZSkge1xuICAgICAgICAgICAgY29udGVudCA9IDxzcGFuPmRvbmU8L3NwYW4+XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29udGVudDtcbiAgICB9XG5cbiAgICByZW5kZXJUaW1lUGlja2VyKCkge1xuICAgICAgICBpZighdGhpcy5wcm9wcy5lbmFibGVUaW1lKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHZhciBjbGFzc2VzID0gY2xhc3NuYW1lcyhcImRhdGVwaWNrZXItdGltZXBpY2tlclwiLCB7XG4gICAgICAgICAgICBcInZpc2libGVcIjogdGhpcy5zdGF0ZS50aW1lcGlja2VyVmlzaWJsZVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXN9PlxuICAgICAgICAgICAgICAgIDxkaXYgb25DbGljaz17dGhpcy50b2dnbGVUaW1lcGlja2VyLmJpbmQodGhpcyl9IGNsYXNzTmFtZT1cImRhdGVwaWNrZXItdGltZXBpY2tlci1oZWFkZXJcIj5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyVGltZVBpY2tlckhlYWRlckNvbnRlbnQoKX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpbWVwaWNrZXItaW5wdXRzXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaW5wdXQtcm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgY2xhc3NOYW1lPVwiaW5wdXQtaG91cnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17KGgpID0+IHsgdGhpcy5ob3VyID0gaDsgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRIb3VyKCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT1cIm51bWJlclwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluPXsxfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heD17MTJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4TGVuZ3RoPXsyfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUhvdXJDaGFuZ2UuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PVwiLTFcIiAvPjpcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCBjbGFzc05hbWU9XCJpbnB1dC1taW51dGVzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9eyhtKSA9PiB7IHRoaXMubWludXRlID0gbTsgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRNaW51dGUoKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW49ezB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4PXs1OX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhMZW5ndGg9ezJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlTWludXRlQ2hhbmdlLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd24uYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJJbmRleD1cIi0xXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzZWxlY3QgY2xhc3NOYW1lPVwiYW1wbS1waWNrZXIgaWdub3JlLWNob3NlblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17KGFtcG0pID0+IHsgdGhpcy5hbXBtID0gYW1wbTsgfX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RoaXMuZ2V0QW1QbSgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVBbVBtQ2hhbmdlLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PVwiLTFcIiA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImFtXCI+QU08L29wdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwicG1cIj5QTTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB2YXIgY2xhc3NlcyA9IGNsYXNzbmFtZXMoXCJkYXRlcGlja2VyXCIsIHtcbiAgICAgICAgICAgIFwidGltZS1lbmFibGVkXCI6IHRoaXMucHJvcHMuZW5hYmxlVGltZVxuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlc30+XG4gICAgICAgICAgICAgICAgPGgzPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJBcnJvdyhcImJhY2tcIil9XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPnt0aGlzLnN0YXRlLmRhdGUuZm9ybWF0KFwiTU1NTSBZWVlZXCIpfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQXJyb3coXCJmb3J3YXJkXCIpfVxuICAgICAgICAgICAgICAgIDwvaDM+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyRGF5TGV0dGVycygpfVxuICAgICAgICAgICAgICAgIDxNb250aFZpZXcgdGltZXpvbmU9e3RoaXMucHJvcHMudGltZXpvbmV9IHNlbGVjdGVkRGF0ZT17dGhpcy5wcm9wcy5zZWxlY3RlZERhdGV9IG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX0gbWF4RGF0ZT17dGhpcy5wcm9wcy5tYXhEYXRlfSBoYW5kbGVTZWxlY3Rpb249e3RoaXMuaGFuZGxlU2VsZWN0aW9uLmJpbmQodGhpcyl9IGRhdGU9e3RoaXMuc3RhdGUuZGF0ZX0gLz5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJUaW1lUGlja2VyKCl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSBEYXRlUGlja2VyO1xuIl19
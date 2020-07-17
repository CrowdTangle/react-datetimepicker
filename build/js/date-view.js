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

var DatePicker = /*#__PURE__*/function (_React$Component) {
  _inherits(DatePicker, _React$Component);

  var _super = _createSuper(DatePicker);

  function DatePicker(props) {
    var _this;

    _classCallCheck(this, DatePicker);

    _this = _super.call(this, props);
    var selectedDate = _this.props.selectedDate;
    _this.state = {
      currentHour: _this.getHourIn12Format(selectedDate.hour()),
      currentMinute: _this.getMinuteFormatted(selectedDate.minute()),
      currentAmpm: selectedDate.format("a"),
      currentDateWithoutTime: selectedDate,
      timepickerVisible: false
    };
    return _this;
  }

  _createClass(DatePicker, [{
    key: "reset",
    value: function reset() {
      var selectedDate = this.props.selectedDate;
      this.setState({
        currentHour: this.getHourIn12Format(selectedDate.hour()),
        currentMinute: this.getMinuteFormatted(selectedDate.minute()),
        currentAmpm: selectedDate.format("a"),
        currentDateWithoutTime: selectedDate
      });
    }
  }, {
    key: "getHourIn12Format",
    value: function getHourIn12Format(hourVal) {
      var result = hourVal;

      if (result < 0) {
        result = 0;
      }

      result = parseInt(result);
      result = result % 12;

      if (result === 0) {
        result = 12;
      }

      return result;
    }
  }, {
    key: "getMinuteFormatted",
    value: function getMinuteFormatted(minuteVal) {
      var result = minuteVal;

      if (result < 0) {
        result = 0;
      }

      result = parseInt(result);
      return result % 60;
    }
  }, {
    key: "getDateObj",
    value: function getDateObj(currentHour, currentMinute, currentAmpm, newDate) {
      var currentDateWithoutTime = this.state.currentDateWithoutTime;
      var dateToUse = newDate ? newDate : currentDateWithoutTime;
      var currentDate = dateToUse.clone();
      var hourIn24 = currentHour;

      if (currentAmpm === "am" && currentHour === 12) {
        hourIn24 = 0;
      } else if (currentAmpm === "pm" && currentHour < 12) {
        hourIn24 += 12;
      }

      currentDate.hour(hourIn24);
      currentDate.minute(currentMinute);
      return currentDate;
    }
  }, {
    key: "shiftDate",
    value: function shiftDate(direction) {
      var _this$state = this.state,
          currentHour = _this$state.currentHour,
          currentMinute = _this$state.currentMinute,
          currentAmpm = _this$state.currentAmpm;
      var currentDate = this.getDateObj(currentHour, currentMinute, currentAmpm);

      if (direction === "back") {
        currentDate = currentDate.subtract(1, "months");
      } else {
        currentDate = currentDate.add(1, "months");
      }

      this.setState({
        currentHour: currentHour,
        currentMinute: currentMinute,
        currentAmpm: currentAmpm,
        currentDateWithoutTime: currentDate
      });
    }
  }, {
    key: "handleDateSelection",
    value: function handleDateSelection(date, options) {
      var handleSelection = this.props.handleSelection;
      var _this$state2 = this.state,
          currentHour = _this$state2.currentHour,
          currentMinute = _this$state2.currentMinute,
          currentAmpm = _this$state2.currentAmpm;
      var dateObj = this.getDateObj(currentHour, currentMinute, currentAmpm, date);
      handleSelection(dateObj, options);
    }
  }, {
    key: "handleTimeSelection",
    value: function handleTimeSelection(date, options) {
      var handleSelection = this.props.handleSelection;
      handleSelection(date, options);
    }
  }, {
    key: "handleHourChange",
    value: function handleHourChange() {
      var hourVal = this.hour.value ? parseInt(this.hour.value) : 0;
      hourVal = isNaN(hourVal) ? 0 : hourVal;
      this.setState({
        currentHour: hourVal
      });
    }
  }, {
    key: "handleMinuteChange",
    value: function handleMinuteChange() {
      var minuteVal = this.minute.value ? parseInt(this.minute.value) : 0;
      this.setState({
        currentMinute: minuteVal
      });
    }
  }, {
    key: "handleAmPmChange",
    value: function handleAmPmChange() {
      var _this$state3 = this.state,
          currentHour = _this$state3.currentHour,
          currentMinute = _this$state3.currentMinute;
      var ampmVal = this.ampm.value;
      var formattedHr = this.getHourIn12Format(currentHour);
      var formattedMin = this.getMinuteFormatted(currentMinute);
      this.setState({
        currentHour: formattedHr,
        currentMinute: formattedMin,
        currentAmpm: ampmVal
      });
      var dateObj = this.getDateObj(formattedHr, formattedMin, ampmVal);
      this.handleTimeSelection(dateObj, {
        collapse: false
      });
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(e) {
      var _this$state4 = this.state,
          currentHour = _this$state4.currentHour,
          currentMinute = _this$state4.currentMinute;
      var key = e.which || e.keyCode,
          wasEnter = key === 13;

      if (wasEnter) {
        var formattedHr = this.getHourIn12Format(currentHour);
        var formattedMin = this.getMinuteFormatted(currentMinute);
        this.setState({
          currentHour: formattedHr,
          currentMinute: formattedMin
        });
        this.toggleTimepicker();
      }
    }
  }, {
    key: "toggleTimepicker",
    value: function toggleTimepicker() {
      var _this$state5 = this.state,
          currentHour = _this$state5.currentHour,
          currentMinute = _this$state5.currentMinute,
          currentAmpm = _this$state5.currentAmpm,
          timepickerVisible = _this$state5.timepickerVisible;
      var wasOpenButNowShouldBeClosed = timepickerVisible;
      this.setState({
        timepickerVisible: !timepickerVisible
      }, function () {
        if (wasOpenButNowShouldBeClosed) {
          var dateObj = this.getDateObj(currentHour, currentMinute, currentAmpm);
          this.handleTimeSelection(dateObj, {
            collapse: false
          });
        }
      }.bind(this));
    }
  }, {
    key: "renderArrow",
    value: function renderArrow(direction) {
      var ignoreFontAwesome = this.props.ignoreFontAwesome;
      var classes = "month-switcher " + direction,
          content;

      if (ignoreFontAwesome) {
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
      var _this$state6 = this.state,
          currentHour = _this$state6.currentHour,
          currentMinute = _this$state6.currentMinute,
          currentAmpm = _this$state6.currentAmpm,
          timepickerVisible = _this$state6.timepickerVisible;
      var currentDate = this.getDateObj(currentHour, currentMinute, currentAmpm);
      var displayMin = currentDate.format("mm");

      var content = /*#__PURE__*/_react["default"].createElement("span", null, /*#__PURE__*/_react["default"].createElement("i", {
        className: "fa fa-clock-o"
      }), /*#__PURE__*/_react["default"].createElement("span", {
        className: "header-time"
      }, currentHour, ":", displayMin, "\xA0", currentAmpm));

      if (timepickerVisible) {
        content = /*#__PURE__*/_react["default"].createElement("span", null, "done");
      }

      return content;
    }
  }, {
    key: "renderTimePicker",
    value: function renderTimePicker() {
      var _this2 = this;

      var enableTime = this.props.enableTime;
      var _this$state7 = this.state,
          currentHour = _this$state7.currentHour,
          currentMinute = _this$state7.currentMinute,
          currentAmpm = _this$state7.currentAmpm,
          timepickerVisible = _this$state7.timepickerVisible;

      if (!enableTime) {
        return;
      }

      var classes = (0, _classnames["default"])("datepicker-timepicker", {
        "visible": timepickerVisible
      });
      var currentDate = this.getDateObj(currentHour, currentMinute, currentAmpm);
      var displayHr = currentHour === 0 ? currentHour : currentDate.format("hh");
      var displayMin = currentDate.format("mm");
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
        value: displayHr,
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
        value: displayMin,
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
        value: currentAmpm,
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
      var _this$props = this.props,
          enableTime = _this$props.enableTime,
          maxDate = _this$props.maxDate,
          minDate = _this$props.minDate,
          selectedDate = _this$props.selectedDate,
          timezone = _this$props.timezone;
      var _this$state8 = this.state,
          currentHour = _this$state8.currentHour,
          currentMinute = _this$state8.currentMinute,
          currentAmpm = _this$state8.currentAmpm;
      var classes = (0, _classnames["default"])("datepicker", {
        "time-enabled": enableTime
      });
      var dateObj = this.getDateObj(currentHour, currentMinute, currentAmpm);
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: classes
      }, /*#__PURE__*/_react["default"].createElement("h3", null, this.renderArrow("back"), /*#__PURE__*/_react["default"].createElement("span", null, dateObj.format("MMMM YYYY")), this.renderArrow("forward")), this.renderDayLetters(), /*#__PURE__*/_react["default"].createElement(_monthView["default"], {
        timezone: timezone,
        selectedDate: selectedDate,
        minDate: minDate,
        maxDate: maxDate,
        handleSelection: this.handleDateSelection.bind(this),
        date: dateObj
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9qcy9kYXRlLXZpZXcuanN4Il0sIm5hbWVzIjpbIkRhdGVQaWNrZXIiLCJwcm9wcyIsInNlbGVjdGVkRGF0ZSIsInN0YXRlIiwiY3VycmVudEhvdXIiLCJnZXRIb3VySW4xMkZvcm1hdCIsImhvdXIiLCJjdXJyZW50TWludXRlIiwiZ2V0TWludXRlRm9ybWF0dGVkIiwibWludXRlIiwiY3VycmVudEFtcG0iLCJmb3JtYXQiLCJjdXJyZW50RGF0ZVdpdGhvdXRUaW1lIiwidGltZXBpY2tlclZpc2libGUiLCJzZXRTdGF0ZSIsImhvdXJWYWwiLCJyZXN1bHQiLCJwYXJzZUludCIsIm1pbnV0ZVZhbCIsIm5ld0RhdGUiLCJkYXRlVG9Vc2UiLCJjdXJyZW50RGF0ZSIsImNsb25lIiwiaG91ckluMjQiLCJkaXJlY3Rpb24iLCJnZXREYXRlT2JqIiwic3VidHJhY3QiLCJhZGQiLCJkYXRlIiwib3B0aW9ucyIsImhhbmRsZVNlbGVjdGlvbiIsImRhdGVPYmoiLCJ2YWx1ZSIsImlzTmFOIiwiYW1wbVZhbCIsImFtcG0iLCJmb3JtYXR0ZWRIciIsImZvcm1hdHRlZE1pbiIsImhhbmRsZVRpbWVTZWxlY3Rpb24iLCJjb2xsYXBzZSIsImUiLCJrZXkiLCJ3aGljaCIsImtleUNvZGUiLCJ3YXNFbnRlciIsInRvZ2dsZVRpbWVwaWNrZXIiLCJ3YXNPcGVuQnV0Tm93U2hvdWxkQmVDbG9zZWQiLCJiaW5kIiwiaWdub3JlRm9udEF3ZXNvbWUiLCJjbGFzc2VzIiwiY29udGVudCIsInN0eWxlcyIsImZvbnRTaXplIiwic2hpZnREYXRlIiwiZGlzcGxheU1pbiIsImVuYWJsZVRpbWUiLCJkaXNwbGF5SHIiLCJyZW5kZXJUaW1lUGlja2VySGVhZGVyQ29udGVudCIsImgiLCJoYW5kbGVIb3VyQ2hhbmdlIiwiaGFuZGxlS2V5RG93biIsIm0iLCJoYW5kbGVNaW51dGVDaGFuZ2UiLCJoYW5kbGVBbVBtQ2hhbmdlIiwibWF4RGF0ZSIsIm1pbkRhdGUiLCJ0aW1lem9uZSIsInJlbmRlckFycm93IiwicmVuZGVyRGF5TGV0dGVycyIsImhhbmRsZURhdGVTZWxlY3Rpb24iLCJyZW5kZXJUaW1lUGlja2VyIiwiUmVhY3QiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJpbnN0YW5jZU9mIiwibW9tZW50IiwiYm9vbCIsIm1vZHVsZSIsImV4cG9ydHMiXSwibWFwcGluZ3MiOiI7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFTUEsVTs7Ozs7QUFTRixzQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUFBOztBQUNmLDhCQUFNQSxLQUFOO0FBRGUsUUFFUkMsWUFGUSxHQUVRLE1BQUtELEtBRmIsQ0FFUkMsWUFGUTtBQUlmLFVBQUtDLEtBQUwsR0FBYTtBQUNUQyxNQUFBQSxXQUFXLEVBQUUsTUFBS0MsaUJBQUwsQ0FBdUJILFlBQVksQ0FBQ0ksSUFBYixFQUF2QixDQURKO0FBRVRDLE1BQUFBLGFBQWEsRUFBRSxNQUFLQyxrQkFBTCxDQUF3Qk4sWUFBWSxDQUFDTyxNQUFiLEVBQXhCLENBRk47QUFHVEMsTUFBQUEsV0FBVyxFQUFFUixZQUFZLENBQUNTLE1BQWIsQ0FBb0IsR0FBcEIsQ0FISjtBQUlUQyxNQUFBQSxzQkFBc0IsRUFBRVYsWUFKZjtBQUtUVyxNQUFBQSxpQkFBaUIsRUFBRTtBQUxWLEtBQWI7QUFKZTtBQVdsQjs7Ozs0QkFFTztBQUFBLFVBQ0dYLFlBREgsR0FDbUIsS0FBS0QsS0FEeEIsQ0FDR0MsWUFESDtBQUdKLFdBQUtZLFFBQUwsQ0FBYztBQUNWVixRQUFBQSxXQUFXLEVBQUUsS0FBS0MsaUJBQUwsQ0FBdUJILFlBQVksQ0FBQ0ksSUFBYixFQUF2QixDQURIO0FBRVZDLFFBQUFBLGFBQWEsRUFBRSxLQUFLQyxrQkFBTCxDQUF3Qk4sWUFBWSxDQUFDTyxNQUFiLEVBQXhCLENBRkw7QUFHVkMsUUFBQUEsV0FBVyxFQUFFUixZQUFZLENBQUNTLE1BQWIsQ0FBb0IsR0FBcEIsQ0FISDtBQUlWQyxRQUFBQSxzQkFBc0IsRUFBRVY7QUFKZCxPQUFkO0FBTUg7OztzQ0FFaUJhLE8sRUFBUztBQUN2QixVQUFJQyxNQUFNLEdBQUdELE9BQWI7O0FBQ0EsVUFBSUMsTUFBTSxHQUFHLENBQWIsRUFBZ0I7QUFDWkEsUUFBQUEsTUFBTSxHQUFHLENBQVQ7QUFDSDs7QUFDREEsTUFBQUEsTUFBTSxHQUFHQyxRQUFRLENBQUNELE1BQUQsQ0FBakI7QUFDQUEsTUFBQUEsTUFBTSxHQUFHQSxNQUFNLEdBQUcsRUFBbEI7O0FBQ0EsVUFBSUEsTUFBTSxLQUFLLENBQWYsRUFBa0I7QUFDZEEsUUFBQUEsTUFBTSxHQUFHLEVBQVQ7QUFDSDs7QUFDRCxhQUFPQSxNQUFQO0FBQ0g7Ozt1Q0FFa0JFLFMsRUFBVztBQUMxQixVQUFJRixNQUFNLEdBQUdFLFNBQWI7O0FBQ0EsVUFBSUYsTUFBTSxHQUFHLENBQWIsRUFBZ0I7QUFDWkEsUUFBQUEsTUFBTSxHQUFHLENBQVQ7QUFDSDs7QUFDREEsTUFBQUEsTUFBTSxHQUFHQyxRQUFRLENBQUNELE1BQUQsQ0FBakI7QUFDQSxhQUFPQSxNQUFNLEdBQUcsRUFBaEI7QUFDSDs7OytCQUVVWixXLEVBQWFHLGEsRUFBZUcsVyxFQUFhUyxPLEVBQVM7QUFBQSxVQUNsRFAsc0JBRGtELEdBQ3hCLEtBQUtULEtBRG1CLENBQ2xEUyxzQkFEa0Q7QUFHekQsVUFBTVEsU0FBUyxHQUFHRCxPQUFPLEdBQUdBLE9BQUgsR0FBYVAsc0JBQXRDO0FBRUEsVUFBTVMsV0FBVyxHQUFHRCxTQUFTLENBQUNFLEtBQVYsRUFBcEI7QUFDQSxVQUFJQyxRQUFRLEdBQUduQixXQUFmOztBQUNBLFVBQUlNLFdBQVcsS0FBSyxJQUFoQixJQUF3Qk4sV0FBVyxLQUFLLEVBQTVDLEVBQWdEO0FBQzVDbUIsUUFBQUEsUUFBUSxHQUFHLENBQVg7QUFDSCxPQUZELE1BRU8sSUFBSWIsV0FBVyxLQUFLLElBQWhCLElBQXdCTixXQUFXLEdBQUcsRUFBMUMsRUFBOEM7QUFDakRtQixRQUFBQSxRQUFRLElBQUksRUFBWjtBQUNIOztBQUVERixNQUFBQSxXQUFXLENBQUNmLElBQVosQ0FBaUJpQixRQUFqQjtBQUNBRixNQUFBQSxXQUFXLENBQUNaLE1BQVosQ0FBbUJGLGFBQW5CO0FBRUEsYUFBT2MsV0FBUDtBQUNIOzs7OEJBRVNHLFMsRUFBVztBQUFBLHdCQUNpQyxLQUFLckIsS0FEdEM7QUFBQSxVQUNWQyxXQURVLGVBQ1ZBLFdBRFU7QUFBQSxVQUNHRyxhQURILGVBQ0dBLGFBREg7QUFBQSxVQUNrQkcsV0FEbEIsZUFDa0JBLFdBRGxCO0FBR2pCLFVBQUlXLFdBQVcsR0FBRyxLQUFLSSxVQUFMLENBQWdCckIsV0FBaEIsRUFBNkJHLGFBQTdCLEVBQTRDRyxXQUE1QyxDQUFsQjs7QUFDQSxVQUFHYyxTQUFTLEtBQUssTUFBakIsRUFBeUI7QUFDckJILFFBQUFBLFdBQVcsR0FBR0EsV0FBVyxDQUFDSyxRQUFaLENBQXFCLENBQXJCLEVBQXdCLFFBQXhCLENBQWQ7QUFDSCxPQUZELE1BRU87QUFDSEwsUUFBQUEsV0FBVyxHQUFHQSxXQUFXLENBQUNNLEdBQVosQ0FBZ0IsQ0FBaEIsRUFBbUIsUUFBbkIsQ0FBZDtBQUNIOztBQUVELFdBQUtiLFFBQUwsQ0FBYztBQUNWVixRQUFBQSxXQUFXLEVBQVhBLFdBRFU7QUFFVkcsUUFBQUEsYUFBYSxFQUFiQSxhQUZVO0FBR1ZHLFFBQUFBLFdBQVcsRUFBWEEsV0FIVTtBQUlWRSxRQUFBQSxzQkFBc0IsRUFBRVM7QUFKZCxPQUFkO0FBTUg7Ozt3Q0FFbUJPLEksRUFBTUMsTyxFQUFTO0FBQUEsVUFDeEJDLGVBRHdCLEdBQ0wsS0FBSzdCLEtBREEsQ0FDeEI2QixlQUR3QjtBQUFBLHlCQUVtQixLQUFLM0IsS0FGeEI7QUFBQSxVQUV4QkMsV0FGd0IsZ0JBRXhCQSxXQUZ3QjtBQUFBLFVBRVhHLGFBRlcsZ0JBRVhBLGFBRlc7QUFBQSxVQUVJRyxXQUZKLGdCQUVJQSxXQUZKO0FBSS9CLFVBQU1xQixPQUFPLEdBQUcsS0FBS04sVUFBTCxDQUFnQnJCLFdBQWhCLEVBQTZCRyxhQUE3QixFQUE0Q0csV0FBNUMsRUFBeURrQixJQUF6RCxDQUFoQjtBQUNBRSxNQUFBQSxlQUFlLENBQUNDLE9BQUQsRUFBVUYsT0FBVixDQUFmO0FBQ0g7Ozt3Q0FFbUJELEksRUFBTUMsTyxFQUFTO0FBQUEsVUFDeEJDLGVBRHdCLEdBQ0wsS0FBSzdCLEtBREEsQ0FDeEI2QixlQUR3QjtBQUcvQkEsTUFBQUEsZUFBZSxDQUFDRixJQUFELEVBQU9DLE9BQVAsQ0FBZjtBQUNIOzs7dUNBRWtCO0FBQ2YsVUFBSWQsT0FBTyxHQUFHLEtBQUtULElBQUwsQ0FBVTBCLEtBQVYsR0FBa0JmLFFBQVEsQ0FBQyxLQUFLWCxJQUFMLENBQVUwQixLQUFYLENBQTFCLEdBQThDLENBQTVEO0FBQ0FqQixNQUFBQSxPQUFPLEdBQUdrQixLQUFLLENBQUNsQixPQUFELENBQUwsR0FBaUIsQ0FBakIsR0FBcUJBLE9BQS9CO0FBRUEsV0FBS0QsUUFBTCxDQUFjO0FBQ1ZWLFFBQUFBLFdBQVcsRUFBRVc7QUFESCxPQUFkO0FBR0g7Ozt5Q0FFb0I7QUFDakIsVUFBTUcsU0FBUyxHQUFHLEtBQUtULE1BQUwsQ0FBWXVCLEtBQVosR0FBb0JmLFFBQVEsQ0FBQyxLQUFLUixNQUFMLENBQVl1QixLQUFiLENBQTVCLEdBQWtELENBQXBFO0FBRUEsV0FBS2xCLFFBQUwsQ0FBYztBQUNWUCxRQUFBQSxhQUFhLEVBQUVXO0FBREwsT0FBZDtBQUdIOzs7dUNBRWtCO0FBQUEseUJBQ3NCLEtBQUtmLEtBRDNCO0FBQUEsVUFDUkMsV0FEUSxnQkFDUkEsV0FEUTtBQUFBLFVBQ0tHLGFBREwsZ0JBQ0tBLGFBREw7QUFHZixVQUFNMkIsT0FBTyxHQUFHLEtBQUtDLElBQUwsQ0FBVUgsS0FBMUI7QUFDQSxVQUFNSSxXQUFXLEdBQUcsS0FBSy9CLGlCQUFMLENBQXVCRCxXQUF2QixDQUFwQjtBQUNBLFVBQU1pQyxZQUFZLEdBQUcsS0FBSzdCLGtCQUFMLENBQXdCRCxhQUF4QixDQUFyQjtBQUVBLFdBQUtPLFFBQUwsQ0FBYztBQUNWVixRQUFBQSxXQUFXLEVBQUVnQyxXQURIO0FBRVY3QixRQUFBQSxhQUFhLEVBQUU4QixZQUZMO0FBR1YzQixRQUFBQSxXQUFXLEVBQUV3QjtBQUhILE9BQWQ7QUFNQSxVQUFNSCxPQUFPLEdBQUcsS0FBS04sVUFBTCxDQUFnQlcsV0FBaEIsRUFBNkJDLFlBQTdCLEVBQTJDSCxPQUEzQyxDQUFoQjtBQUNBLFdBQUtJLG1CQUFMLENBQXlCUCxPQUF6QixFQUFrQztBQUFDUSxRQUFBQSxRQUFRLEVBQUU7QUFBWCxPQUFsQztBQUNIOzs7a0NBRWFDLEMsRUFBRztBQUFBLHlCQUN3QixLQUFLckMsS0FEN0I7QUFBQSxVQUNOQyxXQURNLGdCQUNOQSxXQURNO0FBQUEsVUFDT0csYUFEUCxnQkFDT0EsYUFEUDtBQUViLFVBQUlrQyxHQUFHLEdBQUdELENBQUMsQ0FBQ0UsS0FBRixJQUFXRixDQUFDLENBQUNHLE9BQXZCO0FBQUEsVUFDSUMsUUFBUSxHQUFHSCxHQUFHLEtBQUssRUFEdkI7O0FBR0EsVUFBR0csUUFBSCxFQUFhO0FBQ1QsWUFBTVIsV0FBVyxHQUFHLEtBQUsvQixpQkFBTCxDQUF1QkQsV0FBdkIsQ0FBcEI7QUFDQSxZQUFNaUMsWUFBWSxHQUFHLEtBQUs3QixrQkFBTCxDQUF3QkQsYUFBeEIsQ0FBckI7QUFDQSxhQUFLTyxRQUFMLENBQWM7QUFDVlYsVUFBQUEsV0FBVyxFQUFFZ0MsV0FESDtBQUVWN0IsVUFBQUEsYUFBYSxFQUFFOEI7QUFGTCxTQUFkO0FBSUEsYUFBS1EsZ0JBQUw7QUFDSDtBQUNKOzs7dUNBRWtCO0FBQUEseUJBQ3NELEtBQUsxQyxLQUQzRDtBQUFBLFVBQ1JDLFdBRFEsZ0JBQ1JBLFdBRFE7QUFBQSxVQUNLRyxhQURMLGdCQUNLQSxhQURMO0FBQUEsVUFDb0JHLFdBRHBCLGdCQUNvQkEsV0FEcEI7QUFBQSxVQUNpQ0csaUJBRGpDLGdCQUNpQ0EsaUJBRGpDO0FBR2YsVUFBTWlDLDJCQUEyQixHQUFHakMsaUJBQXBDO0FBRUEsV0FBS0MsUUFBTCxDQUFjO0FBQ1ZELFFBQUFBLGlCQUFpQixFQUFFLENBQUNBO0FBRFYsT0FBZCxFQUVHLFlBQVc7QUFDVixZQUFHaUMsMkJBQUgsRUFBZ0M7QUFDNUIsY0FBTWYsT0FBTyxHQUFHLEtBQUtOLFVBQUwsQ0FBZ0JyQixXQUFoQixFQUE2QkcsYUFBN0IsRUFBNENHLFdBQTVDLENBQWhCO0FBQ0EsZUFBSzRCLG1CQUFMLENBQXlCUCxPQUF6QixFQUFrQztBQUM5QlEsWUFBQUEsUUFBUSxFQUFFO0FBRG9CLFdBQWxDO0FBR0g7QUFFSixPQVJFLENBUURRLElBUkMsQ0FRSSxJQVJKLENBRkg7QUFXSDs7O2dDQUVXdkIsUyxFQUFXO0FBQUEsVUFDWndCLGlCQURZLEdBQ1MsS0FBSy9DLEtBRGQsQ0FDWitDLGlCQURZO0FBR25CLFVBQUlDLE9BQU8sR0FBRyxvQkFBb0J6QixTQUFsQztBQUFBLFVBQTZDMEIsT0FBN0M7O0FBQ0EsVUFBR0YsaUJBQUgsRUFBc0I7QUFDbEIsWUFBR3hCLFNBQVMsS0FBSyxNQUFqQixFQUF5QjtBQUNyQjBCLFVBQUFBLE9BQU8sZ0JBQUcsdURBQVY7QUFDSCxTQUZELE1BRU87QUFDSEEsVUFBQUEsT0FBTyxnQkFBRyx1REFBVjtBQUNIO0FBRUosT0FQRCxNQU9PO0FBQ0gsWUFBSUMsTUFBTSxHQUFHO0FBQ1RDLFVBQUFBLFFBQVEsRUFBRTtBQURELFNBQWI7O0FBR0EsWUFBRzVCLFNBQVMsS0FBSyxNQUFqQixFQUF5QjtBQUNyQjBCLFVBQUFBLE9BQU8sZ0JBQUc7QUFBRyxZQUFBLEtBQUssRUFBRUMsTUFBVjtBQUFrQixZQUFBLFNBQVMsRUFBQztBQUE1QixZQUFWO0FBQ0gsU0FGRCxNQUVPO0FBQ0hELFVBQUFBLE9BQU8sZ0JBQUc7QUFBRyxZQUFBLEtBQUssRUFBRUMsTUFBVjtBQUFrQixZQUFBLFNBQVMsRUFBQztBQUE1QixZQUFWO0FBQ0g7QUFDSjs7QUFFRCwwQkFBTztBQUFNLFFBQUEsT0FBTyxFQUFFLEtBQUtFLFNBQUwsQ0FBZU4sSUFBZixDQUFvQixJQUFwQixFQUEwQnZCLFNBQTFCLENBQWY7QUFBcUQsUUFBQSxTQUFTLEVBQUV5QjtBQUFoRSxTQUEwRUMsT0FBMUUsQ0FBUDtBQUNIOzs7dUNBRWtCO0FBQ2YsMEJBQ0k7QUFBSyxRQUFBLFNBQVMsRUFBQztBQUFmLHNCQUNJLG9EQURKLGVBRUksb0RBRkosZUFHSSxvREFISixlQUlJLG9EQUpKLGVBS0ksb0RBTEosZUFNSSxvREFOSixlQU9JLG9EQVBKLENBREo7QUFXSDs7O29EQUUrQjtBQUFBLHlCQUN5QyxLQUFLL0MsS0FEOUM7QUFBQSxVQUNyQkMsV0FEcUIsZ0JBQ3JCQSxXQURxQjtBQUFBLFVBQ1JHLGFBRFEsZ0JBQ1JBLGFBRFE7QUFBQSxVQUNPRyxXQURQLGdCQUNPQSxXQURQO0FBQUEsVUFDb0JHLGlCQURwQixnQkFDb0JBLGlCQURwQjtBQUc1QixVQUFNUSxXQUFXLEdBQUcsS0FBS0ksVUFBTCxDQUFnQnJCLFdBQWhCLEVBQTZCRyxhQUE3QixFQUE0Q0csV0FBNUMsQ0FBcEI7QUFDQSxVQUFNNEMsVUFBVSxHQUFHakMsV0FBVyxDQUFDVixNQUFaLENBQW1CLElBQW5CLENBQW5COztBQUVBLFVBQUl1QyxPQUFPLGdCQUNQLDJEQUNJO0FBQUcsUUFBQSxTQUFTLEVBQUM7QUFBYixRQURKLGVBRUk7QUFBTSxRQUFBLFNBQVMsRUFBQztBQUFoQixTQUNLOUMsV0FETCxPQUNtQmtELFVBRG5CLFVBQ3FDNUMsV0FEckMsQ0FGSixDQURKOztBQVNBLFVBQUdHLGlCQUFILEVBQXNCO0FBQ2xCcUMsUUFBQUEsT0FBTyxnQkFBRyxxREFBVjtBQUNIOztBQUVELGFBQU9BLE9BQVA7QUFDSDs7O3VDQUVrQjtBQUFBOztBQUFBLFVBQ1JLLFVBRFEsR0FDTSxLQUFLdEQsS0FEWCxDQUNSc0QsVUFEUTtBQUFBLHlCQUVzRCxLQUFLcEQsS0FGM0Q7QUFBQSxVQUVSQyxXQUZRLGdCQUVSQSxXQUZRO0FBQUEsVUFFS0csYUFGTCxnQkFFS0EsYUFGTDtBQUFBLFVBRW9CRyxXQUZwQixnQkFFb0JBLFdBRnBCO0FBQUEsVUFFaUNHLGlCQUZqQyxnQkFFaUNBLGlCQUZqQzs7QUFJZixVQUFHLENBQUMwQyxVQUFKLEVBQWdCO0FBQUU7QUFBUzs7QUFFM0IsVUFBSU4sT0FBTyxHQUFHLDRCQUFXLHVCQUFYLEVBQW9DO0FBQzlDLG1CQUFXcEM7QUFEbUMsT0FBcEMsQ0FBZDtBQUlBLFVBQU1RLFdBQVcsR0FBRyxLQUFLSSxVQUFMLENBQWdCckIsV0FBaEIsRUFBNkJHLGFBQTdCLEVBQTRDRyxXQUE1QyxDQUFwQjtBQUNBLFVBQU04QyxTQUFTLEdBQUdwRCxXQUFXLEtBQUssQ0FBaEIsR0FBb0JBLFdBQXBCLEdBQWtDaUIsV0FBVyxDQUFDVixNQUFaLENBQW1CLElBQW5CLENBQXBEO0FBQ0EsVUFBTTJDLFVBQVUsR0FBR2pDLFdBQVcsQ0FBQ1YsTUFBWixDQUFtQixJQUFuQixDQUFuQjtBQUVBLDBCQUNJO0FBQUssUUFBQSxTQUFTLEVBQUVzQztBQUFoQixzQkFDSTtBQUFLLFFBQUEsT0FBTyxFQUFFLEtBQUtKLGdCQUFMLENBQXNCRSxJQUF0QixDQUEyQixJQUEzQixDQUFkO0FBQWdELFFBQUEsU0FBUyxFQUFDO0FBQTFELFNBQ0ssS0FBS1UsNkJBQUwsRUFETCxDQURKLGVBSUk7QUFBSyxRQUFBLFNBQVMsRUFBQztBQUFmLHNCQUNJO0FBQUssUUFBQSxTQUFTLEVBQUM7QUFBZixzQkFDSTtBQUFPLFFBQUEsU0FBUyxFQUFDLGFBQWpCO0FBQ08sUUFBQSxHQUFHLEVBQUUsYUFBQ0MsQ0FBRCxFQUFPO0FBQUUsVUFBQSxNQUFJLENBQUNwRCxJQUFMLEdBQVlvRCxDQUFaO0FBQWdCLFNBRHJDO0FBRU8sUUFBQSxLQUFLLEVBQUVGLFNBRmQ7QUFHTyxRQUFBLElBQUksRUFBQyxRQUhaO0FBSU8sUUFBQSxHQUFHLEVBQUUsQ0FKWjtBQUtPLFFBQUEsR0FBRyxFQUFFLEVBTFo7QUFNTyxRQUFBLFNBQVMsRUFBRSxDQU5sQjtBQU9PLFFBQUEsUUFBUSxFQUFFLEtBQUtHLGdCQUFMLENBQXNCWixJQUF0QixDQUEyQixJQUEzQixDQVBqQjtBQVFPLFFBQUEsU0FBUyxFQUFFLEtBQUthLGFBQUwsQ0FBbUJiLElBQW5CLENBQXdCLElBQXhCLENBUmxCO0FBU08sUUFBQSxRQUFRLEVBQUM7QUFUaEIsUUFESixvQkFXSTtBQUFPLFFBQUEsU0FBUyxFQUFDLGVBQWpCO0FBQ08sUUFBQSxHQUFHLEVBQUUsYUFBQ2MsQ0FBRCxFQUFPO0FBQUUsVUFBQSxNQUFJLENBQUNwRCxNQUFMLEdBQWNvRCxDQUFkO0FBQWtCLFNBRHZDO0FBRU8sUUFBQSxLQUFLLEVBQUVQLFVBRmQ7QUFHTyxRQUFBLElBQUksRUFBQyxRQUhaO0FBSU8sUUFBQSxHQUFHLEVBQUUsQ0FKWjtBQUtPLFFBQUEsR0FBRyxFQUFFLEVBTFo7QUFNTyxRQUFBLFNBQVMsRUFBRSxDQU5sQjtBQU9PLFFBQUEsUUFBUSxFQUFFLEtBQUtRLGtCQUFMLENBQXdCZixJQUF4QixDQUE2QixJQUE3QixDQVBqQjtBQVFPLFFBQUEsU0FBUyxFQUFFLEtBQUthLGFBQUwsQ0FBbUJiLElBQW5CLENBQXdCLElBQXhCLENBUmxCO0FBU08sUUFBQSxRQUFRLEVBQUM7QUFUaEIsUUFYSixlQXFCSTtBQUFRLFFBQUEsU0FBUyxFQUFDLDJCQUFsQjtBQUNRLFFBQUEsR0FBRyxFQUFFLGFBQUNaLElBQUQsRUFBVTtBQUFFLFVBQUEsTUFBSSxDQUFDQSxJQUFMLEdBQVlBLElBQVo7QUFBbUIsU0FENUM7QUFFUSxRQUFBLEtBQUssRUFBRXpCLFdBRmY7QUFHUSxRQUFBLFFBQVEsRUFBRSxLQUFLcUQsZ0JBQUwsQ0FBc0JoQixJQUF0QixDQUEyQixJQUEzQixDQUhsQjtBQUlRLFFBQUEsUUFBUSxFQUFDO0FBSmpCLHNCQUtJO0FBQVEsUUFBQSxLQUFLLEVBQUM7QUFBZCxjQUxKLGVBTUk7QUFBUSxRQUFBLEtBQUssRUFBQztBQUFkLGNBTkosQ0FyQkosQ0FESixDQUpKLENBREo7QUF1Q0g7Ozs2QkFFUTtBQUFBLHdCQUMwRCxLQUFLOUMsS0FEL0Q7QUFBQSxVQUNFc0QsVUFERixlQUNFQSxVQURGO0FBQUEsVUFDY1MsT0FEZCxlQUNjQSxPQURkO0FBQUEsVUFDdUJDLE9BRHZCLGVBQ3VCQSxPQUR2QjtBQUFBLFVBQ2dDL0QsWUFEaEMsZUFDZ0NBLFlBRGhDO0FBQUEsVUFDOENnRSxRQUQ5QyxlQUM4Q0EsUUFEOUM7QUFBQSx5QkFFNkMsS0FBSy9ELEtBRmxEO0FBQUEsVUFFRUMsV0FGRixnQkFFRUEsV0FGRjtBQUFBLFVBRWVHLGFBRmYsZ0JBRWVBLGFBRmY7QUFBQSxVQUU4QkcsV0FGOUIsZ0JBRThCQSxXQUY5QjtBQUlMLFVBQU11QyxPQUFPLEdBQUcsNEJBQVcsWUFBWCxFQUF5QjtBQUNyQyx3QkFBZ0JNO0FBRHFCLE9BQXpCLENBQWhCO0FBR0EsVUFBTXhCLE9BQU8sR0FBRyxLQUFLTixVQUFMLENBQWdCckIsV0FBaEIsRUFBNkJHLGFBQTdCLEVBQTRDRyxXQUE1QyxDQUFoQjtBQUVBLDBCQUNJO0FBQUssUUFBQSxTQUFTLEVBQUV1QztBQUFoQixzQkFDSSw0Q0FDSyxLQUFLa0IsV0FBTCxDQUFpQixNQUFqQixDQURMLGVBRUksOENBQU9wQyxPQUFPLENBQUNwQixNQUFSLENBQWUsV0FBZixDQUFQLENBRkosRUFHSyxLQUFLd0QsV0FBTCxDQUFpQixTQUFqQixDQUhMLENBREosRUFNSyxLQUFLQyxnQkFBTCxFQU5MLGVBT0ksZ0NBQUMscUJBQUQ7QUFBVyxRQUFBLFFBQVEsRUFBRUYsUUFBckI7QUFBK0IsUUFBQSxZQUFZLEVBQUVoRSxZQUE3QztBQUEyRCxRQUFBLE9BQU8sRUFBRStELE9BQXBFO0FBQTZFLFFBQUEsT0FBTyxFQUFFRCxPQUF0RjtBQUErRixRQUFBLGVBQWUsRUFBRSxLQUFLSyxtQkFBTCxDQUF5QnRCLElBQXpCLENBQThCLElBQTlCLENBQWhIO0FBQXFKLFFBQUEsSUFBSSxFQUFFaEI7QUFBM0osUUFQSixFQVFLLEtBQUt1QyxnQkFBTCxFQVJMLENBREo7QUFZSDs7OztFQXZUb0JDLGtCQUFNQyxTOztnQkFBekJ4RSxVLGVBRWlCO0FBQ2ZpRSxFQUFBQSxPQUFPLEVBQUVRLHNCQUFVQyxVQUFWLENBQXFCQywwQkFBckIsQ0FETTtBQUVmWCxFQUFBQSxPQUFPLEVBQUVTLHNCQUFVQyxVQUFWLENBQXFCQywwQkFBckIsQ0FGTTtBQUdmekUsRUFBQUEsWUFBWSxFQUFFdUUsc0JBQVVDLFVBQVYsQ0FBcUJDLDBCQUFyQixDQUhDO0FBRzZCO0FBQzVDcEIsRUFBQUEsVUFBVSxFQUFFa0Isc0JBQVVHO0FBSlAsQzs7QUF5VHZCQyxNQUFNLENBQUNDLE9BQVAsR0FBaUI5RSxVQUFqQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3RET00gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudC10aW1lem9uZSc7XG5pbXBvcnQgTW9udGhWaWV3IGZyb20gJy4vbW9udGgtdmlldyc7XG5pbXBvcnQgY2xhc3NuYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuY2xhc3MgRGF0ZVBpY2tlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBtaW5EYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihtb21lbnQpLFxuICAgICAgICBtYXhEYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihtb21lbnQpLFxuICAgICAgICBzZWxlY3RlZERhdGU6IFByb3BUeXBlcy5pbnN0YW5jZU9mKG1vbWVudCksIC8vIHRvZG8gdmFsaWRhdGUgdGhhdCBpdCdzIGJldHdlZW4gbWluIGFuZCBtYXhcbiAgICAgICAgZW5hYmxlVGltZTogUHJvcFR5cGVzLmJvb2xcbiAgICB9O1xuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICBjb25zdCB7c2VsZWN0ZWREYXRlfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIGN1cnJlbnRIb3VyOiB0aGlzLmdldEhvdXJJbjEyRm9ybWF0KHNlbGVjdGVkRGF0ZS5ob3VyKCkpLFxuICAgICAgICAgICAgY3VycmVudE1pbnV0ZTogdGhpcy5nZXRNaW51dGVGb3JtYXR0ZWQoc2VsZWN0ZWREYXRlLm1pbnV0ZSgpKSxcbiAgICAgICAgICAgIGN1cnJlbnRBbXBtOiBzZWxlY3RlZERhdGUuZm9ybWF0KFwiYVwiKSxcbiAgICAgICAgICAgIGN1cnJlbnREYXRlV2l0aG91dFRpbWU6IHNlbGVjdGVkRGF0ZSxcbiAgICAgICAgICAgIHRpbWVwaWNrZXJWaXNpYmxlOiBmYWxzZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJlc2V0KCkge1xuICAgICAgICBjb25zdCB7c2VsZWN0ZWREYXRlfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjdXJyZW50SG91cjogdGhpcy5nZXRIb3VySW4xMkZvcm1hdChzZWxlY3RlZERhdGUuaG91cigpKSxcbiAgICAgICAgICAgIGN1cnJlbnRNaW51dGU6IHRoaXMuZ2V0TWludXRlRm9ybWF0dGVkKHNlbGVjdGVkRGF0ZS5taW51dGUoKSksXG4gICAgICAgICAgICBjdXJyZW50QW1wbTogc2VsZWN0ZWREYXRlLmZvcm1hdChcImFcIiksXG4gICAgICAgICAgICBjdXJyZW50RGF0ZVdpdGhvdXRUaW1lOiBzZWxlY3RlZERhdGUsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdldEhvdXJJbjEyRm9ybWF0KGhvdXJWYWwpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IGhvdXJWYWw7XG4gICAgICAgIGlmIChyZXN1bHQgPCAwKSB7XG4gICAgICAgICAgICByZXN1bHQgPSAwO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCA9IHBhcnNlSW50KHJlc3VsdCk7XG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdCAlIDEyO1xuICAgICAgICBpZiAocmVzdWx0ID09PSAwKSB7XG4gICAgICAgICAgICByZXN1bHQgPSAxMjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGdldE1pbnV0ZUZvcm1hdHRlZChtaW51dGVWYWwpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IG1pbnV0ZVZhbDtcbiAgICAgICAgaWYgKHJlc3VsdCA8IDApIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0ID0gcGFyc2VJbnQocmVzdWx0KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdCAlIDYwO1xuICAgIH1cblxuICAgIGdldERhdGVPYmooY3VycmVudEhvdXIsIGN1cnJlbnRNaW51dGUsIGN1cnJlbnRBbXBtLCBuZXdEYXRlKSB7XG4gICAgICAgIGNvbnN0IHtjdXJyZW50RGF0ZVdpdGhvdXRUaW1lfSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgICAgY29uc3QgZGF0ZVRvVXNlID0gbmV3RGF0ZSA/IG5ld0RhdGUgOiBjdXJyZW50RGF0ZVdpdGhvdXRUaW1lO1xuXG4gICAgICAgIGNvbnN0IGN1cnJlbnREYXRlID0gZGF0ZVRvVXNlLmNsb25lKCk7XG4gICAgICAgIGxldCBob3VySW4yNCA9IGN1cnJlbnRIb3VyO1xuICAgICAgICBpZiAoY3VycmVudEFtcG0gPT09IFwiYW1cIiAmJiBjdXJyZW50SG91ciA9PT0gMTIpIHtcbiAgICAgICAgICAgIGhvdXJJbjI0ID0gMDtcbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50QW1wbSA9PT0gXCJwbVwiICYmIGN1cnJlbnRIb3VyIDwgMTIpIHtcbiAgICAgICAgICAgIGhvdXJJbjI0ICs9IDEyO1xuICAgICAgICB9XG5cbiAgICAgICAgY3VycmVudERhdGUuaG91cihob3VySW4yNCk7XG4gICAgICAgIGN1cnJlbnREYXRlLm1pbnV0ZShjdXJyZW50TWludXRlKTtcblxuICAgICAgICByZXR1cm4gY3VycmVudERhdGU7XG4gICAgfVxuXG4gICAgc2hpZnREYXRlKGRpcmVjdGlvbikge1xuICAgICAgICBjb25zdCB7Y3VycmVudEhvdXIsIGN1cnJlbnRNaW51dGUsIGN1cnJlbnRBbXBtfSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgICAgbGV0IGN1cnJlbnREYXRlID0gdGhpcy5nZXREYXRlT2JqKGN1cnJlbnRIb3VyLCBjdXJyZW50TWludXRlLCBjdXJyZW50QW1wbSk7XG4gICAgICAgIGlmKGRpcmVjdGlvbiA9PT0gXCJiYWNrXCIpIHtcbiAgICAgICAgICAgIGN1cnJlbnREYXRlID0gY3VycmVudERhdGUuc3VidHJhY3QoMSwgXCJtb250aHNcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjdXJyZW50RGF0ZSA9IGN1cnJlbnREYXRlLmFkZCgxLCBcIm1vbnRoc1wiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY3VycmVudEhvdXIsXG4gICAgICAgICAgICBjdXJyZW50TWludXRlLFxuICAgICAgICAgICAgY3VycmVudEFtcG0sXG4gICAgICAgICAgICBjdXJyZW50RGF0ZVdpdGhvdXRUaW1lOiBjdXJyZW50RGF0ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlRGF0ZVNlbGVjdGlvbihkYXRlLCBvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IHtoYW5kbGVTZWxlY3Rpb259ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3Qge2N1cnJlbnRIb3VyLCBjdXJyZW50TWludXRlLCBjdXJyZW50QW1wbX0gPSB0aGlzLnN0YXRlO1xuXG4gICAgICAgIGNvbnN0IGRhdGVPYmogPSB0aGlzLmdldERhdGVPYmooY3VycmVudEhvdXIsIGN1cnJlbnRNaW51dGUsIGN1cnJlbnRBbXBtLCBkYXRlKTtcbiAgICAgICAgaGFuZGxlU2VsZWN0aW9uKGRhdGVPYmosIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGhhbmRsZVRpbWVTZWxlY3Rpb24oZGF0ZSwgb3B0aW9ucykge1xuICAgICAgICBjb25zdCB7aGFuZGxlU2VsZWN0aW9ufSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgaGFuZGxlU2VsZWN0aW9uKGRhdGUsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGhhbmRsZUhvdXJDaGFuZ2UoKSB7XG4gICAgICAgIGxldCBob3VyVmFsID0gdGhpcy5ob3VyLnZhbHVlID8gcGFyc2VJbnQodGhpcy5ob3VyLnZhbHVlKSA6IDA7XG4gICAgICAgIGhvdXJWYWwgPSBpc05hTihob3VyVmFsKSA/IDAgOiBob3VyVmFsO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY3VycmVudEhvdXI6IGhvdXJWYWwsXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGhhbmRsZU1pbnV0ZUNoYW5nZSgpIHtcbiAgICAgICAgY29uc3QgbWludXRlVmFsID0gdGhpcy5taW51dGUudmFsdWUgPyBwYXJzZUludCh0aGlzLm1pbnV0ZS52YWx1ZSkgOiAwO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY3VycmVudE1pbnV0ZTogbWludXRlVmFsLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVBbVBtQ2hhbmdlKCkge1xuICAgICAgICBjb25zdCB7Y3VycmVudEhvdXIsIGN1cnJlbnRNaW51dGV9ID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICBjb25zdCBhbXBtVmFsID0gdGhpcy5hbXBtLnZhbHVlO1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWRIciA9IHRoaXMuZ2V0SG91ckluMTJGb3JtYXQoY3VycmVudEhvdXIpO1xuICAgICAgICBjb25zdCBmb3JtYXR0ZWRNaW4gPSB0aGlzLmdldE1pbnV0ZUZvcm1hdHRlZChjdXJyZW50TWludXRlKTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGN1cnJlbnRIb3VyOiBmb3JtYXR0ZWRIcixcbiAgICAgICAgICAgIGN1cnJlbnRNaW51dGU6IGZvcm1hdHRlZE1pbixcbiAgICAgICAgICAgIGN1cnJlbnRBbXBtOiBhbXBtVmFsLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBkYXRlT2JqID0gdGhpcy5nZXREYXRlT2JqKGZvcm1hdHRlZEhyLCBmb3JtYXR0ZWRNaW4sIGFtcG1WYWwpO1xuICAgICAgICB0aGlzLmhhbmRsZVRpbWVTZWxlY3Rpb24oZGF0ZU9iaiwge2NvbGxhcHNlOiBmYWxzZX0pO1xuICAgIH1cblxuICAgIGhhbmRsZUtleURvd24oZSkge1xuICAgICAgICBjb25zdCB7Y3VycmVudEhvdXIsIGN1cnJlbnRNaW51dGV9ID0gdGhpcy5zdGF0ZTtcbiAgICAgICAgdmFyIGtleSA9IGUud2hpY2ggfHwgZS5rZXlDb2RlLFxuICAgICAgICAgICAgd2FzRW50ZXIgPSBrZXkgPT09IDEzO1xuXG4gICAgICAgIGlmKHdhc0VudGVyKSB7XG4gICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWRIciA9IHRoaXMuZ2V0SG91ckluMTJGb3JtYXQoY3VycmVudEhvdXIpO1xuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkTWluID0gdGhpcy5nZXRNaW51dGVGb3JtYXR0ZWQoY3VycmVudE1pbnV0ZSk7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBjdXJyZW50SG91cjogZm9ybWF0dGVkSHIsXG4gICAgICAgICAgICAgICAgY3VycmVudE1pbnV0ZTogZm9ybWF0dGVkTWluLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnRvZ2dsZVRpbWVwaWNrZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZVRpbWVwaWNrZXIoKSB7XG4gICAgICAgIGNvbnN0IHtjdXJyZW50SG91ciwgY3VycmVudE1pbnV0ZSwgY3VycmVudEFtcG0sIHRpbWVwaWNrZXJWaXNpYmxlfSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgICAgY29uc3Qgd2FzT3BlbkJ1dE5vd1Nob3VsZEJlQ2xvc2VkID0gdGltZXBpY2tlclZpc2libGU7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICB0aW1lcGlja2VyVmlzaWJsZTogIXRpbWVwaWNrZXJWaXNpYmxlXG4gICAgICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYod2FzT3BlbkJ1dE5vd1Nob3VsZEJlQ2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZU9iaiA9IHRoaXMuZ2V0RGF0ZU9iaihjdXJyZW50SG91ciwgY3VycmVudE1pbnV0ZSwgY3VycmVudEFtcG0pO1xuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlVGltZVNlbGVjdGlvbihkYXRlT2JqLCB7XG4gICAgICAgICAgICAgICAgICAgIGNvbGxhcHNlOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICB9XG5cbiAgICByZW5kZXJBcnJvdyhkaXJlY3Rpb24pIHtcbiAgICAgICAgY29uc3Qge2lnbm9yZUZvbnRBd2Vzb21lfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgdmFyIGNsYXNzZXMgPSBcIm1vbnRoLXN3aXRjaGVyIFwiICsgZGlyZWN0aW9uLCBjb250ZW50O1xuICAgICAgICBpZihpZ25vcmVGb250QXdlc29tZSkge1xuICAgICAgICAgICAgaWYoZGlyZWN0aW9uID09PSBcImJhY2tcIikge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSA8c3Bhbj4mbHNhcXVvOzwvc3Bhbj47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSA8c3Bhbj4mcnNhcXVvOzwvc3Bhbj47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBzdHlsZXMgPSB7XG4gICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMTNweFwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihkaXJlY3Rpb24gPT09IFwiYmFja1wiKSB7XG4gICAgICAgICAgICAgICAgY29udGVudCA9IDxpIHN0eWxlPXtzdHlsZXN9IGNsYXNzTmFtZT1cImZhIGZhLWNoZXZyb24tbGVmdFwiPjwvaT47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSA8aSBzdHlsZT17c3R5bGVzfSBjbGFzc05hbWU9XCJmYSBmYS1jaGV2cm9uLXJpZ2h0XCI+PC9pPjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiA8c3BhbiBvbkNsaWNrPXt0aGlzLnNoaWZ0RGF0ZS5iaW5kKHRoaXMsIGRpcmVjdGlvbil9IGNsYXNzTmFtZT17Y2xhc3Nlc30+e2NvbnRlbnR9PC9zcGFuPlxuICAgIH1cblxuICAgIHJlbmRlckRheUxldHRlcnMoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRhdGVwaWNrZXItZGF5LWhlYWRlcnNcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5TVU48L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+TU9OPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuPlRVRTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5XRUQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+VEhVPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuPkZSSTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5TQVQ8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJUaW1lUGlja2VySGVhZGVyQ29udGVudCgpIHtcbiAgICAgICAgY29uc3Qge2N1cnJlbnRIb3VyLCBjdXJyZW50TWludXRlLCBjdXJyZW50QW1wbSwgdGltZXBpY2tlclZpc2libGV9ID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICBjb25zdCBjdXJyZW50RGF0ZSA9IHRoaXMuZ2V0RGF0ZU9iaihjdXJyZW50SG91ciwgY3VycmVudE1pbnV0ZSwgY3VycmVudEFtcG0pO1xuICAgICAgICBjb25zdCBkaXNwbGF5TWluID0gY3VycmVudERhdGUuZm9ybWF0KFwibW1cIik7XG5cbiAgICAgICAgdmFyIGNvbnRlbnQgPSAoXG4gICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAgICA8aSBjbGFzc05hbWU9XCJmYSBmYS1jbG9jay1vXCI+PC9pPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhlYWRlci10aW1lXCI+XG4gICAgICAgICAgICAgICAgICAgIHtjdXJyZW50SG91cn06e2Rpc3BsYXlNaW59Jm5ic3A7e2N1cnJlbnRBbXBtfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgKTtcblxuICAgICAgICBpZih0aW1lcGlja2VyVmlzaWJsZSkge1xuICAgICAgICAgICAgY29udGVudCA9IDxzcGFuPmRvbmU8L3NwYW4+XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29udGVudDtcbiAgICB9XG5cbiAgICByZW5kZXJUaW1lUGlja2VyKCkge1xuICAgICAgICBjb25zdCB7ZW5hYmxlVGltZX0gPSB0aGlzLnByb3BzO1xuICAgICAgICBjb25zdCB7Y3VycmVudEhvdXIsIGN1cnJlbnRNaW51dGUsIGN1cnJlbnRBbXBtLCB0aW1lcGlja2VyVmlzaWJsZX0gPSB0aGlzLnN0YXRlO1xuXG4gICAgICAgIGlmKCFlbmFibGVUaW1lKSB7IHJldHVybjsgfVxuXG4gICAgICAgIHZhciBjbGFzc2VzID0gY2xhc3NuYW1lcyhcImRhdGVwaWNrZXItdGltZXBpY2tlclwiLCB7XG4gICAgICAgICAgICBcInZpc2libGVcIjogdGltZXBpY2tlclZpc2libGVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgY3VycmVudERhdGUgPSB0aGlzLmdldERhdGVPYmooY3VycmVudEhvdXIsIGN1cnJlbnRNaW51dGUsIGN1cnJlbnRBbXBtKTtcbiAgICAgICAgY29uc3QgZGlzcGxheUhyID0gY3VycmVudEhvdXIgPT09IDAgPyBjdXJyZW50SG91ciA6IGN1cnJlbnREYXRlLmZvcm1hdChcImhoXCIpO1xuICAgICAgICBjb25zdCBkaXNwbGF5TWluID0gY3VycmVudERhdGUuZm9ybWF0KFwibW1cIik7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzfT5cbiAgICAgICAgICAgICAgICA8ZGl2IG9uQ2xpY2s9e3RoaXMudG9nZ2xlVGltZXBpY2tlci5iaW5kKHRoaXMpfSBjbGFzc05hbWU9XCJkYXRlcGlja2VyLXRpbWVwaWNrZXItaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclRpbWVQaWNrZXJIZWFkZXJDb250ZW50KCl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lcGlja2VyLWlucHV0c1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlucHV0LXJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cImlucHV0LWhvdXJzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9eyhoKSA9PiB7IHRoaXMuaG91ciA9IGg7IH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2Rpc3BsYXlIcn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW49ezF9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4PXsxMn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhMZW5ndGg9ezJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlSG91ckNoYW5nZS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9XCItMVwiIC8+OlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cImlucHV0LW1pbnV0ZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17KG0pID0+IHsgdGhpcy5taW51dGUgPSBtOyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtkaXNwbGF5TWlufVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbj17MH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXg9ezU5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heExlbmd0aD17Mn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVNaW51dGVDaGFuZ2UuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PVwiLTFcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJhbXBtLXBpY2tlciBpZ25vcmUtY2hvc2VuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXsoYW1wbSkgPT4geyB0aGlzLmFtcG0gPSBhbXBtOyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Y3VycmVudEFtcG19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUFtUG1DaGFuZ2UuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9XCItMVwiID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYW1cIj5BTTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJwbVwiPlBNPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtlbmFibGVUaW1lLCBtYXhEYXRlLCBtaW5EYXRlLCBzZWxlY3RlZERhdGUsIHRpbWV6b25lfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IHtjdXJyZW50SG91ciwgY3VycmVudE1pbnV0ZSwgY3VycmVudEFtcG19ID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICBjb25zdCBjbGFzc2VzID0gY2xhc3NuYW1lcyhcImRhdGVwaWNrZXJcIiwge1xuICAgICAgICAgICAgXCJ0aW1lLWVuYWJsZWRcIjogZW5hYmxlVGltZVxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZGF0ZU9iaiA9IHRoaXMuZ2V0RGF0ZU9iaihjdXJyZW50SG91ciwgY3VycmVudE1pbnV0ZSwgY3VycmVudEFtcG0pO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3Nlc30+XG4gICAgICAgICAgICAgICAgPGgzPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJBcnJvdyhcImJhY2tcIil9XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPntkYXRlT2JqLmZvcm1hdChcIk1NTU0gWVlZWVwiKX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckFycm93KFwiZm9yd2FyZFwiKX1cbiAgICAgICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckRheUxldHRlcnMoKX1cbiAgICAgICAgICAgICAgICA8TW9udGhWaWV3IHRpbWV6b25lPXt0aW1lem9uZX0gc2VsZWN0ZWREYXRlPXtzZWxlY3RlZERhdGV9IG1pbkRhdGU9e21pbkRhdGV9IG1heERhdGU9e21heERhdGV9IGhhbmRsZVNlbGVjdGlvbj17dGhpcy5oYW5kbGVEYXRlU2VsZWN0aW9uLmJpbmQodGhpcyl9IGRhdGU9e2RhdGVPYmp9IC8+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyVGltZVBpY2tlcigpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gRGF0ZVBpY2tlcjtcbiJdfQ==
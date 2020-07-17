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
      console.log("HANNA FORMATTING HOUR " + hourVal);
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
      console.log("HANNA FORMATTING MINUTE ", minuteVal);
      var result = minuteVal;

      if (result < 0) {
        result = 0;
      }

      result = parseInt(result);
      return result % 60;
    }
  }, {
    key: "getCurrentDateObj",
    value: function getCurrentDateObj(currentHour, currentMinute, currentAmpm) {
      var currentDateWithoutTime = this.state.currentDateWithoutTime;
      var currentDate = currentDateWithoutTime.clone();
      var hourIn24 = currentHour;

      if (currentAmpm === "am" && currentHour === 12) {
        hourIn24 = 0;
      } else if (currentAmpm === "pm" && currentHour < 12) {
        hourIn24 += 12;
      }

      console.log("HANNA 24 HR ", hourIn24);
      currentDate.hour(hourIn24);
      currentDate.minute(currentMinute);
      console.log("HANNA CURRENT DATE ", currentDate);
      return currentDate;
    }
  }, {
    key: "shiftDate",
    value: function shiftDate(direction) {
      var _this$state = this.state,
          currentHour = _this$state.currentHour,
          currentMinute = _this$state.currentMinute,
          currentAmpm = _this$state.currentAmpm;
      var currentDate = this.getCurrentDateObj(currentHour, currentMinute, currentAmpm);

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
    key: "handleSelection",
    value: function handleSelection(date, options) {
      this.props.handleSelection(date, options);
    }
  }, {
    key: "handleHourChange",
    value: function handleHourChange() {
      console.log("HANNA NAN CHECK ", this.hour.value, parseInt(this.hour.value), this.hour.value === '', this.hour.value === "");
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
      var _this$state2 = this.state,
          currentHour = _this$state2.currentHour,
          currentMinute = _this$state2.currentMinute;
      var ampmVal = this.ampm.value;
      var formattedHr = this.getHourIn12Format(currentHour);
      var formattedMin = this.getMinuteFormatted(currentMinute);
      this.setState({
        currentHour: formattedHr,
        currentMinute: formattedMin,
        currentAmpm: ampmVal
      });
      var dateObj = this.getCurrentDateObj(formattedHr, formattedMin, ampmVal);
      this.handleSelection(dateObj, {
        collapse: false
      });
    }
  }, {
    key: "handleKeyDown",
    value: function handleKeyDown(e) {
      var _this$state3 = this.state,
          currentHour = _this$state3.currentHour,
          currentMinute = _this$state3.currentMinute;
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
      var _this$state4 = this.state,
          currentHour = _this$state4.currentHour,
          currentMinute = _this$state4.currentMinute,
          currentAmpm = _this$state4.currentAmpm,
          timepickerVisible = _this$state4.timepickerVisible;
      var wasOpenButNowShouldBeClosed = timepickerVisible;
      console.log("HANNA TIMEPICKER VISIBLE ", timepickerVisible);
      this.setState({
        timepickerVisible: !timepickerVisible
      }, function () {
        if (wasOpenButNowShouldBeClosed) {
          var dateObj = this.getCurrentDateObj(currentHour, currentMinute, currentAmpm);
          console.log("HANNA - HANDLING SELECTION ", dateObj);
          this.handleSelection(dateObj, {
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
      var _this$state5 = this.state,
          currentHour = _this$state5.currentHour,
          currentMinute = _this$state5.currentMinute,
          currentAmpm = _this$state5.currentAmpm,
          timepickerVisible = _this$state5.timepickerVisible;
      var currentDate = this.getCurrentDateObj(currentHour, currentMinute, currentAmpm);
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
      var _this$state6 = this.state,
          currentHour = _this$state6.currentHour,
          currentMinute = _this$state6.currentMinute,
          currentAmpm = _this$state6.currentAmpm,
          timepickerVisible = _this$state6.timepickerVisible;

      if (!enableTime) {
        return;
      }

      console.log("HANNA - STATE.HOUR", currentHour);
      var classes = (0, _classnames["default"])("datepicker-timepicker", {
        "visible": timepickerVisible
      });
      var currentDate = this.getCurrentDateObj(currentHour, currentMinute, currentAmpm);
      var displayHr = currentHour === 0 ? currentHour : currentDate.format("hh");
      var displayMin = currentDate.format("mm");
      console.log("HANNA CURRENT DATE MINUTE", currentDate.minute());
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
      var _this$state7 = this.state,
          currentHour = _this$state7.currentHour,
          currentMinute = _this$state7.currentMinute,
          currentAmpm = _this$state7.currentAmpm;
      var classes = (0, _classnames["default"])("datepicker", {
        "time-enabled": enableTime
      });
      var dateObj = this.getCurrentDateObj(currentHour, currentMinute, currentAmpm);
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: classes
      }, /*#__PURE__*/_react["default"].createElement("h3", null, this.renderArrow("back"), /*#__PURE__*/_react["default"].createElement("span", null, dateObj.format("MMMM YYYY")), this.renderArrow("forward")), this.renderDayLetters(), /*#__PURE__*/_react["default"].createElement(_monthView["default"], {
        timezone: timezone,
        selectedDate: selectedDate,
        minDate: minDate,
        maxDate: maxDate,
        handleSelection: this.handleSelection.bind(this),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9qcy9kYXRlLXZpZXcuanN4Il0sIm5hbWVzIjpbIkRhdGVQaWNrZXIiLCJwcm9wcyIsInNlbGVjdGVkRGF0ZSIsInN0YXRlIiwiY3VycmVudEhvdXIiLCJnZXRIb3VySW4xMkZvcm1hdCIsImhvdXIiLCJjdXJyZW50TWludXRlIiwiZ2V0TWludXRlRm9ybWF0dGVkIiwibWludXRlIiwiY3VycmVudEFtcG0iLCJmb3JtYXQiLCJjdXJyZW50RGF0ZVdpdGhvdXRUaW1lIiwidGltZXBpY2tlclZpc2libGUiLCJzZXRTdGF0ZSIsImhvdXJWYWwiLCJjb25zb2xlIiwibG9nIiwicmVzdWx0IiwicGFyc2VJbnQiLCJtaW51dGVWYWwiLCJjdXJyZW50RGF0ZSIsImNsb25lIiwiaG91ckluMjQiLCJkaXJlY3Rpb24iLCJnZXRDdXJyZW50RGF0ZU9iaiIsInN1YnRyYWN0IiwiYWRkIiwiZGF0ZSIsIm9wdGlvbnMiLCJoYW5kbGVTZWxlY3Rpb24iLCJ2YWx1ZSIsImlzTmFOIiwiYW1wbVZhbCIsImFtcG0iLCJmb3JtYXR0ZWRIciIsImZvcm1hdHRlZE1pbiIsImRhdGVPYmoiLCJjb2xsYXBzZSIsImUiLCJrZXkiLCJ3aGljaCIsImtleUNvZGUiLCJ3YXNFbnRlciIsInRvZ2dsZVRpbWVwaWNrZXIiLCJ3YXNPcGVuQnV0Tm93U2hvdWxkQmVDbG9zZWQiLCJiaW5kIiwiaWdub3JlRm9udEF3ZXNvbWUiLCJjbGFzc2VzIiwiY29udGVudCIsInN0eWxlcyIsImZvbnRTaXplIiwic2hpZnREYXRlIiwiZGlzcGxheU1pbiIsImVuYWJsZVRpbWUiLCJkaXNwbGF5SHIiLCJyZW5kZXJUaW1lUGlja2VySGVhZGVyQ29udGVudCIsImgiLCJoYW5kbGVIb3VyQ2hhbmdlIiwiaGFuZGxlS2V5RG93biIsIm0iLCJoYW5kbGVNaW51dGVDaGFuZ2UiLCJoYW5kbGVBbVBtQ2hhbmdlIiwibWF4RGF0ZSIsIm1pbkRhdGUiLCJ0aW1lem9uZSIsInJlbmRlckFycm93IiwicmVuZGVyRGF5TGV0dGVycyIsInJlbmRlclRpbWVQaWNrZXIiLCJSZWFjdCIsIkNvbXBvbmVudCIsIlByb3BUeXBlcyIsImluc3RhbmNlT2YiLCJtb21lbnQiLCJib29sIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVNQSxVOzs7OztBQVNGLHNCQUFZQyxLQUFaLEVBQW1CO0FBQUE7O0FBQUE7O0FBQ2YsOEJBQU1BLEtBQU47QUFEZSxRQUVSQyxZQUZRLEdBRVEsTUFBS0QsS0FGYixDQUVSQyxZQUZRO0FBSWYsVUFBS0MsS0FBTCxHQUFhO0FBQ1RDLE1BQUFBLFdBQVcsRUFBRSxNQUFLQyxpQkFBTCxDQUF1QkgsWUFBWSxDQUFDSSxJQUFiLEVBQXZCLENBREo7QUFFVEMsTUFBQUEsYUFBYSxFQUFFLE1BQUtDLGtCQUFMLENBQXdCTixZQUFZLENBQUNPLE1BQWIsRUFBeEIsQ0FGTjtBQUdUQyxNQUFBQSxXQUFXLEVBQUVSLFlBQVksQ0FBQ1MsTUFBYixDQUFvQixHQUFwQixDQUhKO0FBSVRDLE1BQUFBLHNCQUFzQixFQUFFVixZQUpmO0FBS1RXLE1BQUFBLGlCQUFpQixFQUFFO0FBTFYsS0FBYjtBQUplO0FBV2xCOzs7OzRCQUVPO0FBQUEsVUFDR1gsWUFESCxHQUNtQixLQUFLRCxLQUR4QixDQUNHQyxZQURIO0FBR0osV0FBS1ksUUFBTCxDQUFjO0FBQ1ZWLFFBQUFBLFdBQVcsRUFBRSxLQUFLQyxpQkFBTCxDQUF1QkgsWUFBWSxDQUFDSSxJQUFiLEVBQXZCLENBREg7QUFFVkMsUUFBQUEsYUFBYSxFQUFFLEtBQUtDLGtCQUFMLENBQXdCTixZQUFZLENBQUNPLE1BQWIsRUFBeEIsQ0FGTDtBQUdWQyxRQUFBQSxXQUFXLEVBQUVSLFlBQVksQ0FBQ1MsTUFBYixDQUFvQixHQUFwQixDQUhIO0FBSVZDLFFBQUFBLHNCQUFzQixFQUFFVjtBQUpkLE9BQWQ7QUFNSDs7O3NDQUVp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UUFBQSxJQUFJLEVBQUVUO0FBQXZKLFFBUEosRUFRSyxLQUFLK0IsZ0JBQUwsRUFSTCxDQURKO0FBWUg7Ozs7RUF6VG9CQyxrQkFBTUMsUzs7Z0JBQXpCdEUsVSxlQUVpQjtBQUNmZ0UsRUFBQUEsT0FBTyxFQUFFTyxzQkFBVUMsVUFBVixDQUFxQkMsMEJBQXJCLENBRE07QUFFZlYsRUFBQUEsT0FBTyxFQUFFUSxzQkFBVUMsVUFBVixDQUFxQkMsMEJBQXJCLENBRk07QUFHZnZFLEVBQUFBLFlBQVksRUFBRXFFLHNCQUFVQyxVQUFWLENBQXFCQywwQkFBckIsQ0FIQztBQUc2QjtBQUM1Q25CLEVBQUFBLFVBQVUsRUFBRWlCLHNCQUFVRztBQUpQLEM7O0FBMlR2QkMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCNUUsVUFBakIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQtdGltZXpvbmUnO1xuaW1wb3J0IE1vbnRoVmlldyBmcm9tICcuL21vbnRoLXZpZXcnO1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmNsYXNzIERhdGVQaWNrZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgc3RhdGljIHByb3BUeXBlcyA9IHtcbiAgICAgICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YobW9tZW50KSxcbiAgICAgICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YobW9tZW50KSxcbiAgICAgICAgc2VsZWN0ZWREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihtb21lbnQpLCAvLyB0b2RvIHZhbGlkYXRlIHRoYXQgaXQncyBiZXR3ZWVuIG1pbiBhbmQgbWF4XG4gICAgICAgIGVuYWJsZVRpbWU6IFByb3BUeXBlcy5ib29sXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgY29uc3Qge3NlbGVjdGVkRGF0ZX0gPSB0aGlzLnByb3BzO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBjdXJyZW50SG91cjogdGhpcy5nZXRIb3VySW4xMkZvcm1hdChzZWxlY3RlZERhdGUuaG91cigpKSxcbiAgICAgICAgICAgIGN1cnJlbnRNaW51dGU6IHRoaXMuZ2V0TWludXRlRm9ybWF0dGVkKHNlbGVjdGVkRGF0ZS5taW51dGUoKSksXG4gICAgICAgICAgICBjdXJyZW50QW1wbTogc2VsZWN0ZWREYXRlLmZvcm1hdChcImFcIiksXG4gICAgICAgICAgICBjdXJyZW50RGF0ZVdpdGhvdXRUaW1lOiBzZWxlY3RlZERhdGUsXG4gICAgICAgICAgICB0aW1lcGlja2VyVmlzaWJsZTogZmFsc2VcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXNldCgpIHtcbiAgICAgICAgY29uc3Qge3NlbGVjdGVkRGF0ZX0gPSB0aGlzLnByb3BzO1xuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY3VycmVudEhvdXI6IHRoaXMuZ2V0SG91ckluMTJGb3JtYXQoc2VsZWN0ZWREYXRlLmhvdXIoKSksXG4gICAgICAgICAgICBjdXJyZW50TWludXRlOiB0aGlzLmdldE1pbnV0ZUZvcm1hdHRlZChzZWxlY3RlZERhdGUubWludXRlKCkpLFxuICAgICAgICAgICAgY3VycmVudEFtcG06IHNlbGVjdGVkRGF0ZS5mb3JtYXQoXCJhXCIpLFxuICAgICAgICAgICAgY3VycmVudERhdGVXaXRob3V0VGltZTogc2VsZWN0ZWREYXRlLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZXRIb3VySW4xMkZvcm1hdChob3VyVmFsKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSEFOTkEgRk9STUFUVElORyBIT1VSIFwiICsgaG91clZhbCk7XG4gICAgICAgIGxldCByZXN1bHQgPSBob3VyVmFsO1xuICAgICAgICBpZiAocmVzdWx0IDwgMCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gMDtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHQgPSBwYXJzZUludChyZXN1bHQpO1xuICAgICAgICByZXN1bHQgPSByZXN1bHQgJSAxMjtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gMCkge1xuICAgICAgICAgICAgcmVzdWx0ID0gMTI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBnZXRNaW51dGVGb3JtYXR0ZWQobWludXRlVmFsKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSEFOTkEgRk9STUFUVElORyBNSU5VVEUgXCIsIG1pbnV0ZVZhbCk7XG4gICAgICAgIGxldCByZXN1bHQgPSBtaW51dGVWYWw7XG4gICAgICAgIGlmIChyZXN1bHQgPCAwKSB7XG4gICAgICAgICAgICByZXN1bHQgPSAwO1xuICAgICAgICB9XG4gICAgICAgIHJlc3VsdCA9IHBhcnNlSW50KHJlc3VsdCk7XG4gICAgICAgIHJldHVybiByZXN1bHQgJSA2MDtcbiAgICB9XG5cbiAgICBnZXRDdXJyZW50RGF0ZU9iaihjdXJyZW50SG91ciwgY3VycmVudE1pbnV0ZSwgY3VycmVudEFtcG0pIHtcbiAgICAgICAgY29uc3Qge2N1cnJlbnREYXRlV2l0aG91dFRpbWV9ID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICBjb25zdCBjdXJyZW50RGF0ZSA9IGN1cnJlbnREYXRlV2l0aG91dFRpbWUuY2xvbmUoKTtcbiAgICAgICAgbGV0IGhvdXJJbjI0ID0gY3VycmVudEhvdXI7XG4gICAgICAgIGlmIChjdXJyZW50QW1wbSA9PT0gXCJhbVwiICYmIGN1cnJlbnRIb3VyID09PSAxMikge1xuICAgICAgICAgICAgaG91ckluMjQgPSAwO1xuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRBbXBtID09PSBcInBtXCIgJiYgY3VycmVudEhvdXIgPCAxMikge1xuICAgICAgICAgICAgaG91ckluMjQgKz0gMTI7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zb2xlLmxvZyhcIkhBTk5BIDI0IEhSIFwiLCBob3VySW4yNCk7XG5cbiAgICAgICAgY3VycmVudERhdGUuaG91cihob3VySW4yNCk7XG4gICAgICAgIGN1cnJlbnREYXRlLm1pbnV0ZShjdXJyZW50TWludXRlKTtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIkhBTk5BIENVUlJFTlQgREFURSBcIiwgY3VycmVudERhdGUpO1xuXG4gICAgICAgIHJldHVybiBjdXJyZW50RGF0ZTtcbiAgICB9XG5cbiAgICBzaGlmdERhdGUoZGlyZWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IHtjdXJyZW50SG91ciwgY3VycmVudE1pbnV0ZSwgY3VycmVudEFtcG19ID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICBsZXQgY3VycmVudERhdGUgPSB0aGlzLmdldEN1cnJlbnREYXRlT2JqKGN1cnJlbnRIb3VyLCBjdXJyZW50TWludXRlLCBjdXJyZW50QW1wbSk7XG4gICAgICAgIGlmKGRpcmVjdGlvbiA9PT0gXCJiYWNrXCIpIHtcbiAgICAgICAgICAgIGN1cnJlbnREYXRlID0gY3VycmVudERhdGUuc3VidHJhY3QoMSwgXCJtb250aHNcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjdXJyZW50RGF0ZSA9IGN1cnJlbnREYXRlLmFkZCgxLCBcIm1vbnRoc1wiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgY3VycmVudEhvdXIsXG4gICAgICAgICAgICBjdXJyZW50TWludXRlLFxuICAgICAgICAgICAgY3VycmVudEFtcG0sXG4gICAgICAgICAgICBjdXJyZW50RGF0ZVdpdGhvdXRUaW1lOiBjdXJyZW50RGF0ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlU2VsZWN0aW9uKGRhdGUsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVTZWxlY3Rpb24oZGF0ZSwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgaGFuZGxlSG91ckNoYW5nZSgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJIQU5OQSBOQU4gQ0hFQ0sgXCIsIHRoaXMuaG91ci52YWx1ZSwgcGFyc2VJbnQodGhpcy5ob3VyLnZhbHVlKSwgdGhpcy5ob3VyLnZhbHVlID09PSAnJywgdGhpcy5ob3VyLnZhbHVlID09PSBcIlwiKTtcblxuICAgICAgICBsZXQgaG91clZhbCA9IHRoaXMuaG91ci52YWx1ZSA/IHBhcnNlSW50KHRoaXMuaG91ci52YWx1ZSkgOiAwO1xuICAgICAgICBob3VyVmFsID0gaXNOYU4oaG91clZhbCkgPyAwIDogaG91clZhbDtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGN1cnJlbnRIb3VyOiBob3VyVmFsLFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVNaW51dGVDaGFuZ2UoKSB7XG4gICAgICAgIGNvbnN0IG1pbnV0ZVZhbCA9IHRoaXMubWludXRlLnZhbHVlID8gcGFyc2VJbnQodGhpcy5taW51dGUudmFsdWUpIDogMDtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGN1cnJlbnRNaW51dGU6IG1pbnV0ZVZhbCxcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgaGFuZGxlQW1QbUNoYW5nZSgpIHtcbiAgICAgICAgY29uc3Qge2N1cnJlbnRIb3VyLCBjdXJyZW50TWludXRlfSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgICAgY29uc3QgYW1wbVZhbCA9IHRoaXMuYW1wbS52YWx1ZTtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkSHIgPSB0aGlzLmdldEhvdXJJbjEyRm9ybWF0KGN1cnJlbnRIb3VyKTtcbiAgICAgICAgY29uc3QgZm9ybWF0dGVkTWluID0gdGhpcy5nZXRNaW51dGVGb3JtYXR0ZWQoY3VycmVudE1pbnV0ZSk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjdXJyZW50SG91cjogZm9ybWF0dGVkSHIsXG4gICAgICAgICAgICBjdXJyZW50TWludXRlOiBmb3JtYXR0ZWRNaW4sXG4gICAgICAgICAgICBjdXJyZW50QW1wbTogYW1wbVZhbCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgZGF0ZU9iaiA9IHRoaXMuZ2V0Q3VycmVudERhdGVPYmooZm9ybWF0dGVkSHIsIGZvcm1hdHRlZE1pbiwgYW1wbVZhbCk7XG4gICAgICAgIHRoaXMuaGFuZGxlU2VsZWN0aW9uKGRhdGVPYmosIHtjb2xsYXBzZTogZmFsc2V9KTtcbiAgICB9XG5cbiAgICBoYW5kbGVLZXlEb3duKGUpIHtcbiAgICAgICAgY29uc3Qge2N1cnJlbnRIb3VyLCBjdXJyZW50TWludXRlfSA9IHRoaXMuc3RhdGU7XG4gICAgICAgIHZhciBrZXkgPSBlLndoaWNoIHx8IGUua2V5Q29kZSxcbiAgICAgICAgICAgIHdhc0VudGVyID0ga2V5ID09PSAxMztcblxuICAgICAgICBpZih3YXNFbnRlcikge1xuICAgICAgICAgICAgY29uc3QgZm9ybWF0dGVkSHIgPSB0aGlzLmdldEhvdXJJbjEyRm9ybWF0KGN1cnJlbnRIb3VyKTtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdHRlZE1pbiA9IHRoaXMuZ2V0TWludXRlRm9ybWF0dGVkKGN1cnJlbnRNaW51dGUpO1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgY3VycmVudEhvdXI6IGZvcm1hdHRlZEhyLFxuICAgICAgICAgICAgICAgIGN1cnJlbnRNaW51dGU6IGZvcm1hdHRlZE1pbixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy50b2dnbGVUaW1lcGlja2VyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGVUaW1lcGlja2VyKCkge1xuICAgICAgICBjb25zdCB7Y3VycmVudEhvdXIsIGN1cnJlbnRNaW51dGUsIGN1cnJlbnRBbXBtLCB0aW1lcGlja2VyVmlzaWJsZX0gPSB0aGlzLnN0YXRlO1xuXG4gICAgICAgIGNvbnN0IHdhc09wZW5CdXROb3dTaG91bGRCZUNsb3NlZCA9IHRpbWVwaWNrZXJWaXNpYmxlO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKFwiSEFOTkEgVElNRVBJQ0tFUiBWSVNJQkxFIFwiLCB0aW1lcGlja2VyVmlzaWJsZSk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICB0aW1lcGlja2VyVmlzaWJsZTogIXRpbWVwaWNrZXJWaXNpYmxlXG4gICAgICAgIH0sIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYod2FzT3BlbkJ1dE5vd1Nob3VsZEJlQ2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGF0ZU9iaiA9IHRoaXMuZ2V0Q3VycmVudERhdGVPYmooY3VycmVudEhvdXIsIGN1cnJlbnRNaW51dGUsIGN1cnJlbnRBbXBtKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkhBTk5BIC0gSEFORExJTkcgU0VMRUNUSU9OIFwiLCBkYXRlT2JqKTtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVNlbGVjdGlvbihkYXRlT2JqLCB7XG4gICAgICAgICAgICAgICAgICAgIGNvbGxhcHNlOiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICB9XG5cbiAgICByZW5kZXJBcnJvdyhkaXJlY3Rpb24pIHtcbiAgICAgICAgY29uc3Qge2lnbm9yZUZvbnRBd2Vzb21lfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgdmFyIGNsYXNzZXMgPSBcIm1vbnRoLXN3aXRjaGVyIFwiICsgZGlyZWN0aW9uLCBjb250ZW50O1xuICAgICAgICBpZihpZ25vcmVGb250QXdlc29tZSkge1xuICAgICAgICAgICAgaWYoZGlyZWN0aW9uID09PSBcImJhY2tcIikge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSA8c3Bhbj4mbHNhcXVvOzwvc3Bhbj47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSA8c3Bhbj4mcnNhcXVvOzwvc3Bhbj47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBzdHlsZXMgPSB7XG4gICAgICAgICAgICAgICAgZm9udFNpemU6IFwiMTNweFwiXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihkaXJlY3Rpb24gPT09IFwiYmFja1wiKSB7XG4gICAgICAgICAgICAgICAgY29udGVudCA9IDxpIHN0eWxlPXtzdHlsZXN9IGNsYXNzTmFtZT1cImZhIGZhLWNoZXZyb24tbGVmdFwiPjwvaT47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSA8aSBzdHlsZT17c3R5bGVzfSBjbGFzc05hbWU9XCJmYSBmYS1jaGV2cm9uLXJpZ2h0XCI+PC9pPjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiA8c3BhbiBvbkNsaWNrPXt0aGlzLnNoaWZ0RGF0ZS5iaW5kKHRoaXMsIGRpcmVjdGlvbil9IGNsYXNzTmFtZT17Y2xhc3Nlc30+e2NvbnRlbnR9PC9zcGFuPlxuICAgIH1cblxuICAgIHJlbmRlckRheUxldHRlcnMoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRhdGVwaWNrZXItZGF5LWhlYWRlcnNcIj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5TVU48L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+TU9OPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuPlRVRTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5XRUQ8L3NwYW4+XG4gICAgICAgICAgICAgICAgPHNwYW4+VEhVPC9zcGFuPlxuICAgICAgICAgICAgICAgIDxzcGFuPkZSSTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8c3Bhbj5TQVQ8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXJUaW1lUGlja2VySGVhZGVyQ29udGVudCgpIHtcbiAgICAgICAgY29uc3Qge2N1cnJlbnRIb3VyLCBjdXJyZW50TWludXRlLCBjdXJyZW50QW1wbSwgdGltZXBpY2tlclZpc2libGV9ID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICBjb25zdCBjdXJyZW50RGF0ZSA9IHRoaXMuZ2V0Q3VycmVudERhdGVPYmooY3VycmVudEhvdXIsIGN1cnJlbnRNaW51dGUsIGN1cnJlbnRBbXBtKTtcbiAgICAgICAgY29uc3QgZGlzcGxheU1pbiA9IGN1cnJlbnREYXRlLmZvcm1hdChcIm1tXCIpO1xuXG4gICAgICAgIHZhciBjb250ZW50ID0gKFxuICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgICAgPGkgY2xhc3NOYW1lPVwiZmEgZmEtY2xvY2stb1wiPjwvaT5cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJoZWFkZXItdGltZVwiPlxuICAgICAgICAgICAgICAgICAgICB7Y3VycmVudEhvdXJ9OntkaXNwbGF5TWlufSZuYnNwO3tjdXJyZW50QW1wbX1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICk7XG5cbiAgICAgICAgaWYodGltZXBpY2tlclZpc2libGUpIHtcbiAgICAgICAgICAgIGNvbnRlbnQgPSA8c3Bhbj5kb25lPC9zcGFuPlxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfVxuXG4gICAgcmVuZGVyVGltZVBpY2tlcigpIHtcbiAgICAgICAgY29uc3Qge2VuYWJsZVRpbWV9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgY29uc3Qge2N1cnJlbnRIb3VyLCBjdXJyZW50TWludXRlLCBjdXJyZW50QW1wbSwgdGltZXBpY2tlclZpc2libGV9ID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICBpZighZW5hYmxlVGltZSkgeyByZXR1cm47IH1cblxuICAgICAgICBjb25zb2xlLmxvZyhcIkhBTk5BIC0gU1RBVEUuSE9VUlwiLCBjdXJyZW50SG91cik7XG5cbiAgICAgICAgdmFyIGNsYXNzZXMgPSBjbGFzc25hbWVzKFwiZGF0ZXBpY2tlci10aW1lcGlja2VyXCIsIHtcbiAgICAgICAgICAgIFwidmlzaWJsZVwiOiB0aW1lcGlja2VyVmlzaWJsZVxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBjdXJyZW50RGF0ZSA9IHRoaXMuZ2V0Q3VycmVudERhdGVPYmooY3VycmVudEhvdXIsIGN1cnJlbnRNaW51dGUsIGN1cnJlbnRBbXBtKTtcbiAgICAgICAgY29uc3QgZGlzcGxheUhyID0gY3VycmVudEhvdXIgPT09IDAgPyBjdXJyZW50SG91ciA6IGN1cnJlbnREYXRlLmZvcm1hdChcImhoXCIpO1xuICAgICAgICBjb25zdCBkaXNwbGF5TWluID0gY3VycmVudERhdGUuZm9ybWF0KFwibW1cIik7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSEFOTkEgQ1VSUkVOVCBEQVRFIE1JTlVURVwiLCBjdXJyZW50RGF0ZS5taW51dGUoKSk7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc2VzfT5cbiAgICAgICAgICAgICAgICA8ZGl2IG9uQ2xpY2s9e3RoaXMudG9nZ2xlVGltZXBpY2tlci5iaW5kKHRoaXMpfSBjbGFzc05hbWU9XCJkYXRlcGlja2VyLXRpbWVwaWNrZXItaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlclRpbWVQaWNrZXJIZWFkZXJDb250ZW50KCl9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lcGlja2VyLWlucHV0c1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlucHV0LXJvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cImlucHV0LWhvdXJzXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWY9eyhoKSA9PiB7IHRoaXMuaG91ciA9IGg7IH19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2Rpc3BsYXlIcn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW49ezF9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4PXsxMn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXhMZW5ndGg9ezJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlSG91ckNoYW5nZS5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3duLmJpbmQodGhpcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9XCItMVwiIC8+OlxuICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IGNsYXNzTmFtZT1cImlucHV0LW1pbnV0ZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZj17KG0pID0+IHsgdGhpcy5taW51dGUgPSBtOyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtkaXNwbGF5TWlufVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1pbj17MH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXg9ezU5fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heExlbmd0aD17Mn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVNaW51dGVDaGFuZ2UuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bi5iaW5kKHRoaXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRhYkluZGV4PVwiLTFcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNlbGVjdCBjbGFzc05hbWU9XCJhbXBtLXBpY2tlciBpZ25vcmUtY2hvc2VuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmPXsoYW1wbSkgPT4geyB0aGlzLmFtcG0gPSBhbXBtOyB9fVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZT17Y3VycmVudEFtcG19XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUFtUG1DaGFuZ2UuYmluZCh0aGlzKX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFiSW5kZXg9XCItMVwiID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYW1cIj5BTTwvb3B0aW9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJwbVwiPlBNPC9vcHRpb24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NlbGVjdD5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGNvbnN0IHtlbmFibGVUaW1lLCBtYXhEYXRlLCBtaW5EYXRlLCBzZWxlY3RlZERhdGUsIHRpbWV6b25lfSA9IHRoaXMucHJvcHM7XG4gICAgICAgIGNvbnN0IHtjdXJyZW50SG91ciwgY3VycmVudE1pbnV0ZSwgY3VycmVudEFtcG19ID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICBjb25zdCBjbGFzc2VzID0gY2xhc3NuYW1lcyhcImRhdGVwaWNrZXJcIiwge1xuICAgICAgICAgICAgXCJ0aW1lLWVuYWJsZWRcIjogZW5hYmxlVGltZVxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZGF0ZU9iaiA9IHRoaXMuZ2V0Q3VycmVudERhdGVPYmooY3VycmVudEhvdXIsIGN1cnJlbnRNaW51dGUsIGN1cnJlbnRBbXBtKTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2NsYXNzZXN9PlxuICAgICAgICAgICAgICAgIDxoMz5cbiAgICAgICAgICAgICAgICAgICAge3RoaXMucmVuZGVyQXJyb3coXCJiYWNrXCIpfVxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj57ZGF0ZU9iai5mb3JtYXQoXCJNTU1NIFlZWVlcIil9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJBcnJvdyhcImZvcndhcmRcIil9XG4gICAgICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgICAgICB7dGhpcy5yZW5kZXJEYXlMZXR0ZXJzKCl9XG4gICAgICAgICAgICAgICAgPE1vbnRoVmlldyB0aW1lem9uZT17dGltZXpvbmV9IHNlbGVjdGVkRGF0ZT17c2VsZWN0ZWREYXRlfSBtaW5EYXRlPXttaW5EYXRlfSBtYXhEYXRlPXttYXhEYXRlfSBoYW5kbGVTZWxlY3Rpb249e3RoaXMuaGFuZGxlU2VsZWN0aW9uLmJpbmQodGhpcyl9IGRhdGU9e2RhdGVPYmp9IC8+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyVGltZVBpY2tlcigpfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuXG5cbm1vZHVsZS5leHBvcnRzID0gRGF0ZVBpY2tlcjtcbiJdfQ==
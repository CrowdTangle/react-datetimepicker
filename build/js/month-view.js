"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _momentTimezone = _interopRequireDefault(require("moment-timezone"));

var _weekRow = _interopRequireDefault(require("./week-row"));

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

var MonthView = /*#__PURE__*/function (_React$Component) {
  _inherits(MonthView, _React$Component);

  var _super = _createSuper(MonthView);

  function MonthView(props) {
    _classCallCheck(this, MonthView);

    return _super.call(this, props);
  }

  _createClass(MonthView, [{
    key: "renderWeeks",
    value: function renderWeeks() {
      // start at the first of the month
      var now = _momentTimezone["default"].tz(this.props.timezone);

      var currentDate = this.props.date.clone().date(1).hour(0).minute(0).second(0).milliseconds(0);
      var currentMonth = currentDate.month();
      var currentYear = currentDate.year();
      var weeks = [];
      var i = 0;
      /**
       * So the basic plan here is to walk up by day. When we hit a sunday,
       * collect the next 7 days and pass them into the week to render. If the first
       * day isn't a sunday, we need to render the days from the previous month,
       * so we'll subtract those off the bat. Finally, cloning moments is a little
       * tempermental, so rather than passing in moment objects, we just pass in
       * the data we need to the week view
       */

      while (currentDate.month() <= currentMonth && currentDate.year() <= currentYear) {
        var dayOfWeek = currentDate.day(); // if it's the first day of the month

        if (i === 0) {
          // and it's not sunday, we want to go back to the previous sunday to start
          if (dayOfWeek !== 0) {
            // go back to sunday
            currentDate.subtract(currentDate.day(), "days");
          }
        } // if it's a sunday, or it's the first, render a week


        if (dayOfWeek === 0 || i === 0) {
          var dates = [];
          dates.push({
            inMonth: currentDate.month() === currentMonth,
            today: currentDate.format("MM/DD/YYYY") === now.format("MM/DD/YYYY"),
            selected: this.props.selectedDate && currentDate.format("MM/DD/YYYY") === this.props.selectedDate.format("MM/DD/YYYY"),
            disabled: currentDate.isBefore(this.props.minDate) || currentDate.isAfter(this.props.maxDate),
            date: currentDate.date(),
            formattedDate: currentDate.format("MM/DD/YYYY")
          });

          while (currentDate.day() < 6) {
            currentDate.add(1, "days");
            dates.push({
              inMonth: currentDate.month() === currentMonth,
              today: currentDate.format("MM/DD/YYYY") === now.format("MM/DD/YYYY"),
              selected: this.props.selectedDate && currentDate.format("MM/DD/YYYY") === this.props.selectedDate.format("MM/DD/YYYY"),
              disabled: currentDate.isBefore(this.props.minDate) || currentDate.isAfter(this.props.maxDate),
              date: currentDate.date(),
              formattedDate: currentDate.format("MM/DD/YYYY")
            });
            i++;
          }

          weeks.push( /*#__PURE__*/_react["default"].createElement(_weekRow["default"], {
            maxDate: this.props.maxDate,
            minDate: this.props.minDate,
            timezone: this.props.timezone,
            handleSelection: this.props.handleSelection,
            month: currentMonth,
            dates: dates,
            key: currentDate.date() + "_" + currentDate.month() + "_" + currentDate.year()
          }));
          currentDate.add(1, "days");
          i++;
        }
      }

      return weeks;
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "datepicker-monthview"
      }, this.renderWeeks());
    }
  }]);

  return MonthView;
}(_react["default"].Component);

_defineProperty(MonthView, "propTypes", {
  date: _propTypes["default"].instanceOf(_momentTimezone["default"]).isRequired,
  handleSelection: _propTypes["default"].func.isRequired,
  minDate: _propTypes["default"].instanceOf(_momentTimezone["default"]),
  maxDate: _propTypes["default"].instanceOf(_momentTimezone["default"]),
  selectedDate: _propTypes["default"].instanceOf(_momentTimezone["default"])
});

module.exports = MonthView;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2FwcC9qcy9tb250aC12aWV3LmpzeCJdLCJuYW1lcyI6WyJNb250aFZpZXciLCJwcm9wcyIsIm5vdyIsIm1vbWVudCIsInR6IiwidGltZXpvbmUiLCJjdXJyZW50RGF0ZSIsImRhdGUiLCJjbG9uZSIsImhvdXIiLCJtaW51dGUiLCJzZWNvbmQiLCJtaWxsaXNlY29uZHMiLCJjdXJyZW50TW9udGgiLCJtb250aCIsImN1cnJlbnRZZWFyIiwieWVhciIsIndlZWtzIiwiaSIsImRheU9mV2VlayIsImRheSIsInN1YnRyYWN0IiwiZGF0ZXMiLCJwdXNoIiwiaW5Nb250aCIsInRvZGF5IiwiZm9ybWF0Iiwic2VsZWN0ZWQiLCJzZWxlY3RlZERhdGUiLCJkaXNhYmxlZCIsImlzQmVmb3JlIiwibWluRGF0ZSIsImlzQWZ0ZXIiLCJtYXhEYXRlIiwiZm9ybWF0dGVkRGF0ZSIsImFkZCIsImhhbmRsZVNlbGVjdGlvbiIsInJlbmRlcldlZWtzIiwiUmVhY3QiLCJDb21wb25lbnQiLCJQcm9wVHlwZXMiLCJpbnN0YW5jZU9mIiwiaXNSZXF1aXJlZCIsImZ1bmMiLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRU1BLFM7Ozs7O0FBVUYscUJBQVlDLEtBQVosRUFBbUI7QUFBQTs7QUFBQSw2QkFDVEEsS0FEUztBQUVsQjs7OztrQ0FFYTtBQUNWO0FBQ0EsVUFBTUMsR0FBRyxHQUFHQywyQkFBT0MsRUFBUCxDQUFVLEtBQUtILEtBQUwsQ0FBV0ksUUFBckIsQ0FBWjs7QUFDQSxVQUFJQyxXQUFXLEdBQUcsS0FBS0wsS0FBTCxDQUFXTSxJQUFYLENBQWdCQyxLQUFoQixHQUF3QkQsSUFBeEIsQ0FBNkIsQ0FBN0IsRUFBZ0NFLElBQWhDLENBQXFDLENBQXJDLEVBQXdDQyxNQUF4QyxDQUErQyxDQUEvQyxFQUFrREMsTUFBbEQsQ0FBeUQsQ0FBekQs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QyxVQUFWLENBQXFCdEMsMEJBQXJCO0FBTEMsQzs7QUFtR3ZCeUMsTUFBTSxDQUFDQyxPQUFQLEdBQWlCN0MsU0FBakIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0RE9NIGZyb20gJ3JlYWN0LWRvbSc7XG5pbXBvcnQgUHJvcFR5cGVzIGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQtdGltZXpvbmUnO1xuaW1wb3J0IFdlZWtSb3cgZnJvbSAnLi93ZWVrLXJvdyc7XG5cbmNsYXNzIE1vbnRoVmlldyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG5cbiAgICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgICAgICBkYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihtb21lbnQpLmlzUmVxdWlyZWQsXG4gICAgICAgIGhhbmRsZVNlbGVjdGlvbjogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgbWluRGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YobW9tZW50KSxcbiAgICAgICAgbWF4RGF0ZTogUHJvcFR5cGVzLmluc3RhbmNlT2YobW9tZW50KSxcbiAgICAgICAgc2VsZWN0ZWREYXRlOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihtb21lbnQpXG4gICAgfTtcblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICB9XG5cbiAgICByZW5kZXJXZWVrcygpIHtcbiAgICAgICAgLy8gc3RhcnQgYXQgdGhlIGZpcnN0IG9mIHRoZSBtb250aFxuICAgICAgICBjb25zdCBub3cgPSBtb21lbnQudHoodGhpcy5wcm9wcy50aW1lem9uZSk7XG4gICAgICAgIGxldCBjdXJyZW50RGF0ZSA9IHRoaXMucHJvcHMuZGF0ZS5jbG9uZSgpLmRhdGUoMSkuaG91cigwKS5taW51dGUoMCkuc2Vjb25kKDApLm1pbGxpc2Vjb25kcygwKTtcbiAgICAgICAgbGV0IGN1cnJlbnRNb250aCA9IGN1cnJlbnREYXRlLm1vbnRoKCk7XG4gICAgICAgIGxldCBjdXJyZW50WWVhciA9IGN1cnJlbnREYXRlLnllYXIoKTtcblxuICAgICAgICBjb25zdCB3ZWVrcyA9IFtdO1xuICAgICAgICBsZXQgaSA9IDA7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNvIHRoZSBiYXNpYyBwbGFuIGhlcmUgaXMgdG8gd2FsayB1cCBieSBkYXkuIFdoZW4gd2UgaGl0IGEgc3VuZGF5LFxuICAgICAgICAgKiBjb2xsZWN0IHRoZSBuZXh0IDcgZGF5cyBhbmQgcGFzcyB0aGVtIGludG8gdGhlIHdlZWsgdG8gcmVuZGVyLiBJZiB0aGUgZmlyc3RcbiAgICAgICAgICogZGF5IGlzbid0IGEgc3VuZGF5LCB3ZSBuZWVkIHRvIHJlbmRlciB0aGUgZGF5cyBmcm9tIHRoZSBwcmV2aW91cyBtb250aCxcbiAgICAgICAgICogc28gd2UnbGwgc3VidHJhY3QgdGhvc2Ugb2ZmIHRoZSBiYXQuIEZpbmFsbHksIGNsb25pbmcgbW9tZW50cyBpcyBhIGxpdHRsZVxuICAgICAgICAgKiB0ZW1wZXJtZW50YWwsIHNvIHJhdGhlciB0aGFuIHBhc3NpbmcgaW4gbW9tZW50IG9iamVjdHMsIHdlIGp1c3QgcGFzcyBpblxuICAgICAgICAgKiB0aGUgZGF0YSB3ZSBuZWVkIHRvIHRoZSB3ZWVrIHZpZXdcbiAgICAgICAgICovXG4gICAgICAgIHdoaWxlKGN1cnJlbnREYXRlLm1vbnRoKCkgPD0gY3VycmVudE1vbnRoICYmIGN1cnJlbnREYXRlLnllYXIoKSA8PSBjdXJyZW50WWVhcikge1xuICAgICAgICAgICAgbGV0IGRheU9mV2VlayA9IGN1cnJlbnREYXRlLmRheSgpO1xuXG4gICAgICAgICAgICAvLyBpZiBpdCdzIHRoZSBmaXJzdCBkYXkgb2YgdGhlIG1vbnRoXG4gICAgICAgICAgICBpZihpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gYW5kIGl0J3Mgbm90IHN1bmRheSwgd2Ugd2FudCB0byBnbyBiYWNrIHRvIHRoZSBwcmV2aW91cyBzdW5kYXkgdG8gc3RhcnRcbiAgICAgICAgICAgICAgICBpZihkYXlPZldlZWsgIT09IDApIHtcbiAgICAgICAgICAgICAgICAgIC8vIGdvIGJhY2sgdG8gc3VuZGF5XG4gICAgICAgICAgICAgICAgICBjdXJyZW50RGF0ZS5zdWJ0cmFjdChjdXJyZW50RGF0ZS5kYXkoKSwgXCJkYXlzXCIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGlmIGl0J3MgYSBzdW5kYXksIG9yIGl0J3MgdGhlIGZpcnN0LCByZW5kZXIgYSB3ZWVrXG4gICAgICAgICAgICBpZihkYXlPZldlZWsgPT09IDAgfHwgaSA9PT0gMCkge1xuICAgICAgICAgICAgICBsZXQgZGF0ZXMgPSBbXTtcblxuICAgICAgICAgICAgICBkYXRlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBpbk1vbnRoOiBjdXJyZW50RGF0ZS5tb250aCgpID09PSBjdXJyZW50TW9udGgsXG4gICAgICAgICAgICAgICAgdG9kYXk6IGN1cnJlbnREYXRlLmZvcm1hdChcIk1NL0REL1lZWVlcIikgPT09IG5vdy5mb3JtYXQoXCJNTS9ERC9ZWVlZXCIpLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiB0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZSAmJiBjdXJyZW50RGF0ZS5mb3JtYXQoXCJNTS9ERC9ZWVlZXCIpID09PSB0aGlzLnByb3BzLnNlbGVjdGVkRGF0ZS5mb3JtYXQoXCJNTS9ERC9ZWVlZXCIpLFxuICAgICAgICAgICAgICAgIGRpc2FibGVkOiBjdXJyZW50RGF0ZS5pc0JlZm9yZSh0aGlzLnByb3BzLm1pbkRhdGUpIHx8IGN1cnJlbnREYXRlLmlzQWZ0ZXIodGhpcy5wcm9wcy5tYXhEYXRlKSxcbiAgICAgICAgICAgICAgICBkYXRlOiBjdXJyZW50RGF0ZS5kYXRlKCksXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVkRGF0ZTogY3VycmVudERhdGUuZm9ybWF0KFwiTU0vREQvWVlZWVwiKVxuICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICB3aGlsZShjdXJyZW50RGF0ZS5kYXkoKSA8IDYpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50RGF0ZS5hZGQoMSwgXCJkYXlzXCIpO1xuXG4gICAgICAgICAgICAgICAgZGF0ZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICBpbk1vbnRoOiBjdXJyZW50RGF0ZS5tb250aCgpID09PSBjdXJyZW50TW9udGgsXG4gICAgICAgICAgICAgICAgICB0b2RheTogY3VycmVudERhdGUuZm9ybWF0KFwiTU0vREQvWVlZWVwiKSA9PT0gbm93LmZvcm1hdChcIk1NL0REL1lZWVlcIiksXG4gICAgICAgICAgICAgICAgICBzZWxlY3RlZDogdGhpcy5wcm9wcy5zZWxlY3RlZERhdGUgJiYgY3VycmVudERhdGUuZm9ybWF0KFwiTU0vREQvWVlZWVwiKSA9PT0gdGhpcy5wcm9wcy5zZWxlY3RlZERhdGUuZm9ybWF0KFwiTU0vREQvWVlZWVwiKSxcbiAgICAgICAgICAgICAgICAgIGRpc2FibGVkOiBjdXJyZW50RGF0ZS5pc0JlZm9yZSh0aGlzLnByb3BzLm1pbkRhdGUpIHx8IGN1cnJlbnREYXRlLmlzQWZ0ZXIodGhpcy5wcm9wcy5tYXhEYXRlKSxcbiAgICAgICAgICAgICAgICAgIGRhdGU6IGN1cnJlbnREYXRlLmRhdGUoKSxcbiAgICAgICAgICAgICAgICAgIGZvcm1hdHRlZERhdGU6IGN1cnJlbnREYXRlLmZvcm1hdChcIk1NL0REL1lZWVlcIilcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgd2Vla3MucHVzaCg8V2Vla1Jvd1xuICAgICAgICAgICAgICAgICBtYXhEYXRlPXt0aGlzLnByb3BzLm1heERhdGV9XG4gICAgICAgICAgICAgICAgIG1pbkRhdGU9e3RoaXMucHJvcHMubWluRGF0ZX1cbiAgICAgICAgICAgICAgICAgdGltZXpvbmU9e3RoaXMucHJvcHMudGltZXpvbmV9XG4gICAgICAgICAgICAgICAgIGhhbmRsZVNlbGVjdGlvbj17dGhpcy5wcm9wcy5oYW5kbGVTZWxlY3Rpb259XG4gICAgICAgICAgICAgICAgIG1vbnRoPXtjdXJyZW50TW9udGh9XG4gICAgICAgICAgICAgICAgIGRhdGVzPXtkYXRlc31cbiAgICAgICAgICAgICAgICAga2V5PXtjdXJyZW50RGF0ZS5kYXRlKCkgKyBcIl9cIiArIGN1cnJlbnREYXRlLm1vbnRoKCkgKyBcIl9cIiArIGN1cnJlbnREYXRlLnllYXIoKX0gLz4pO1xuXG5cbiAgICAgICAgICAgICAgICBjdXJyZW50RGF0ZS5hZGQoMSwgXCJkYXlzXCIpO1xuICAgICAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gd2Vla3M7XG5cbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImRhdGVwaWNrZXItbW9udGh2aWV3XCI+XG4gICAgICAgICAgICAgICAge3RoaXMucmVuZGVyV2Vla3MoKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cblxuXG5tb2R1bGUuZXhwb3J0cyA9IE1vbnRoVmlldztcbiJdfQ==
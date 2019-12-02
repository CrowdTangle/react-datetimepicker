'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

var _weekRow = require('./week-row');

var _weekRow2 = _interopRequireDefault(_weekRow);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MonthView = function (_React$Component) {
    _inherits(MonthView, _React$Component);

    function MonthView(props) {
        _classCallCheck(this, MonthView);

        return _possibleConstructorReturn(this, (MonthView.__proto__ || Object.getPrototypeOf(MonthView)).call(this, props));
    }

    _createClass(MonthView, [{
        key: 'renderWeeks',
        value: function renderWeeks() {
            // start at the first of the month
            var now = _momentTimezone2.default.tz(this.props.timezone);
            var currentDate = this.props.date.clone().date(1).hour(0).minute(0).second(0).milliseconds(0);
            var currentMonth = currentDate.month();
            var currentYear = currentDate.year();

            var weeks = [];
            var i = 0;

            console.log("currentMonth", currentMonth);

            /**
             * So the basic plan here is to walk up by day. When we hit a sunday,
             * collect the next 7 days and pass them into the week to render. If the first
             * day isn't a sunday, we need to render the days from the previous month,
             * so we'll subtract those off the bat. Finally, cloning moments is a little
             * tempermental, so rather than passing in moment objects, we just pass in
             * the data we need to the week view
             */
            while (currentDate.month() <= currentMonth && currentDate.year() <= currentYear) {
                var dayOfWeek = currentDate.day();
                console.log("rendering", currentDate.format());

                // if it's the first day of the month
                if (i === 0) {
                    // and it's not sunday, we want to go back to the previous sunday to start
                    if (dayOfWeek !== 0) {
                        // go back to sunday
                        currentDate.subtract(currentDate.day(), "days");
                    }
                }
                // if it's a sunday, or it's the first, render a week
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

                    weeks.push(_react2.default.createElement(_weekRow2.default, {
                        maxDate: this.props.maxDate,
                        minDate: this.props.minDate,
                        timezone: this.props.timezone,
                        handleSelection: this.props.handleSelection,
                        month: currentMonth,
                        dates: dates,
                        key: currentDate.date() + "_" + currentDate.year() }));

                    currentDate.add(1, "days");
                    i++;
                }
            }

            return weeks;
        }
    }, {
        key: 'render',
        value: function render() {
            console.log(this.props);

            return _react2.default.createElement(
                'div',
                { className: 'datepicker-monthview' },
                this.renderWeeks()
            );
        }
    }]);

    return MonthView;
}(_react2.default.Component);

MonthView.propTypes = {
    date: _propTypes2.default.instanceOf(_momentTimezone2.default).isRequired,
    handleSelection: _propTypes2.default.func.isRequired,
    minDate: _propTypes2.default.instanceOf(_momentTimezone2.default),
    maxDate: _propTypes2.default.instanceOf(_momentTimezone2.default),
    selectedDate: _propTypes2.default.instanceOf(_momentTimezone2.default)
};


module.exports = MonthView;
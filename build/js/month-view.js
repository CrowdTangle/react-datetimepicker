'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

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
            var currentDate = (0, _moment2.default)(this.props.date).date(1).hour(0).minute(0).second(0).milliseconds(0),
                currentMonth = currentDate.month();

            var weeks = [],
                i = 0;

            while (currentDate.month() === currentMonth) {
                var dayOfWeek = currentDate.day(),
                    dateToPass = (0, _moment2.default)(currentDate);

                if (i === 0) {
                    if (dayOfWeek !== 0) {
                        dateToPass = (0, _moment2.default)(currentDate).subtract(currentDate.day(), "days");
                    }
                }

                if (dayOfWeek === 0 || i === 0) {
                    weeks.push(_react2.default.createElement(_weekRow2.default, { selectedDate: this.props.selectedDate, maxDate: this.props.maxDate, minDate: this.props.minDate, handleSelection: this.props.handleSelection, month: currentMonth, date: dateToPass, key: currentDate.date() }));
                }

                currentDate.add(1, "days");
                i++;
            }

            return weeks;
        }
    }, {
        key: 'render',
        value: function render() {
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
    date: _react2.default.PropTypes.instanceOf(_moment2.default).isRequired,
    handleSelection: _react2.default.PropTypes.func.isRequired,
    minDate: _react2.default.PropTypes.instanceOf(_moment2.default),
    maxDate: _react2.default.PropTypes.instanceOf(_moment2.default),
    selectedDate: _react2.default.PropTypes.instanceOf(_moment2.default)
};


module.exports = MonthView;
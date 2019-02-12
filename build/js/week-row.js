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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WeekRow = function (_React$Component) {
    _inherits(WeekRow, _React$Component);

    function WeekRow(props) {
        _classCallCheck(this, WeekRow);

        return _possibleConstructorReturn(this, (WeekRow.__proto__ || Object.getPrototypeOf(WeekRow)).call(this, props));
    }

    _createClass(WeekRow, [{
        key: 'handleClick',
        value: function handleClick(date) {
            this.props.handleSelection(date);
        }
    }, {
        key: 'renderDates',
        value: function renderDates() {
            var _this2 = this;

            var currentDate = this.props.date.clone(),
                dates = [],
                count = 0,
                now = (0, _momentTimezone2.default)();

            var _loop = function _loop() {
                count++;
                classes = (0, _classnames2.default)("day-block", {
                    "in-month": currentDate.month() === _this2.props.month,
                    "today": currentDate.format("MM/DD/YYYY") === now.format("MM/DD/YYYY"),
                    "selected": _this2.props.selectedDate && currentDate.format("MM/DD/YYYY") === _this2.props.selectedDate.format("MM/DD/YYYY"),
                    "disabled": currentDate.isBefore(_this2.props.minDate) || currentDate.isAfter(_this2.props.maxDate)
                });


                var dateToSelect = currentDate.clone();

                dates.push(_react2.default.createElement(
                    'span',
                    {
                        onClick: function onClick() {
                            _this2.handleClick(dateToSelect);
                        },
                        className: classes,
                        key: currentDate.date() },
                    currentDate.date()
                ));

                currentDate.add(1, "days");
            };

            while (count < 7) {
                var classes;

                _loop();
            }

            return dates;
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'datepicker-weekrow' },
                this.renderDates()
            );
        }
    }]);

    return WeekRow;
}(_react2.default.Component);

WeekRow.propTypes = {
    date: _propTypes2.default.instanceOf(_momentTimezone2.default).isRequired,
    month: _propTypes2.default.number.isRequired,
    handleSelection: _propTypes2.default.func.isRequired,
    minDate: _propTypes2.default.instanceOf(_momentTimezone2.default),
    maxDate: _propTypes2.default.instanceOf(_momentTimezone2.default),
    selectedDate: _propTypes2.default.instanceOf(_momentTimezone2.default)
};


module.exports = WeekRow;
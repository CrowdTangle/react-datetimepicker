'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

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
            var currentDate = (0, _moment2.default)(this.props.date),
                dates = [],
                count = 0,
                now = (0, _moment2.default)();

            while (count < 7) {
                count++;
                var classes = (0, _classnames2.default)("day-block", {
                    "in-month": currentDate.month() === this.props.month,
                    "today": currentDate.format("MM/DD/YYYY") === now.format("MM/DD/YYYY"),
                    "selected": this.props.selectedDate && currentDate.format("MM/DD/YYYY") === this.props.selectedDate.format("MM/DD/YYYY"),
                    "disabled": currentDate.isBefore(this.props.minDate) || currentDate.isAfter(this.props.maxDate)
                });

                dates.push(_react2.default.createElement(
                    'span',
                    { onClick: this.handleClick.bind(this, (0, _moment2.default)(currentDate)), className: classes, key: currentDate.date() },
                    currentDate.date()
                ));

                currentDate.add(1, "days");
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
    date: _propTypes2.default.instanceOf(_moment2.default).isRequired,
    month: _propTypes2.default.number.isRequired,
    handleSelection: _propTypes2.default.func.isRequired,
    minDate: _propTypes2.default.instanceOf(_moment2.default),
    maxDate: _propTypes2.default.instanceOf(_moment2.default),
    selectedDate: _propTypes2.default.instanceOf(_moment2.default)
};


module.exports = WeekRow;
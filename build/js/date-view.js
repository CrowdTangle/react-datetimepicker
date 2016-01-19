'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _monthView = require('./month-view');

var _monthView2 = _interopRequireDefault(_monthView);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DatePicker = function (_React$Component) {
    _inherits(DatePicker, _React$Component);

    function DatePicker(props) {
        _classCallCheck(this, DatePicker);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DatePicker).call(this, props));

        _this.state = {
            date: (0, _moment2.default)(_this.props.selectedDate),
            timepickerVisible: false
        };
        return _this;
    }

    _createClass(DatePicker, [{
        key: 'shiftDate',
        value: function shiftDate(direction) {
            var date = this.state.date;
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
        key: 'getMinute',
        value: function getMinute() {
            var minute = this.state.date.minute();
            if (minute < 10) {
                minute = "0" + minute;
            }

            return minute;
        }
    }, {
        key: 'getHour',
        value: function getHour() {
            var hour = this.state.date.hour();
            if (hour > 12) {
                hour = hour - 12;
            }

            return hour;
        }
    }, {
        key: 'getAmPm',
        value: function getAmPm() {
            return this.state.date.format("a");
        }
    }, {
        key: 'handleSelection',
        value: function handleSelection(date, options) {
            date.hour(this.state.date.hour());
            date.minute(this.state.date.minute());
            this.props.handleSelection(date, options);
        }
    }, {
        key: 'handleHourChange',
        value: function handleHourChange() {
            var date = this.state.date,
                value = parseInt(this.refs.hour.value);

            if (this.getAmPm() === "pm") {
                value += 12;
            }

            console.log("setting hour to " + value);

            date.hour(value);

            this.setState({
                date: date
            });
        }
    }, {
        key: 'handleMinuteChange',
        value: function handleMinuteChange() {
            var date = this.state.date;
            date.minute(this.refs.minute.value);

            this.setState({
                date: date
            });
        }
    }, {
        key: 'handleAmPmChange',
        value: function handleAmPmChange() {
            var currentValue = this.getAmPm(),
                changedValue = this.refs.ampm.value,
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
        key: 'handleKeyDown',
        value: function handleKeyDown(e) {
            var key = e.which || e.keyCode,
                wasEnter = key === 13;

            if (wasEnter) {
                this.toggleTimepicker();
            }
        }
    }, {
        key: 'toggleTimepicker',
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
        key: 'renderArrow',
        value: function renderArrow(direction) {
            var classes = "month-switcher " + direction,
                content;
            if (this.props.ignoreFontAwesome) {
                if (direction === "back") {
                    content = _react2.default.createElement(
                        'span',
                        null,
                        '‹'
                    );
                } else {
                    content = _react2.default.createElement(
                        'span',
                        null,
                        '›'
                    );
                }
            } else {
                var styles = {
                    fontSize: "13px"
                };
                if (direction === "back") {
                    content = _react2.default.createElement('i', { style: styles, className: 'fa fa-chevron-left' });
                } else {
                    content = _react2.default.createElement('i', { style: styles, className: 'fa fa-chevron-right' });
                }
            }

            return _react2.default.createElement(
                'span',
                { onClick: this.shiftDate.bind(this, direction), className: classes },
                content
            );
        }
    }, {
        key: 'renderDayLetters',
        value: function renderDayLetters() {
            return _react2.default.createElement(
                'div',
                { className: 'datepicker-day-headers' },
                _react2.default.createElement(
                    'span',
                    null,
                    'S'
                ),
                _react2.default.createElement(
                    'span',
                    null,
                    'M'
                ),
                _react2.default.createElement(
                    'span',
                    null,
                    'T'
                ),
                _react2.default.createElement(
                    'span',
                    null,
                    'W'
                ),
                _react2.default.createElement(
                    'span',
                    null,
                    'T'
                ),
                _react2.default.createElement(
                    'span',
                    null,
                    'F'
                ),
                _react2.default.createElement(
                    'span',
                    null,
                    'S'
                )
            );
        }
    }, {
        key: 'renderTimePickerHeaderContent',
        value: function renderTimePickerHeaderContent() {
            var content = _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement('i', { className: 'fa fa-clock-o' }),
                _react2.default.createElement(
                    'span',
                    { className: 'header-time' },
                    this.getHour(),
                    ':',
                    this.getMinute(),
                    ' ',
                    this.getAmPm()
                )
            );

            if (this.state.timepickerVisible) {
                content = _react2.default.createElement(
                    'span',
                    null,
                    'done'
                );
            }

            return content;
        }
    }, {
        key: 'renderTimePicker',
        value: function renderTimePicker() {
            if (!this.props.enableTime) {
                return;
            }

            var classes = (0, _classnames2.default)("datepicker-timepicker", {
                "visible": this.state.timepickerVisible
            });

            return _react2.default.createElement(
                'div',
                { className: classes },
                _react2.default.createElement(
                    'div',
                    { onClick: this.toggleTimepicker.bind(this), className: 'datepicker-timepicker-header' },
                    this.renderTimePickerHeaderContent()
                ),
                _react2.default.createElement(
                    'div',
                    { className: 'timepicker-inputs' },
                    _react2.default.createElement(
                        'div',
                        { className: 'input-row' },
                        _react2.default.createElement('input', { className: 'input-hours', ref: 'hour', value: this.getHour(), type: 'number', min: 1, max: 12, onChange: this.handleHourChange.bind(this), onKeyDown: this.handleKeyDown.bind(this) }),
                        ':',
                        _react2.default.createElement('input', { className: 'input-minutes', ref: 'minute', value: this.getMinute(), type: 'number', min: 0, max: 59, onChange: this.handleMinuteChange.bind(this), onKeyDown: this.handleKeyDown.bind(this) }),
                        _react2.default.createElement(
                            'select',
                            { ref: 'ampm', value: this.getAmPm(), onChange: this.handleAmPmChange.bind(this) },
                            _react2.default.createElement(
                                'option',
                                { value: 'am' },
                                'AM'
                            ),
                            _react2.default.createElement(
                                'option',
                                { value: 'pm' },
                                'PM'
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: 'render',
        value: function render() {
            var classes = (0, _classnames2.default)("datepicker", {
                "time-enabled": this.props.enableTime
            });

            return _react2.default.createElement(
                'div',
                { className: classes },
                _react2.default.createElement(
                    'h3',
                    null,
                    this.renderArrow("back"),
                    _react2.default.createElement(
                        'span',
                        null,
                        this.state.date.format("MMMM YYYY")
                    ),
                    this.renderArrow("forward")
                ),
                this.renderDayLetters(),
                _react2.default.createElement(_monthView2.default, { selectedDate: this.props.selectedDate, minDate: this.props.minDate, maxDate: this.props.maxDate, handleSelection: this.handleSelection.bind(this), date: this.state.date }),
                this.renderTimePicker()
            );
        }
    }]);

    return DatePicker;
}(_react2.default.Component);

DatePicker.propTypes = {
    minDate: _react2.default.PropTypes.instanceOf(_moment2.default),
    maxDate: _react2.default.PropTypes.instanceOf(_moment2.default),
    selectedDate: _react2.default.PropTypes.instanceOf(_moment2.default), // todo validate that it's between min and max
    enableTime: _react2.default.PropTypes.bool
};
DatePicker.defaultProps = {};

module.exports = DatePicker;
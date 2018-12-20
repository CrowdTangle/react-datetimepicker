'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dateView = require('./date-view');

var _dateView2 = _interopRequireDefault(_dateView);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _chronoNode = require('chrono-node');

var _chronoNode2 = _interopRequireDefault(_chronoNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_DATE_FORMAT = "MM/DD/YYYY";
var DEFAULT_DATE_TIME_FORMAT = "MM/DD/YYYY h:mm a";
var ENTER_KEY = "Enter";

var DatePicker = function (_React$Component) {
    _inherits(DatePicker, _React$Component);

    function DatePicker(props) {
        _classCallCheck(this, DatePicker);

        var _this = _possibleConstructorReturn(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call(this, props));

        var endDate = _this.props.defaultEndDate;
        var startDate = _this.props.defaultDate;

        if (!startDate) {
            startDate = (0, _moment2.default)();
        }

        if (!endDate) {
            endDate = (0, _moment2.default)(startDate).add(1, "months");
        }

        var dateFormat = void 0;
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
            startDate: startDate,
            endDateInputValue: endDate.format(dateFormat), // String value of date
            startDateInputValue: startDate.format(dateFormat), // String value of date
            format: dateFormat
        };

        console.log("setting state", endDate.format(), startDate.format());

        var toggleFunction = _this.toggleDatepicker.bind(_this, null);

        _this.naturalBinders = getBinders(toggleFunction);

        _this.dateView = _react2.default.createRef();

        return _this;
    }

    _createClass(DatePicker, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.props.isRange) {
                this.props.onChange({
                    startDate: this.state.startDate.toDate(),
                    endDate: this.state.endDate.toDate()
                });
            } else {
                this.props.onChange({
                    date: this.state.startDate.toDate()
                });
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(newProps) {
            if (newProps.defaultEndDate !== this.props.defaultEndDate || newProps.defaultDate !== this.props.defaultDate) {
                var endDate = newProps.defaultEndDate;
                var startDate = newProps.defaultDate;

                if (!startDate) {
                    startDate = (0, _moment2.default)();
                }

                if (!endDate) {
                    endDate = (0, _moment2.default)(startDate).add(1, "months");
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
        key: 'toggleGlobalClickBinding',
        value: function toggleGlobalClickBinding() {
            var wrapper = _reactDom2.default.findDOMNode(this);

            if (this.state.datepickerVisible) {
                this.naturalBinders.bind();
            } else {
                this.naturalBinders.unbind();
            }
        }

        /**** helpers ****/

    }, {
        key: 'getMinDateForType',
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
        key: 'getMaxDateForType',
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
        key: 'validateDateString',
        value: function validateDateString(string) {
            // Chrono returns a datetime stamp for valid dates, and for invalid dates, returns null
            return _chronoNode2.default.parseDate(string);
        }

        /**** handlers ****/

    }, {
        key: 'toggleDatepicker',
        value: function toggleDatepicker(type, e) {
            if (e) e.stopPropagation();

            this.setState({
                datepickerVisible: type
            }, this.toggleGlobalClickBinding.bind(this));
        }
    }, {
        key: 'openDatepicker',
        value: function openDatepicker(type, e) {
            if (e) e.stopPropagation();

            this.setState({
                datepickerVisible: type
            });
        }
    }, {
        key: 'closeDatepicker',
        value: function closeDatepicker(type, e) {
            if (e) e.stopPropagation();

            if (type === "startDate") {
                this.handleStartDateSet();
            } else if (type === "endDate") {
                this.handleEndDateSet();
            }

            this.toggleGlobalClickBinding();
        }
    }, {
        key: 'handleDateSelection',
        value: function handleDateSelection(type, date, options) {
            var mutableDate = (0, _moment2.default)(date);

            // round to make sure it's simply the same date;
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
                newState[type + 'InputValue'] = date.format(this.state.format);
            }

            this.setState(newState, function () {
                if (this.props.isRange) {
                    this.props.onChange({
                        startDate: this.state.startDate.toDate(),
                        endDate: this.state.endDate.toDate()
                    });
                } else {
                    this.props.onChange({
                        date: this.state.startDate.toDate()
                    });
                }

                this.toggleGlobalClickBinding();
            }.bind(this));
        }
    }, {
        key: 'handleStartDateInputChange',
        value: function handleStartDateInputChange(e) {
            this.setState({
                startDateInputValue: e.target.value
            });
        }
    }, {
        key: 'handleEndDateInputChange',
        value: function handleEndDateInputChange(e) {
            this.setState({
                endDateInputValue: e.target.value
            });
        }
    }, {
        key: 'handleStartDateKeyPress',
        value: function handleStartDateKeyPress(e) {
            if (e.key === ENTER_KEY) {
                this.handleStartDateSet();
            }
        }
    }, {
        key: 'handleEndDateKeyPress',
        value: function handleEndDateKeyPress(e) {
            if (e.key === ENTER_KEY) {
                this.handleEndDateSet();
            }
        }
    }, {
        key: 'handleStartDateSet',
        value: function handleStartDateSet() {
            var _this2 = this;

            var dateString = this.validateDateString(this.state.startDateInputValue);
            var startDate = (0, _moment2.default)(dateString);
            var minDate = this.getMinDateForType("startDate");
            var maxDate = this.getMaxDateForType("startDate");

            // If it's a valid date string and the date is within range, set the start date to be the input value
            if (dateString && startDate.isSameOrAfter(minDate) && startDate.isSameOrBefore(maxDate)) {
                this.setState({
                    startDate: startDate,
                    startDateInputValue: (0, _moment2.default)(dateString).format(this.state.format)
                }, function () {
                    if (_this2.dateView.current) {
                        _this2.dateView.current.reset();
                    }
                });
            } else {
                // If invalid date, set input value back to the last validated date
                this.setState({
                    startDateInputValue: this.state.startDate.format(this.state.format)
                });
            }

            this.forceUpdate();
        }
    }, {
        key: 'handleEndDateSet',
        value: function handleEndDateSet() {
            var _this3 = this;

            var dateString = this.validateDateString(this.state.endDateInputValue);
            var endDate = (0, _moment2.default)(dateString);
            var minDate = this.getMinDateForType("endDate");
            var maxDate = this.getMaxDateForType("endDate");

            // If it's a valid date string and the date is within range, set the start date to be the input value
            if (dateString && endDate.isSameOrAfter(minDate) && endDate.isSameOrBefore(maxDate)) {
                this.setState({
                    endDate: endDate,
                    endDateInputValue: (0, _moment2.default)(dateString).format(this.state.format)
                }, function () {
                    if (_this3.dateView.current) {
                        _this3.dateView.current.reset();
                    }
                });
            } else {
                // If invalid date, set input value back to the last validated date
                this.setState({
                    endDateInputValue: this.state.endDate.format(this.state.format)
                });
            }
        }

        /**** render methods ****/

    }, {
        key: 'renderDatepicker',
        value: function renderDatepicker(type) {
            if (this.state.datepickerVisible === type) {
                return _react2.default.createElement(_dateView2.default, {
                    ref: this.dateView,
                    enableTime: this.props.enableTime,
                    selectedDate: this.state[type],
                    maxDate: this.getMaxDateForType(type),
                    minDate: this.getMinDateForType(type),
                    handleSelection: this.handleDateSelection.bind(this, type) });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var endDateDatepicker = null,
                divider = null,
                styles = {};

            if (this.props.inputWidth) {
                styles.width = this.props.inputWidth + "px";
            } else if (this.props.enableTime) {
                styles.width = "120px";
            } else {
                styles.width = "70px";
            }

            if (this.props.isRange) {
                var endDateValue = this.props.inputEditable ? this.state.endDateInputValue : this.state.endDate.format(this.state.format);
                endDateDatepicker = _react2.default.createElement(
                    'div',
                    { className: 'datepicker-container' },
                    _react2.default.createElement('i', { className: 'fa fa-calendar' }),
                    _react2.default.createElement('input', { style: styles,
                        className: 'datepicker-input',
                        readOnly: !this.props.inputEditable,
                        value: endDateValue,
                        type: 'text',

                        onChange: this.handleEndDateInputChange.bind(this),
                        onBlur: this.closeDatepicker.bind(this, "endDate"),
                        onFocus: this.openDatepicker.bind(this, "endDate"),
                        onKeyPress: this.handleEndDateKeyPress.bind(this) }),
                    this.renderDatepicker("endDate")
                );
                divider = _react2.default.createElement(
                    'span',
                    { className: 'datepicker-divider' },
                    '-'
                );
            }
            var startDateValue = this.props.inputEditable ? this.state.startDateInputValue : this.state.startDate.format(this.state.format);

            var content = _react2.default.createElement(
                'div',
                { onClick: stopBubble, className: 'datepicker-wrapper' },
                _react2.default.createElement(
                    'div',
                    { className: 'datepicker-container' },
                    _react2.default.createElement('i', { className: 'fa fa-calendar' }),
                    _react2.default.createElement('input', { style: styles,
                        className: 'datepicker-input',
                        readOnly: !this.props.inputEditable,
                        value: startDateValue,
                        type: 'text',
                        onBlur: this.closeDatepicker.bind(this, "startDate"),
                        onFocus: this.openDatepicker.bind(this, "startDate"),
                        onChange: this.handleStartDateInputChange.bind(this),
                        onKeyPress: this.handleStartDateKeyPress.bind(this) }),
                    this.renderDatepicker("startDate")
                ),
                divider,
                endDateDatepicker
            );
            return content;
        }
    }]);

    return DatePicker;
}(_react2.default.Component);

DatePicker.propTypes = {
    isRange: _propTypes2.default.bool,
    minDate: _propTypes2.default.instanceOf(_moment2.default),
    maxDate: _propTypes2.default.instanceOf(_moment2.default),
    ignoreFontAwesome: _propTypes2.default.bool,
    enableTime: _propTypes2.default.bool,
    format: _propTypes2.default.string,
    inputWidth: _propTypes2.default.number,
    inputEditable: _propTypes2.default.bool,
    onChange: _propTypes2.default.func,
    defaultDate: _propTypes2.default.instanceOf(_moment2.default),
    defaultEndDate: _propTypes2.default.instanceOf(_moment2.default) // TODO: validate that it's b/w dates
};
DatePicker.defaultProps = {
    isRange: false,
    inputEditable: true,
    minDate: (0, _moment2.default)().subtract(50, "years"),
    maxDate: (0, _moment2.default)().add(50, "years"),
    ignoreFontAwesome: false,
    enableTime: false,
    onChange: noop
};


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

module.exports = DatePicker;
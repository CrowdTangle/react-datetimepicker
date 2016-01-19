'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _dateView = require('./date-view');

var _dateView2 = _interopRequireDefault(_dateView);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

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
            datepickerVisible: null,
            startDate: _this.props.defaultDate ? _this.props.defaultDate : (0, _moment2.default)(),
            endDate: _this.props.defaultDate ? (0, _moment2.default)(_this.props.defaultDate).add(1, "months") : (0, _moment2.default)().add(1, "months")
        };

        if (props.enableTime) {
            _this.state.format = "MM/DD/YYYY h:mm a";
        } else {
            _this.state.format = "MM/DD/YYYY";
        }

        if (props.format) {
            _this.state.format = _this.props.format;
        }
        return _this;
    }

    /**** helpers ****/

    // TODO: validate that it's b/w dates

    _createClass(DatePicker, [{
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

        /**** handlers ****/

    }, {
        key: 'toggleDatepicker',
        value: function toggleDatepicker(type) {
            this.setState({
                datepickerVisible: type
            });
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
            this.setState(newState, function () {
                if (this.props.IsRange) {
                    this.props.onChange({
                        startDate: this.state.startDate.toDate(),
                        endDate: this.state.endDate.toDate()
                    });
                } else {
                    this.props.onChange({
                        date: this.state.startDate.toDate()
                    });
                }
            }.bind(this));
        }

        /**** render methods ****/

    }, {
        key: 'renderDatepicker',
        value: function renderDatepicker(type) {
            if (this.state.datepickerVisible === type) {
                return _react2.default.createElement(_dateView2.default, { enableTime: this.props.enableTime, selectedDate: this.state[type], maxDate: this.getMaxDateForType(type), minDate: this.getMinDateForType(type), handleSelection: this.handleDateSelection.bind(this, type) });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var endDateDatepicker = null,
                divider = null;

            if (this.props.IsRange) {
                endDateDatepicker = _react2.default.createElement(
                    'div',
                    { className: 'datepicker-container' },
                    _react2.default.createElement('i', { className: 'fa fa-calendar' }),
                    _react2.default.createElement('input', { className: 'datepicker-input', readOnly: true, value: this.state.endDate.format(this.state.format), type: 'text', onClick: this.toggleDatepicker.bind(this, "endDate") }),
                    this.renderDatepicker("endDate")
                );
                divider = _react2.default.createElement(
                    'span',
                    { className: 'datepicker-divider' },
                    '-'
                );
            }

            var content = _react2.default.createElement(
                'div',
                { className: 'datepicker-wrapper' },
                _react2.default.createElement(
                    'div',
                    { className: 'datepicker-container' },
                    _react2.default.createElement('i', { className: 'fa fa-calendar' }),
                    _react2.default.createElement('input', { className: 'datepicker-input', readOnly: true, value: this.state.startDate.format(this.state.format), type: 'text', onClick: this.toggleDatepicker.bind(this, "startDate") }),
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
    IsRange: _react2.default.PropTypes.bool,
    minDate: _react2.default.PropTypes.instanceOf(_moment2.default),
    maxDate: _react2.default.PropTypes.instanceOf(_moment2.default),
    ignoreFontAwesome: _react2.default.PropTypes.bool,
    enableTime: _react2.default.PropTypes.bool,
    format: _react2.default.PropTypes.string,
    onChange: _react2.default.PropTypes.func,
    defaultDate: _react2.default.PropTypes.instanceOf(_moment2.default) };
DatePicker.defaultProps = {
    IsRange: false,
    minDate: (0, _moment2.default)(new Date(0)),
    maxDate: (0, _moment2.default)().add(20, "years"),
    ignoreFontAwesome: false,
    enableTime: false,
    onChange: noop
};

function noop(data) {
    console.log("changing", data);
}

module.exports = DatePicker;
import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import DateView from "./date-view";
import moment from "moment-timezone";
import chrono from "chrono-node";

const DEFAULT_DATE_FORMAT = "MM/DD/YYYY";
const DEFAULT_DATE_TIME_FORMAT = "MM/DD/YYYY h:mm a";
const ENTER_KEY = "Enter";

class DatePicker extends React.Component {

    static propTypes = {
        isRange: PropTypes.bool,
        minDate: PropTypes.instanceOf(moment),
        maxDate: PropTypes.instanceOf(moment),
        ignoreFontAwesome: PropTypes.bool,
        enableTime: PropTypes.bool,
        format: PropTypes.string,
        inputWidth: PropTypes.number,
        inputEditable: PropTypes.bool,
        onChange: PropTypes.func,
        timezone: PropTypes.string,
        defaultDate: PropTypes.instanceOf(moment),
        defaultEndDate: PropTypes.instanceOf(moment) // TODO: validate that it's b/w dates
    };

    static defaultProps = {
        isRange: false,
        inputEditable: true,
        minDate: moment().subtract(50, "years"),
        maxDate: moment().add(50, "years"),
        ignoreFontAwesome: false,
        enableTime: false,
        timezone: "UTC",
        onChange: noop
    };

    constructor(props) {
        super(props);

        let endDate = this.props.defaultEndDate;
        let startDate = this.props.defaultDate;


        if (!startDate) {
          startDate = moment.tz(this.props.timezone);
        } else {
          startDate.tz(this.props.timezone);
        }

        if (!endDate) {
          endDate = moment.tz(startDate, this.props.timezone).add(1, "months");
        } else {
          endDate.tz(this.props.timezone);
        }

        let dateFormat;
        if (props.format) {
            dateFormat = props.format;
        } else if (props.enableTime) {
            dateFormat = DEFAULT_DATE_TIME_FORMAT;
        } else {
            dateFormat = DEFAULT_DATE_FORMAT;
        }

        this.state = {
            datepickerVisible: null,
            endDate: endDate,
            endDateInputValue: endDate.format(dateFormat), // String value of date
            endInputHasChanged: false,
            startDate: startDate,
            startDateInputValue: startDate.format(dateFormat), // String value of date
            startInputHasChanged: false,
            format: dateFormat
        };

        var toggleFunction = this.toggleDatepicker.bind(this, null);

        this.naturalBinders = getBinders(toggleFunction);

        this.dateView = React.createRef();

    }

    componentDidMount() {
        if (this.props.isRange) {
            this.props.onChange({
                startDate: clone(this.state.startDate, this.props.timezone),
                endDate: clone(this.state.endDate, this.props.timezone)
            });
        } else {
            this.props.onChange({
                date: clone(this.state.startDate, this.props.timezone)
            });
        }
    }

    getValue() {
      if (this.props.isRange) {
          return {
              startDate: clone(this.state.startDate, this.props.timezone),
              endDate: clone(this.state.endDate, this.props.timezone)
          };
      } else {
          return {
              date: clone(this.state.startDate, this.props.timezone)
          };
      }
    }

    componentWillReceiveProps(newProps) {
        // if the date has changed from the parent AND
        // it's different than the date we have in state, use it
        if (
            (!this.state.endDate.isSame(newProps.defaultEndDate)
            && newProps.defaultEndDate !== this.props.defaultEndDate
            && !newProps.defaultEndDate.isSame(this.props.defaultEndDate))
            ||
            (!this.state.startDate.isSame(newProps.defaultDate)
            && !newProps.defaultDate !== this.props.defaultDate
            && !newProps.defaultDate.isSame(this.props.defaultDate))
            ) {
            let endDate = newProps.defaultEndDate;
            let startDate = newProps.defaultDate;

            if (!startDate) {
              startDate = moment.tz(newProps.timezone);
            } else {
              startDate = startDate.tz(newProps.timezone);
            }

            if (!endDate) {
              endDate = clone(startDate, newProps.timezone).add(1, "months");
            } else {
              endDate = endDate.tz(newProps.timezone);
            }

            this.setState({
                endDate: endDate,
                startDate: startDate,
                endDateInputValue: endDate.format(this.state.format),
                startDateInputValue: startDate.format(this.state.format)
            });
        }
    }


    toggleGlobalClickBinding() {
        if (this.state.datepickerVisible) {
            this.naturalBinders.bind();
        } else {
            this.naturalBinders.unbind();
        }
    }

    /**** helpers ****/

    getMinDateForType(type) {
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

    getMaxDateForType(type) {
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

    validateDateString(string) {
      // add the timezone onto the string so it's properly converted
      // Chrono returns a datetime stamp for valid dates, and for invalid dates, returns null
      const date = chrono.parseDate(string + " " + moment.tz(this.props.timezone).format('Z'));
      return date;
    }

    /**** handlers ****/

    toggleDatepicker(type, e) {
        if (e) {
            e.stopPropagation();
        }

        this.setState({
            datepickerVisible: type
        }, this.toggleGlobalClickBinding.bind(this));
    }

    openDatepicker(type, e) {
        if (e) {
            e.stopPropagation();
        }

        this.setState({
            datepickerVisible: type
        });
    }


    closeDatepicker(type, e) {
        if (e) {
            e.stopPropagation();
        }

        if (type === "startDate") {
            this.handleStartDateSet();
        } else if (type === "endDate") {
            this.handleEndDateSet();
        }

        this.toggleGlobalClickBinding();
    }

    handleDateSelection(type, date, options) {
        var mutableDate = clone(date, this.props.timezone);

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
            newState[`${type}InputValue`] = date.format(this.state.format);
        }

        this.setState(newState, this.handleOnChange.bind(this));
    }

    handleStartDateInputChange(e) {
        this.setState({
            startDateInputValue: e.target.value,
            startInputHasChanged: true
        });
    }

    handleEndDateInputChange(e) {
        this.setState({
            endDateInputValue: e.target.value,
            endInputHasChanged: true
        });
    }

    handleStartDateKeyPress(e) {
        if (e.key === ENTER_KEY) {
            this.handleStartDateSet();
        }
    }

    handleEndDateKeyPress(e) {
        if (e.key === ENTER_KEY) {
            this.handleEndDateSet();
        }
    }


    handleStartDateSet() {

        const {startInputHasChanged, startDateInputValue, format} = this.state;
        const {enableTime, timezone} = this.props;
        const dateString = this.validateDateString(startDateInputValue);
        const startDate = moment(startDateInputValue, "MM/DD/YYYY hh:mm a").tz(timezone, true);
        const minDate = this.getMinDateForType("startDate");
        const maxDate = this.getMaxDateForType("startDate");

        if (!enableTime) {
            // round to make sure it's simply the same date;
            startDate.hour(0).minute(0).second(0).millisecond(0);
        }
        // If it's a valid date string and the date is within range, set the start date to be the input value
        if (startInputHasChanged && dateString && startDate.isSameOrAfter(minDate) && startDate.isSameOrBefore(maxDate)) {

            this.setState({
                startDate: startDate,
                startDateInputValue: startDate.format(format),
                startInputHasChanged: false
            }, () => {
                this.handleOnChange();
                if (this.dateView.current) {
                    this.dateView.current.reset();
                }
            });
        } else {
            // maybe we need to move this
            // If invalid date, set input value back to the last validated date
            this.setState({
                startDateInputValue: this.state.startDate.format(format)
            });
        }
    }

    handleEndDateSet() {
        const {endInputHasChanged, endDateInputValue, format} = this.state;
        const {enableTime, timezone} = this.props;
        const dateString = this.validateDateString(endDateInputValue);
        const endDate = moment(endDateInputValue, "MM/DD/YYYY hh:mm a").tz(timezone, true);
        const minDate = this.getMinDateForType("endDate");
        const maxDate = this.getMaxDateForType("endDate");


        if (!enableTime) {
            // round to make sure it's simply the same date;
            endDate.hour(0).minute(0).second(0).millisecond(0);
        }
        // If it's a valid date string and the date is within range, set the start date to be the input value
        if (endInputHasChanged && dateString && endDate.isSameOrAfter(minDate) && endDate.isSameOrBefore(maxDate)) {
            this.setState({
                endDate: endDate,
                endDateInputValue: endDate.format(format),
                endInputHasChanged: false
            }, () => {
                this.handleOnChange();
                if (this.dateView.current) {
                    this.dateView.current.reset();
                }
            });
        } else {
            // If invalid date, set input value back to the last validated date
            this.setState({
                endDateInputValue: this.state.endDate.format(format)
            });
        }
    }

    handleOnChange() {
        if (this.props.isRange) {
            this.props.onChange({
                startDate: this.state.startDate,
                endDate: this.state.endDate
            });
        } else {
            this.props.onChange({
                date: this.state.startDate
            });
        }

        this.toggleGlobalClickBinding();

    }

    /**** render methods ****/

    renderDatepicker(type) {
        if (this.state.datepickerVisible === type) {
            return <DateView
                ref={this.dateView}
                enableTime={this.props.enableTime}
                selectedDate={clone(this.state[type], this.props.timezone)}
                timezone={this.props.timezone}
                maxDate={this.getMaxDateForType(type)}
                minDate={this.getMinDateForType(type)}
                handleSelection={this.handleDateSelection.bind(this, type)} />;
        }
    }

    render() {
        var endDateDatepicker = null, divider = null, styles = {};

        if (this.props.inputWidth) {
            styles.width = this.props.inputWidth + "px";
        } else if (this.props.enableTime) {
            styles.width = "165px";
        } else {
            styles.width = "115px";
        }

        if (this.props.isRange) {
            const endDateValue = this.props.inputEditable ? this.state.endDateInputValue : this.state.endDate.format(this.state.format);
            endDateDatepicker = (
                <div className="datepicker-container">
                    <i className="fa fa-calendar"></i>
                    <input style={styles}
                        className="datepicker-input"
                        readOnly={!this.props.inputEditable}
                        value={endDateValue}
                        type="text"

                        onChange={this.handleEndDateInputChange.bind(this)}
                        onBlur={this.closeDatepicker.bind(this, "endDate")}
                        onFocus={this.openDatepicker.bind(this, "endDate")}
                        onKeyPress={this.handleEndDateKeyPress.bind(this)} />
                    {this.renderDatepicker("endDate")}
                </div>
            );
            divider = <span className="datepicker-divider">-</span>;
        }
        const startDateValue = this.props.inputEditable ? this.state.startDateInputValue : this.state.startDate.format(this.state.format);

        var content = (
            <div onClick={stopBubble} className="datepicker-wrapper">
                <div className="datepicker-container">
                    <i className="fa fa-calendar"></i>
                    <input style={styles}
                        className="datepicker-input"
                        readOnly={!this.props.inputEditable}
                        value={startDateValue}
                        type="text"
                        onBlur={this.closeDatepicker.bind(this, "startDate")}
                        onFocus={this.openDatepicker.bind(this, "startDate")}
                        onChange={this.handleStartDateInputChange.bind(this)}
                        onKeyPress={this.handleStartDateKeyPress.bind(this)} />
                    {this.renderDatepicker("startDate")}
                </div>
                {divider}
                {endDateDatepicker}
            </div>
        );
        return content;
    }
}

function stopBubble(e) {
    e.nativeEvent.stopImmediatePropagation();
}

function getBinders(callback) {

    return {
        bind: function(){
            document.addEventListener("click", callback, false);
        },

        unbind: function() {
            document.removeEventListener("click", callback, false);
        }
    };
}

function noop(data) {
    console.log("changing", data);
}

function clone(m, tz) {
  return moment.tz(m.valueOf(), tz);
}


module.exports = DatePicker;

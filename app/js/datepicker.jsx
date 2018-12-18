import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import DateView from './date-view';
import moment from 'moment';
import chrono from 'chrono-node';

const DEFAULT_DATE_FORMAT = "MM/DD/YYYY";
const DEFAULT_DATE_TIME_FORMAT = "MM/DD/YYYY h:mm a";
const CHAR_CODE_ENTER = 13;

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
        defaultDate: PropTypes.instanceOf(moment),
        defaultEndDate: PropTypes.instanceOf(moment) // TODO: validate that it's b/w dates
    };

    static defaultProps = {
        isRange: false,
        inputEditable: false,
        minDate: moment().subtract(20, "years"),
        maxDate: moment().add(20, "years"),
        ignoreFontAwesome: false,
        enableTime: false,
        onChange: noop
    };

    constructor(props) {
        super(props);

        let endDate = this.props.defaultEndDate;
        let startDate = this.props.defaultDate;


        if(!startDate) {
            startDate = moment();
        }

        if (!endDate) {
            endDate = moment(startDate).add(1, "months");
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
            startDate: startDate,
            endDateInputValue: endDate.format(dateFormat), // String value of date
            startDateInputValue: startDate.format(dateFormat), // String value of date
            format: dateFormat
        };

        console.log("setting state", endDate.format(), startDate.format());

        var toggleFunction = this.toggleDatepicker.bind(this, null);

        this.naturalBinders = getBinders(toggleFunction);

    }

    componentDidMount() {
        if(this.props.isRange) {
            this.props.onChange({
                startDate: this.state.startDate.toDate(),
                endDate: this.state.endDate.toDate()
            })
        } else {
            this.props.onChange({
                date: this.state.startDate.toDate()
            })
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.defaultEndDate !== this.props.defaultEndDate ||
            newProps.defaultDate !== this.props.defaultDate) {
            let endDate = newProps.defaultEndDate;
            let startDate = newProps.defaultDate;

            if(!startDate) {
                startDate = moment();
            }

            if (!endDate) {
                endDate = moment(startDate).add(1, "months");
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
        var wrapper = ReactDOM.findDOMNode(this);

        if(this.state.datepickerVisible) {
            this.naturalBinders.bind();
        } else {
            this.naturalBinders.unbind();
        }
    }

    /**** helpers ****/

    getMinDateForType(type) {
        if(type === "startDate") {
            return this.props.minDate;
        } else if(type === "endDate") {
            if(this.state.startDate.isAfter(this.props.minDate)) {
                return this.state.startDate;
            } else {
                return this.props.minDate;
            }
        } else {
            throw Error("unknown type sent to getMinDateForType. type: " + type);
        }
    }

    getMaxDateForType(type) {
        if(type === "endDate") {
            return this.props.maxDate;
        } else if(type === "startDate") {
            if(this.state.endDate.isBefore(this.props.maxDate) && this.props.isRange) {
                return this.state.endDate;
            } else {
                return this.props.maxDate;
            }
        } else {
            throw Error("unknown type sent to getMaxDateForType. type: " + type);
        }
    }

    validateDateString(string) {
        // Chrono returns a datetime stamp for valid dates, and for invalid dates, returns null
        return chrono.parseDate(string);
    }

    /**** handlers ****/

    toggleDatepicker(type, e) {
        if(e) e.stopPropagation();

        this.setState({
            datepickerVisible: type
        }, this.toggleGlobalClickBinding.bind(this));
    }

    handleDateSelection(type, date, options) {
        var mutableDate = moment(date);

        // round to make sure it's simply the same date;
        mutableDate.hour(0).minute(0).second(0).millisecond(0);
        if(mutableDate.isBefore(this.props.minDate) || mutableDate.isAfter(this.props.maxDate)) {
            return false;
        }

        if(type === "endDate") {
            if(date.isSameOrBefore(this.state.startDate)) {
                return false;
            }
        } else if(type === "startDate") {
            if(date.isSameOrAfter(this.state.endDate) && this.props.isRange) {
                return false;
            }
        }

        var newState = {};
        newState.datepickerVisible = null;

        if(options && typeof options.collapse === "boolean") {
            if(!options.collapse) {
                newState.datepickerVisible = type;
            }
        }


        newState[type] = date;
        if (this.props.inputEditable) {
            newState[`${type}InputValue`] = date.format(this.state.format);
        }

        this.setState(newState, function() {

            if(this.props.isRange) {
                this.props.onChange({
                    startDate: this.state.startDate.toDate(),
                    endDate: this.state.endDate.toDate()
                })
            } else {
                this.props.onChange({
                    date: this.state.startDate.toDate()
                })
            }

            this.toggleGlobalClickBinding();
        }.bind(this));


    }

    handleStartDateInputChange(e) {
        this.setState({
            startDateInputValue: e.target.value
        });
    }

    handleEndDateInputChange(e) {
        this.setState({
            endDateInputValue: e.target.value
        });
    }

    handleStartDateKeyPress(e) {
        if (e.charCode === CHAR_CODE_ENTER) {
            this.handleStartDateSet();
        }
    }

    handleEndDateKeyPress(e) {
        if (e.charCode === CHAR_CODE_ENTER) {
            this.handleEndDateSet();
        }
    }

    handleStartDateSet() {
        const dateString = this.validateDateString(this.state.startDateInputValue);
        if (dateString) {
            this.setState({
                startDate: moment(dateString)
            })
        } else {
            // If invalid date, set input value back to the last validated date
            this.setState({
                startDateInputValue: this.state.startDate.format(this.state.format)
            })
        }

        this.forceUpdate();
    }

    handleEndDateSet() {
        const dateString = this.validateDateString(this.state.startDateInputValue);
        if (dateString) {
            this.setState({
                endDate: moment(dateString)
            })
        } else {
            // If invalid date, set input value back to the last validated date
            this.setState({
                endDateInputValue: this.state.endDate.format(this.state.format)
            })
        }

        this.forceUpdate();
    }

    /**** render methods ****/

    renderDatepicker(type) {
        if(this.state.datepickerVisible === type) {
            return <DateView enableTime={this.props.enableTime} selectedDate={this.state[type]} maxDate={this.getMaxDateForType(type)} minDate={this.getMinDateForType(type)} handleSelection={this.handleDateSelection.bind(this, type)} />;
        }
    }

    render() {
        var endDateDatepicker = null, divider = null, styles = {};

        if(this.props.inputWidth) {
            styles.width = this.props.inputWidth + "px";
        } else if(this.props.enableTime) {
            styles.width = "120px";
        } else {
            styles.width = "70px";
        }

        if(this.props.isRange) {
            const endDateValue = this.props.inputEditable ? this.state.endDateInputValue : this.state.endDate.format(this.state.format);
            endDateDatepicker = (
                <div className="datepicker-container">
                    <i className="fa fa-calendar"></i>
                    <input  style={styles}
                            className="datepicker-input"
                            readOnly={!this.props.inputEditable}
                            value={endDateValue}
                            type="text"
                            onClick={this.toggleDatepicker.bind(this, "endDate")}
                            onChange={this.handleEndDateInputChange.bind(this)}
                            onBlur={this.handleEndDateSet.bind(this)}
                            onKeyPress={this.handleEndDateKeyPress.bind(this)} />
                    {this.renderDatepicker("endDate")}
                </div>
            );
            divider =  <span className="datepicker-divider">-</span>;
        }
        const startDateValue = this.props.inputEditable ? this.state.startDateInputValue : this.state.startDate.format(this.state.format);

        var content = (
            <div onClick={stopBubble} className="datepicker-wrapper">
                <div className="datepicker-container">
                    <i className="fa fa-calendar"></i>
                    <input  style={styles}
                            className="datepicker-input"
                            readOnly={!this.props.inputEditable}
                            value={startDateValue}
                            type="text"
                            onBlur={this.handleStartDateSet.bind(this)}
                            onChange={this.handleStartDateInputChange.bind(this)}
                            onClick={this.toggleDatepicker.bind(this, "startDate")}
                            onKeyPress={this.handleStartDateKeyPress.bind(this)} />
                    {this.renderDatepicker("startDate")}
                </div>
                {divider}
                {endDateDatepicker}
            </div>
        )
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
    }
}

function noop(data) {
   console.log("changing", data);
}


module.exports = DatePicker;

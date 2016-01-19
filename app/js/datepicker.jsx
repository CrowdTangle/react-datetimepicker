import React from 'react';
import ReactDOM from 'react-dom';
import DateView from './date-view';
import moment from 'moment';


class DatePicker extends React.Component {

    static propTypes = { 
        IsRange: React.PropTypes.bool,
        minDate: React.PropTypes.instanceOf(moment),
        maxDate: React.PropTypes.instanceOf(moment),
        ignoreFontAwesome: React.PropTypes.bool,
        enableTime: React.PropTypes.bool,
        format: React.PropTypes.string,
        onChange: React.PropTypes.func,
        defaultDate: React.PropTypes.instanceOf(moment) // TODO: validate that it's b/w dates
    };

    static defaultProps = {
        IsRange: false,
        minDate: moment(new Date(0)),
        maxDate: moment().add(20, "years"),
        ignoreFontAwesome: false,
        enableTime: false,
        onChange: noop
    };

    constructor(props) {
        super(props);

        this.state = {
            datepickerVisible: null,
            startDate: this.props.defaultDate ? this.props.defaultDate : moment(),
            endDate: this.props.defaultDate ? moment(this.props.defaultDate).add(1, "months") : moment().add(1, "months")
        }

        if(props.enableTime) {
            this.state.format = "MM/DD/YYYY h:mm a";
        } else {
            this.state.format = "MM/DD/YYYY";
        }

        if(props.format) {
            this.state.format = this.props.format;
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


    /**** handlers ****/

    toggleDatepicker(type) {
        this.setState({
            datepickerVisible: type
        })
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
        this.setState(newState, function() {
            if(this.props.IsRange) {
                this.props.onChange({
                    startDate: this.state.startDate.toDate(),
                    endDate: this.state.endDate.toDate()
                })
            } else {
                this.props.onChange({
                    date: this.state.startDate.toDate()
                })
            }
        }.bind(this));


    }

    /**** render methods ****/

    renderDatepicker(type) {
        if(this.state.datepickerVisible === type) {
            return <DateView enableTime={this.props.enableTime} selectedDate={this.state[type]} maxDate={this.getMaxDateForType(type)} minDate={this.getMinDateForType(type)} handleSelection={this.handleDateSelection.bind(this, type)} />;
        }
    }

    render() {
        var endDateDatepicker = null, divider = null;

        if(this.props.IsRange) {
            endDateDatepicker = (
                <div className="datepicker-container">
                    <i className="fa fa-calendar"></i>
                    <input className="datepicker-input" readOnly={true} value={this.state.endDate.format(this.state.format)} type="text" onClick={this.toggleDatepicker.bind(this, "endDate")} />
                    {this.renderDatepicker("endDate")}
                </div> 
            );
            divider =  <span className="datepicker-divider">-</span>;
        }

        var content = (
            <div className="datepicker-wrapper">
                <div className="datepicker-container">
                    <i className="fa fa-calendar"></i>
                    <input className="datepicker-input" readOnly={true} value={this.state.startDate.format(this.state.format)} type="text" onClick={this.toggleDatepicker.bind(this, "startDate")} />
                    {this.renderDatepicker("startDate")}
                </div>
                {divider}
                {endDateDatepicker}
            </div>    
        )
        return content;
    }
}

function noop(data) {
   console.log("changing", data);
}

module.exports = DatePicker;
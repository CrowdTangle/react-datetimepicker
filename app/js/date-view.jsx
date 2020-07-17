import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import MonthView from './month-view';
import classnames from 'classnames';

class DatePicker extends React.Component {

    static propTypes = {
        minDate: PropTypes.instanceOf(moment),
        maxDate: PropTypes.instanceOf(moment),
        selectedDate: PropTypes.instanceOf(moment), // todo validate that it's between min and max
        enableTime: PropTypes.bool
    };

    constructor(props) {
        super(props);
        const {selectedDate} = this.props;

        this.state = {
            currentHour: this.getHourIn12Format(selectedDate.hour()),
            currentMinute: this.getMinuteFormatted(selectedDate.minute()),
            currentAmpm: selectedDate.format("a"),
            currentDateWithoutTime: selectedDate,
            timepickerVisible: false
        };
    }

    reset() {
        const {selectedDate} = this.props;

        this.setState({
            currentHour: this.getHourIn12Format(selectedDate.hour()),
            currentMinute: this.getMinuteFormatted(selectedDate.minute()),
            currentAmpm: selectedDate.format("a"),
            currentDateWithoutTime: selectedDate,
        });
    }

    getHourIn12Format(hourVal) {
        console.log("HANNA FORMATTING HOUR " + hourVal);
        let result = hourVal;
        if (result < 0) {
            result = 0;
        }
        result = parseInt(result);
        result = result % 12;
        if (result === 0) {
            result = 12;
        }
        return result;
    }

    getMinuteFormatted(minuteVal) {
        console.log("HANNA FORMATTING MINUTE ", minuteVal);
        let result = minuteVal;
        if (result < 0) {
            result = 0;
        }
        result = parseInt(result);
        return result % 60;
    }

    getDateObj(currentHour, currentMinute, currentAmpm, newDate) {
        const {currentDateWithoutTime} = this.state;

        const dateToUse = newDate ? newDate : currentDateWithoutTime;

        const currentDate = dateToUse.clone();
        let hourIn24 = currentHour;
        if (currentAmpm === "am" && currentHour === 12) {
            hourIn24 = 0;
        } else if (currentAmpm === "pm" && currentHour < 12) {
            hourIn24 += 12;
        }

        console.log("HANNA 24 HR ", hourIn24);

        currentDate.hour(hourIn24);
        currentDate.minute(currentMinute);

        console.log("HANNA CURRENT DATE ", currentDate);

        return currentDate;
    }

    shiftDate(direction) {
        const {currentHour, currentMinute, currentAmpm} = this.state;

        let currentDate = this.getDateObj(currentHour, currentMinute, currentAmpm);
        if(direction === "back") {
            currentDate = currentDate.subtract(1, "months");
        } else {
            currentDate = currentDate.add(1, "months");
        }

        this.setState({
            currentHour,
            currentMinute,
            currentAmpm,
            currentDateWithoutTime: currentDate,
        });
    }

    handleDateSelection(date, options) {
        const {handleSelection} = this.props;
        const {currentHour, currentMinute, currentAmpm} = this.state;

        const dateObj = this.getDateObj(currentHour, currentMinute, currentAmpm, date);
        handleSelection(dateObj, options);
    }

    handleTimeSelection(date, options) {
        const {handleSelection} = this.props;

        handleSelection(date, options);
    }

    handleHourChange() {
        console.log("HANNA NAN CHECK ", this.hour.value, parseInt(this.hour.value), this.hour.value === '', this.hour.value === "");

        let hourVal = this.hour.value ? parseInt(this.hour.value) : 0;
        hourVal = isNaN(hourVal) ? 0 : hourVal;

        this.setState({
            currentHour: hourVal,
        });
    }

    handleMinuteChange() {
        const minuteVal = this.minute.value ? parseInt(this.minute.value) : 0;

        this.setState({
            currentMinute: minuteVal,
        });
    }

    handleAmPmChange() {
        const {currentHour, currentMinute} = this.state;

        const ampmVal = this.ampm.value;
        const formattedHr = this.getHourIn12Format(currentHour);
        const formattedMin = this.getMinuteFormatted(currentMinute);

        this.setState({
            currentHour: formattedHr,
            currentMinute: formattedMin,
            currentAmpm: ampmVal,
        });

        const dateObj = this.getDateObj(formattedHr, formattedMin, ampmVal);
        this.handleTimeSelection(dateObj, {collapse: false});
    }

    handleKeyDown(e) {
        const {currentHour, currentMinute} = this.state;
        var key = e.which || e.keyCode,
            wasEnter = key === 13;

        if(wasEnter) {
            const formattedHr = this.getHourIn12Format(currentHour);
            const formattedMin = this.getMinuteFormatted(currentMinute);
            this.setState({
                currentHour: formattedHr,
                currentMinute: formattedMin,
            });
            this.toggleTimepicker();
        }
    }

    toggleTimepicker() {
        const {currentHour, currentMinute, currentAmpm, timepickerVisible} = this.state;

        const wasOpenButNowShouldBeClosed = timepickerVisible;

        console.log("HANNA TIMEPICKER VISIBLE ", timepickerVisible);

        this.setState({
            timepickerVisible: !timepickerVisible
        }, function() {
            if(wasOpenButNowShouldBeClosed) {
                const dateObj = this.getDateObj(currentHour, currentMinute, currentAmpm);
                console.log("HANNA - HANDLING SELECTION ", dateObj);
                this.handleTimeSelection(dateObj, {
                    collapse: false
                });
            }

        }.bind(this))
    }

    renderArrow(direction) {
        const {ignoreFontAwesome} = this.props;

        var classes = "month-switcher " + direction, content;
        if(ignoreFontAwesome) {
            if(direction === "back") {
                content = <span>&lsaquo;</span>;
            } else {
                content = <span>&rsaquo;</span>;
            }

        } else {
            var styles = {
                fontSize: "13px"
            }
            if(direction === "back") {
                content = <i style={styles} className="fa fa-chevron-left"></i>;
            } else {
                content = <i style={styles} className="fa fa-chevron-right"></i>;
            }
        }

        return <span onClick={this.shiftDate.bind(this, direction)} className={classes}>{content}</span>
    }

    renderDayLetters() {
        return (
            <div className="datepicker-day-headers">
                <span>SUN</span>
                <span>MON</span>
                <span>TUE</span>
                <span>WED</span>
                <span>THU</span>
                <span>FRI</span>
                <span>SAT</span>
            </div>
        );
    }

    renderTimePickerHeaderContent() {
        const {currentHour, currentMinute, currentAmpm, timepickerVisible} = this.state;

        const currentDate = this.getDateObj(currentHour, currentMinute, currentAmpm);
        const displayMin = currentDate.format("mm");

        var content = (
            <span>
                <i className="fa fa-clock-o"></i>
                <span className="header-time">
                    {currentHour}:{displayMin}&nbsp;{currentAmpm}
                </span>
            </span>
        );

        if(timepickerVisible) {
            content = <span>done</span>
        }

        return content;
    }

    renderTimePicker() {
        const {enableTime} = this.props;
        const {currentHour, currentMinute, currentAmpm, timepickerVisible} = this.state;

        if(!enableTime) { return; }

        console.log("HANNA - STATE.HOUR", currentHour);

        var classes = classnames("datepicker-timepicker", {
            "visible": timepickerVisible
        });

        const currentDate = this.getDateObj(currentHour, currentMinute, currentAmpm);
        const displayHr = currentHour === 0 ? currentHour : currentDate.format("hh");
        const displayMin = currentDate.format("mm");
        console.log("HANNA CURRENT DATE MINUTE", currentDate.minute());

        return (
            <div className={classes}>
                <div onClick={this.toggleTimepicker.bind(this)} className="datepicker-timepicker-header">
                    {this.renderTimePickerHeaderContent()}
                </div>
                <div className="timepicker-inputs">
                    <div className="input-row">
                        <input className="input-hours"
                               ref={(h) => { this.hour = h; }}
                               value={displayHr}
                               type="number"
                               min={1}
                               max={12}
                               maxLength={2}
                               onChange={this.handleHourChange.bind(this)}
                               onKeyDown={this.handleKeyDown.bind(this)}
                               tabIndex="-1" />:
                        <input className="input-minutes"
                               ref={(m) => { this.minute = m; }}
                               value={displayMin}
                               type="number"
                               min={0}
                               max={59}
                               maxLength={2}
                               onChange={this.handleMinuteChange.bind(this)}
                               onKeyDown={this.handleKeyDown.bind(this)}
                               tabIndex="-1" />
                        <select className="ampm-picker ignore-chosen"
                                ref={(ampm) => { this.ampm = ampm; }}
                                value={currentAmpm}
                                onChange={this.handleAmPmChange.bind(this)}
                                tabIndex="-1" >
                            <option value="am">AM</option>
                            <option value="pm">PM</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const {enableTime, maxDate, minDate, selectedDate, timezone} = this.props;
        const {currentHour, currentMinute, currentAmpm} = this.state;

        const classes = classnames("datepicker", {
            "time-enabled": enableTime
        });
        const dateObj = this.getDateObj(currentHour, currentMinute, currentAmpm);

        return (
            <div className={classes}>
                <h3>
                    {this.renderArrow("back")}
                    <span>{dateObj.format("MMMM YYYY")}</span>
                    {this.renderArrow("forward")}
                </h3>
                {this.renderDayLetters()}
                <MonthView timezone={timezone} selectedDate={selectedDate} minDate={minDate} maxDate={maxDate} handleSelection={this.handleDateSelection.bind(this)} date={dateObj} />
                {this.renderTimePicker()}
            </div>
        );
    }
}


module.exports = DatePicker;

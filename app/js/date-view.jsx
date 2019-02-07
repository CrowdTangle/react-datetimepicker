import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import MonthView from './month-view';
import classnames from 'classnames';

const DEFAULT_HOUR_VAL = 12;
const DEFAULT_MINUTE_VAL = 0;

class DatePicker extends React.Component {

    static propTypes = {
        minDate: PropTypes.instanceOf(moment),
        maxDate: PropTypes.instanceOf(moment),
        selectedDate: PropTypes.instanceOf(moment), // todo validate that it's between min and max
        enableTime: PropTypes.bool
    };

    constructor(props) {
        super(props);
        this.state = {
            date: this.props.selectedDate,
            timepickerVisible: false
        };
    }

    reset() {
      this.setState({
        date: this.props.selectedDate
      });
    }

    shiftDate(direction) {
        var date = this.state.date;
        if(direction === "back") {
            date = date.subtract(1, "months");
        } else {
            date = date.add(1, "months");
        }

        this.setState({
            date: date
        })
    }

    getMinute() {
        let minute = this.state.date.minute();
        if (isNaN(minute)) {
            minute = DEFAULT_MINUTE_VAL;
        }

        if(minute < 10) {
            minute = "0" + minute;
        }

        return minute;
    }

    getHour() {
        let hour = this.state.date.hour();
        if (isNaN(hour)) {
            hour = DEFAULT_HOUR_VAL;
        }
        if(hour > 12) {
            hour = hour - 12;
        }

        if(hour === 0) {
            hour = 12;
        }

        return hour;
    }

    getAmPm() {
        return this.state.date.format("a");
    }

    handleSelection(date, options) {
        date.hour(this.state.date.hour());
        date.minute(this.state.date.minute());
        this.props.handleSelection(date, options);
    }

    handleHourChange() {
        let date = this.state.date;
        const hourVal = parseInt(this.hour.value);
        let value = DEFAULT_HOUR_VAL;

        if (!isNaN(hourVal)) {
            value = hourVal;
        }

        if(this.getAmPm() === "pm") {
            value += 12;
        }

        console.log("setting hour to " + value);

        date.hour(value);

        this.setState({
            date: date
        })
    }

    handleMinuteChange() {
        let date = this.state.date;
        const minuteVal = parseInt(this.minute.value);
        let value = DEFAULT_MINUTE_VAL;

        if (!isNaN(minuteVal)) {
            value = minuteVal;
        }

        date.minute(value);

        this.setState({
            date: date
        })
    }

    handleAmPmChange() {
        var currentValue = this.getAmPm(),
            changedValue = this.ampm.value,
            hour = this.state.date.hour();

        if(currentValue != changedValue) {
            if(changedValue === "am" && hour >= 12) {
                hour -= 12;
            } else if(changedValue === "pm" && hour < 12) {
                hour += 12;
            }

            var date = this.state.date;
            date.hour(hour);

            this.setState({
                date: date
            })
        }
    }

    handleKeyDown(e) {
        var key = e.which || e.keyCode,
            wasEnter = key === 13;

        if(wasEnter) {
            this.toggleTimepicker();
        }
    }

    toggleTimepicker() {
        this.setState({
            timepickerVisible: !this.state.timepickerVisible
        }, function() {
            if(!this.state.timepickerVisible) {
                this.handleSelection(this.state.date, {
                    collapse: false
                });
            }

        }.bind(this))
    }

    renderArrow(direction) {
        var classes = "month-switcher " + direction, content;
        if(this.props.ignoreFontAwesome) {
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
                <span>S</span>
                <span>M</span>
                <span>T</span>
                <span>W</span>
                <span>T</span>
                <span>F</span>
                <span>S</span>
            </div>
        );
    }

    renderTimePickerHeaderContent() {
        var content = (
            <span>
                <i className="fa fa-clock-o"></i>
                <span className="header-time">
                    {this.getHour()}:{this.getMinute()}&nbsp;{this.getAmPm()}
                </span>
            </span>
        );

        if(this.state.timepickerVisible) {
            content = <span>done</span>
        }

        return content;
    }

    renderTimePicker() {
        if(!this.props.enableTime) { return; }

        var classes = classnames("datepicker-timepicker", {
            "visible": this.state.timepickerVisible
        });

        return (
            <div className={classes}>
                <div onClick={this.toggleTimepicker.bind(this)} className="datepicker-timepicker-header">
                    {this.renderTimePickerHeaderContent()}
                </div>
                <div className="timepicker-inputs">
                    <div className="input-row">
                        <input className="input-hours"
                               ref={(h) => { this.hour = h; }}
                               value={this.getHour()}
                               type="number"
                               min={1}
                               max={12}
                               maxLength={2}
                               onChange={this.handleHourChange.bind(this)}
                               onKeyDown={this.handleKeyDown.bind(this)}
                               tabIndex="-1" />:
                        <input className="input-minutes"
                               ref={(m) => { this.minute = m; }}
                               value={this.getMinute()}
                               type="number"
                               min={0}
                               max={59}
                               maxLength={2}
                               onChange={this.handleMinuteChange.bind(this)}
                               onKeyDown={this.handleKeyDown.bind(this)}
                               tabIndex="-1" />
                        <select className="ampm-picker ignore-chosen"
                                ref={(ampm) => { this.ampm = ampm; }}
                                value={this.getAmPm()}
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
        var classes = classnames("datepicker", {
            "time-enabled": this.props.enableTime
        })

        return (
            <div className={classes}>
                <h3>
                    {this.renderArrow("back")}
                    <span>{this.state.date.format("MMMM YYYY")}</span>
                    {this.renderArrow("forward")}
                </h3>
                {this.renderDayLetters()}
                <MonthView selectedDate={this.props.selectedDate} minDate={this.props.minDate} maxDate={this.props.maxDate} handleSelection={this.handleSelection.bind(this)} date={this.state.date} />
                {this.renderTimePicker()}
            </div>
        );
    }
}


module.exports = DatePicker;

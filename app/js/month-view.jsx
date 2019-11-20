import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import WeekRow from './week-row';

class MonthView extends React.Component {

    static propTypes = {
        date: PropTypes.instanceOf(moment).isRequired,
        handleSelection: PropTypes.func.isRequired,
        minDate: PropTypes.instanceOf(moment),
        maxDate: PropTypes.instanceOf(moment),
        selectedDate: PropTypes.instanceOf(moment)
    };

    constructor(props) {
        super(props);
    }

    renderWeeks() {
        // start at the first of the month
        const now = moment.tz(this.props.timezone);
        var currentDate = this.props.date.clone().date(1).hour(0).minute(0).second(0).milliseconds(0),
            currentMonth = currentDate.month();

        const weeks = [];
        let i = 0;


        while(currentDate.month() <= currentMonth) {
            let dayOfWeek = currentDate.day();

            // if it's the first day of the month
            if(i === 0) {
                // and it's not sunday, we want to go back to the previous sunday to start
                if(dayOfWeek !== 0) {
                  // go back to sunday
                  currentDate.subtract(currentDate.day(), "days");
                }
            }
            // if it's a sunday, or it's the first, render a week
            if(dayOfWeek === 0 || i === 0) {
              let dates = [];

              dates.push({
                inMonth: currentDate.month() === currentMonth,
                today: currentDate.format("MM/DD/YYYY") === now.format("MM/DD/YYYY"),
                selected: this.props.selectedDate && currentDate.format("MM/DD/YYYY") === this.props.selectedDate.format("MM/DD/YYYY"),
                disabled: currentDate.isBefore(this.props.minDate) || currentDate.isAfter(this.props.maxDate),
                date: currentDate.date(),
                formattedDate: currentDate.format("MM/DD/YYYY")
              });

              while(currentDate.day() < 6) {
                currentDate.add(1, "days");
                dates.push({
                  inMonth: currentDate.month() === currentMonth,
                  today: currentDate.format("MM/DD/YYYY") === now.format("MM/DD/YYYY"),
                  selected: this.props.selectedDate && currentDate.format("MM/DD/YYYY") === this.props.selectedDate.format("MM/DD/YYYY"),
                  disabled: currentDate.isBefore(this.props.minDate) || currentDate.isAfter(this.props.maxDate),
                  date: currentDate.date(),
                  formattedDate: currentDate.format("MM/DD/YYYY")
                });
                i++;
              }

               weeks.push(<WeekRow
                 selectedDate={this.props.selectedDate}
                 maxDate={this.props.maxDate}
                 minDate={this.props.minDate}
                 timezone={this.props.timezone}
                 handleSelection={this.props.handleSelection}
                 month={currentMonth}
                 dates={dates}
                 key={currentDate.date()} />);


                currentDate.add(1, "days");
                i++;
            }


        }

        return weeks;

    }

    render() {
        return (
            <div className="datepicker-monthview">
                {this.renderWeeks()}
            </div>
        );
    }
}


module.exports = MonthView;

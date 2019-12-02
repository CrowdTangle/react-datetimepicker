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
        let currentDate = this.props.date.clone().date(1).hour(0).minute(0).second(0).milliseconds(0);
        let currentMonth = currentDate.month();
        let currentYear = currentDate.year();

        const weeks = [];
        let i = 0;

        console.log("currentMonth", currentMonth);


        /**
         * So the basic plan here is to walk up by day. When we hit a sunday,
         * collect the next 7 days and pass them into the week to render. If the first
         * day isn't a sunday, we need to render the days from the previous month,
         * so we'll subtract those off the bat. Finally, cloning moments is a little
         * tempermental, so rather than passing in moment objects, we just pass in
         * the data we need to the week view
         */
        while(currentDate.month() <= currentMonth && currentDate.year() <= currentYear) {
            let dayOfWeek = currentDate.day();
            console.log("rendering", currentDate.format());

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
                 maxDate={this.props.maxDate}
                 minDate={this.props.minDate}
                 timezone={this.props.timezone}
                 handleSelection={this.props.handleSelection}
                 month={currentMonth}
                 dates={dates}
                 key={currentDate.date() + "_" + currentDate.month() + "_" + currentDate.year()} />);


                currentDate.add(1, "days");
                i++;
            }


        }

        return weeks;

    }

    render() {
        console.log(this.props);

        return (
            <div className="datepicker-monthview">
                {this.renderWeeks()}
            </div>
        );
    }
}


module.exports = MonthView;

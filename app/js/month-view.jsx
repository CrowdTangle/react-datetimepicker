import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import WeekRow from './week-row';

class MonthView extends React.Component {

    static propTypes = { 
        date: React.PropTypes.instanceOf(moment).isRequired,
        handleSelection: React.PropTypes.func.isRequired,
        minDate: React.PropTypes.instanceOf(moment),
        maxDate: React.PropTypes.instanceOf(moment),
        selectedDate: React.PropTypes.instanceOf(moment)
    };

    constructor(props) {
        super(props);
    }

    renderWeeks() {
        // start at the first of the month
        var currentDate = moment(this.props.date).date(1).hour(0).minute(0).second(0).milliseconds(0),
            currentMonth = currentDate.month();

        var weeks = [], i = 0;

        while(currentDate.month() === currentMonth) {
            var dayOfWeek = currentDate.day(), dateToPass = moment(currentDate);



            if(i === 0) {
                if(dayOfWeek !== 0) {
                    dateToPass = moment(currentDate).subtract(currentDate.day(), "days");
                }
            }


            if(dayOfWeek === 0 || i === 0) {
                 weeks.push(<WeekRow selectedDate={this.props.selectedDate} maxDate={this.props.maxDate} minDate={this.props.minDate} handleSelection={this.props.handleSelection} month={currentMonth} date={dateToPass} key={currentDate.date()} />);
            }
           

            currentDate.add(1, "days");
            i++;
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
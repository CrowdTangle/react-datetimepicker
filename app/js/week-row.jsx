import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import classnames from 'classnames';

class WeekRow extends React.Component {

    static propTypes = {
        date: PropTypes.instanceOf(moment).isRequired,
        month: PropTypes.number.isRequired,
        handleSelection: PropTypes.func.isRequired,
        minDate: PropTypes.instanceOf(moment),
        maxDate: PropTypes.instanceOf(moment),
        selectedDate: PropTypes.instanceOf(moment)
    };

    constructor(props) {
        super(props);
    }

    handleClick(date) {
        this.props.handleSelection(date);
    }

    renderDates() {
        var currentDate = this.props.date.clone(), dates = [], count = 0, now = moment();

        while(count < 7) {
            count++;
            var classes = classnames("day-block", {
                "in-month": currentDate.month() === this.props.month,
                "today": currentDate.format("MM/DD/YYYY") === now.format("MM/DD/YYYY"),
                "selected": this.props.selectedDate && currentDate.format("MM/DD/YYYY") === this.props.selectedDate.format("MM/DD/YYYY"),
                "disabled": currentDate.isBefore(this.props.minDate) || currentDate.isAfter(this.props.maxDate)
            });

            const dateToSelect = currentDate.clone();

            dates.push(
              <span
                onClick={() => {
                  this.handleClick(dateToSelect);
                }}
                className={classes}
                key={currentDate.date()}>{currentDate.date()}
              </span>
            );

            currentDate.add(1, "days");
        }

        return dates;
    }

    render() {
        return (
            <div className="datepicker-weekrow">
                {this.renderDates()}
            </div>
        );
    }
}


module.exports = WeekRow;

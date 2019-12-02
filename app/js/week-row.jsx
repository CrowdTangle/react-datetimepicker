import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import classnames from 'classnames';

class WeekRow extends React.Component {

    static propTypes = {
        dates: PropTypes.array,
        month: PropTypes.number.isRequired,
        handleSelection: PropTypes.func.isRequired,
        minDate: PropTypes.instanceOf(moment),
        maxDate: PropTypes.instanceOf(moment)
    };

    constructor(props) {
        super(props);
    }

    handleClick(date) {
        console.log("handling selection!", date, this.props.timezone);
        const m = moment.tz(date, "MM/DD/YYYY", this.props.timezone);
        console.log("moment!", m)
        this.props.handleSelection(m);
    }

    renderDates() {
        let dates = this.props.dates;
        let dateViews = [];

        for(let i = 0; i < dates.length; i++) {
          let currentDate = dates[i];

            var classes = classnames("day-block", {
                "in-month": currentDate.inMonth,
                "today": currentDate.today,
                "selected": currentDate.selected,
                "disabled": currentDate.disabled
            });


            dateViews.push(
              <span
                onClick={() => {
                  this.handleClick(currentDate.formattedDate);
                }}
                className={classes}
                key={currentDate.date}>{currentDate.date}
              </span>
            );
        }

        return dateViews;
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

import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import classnames from 'classnames'; 

class WeekRow extends React.Component {

    static propTypes = {  
        date: React.PropTypes.instanceOf(moment).isRequired,
        month: React.PropTypes.number.isRequired,
        handleSelection: React.PropTypes.func.isRequired,
        minDate: React.PropTypes.instanceOf(moment),
        maxDate: React.PropTypes.instanceOf(moment),
        selectedDate: React.PropTypes.instanceOf(moment)
    };

    static defaultProps = {};
    
    constructor(props) {
        super(props);
    }

    handleClick(date) {
        this.props.handleSelection(date);
    }

    renderDates() {
        var currentDate = moment(this.props.date), dates = [], count = 0, now = moment();

        while(count < 7) {
            count++;
            var classes = classnames("day-block", {
                "in-month": currentDate.month() === this.props.month,
                "today": currentDate.format("MM/DD/YYYY") === now.format("MM/DD/YYYY"),
                "selected": this.props.selectedDate && currentDate.format("MM/DD/YYYY") === this.props.selectedDate.format("MM/DD/YYYY"),
                "disabled": currentDate.isBefore(this.props.minDate) || currentDate.isAfter(this.props.maxDate)
            });

            dates.push(<span onClick={this.handleClick.bind(this, moment(currentDate))} className={classes} key={currentDate.date()}>{currentDate.date()}</span>);

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
import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

class DatePicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: moment()
        };
    }

    render() {
        console.log("rendering datepicker");
        return (
            <div>hey!
            </div>
        );
    }
}

module.exports = DatePicker;
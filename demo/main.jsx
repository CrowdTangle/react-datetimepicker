import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from '../app/js/datepicker.jsx';
import moment from 'moment';

ReactDOM.render(
    <DatePicker enableTime={true} IsRange={true} />, document.getElementById("content")
)

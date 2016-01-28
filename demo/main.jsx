import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from '../app/js/datepicker.jsx';
import moment from 'moment';

ReactDOM.render( 
    <DatePicker />, document.getElementById("example-1")
)
 
ReactDOM.render( 
    <DatePicker isRange={true} />, document.getElementById("example-2")
)

ReactDOM.render( 
    <DatePicker enableTime={true} />, document.getElementById("example-3")
)

ReactDOM.render( 
    <DatePicker defaultDate={moment("10/31/2015", "MM/DD/YYYY")} minDate={moment("10/21/2015", "MM/DD/YYYY")} maxDate={moment("11/21/2015", "MM/DD/YYYY")} />, document.getElementById("example-4")
)


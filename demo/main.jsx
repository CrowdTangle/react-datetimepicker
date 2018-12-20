import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import DatePicker from '../app/js/datepicker.jsx';
import moment from 'moment';


class ControlledComponent extends Component {

    constructor() {
        super();
        this.state = {
            date: moment("10/31/2015", "MM/DD/YYYY")
        }
    }

    render() {
        return (
            <div>
                <input type="date" value={this.state.date.format("YYYY-MM-DD")} onChange={(e) => {
                    this.setState({date: moment(e.target.value)});
                }} />
                <br />
                <br />
                <DatePicker onChange={(e) => {
                    this.setState({date: moment(e.date)});
                }} defaultDate={this.state.date} />
            </div>
        );
    }
}


ReactDOM.render(
    <DatePicker />, document.getElementById("example-1")
)

ReactDOM.render(
    <DatePicker isRange={true} inputEditable={false} />, document.getElementById("example-2")
)

ReactDOM.render(
    <DatePicker enableTime={true} isRange={true} />, document.getElementById("example-6")
)

ReactDOM.render(
    <DatePicker enableTime={true} />, document.getElementById("example-3")
)

ReactDOM.render(
    <DatePicker defaultDate={moment("10/31/2015", "MM/DD/YYYY")} minDate={moment("10/21/2015", "MM/DD/YYYY")} maxDate={moment("11/21/2015", "MM/DD/YYYY")} />, document.getElementById("example-4")
)

ReactDOM.render(
    <ControlledComponent />, document.getElementById("example-5")
)

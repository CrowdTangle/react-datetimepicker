var React     = require("react");
var ReactDOM  = require("react-dom");
import ReactTestUtils from "react-dom/test-utils";

jest.dontMock("../app/js/datepicker.jsx");
jest.dontMock("moment");

var moment = require("moment");
const DatePicker = require("../app/js/datepicker.jsx");


describe('datepicker', function() {
    var date = moment("10/21/1988", 'MM/DD/YYYY'),
        minDate = moment("10/15/1988", 'MM/DD/YYYY'),
        maxDate = moment("10/28/1988", 'MM/DD/YYYY');

    describe('single view', function() {
        it('only renders one input box with the defaultValue', function() {

            var datepicker = ReactTestUtils.renderIntoDocument(
                <DatePicker defaultDate={date} />
            );

            var inputs = ReactTestUtils.scryRenderedDOMComponentsWithClass(datepicker, "datepicker-input");

            expect(inputs.length).toEqual(1);
            expect(inputs[0].value).toEqual("10/21/1988");

        });

        it('respects min- and max- dates', function() {

            var datepicker = ReactTestUtils.renderIntoDocument(
                <DatePicker maxDate={maxDate} minDate={minDate} defaultDate={date} />
            );

            // select something below the minimum
            datepicker.handleDateSelection("startDate", moment("10/14/1988", 'MM/DD/YYYY'));

            var input = ReactTestUtils.findRenderedDOMComponentWithClass(datepicker, "datepicker-input");
            // check to ensure it hasn't changed
            expect(input.value).toEqual("10/21/1988");

            // select something above the minimum
            datepicker.handleDateSelection("startDate", moment("10/16/1988", 'MM/DD/YYYY'));

            var input = ReactTestUtils.findRenderedDOMComponentWithClass(datepicker, "datepicker-input");
            // check to ensure it has changed
            expect(input.value).toEqual("10/16/1988");

            // select something above the max
            datepicker.handleDateSelection("startDate", moment("11/01/1988", 'MM/DD/YYYY'));

            var input = ReactTestUtils.findRenderedDOMComponentWithClass(datepicker, "datepicker-input");
            // check to ensure it hasn't changed
            expect(input.value).toEqual("10/16/1988");

            // select something below the max
            datepicker.handleDateSelection("startDate", moment("10/27/1988", 'MM/DD/YYYY'));

            var input = ReactTestUtils.findRenderedDOMComponentWithClass(datepicker, "datepicker-input");
            // check to ensure it has changed
            expect(input.value).toEqual("10/27/1988");


        });

        it('trigger a change event passing the date in the event object', function() {
            const callback = jest.fn();

            const datepicker = ReactTestUtils.renderIntoDocument(
                <DatePicker onChange={callback} defaultDate={date} />
            );

            // select something below the minimum
            datepicker.handleDateSelection("startDate", moment("10/14/1988", 'MM/DD/YYYY'));

            expect(callback).toHaveBeenCalledWith({
                date: moment("10/14/1988", 'MM/DD/YYYY')
            });
        });
    });


});

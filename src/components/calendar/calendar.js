import React from "react";
import moment from "moment";
import "./calendar.css";

export default class Calendar extends React.Component {
	state = {
		dateContext: moment(),
		momentContext: moment(),
		today: moment(),
		showMonthPopup: false,
		showYearPopup: false
	}

	constructor(props) {
		super(props);
		this.width = props.width || "350px";
		this.style = props.style || {};
	}

	weekdays = moment.weekdays(); // ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
	weekdaysShort = moment.weekdaysShort(); // ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
	months = moment.months();

	year = () => {
		return this.state.dateContext.format("Y");
	}

	month = () => {
		return this.state.dateContext.format("MMMM");
	}

	daysInMonth = () => {
		return this.state.dateContext.daysInMonth();
	}

	currentDate = () => {
		return this.state.dateContext.get("date");
	}

	currentDay = () => {
		return this.state.dateContext.format("D");
	}

	firstDayOfMonth = () => {
		let dateContext = this.state.dateContext;
		let firstDay = moment(dateContext).startOf('month').format('d');
		return firstDay;
	}

	render() {
		let weekdays = this.weekdaysShort.map((day) => {
			return (
				<td key={day} className="week-day">{day}</td>
			)
		})

		let blanks = [];
		for (let i = 0; i < this.firstDayOfMonth(); i++) {
			blanks.push(<td className="emptySlot">
				{""}
				</td>
			);
		}

		console.log("blanks: ", blanks);

		let daysInMonth = [];
		for (let d = 1; d <= this.daysInMonth(); d++) {
			let className = (d === this.currentDay() ? "day current-day" : "day");
			daysInMonth.push(
				<td key={d} className={className}>
					<span>{d}</span>
				</td>
			);
		}

		console.log("days: ", daysInMonth);

		let trElems = [];

		return (
			<div className = "calendar-container">
				<table className = "calendar">
					<thead>
						<tr className="calendar-header">
						</tr>
					</thead>
					<tbody>
						{weekdays}
					</tbody>
					{trElems}
				</table>
			</div>
    	);
  	}
}
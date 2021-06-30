import React from 'react';
import './App.css';
import Calendar from "./components/calendar/calendar";

const style = {
	position: "relative",
	margin: "50px auto"
}

function App() {
  const onDayClick = (e, day) => {
      alert('hello, today is: ' + day + 'th')
  };

  return (
    <div className="App">
        <Calendar style={style} width="302px"
            onDayClick={onDayClick}
        />
    </div>
  );
}

export default App;

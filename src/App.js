import React from 'react';
import './App.css';
import Calendar from "./components/calendar/calendar";

const style = {
	position: "relative",
	margin: "50px auto"
}

function App() {

  return (
    <div className="App">
        <Calendar style={style} width="302px"/>
    </div>
  );
}

export default App;

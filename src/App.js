import React, {useState} from 'react';
import Split from 'react-split'
import './App.css';
import './split.css';
import Calendar from "./components/calendar/calendar";
import Notes from "./components/notes/notes";
import firebase from "firebase/app";
import 'firebase/firestore';



const style = {
	position: "relative",
	margin: "50px auto"
}

function App() {
  const [year, setYear] = useState(undefined);
  const [month, setMonth] = useState(undefined);
  const [day, setDay] = useState(undefined);

  const onDayClick = (e, day, month, year) => {
      alert('hello, today is: ' + day + ', ' + month + ', ' + year);
  };

  return (
    <div style={{height: '100vh', minHeight: '100vh'}}>
      <Split className="split"

          gutterSize={10}
          style={{height: '100%'}}
          >
            <div className="App" 
                style={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                <Calendar style={style} width="302px"
                          onDayClick={onDayClick}
                          yearSetter={setYear}
                          monthSetter={setMonth}
                          daySetter={setDay}
                />
            </div>
            <div style={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                <Notes year={year}
                       month={month}
                       day={day}
                />
            </div>
      </Split>
    </div>
  );
}

export default App;

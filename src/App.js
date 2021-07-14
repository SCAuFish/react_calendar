import React from 'react';
import Split from 'react-split'
import './App.css';
import './split.css';
import Calendar from "./components/calendar/calendar";
import Notes from "./components/notes/notes";
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

const style = {
	position: "relative",
	margin: "50px auto"
}

function App() {
  const onDayClick = (e, day) => {
      alert('hello, today is: ' + day + 'th')
  };

  return (

      <Split className="split"
          gutterSize={20}>
            <div className="App">
                <Calendar style={style} width="302px"
                        onDayClick={onDayClick} />
            </div>
            <div>
                <Notes />
            </div>
      </Split>
  );
}

export default App;

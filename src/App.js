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
                        onDayClick={onDayClick} />
            </div>
            <div style={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                <Notes />
            </div>
      </Split>
    </div>
  );
}

export default App;

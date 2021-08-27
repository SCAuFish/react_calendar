import React from "react";
import { useState } from "react"
import "./notes.css";
import { EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import 'firebase/firestore';
import { useFirestoreDocData, useFirestore, useFirestoreDoc } from 'reactfire';


function Note() {
    const noteRef = useFirestore()
        .collection('note')
        .doc('burrito');

    // subscribe to the doc. just one line!
    // throws a Promise for Suspense to catch,
    // and then streams live updates
    const noteDoc = useFirestoreDoc(noteRef);

    const isYummy = noteDoc.data().yummy;

    return <p>The burrito is {isYummy ? 'good' : 'bad'}!</p>;
}

function Notes(props) {
    const [notes,setNotes] = useState({});
    const [editorState,setEditorState] = useState(EditorState.createEmpty());

    const addProblemBox = (dateKey) => () => {
        console.log(dateKey);
        let currNotes = {...notes};
        const currDayNotes = currNotes[dateKey];

        const newNote = {
            problemIdx: 0,
            problemName: "",
            noteContent: EditorState.createEmpty()
        }

        if (currDayNotes === undefined) {
            currNotes[dateKey] = [newNote];
        } else {
            currNotes[dateKey].push(newNote);
        }

        setNotes(currNotes);
        console.log(notes);
    }

    const handleNameChange = (event, idx, dateKey) => {
        const newNotes = {...notes};
        newNotes[dateKey][idx].problemName = event.target.value;
        setNotes(newNotes);
    }

    const onEditorStateChange = (idx, dateKey) => editorState => {
        const newNotes = {...notes};
        newNotes[dateKey][idx].noteContent = editorState;
        setNotes(newNotes)
    };

    const makeKey = (day, month, year) => {
        return `${day}_${month}_${year}`
    }

    const dateKey = makeKey(props.day, props.month, props.year);

        return (
            props.year && props.month && props.day ?
            <div style={{alignItems: 'center', padding: 20}}>
                <div>
                    <button className="button" onClick={addProblemBox(dateKey)}>Add a Problem</button>
                </div>
                {notes[dateKey] ?
                    notes[dateKey].map((note, idx) => {
                        return <div id={`notes-details-${note.date}-${note.problemIdx}`}>
                            <h4>{idx + 1}</h4>
                            <div>
                                <input id={`notes-details-${note.date}-${note.problemIdx}`}
                                       style={{border: '3px solid lightblue'}}
                                       type="text"
                                       value={notes[dateKey][idx].problemName}
                                       onChange={(e) => {
                                           handleNameChange(e, idx, dateKey)
                                       }}
                                />
                            </div>
                            <div style={{border: '3px solid navy', marginTop: 20, minHeight: '10em'}}>
                                <Editor className="editor"
                                        editorState={note.noteContent}
                                        // handleKeyCommand={handleKeyCommand}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                        onEditorStateChange={onEditorStateChange(idx, dateKey)}
                                />
                            </div>
                        </div>
                    }) : null
                }
            </div> : null
        )
}

export default Notes;
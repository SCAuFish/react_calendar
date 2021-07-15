import React from "react";
import "./notes.css";
import { Editor, EditorState } from 'draft-js';
import 'draft-js/dist/Draft.css';

export default class Notes extends React.Component {
    state = {
        notes: [],
    }

    constructor(props) {
        super(props);
        this.onChange = idx => editorState => {
            const newNotes = this.state.notes;
            newNotes[idx].noteContent = editorState;
            this.setState({ notes: newNotes })
        };
    }

    addProblemBox = () => {
        const newNote = {
            date: '',
            problemIdx: 0,
            noteContent: EditorState.createEmpty()
        }
        var currNotes = this.state.notes;
        currNotes.push(newNote);
        this.setState({ notes: currNotes });
    }

    render() {
        return (
            <div style={{ alignItems: 'center', padding: 20 }}>
                <div >
                    <button className="button" onClick={this.addProblemBox}>Add a Problem</button>
                </div>
                {
                    this.state.notes.map((note, idx) => {
                        return <div id={`notes-details-${note.date}-${note.problemIdx}`}>
                            <h4>{idx+1}</h4>
                            <div style={{ marginTop: 5 }}>
                                <input type="text" />
                            </div>
                            <div style={{ border: '3px solid black', marginTop: 5 }}>
                                <Editor className="editor" editorState={note.noteContent} onChange={this.onChange(idx)} />
                            </div>
                        </div>
                    })
                }
            </div>
        );
    }
}
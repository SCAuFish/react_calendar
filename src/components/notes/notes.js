import React from "react";
import "./notes.css";
import {EditorState, RichUtils} from 'draft-js';
import 'draft-js/dist/Draft.css';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default class Notes extends React.Component {
    state = {
        notes: [],
        editorState: EditorState.createEmpty(),
    }

    constructor(props) {
        super(props);
        this.onEditorStateChange = idx => editorState => {
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
        this.setState({notes: currNotes});
    }

    onEditorStateChange = idx => editorState => {
        const newNotes = this.state.notes;
        newNotes[idx].noteContent = editorState;
        this.setState({notes: newNotes})
    };

    render() {
        return (
            <div style={{alignItems: 'center', padding: 20}}>
                <div>
                    <button className="button" onClick={this.addProblemBox}>Add a Problem</button>
                </div>
                {
                    this.state.notes.map((note, idx) => {
                        return <div id={`notes-details-${note.date}-${note.problemIdx}`}>
                            <h4>{idx + 1}</h4>
                            <div>
                                <input style={{border: '3px solid lightblue'}} type="text"/>
                            </div>
                            <div style={{border: '3px solid navy', marginTop: 20, minHeight: '10em'}}>
                                <Editor className="editor"
                                        editorState={note.noteContent}
                                        handleKeyCommand={this.handleKeyCommand}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                        onEditorStateChange={this.onEditorStateChange(idx)}
                                />
                            </div>
                        </div>
                    })
                }
            </div>
        );
    }
}
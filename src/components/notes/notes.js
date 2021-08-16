import React from "react";
import "./notes.css";
import {EditorState, RichUtils} from 'draft-js';
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

export default class Notes extends React.Component {
    state = {
        notes: {},
        editorState: EditorState.createEmpty(),
        year: this.props.year ? this.props.year : null,
        month: this.props.month ? this.props.month : null,
        day: this.props.day ? this.props.day : null,
    }

    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    addProblemBox = (dateKey) => () => {
        let currNotes = this.state.notes;
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

        this.setState({notes: currNotes});
    }

    handleNameChange(event, idx, dateKey) {
        const newNotes = this.state.notes;
        newNotes[dateKey][idx].problemName = event.target.value;
        console.log(newNotes[dateKey][idx].problemName);
        this.setState({notes: newNotes});
    }

    onEditorStateChange = (idx, dateKey) => editorState => {
        const newNotes = this.state.notes;
        newNotes[dateKey][idx].noteContent = editorState;
        this.setState({notes: newNotes})
    };

    makeKey = (day, month, year) => {
        return `${day}_${month}_${year}`
    }

    render() {
        const dateKey = this.makeKey(this.props.day, this.props.month, this.props.year);

        return (
            this.props.year && this.props.month && this.props.day ?
            <div style={{alignItems: 'center', padding: 20}}>
                <div>
                    <button className="button" onClick={this.addProblemBox(dateKey)}>Add a Problem</button>
                </div>
                {   this.state.notes[dateKey] ?
                    this.state.notes[dateKey].map((note, idx) => {
                        return <div id={`notes-details-${note.date}-${note.problemIdx}`}>
                            <h4>{idx + 1}</h4>
                            <div>
                                <input id={`notes-details-${note.date}-${note.problemIdx}`}
                                       style={{border: '3px solid lightblue'}}
                                       type="text"
                                       value={this.state.notes[dateKey][idx].problemName}
                                       onChange={(e) => {this.handleNameChange(e, idx, dateKey)}}
                                />
                            </div>
                            <div style={{border: '3px solid navy', marginTop: 20, minHeight: '10em'}}>
                                <Editor className="editor"
                                        editorState={note.noteContent}
                                        handleKeyCommand={this.handleKeyCommand}
                                        toolbarClassName="toolbarClassName"
                                        wrapperClassName="wrapperClassName"
                                        editorClassName="editorClassName"
                                        onEditorStateChange={this.onEditorStateChange(idx, dateKey)}
                                />
                            </div>
                        </div>
                    }) : null
                }
            </div> : null
        );
    }
}
import React from "react";
import {useState} from "react"
import "./notes.css";
import {EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';
import {Editor} from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import 'firebase/firestore';
import {useFirestoreDocData, useFirestore, useFirestoreDoc, useFirestoreCollection} from 'reactfire';


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
    const [notes, setNotes] = useState({});
    //const [editorState,setEditorState] = useState(EditorState.createEmpty());
    const noteStore = useFirestore();
    //const {data, status} = useFirestoreCollection(noteRef);

    const addProblemBox = (dateKey) => async () => {
        try {
            await noteStore.collection(dateKey).doc().set(
                {
                    problemIdx: 0,
                    problemName: "",
                    noteContent: EditorState.createEmpty()
                }
            );
        } catch (e) {
            alert("Error " + e.message)
        }
        /**let currNotes = {...notes};
         const currDayNotes = currNotes[dateKey];

         const newNote = {
            problemIdx: 0,
            problemName: "",
            noteContent: EditorState.createEmpty()
        }*/

        /**if (currDayNotes === undefined) {
            currNotes[dateKey] = [newNote];
        } else {
            currNotes[dateKey].push(newNote);
        }

         setNotes(currNotes);
         console.log(notes);*/
    }

    const handleNameChange = async (event, id, idx, dateKey) => {
        const doc = noteStore.collection(dateKey).doc(id);
        try {
            await doc.set(
                {
                    problemIdx: doc.problemIdx,
                    problemName: event.target.value,
                    noteContent: doc.noteContent
                }
            );
        } catch (e) {
            alert("Error " + e.message)
        }
        /**const newNotes = {...notes};
         newNotes[dateKey][idx].problemName = event.target.value;
         setNotes(newNotes);*/
    }

    const onEditorStateChange =  (id, idx, dateKey) => async (editorState) => {
        const collection = noteStore.collection(dateKey);
        try {
            await collection.doc(id).set(
                {
                    problemIdx: collection.doc(id).data().problemIdx,
                    problemName: collection.doc(id).data().problemName,
                    noteContent: editorState
                }
            );
        } catch (e) {
            alert("Error " + e.message)
        }
        /**const newNotes = {...notes};
         newNotes[dateKey][idx].noteContent = editorState;
         setNotes(newNotes)*/
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
                {/**notes[dateKey]*/
                 noteStore.collection(dateKey).data?.docs?.map((d) => (
                    <div>
                    <h4>{d.data().problemIdx + 1}</h4>

                    <div>
                        <input style={{border: '3px solid lightblue'}}
                               type="text"
                               value={/**notes[dateKey][idx]*/
                                   d.data().problemName}
                               onChange={(e) => {
                                   handleNameChange(e, d.id, d.data().problemIdx, dateKey)
                               }}
                        />
                    </div>

                    <div style={{border: '3px solid navy', marginTop: 20, minHeight: '10em'}}>
                        <Editor className="editor"
                                editorState={/**note.noteContent*/
                                    d.data().noteContent}
                            // handleKeyCommand={handleKeyCommand}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                onEditorStateChange={onEditorStateChange(d.id, d.data().problemIdx, dateKey)}
                        />
                    </div>
                    </div>
                    ))
                }
            </div>: null
    )
}

export default Notes;
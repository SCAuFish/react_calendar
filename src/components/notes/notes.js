import React from "react";
import "./notes.css";
import {Editor, EditorState} from 'draft-js';
import 'draft-js/dist/Draft.css';

export default class Notes extends React.Component {
    state = {
        editorState: EditorState.createEmpty()
    }

    constructor(props) {
        super(props);
        this.onChange = editorState => this.setState({editorState});
    }
    problemBox = () => {
        return <input type="text" />
    }

    render() {
        return (
            <>
                <div>
                    <button className="button" onClick={this.problemBox}>Add a Problem</button>
                </div>
                <div>
                    <input type="text" />
                </div>
                <div>
                    <Editor className="editor" editorState={this.state.editorState} onChange={this.onChange} />
                </div>
            </>
        );
    }
}
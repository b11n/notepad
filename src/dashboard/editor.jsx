import React from 'react';

class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }
    save() {
        const { value } = this.textInput.current;
        const note = {
            id: this.props.note.id,
            title: value.split("\n")[0],
            body: value
        };
        this.props.save(note, this.props.note.id, this.props.note.id == null);
    }
    keyPress(evt) {
        const e = evt.nativeEvent;
        if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
            e.preventDefault();
            this.save();
        }
    }
    render() {
        return <div className="editor">
            <textarea
                onChange={this.props.changeText}
                value={this.props.note ? this.props.note.body : ''}
                onKeyDown={this.keyPress.bind(this)}
                ref={this.textInput}></textarea>
        </div>
    }

}

export default Editor;
import React from 'react';
import Editor from './editor.jsx';
import Note from './note.jsx';

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        }
    }

    selectNote(note) {
        const index = this.state.list.indexOf(note);
        this.setState({
            selected: index,
        })
    }

    newNote() {
        const { list } = this.state;
        list.push({
            title: "New Note",
            body: "",
            id: null,
            created: new Date().getTime()
        })
        this.setState({
            selected: list.length - 1,
            list
        })
    }

    objectToArray(obj) {
        const arr = [];
        for (let key in obj.notes) {
            let selected = Object.assign({}, obj.notes[key]);
            selected.id = key;
            arr.push(selected)
        }
        return arr;
    }

    async save(note, id, newNote) {
        const resp = await this.props.database.writeData(note, id, newNote);
        this.fetchFreshData();
    }

    async componentWillMount() {
        const data = await this.props.database.readData();
        this.setState({
            list: this.objectToArray(data),
            selected: 0
        })
    }

    async fetchFreshData() {
        const data = await this.props.database.readData();
        this.setState({
            list: this.objectToArray(data),
        })
    }

    changeText(event) {
        const { list } = this.state;
        list[this.state.selected].body = event.target.value
        this.setState({ list });
    }

    render() {
        const arr = [];
        let selectedNote = this.state.list[this.state.selected];
        for (let i = 0; i < this.state.list.length; i++) {
            const selected = i == this.state.selected;
            arr.push(<Note key={i} selected={selected} select={this.selectNote.bind(this)} note={this.state.list[i]} />);
        }
        return <div className="wrap">
            <div className="header">
                Notes
            </div>
            <div className="dashboard">
                <div className="sidebar">
                    {arr}
                    <div className="new" onClick={this.newNote.bind(this)}>
                        New Note
                    </div>
                </div>
                <Editor save={this.save.bind(this)} note={selectedNote} changeText={this.changeText.bind(this)} />
            </div>
        </div>;
    }
}


export default Welcome;
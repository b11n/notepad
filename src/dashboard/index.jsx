import React from 'react';
import Editor from './editor.jsx';
import Note from './note.jsx';
import Button from './signInButton.jsx';
import LinearProgress from '@material-ui/core/LinearProgress';

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
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

    async save(note, id, newNote) {
        this.setState({loading: true});
        const resp = await this.props.database.writeData(note, id, newNote);
        this.setState({loading: false});
        this.fetchFreshData();
    }

    async componentDidMount() {
        await this.getAuthn();
        this.props.database.init();
        const data = await this.props.database.readData();
        this.setState({
            list: data,
            selected: 0,
            loading: false,
        })
    }

    async fetchFreshData(reset) {
        const data = await this.props.database.readData();
        return this.setState({
            list: data,
        })
    }

    changeText(event) {
        const { list } = this.state;
        list[this.state.selected].body = event.target.value
        this.setState({ list });
    }

    async getAuthn() {
        const user = await this.props.auth.getCurrentUser();
        this.setState({user});
    }

    async signIn(e) {
        await this.props.auth.signIn();
    }

    async deleteNote(id) {
      this.setState({loading: true});
      await this.props.database.deleteData( id);
      await this.fetchFreshData();
      this.setState({
        selected: 0,
        loading: false,
      })
    }

    render() {
        const arr = [];
        let selectedNote = this.state.list[this.state.selected];
        for (let i = 0; i < this.state.list.length; i++) {
            const selected = i == this.state.selected;
            arr.push(<Note key={i} selected={selected} delete={this.deleteNote.bind(this)} select={this.selectNote.bind(this)} note={this.state.list[i]} />);
        }
        return <div className="wrap">
            <div className="header">
                Notes
                <Button onClick={this.signIn.bind(this)} user={this.state.user}/>
            </div>

            {this.state.loading? <LinearProgress />:<div className="loader-placeholder"></div>}
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

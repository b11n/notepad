import React from 'react';
import Editor from './editor.jsx';
import Note from './note.jsx';
import Button from './signInButton.jsx';
import LinearProgress from '@material-ui/core/LinearProgress';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ButtonBase from '@material-ui/core/ButtonBase';

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
        this.setState({ loading: true });
        const resp = await this.props.database.writeData(note, id, newNote);
        this.setState({ loading: false });
        this.fetchFreshData();
    }

    async componentDidMount() {
        await this.getAuthn();
        this.props.database.init();
        const data = await this.props.database.readData();
        this.setState({
            list: data,
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
        this.setState({ user });
    }

    async signIn(e) {
        await this.props.auth.signIn();
        // TODO(b11n): Remove the reload
        location.reload();
    }

    async signOut() {
        // TODO(b11n): Remove the reload
        await this.props.auth.signOut();
        location.reload();
    }

    async deleteNote(id) {
        this.setState({ loading: true });
        await this.props.database.deleteData(id);
        await this.fetchFreshData();
        this.setState({
            selected: 0,
            loading: false,
        })
    }

    back() {
        this.setState({selected: null})
    }

    render() {
        const arr = [];
        let selectedNote = this.state.list[this.state.selected];
        const showRightPane = selectedNote? 'selected':''
        for (let i = 0; i < this.state.list.length; i++) {
            const selected = i == this.state.selected;
            arr.push(<Note key={i} selected={selected} delete={this.deleteNote.bind(this)} select={this.selectNote.bind(this)} note={this.state.list[i]} />);
        }
        return <div className="wrap">
            <div className="header">
                Notes
                <Button signOut={this.signOut.bind(this)} onClick={this.signIn.bind(this)} user={this.state.user} />
            </div>

            {this.state.loading ? <LinearProgress /> : <div className="loader-placeholder"></div>}
            <div className="dashboard">
                <div className="sidebar">
                    {arr}
                    <ButtonBase classes={{root: "newItem"}}>
                      <div className="new" onClick={this.newNote.bind(this)}>
                          New Note
                      </div>
                    </ButtonBase>
                </div>
                <div className={"right-pane "+showRightPane}>
                    <div className="toolBar">
                        <ArrowBackIcon onClick={this.back.bind(this)} fontSize='large' />
                    </div>
                    {selectedNote ? <Editor save={this.save.bind(this)} note={selectedNote} changeText={this.changeText.bind(this)} /> : <EmptyEditor />}
                </div>
            </div>
        </div>;
    }
}


function EmptyEditor(props) {
    return <div className="not-selected">
        No note selected
    </div>;
}

export default Welcome;

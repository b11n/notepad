import React from 'react';
import Time from './time.jsx';
import ButtonBase from '@material-ui/core/ButtonBase';


class Note extends React.Component {
    constructor(props) {
        super(props);
    }
    clickHandler(e) {
        setTimeout(()=>{
            this.props.select(this.props.note, this.props.id);
        },100)
        
    }

    deleteNote(e) {
        this.props.delete(this.props.note.id);
    }
    render() {
        const selectedCls = this.props.selected ? 'selected' : ''
        return <ButtonBase classes={{root: "listItem"}}><div className={"note " + selectedCls} onClick={this.clickHandler.bind(this)}>
            <span className="icon-bin" onClick={this.deleteNote.bind(this)}></span>
            <div className="note-title">
                {this.props.note.title}
            </div>
            <div>
                <Time raw={this.props.note.created} />
            </div>

        </div>
        </ButtonBase>;
    }
}

export default Note;

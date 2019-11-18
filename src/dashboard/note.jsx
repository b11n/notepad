import React from 'react';
import Time from './time.jsx';

class Note extends React.Component {
    constructor(props) {
        super(props);
    }
    clickHandler(e) {
        this.props.select(this.props.note, this.props.id)
    }
    render() {
        const selectedCls = this.props.selected ? 'selected': ''
        return <div className={"note "+selectedCls} onClick={this.clickHandler.bind(this)}>
            <div className="note-title">
                {this.props.note.title}
            </div>
            <div>
                <Time raw={this.props.note.created} />
            </div>

        </div>;
    }
}

export default Note;
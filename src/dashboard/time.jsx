import React from 'react';

function Time(props) {
    const dateObj = new Date(parseInt(props.raw));
    return <span className="time">{dateObj.toLocaleString()}</span>
}

export default Time;
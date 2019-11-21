import Welcome from './dashboard/index.jsx';
import Database from './data/index.js';

import React from 'react';
import ReactDOM from 'react-dom';

class Dashboard {
    constructor(user, firebase, auth) {
        this.database = new Database(firebase);
        this.auth = auth;
        this.render();
    }

    async render() {
        const element = <Welcome database={this.database} auth={this.auth} />;
        ReactDOM.render(
            element,
            document.getElementById('root')
        );
    }

}

export default Dashboard;

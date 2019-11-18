import Welcome from './dashboard/index.jsx';
import Database from './data/index.js';

import React from 'react';
import ReactDOM from 'react-dom';

class Dashboard {
    constructor(user, firebase) {
        this.database = new Database(firebase);
        this.render();
    }

    async render() {
        const data = await this.database.readData();
        const element = <Welcome database={this.database} />;
        ReactDOM.render(
            element,
            document.getElementById('root')
        );
    }

}

export default Dashboard;
import { openDB, deleteDB, wrap, unwrap } from 'idb';

class Database {
    constructor(firebase) {
        this.firebase = firebase;
        this.db;
    }

    init() {
        if (this.firebase.auth().currentUser) {
            this.userId = this.firebase.auth().currentUser.uid;
        } else {
            this.userId = null;
            this.openDB();
        }
    }

    async openDB() {
        this.db = await openDB('Notes', 1, {
            upgrade(db) {
                const store = db.createObjectStore('notes', {
                    // The 'id' property of the object will be the key.
                    keyPath: 'id',
                    // If it isn't explicitly set, create a value by auto incrementing.
                    autoIncrement: true,
                });
            },
        });
    }

    async writeDataToLocal(value,id,newPost) {
        value.created = new Date().getTime();
        if (newPost) {
            delete value.id;
            return this.db.add('notes', value);
        } else {
            return this.db.put('notes',value);
        }


    }

    writeData(value, id, newPost) {
        if(this.userId == null) {
            return this.writeDataToLocal(value,id,newPost);
        }
        value.created = new Date().getTime();
        if (newPost) {
            return this.firebase.database().ref('users/' + this.userId + '/notes').push(
                value
            );
        } else {
            return this.firebase.database().ref('users/' + this.userId + '/notes/' + id).set(
                value
            );
        }


    }

    async readDataFromLocal(){
        await this.openDB();
        return this.db.getAll('notes');
    }

    async readData() {
        var userId = this.userId;

        if (!userId) {
            let data = await this.readDataFromLocal();
            return data;
        }
        return this.firebase.database().ref('/users/' + userId).once('value').then( (snapshot)=> {
            return this.processData_(snapshot.val());
        });
    }

    processData_(dataObj) {
        const arr = [];
        for (let key in dataObj.notes) {
            let selected = Object.assign({}, dataObj.notes[key]);
            selected.id = key;
            arr.push(selected)
        }
        return arr;
    }

    deleteData(id) {
        var userId = this.userId;
        if(!userId){
            return this.db.delete('notes',parseInt(id));
        }
        return this.firebase.database().ref('/users/' + userId + '/notes/' + id).set(null);
    }


}

export default Database;

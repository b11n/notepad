class Database {
    constructor(firebase) {
        this.firebase = firebase;
        this.userId = this.firebase.auth().currentUser.uid;
    }

    writeData(value, id, newPost) {
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

    readData() {
        var userId = this.userId;
        return this.firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
            return snapshot.val();
        });
    }


}

export default Database;
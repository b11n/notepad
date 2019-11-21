class Database {
  constructor(firebase) {
    this.firebase = firebase;
    if (this.firebase.auth().currentUser) {
      this.userId = this.firebase.auth().currentUser.uid;
    } else {
      this.userId = null;
    }
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
    if (!userId) {
      return new Promise(() => {
        return {};
      })
    }
    return this.firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
      return snapshot.val();
    });
  }

  deleteData(id) {
    var userId = this.userId;
    return this.firebase.database().ref('/users/' + userId + '/notes/' + id).set(null);
  }


}

export default Database;

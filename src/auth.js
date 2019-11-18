import * as firebase from 'firebase';

class Auth {
    constructor() {
        this.provider = new firebase.auth.GoogleAuthProvider();
    }

    signIn() {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        return firebase.auth().signInWithPopup(this.provider).then(function (result) {
            var token = result.credential.accessToken;
            var user = result.user;
           return user;
        }).catch(function (error) {
            console.log(error)
        });
    }

    signOut() {
        firebase.auth().signOut().then(function () {
            // Sign-out successful.
        }).catch(function (error) {
            // An error happened.
        });
    }

    getCurrentUser() {
        const promise = new Promise((resolve, reject) => {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    resolve(user);
                } else {
                   resolve(null);
                }
            });
        });
        return promise;
    }


}

export default Auth;
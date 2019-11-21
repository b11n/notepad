import * as firebase from 'firebase';
import Auth from './auth';
import Dashboard from './dashboard.js'
const signInButton = document.getElementById("signIn");
const loader = document.getElementById("loader");


const firebaseConfig = {
    apiKey: "AIzaSyDOsE4MxL1NVZ5RBNxPT1FA_A6mEgJXja0",
    authDomain: "notepad-3f4ab.firebaseapp.com",
    databaseURL: "https://notepad-3f4ab.firebaseio.com",
    projectId: "notepad-3f4ab",
    storageBucket: "notepad-3f4ab.appspot.com",
    messagingSenderId: "808073282674",
    appId: "1:808073282674:web:839ee3ab5407ebd81f6eeb",
    measurementId: "G-B5C8V7BP9X"
};

const app = firebase.initializeApp(firebaseConfig);
const auth = new Auth();

new Dashboard(null, firebase);

// getAuthn();

// signInButton.onclick = async (evt) => {
//     const user = await auth.signIn();
//     getAuthn();
// }

// async function getAuthn() {
//     const user = await auth.getCurrentUser();
//     loader.remove();
//     if (user) {
//         signInButton.classList.add("hidden")
//         loadDashboard(user);
//     } else {
//         signInButton.classList.remove("hidden")
//     }
// }
// async function loadDashboard(user) {
//     const { default: Dashboard } = await import('./dashboard.js')
//     new Dashboard(user, firebase);
// }

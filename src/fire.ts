import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyBVFf71DwGo9ct9_hS-2al8XnhNkZxtGbo",
    authDomain: "devslane-tasks.firebaseapp.com",
    databaseURL: "https://devslane-tasks.firebaseio.com",
    projectId: "devslane-tasks",
    storageBucket: "devslane-tasks.appspot.com",
    messagingSenderId: "333109794146",
    appId: "1:333109794146:web:9bf568b06a0517f35c883b",
    measurementId: "G-EYXWW58D2E"
};

const fireDB: any = firebase.initializeApp(firebaseConfig);
export default fireDB;



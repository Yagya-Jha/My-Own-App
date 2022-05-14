import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBqwfgr9_l-ES5_oGdt8dWvDtOzxB-42-E",
    authDomain: "learning-app-dd70e.firebaseapp.com",
    databaseURL: "https://learning-app-dd70e.firebaseio.com",
    projectId: "learning-app-dd70e",
    storageBucket: "learning-app-dd70e.appspot.com",
    messagingSenderId: "574348972638",
    appId: "1:574348972638:web:f874bd1b372342d58bdacf"
};

//if(! firebase) 
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();
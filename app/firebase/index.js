import firebase from 'firebase';

try { // makes sure the initialize function only fires once, otherwise it would continue to do so
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDn5e4S-dgG5xxUzNMuEXaFvK-2WbLpL2o",
    authDomain: "react-todo-app-eabcf.firebaseapp.com",
    databaseURL: "https://react-todo-app-eabcf.firebaseio.com",
    storageBucket: "react-todo-app-eabcf.appspot.com",
    messagingSenderId: "143590545947"
  };
  firebase.initializeApp(config);
} catch (e) {

}

export var firebaseRef = firebase.database().ref(); // export DB connection
export default firebase; // export the firebase module as well

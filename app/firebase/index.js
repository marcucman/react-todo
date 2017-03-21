import firebase from 'firebase';

try { // makes sure the initialize function only fires once, otherwise it would continue to do so
  // Initialize Firebase
  var config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: "143590545947"
  };
  firebase.initializeApp(config);
} catch (e) {

}

export var githubProvider = new firebase.auth.GithubAuthProvider(); // this will be used in actions to authenticate with github

export var firebaseRef = firebase.database().ref(); // export DB connection
export default firebase; // export the firebase module as well

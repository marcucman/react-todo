import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyDn5e4S-dgG5xxUzNMuEXaFvK-2WbLpL2o",
  authDomain: "react-todo-app-eabcf.firebaseapp.com",
  databaseURL: "https://react-todo-app-eabcf.firebaseio.com",
  storageBucket: "react-todo-app-eabcf.appspot.com",
  messagingSenderId: "143590545947"
};
firebase.initializeApp(config);

var firebaseRef = firebase.database().ref();

// firebaseRef.set({
//   app: {
//     name: 'Todo App',
//     version: '1.0.0'
//   },
//   isRunning: true,
//   user: {
//     name: 'Andy',
//     age: 30 // no need to put '30' since firebase can handle numbers
//   }
// }).then( () => { // success
//   console.log('Set worked');
// }, (e) => { // failure
//   console.log('Set failed');
// });
//
// var notesRef = firebaseRef.child('notes');

// // delete whole DB
// firebaseRef.remove();

// // delete specific value
// firebaseRef.child('app/name').remove();

// // both update a value and delete another
// firebaseRef.child('app').update({
//   version: '2.0',
//   name: null // removes name completely
// });

// firebaseRef.child('isRunning').remove();
// firebaseRef.update({
//   isRunning: null
// });
// firebaseRef.child('user/age').remove();
// firebaseRef.child('user').update({
//   age: null
// });



// // update data without wiping out what was there
// firebaseRef.update({
//   isRunning: false,
//   app: {
//     name: 'Todo APPPPPPP' // this will delete 'version' because .update can only update the first level of properties
//   }
// });

// // solution: do a MULTIPATH update
// firebaseRef.update({
//   isRunning: false,
//   'app/name': 'Todo APPPPPPP' // this will update app/name without deleting app/version
// });

// // this will update app/name without affectina app/version
// firebaseRef.child('app').update({
//   name: 'Todo Apzzzz'
// }).then(() => {
//   console.log('Update worked');
// }, (e) => {
//   console.log('Update failed');
// });

// // multipath update for multiple values
// firebaseRef.update({
//   'app/name': 'New App',
//   'user/name': 'New Guy'
// });
//
// firebaseRef.child('app').update({
//   name: 'The best app'
// });
// firebaseRef.child('user').update({
//   name: 'The best guy'
// });

// firebaseRef.set({
//   appName: 'Todo Application',
//   isRunning: true,
//   coolGuy: false
// });

// firebaseRef.child('user').set({
//   name: 'Mike'
// });
//
// firebaseRef.child('app').set({
//   name: 'Todo Apllicantion' // will change the name value, and delete age
// }).then( () => { // success
//   console.log('Set worked');
// }, (e) => { // failure
//   console.log('Set failed');
// });

// // FETCHING DATA
// firebaseRef.once('value').then( (snapshot) => {
//   console.log('Got entire DB', snapshot.val());
// }, (e) => {
//   console.log('Unable to fetch value', e);
// });

// fetch subdocuments
// snapshot.key = property
// snapshot.value = value for key
// firebaseRef.child('app').once('value').then( (snapshot) => {
//   console.log('Got app from DB', snapshot.key, snapshot.val());
// }, (e) => {
//   console.log('Unable to fetch value', e);
// });

// // LISTEN FOR CHANGES IN DB
// firebaseRef.on('value', (snapshot) => {
//   console.log('Got value', snapshot.val());
// });
// // turn listener off
// firebaseRef.off();
//
// firebaseRef.update({isRunning: false});
//
// // LISTEN FOR CHANGES IN DB
// var logData = (snapshot) => {
//   console.log('Got value', snapshot.val());
// };
// firebaseRef.on('value', logData);
// // turn listener off
// firebaseRef.off(logData);

// // listen for changes in user object
// firebaseRef.child('user').on('value', (snapshot) => {
//   console.log('Got value', snapshot.val());
// });
//
// firebaseRef.update({
//   'user/name': 'Bane'
// });
//
// firebaseRef.child('app').update({
//   name: 'New App'
// });

firebaseRef.set({
  app: {
    name: 'Todo App',
    version: '1.0.0'
  },
  isRunning: true,
  user: {
    name: 'Andy',
    age: 30
  }
}).then( () => { // success
  console.log('Set worked');
}, (e) => { // failure
  console.log('Set failed');
});

var todosRef = firebaseRef.child('todos'); // doesn't yet exist, but will be child of root in DB

// var newNoteRef = notesRef.push(); // .push() creates a new item at the current reference and returns that reference
// newNoteRef.set({
//   text: 'Walk the dog'
// }); // notes/jerw2342fskdfj/text now exists
// // you can remove with newNoteRef.remove('value'), update with newNoteRef.update() and fetch values with newNoteRef.once()
//
// // this could also be done like this
// var newNoteRef = notesRef.push().set({
//   text: 'Walk the dog'
// });

// set a listener for every new child that gets added to a reference
todosRef.on('child_added', (snapshot) => {
  console.log('child_added', snapshot.key, snapshot.val());
});

// set a listener for every new child that gets changed
todosRef.on('child_changed', (snapshot) => {
  console.log('child_changed', snapshot.key, snapshot.val());
});

// set a listener for every new child that gets removed from a reference
todosRef.on('child_removed', (snapshot) => {
  console.log('child_removed', snapshot.key, snapshot.val());
});

// this could also be done like this
var newTodoRef = todosRef.push({
  text: 'Walk the cat'
});

todosRef.push({
  text: 'drive car'
});

// get unique id
console.log('get todo id', newTodoRef.key);

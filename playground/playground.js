// regular function
function add(a, b) {
  return a + b;
}

console.log(add(3, 1));

// spread operation useful when you want to call a function with a set of arguments in an array
var toAdd = [9, 5];

// you wanted to run the add function with the values in the array
// var sum = add(toAdd[0], toAdd[1]);

// use the spread operator to simplify this
console.log(add(toAdd)); // a = toAdd array, b = undefined
console.log(add(...toAdd)); // a = 9, b = 5

// ...arrayName --> returns the values of an array as individual arguments

var groupA = ['Andy', 'Ben'];
var groupB = ['Chase', 'Dan'];

// combine these with spread operator
var final = [3, ...groupA]; // [3, 'Andy', 'Ben']
console.log(final);
var finale = [...groupB, 3, ...groupA]; // ['Chase', 'Dan', 3, 'Andy', 'Ben']
console.log(finale);

// CHALLENGE
// create a function that takes a name and age, and returns both in a string
var person = ['Andy', 26];
var personTwo = ['Ben', 25];

function greet(name, age) {
  return 'Hi, ' + name + '. You are ' + age + '.';
}

console.log(greet(...person));

// CHALLENGE
// add names to final with spread operator, loop through anmes, and print
var names = ['Mike', 'Nolan'];
var final = ['Orville'];

var finale = [...names, ...final];

for (name in finale) {
  console.log('Hi, ' + finale[name]);
}
// this also works
finale.forEach(function (name) {
  console.log('Hello, ' + name);
})

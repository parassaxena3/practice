// What is JS and how it works?
// Javascript is a high-level, interpreted programming language. It is single-threaded, non-blocking, and asynchronous.
/*1. Single-Threaded Nature
JavaScript is single-threaded, meaning it has a single call stack where code is executed. This is in contrast to multi-threaded environments where multiple threads run concurrently.
2. Event-Driven
JavaScript is event-driven, allowing it to handle events like user interactions, timers, and network requests. This is facilitated through an event loop that manages asynchronous operations.
3. Non-Blocking
Despite being single-threaded, JavaScript uses non-blocking I/O operations, allowing it to handle multiple tasks efficiently without waiting for one to complete before starting another */

/*JavaScript Runtime Environment
The JavaScript runtime environment, provided by browsers or Node.js, consists of several components:

1. Call Stack: A stack data structure that stores function calls and executes them in a last-in-first-out manner. for eg: function calls, variable declarations, and expressions.

2. Heap: Memory allocation for objects and variables. for eg: objects, arrays, and closures.

3. Web APIs: Browser-specific APIs for handling asynchronous operations like timers, DOM manipulation, and AJAX requests. for eg: setTimeout, setInterval, fetch

4. Callback Queue or Task Queue: A queue for callback functions that are ready to be executed after the call stack is empty. for eg: setTimeout, setInterval, DOM events, AJAX requests

6. Microtask Queue: A queue for higher-priority tasks like Promises and async/await, processed before the callback queue. for eg: Promises, async/await, queueMicrotask, MutationObserver, Object.observe, process.nextTick, setImmediate

5. Event Loop: A mechanism that continuously checks the call stack and callback queue, moving functions from the queue to the stack when the stack is empty. In browsers, event loop is provided by libevent library while in Node.js, it is provided by libuv library.
*/

/*JavaScript Execution Flow

//Parsing and Compilation
JavaScript code is parsed by the JavaScript engine (e.g., V8 engine in Chrome) and converted into Abstract Syntax Tree (AST).
The AST is then compiled into bytecode that the JavaScript engine can execute. Role of JS engine is to parse, compile and execute the code. 

//Execution Phases
An execution context is an environment where JavaScript code is evaluated and executed. Each context has a variable environment, a lexical environment, and this binding.
Lexical Environment: Contains identifiers like variables and functions and their values and a reference to the outer lexical environment.
Variable Environment: Contains variables and function declarations and their values.


There are three types of execution contexts:

Global Execution Context: Created when the JavaScript engine starts executing the script. It contains global variables and functions.
Function Execution Context: Created when a function is called. Each function call has its own execution context.
Eval Execution Context: Created when the eval function is used to execute code.


There are two main phases in the execution of JavaScript code:
1. Creation Phase: Variable and function declarations are hoisted to the top of their scope, and memory is allocated for them.
2. Execution Phase: Code is executed line by line, and variables are assigned values.


Event Loop Execution Order:

  Execute Script: Runs initial JavaScript code.
  Macrotask Queue or Callback Queue: Processes one task from the macrotask queue (e.g., events, setTimeout, setInterval, network events).
  Microtask Queue: Processes all microtasks (e.g., promises, MutationObserver).
  Render: Updates the rendering if necessary. (In browsers)
  Repeat: Continues with the next macrotask.


Key Differences in Node.js and Browser Event Loop:

Implementation:
Node.js: Uses libuv for the event loop, which provides multiple phases for handling different types of callbacks.
Browsers: Use the browser’s built-in event loop, which integrates with the rendering engine and Web APIs.

Task Queues:
Node.js: Has multiple phases in its event loop, including a poll phase for I/O operations and separate phases for setImmediate and close callbacks. 
Browsers: Use a simpler event loop model with macrotask and microtask queues, focusing on integrating with the DOM and rendering pipeline.

Microtasks:
Node.js: Microtasks (like process.nextTick and Promise callbacks) are prioritized and executed between different phases of the event loop. (https://miro.medium.com/v2/resize:fit:1400/format:webp/1*2yXbhvpf1kj5YT-m_fXgEQ.png)
Browsers: Microtasks are executed immediately after the currently executing script and before any macrotasks.
*/

/*
//Example:

// console.log("Start");

// setTimeout(() => {
//   console.log("Timeout callback");
// }, 0);

// Promise.resolve().then(() => console.log("Microtask executed"));

// console.log("End");

//Output:
//Start
//End
//Microtask executed
//Timeout callback


Call Stack:
console.log("Start") is executed.
setTimeout is called and the callback is registered with the Web API (timer).
Promise.resolve() is called and a then callback is registered with the microtask queue.
console.log("End") is executed.

Web APIs:
The setTimeout callback is registered to be moved to the callback queue after 1000 ms by the Web API.

Callback Queue vs. Microtask Queue:
The callback queue (or task queue) holds callbacks from setTimeout, setInterval, and I/O tasks.
The microtask queue holds promises’ then callbacks, MutationObserver callbacks, and process.nextTick (Node.js).

Event Loop:
After the call stack is empty, the event loop first processes all tasks in the microtask queue before moving to the callback queue.
In this example, the microtask queue has a Promise callback, which is executed before the setTimeout callback in the callback queue.

*/

/*
console.log('start');

setTimeout(() => {
  console.log('setTimeout');
}, 0);

Promise.resolve().then(() => {
  console.log('promise1');
}).then(() => {
  console.log('promise2')
  setTimeout(() => {
    console.log('setTimeout inside promise');
  }, 0);
});

setTimeout(() => {
  Promise.resolve().then(() => {
    console.log('promise inside setTimeout');
  });
}, 0);

console.log('end');

//Output:
// start
// end
// promise1
// promise2
// setTimeout
// promise inside setTimeout
// setTimeout inside promise
*/


// Event loop with async/await
// async function async1() {
//   console.log("async1 start");
//   await async2();
//   console.log("async1 end");
// }

// async function async2() {
//   console.log("async2");
// }

// console.log("script start");

// setTimeout(() => {
//   console.log("setTimeout");
// }, 0);

// async1();

// new Promise((resolve) => {
//   console.log("promise1");
//   resolve();
// }).then(() => {
//   console.log("promise2");
// });
// console.log("script end");

//  output:
// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Rest and Spread Operator
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let [x, y, z, ...rest] = arr; //rest will be an array with 4,5,6,7,8,9,10

let obj = {
  name: "paras",
  age: 20,
  city: "Delhi",
  country: "India",
};
let { name, age, ...restObj } = obj; //restObj will be an object with city and country properties

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// this keyword behavior in arrow functions vs normal functions
// In normal functions, the value of this is determined by how the function is called.which means this refers to the object calling the function. if the function is called as a method of an object, this will refer to the object. if the function is called as a standalone function, this will refer to the global object (window in browsers).
// In arrow functions, this retains the value of the enclosing lexical context's this. which means arrow functions do not have their own this value. They inherit the this value from the surrounding code.

let person = {
  name: "Alice",
  greet: function () {
    console.log("Hello, " + this.name); // "Hello, Alice" because in normal functions, `this` refers to the object calling the function
  },
  greetArrow: () => {
    console.log("Hello, " + this.name); // "Hello, undefined" because `this` is lexically scoped in arrow functions, so it refers to the global object
  },
};
// person.greet();
// person.greetArrow(); // surrouding code is global object, so this.name will be undefined

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Prototype Chain, Constructor Property, Instance Check, Custom Methods and Properties

const obj1 = {
  name: "Alice",
  age: 21,
};
function Person() {
  this.name = "Alice";
  this.age = 21;
}
const obj2 = new Person();

//Prototype Chain:
//What is the prototype chain?
//The prototype chain is a series of links between objects where each object has a reference to another object called its prototype. This chain continues until it reaches an object with null as its prototype. This mechanism is used for inheritance in JavaScript.

//What is the difference between __proto__ and prototype?
//__proto__ is a property of an object that points to the prototype object of the constructor function that created the object. prototype is a property of a constructor function that is used to set the prototype of instances created by that constructor.

obj1.__proto__ === Object.prototype; //(true) because obj1 is created using object literal
obj2.__proto__ === Person.prototype; //(true) because obj2 is created using constructor function
Person.prototype.__proto__ === Object.prototype; //(true) because final prototype in prototype chain is Object.prototype which is the base prototype

//Instance Check:
obj1 instanceof Person; //(false) because obj1 is not created using constructor function
obj2 instanceof Person; //(true) because obj2 is created using constructor function

// Constructor Property:
obj1.constructor === Object; //(true); //obj1.constructor is Object
obj2.constructor === Person; //(true); //obj2.constructor is Person

//Custom Methods and Properties:
//You can add methods to Person.prototype, and obj2 will inherit them, but obj1 will not.
Person.prototype.greet = function () {
  console.log("Hello, my name is " + this.name);
};

//obj2.greet(); // "Hello, my name is Alice"
//obj1.greet(); // Uncaught TypeError: obj1.greet is not a function

//const obj = Object.create(null); // creates an object without a prototype

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Hoisting
// Hoisting is a JavaScript mechanism where variables and function declarations are moved to the top of their scope before code execution. This allows you to use variables and functions before they are declared. However, only the declarations are hoisted, not the initializations. 
//Variables declared with var are hoisted to the top of their function scope, while let and const variables are hoisted to the top of their block scope. 
//Let and const variables are in the Temporal Dead Zone until they are initialized. (see below eg)

//Function expressions are not hoisted.
console.log(myFunc); // undefined because myFunc is hoisted and initialized with undefined unlike normal functions which are hoisted with their entire function definition.
const myFunc = function() {} ;

//console.log(hoistedVar); // hoiestedVar is hoisted and initialized with undefined
var hoistedVar = "I'm hoisted";

//console.log(hoistedLet); // ReferenceError: Cannot access 'hoistedLet' before initialization
let hoistedLet = "I'm hoisted"; //this variable is in temporal dead zone, which means it is hoisted but not initialized. this happens with let and const.
//The Temporal Dead Zone is the time between entering the scope and the actual declaration of a let or const variable. During this time, accessing the variable will result in a ReferenceError.

hoistedFunction(); // function myFunc is hoisted with its entire function definition.
function hoistedFunction() {
  //console.log("I'm hoisted");
}

var a = 10;
(function () {
  // console.log(a); // undefined because var is hoisted and initialized with undefined
  var a = 20;
  //console.log(a); // 20
})();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Scope questions
function test() {
  var a = 10;
  let b = 30;
  const c = 50;
  if (true) {
    console.log(a); // 10
    console.log(b); // cannot access b before initialization
    console.log(c); // cannot access c before initialization
    var a = 20;
    let b = 40;
    const c = 60;
    console.log(a); // 20
    console.log(b); // 40
    console.log(c); // 60
  }
  console.log(a); // 20 because var is function scoped
  console.log(b); // 30 because let is block scoped
  console.log(c); // 50 because const is block scoped
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

for (var i = 0; i < 3; i++) {
  // setTimeout(() => console.log(i), 1000); // 3 3 3 because var is function scoped and the value of i is 3 when the setTimeout callback is executed
}
//console.log(i); // 3

for (let j = 0; j < 3; j++) {
  //setTimeout(() => console.log(i), 1000); // 0 1 2 because let is block scoped and the value of i is different for each iteration
}
//console.log(j); // ReferenceError: j is not defined

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Closures

// What is a Closure?
// A closure is an inner function that has access to the variables in the outer (enclosing) function’s scope, even after the outer function has returned. This includes:
// 1.Variables declared in the outer function’s scope.
// 2.Parameters of the outer function.
// 3.Variables in the global scope.
// Even after the outer function has finished execution, the inner function retains access to these variables.

//1. Data Privacy
//Closures can be used to create private variables that cannot be accessed directly from outside the function.
function counter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const myCounter = counter();
//console.log(myCounter()); // 1
//console.log(myCounter()); // 2

function secretHolder(secret) {
  return {
    getSecret: function () {
      return secret;
    },
    setSecret: function (newSecret) {
      secret = newSecret;
    },
  };
}

const mySecret = secretHolder("mySecret");
//console.log(mySecret.getSecret()); // 'mySecret'
mySecret.setSecret("newSecret");
//console.log(mySecret.getSecret()); // 'newSecret'

//2. Function Factory (Creating functions with pre-configured behavior.)
function createGreeter(greeting) {
  return function (name) {
    //console.log(greeting, name);
  };
}

const greeter = createGreeter("Hello");
greeter("Alice"); // "Hello Alice"
greeter("Bob"); // "Hello Bob"

for (var i = 1; i <= 5; i++) {
  setTimeout(function () {
    //console.log(i);
  }, i * 1000);
}
// 6 6 6 6 6 because the value of i is 6 when the setTimeout callbacks are executed. This is because var is function scoped and the value of i is the same for all the setTimeout callbacks as the i variable is hoisted to the top of the function. so the scope of i is actually the global scope.

for (var i = 1; i <= 5; i++) {
  (function (i) {
    setTimeout(function () {
      // console.log(i);
    }, i * 1000);
  })(i);
}
// 1 2 3 4 5 because the value of i is captured in the IIFE for each iteration

for (let i = 1; i <= 5; i++) {
  setTimeout(function () {
    // console.log(i);
  }, i * 1000);
}
// 1 2 3 4 5 because let is block scoped and the value of i is different for each iteration

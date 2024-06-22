// ES6 modules vs CommonJS modules
/*
ES6 Modules: import and export are part of the ECMAScript 6 (ES6) standard, which is the modern standard for JavaScript modules.
CommonJS Modules: require and module.exports are part of the CommonJS module system, which is the standard for Node.js modules.

ES6 modules are statically analyzable, which means that the dependencies are known at compile time, while CommonJS modules are dynamically loaded, which means that the dependencies are resolved at runtime.

ES6 modules are loaded asynchronously, while CommonJS modules are loaded synchronously.

ES6 modules are singletons by default, while CommonJS modules are cached and can be loaded multiple times.

ES6 modules support named exports and default exports, while CommonJS modules only support module.exports.

ES6 modules are the future of JavaScript modules and are supported in modern browsers and Node.js.
CommonJS modules are still widely used in Node.js and are supported by many libraries and frameworks.

ES6 modules are more modern and have better support for tree-shaking, which is a technique for eliminating dead code from the final bundle.*/

// // Exporting ES6 Modules
// export const myFunction = () => { ... };
// export default myFunction;

// // Importing ES6 Modules
// import { myFunction } from './myModule';
// import myDefaultFunction from './myModule';

// Exporting CommonJS Modules
// module.exports = myFunction;

// // Importing CommonJS Modules
// const myFunction = require('./myModule');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Higher-Order Functions

// A higher-order function is a function that takes one or more functions as arguments or returns a function as its result. Higher-order functions are a common pattern in functional programming and are used to create abstractions and compose functions.

// Example of a higher-order function that takes a function as an argument:
//Array.prototype.map(()=>{}) or Array.prototype.filter(()=>{})

// Example of a higher-order function that returns a function:
// function createMultiplier(multiplier) {
//     return function (number) {
//       return number * multiplier;
//     };
//   }
//   const double = createMultiplier(2);

// function repeat(operation, num) {
//     return function() {
//       for (let i = 0; i < num; i++) {
//         operation();
//       }
//     };
//   }

//   const sayHello = () => console.log('Hello');
//   const repeatSayHello = repeat(sayHello, 3);

//   repeatSayHello();


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Anonymous Functions
// An anonymous function is a function that does not have a name. Anonymous functions are commonly used as arguments to other functions or as an IIFE (Immediately Invoked Function Expression).

// Example of an anonymous function as an argument:
// setTimeout(() => {
//     console.log('Hello');
//   }, 1000);

// or
// setTimeout(function () {
//     console.log('Hello');
//   }, 1000);

// Example of an anonymous function as an IIFE:
// (function () {
//     console.log('Hello');
//   })();

// // Example of an anonymous function as a method:
// const obj = {
//     method: function () {
//       console.log('Hello');
//     },
//   };
//   obj.method();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Immutable in JavaScript
// Immutable data is data that cannot be changed once it has been created. In JavaScript, primitive data types such as strings, numbers, and booleans are immutable, while objects and arrays are mutable.

// Example of immutable data:
// let str = 'Hello';
// str = 'World'; // This creates a new string and assigns it to the variable.

// Example of mutable data:
// let arr = [1, 2, 3];
// arr.push(4); // This modifies the existing array.

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Various ES features

/*
ES6 (ECMAScript 2015)
Let and Const: Block-scoped variable declarations.
Arrow Functions: Shorter syntax for function expressions, with lexical this binding.
Template Literals: String literals allowing embedded expressions, multi-line strings.
Destructuring Assignment: Unpacking values from arrays or properties from objects into distinct variables.
Default Parameters: Functions can have default values for parameters.
Rest and Spread Operators: Rest (...args) for variable number of arguments; Spread (...array) to expand elements.
Classes: Syntactic sugar for prototype-based inheritance.
Modules: import and export statements for modular code.
Promises: Native support for asynchronous operations.
Enhanced Object Literals: Shorthand for property definitions and method definitions in objects. eg: {x, y} instead of {x: x, y: y}

ES7 (ECMAScript 2016)
Exponentiation Operator: ** for exponentiation (e.g., 2 ** 3 equals 8).
Array.prototype.includes: Checks if an array includes a certain element.

ES8 (ECMAScript 2017)
Async/Await: Syntactic sugar for Promises, enabling asynchronous code to be written in a synchronous style.
Object.values/Object.entries: Methods to return values and key-value pairs from an object.

ES9 (ECMAScript 2018)
Rest/Spread Properties: Rest properties for object destructuring and spread properties to copy objects. eg { x, y, ...z }.
Asynchronous Iteration: for-await-of loop for asynchronous iteration. eg for await (const line of readLines(filePath)).
Promise.finally: Method to specify code to run regardless of whether a promise is fulfilled or rejected.

ES10 (ECMAScript 2019)
Array.flat() and Array.flatMap(): Flattening arrays and mapping followed by flattening.

ES11 (ECMAScript 2020)
BigInt: Primitive for arbitrarily large integers.
Dynamic Import: import() function for dynamic module loading.
Nullish Coalescing Operator (??): Provides a way to fall back to a default value when dealing with null or undefined.
Optional Chaining (?.): Safe access to deeply nested object properties.

ES12 (ECMAScript 2021)
String.prototype.replaceAll: Method to replace all occurrences of a substring.

ES13 (ECMAScript 2022)
Class Fields: Public and private instance fields and static fields in classes. eg class MyClass { x = 1; #y = 2; static z = 3; }.

ES14 (ECMAScript 2023)
Four new immutable array methods: toReversed(), toSorted(), toSpliced(), and with().
*/

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Bind, Call, and Apply

// The bind, call, and apply methods are used to set the value of this in a function and to call the function with a specific context.

// bind: Creates a new function that, when called, has its this keyword set to the provided value.
// call: Calls a function with a given this value and arguments provided individually.
// apply: Calls a function with a given this value and arguments provided as an array.

const person = {
  name: "Alice",
  greet: function (greeting) {
    console.log(`${greeting}, my name is ${this.name}`);
  },
};
const person2 = {
  name: "Bob",
};

// Example of using bind:
//   const greetAlice = person.greet.bind(person2); // returns a new function with this set to person2
//   greetAlice('Hello'); // Hello, my name is Bob

// Example of using call:
// person.greet.call(person2, 'Hello'); // used for function borrowing

// Example of using apply:
//person.greet.apply(person2, ["Hello"]); //same as call but used when we have to pass arguments as an array

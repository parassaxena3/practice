const axios = require("axios");

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Callbacks, Promises, Async/Await

//What is a Promise in JavaScript?
//A Promise in JavaScript is an object representing the eventual completion or failure of an asynchronous operation. It can be in one of three states: pending, fulfilled, or rejected.

//Promise.all: Resolves when all promises resolve, or rejects when any promise rejects.
//Promise.race: Resolves or rejects as soon as one of the promises resolves or rejects.
//Promise.any: Resolves as soon as one of the promises resolves, or rejects if all promises reject (introduced in ES2021).
//Promise.allSettled: Resolves when all promises have settled (each may resolve or reject).

//Syntax:
// const promise = new Promise((resolve, reject) => {
//   // Perform an asynchronous operation
//   if (operationSucceeded) {
//     resolve("Operation successful");
//   } else {
//     reject("Operation failed");
//   }
// });

// promise
//   .then((result) => {
//     console.log(result);

//     return "New Promise";
//   })
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.error(error);
//   });

//We can directly resolve or reject a promise using Promise.resolve() and Promise.reject() methods.
// const resolvedPromise = Promise.resolve("Resolved");
// const rejectedPromise = Promise.reject("Rejected");
// resolvedPromise.then((result) => {
//   console.log(result);
// }
// );



// Callbacks
function processData(name) {
  console.log("Hello, " + name);
}

function fetchData(callback) {
  setTimeout(() => {
    callback("John Doe");
  }, 1000);
}
fetchData(processData);

// Promises
function fetchDataPromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("John Doe1");
    }, 1000);
  });
}

fetchDataPromise().then((data) => {
  processData(data);
});

// Async/Await
async function fetchDataAsync() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("John Doe2");
    }, 1000);
  });
}
async function processDataAsync() {
  const data = await fetchDataAsync();
  processData(data);
}
processDataAsync();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Different ways to create objects in JavaScript

// Object Literal
const ob = {
  name: "Alice",
  age: 30,
};

// Using the Object Constructor
const ob3 = new Object();
ob3.name = "Alice";
ob3.age = 30;

// Object.create
const ob2 = Object.create(null);
ob2.name = "Alice";
ob2.age = 30;

//Object.create with specified prototype object and properties.
const ob4 = Object.create({
  age: { value: 30 },
});


//Using the Object.assign() Method
const ob5 = Object.assign({}, { name: "Bob" });

// Using ES6 Spread Syntax
const ob6 = { ...ob5, age: 30 };

// Constructor Function
function Person(name, age) {
  this.name = name;
  this.age = age;
}
const person1 = new Person("Alice", 30);

// ES6 Classes
class Person2 {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greet() {
    console.log("Hello, my name is " + this.name);
  }
}
const person2 = new Person2("Alice", 23);

// Factory Function (A factory function is a function that returns a new object.)
function createPerson(name, age) {
  return {
    name,
    age,
  };
}
const person3 = createPerson("Alice", 30);

// Singleton Pattern
const singleton = (function () {
  let instance;
  function createInstance() {
    const object = new Object("I am the instance");
    return object;
  }
  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

// Prototype
function Person3() {}
Person3.prototype.name = "Alice";
Person3.prototype.age = 30;
const person4 = new Person3();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Classes and Inheritance
class PersonX {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(
      `Hello, my name is ${this.name} and I am ${this.age} years old.`
    );
  }
}

class Student extends PersonX {
  constructor(name, age, grade) {
    super(name, age); // Call the parent class constructor
    this.grade = grade;
  }

  study() {
    console.log(`${this.name} is studying.`);
  }
  greetAndStudy() {
    super.greet(); // Call the parent class method using super
    this.study();
  }
}
const student = new Student("Alice", 20, "A");

//static methods
class MathUtil {
  static add(a, b) {
    return a + b;
  }
}

console.log(MathUtil.add(2, 3)); // Output: 5

// getter and setter
class PersonY {
  #age; // Private field which is accessible only within the class
  constructor(name, age) {
    this._name = name;
    this.#age = age;
  }

  get name() {
    return this._name;
  }

  set name(newName) {
    if (newName.length > 0) {
      this._name = newName;
    } else {
      console.error("Name cannot be empty");
    }
  }

  get age() {
    return this.#age;
  }

  set age(newAge) {
    if (newAge > 0) {
      this.#age = newAge;
    } else {
      console.error("Age must be positive");
    }
  }
}

const john = new PersonY("John", 30);
john.name = "John Doe";
john.age = 1000;
//console.log(john.#age); // Error: Private field '#age' is not defined in the class

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Fetch and Axios

// fetch("https://jsonplaceholder.typicode.com/posts", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     title: "foo",
//     body: "bar",
//     userId: 1,
//   }),
// })
//   .then((response) => {
//     if (!response.ok) {
//       // fetch doesnt throw an error for non-2xx status codes, throw only for network errors
//       throw new Error("Network response was not ok " + response.statusText);
//     }
//     return response.json(); // parses the JSON response
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.error("There was a problem with the fetch operation:", error);
//   });

// axios
//   .post("https://jsonplaceholder.typicode.com/posts", {
//     title: "foo",
//     body: "bar",
//     userId: 1,
//   })
//   .then((response) => {
//     console.log(response.data); // automatically parses the JSON response
//   })
//   .catch((error) => {
//     console.error("There was a problem with the axios request:", error); //Axios Automatically throws errors for non-2xx status codes.
//   });

//Interceptors
// Add a request interceptor
axios.interceptors.request.use(
  (request) => {
    // Do something before request is sent
    console.log("Request:", request);
    return request;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) => {
    // Do something with response data
    console.log("Response:", response);
    return response;
  },
  (error) => {
    // Do something with response error
    return Promise.reject(error);
  }
);

// function sayHelloWithoutCallback(name) {
//   return name
//     ? Promise.resolve("Hello " + name)
//     : Promise.reject("Name is required");
// }

// sayHelloWithoutCallback("paras")
//   .then((val) => console.log(val))
//   .catch((val) => console.log(val));

//--------------------------------------------------------------------

// function sayHelloWithoutTimeout(name) {
//     return new Promise((resolve, reject) => {
//       if (!name) reject("Name is required");
//       resolve("Hello " + name);
//     });
// }

// sayHelloWithTimeout("paras")
//   .then((val) => console.log(val))
//   .catch((val) => console.log(val));

//--------------------------------------------------------------------

// function sayHelloWithTimeout(name) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (!name) reject("Name is required");
//       resolve("Hello " + name);
//     }, 2000);
//   });
// }

// sayHelloWithoutTimeout("paras")
//   .then((val) => console.log(val))
//   .catch((val) => console.log(val));

//--------------------------------------------------------------------

// async function main() {
//   try {
//     let val = await sayHelloWithTimeout("paras");
//     console.log(val);
//   } catch (error) {
//     console.log(error);
//   }
//   try {
//     let val = await sayHelloWithoutTimeout("rt");
//     console.log(val);
//   } catch (error) {
//     console.log(error);
//   }
// }
// main();

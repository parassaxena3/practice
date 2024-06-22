// // Create JS arrays map functionality

// Array.prototype.map2 = function (fn) {
//   const result = [];
//   this.forEach((element, index) => {
//     result.push(fn(element, index));
//   });
//   return result;
// };

// let arr = [1, 2, 3, 4, 5];
// let updatedArr = arr.map2((element,index) => {
//   return element * element;
// });

// console.log(arr);
// console.log(updatedArr);

// import { execFile } from "child_process";
// execFile("./Practice4.js"
//   , (error, stdout, stderr) => {
//   if (error) {
//     console.error(`execFile error: ${error}`);
//     return;
//   }
//   console.log(`stdout: ${stdout}`);
//   console.error(`stderr: ${stderr}`);
// });

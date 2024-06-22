console.log("Start");

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function foo() {
  console.log("Inside foo");
  await Promise.resolve(); // Microtask
  console.log("Inside foo after microtask");
  console.log("Inside foo after microtask");

  console.log("Inside foo after microtask");

}

function foo1() {
  return new Promise((resolve, reject) => {
    resolve("hello");
  });
  // return "hello";
}

async function foo2() {
  console.log(await foo1());
}
let y = 10;
setTimeout(() => console.log("Timeout callback" + y), 5000); // Macrotask

console.log(foo1().then((val) => console.log("success:" + val)));
foo1()
  .then((val) => console.log("success:" + val))
  .catch((val) => console.log(val));

console.log("End");

start
Inside foo
End
Inside foo after microtask
Timeout callback

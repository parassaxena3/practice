console.log("Start");

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function foo() {
  console.log("Inside foo");
  await delay(1000);
  console.log("Inside foo after delay");
}

function bar() {
  console.log("Inside bar");
  setTimeout(() => console.log("Callback executed"), 0);
  Promise.resolve().then(() => console.log("Microtask executed"));
  console.log("End of bar");
}

foo();
bar();

console.log("End");

//Start
//Inside foo
//Inside bar
//End of bar
//End
//Microtask executed
//Callback executed
//Inside foo after delay
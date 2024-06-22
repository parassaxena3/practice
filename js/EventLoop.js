const Queue = require("../ds-algo/Queue");
const Stack = require("../ds-algo/Stack");

const microtaskQueue = new Queue();
const taskQueue = new Queue();
const callStack = new Stack();

const eventLoop = () => {
  setInterval(() => {
    if (callStack.isEmpty()) {
      console.log("CallStack Empty");
      if (!microtaskQueue.isEmpty()) {
        const itemToProcess = microtaskQueue.pop();
        console.log(`Processing ${itemToProcess} from MicrotaskQueue`);
        callStack.push(itemToProcess);
        return;
      } else {
        console.log("MicrotaskQueue Empty");
      }
      if (!taskQueue.isEmpty()) {
        const itemToProcess = taskQueue.pop();
        console.log(`Processing ${itemToProcess} from TaskQueue`);
        callStack.push(itemToProcess);
      } else {
        console.log("TaskQueue Empty");
      }
    } else {
      const itemToProcess = callStack.pop(); //not job of event loop
      console.log(`Processing ${itemToProcess} from CallStack`);
    }
  }, 3000);
};
eventLoop();

callStack.push("task1");
callStack.push("task2");
microtaskQueue.push("task3");
microtaskQueue.push("task4");
taskQueue.push("task5");
taskQueue.push("task6");

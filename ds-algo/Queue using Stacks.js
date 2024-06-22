const Stack = require("./Stack");

/*

Queue
[2,4,6,8]
[4,6,8]
[4,6,8,10]
[4,6,8,10,12]
[6,8,10,12]
[8,10,12]
[10,12]
[12]

Stacks
[2,4,6,8][]-->[][8,6,4]-->[10][8,6,4]-->[10,12][8,6,4]-->[10,12][8,6]-->[10,12][8]-->[10,12][]-->[][12]

Push:
  push in s1
Pop:
  if s2 is not empty, pop from s2 
  else pop all elements from s1 to and push to s2 (dont push last element to s2, just return it)
Peek:
  if s2 is empty, pop all elements from s1 to and push to s2
  peek from s2
Empty:
  true if both s1 and s2 are empty

*/

var MyQueue = function () {
  this.s1 = new Stack();
  this.s2 = new Stack();
};

/**
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function (x) {
  this.s1.push(x);
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function () {
  if (this.s2.isEmpty()) {
    while (!this.s1.isEmpty()) {
      let poppedElement = this.s1.pop();
      if (this.s1.size() > 0) this.s2.push(poppedElement);
      else return poppedElement;
    }
  } else {
    return this.s2.pop();
  }
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function () {
  if (this.s2.isEmpty()) {
    while (!this.s1.isEmpty()) {
      this.s2.push(this.s1.pop());
    }
  }
  return this.s2.peek();
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function () {
  return this.s1.isEmpty() && this.s2.isEmpty();
};

let queue = new MyQueue();
queue.push(2);
queue.push(4);
queue.push(6);
queue.push(8);
console.log(queue.pop());
queue.push(10);
queue.push(12);
console.log(queue.pop());
console.log(queue.pop());
console.log(queue.pop());
console.log(queue.pop());

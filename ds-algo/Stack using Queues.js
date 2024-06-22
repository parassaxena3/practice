const Queue = require("./Queue");

/*

Stack
[2,4,6,8]
[2,4,6,8,10]
[2.4,6,8]
[2.4,6]
[2,4,6,8]
[2.4,6]


Queues
[][2,4,6,8]-->[][2,4,6,8,10]-->[2,4,6,8][]-->[][2,4,6]-->[][2,4,6,8]-->[2,4,6][]-->[][2,4]

Push:
  push in non empty queue
Pop:
  pop all from non-empty queue and copy to empty queue (dont copy last, just return)
Peek:
  pop all from non-empty queue and copy to empty queue
  peek from empty queue
Empty:
  true if both q1 and q2 are empty

*/

var MyStack = function () {
  this.q1 = new Queue();
  this.q2 = new Queue();
};

/**
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function (x) {
  this.q1.isEmpty() ? this.q2.push(x) : this.q1.push(x);
};

/**
 * @return {number}
 */
MyStack.prototype.pop = function () {
  let emptyQueue = this.q1.isEmpty() ? this.q1 : this.q2;
  let nonEmptyQueue = this.q1.isEmpty() ? this.q2 : this.q1;

  while (!nonEmptyQueue.isEmpty()) {
    let poppedElement = nonEmptyQueue.pop();
    if (!nonEmptyQueue.size()) return poppedElement;
    emptyQueue.push(poppedElement);
  }
  return emptyQueue.peek();
};

/**
 * @return {number}
 */
MyStack.prototype.top = function () {
// [2,4,6,8]
// [2,4,6,8,10]
// [2.4,6,8]

// [2.4,6]
// [2,4,6,8]
// [2.4,6]
//[][2,4,6,8]-->[][2,4,6,8,10]-->[2,4,6,8][]-->[][2,4,6]-->[][2,4,6,8] -->[2,4,6][]-->[][2,4]

  let emptyQueue = this.q1.isEmpty() ? this.q1 : this.q2;
  let nonEmptyQueue = this.q1.isEmpty() ? this.q2 : this.q1;

  while (!nonEmptyQueue.isEmpty()) {
    let poppedElement = nonEmptyQueue.pop();
    emptyQueue.push(poppedElement);
    if (nonEmptyQueue.isEmpty()) {
      return poppedElement;
    }
  }
};

/**
 * @return {boolean}
 */
MyStack.prototype.empty = function () {
  return this.q1.isEmpty() && this.q2.isEmpty();
};

let stack = new MyStack();
stack.push(1);
stack.push(2);
stack.top();

stack.push(3);
stack.top();

//[][2,4,6,8]-->[][2,4,6,8,10]-->[2,4,6,8][]-->[][2,4,6]-->[][2,4,6,8]-->[2,4,6][]-->[][2,4]

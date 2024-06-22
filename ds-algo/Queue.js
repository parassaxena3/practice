class Queue {
  #queue = [];

  //[2]
  //[2,4]
  //[2,4,6]
  //[4,6]
  //[6]

  push(value) {
    this.#queue.push(value);
  }
  pop() {
    let poppedElement;
    if (this.#queue.length) {
      poppedElement = this.#queue[0];
      this.#queue.shift();
    }
    return poppedElement;
  }
  print() {
    console.log(...this.#queue);
  }
  size() {
    return this.#queue.length;
  }
  isEmpty() {
    return !this.#queue.length;
  }
  peek() {
    if (this.#queue.length) {
      return this.#queue[0];
    }
  }
}
module.exports = Queue;

// let queue = new Queue();
// queue.push(2);
// queue.print();
// // console.log(queue.peek());

// queue.push(4);
// queue.print();
// // console.log(queue.peek());

// queue.push(6);
// queue.print();
// // console.log(queue.peek());

// queue.pop();
// queue.print();
// // console.log(queue.peek());

// queue.pop();
// queue.print();
// // console.log(queue.peek());

// queue.pop();
// queue.print();
// // console.log(queue.peek());

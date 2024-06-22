class Stack {
  #stack = [];
  //[2]
  //[2,4]
  //[2,4,6]
  //[2,4]
  //[2]

  /**
   *
   * []  [] current=left;
   * [1] [] current=right;
   * [1] [2] current=left;
   * [1,3] [2] current=right;
   * [1,3] [2,4] current=left;
   * [1,3,5] [2,4] current=right;
   * 0 0
   * 0<->1 1
   * 0<->1<->2 1
   * 0<->1<->2<->3 2
   * 0<->1<->2<->3<->4 2
   * 0<->1<->3<->4 previous middle ka next mid ho jaega
   */
  push(value) {
    this.#stack.push(value);
  }
  pop() {
    let poppedElement;
    if (this.#stack.length) {
      poppedElement = this.#stack[this.#stack.length - 1];
      this.#stack.length = this.#stack.length - 1;
    }
    return poppedElement;
  }
  print() {
    console.log(...this.#stack);
  }
  size() {
    return this.#stack.length;
  }
  isEmpty() {
    return !this.#stack.length;
  }
  peek() {
    if (this.#stack.length) {
      return this.#stack[this.#stack.length - 1];
    }
  }
}
module.exports = Stack;

// let queue = new Stack();
// queue.push(2);
// queue.print();

// queue.push(4);
// queue.print();

// queue.push(6);
// queue.print();

// // console.log(queue.peek());

// queue.pop();
// queue.print();

// queue.pop();
// queue.print();

// queue.pop();
// queue.print();

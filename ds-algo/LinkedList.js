class ListNode {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  addNodeToFront(data) {
    let node = new ListNode(data);
    if (!this.head) this.head = node;
    else {
      node.next = this.head;
      this.head = node;
    }
    return this.head;
  }
  // 1 2 3 4
  addNodeToEnd(data) {
    let node = new ListNode(data);
    if (!this.head) {
      this.head = node;
    } else {
      let temp = this.head;
      while (temp.next) {
        temp = temp.next;
      }
      temp.next = node;
    }
    return node;
  }
  //0 1 2 3 4   10
  addNodeToIndex(data, index) {
    let node = new ListNode(data);
    if (index < 0) throw new Error("Index out of bound");
    if (index == 0) {
      node.next = this.head;
      this.head = node;
      return this.head;
    }
    let currentIndex = 0;
    let prev = this.head;
    let temp = this.head;
    while (currentIndex < index) {
      if (!temp) throw new Error("Index out of bound");
      currentIndex++;
      prev = temp;
      temp = temp.next;
    }
    prev.next = node;
    node.next = temp;

    return this.head;
  }

  // 0 1 2 3 4
  removeNodeFromIndex(index) {
    if (index < 0 || !this.head) throw new Error("Index out of bound");
    if (index == 0) {
      this.head = this.head.next;
      return this.head;
    }
    let currentIndex = 0;
    let prev = this.head;
    let temp = this.head;
    while (currentIndex < index) {
      if (!temp) throw new Error("Index out of bound");
      currentIndex++;
      prev = temp;
      temp = temp.next;
    }

    prev.next = temp.next;
    return this.head;
  }

  getSize() {
    if (!this.head) return 0;
    let temp = this.head;
    let size = 0;
    while (temp) {
      size++;
      temp = temp.next;
    }
    return size;
  }
  search(data) {
    let temp = this.head;
    while (temp) {
      if (temp.data == data) return temp;
      temp = temp.next;
    }
    return null;
  }
  printList() {
    let temp = this.head;
    while (temp) {
      console.log(temp.data);
      temp = temp.next;
    }
  }
}

module.exports = LinkedList;
// let list = new LinkedList();
// list.addNodeToEnd(0);
// list.addNodeToEnd(1);

// list.addNodeToEnd(2);
// list.addNodeToEnd(3);
// list.addNodeToEnd(4);

// list.removeNodeFromIndex(6);
// // console.log(list.search(4));
// list.printList();


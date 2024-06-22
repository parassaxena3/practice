const LinkedList = require("./LinkedList");

var addTwoNumbersLeetCode = function (l1, l2) {
  let carry = 0;
  let head = null,
    prev = null;
  while (l1 || l2 || carry) {
    let sum = 0;
    if (l1) {
      sum += l1.val;
      l1 = l1.next;
    }
    if (l2) {
      sum += l2.val;
      l2 = l2.next;
    }
    if (carry) {
      sum += carry;
    }
    if (sum > 9) {
      carry = Math.floor(sum / 10);
      sum = sum % 10;
    } else {
      carry = 0;
    }
    let newNode = new ListNode(sum, null);
    if (prev) {
      prev.next = newNode;
    } else {
      head = newNode;
    }
    prev = newNode;
  }
  return head;
};

var addTwoNumbers = function (l1, l2) {
  let carry = 0;
  let l3 = new LinkedList();
  while (l1 || l2 || carry) {
    let sum = 0;
    if (l1) {
      sum += l1.data;
      l1 = l1.next;
    }
    if (l2) {
      sum += l2.data;
      l2 = l2.next;
    }
    if (carry) {
      sum += carry;
    }
    if (sum > 9) {
      carry = Math.floor(sum / 10);
      sum = sum % 10;
    } else {
      carry = 0;
    }
    l3.addNodeToEnd(sum);
  }
  return l3.head;
};

// let linkedList1 = new LinkedList();
// linkedList1.addNodeToEnd(2);
// linkedList1.addNodeToEnd(4);
// linkedList1.addNodeToEnd(3);

// let linkedList2 = new LinkedList();
// linkedList2.addNodeToEnd(5);
// linkedList2.addNodeToEnd(6);
// linkedList2.addNodeToEnd(4);



// let linkedList1 = new LinkedList();
// linkedList1.addNodeToEnd(0);

// let linkedList2 = new LinkedList();
// linkedList2.addNodeToEnd(0);


let linkedList1 = new LinkedList();
linkedList1.addNodeToEnd(9);
linkedList1.addNodeToEnd(9);
linkedList1.addNodeToEnd(9);
linkedList1.addNodeToEnd(9);
linkedList1.addNodeToEnd(9);
linkedList1.addNodeToEnd(9);
linkedList1.addNodeToEnd(9);



let linkedList2 = new LinkedList();
linkedList2.addNodeToEnd(9);
linkedList2.addNodeToEnd(9);
linkedList2.addNodeToEnd(9);
linkedList2.addNodeToEnd(9);

addTwoNumbers(linkedList1.head, linkedList2.head);

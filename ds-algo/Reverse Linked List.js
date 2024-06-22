const LinkedList = require("./LinkedList");

var reverseListIterative = function (head) {
  if (!head) {
    return head;
  }
  var prev = null,
    next = head.next;

  while (head != null) {
    head.next = prev;
    prev = head;
    head = next;
    next = head?.next;
  }

  return prev;
};

var reverseListRecursive = function (current, prev) {
  if (!current) return prev;
  let head = reverseListRecursive(current.next, current);
  current.next = prev;
  return head;
};
// 1->2->3->4->5->null
var reverseList = function (head) {
  if (!head) {
    return head;
  }
  head = reverseListRecursive(head, null);
  return head;
};

let linkedList = new LinkedList();
linkedList.addNodeToEnd(1);
linkedList.addNodeToEnd(2);
linkedList.addNodeToEnd(3);
linkedList.addNodeToEnd(4);
linkedList.addNodeToEnd(5);
reverseListIterative(linkedList.head);

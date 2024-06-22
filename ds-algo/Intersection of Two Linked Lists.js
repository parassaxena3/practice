const LinkedList = require("./LinkedList");

var countElements = (head) => {
  if (!head) return 0;
  let temp = head;
  let size = 0;
  while (temp) {
    size++;
    temp = temp.next;
  }
  return size;
};
var adjustStartingOfLongerList = (headA, headB) => {
  let lenA = countElements(headA);
  let lenB = countElements(headB);
  if (lenA == lenB) {
    return { listA: headA, listB: headB };
  }
  let longerList = lenA > lenB ? headA : headB;
  let diff = Math.abs(lenA - lenB);
  while (diff--) {
    longerList = longerList.next;
  }
  return {
    listA: lenA > lenB ? longerList : headA,
    listB: lenB > lenA ? longerList : headB,
  };
};

var getIntersectionNode = function (headA, headB) {
  let { listA, listB } = adjustStartingOfLongerList(headA, headB);
  while (listA && listB) {
    if (listA == listB) return listA;
    listA = listA.next;
    listB = listB.next;
  }
  return null;
};

let linkedList1 = new LinkedList();
linkedList1.addNodeToEnd(4);
linkedList1.addNodeToEnd(1);
let c1 = linkedList1.addNodeToEnd(8);
linkedList1.addNodeToEnd(4);
linkedList1.addNodeToEnd(5);

let linkedList2 = new LinkedList();
linkedList2.addNodeToEnd(5);
linkedList2.addNodeToEnd(6);
let b3 = linkedList2.addNodeToEnd(1);
b3.next = c1;
getIntersectionNode(linkedList1.head, linkedList2.head);

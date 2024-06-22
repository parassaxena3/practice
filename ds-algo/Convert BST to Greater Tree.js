const Bst = require("./Binary Search Tree.js");

let convert = (root, sum) => {
  if (root.right) sum = convert(root.right, sum);

  root.data += sum;

  if (root.left) return convert(root.left, root.data);

  return root.data;
};

let convertBST = function (root) {
  convert(root, 0);
  return root;
};

let tree = new Bst();
tree.insert(4);
tree.insert(1);
tree.insert(6);
tree.insert(0);
tree.insert(2);
tree.insert(3);
tree.insert(5);
tree.insert(7);
tree.insert(8);
convertBST(tree.root);

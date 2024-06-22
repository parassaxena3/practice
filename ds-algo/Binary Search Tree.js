const TreeNode = require("./TreeNode.js");

class Bst {
  constructor() {
    this.root = null;
  }
  insert(data) {
    let node = new TreeNode(data);
    if (!this.root) {
      this.root = node;
    } else this.insertNode(this.root, node);
  }
  insertNode(parent, node) {
    if (node.data < parent.data) {
      if (parent.left == null) {
        parent.left = node;
      } else {
        this.insertNode(parent.left, node);
      }
    } else {
      if (parent.right == null) {
        parent.right = node;
      } else {
        this.insertNode(parent.right, node);
      }
    }
  }
  find(data) {
    return this.findNode(this.root, data);
  }

  findNode(node, data) {
    if (node === null) {
      return false;
    }
    if (data === node.data) {
      return node;
    }
    if (data < node.data) {
      return this.findNode(node.left, data);
    }
    return this.findNode(node.right, data);
  }

  inorder() {
    if (this.root) this.inorderTraversal(this.root);
  }
  inorderTraversal(node) {
    if (node.left) this.inorderTraversal(node.left);
    console.log(node.data);
    if (node.right) this.inorderTraversal(node.right);
  }

  preorder() {
    if (this.root) this.preorderTraversal(this.root);
  }
  preorderTraversal(node) {
    console.log(node.data);
    if (node.left) this.preorderTraversal(node.left);
    if (node.right) this.preorderTraversal(node.right);
  }

  postorder() {
    if (this.root) this.postorderTraversal(this.root);
  }
  postorderTraversal(node) {
    if (node.left) this.postorderTraversal(node.left);
    if (node.right) this.postorderTraversal(node.right);
    console.log(node.data);
  }
  height() {
    return this.findHeight(this.root) - 1;
  }
  findHeight(parent) {
    if (!parent) return 0;
    return (
      Math.max(this.findHeight(parent.left), this.findHeight(parent.right)) + 1
    );
  }

  delete(root, data) {
    let current = root,
      parent = null;

    while (current) {
      if (!current) return;
      else if (data == current.data) break;
      else {
        parent = current;
        current = data > current.data ? current.right : current.left;
      }
    }
    if (current.left == null && current.right == null) {
      parent[parent.left.data == data ? "left" : "right"] = null;
    } else if (current.left == null) {
      parent[parent.left.data == data ? "left" : "right"] = current.right;
    } else if (current.right == null) {
      parent[parent.left.data == data ? "left" : "right"] = current.left;
    } else {
      let temp = current.right;
      while (temp) {
        if (temp.left) temp = temp.left;
        else break;
      }
      current.data = temp.data;
      this.delete(current.right, temp.data);
    }
  }
}

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

//console.log(tree.preorder()); // 4 1 0 2 3 6 5 7 8
//console.log(tree.inorder());  // 0 1 2 3 4 5 6 7 8
//console.log(tree.postorder());// 0 3 2 1 5 8 7 6 4
/*

                4
              /   \
             2     6
            /     / \
           1     5   7

                4
              /   \
             2     6
              \   / \
               3 5   7

                4
              /   \
             2     6
            / \   / \
           1   3 5   7

*/

// console.log(tree.find(4));
//console.log(tree.height());

module.exports = Bst;

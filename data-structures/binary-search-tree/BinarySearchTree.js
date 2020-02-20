class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(val) {
        if (!this.root) {
            this.root = new Node(val);
            return;
        }

        this._insertIterative(val);
    }

    _insertIterative(val) {
        const node = new Node(val);

        let current = this.root;
        let noInsert = true;
        while (noInsert) {
            if (val < current.val) {
                if (current.left) {
                    current = current.left;
                } else {
                    current.left = node;
                    noInsert = false;
                }
            } else {
                if (current.right) {
                    current = current.right
                } else {
                    current.right = node;
                    noInsert = false;
                }
            }
        }
    }

    _insertRecursive(node, val) {
        if (val < node.val) {
            if (node.left) {
                this._insertRecursive(node.left, val)
            } else {
                node.left = new Node(val);
            }
        } else {
            if (node.right) {
                this._insertRecursive(node.right, val);
            } else {
                node.right = new Node(val);
            }
        }
    }

    inorder(cb) {
        this._inorderIterative(this.root, cb);
    }

    _inorderIterative(node, cb) {
        if (!node) {
            return;
        }

        const stack = [];
        let current = node;

        while (stack.length > 0 || current) {
            while (current) {
                stack.push(current);
                current = current.left;
            }

            current = stack.pop();

            cb(current.val);

            current = current.right;
        }
    }

    _inorderRecursive(node, cb) {
        if (node.left) {
            this._inorderRecursive(node.left, cb);
        }

        cb(node.val);

        if (node.right) {
            this._inorderRecursive(node.right, cb);
        }
    }

    preorder(cb) {
        this._preorderIterative(this.root, cb);
    }

    _preorderIterative(node, cb) {
        const stack = [];
        let current = node;

        while(stack.length > 0 || current) {
            cb(current.val);

            if (current.right) {
                stack.push(current.right);
            }

            if (current.left) {
                stack.push(current.left);
            }

            current = stack.pop();
        }
    }

    _preorderRecursive(node, cb) {
        cb(node.val);

        if (node.left) {
            this._preorderRecursive(node.left, cb);
        }

        if (node.right) {
            this._preorderRecursive(node.right, cb);
        }
    }

    postorder(cb) {

    }

    find(val) { }
    remove(val) { }

    findMin() {
        return this._findMinIterative();
    }

    _findMinIterative() {
        let current = this.root;
        while (true) {
            if (!current.left) {
                return current.val;
            }

            current = current.left;
        }
    }

    _findMinRecursive(node) {
        if (!node.left) {
            return node.val;
        }

        return this._findMinRecursive(node.left);
    }

    findMax() { }
    isBalanced() { }
    getDiameter() { }
    getHeight() { }
    lowestCommonaAncestor() { }
}

class Node {
    constructor(val) {
        this.val = val;
        this.left = null;
        this.right = null;
    }
}


module.exports = BinarySearchTree;
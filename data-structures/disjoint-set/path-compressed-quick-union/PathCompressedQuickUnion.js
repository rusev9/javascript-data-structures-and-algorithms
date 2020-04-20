const QuickUnion = require("../quick-union/QuickUnion");

class PathCompressedQuickUnion extends QuickUnion {
    constructor(nodes) {
        super(nodes);
        this.height = new Array(nodes.length).fill(0);
    }

    union(id1, id2) {
        if (this.IDsToNodesMap.id1 || this.IDsToNodesMap.id2) {
            throw 'passed ID does not exist!';
        }

        const id1Root = this._getRoot(id1);
        const id2Root = this._getRoot(id2);

        if (this.height[id1Root] < this.height[id2Root]) {
            this.IDsToNodesMap[id1Root].root = id2Root;
            this.height[id1Root + 1];
        } else {
            this.IDsToNodesMap[id2Root].root = id1Root;
            this.height[id2Root + 1];
        }
    }

    addNode(node) {
        super.addNode(node);
        this.height[node.id] = 0;
    }

    _getRoot(id) {
        while (id !== this.IDsToNodesMap[id].root) {
            // Path compression
            const parentRoot = this.IDsToNodesMap[
                this.IDsToNodesMap[id].root
            ].root;
            this.IDsToNodesMap[id].root = parentRoot;

            id = this.IDsToNodesMap[id].root;
        }

        return id;
    }
}

module.exports = PathCompressedQuickUnion;
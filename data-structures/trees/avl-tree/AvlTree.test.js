const AvlTree = require("./AvlTree");
const { insertMockValues } = require("../../../unit-test-utils/treeUnitTestUtils");

describe("AvlTree", () => {
    let tree;

    beforeEach(() => {
        tree = new AvlTree();
    });

    describe("Avl Tree traversal", () => {

        // reusable abstraction to test tree traversals without violating encapsulation
        const generateTraversalTest = (procedure, valuesToInsert, assertionResult) => {
            it(`should execute the callback for each value ${procedure}`, () => {
                const result = [];
                const mockCallback = (arr) => (val) => arr.push(val);
                const curriedCallbackMock = mockCallback(result);
                insertMockValues(tree, valuesToInsert);

                tree[procedure](curriedCallbackMock);
                expect(result).toEqual(assertionResult);
            });
        }

        // right rotation in root
        generateTraversalTest("inorder", [3, 2, 1], [1, 2, 3]);
        // right rotation in subtree
        generateTraversalTest("inorder", [5, 2, 10, 1, 3, 0], [0, 1, 2, 3, 5, 10]);
        // left + right rotations
        generateTraversalTest("inorder", [5, 2, 6, 1, 3, 4], [1, 2, 3, 4, 5, 6]);

        // right rotation
        generateTraversalTest("preorder", [3, 2, 1], [2, 1, 3]);
        // right rotation in subtree
        generateTraversalTest("preorder", [1, 0, 5, 4, 3], [1, 0, 4, 3, 5]);
        // right rotation in subtree
        generateTraversalTest("preorder", [5, 2, 10, 1, 3, 0], [2, 1, 0, 5, 3, 10]);
        // right + left rotations
        generateTraversalTest("preorder", [1, 0, 6, 7, 4, 3], [4, 1, 0, 3, 6, 7]);
        // right + left rotations
        generateTraversalTest("preorder", [1, 0, 6, 7, 4, 5], [4, 1, 0, 6, 5, 7]);
        // left + right rotations
        generateTraversalTest("preorder", [5, 2, 6, 1, 3, 4], [3, 2, 1, 5, 4, 6]);

        // right rotation
        generateTraversalTest("postorder", [3, 2, 1], [1, 3, 2]);
        // right rotation in subtree
        generateTraversalTest("postorder", [1, 0, 5, 4, 3], [0, 3, 5, 4, 1]);
        // right + left rotations
        generateTraversalTest("postorder", [1, 0, 6, 7, 4, 3], [0, 3, 1, 7, 6, 4]);
        // right + left rotations
        generateTraversalTest("postorder", [1, 0, 6, 7, 4, 5], [0, 1, 5, 7, 6, 4]);
        // right rotation
        generateTraversalTest("postorder", [5, 2, 10, 1, 3, 0], [0, 1, 3, 10, 5, 2]);
        // left + right rotations
        generateTraversalTest("postorder", [5, 2, 6, 1, 3, 4], [1, 2, 4, 6, 5, 3]);
    });

    describe("remove procedure", () => {
        it("should delete the specified node", () => {
            insertMockValues(tree, [5, 2, 10, 1, 3, 0]);
            tree.remove(2);
    
            expect(tree.find(2)).toBe(null);
        });

        it("should delete the specified node", () => {
            insertMockValues(tree, [1, 0, 6, 7, 4, 5]);
            tree.remove(7);
    
            expect(tree.find(7)).toBe(null);
        });

        it("should delete the specified node and re-balance the tree", () => {
            insertMockValues(tree, [5, 2, 10, 1, 3]);
            tree.remove(10);
    
            const result = [];
            const mockCallback = (arr) => (val) => arr.push(val);
            const curriedCallbackMock = mockCallback(result);
            tree.preorder(curriedCallbackMock);

            expect(tree.find(10)).toBe(null);
            expect(result).toEqual([2, 1, 5, 3]);
        });
    });
});
const BinarySearchTree = require("./BinarySearchTree");

describe("BinarySearchTree", () => {
    let bst;

    beforeEach(() => {
        bst = new BinarySearchTree();
    });

    it("should insert and find the min value", () => {
        const values = [7, 5, 2, 8, 1, 3];

        values.forEach(val => {
            bst.insert(val);
        });

        expect(bst.findMin()).toBe(1);
    });

    const traversalUnitTestFactory = (procedure, assertionResult) => {
        it(`should execute the callback for each value preorder ${procedure}`, () => {
            const result = [];
            const mockCallback = function (arr) {
                return function (val) {
                    arr.push(val);
                }
            }
            const curriedCallbackMock = mockCallback(result);
            const values = [25, 15, 50, 10, 22, 35, 70, 4, 12, 18, 24, 31, 44, 66, 90]
            values.forEach(val => {
                bst.insert(val);
            });
    
            bst[procedure](curriedCallbackMock);
            expect(result).toEqual(assertionResult);
        });
    }

    traversalUnitTestFactory("inorder", [4, 10, 12, 15, 18, 22, 24, 25, 31, 35, 44, 50, 66, 70, 90]);
    traversalUnitTestFactory("preorder", [25, 15, 10, 4, 12, 22, 18, 24, 50, 35, 31, 44, 70, 66, 90]);
    traversalUnitTestFactory("postorder", [4, 12, 10, 18, 24, 22, 15, 31, 44, 35, 66, 90, 70, 50, 25]);
});
function bubbleSort(arr, cmp) {
    if (typeof cmp !== "function") {
        cmp = (a, b) => a - b;
    }

    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (cmp(arr[i], arr[j]) > 0) {
                swap(arr, i, j);
            }
        }
    }

    return arr;
}

function swap(arr, i, j) {
    const temp = arr[i];

    arr[i] = arr[j];
    arr[j] = temp;
}

module.exports = bubbleSort;
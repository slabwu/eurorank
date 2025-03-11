
console.log(mergeSort([1, 5, 6, 9, 8, 4]));
console.log(shuffle([1, 5, 6, 9, 8, 4]));

function mergeSort(array) {
    if (array.length === 1) return array;
    let left = array;
    let right = left.splice(Math.ceil(array.length / 2), Math.floor(array.length / 2));
    let length = left.length + right.length;    

    left = mergeSort(left);
    right = mergeSort(right);

    let output = [];
    for (let i = 0; i < length - 1; i++) {
        if (choose(left[0], right[0])) {
            output.push(left.shift());
            if (left.length === 0) {
                output = output.concat(right);
                return output;
            }
        } else {
            output.push(right.shift());
            if (right.length === 0) {
                output = output.concat(left);
                return output;
            }
        }
    }
}

function shuffle(array) {
    array.forEach ((item, index) => {
        let newIndex = Math.floor(Math.random() * array.length);
        let temp = array[newIndex];
        array[newIndex] = item;
        array[index] = temp;
    });

    return array;
}

function choose(left, right) {
    let preference = prompt(`Which do you prefer - 1:${left} or 2:${right}`);
    return (preference == 1) ? true : false;
}
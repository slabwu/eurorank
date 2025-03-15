import { showOptions, renderProgress } from './render.js';
import { listLength } from './fetch.js';

let leftBtn = document.querySelector(".left button");
let rightBtn = document.querySelector(".right button");
let choice = 0;
export const sharedState = { stepsDone: 0 };

export async function mergeSort(array) {
    if (array.length === 1) return array;
    let left = array;
    let right = left.splice(Math.ceil(array.length / 2), Math.floor(array.length / 2));
    let length = left.length + right.length;    

    left = await mergeSort(left);
    right = await mergeSort(right);

    let output = [];
    for (let i = 0; i < length - 1; i++) {
        let outcome = await choose(left[0], right[0]);
        sharedState.stepsDone++;
        let percent =  Math.round(sharedState.stepsDone * 100 / getSteps(listLength));
        renderProgress(percent);
        
        if (outcome) {
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

export function shuffle(array) {
    array.forEach ((item, index) => {
        let newIndex = Math.floor(Math.random() * array.length);
        let temp = array[newIndex];
        array[newIndex] = item;
        array[index] = temp;
    });

    return array;
}

function choose(left, right) {
    return new Promise(resolve => {
        showOptions(left, 1);
        showOptions(right, 2);

        leftBtn.disabled = false;
        rightBtn.disabled = false;

        leftBtn.onclick = () => {
            choice = 1;
            leftBtn.disabled = true;
            rightBtn.disabled = true;
            resolve(true);
        };

        rightBtn.onclick = () => {
            choice = 2;
            leftBtn.disabled = true;
            rightBtn.disabled = true;
            resolve(false);
        };
    });
}

function getSteps(length) {
    let n = length;
    return Math.ceil(n * Math.log2(n) - 2 ** Math.log2(n) + 2 - 0.2645 * n);
}
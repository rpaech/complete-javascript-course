'use strict';

// let v = false;
// console.log(typeof(v));

// function noReturn () {
//     let p = 1;
// }

// v = noReturn();
// console.log(typeof(v));

// const myFunc = function (birthYear) {return `You were born in ${birthYear}`}
// console.log(typeof(myFunc), myFunc(1975));

// console.log(typeof(noReturn));

// const myFunc2 = (val1, val2) => {
//     return 10 - val1 + val2;
// }
// console.log(myFunc2(5, 2));

const arr1 = [1, 'foo', 3];
// const arr2 = new Array(1, 2, 3);
// console.log(arr1, arr2, arr1 == arr2, arr1 === arr2);
// arr1.push("foo");
// console.log(arr1);
// arr1.pop();
// console.log(arr1);
// arr1.shift();
// console.log(arr1);
// arr1.unshift(2);
// console.log(arr1);
// console.log(arr1.includes('bob'));
// arr1.forEach(v => console.log(v));

// console.log("---");

// for (let i = arr1.length - 1; i >=0; i--) {
//     console.log(arr1[i]);
// }

// let i = 0;
// while (true) {
//     i++;
//     console.log(i);
//     if (i > 5) break;
// }

// console.log("---");

// function rollDie() {
//     return Math.trunc(Math.random() * 6) + 1;
// }

// let result;
// let count = 0;
// do {
//     result = rollDie();
//     console.log(`You rolled a ${result}`);
//     count++;
// } while (result !== 6)
// console.log(`You took ${count} rolls to get a ${result}`);

let bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
let tips = [];
let totals = [];

function calcTip (billValue) {
    return billValue * (50 <= billValue && billValue <= 300 ? 0.15 : 0.2);
}

bills.forEach(v => tips.push(calcTip(v)))

for (let i = 0; i < bills.length; i++) {
    tips.push(calcTip(bills[i]))
    totals.push(bills[i] + tips[i]);
}

console.log(bills);
console.log(tips);
console.log(totals);

function calcAverage (arr) {
    let sum = 0;
    arr.forEach(e => sum += e);
    return sum / arr.length;
}

console.log(calcAverage(totals));
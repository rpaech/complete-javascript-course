// let js = true;
// console.log(40 + 8 + 23 - 10);

// let firstName = "Robert";

// console.log(firstName);

// const PI = 3.1415;
// PI += 1;

// let firstString = "Robert's";
// let secondString = 'Here we are using "quotes" in our string';

let massMark = 78;
let heightMark = 1.69;
let massJohn = 92;
let heightJohn = 1.95;

function calcBMI (mass, height) {
    return (mass / height * height);
}

let BMIMark = calcBMI(massMark, heightMark);
let BMIJohn = calcBMI(massJohn, heightJohn);
let markHigherBMI = BMIMark > BMIJohn;

console.log(BMIMark, BMIJohn, markHigherBMI);
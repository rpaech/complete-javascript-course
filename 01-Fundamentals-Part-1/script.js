
let js = true;
console.log(40 + 8 + 23 - 10);

let firstName = "Robert";

console.log(firstName);

const PI = 3.1415;
// PI += 1;

let firstString = "Robert's";
let secondString = 'Here we are using "quotes" in our string';


// challenge 1

/*
let massMark = 95;
let heightMark = 1.88;
let massJohn = 85;
let heightJohn = 1.76;

function calcBMI (mass, height) {
    return mass / (height * height);
}

let BMIMark = calcBMI(massMark, heightMark);
let BMIJohn = calcBMI(massJohn, heightJohn);
let markHigherBMI = BMIMark > BMIJohn;

console.log(BMIMark, BMIJohn, markHigherBMI);
*/

let templateLiteral = `I'm ${firstName}`;
console.log(templateLiteral);

let multiLineString = 
`This is a string that
spans multiple lines.
I wonder if the tab is
retained?`;

console.log(multiLineString);

if (js) {
    console.log(`foo`);
} else {
    console.log('bar');
}

const val1 = 18;
const val2 = 22;
const str1 = "foo";
const str2 = "bar";

if (val1 == val2) console.log(true);

typeof("foo");
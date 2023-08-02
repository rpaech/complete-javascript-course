console.log("Importing module");

import add, { cart } from "./shoppingCart.js";
add("pizza", 2);
add("bread", 5);
add("apples", 4);

console.log(cart);

/////////////////////////////////////////////////////////

import cloneDeep from "lodash-es";

const state = {
  cart: [
    { product: "bread", quantity: 5 },
    { product: "pizza", quantity: 5 },
  ],
  user: { loggedIn: true },
};
const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;
console.log(stateClone);

console.log(stateDeepClone);

if (module.hot) {
  module.hot.accept();
}

/////////////////////////////////////////////////////////

class Person {
  #greeting = "Hey";
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }
}
const jonas = new Person("Jonas");

console.log("Jonus" ?? null);

/////////////////////////////////////////////////////////

import "core-js/stable";
// import 'core-js/stable/array/find';
// import 'core-js/stable/promise';

// Polifilling async functions
import "regenerator-runtime/runtime";

"use strict";

const currYear = new Date().getFullYear();
console.log(currYear);

// Constructor functions

function Person(firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
}

const bob = new Person("Robert", 1975);
console.log(bob);

console.log("bob instanceof Person", bob instanceof Person);

// Prototypes

Person.prototype.calcAge = function () {
  return new Date().getFullYear() - this.birthYear;
};

console.log(bob.firstName, bob.calcAge());

// Prototype chain

console.log(
  bob.__proto__,
  bob.__proto__.__proto__,
  bob.__proto__.__proto__.__proto__
);

console.log(Person.prototype.constructor);

const arr = [1, 5, 10];
console.log(arr.__proto__);

// ES6 Classes
// Getters and setters

class PersonCl {
  constructor(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
    this._nickName = firstName + "o";
  }

  calcAge() {
    return new Date().getFullYear() - this.birthYear;
  }

  get age() {
    return new Date().getFullYear() - this.birthYear;
  }

  get nickName() {
    return this._nickName;
  }

  set nickName(name) {
    this._nickName = name;
  }
}

const jack = new PersonCl("Jack", 1982);
console.log(jack);
console.log(jack.firstName, jack.calcAge(), jack.age);
console.log(jack.nickName);
jack.nickName = "Gruber";
console.log(jack.nickName);
// jack.age = 45;

const jane = new PersonCl("Jane", 1901);
console.log(jane);

// Private fields and methods

class Account {
  // 1) Public fields (instances)
  locale = navigator.language;

  // 2) Private fields (instances)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;

    // Protected property
    // this._movements = [];
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // 3) Public methods

  // Public interface
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    // if (this.#approveLoan(val)) {
    if (this.#approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
      return this;
    }
  }

  static helper() {
    console.log("Helper");
  }

  // 4) Private methods

  #approveLoan(val) {
    // _approveLoan(val) {
    return true;
  }
}

const acc1 = new Account("Jonas", "EUR", 1111);

// acc1._movements.push(250);
// acc1._movements.push(-140);
// acc1.approveLoan(1000);

acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1.getMovements());
console.log(acc1);
Account.helper();

// console.log(acc1.#movements);
// console.log(acc1.#pin);
// console.log(acc1.#approveLoan(100));

// Chaining
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements());

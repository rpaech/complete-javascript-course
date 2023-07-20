"use strict";

const person = {
  firstName: "Rob",
  lastName: "Paech",
  birthYear: 1975,

  calcAge: function () {
    console.log(this);
    console.log(2023 - this.birthYear);

    const isMellenial = function () {
      console.log(this);
      console.log(this.birthYear >= 1981 && this.birthYear <= 1996);
    };

    let jack = {
      firstName: "Jack",
      birthYear: 1985,
      isMellenial: isMellenial,
    };
    jack.isMellenial();
  },

  greet: () => {
    console.log(this);
    console.log(`Hey ${this.firstName}`);
  },
};

const foo = {
  calcAge: person.calcAge,
  greet: person.greet,
};

var firstName = "Nemo";
person.calcAge();

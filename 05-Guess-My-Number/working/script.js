"use strict";

// console.log(document.querySelector(".message").textContent);
// document.querySelector(".message").textContent = "Foobar!";
// console.log(document.querySelector(".message").textContent);
// document.querySelector(".guess").value = 23;

// document.querySelector(".check").addEventListener("click", function () {
//   console.log(document.querySelector(".guess").value);
// });

document.querySelector(".check").addEventListener("click", () => {
  const guess = Number(document.querySelector(".guess").value);
  console.log(guess, typeof guess);

  if (!guess) {
    document.querySelector(".message").textContent = "Not a number!";
  } else {
    document.querySelector(".message").textContent = "Try again!";
  }
});

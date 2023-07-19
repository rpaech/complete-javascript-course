"use strict";

const MAX_SCORE = 20;

let score;
let highScore = 0;
let secretNumber;

function resetGame() {
  score = MAX_SCORE;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".message").textContent = "Start guessing...";
  document.querySelector(".number").textContent = "?";
  document.querySelector(".number").style.width = "15rem";
  document.querySelector(".score").textContent = score;
  document.querySelector(".guess").value = "";
  document.querySelector(".check").style.visibility = "visible";
}

function printMessage(message) {
  document.querySelector(".message").textContent = message;
}

function decreaseScore() {
  score--;
  document.querySelector(".score").textContent = score;
}

function checkGuess() {
  const guess = Number(document.querySelector(".guess").value);

  if (!guess) {
    printMessage("❓ Um... nope!");
    decreaseScore();
  } else if (guess > secretNumber) {
    printMessage("⬇️ Nope, lower!");
    decreaseScore();
  } else if (guess < secretNumber) {
    printMessage("⬆️ Nope, higher!");
    decreaseScore();
  } else {
    printMessage("🎉 Correct!");
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").textContent = secretNumber;
    document.querySelector(".number").style.width = "30rem";
    document.querySelector(".check").style.visibility = "hidden";
    if (score > highScore) {
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    }
  }

  if (score == 0) {
    printMessage("💥 You lose!");
    document.querySelector(".check").style.visibility = "hidden";
  }
}

document.querySelector(".check").addEventListener("click", checkGuess);
document.querySelector(".again").addEventListener("click", resetGame);

resetGame();

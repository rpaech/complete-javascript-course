"use strict";

const elmtTotalScores = [
  document.getElementById("score1"),
  document.getElementById("score2"),
];

const elmtCurrentScores = [
  document.getElementById("current1"),
  document.getElementById("current2"),
];

const elmtPlayers = [
  document.querySelector(".player1"),
  document.querySelector(".player2"),
];

const elmtEndGameModal = document.querySelector(".end-game-modal");
const elmtEndGamePara = document.querySelector(".end-game-para");
const elmtEndGameOverlay = document.querySelector(".end-game-overlay");

const elmtDice = document.querySelector(".dice");

const btnNew = document.querySelector(".btn-new");
const btnRoll = document.querySelector(".btn-roll");
const btnHold = document.querySelector(".btn-hold");

const btnCloseEndGameModal = document.querySelector(".close-end-game-modal");

const scoreToWin = 100;

let idxPlayer;
let currentScore;
let totalScores;

function resetGame() {
  for (let i = 0; i < 2; i++) {
    elmtTotalScores[i].textContent = 0;
    elmtCurrentScores[i].textContent = 0;
  }
  elmtDice.classList.add("hidden");
  idxPlayer = 0;
  currentScore = 0;
  totalScores = [0, 0];
  btnRoll.classList.remove("hidden");
  btnHold.classList.remove("hidden");
  elmtPlayers[idxPlayer].classList.add("player-active");
  elmtPlayers[idxPlayer + 1].classList.remove("player-active");
}

function resetCurrentScore() {
  currentScore = 0;
  elmtCurrentScores[idxPlayer].textContent = 0;
}

function switchPlayer() {
  resetCurrentScore();
  elmtPlayers[idxPlayer].classList.remove("player-active");
  idxPlayer = idxPlayer == 0 ? 1 : 0;
  elmtPlayers[idxPlayer].classList.add("player-active");
}

function hold() {
  totalScores[idxPlayer] += currentScore;
  elmtTotalScores[idxPlayer].textContent = totalScores[idxPlayer];
  resetCurrentScore();
  if (totalScores[idxPlayer] >= scoreToWin) {
    endGame();
  } else {
    switchPlayer();
  }
}

function showEndGameModal() {
  elmtEndGameModal.classList.remove("hidden");
  elmtEndGameOverlay.classList.remove("hidden");
}

function hideEndGameModal() {
  elmtEndGameModal.classList.add("hidden");
  elmtEndGameOverlay.classList.add("hidden");
}

function endGame() {
  btnRoll.classList.add("hidden");
  btnHold.classList.add("hidden");
  elmtDice.classList.add("hidden");
  elmtEndGamePara.textContent = `Player ${idxPlayer + 1} Wins`;
  showEndGameModal();
}

function rollDice() {
  const rollResult = Math.trunc(Math.random() * 6) + 1;

  elmtDice.src = `dice-${rollResult}.png`;
  elmtDice.classList.remove("hidden");

  if (rollResult !== 1) {
    currentScore += rollResult;
    elmtCurrentScores[idxPlayer].textContent = currentScore;
  } else {
    switchPlayer();
  }
}

btnRoll.addEventListener("click", rollDice);
btnHold.addEventListener("click", hold);
btnNew.addEventListener("click", resetGame);
btnCloseEndGameModal.addEventListener("click", hideEndGameModal);
elmtEndGameOverlay.addEventListener("click", hideEndGameModal);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !elmtEndGameModal.classList.contains("hidden"))
    hideEndGameModal();
});

resetGame();

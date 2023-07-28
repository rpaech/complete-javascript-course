"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const header = document.querySelector(".header");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

/*
// COOKIE MESSAGE
const cookieMessage = document.createElement("div");
cookieMessage.classList.add("cookie-message");
cookieMessage.textContent =
  "We use cookies, just so we can show you an annoying message.";

const button = document.createElement("button");
button.classList.add("btn", "btn--close-cookie");
button.textContent = "Got it!";

cookieMessage.insertAdjacentElement("beforeend", button);

header.append(cookieMessage);

button.addEventListener("click", () => cookieMessage.remove());
*/

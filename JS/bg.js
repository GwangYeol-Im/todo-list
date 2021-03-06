"use strict";

const body = document.querySelector("body");

const IMG_NUMBER = 6;

function paintImage(imgNumber) {
  const image = document.createElement("img");
  image.src = `./images/${imgNumber + 1}.jpg`;
  image.classList.add("background");
  body.appendChild(image);
}

function genRandom() {
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();

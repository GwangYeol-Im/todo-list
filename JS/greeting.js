"use strict";

const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings"),
  formDisplay = document.querySelector(".toDoForm"),
  question = document.querySelector(".js-question"),
  weatherDp = document.querySelector(".weather"),
  resetDp = document.querySelector(".js-reset"),
  greetAlert = document.querySelector(".js-greetAlert");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function toDoFormDisplay() {
  formDisplay.classList.remove("toDoForm");
  formDisplay.classList.add("showing");
}

function weatherDisplay() {
  weatherDp.classList.remove("weather");
  weatherDp.classList.add("showing");
}

function resetDisplay() {
  resetDp.classList.remove("reset");
  resetDp.classList.add("showing");
}

function hideQuestion() {
  question.classList.add("question-none");
}

function greetingAlert() {
  greetAlert.classList.add("showing");
}

function removeGreetAlert() {
  greetAlert.classList.remove("showing");
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;
  if (currentValue.length === 0) {
    greetingAlert();
  } else {
    removeGreetAlert();
    paintGreeting(currentValue);
    saveName(currentValue);
    toDoFormDisplay();
    hideQuestion();
    weatherDisplay();
    resetDisplay();
    input.value = "";
  }
}

function askForName() {
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  const date = new Date();
  const hour = date.getHours();

  if (hour < 6) {
    greeting.innerText = `Good night, ${text}.`;
  } else if (hour < 12) {
    greeting.innerText = `Good morning, ${text}.`;
  } else if (hour < 18) {
    greeting.innerText = `Good afternoon, ${text}.`;
  } else {
    greeting.innerText = `Good evening, ${text}.`;
  }
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
    toDoFormDisplay();
    weatherDisplay();
    hideQuestion();
    resetDisplay();
  }
}

function init() {
  loadName();
}

init();

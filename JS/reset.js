"use strict";

const reset = document.querySelector(".js-reset"),
  greetings = document.querySelector(".js-greetings"),
  hideToDo = document.querySelector(".js-toDoForm"),
  displayQ = document.querySelector(".js-question"),
  dpForm = document.querySelector(".js-form"),
  doList = document.querySelector(".js-toDoList");

function hideGreeting() {
  greetings.classList.remove("showing");
}

function hideToDoForm() {
  hideToDo.classList.remove("showing");
}

function displayQuestion() {
  displayQ.classList.remove("question-none");
}

function displayForm() {
  dpForm.classList.add("showing");
}

function removeToDo() {
  const toDoList = doList.querySelectorAll("li");
  toDoList.forEach(node => doList.removeChild(node));
}

function entireReset() {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("toDos");
  hideGreeting();
  hideToDoForm();
  displayQuestion();
  displayForm();
  removeToDo();
  removeToDoAlert();
}

function init() {
  reset.addEventListener("click", entireReset);
}

init();

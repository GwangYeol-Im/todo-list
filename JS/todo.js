"use strict";

const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList"),
  clock = document.querySelector(".js-clock"),
  fullAlert = document.querySelector(".toDoAlert"),
  reset = document.querySelector(".js-reset"),
  greetings = document.querySelector(".js-greetings"),
  displayQ = document.querySelector(".js-question"),
  dpForm = document.querySelector(".js-form"),
  dpWeather = document.querySelector(".weather");

const TODOS_LS = "toDos";

let toDos = [];

function handleBtn(event) {
  const target = event.target.parentNode;
  const cleanToDos = toDos.filter(toDo => toDo.id !== parseInt(target.id));
  fadeout(target);
  toDos = cleanToDos;
  saveToDos();
  addToDoForm();
  removeToDoAlert();
}

function fadeout(element) {
  let op = 1;
  const timer = setInterval(decOpacity, 50);
  function decOpacity() {
    if (op <= 0.1) {
      clearInterval(timer);
      toDoList.removeChild(element);
    }
    op -= 0.1;
    element.style.opacity = op;
  }
}

function saveToDos() {
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  const delBtn = document.createElement("button");
  const span = document.createElement("span");
  const newId = toDos.length + 1;
  delBtn.innerHTML = "✔️";
  delBtn.addEventListener("click", handleBtn);
  span.innerText = text;
  li.classList.add("toDo");
  li.appendChild(delBtn);
  li.appendChild(span);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  saveToDos();
}

function removeToDoAlert() {
  fullAlert.classList.remove("toDoAlert-on");
  fullAlert.classList.add("toDoAlert");
}

function addToDoForm() {
  toDoForm.classList.add("showing");
}

function fullToDoAlert() {
  toDoForm.classList.remove("showing");
  fullAlert.classList.remove("toDoAlert");
  fullAlert.classList.add("toDoAlert-on");
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  if (toDos.length < 5) {
    paintToDo(currentValue);
  } else {
    paintToDo(currentValue);
    fullToDoAlert();
  }
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);

  if (loadedToDos !== null) {
    const toDoArr = JSON.parse(loadedToDos);
    toDoArr.forEach(toDo => paintToDo(toDo.text));
  }

  toDos.length === 6 ? fullToDoAlert() : null;
}

// reset button logic.
function hideGreeting() {
  greetings.classList.remove("showing");
}

function displayQuestion() {
  displayQ.classList.remove("question-none");
}

function displayForm() {
  dpForm.classList.add("showing");
}

function removeToDo() {
  const list = toDoList.querySelectorAll("li");
  list.forEach(node => toDoList.removeChild(node));
}

function removeWeather() {
  dpWeather.classList.remove("showing");
  dpWeather.classList.add("weather");
}

function removeReset() {
  reset.classList.remove("showing");
  reset.classList.add("reset");
}

function entireReset() {
  localStorage.removeItem("currentUser");
  localStorage.removeItem("toDos");
  hideGreeting();
  toDoForm.classList.remove("showing");
  displayQuestion();
  displayForm();
  removeToDo();
  removeToDoAlert();
  removeWeather();
  removeReset();
  toDos = [];
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
  reset.addEventListener("click", entireReset);
}

init();

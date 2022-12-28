const form = document.getElementById("form-task");

const input = document.getElementById("input");

const toDoList = document.querySelector(".to-do-list");

const emptyListNotification = document.querySelector(".no-task");

const nonEmptyList = () => toDoList.childElementCount > 0;

const createHtmlElements = (tag, className) => {
  const element = document.createElement(tag);
  element.classList.add(className);

  return element;
};

const handleSubmit = (event) => {
  event.preventDefault();
  const inputTaskValue = input.value;

  if (inputTaskValue.trim() === "") {
    input.classList.add("empty");
    return setTimeout(() => input.classList.remove("empty"), 2000);
  }

  const card = createHtmlElements("div", "card");
  const checkButton = createHtmlElements("button", "check-button");
  const trashButton = createHtmlElements("button", "trash-button");
  const trashButtonImage = createHtmlElements("img", "trash-button-image");
  const checkButtonImage = createHtmlElements("img", "check-button-image");
  const task = createHtmlElements("p", "task");

  checkButtonImage.setAttribute("src", "images/check.png");
  trashButtonImage.setAttribute("src", "images/trash.png");

  checkButton.appendChild(checkButtonImage);
  trashButton.appendChild(trashButtonImage);

  card.appendChild(checkButton);
  card.appendChild(task);
  card.appendChild(trashButton);

  task.textContent = inputTaskValue;

  toDoList.appendChild(card);

  input.value = "";

  card.onclick = () => handleClickCompleteTask(checkButton, task);

  trashButton.onclick = () => handleClickDeleteTask(card);

  if (nonEmptyList()) return (emptyListNotification.style.display = "none");
};

const handleClickCompleteTask = (taskCompletedButton, task) => {
  taskCompletedButton.classList.toggle("completed-task");
  if (taskCompletedButton.className.includes("completed-task")) {
    task.style.textDecoration = "line-through";
  } else {
    task.style.textDecoration = "none";
  }
};

const handleClickDeleteTask = (card) => {
  card.classList.add("dismiss");

  setTimeout(() => {
    toDoList.removeChild(card);
    if (!nonEmptyList()) return (emptyListNotification.style.display = "block");
  }, 250);
};

form.addEventListener("submit", (e) => handleSubmit(e));

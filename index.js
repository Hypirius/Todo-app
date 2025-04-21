const mainForm = document.querySelector("form");
const formSubmit = document.getElementById("submit");
const formInput = document.getElementById("main-input");
const undoneTask = document.getElementById("undone-tasks");
const completedTask = document.getElementById("completed-tasks");
const quoteContainer = document.getElementById("Quotes");

//Event listeners and Async code.

formSubmit.addEventListener("click", (form) => {
  form.preventDefault();
  if (undoneTask.children.length < 10 && validateInput(formInput)) {
    createTasks("div", "input", "li");
  } else if (!validateInput(formInput)) {
    alert(
      "Tasks must be greater than 5 characters and must not contain only numbers"
    );
  } else {
    alert("Complete your tasks first. (Max 10 tasks)");
  }
});

document.getElementById("Tasks").addEventListener("click", (clickObject) => {
  if (clickObject.target.matches(".check-box")) {
    updateTasks(clickObject.target);
  } else if (clickObject.target.matches("#Capa_1")) {
    cancelTasks(clickObject);
  }
});

//Default on website load to perform some expected operations

sustainTasks();
displayDefaultMessage();

function cancelTasks(taskContainer) {
  const container = taskContainer.target.parentElement.parentElement;
  localStorage.removeItem(container.children[1].innerText);
  container.remove();
}

function validateInput(input) {
  if (input.value.length > 5 && isNaN(input.value)) {
    return true;
  }
  return false;
}

function cancelContainer() {
  const cancelContainer = createTag("div", "cancel-container");
  cancelContainer.innerHTML =
    '<?xml version="1.0" ?><svg data-name="Capa 1" id="Capa_1" viewBox="0 0 20 19.84" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><path d="M10.17,10l3.89-3.89a.37.37,0,1,0-.53-.53L9.64,9.43,5.75,5.54a.37.37,0,1,0-.53.53L9.11,10,5.22,13.85a.37.37,0,0,0,0,.53.34.34,0,0,0,.26.11.36.36,0,0,0,.27-.11l3.89-3.89,3.89,3.89a.34.34,0,0,0,.26.11.35.35,0,0,0,.27-.11.37.37,0,0,0,0-.53Z"/></svg>';
  return cancelContainer;
}

cancelContainer();

function createTag(tag, className) {
  const container = document.createElement(tag);
  if (className) {
    container.classList.add(className);
  }
  return container;
}

function displayDefaultMessage() {
  const displayElement = document.querySelector(".task-message");
  if (
    undoneTask.childElementCount > 1 &&
    document.querySelector(".task-message")
  ) {
    displayElement.remove();
  }
}

function createTasks(parentContainer, checkerBox, taskTextHolder) {
  const parentDiv = createTag(parentContainer, "parent-container");

  const checkBox = createTag(checkerBox, "check-box");
  checkBox.setAttribute("type", "checkbox");

  const listItem = createTag(taskTextHolder, "list-item");
  listItem.innerText = formInput.value;

  parentDiv.append(checkBox, listItem, cancelContainer());
  undoneTask.append(parentDiv);

  displayDefaultMessage();

  persistLocalStorage(listItem, parentDiv);
}

function updateTasks(Target) {
  const parentContainer = Target.parentElement;
  parentContainer.remove();

  if (Target.checked) {
    Target.setAttribute("data", "checked");
    completedTask.append(parentContainer);
  } else {
    Target.removeAttribute("data");
    undoneTask.append(parentContainer);
  }
  persistLocalStorage(Target.nextElementSibling, parentContainer);
  displayDefaultMessage();
}

function persistLocalStorage(key, value) {
  value.children[0].setAttribute("order", localStorage.length);
  localStorage.setItem(`${key.innerText}`, `${value.innerHTML}`);
}

function sustainTasks() {
  const localStorageArray = Object.values(localStorage).sort();
  localStorageArray.forEach((Item) => {
    const parentContainer = createTag("div", "parent-container");
    parentContainer.innerHTML = Item;

    if (parentContainer.children[0].getAttribute("data")) {
      parentContainer.children[0].checked = true;
      completedTask.append(parentContainer);
    } else {
      undoneTask.append(parentContainer);
    }
  });
}

// Quotes section

const url = "https://quotes-api12.p.rapidapi.com/quotes/random?type=success";
const options = {
  method: "GET",
  headers: {
    "x-rapidapi-key": "3f3709e531msh9b5f2a8c173537dp1737f8jsn0aaea90e28b1",
    "x-rapidapi-host": "quotes-api12.p.rapidapi.com",
  },
};

fetch(url, options)
  .then((res) => res.json())
  .then(function (resObject) {
    if (resObject.quote && resObject.author) {
      const quote = document.createElement("p");
      quote.innerText = resObject.quote;

      const addressContainer = createTag("address", "author");

      const author = document.createElement("a");
      author.setAttribute("rel", "author");
      author.innerText = resObject.author;

      addressContainer.append(author);
      quote.append(addressContainer);
      quoteContainer.append(quote);
    } else {
      const holder = createParentContainer("p");
      holder.innerText = "No quotes found.";

      quoteContainer.append(holder);
    }
  });

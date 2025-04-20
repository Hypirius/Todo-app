const mainForm = document.querySelector("form");
const formSubmit = document.getElementById("submit");
const formInput = document.getElementById("main-input");
const undoneTask = document.getElementById("undone-tasks");
const completedTask = document.getElementById("completed-tasks");
const quoteContainer = document.getElementById("Quotes");

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
  }
});

sustainTasks();
removeDefaultMessage();

function validateInput(input) {
  if (input.value.length > 5 && isNaN(input.value)) {
    return true;
  }
  return false;
}

function createParentContainer(parentContainer) {
  const parentDiv = document.createElement(parentContainer);
  return parentDiv;
}

function removeDefaultMessage() {
  if (
    undoneTask.childElementCount > 1 &&
    document.querySelector(".task-message")
  ) {
    const removedElement = document.querySelector(".task-message");
    removedElement.remove();
  }
}

function createTasks(parentContainer, checkerBox, taskTextHolder) {
  const parentDiv = createParentContainer(parentContainer);
  parentDiv.classList.add("parent-container");

  const checkBox = document.createElement(checkerBox);
  checkBox.setAttribute("type", "checkbox");
  checkBox.classList.add("check-box");

  const listItem = document.createElement(taskTextHolder);
  listItem.innerText = formInput.value;
  listItem.classList.add("list-item");

  const cancelTasks = document.createElement;

  parentDiv.append(checkBox, listItem);
  undoneTask.append(parentDiv);

  removeDefaultMessage();

  persistLocalStorage(listItem, parentDiv);
}

function updateTasks(Target) {
  const parentContainer = Target.parentElement;
  parentContainer.remove();

  if (Target.checked) {
    Target.setAttribute("data", "checked");
    persistLocalStorage(Target.nextElementSibling, parentContainer);
    completedTask.append(parentContainer);
  } else {
    Target.removeAttribute("data");
    persistLocalStorage(Target.nextElementSibling, parentContainer);
    undoneTask.append(parentContainer);
  }
}

function persistLocalStorage(key, value) {
  value.children[0].setAttribute("order", localStorage.length);
  localStorage.setItem(`${key.innerText}`, `${value.innerHTML}`);
}

function sustainTasks() {
  const localStorageArray = Object.values(localStorage).sort();
  localStorageArray.forEach((Item) => {
    const parentContainer = createParentContainer("div");
    parentContainer.classList.add("parent-container");
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

      const addressContainer = createParentContainer("p");
      addressContainer.classList.add("author");

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

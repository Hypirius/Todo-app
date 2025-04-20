const mainForm = document.querySelector("form");
const formSubmit = document.getElementById("submit");
const formInput = document.getElementById("main-input");
const undoneTask = document.getElementById("undone-tasks");
const completedTask = document.getElementById("completed-tasks");
const quoteContainer = document.getElementById("Quotes");

formSubmit.addEventListener("click", (form) => {
  form.preventDefault();
  if (undoneTask.children.length < 10) {
    createTasks("div", "input", "li");
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

function createParentContainer(parentContainer) {
  const parentDiv = document.createElement(parentContainer);
  parentDiv.classList.add("parent-container");
  return parentDiv;
}

function createTasks(parentContainer, checkerBox, taskTextHolder) {
  const parentDiv = createParentContainer(parentContainer);

  const checkBox = document.createElement(checkerBox);
  checkBox.setAttribute("type", "checkbox");
  checkBox.classList.add("check-box");

  const listItem = document.createElement(taskTextHolder);
  listItem.innerText = formInput.value;
  listItem.classList.add("list-item");

  const cancelTasks = document.createElement;

  parentDiv.append(checkBox, listItem);
  undoneTask.append(parentDiv);

  persistLocalStorage(listItem, parentDiv);
}

function updateTasks(Target) {
  const parentContainer = Target.parentElement;

  if (Target.checked) {
    parentContainer.remove();
    Target.setAttribute("data", "checked");
    persistLocalStorage(Target.nextElementSibling, parentContainer);
    completedTask.append(parentContainer);
  } else {
    parentContainer.remove();
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
  const localStorageArray = Object.values(localStorage);
  localStorageArray.sort();
  console.log(localStorageArray);
  localStorageArray.forEach((Item) => {
    const parentContainer = createParentContainer("div");
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
    const quote = document.createElement("p");
    quote.innerText = resObject.quote;

    const addressContainer = document.createElement("address");
    addressContainer.classList.add("author");

    const author = document.createElement("a");
    author.setAttribute("rel", "author");
    author.innerText = resObject.author;

    addressContainer.append(author);
    quote.append(addressContainer);
    quoteContainer.append(quote);
  });

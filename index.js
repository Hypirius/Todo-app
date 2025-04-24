//Functions for reusability

function createTag(tag, className) {
  const container = document.createElement(tag);
  if (className) {
    container.classList.add(className);
  }
  return container;
}

function persistLocalStorage(key, value) {
  value.children[0].setAttribute("order", localStorage.length);
  localStorage.setItem(`${key.innerText}`, `${value.innerHTML}`);
}

function displayDefaultMessage() {
  if (
    undoneTask.childElementCount > 1 &&
    document.querySelector(".task-message")
  ) {
    displayElement.remove();
  } else if (undoneTask.childElementCount < 1) {
    undoneTask.append(displayElement);
  }
}

// END

// TASKS SECTION:

const mainForm = document.querySelector("form");
const formSubmit = document.getElementById("submit");
const formInput = document.getElementById("main-input");
const undoneTask = document.getElementById("undone-tasks");
const completedTask = document.getElementById("completed-tasks");
const displayElement = document.querySelector(".task-message");

//Default on website load to perform some expected operations
sustainTasks();
displayDefaultMessage();
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
    displayDefaultMessage();
  } else if (clickObject.target.matches("#Capa_1")) {
    cancelTasks(clickObject);
    displayDefaultMessage();
  }
});

function validateInput(input) {
  if (input.value.length > 5 && isNaN(input.value)) {
    return true;
  }
  return false;
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

function cancelContainer() {
  const cancelContainer = createTag("div", "cancel-container");
  cancelContainer.innerHTML =
    '<?xml version="1.0" ?><svg data-name="Capa 1" id="Capa_1" viewBox="0 0 20 19.84" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"><path d="M10.17,10l3.89-3.89a.37.37,0,1,0-.53-.53L9.64,9.43,5.75,5.54a.37.37,0,1,0-.53.53L9.11,10,5.22,13.85a.37.37,0,0,0,0,.53.34.34,0,0,0,.26.11.36.36,0,0,0,.27-.11l3.89-3.89,3.89,3.89a.34.34,0,0,0,.26.11.35.35,0,0,0,.27-.11.37.37,0,0,0,0-.53Z"/></svg>';
  return cancelContainer;
}

function cancelTasks(taskContainer) {
  const container = taskContainer.target.closest(".parent-container");
  localStorage.removeItem(container.children[1].innerText);
  container.remove();
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
}

function sustainTasks() {
  const localStorageArray = Object.values(localStorage).sort();
  localStorageArray.forEach((taskItem) => {
    const parentContainer = createTag("div", "parent-container");
    parentContainer.innerHTML = taskItem;
    taskAppender(parentContainer);
  });
}

function taskAppender(parentContainer) {
  if (parentContainer.children[0].getAttribute("data")) {
    parentContainer.children[0].checked = true;
    completedTask.append(parentContainer);
  } else {
    undoneTask.append(parentContainer);
  }
}

// Quotes section
const quoteContainer = document.getElementById("Quotes");

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
      const quote = createTag("p");
      quote.innerText = resObject.quote;

      const addressContainer = createTag("address", "author");

      const author = createTag("a");
      author.setAttribute("rel", "author");
      author.innerText = resObject.author;

      addressContainer.append(author);
      quote.append(addressContainer);
      quoteContainer.append(quote);
    } else {
      const holder = createTag("p");
      holder.innerText = "No quotes found.";

      quoteContainer.append(holder);
    }
  });

// Sidebar

const menuToggle = document.querySelector(".menu-toggle");
const sidebar = document.getElementById("sidebar");

menuToggle.addEventListener("click", () => {
  const nav = menuToggle.closest("nav");
  if (nav.matches(".nav-expanded")) {
    setTimeout(() => {
      sidebar.classList.add("hide-display");
    }, 800);
    nav.classList.remove("nav-expanded");
  } else {
    sidebar.classList.remove("hide-display");
    nav.classList.add("nav-expanded");
  }

  menuToggle.classList.toggle("menu-toggle-on");
});

function clearLocalStorage() {
  totalTasksArray = [...undoneTask.children, ...completedTask.children];
  let iterator = 0;
  if (totalTasksArray[0].getAttribute("class") === "task-message") {
    iterator++;
  }

  for (iterator; iterator < totalTasksArray.length; iterator++) {
    totalTasksArray[iterator].remove();
  }

  localStorage.clear();
  displayDefaultMessage();
}

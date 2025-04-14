const mainForm = document.querySelector("form")
const formSubmit = document.getElementById("submit")
const formInput = document.getElementById("main-input")
const undoneTask = document.getElementById("undone-tasks")
const completedTask = document.getElementById("completed-tasks")

formSubmit.addEventListener("click", form => {
    form.preventDefault()
    if(undoneTask.children < 10) {
        createTasks("div", "input", "li")
    }
    else {
        alert("Complete your tasks first.")
    }
})

document.getElementById("Tasks").addEventListener("click", clickObject => {
    if(clickObject.target.matches(".check-box")) {
        updateTasks(clickObject.target)
    }
})

sustainTasks()

function createParentContainer(parentContainer) {
    const parentDiv = document.createElement(parentContainer)
    parentDiv.classList.add('parent-container')
    return parentDiv
}

function createTasks(parentContainer, checkerBox, taskTextHolder) {
        const parentDiv = createParentContainer(parentContainer)

        const checkBox = document.createElement(checkerBox)
        checkBox.setAttribute("type", "checkbox")
        checkBox.classList.add('check-box')
    
        const listItem = document.createElement(taskTextHolder)
        listItem.innerText = formInput.value
        listItem.classList.add('list-item')
    
        parentDiv.append(checkBox, listItem)
        undoneTask.append(parentDiv)
    
        persistLocalStorage(listItem, parentDiv)
}

function updateTasks(Target) {
    const parentContainer = Target.parentElement

    if(Target.checked) {
        parentContainer.remove()
        Target.setAttribute("data", "checked")
        persistLocalStorage(Target.nextElementSibling, parentContainer)
        completedTask.append(parentContainer)
    } else {
        parentContainer.remove()
        Target.removeAttribute("data")
        persistLocalStorage(Target.nextElementSibling, parentContainer)
        undoneTask.append(parentContainer)
    }
}

function persistLocalStorage(key, value) {
    value.children[0].setAttribute("order", localStorage.length)
    localStorage.setItem(`${key.innerText}`, `${value.innerHTML}`)
}

function sustainTasks() {
    const localStorageArray = Object.values(localStorage)
    localStorageArray.sort()
    console.log(localStorageArray)
    localStorageArray.forEach(Item => {
        const parentContainer = createParentContainer("div")
        parentContainer.innerHTML = Item

        if (parentContainer.children[0].getAttribute("data")) {
            parentContainer.children[0].checked = true
            completedTask.append(parentContainer)
        } else {
            undoneTask.append(parentContainer)
        }
    })
}

// use localstorage length to serialize each containers and use for loops to localstorage.length--, < 0

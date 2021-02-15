import {
    ToDo
} from './todo.js';

// used to set and get filterState
const FilterEnum = Object.freeze({
    ALL : 1,
    COMPLETE : 2,
    INCOMPLETE : 3
});

// helps with filtering
let filterState = FilterEnum.ALL;

// Hold our todos (for drawing to the page)
let todos = [];

// check localStorage for existing ToDo items
getToDoItemsFromLocalStorage();

// Draw the list to the page
setToDoList(selectFilteredList(filterState, todos));




// get page elements
const addButton = document.querySelector('#save');
const error = document.querySelector('#error');
const contentElement = document.querySelector("#content");
const filterList = document.querySelector('#filterList')

//==============================================================
//==============================EVENT LISTENERS=================
//==============================================================

// Event listener for the add to list button
addButton.addEventListener('click', (event) => {
    // prevent form submission
    event.preventDefault();

    // check user input and if it's empty, if it is display an error message
    if (contentElement.value == "") {
        displayError();
    } else {
        // Create a new ToDo object, and put it in our array
        const newTodo = new ToDo(contentElement.value);
        todos.push(newTodo);
    
        // Update local storage
        localStorage.setItem('todos', JSON.stringify(todos));

        // Update UI, and remove item from textbox input
        setToDoList(selectFilteredList(filterState, todos));
        contentElement.value = '';
    }
});

// Event listener for the text input field
contentElement.addEventListener('keyup', () => {
    if (contentElement.value != "") {
        hideError();
    }
});

// Event listener for filter buttons
filterList.addEventListener('click', (event) => {
    if (event.target.type === "button") {
        switch (event.target.value) {
            case 'All':
                filterState = FilterEnum.ALL;
                break;

            case 'Complete':
                filterState = FilterEnum.COMPLETE;
                break;

            case 'Incomplete':
                filterState = FilterEnum.INCOMPLETE;
                break;
            
            default:
                filterState = FilterEnum.ALL;
        }
        setToDoList(selectFilteredList(filterState, todos));
    }
});

// SEE ALSO setToDoList() - THERE ARE TWO MORE EVENT LISTENERS DEFINED THERE

//=============================================================
//================================FUNCTIONS====================
//=============================================================

// get todos from local storage
function getToDoItemsFromLocalStorage() {
    if (localStorage.getItem('todos')) {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
}

// Draw ToDo list to the page
function setToDoList(toDoList) {
    const toDoListElement = document.querySelector('#toDoList');
    toDoListElement.innerHTML = '';

    const remainingToDos = document.querySelector('#remainingToDos');
    remainingToDos.innerHTML = `${todos.filter(x => x.Completed === false).length} tasks remaining`;

    if (toDoList.length > 0) {     
        toDoList.forEach(
            todo => {
                toDoListElement.innerHTML +=
               `<li id=${todo.Id} >
                   <label ${todo.Completed ? 'class="completed"' : ""}>
                       <input type="checkbox" value="${todo.Id}" ${todo.Completed ? "checked" : ""}>
                       
                       ${todo.Content}
                   </label>
                   <input type="button" value="X">
               </li>`
            }
        );

        // Mark as Complete/Incomplete
        const checkboxes = document.querySelectorAll('#toDoList input[type="checkbox"]');
        checkboxes.forEach(
            checkbox => {
                checkbox.addEventListener('change', (event) => {
                    // get the correct object reference:
                    const id = Number(event.target.value);
                    const todo = todos.find(todo => todo.Id === id);

                    // set object's Completed attribute to the opposite of what it is
                    todo.Completed = !todo.Completed;

                    // update local storage
                    localStorage.setItem('todos', JSON.stringify(todos));

                    // update UI
                    setToDoList(selectFilteredList(filterState, todos));
                });
            }
        );

        // Delete Item from List
        const deleteButtons = document.querySelectorAll('#toDoList input[type="button"]');
        deleteButtons.forEach(
            deleteButton => {
                deleteButton.addEventListener('click', (event) => {
                    // get the correct object Index:
                    const deleteId = Number(event.target.parentElement.id);
                    const deletedIndex = todos.indexOf(todos.find(todo => todo.Id === deleteId));

                    // delete the item from the list of todos
                    todos.splice(deletedIndex, 1);

                    // update local storage
                    localStorage.setItem('todos', JSON.stringify(todos));

                    // update UI
                    setToDoList(selectFilteredList(filterState, todos));
                });
            }
        );
    }
}

// display error message to user
function displayError() {
    error.style.display = 'block';
}

// hide error message from user
function hideError() {
    error.style.display = 'none';
}

// used to get the filtered list
function selectFilteredList(filter, todos) {
    switch (filter) {
        case FilterEnum.ALL:
            return todos;
            break;

        case FilterEnum.COMPLETE:
            return todos.filter(x => x.Completed === true);
            break;

        case FilterEnum.INCOMPLETE:
            return todos.filter(x => x.Completed === false);
            break;
        
        default:
            return todos;
    }
}
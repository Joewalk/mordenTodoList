const addBtn = document.querySelector("#addItem");
const item = document.querySelector("#todoItem");
const itemCtn = document.querySelector("#item-ctn");
const removeItem = document.querySelector("#remove");
const complete = document.querySelector(".completed");
const container = document.querySelector("#container");
const clearBtn = document.querySelector(".clear");
const mark = document.querySelector("#mark");
// clear all todos from the localStorage
clearBtn.addEventListener("click", () => {
  localStorage.clear();
  container.innerHTML = "";
});

// Add todo to LS
addBtn.addEventListener("click", e => {
  e.preventDefault();
  let html = "";

  if (item.value == "") {
    alert("Please Enter a Todo Task!");
  } else {
    let html = "";

    html += `
      <li class="list-group-item d-flex" id="item-ctn">
      <input type="checkbox" name="marker" id="mark" class="mr-2 mt-2 " >
      <label id="item" for="mark">${item.value}</label>
      <a href="#" class=" ml-auto remove text-danger">remove</a>
      </li>
      `;

    container.insertAdjacentHTML("afterbegin", html);

    let todo = item.value;
    let todos;

    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));
    // emptys the input field after todo is added
    item.value = "";
  }
});
// load all todos
const loadTods = () => {
  let html = "";
  let todos = JSON.parse(localStorage.getItem("todos"));
  console.log(todos);
  todos.forEach(todo => {
    html += `
    <li class="list-group-item d-flex" id="item-ctn">
    <input type="checkbox" name="marker" id="mark" class="mr-2 mt-2 " >
    <label id="item" >${todo}</label>
    <a href="#" class=" ml-auto remove text-danger">remove</a>
    </li>
    `;
  });
  container.insertAdjacentHTML("afterbegin", html);
};
loadTods();

// Removing item
container.addEventListener("click", e => {
  if (e.target.classList.contains("remove")) {
    e.target.parentElement.remove();

    let tasks;
    if (localStorage.getItem("todos") === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem("todos"));
    }

    tasks.forEach(function(item, index) {
      if (e.target.parentElement.children[1].textContent === item) {
        tasks.splice(index, 1);
      }
    });

    localStorage.setItem("todos", JSON.stringify(tasks));
    // console.log(tasks);
  }
});
// adds class to add css line-through
const completed = e => {
  if ((e.target.hasProperty = "checked")) {
    e.target.classList.add("completed");
  }
};
document.body.addEventListener("click", completed);

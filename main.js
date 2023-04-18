window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  const nameField = document.querySelector("#name");
  const todoForm = document.querySelector("#todo-form");

  const userInput = localStorage.getItem("userInput") || "";

  nameField.value = userInput;

  nameField.addEventListener("change", (e) => {
    localStorage.setItem("userInput", e.target.value); // update name on change
  });

  todoForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // json
    const todo = {
      content: e.target.elements.content.value,
      option: e.target.elements.option.value,
      done: false,
      createdAt: new Date().getTime(),
    };

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    e.target.reset(); // reset form contents
    displayTodos();
  });
  displayTodos();
});

const displayTodos = () => {
  const todoList = document.querySelector("#todo-list");
  todoList.innerHTML = "";
  todos
    .sort((a, b) => b.createdAt - a.createdAt)
    .forEach((todo) => {
      const todoItem = document.createElement("div");
      todoItem.classList.add("todo-list-item");
      const label = document.createElement("label");
      const input = document.createElement("input");
      const todoInput = document.createElement("input");
      const span = document.createElement("span");
      const content = document.createElement("div");
      const actions = document.createElement("div");
      const edit = document.createElement("button");
      const deleteBtn = document.createElement("button");

      input.type = "checkbox";
      input.checked = todo.done;

      span.classList.add("priority");

      if (todo.option == "top") {
        span.classList.add("top");
      } else {
        span.classList.add("low");
      }

      content.classList.add("todo-content");

      todoInput.type = "text";
      todoInput.setAttribute("readonly", "true");
      todoInput.classList.add("todo-input");

      todoInput.value = todo.content;
      content.appendChild(todoInput);

      actions.classList.add("actions");
      edit.classList.add("edit-btn");
      deleteBtn.classList.add("delete-btn");

      //content.innerHTML = `<input type="text" class="todo-input" value=${todo.content} readonly>`;

      edit.innerHTML = "Edit";
      deleteBtn.innerHTML = "Delete";

      label.appendChild(input);
      label.appendChild(span);
      actions.appendChild(edit);
      actions.appendChild(deleteBtn);
      todoItem.appendChild(label);
      todoItem.appendChild(content);
      todoItem.appendChild(actions);

      todoList.appendChild(todoItem);

      if (todo.done) {
        console.log("done");
        todoInput.classList.add("done");
      }

      input.addEventListener("click", (e) => {
        todo.done = e.target.checked; // get clicked item's checked status and assign it to the todo item we are on
        localStorage.setItem("todos", JSON.stringify(todos));
        if (todo.done) {
          input.classList.add("done");
        } else {
          input.classList.remove("done");
        }
        displayTodos();
      });

      edit.addEventListener("click", (e) => {
        //   const input = content.querySelector("todo-input");
        todoInput.removeAttribute("readonly");
        todoInput.focus(); // highlight
        // click outside of todoInput field will stop editing
        todoInput.addEventListener("blur", (e) => {
          todoInput.setAttribute("readonly", true);
          todo.content = e.target.value;
          localStorage.setItem("todos", JSON.stringify(todos));
          displayTodos();
        });
      });

      deleteBtn.addEventListener("click", (e) => {
        todos = todos.filter((t) => t != todo); // as long as it's not clicked todo
        localStorage.setItem("todos", JSON.stringify(todos));
        displayTodos();
      });
    });
};

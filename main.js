window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  const nameField = document.querySelector("#name");
  const todoForm = document.querySelector("todo-form");

  const userInput = localStorage.getItem("userInput") || "";

  nameField.value = userInput;

  nameField.addEventListener("change", (e) => {
    localStorage.setItem("userInput", e.target.value); // update name on change
  });
});

// todoForm.addEventListener()

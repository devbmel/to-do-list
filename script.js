function addTask() {
  const taskInput = document.getElementById("inputTask");
  const btnAddTask = document.getElementById("btnAddTask");

  btnAddTask.addEventListener("click", () => {
    let taskLocalStorage = [];
    const getTasksLocalStorage = JSON.parse(localStorage.getItem("tasksInput"));

    if (getTasksLocalStorage) {
      // vérifie si getTasksLocalStorage n'est pas vide
      taskLocalStorage = getTasksLocalStorage;
    }

    if (taskInput.value) {
      // vérifie si l'input n'est pas vide et interdit l'ajout si c'est le cas
      taskLocalStorage.push({
        id: taskLocalStorage.length,
        name: taskInput.value,
        completed: false,
      });
      localStorage.setItem("tasksInput", JSON.stringify(taskLocalStorage));
    }
  });
}

addTask();

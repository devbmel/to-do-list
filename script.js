const taskInput = document.getElementById("inputTask");
const btnAddTask = document.getElementById("btnAddTask");
const liste = document.getElementById("liste");

const fetchData = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let task1 = { id: 0, name: "Walk a dog", status: false };
      let task2 = { id: 1, name: "Wash the dishes", status: false };
      let task3 = { id: 2, name: "Homework", status: false };
      let taskList = [task1, task2, task3]; // tableau avec des taches
      resolve(taskList);
    }, ms);
  });
}; // function de simulation un delay de requet

const saveTasksToLocal = async () => {
  const fetchedData = await fetchData(2000);
  localStorage.setItem(`tasks`, JSON.stringify(fetchedData));
}; //enregistrement donnees laquelle j'ai recupere avec "fetch"

//localStorage.clear(); //effacer des donnes chaue renouvellement du page (pour tester)
saveTasksToLocal(); //charger data si besoin

btnAddTask.addEventListener("click", (event) => {
  event.preventDefault();
  let taskLocalStorage = [];
  const getTasksLocalStorage = JSON.parse(localStorage.getItem("tasks"));
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
    localStorage.setItem("tasks", JSON.stringify(taskLocalStorage));
  }
});

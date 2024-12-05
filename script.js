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

localStorage.clear(); //effacer des donnes chaue renouvellement du page (pour tester)
saveTasksToLocal(); //charger data si besoin

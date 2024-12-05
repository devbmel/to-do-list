const taskInput = document.getElementById("inputTask");
const btnAddTask = document.getElementById("btnAddTask");
const liste = document.getElementById("liste");
let taskId = 2;
const fetchData = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      let task1 = { id: 0, name: "Walk a dog", status: false };
      let task2 = { id: 1, name: "Wash the dishes", status: false };
      let task3 = { id: 2, name: "Homework", status: true };
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
    taskId += 1;
    taskLocalStorage.push({
      id: taskId,
      name: taskInput.value,
      status: false,
    });
    localStorage.setItem("tasks", JSON.stringify(taskLocalStorage));
  }
  chercherTaches();
});


function chercherTaches () {
  // Récupération des tâches stockées dans le localStorage
  liste.innerHTML = "";
  let taches = JSON.parse(localStorage.getItem('tasks')) || [];
  taches.forEach(tache => {
    afficherTache(tache)
  });
  
  
 }
 //chercherTaches(); 
 
 // Fonction pour afficher une tâche dans le DOM.
// La fonction afficherTache affiche les tâches dans le DOM,
// qu'elles soient prédéfinies ou ajoutées par l'utilisateur.
function afficherTache(tache) {
  const li = document.createElement('li')
  const taskName = document.createElement('p')
  const taskStatus = document.createElement('button')
  const deleteButton = document.createElement('button');
  let status = "";
  li.appendChild(taskName);
  li.appendChild(taskStatus);
  li.appendChild(deleteButton);
  if(tache.status === false) {
    status = "Complete"
    taskStatus.classList.add( "success" );
  }else if(tache.status === true){
    status = "Cancel"
    taskStatus.classList.add( "cancel" );
  }
  taskName.textContent = tache.name;
  taskStatus.textContent = status;
  deleteButton.textContent = 'Delete';
  deleteButton.id = tache.id;
  liste.appendChild(li);
  taskStatus.addEventListener('click', function(event) {
    event.preventDefault();
    const index = deleteButton.id;
    let taches = JSON.parse(localStorage.getItem('tasks')) || []
    if(status === "Complete"){
      status = "Cancel";
      taskStatus.textContent = status;
      taskStatus.classList.remove("success");
      taskStatus.classList.add( "cancel" );
      taches[index].status = true;
      }else if(status === "Cancel"){  
      status = "Complete";
      taskStatus.textContent = status;
      taskStatus.classList.remove("cancel");
      taskStatus.classList.add( "success" );
      taches[index].status = false;
    }
    localStorage.setItem("tasks", JSON.stringify(taches));
  })
  deleteButton.addEventListener("click", function(event) {
    event.preventDefault();
    const index = deleteButton.id;
    let taches = JSON.parse(localStorage.getItem('tasks')) || [];
    const newTaches =  taches.filter(item => item.id != index);
    localStorage.setItem("tasks", JSON.stringify(newTaches));
    chercherTaches()
  });
}

async function showContent() {
  await fetchData();
  chercherTaches();
}

showContent(); // Affiche les tâches lors du chargement de la page.
//afficherTache()

/* let taches = JSON.parse(localStorage.getItem('tasks')) || [];
    const index = taches.indexOf(tache);
    if (index > -1) {
      taches.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(taches));
    }
    chercherTaches(); */
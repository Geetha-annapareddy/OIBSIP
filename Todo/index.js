let Works=JSON.parse(localStorage.getItem("Works"))||[]

//To display date and day
var date=new Date()
var options={
    weekday:"long",
    day:"numeric",
    month:"long"
};
var day=date.toLocaleDateString("en-US",options)
document.getElementById("header").innerHTML=day


  // To get 3different tabs
var tablinks = document.getElementsByClassName('tab-link')
var tabcontents = document.getElementsByClassName('tab-contents')
    function opentab(tabname) {
      for (let tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab")
      }
      for (let tablink of tablinks) {
        tablink.classList.remove("active-link")
      }
      event.currentTarget.classList.add("active-link");
      if(tabname=='pending'){
        loadpendingTasks();
      }
      else if(tabname=='complete'){
        loadcompletedTasks();
      }
      document.getElementById(tabname).classList.add("active-tab");
    }

//add task to localstorage
function addTask()
{
    const inputValue=document.getElementById('new-item').value;
    if(inputValue==''){
        alert("enter task");
        return;
    }
    let tasks1=JSON.parse(localStorage.getItem("Works"));
    if(tasks1){
      // task already exist
      let tasks=Array.from(tasks1);
      tasks.forEach(todo => {
        console.log(todo.name,inputValue)
        if (todo.name === inputValue) {
          alert("Task already exist!");
          inputValue = "";
          return;
        }
    });
   }

    const task={
        id:new Date().getTime(),
        name:inputValue,
        isCompleted:false
    };
    Works.push(task)
    localStorage.setItem('Works',JSON.stringify(Works));
    inputValue=''
}

window.onload = loadTasks;

//to display all tasks
function loadTasks() {
  document.getElementById("all-list").innerHTML='';
  // Get the tasks from localStorage and convert it to an array
let tasks1 = JSON.parse(localStorage.getItem("Works"));
if(tasks1){
  let tasks=Array.from(tasks1)

// Loop through the tasks and add them to the list
  tasks.forEach(task => {
    const list = document.querySelector(".all");
    const div= document.createElement("div");
    div.setAttribute('id',task.id);
    div.innerHTML = `<input type="checkbox"  onclick="taskComplete(this)" class="check" ${task.isCompleted ? 'checked' : ''}>
          <input type="text" value="${task.name}" class="task ${task.isCompleted ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
          <i class="fas fa-edit"  onclick="editTask(this)"></i>
          <i class="fa fa-trash" onclick="DelTask(this)"></i>`;
    list.append(div);
  });
}
}

//To get pending tasks
function loadpendingTasks() {

document.getElementById("pending-list").innerHTML='';

  // Get the tasks from localStorage and convert it to an array
let tasks1 = JSON.parse(localStorage.getItem("Works"));
if(tasks1){
  let tasks=Array.from(tasks1)

// Loop through the tasks and add them to the list
  tasks.forEach(task => {
    const list = document.querySelector(".pending");
    const div= document.createElement("div");
    div.setAttribute('id',task.id);

    if (task.isCompleted == false) {
      div.innerHTML = `<input type="checkbox"  onclick="taskComplete(this)" class="check" ${task.isCompleted ? 'checked' : ''}>
            <input type="text" value="${task.name}" class="task ${task.isCompleted ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
            <i class="fas fa-edit"  onclick="editTask(this)"></i>`;
      list.append(div);
    }
  });
}
}

function loadcompletedTasks() {
  document.getElementById("complete-list").innerHTML='';
  // Get the tasks from localStorage and convert it to an array
let tasks1 = JSON.parse(localStorage.getItem("Works"));
if(tasks1){
  let tasks=Array.from(tasks1)
// Loop through the tasks and add them to the list
  tasks.forEach(task => {
    const list = document.querySelector(".complete");
    const div= document.createElement("div");
    div.setAttribute('id',task.id);
    if (task.isCompleted == true) {
      div.innerHTML = `<input type="checkbox"  onclick="taskComplete(this)" class="check" ${task.isCompleted ? 'checked' : ''}>
            <input type="text" value="${task.name}" class="task ${task.isCompleted ? 'completed' : ''}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
            <i class="fas fa-edit"  onclick="editTask(this)"></i>`;
      list.insertBefore(div,list.children[0]);
    }
  });
}
}


function taskComplete(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("Works")));
  tasks.forEach(task => {
    if (task.name === event.nextElementSibling.value) {
      task.isCompleted = !task.isCompleted;
    }
  });
  localStorage.setItem("Works", JSON.stringify(tasks));
  event.nextElementSibling.classList.toggle("completed");
}

function DelTask(event){
let i=0;
  let tasks= Array.from(JSON.parse(localStorage.getItem("Works")));
 for( i=0;i<tasks.length;i++){
  if(tasks[i].id==event.parentElement.id){
    break;
  }
}
tasks.splice(i,1);
 localStorage.setItem("Works", JSON.stringify(tasks));
let tabname=event.parentElement.parentElement.className;
if(tabname="all"){
  loadTasks()
}
else if(tabname=='pending'){
  loadpendingTasks()
}
else{
  loadcompletedTasks()
}
}

var currentTask = null;

// get current task
function getCurrentTask(event) {
  currentTask = event.value;

}

function editTask(event) {
  let tasks = Array.from(JSON.parse(localStorage.getItem("Works")));
  // check if task is empty
  if (event.value === "") {
    alert("Task is empty!");
    event.value = currentTask;
    return;
  }
  // task already exist
  tasks.forEach(task => {
    if (task.name === event.value) {
      alert("Task already exist!");
      event.value = currentTask;
      return;
    }
  });
  // update task
  tasks.forEach(task => {
    if (task.name === currentTask) {
      task.name = event.value;
    }
  });
  // update local storage
  localStorage.setItem("Works", JSON.stringify(tasks));
}

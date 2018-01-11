//Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//load all event listeners
loadEventListeners();
//doc load event


//load all event listeners
function loadEventListeners(){
    document.addEventListener("DOMContentLoaded", getTasks);
    form.addEventListener('submit', addTask);
    // Remove tasks
    taskList.addEventListener('click',removeTask); // need event delegation
    clearBtn.addEventListener('click', clearTasks);// clear all tasks
    //filter task events
    filter.addEventListener('keyup', filterTasks);
}
//get tasks from local storage.
function getTasks(){
    if(localStorage.getItem('tasks')===null){
        tasks=[];

    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task){
        const li = document.createElement('li');
    li.className="collection-item";
    //create text node and append to li
    li.appendChild(document.createTextNode(task));
    //create new link element
    const link =  document.createElement('a');
    link.className="delete-item secondary-content";//in materialize to have something to the right of the list item we need to have secondary class.
    link.innerHTML='<i class="fa fa-remove"></i>';
    li.appendChild(link);
    //append li to ul
    document.querySelector(".collection").appendChild(li);

    })   
}
function addTask(e){
    if(taskInput.value==''){
        alert('Add a Task');
    }
    //create li element
    const li = document.createElement('li');
    li.className="collection-item";
    //create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link element
    const link =  document.createElement('a');
    link.className="delete-item secondary-content";//in materialize to have something to the right of the list item we need to have secondary class.
    link.innerHTML='<i class="fa fa-remove"></i>';
    li.appendChild(link);
    //append li to ul
    document.querySelector(".collection").appendChild(li);
    //store in Local Storage
    storeTaskInLocalStorage(taskInput.value);
    //clear the input
    taskInput.value='';

    e.preventDefault();
}

function removeTask(e){
    if(e.target.parentElement.classList.contains("delete-item")){
        if(confirm('Are you sure to delete?')){
            e.target.parentElement.parentElement.remove();
            //Remove from LS
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    }
}
function removeTaskFromLocalStorage(taskItem){
   // console.log(taskItem);
   if(localStorage.getItem('tasks')===null){
    tasks=[];

}else{
    tasks=JSON.parse(localStorage.getItem('tasks'));
}
tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
        tasks.splice(index,1); //removes 1 element at position index.
    }
});
localStorage.setItem('tasks',JSON.stringify(tasks));
}

function clearTasks(){
   // taskList.innerHTML=''; //method 1 to clear all
    while(taskList.firstChild){ //method 2 to clear all. It is prooved that removeChild is faster than using innerHTML clearance method.
        taskList.removeChild(taskList.firstChild);
    }
    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage(){
    localStorage.clear();
}

function filterTasks(){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('collection-item').forEach()(function(task){//we can use for each because queryselectorall uses node list. In contrast, getElementByClass would return html colln which we have to convert to array to use forEach
        const item=task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1){
            task.style.display="block";
        }
        else{
            task.style.display="none";
        }
});
}

function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];

    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks',JSON.stringify(tasks));
}
//Define UI variables
const form = document.querySelector('#task-form');
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//load all event listeners
loadEventListeners();

//load all event listeners
function loadEventListeners(){
    form.addEventListener('submit', addTask);

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
    //clear the input
    taskInput.value='';

    e.preventDefault();
}
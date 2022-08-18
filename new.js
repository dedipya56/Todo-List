
const inputBox = document.querySelector(".field input");
const addBtn = document.querySelector(".field button");
const todoList = document.querySelector(".todoList");
const clearAll = document.querySelector(".footer button");


inputBox.onkeyup = ()=>{
  let enteredValue = inputBox.value; 
  if(enteredValue.trim() != 0){ 
    addBtn.classList.add("active"); 
  }else{
    addBtn.classList.remove("active"); 
  }
}
showTasks();

addBtn.onclick = ()=>{ 
  let enteredValue = inputBox.value; 
  let getLocalStorageData = localStorage.getItem("New Todo"); 
  if(getLocalStorageData == null){ 
    listArray = []; 
  }else{
    listArray = JSON.parse(getLocalStorageData);  
  }
  listArray.push(enteredValue); 
  localStorage.setItem("New Todo", JSON.stringify(listArray)); 
  addBtn.classList.remove("active"); 
  showTasks();
}

function showTasks(){
  let getLocalStorageData = localStorage.getItem("New Todo");
  if(getLocalStorageData == null){
    listArray = [];
  }else{
    listArray = JSON.parse(getLocalStorageData); 
  }
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; 
  if(listArray.length > 0){ 
    clearAll.classList.add("active"); 
  }else{
    clearAll.classList.remove("active"); 
  }
  let newLiTag = "";
  
  listArray.forEach((element, index) => {
    
    newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag; 
  inputBox.value = ""; 
  
}


function deleteTask(index){
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); 
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  showTasks(); 
}


clearAll.onclick = ()=>{
  listArray = []; 
  localStorage.setItem("New Todo", JSON.stringify(listArray)); 
  showTasks(); 
}
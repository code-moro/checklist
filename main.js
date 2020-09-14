const todoinput=document.querySelector('.todo-input');
const todobutton=document.querySelector('.todo-button');
const todolist=document.querySelector('.todo-list');
const filter=document.querySelector('.filter-todo');
const next=document.querySelector('.nickname-index');
next.innerHTML= localStorage.getItem("result");

document.addEventListener('DOMContentLoaded',getTodo);
todobutton.addEventListener('click',addtodo);
todolist.addEventListener('click',deltodo);
filter.addEventListener('click',filtertodo);

//function to add element in the list using dom
function addtodo(e)
{
  const todiv=document.createElement('div');
  todiv.classList.add("todo");

  const newtodo=document.createElement('li');
   newtodo.innerText=todoinput.value;
   todiv.classList.add("todo-item");
   todiv.appendChild(newtodo);
   saveLocalTodo(todoinput.value);
     
    const completedButton=document.createElement('button');
  
    completedButton.innerHTML="<i class='bx bx-check'></i>";
    completedButton.classList.add("comp-butt");
    todiv.appendChild(completedButton);

  
    const trashButton=document.createElement('button');
  
    trashButton.innerHTML="<i class='bx bx-trash'></i>";
    trashButton.classList.add("trash-butt");
    todiv.appendChild(trashButton);

    todolist.appendChild(todiv);
    todoinput.value=" ";

}
//function to delete element from the list
function deltodo(e)
{
  const items = e.target;
if(items.classList[0] === "trash-butt")
{
 console.log(items.classList.value) ;
 const to=items.parentElement;
 to.classList.add("fall");
 removetodo(to)
 to.addEventListener('transitionend',function()
 {
to.remove();
 }
 );
}
 else if(items.classList[0]==="comp-butt")
 {
 const to=items.parentElement;
 to.classList.toggle("completed");
 }

}
//function to filter element from checked and unchecked list
function filtertodo(e)
{
 const todos=todolist.childNodes;
 todos.forEach(function(todo){
   switch(e.target.value)
   {
    case "all":
      todo.style.display="flex";
       break;
    
    case "completed":
      if(todo.classList.contains("completed"))
      {
       todo.style.display="flex"; 
      }
      else
      {
       todo.style.display="none";
      }
      break; 
      case "uncompleted":
        if(!todo.classList.contains("completed"))
        {
         todo.style.display="flex"; 
        }
        else
        {
         todo.style.display="none";
        } 
        break;
   }
 });
}

//function to store element to localstorage
function saveLocalTodo(todo)
{

let todos;
if(localStorage.getItem('todos')=== null)
{
  todos=[];
} 
else
{
todos=JSON.parse(localStorage.getItem('todos'));  
} 
todos.push(todo);
localStorage.setItem("todos",JSON.stringify(todos)); 
}

//function to get element from the localstorage
function getTodo(todo)
{

  let todos;
  if(localStorage.getItem('todos')=== null)
  {
    todos=[];
  } 
  else
  {
  todos=JSON.parse(localStorage.getItem('todos'));  
  }
  todos.forEach(function(todo){ 
  const todiv=document.createElement('div');
  todiv.classList.add("todo");

  const newtodo=document.createElement('li');
  newtodo.innerText=todo;
  todiv.classList.add("todo-item");
  todiv.appendChild(newtodo);
    
    const completedButton=document.createElement('button');

    completedButton.innerHTML="<i class='bx bx-check'></i>";
    completedButton.classList.add("comp-butt");
    todiv.appendChild(completedButton);


    const trashButton=document.createElement('button');

    trashButton.innerHTML="<i class='bx bx-trash'></i>";
    trashButton.classList.add("trash-butt");
    todiv.appendChild(trashButton);

    todolist.appendChild(todiv);
  });
}

//function to remove element from localstorage aswell as from Dom
function removetodo(todo)
{  
let todos;
if(localStorage.getItem('todos')=== null)
{
  todos=[];
} 
else
{
todos=JSON.parse(localStorage.getItem('todos'));  
}   
const todoindex= todo.children[0].innerText;
todos.splice(todos.indexOf(todoindex),1);  
localStorage.setItem("todos",JSON.stringify(todos)); 
}

const todos=todolist.childNodes;
todos.forEach(function(todo){
console.log(todo.innerText);
});
if (annyang) 
{

  // Let's define our first command. First the text we expect, and then the function it should call
  var commands = {
    'Input text *tag': function(variable) 
    {
     let additem=document.getElementById("get-input");
     additem.value=variable;
    },
  'Add item':function()
  {
    addtodo(event);
  },
 'filter item *tag': function(variable)
 {
  const todos=todolist.childNodes;
  todos.forEach(function(todo){
    switch(variable)
    {
     case "all":
       todo.style.display="flex";
        break;
     
     case "completed":
       if(todo.classList.contains("completed"))
       {
        todo.style.display="flex"; 
       }
       else
       {
        todo.style.display="none";
       }
       break; 
       case "uncompleted":
         if(!todo.classList.contains("completed"))
         {
          todo.style.display="flex"; 
         }
         else
         {
          todo.style.display="none";
         } 
         break;
       }
     });
    }
   };

  // Add our commands to annyang
  annyang.addCommands(commands);

  // Start listening. You can call this here, or attach this call to an event, button, etc.
  annyang.start();
  }
  

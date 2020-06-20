document.addEventListener('DOMContentLoaded', function () {  
  'use strict';

const headerInput = document.querySelector('.header-input'),
      todoControl  = document.querySelector('.todo-control'),
      todoList= document.querySelector('.todo-list'),
      todoCompleted = document.querySelector('.todo-completed');

let todoData = [];
const render = function () {
  todoList.textContent = '';
  todoCompleted.textContent = '';
  todoData.forEach(function(item) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = '<span class="text-todo">' +item.value+'</span>'+
    '<div class="todo-buttons">'+
    '<button class="todo-remove"></button>'+
    '<button class="todo-complete"></button>'+
    '</div>';  
    if (item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    };
    const btnTodoCompleted = li.querySelector('.todo-complete');
    btnTodoCompleted.addEventListener('click', function() {
      item.completed = !item.completed;
      render();
    });

    const btnTodoRemove = li.querySelector('.todo-remove');
    btnTodoRemove.addEventListener('click',  function() {
      todoData.splice(todoData.findIndex(item => item.value === this.parentNode.parentNode.querySelector('span').textContent), 1)
      render();
    });

  });
};

todoControl.addEventListener('submit', function(event) {
  event.preventDefault();
  if (headerInput.value.trim() !== '') { 
  const newTodo = {
    value: headerInput.value,
    completed: false,
  };
  if (todoData !== null) todoData.push(newTodo)
  else todoData = [newTodo]; 
  };
  headerInput.value='';
  render();
});

todoData = JSON.parse (localStorage.getItem ('todoData'));
if (todoData !== null) render(); 
window.onbeforeunload = function () {
  localStorage.setItem ('todoData', JSON.stringify(todoData));
};    
});
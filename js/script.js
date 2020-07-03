'use strict';

class Todo {
  constructor(form, input, todoList, todoCompleted) {
    this.form = document.querySelector(form);
    this.input = document.querySelector(input);
    this.todoList = document.querySelector(todoList);
    this.todoCompleted = document.querySelector(todoCompleted);
    this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
  }

  addToStorage() {
    localStorage.setItem('toDoList', JSON.stringify([...this.todoData]))
  }

  render() {
    this.todoList.textContent = '';
    this.todoCompleted.textContent = '';
    this.todoData.forEach(this.createItem);
    this.addToStorage();
  }

  createItem = (todo) => {   
      const li = document.createElement('li');
      li.classList.add('todo-item');
      li.key = todo.key;
      li.insertAdjacentHTML('beforeend', `
      <span class="text-todo">${todo.value}</span>
      <div class="todo-buttons">
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
      </div>
      `);
      if (todo.completed) this.todoCompleted.append(li)
      else this.todoList.append(li);    
  }

  addTodo() {
    event.preventDefault();
    if (this.input.value.trim() === '') {
      alert('Пустое дело добавить нельзя');
      return
    } else {
    if (this.input.value.trim()) {
      const newTodo = {
        value: this.input.value,
        completed: false,
        key: this.generateKey(),
      };
      this.todoData.set(newTodo.key, newTodo);
      console.log(...this.todoData);
      this.render();
    }
  }
  }

  deleteItem() {
    console.log(' this.todoData: ',  this.todoData);
    this.todoData.forEach((item) => {
      if (item.key === event.target.closest('li').key)  this.todoData.delete(item.key);      
    })
    this.render();
  }

  completedItem() {
    this.todoData.forEach((item) => {
      if (item.key === event.target.closest('li').key) item.completed = true;
      this.render();
    })
  }

  handler() {
    document.querySelector('.todo-container').addEventListener('click', () => {
      if (event.target.matches('.todo-complete')) this.completedItem()
      else if (event.target.matches('.todo-remove')) this.deleteItem()
    })
  }

  generateKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  init() {
    this.form.addEventListener('submit', this.addTodo.bind(this));
    this.render();
  }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed');
todo.init();
todo.handler();
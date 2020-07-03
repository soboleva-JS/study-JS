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
        <button class="todo-edit"></button>
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
        this.render();
      }
    }
  }

  animateDelete = (el) => {
    el.style.transform = "translateX(0px)";
    el.style['-webkit-transform'] = "translateX(0px)";
    let count = 0;
    const animate = () => {
      count -= 100;
      if (count > -3000) {
        el.style.transform = `translateX(${count}px)`;
        el.style['-webkit-transform'] = `translateX(${count}px)`;
        setTimeout(() => {
          animate(el)
        }, 10);
      }
    }
    animate(el);
  }

  animateShow = (el) => {
    el.style.transform = "translateX(-3000px)";
    el.style['-webkit-transform'] = "translateX(-3000px)";
    let count = -3000;
    const animate = () => {
      count += 100;
      if (count < 0) {
        el.style.transform = `translateX(${count}px)`;
        el.style['-webkit-transform'] = `translateX(${count}px)`;
        setTimeout(() => {
          animate(el)
        }, 10);
      }
    }
    animate(el);
  }

  deleteItem() {
    const el = event.target.closest('li');
    this.todoData.forEach((item) => {
      if (item.key === el.key) this.todoData.delete(item.key);
    });
    this.animateDelete(el);
    setTimeout(() => {
      this.render();
    }, 300);
  }

  completedItem() {
    let value, completed, key;
    const el = event.target.closest('li');
    this.todoData.forEach((item) => {
      if (item.key === el.key) {
        value = item.value;
        console.log('value: ', value);
        key = item.key;
        console.log('key: ', key);
        this.todoData.delete(item.key);
      }
    })
    this.animateDelete(el);
    setTimeout(() => {
      this.render();
    }, 300);

    const newTodo = {
      value: value,
      completed: true,
      key: key,
    };
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.key = newTodo.key;
    li.insertAdjacentHTML('beforeend', `
      <span class="text-todo">${newTodo.value}</span>
      <div class="todo-buttons">
        <button class="todo-edit"></button>
        <button class="todo-remove"></button>
        <button class="todo-complete"></button>
      </div>
      `);
    li.style.transform = "translateX(-3000px)";
    this.todoCompleted.append(li);
    this.animateShow(li);
    this.todoData.set(newTodo.key, newTodo);
    setTimeout(() => {
      this.render();
    }, 300);
  }

  edit() {
    const text = event.target.closest('.todo-item').querySelector('.text-todo');
    text.setAttribute("contenteditable", "true");
    text.addEventListener('blur', () => {
      this.todoData.forEach((item) => {
        console.log(text.closest('li'));
        console.log('text.innerHTML: ', text.innerHTML);
        console.log('item.value: ', item.value);
        if (item.key === text.closest('li').key) item.value = text.innerHTML;
      })
      this.render();
    })

  }

  handler() {
    document.querySelector('.todo-container').addEventListener('click', () => {
      if (event.target.matches('.todo-complete')) this.completedItem();
      else if (event.target.matches('.todo-remove')) this.deleteItem();
      else if (event.target.matches('.todo-edit')) this.edit();
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
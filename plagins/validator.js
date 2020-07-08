class Validator {
  constructor({selector, pattern={}, method}) {
    this.form = document.querySelector(selector);
    this.pattern = pattern;
    this.method = method;
    this.elementsForm = [ ...this.form.elements].filter(item => {
      return item.tagName.toLowerCase() !=='button' && item.type !== 'button';
    } );
    this.error = new Set();
    
  }
  init() {
    this.applyStyle();
    this.setPattern();
    this.elementsForm.forEach(elem => elem.addEventListener('change', this.check.bind(this)));
    this.form.addEventListener('submit', e=> {
      this.elements.Form.forEach(elem> this.check({target: elem}));
      if (this.error.size)
      e.preventDefault();
    });
  
  }

  isValid (elem) {
    const validatorMethod = {
      notEmpty (elem) {
        if (elem.value.trim() === '') {
          return false;
        }
        return true;
      },
      pattern(elem, pattern) {
        return pattern.test(elem.value);
      }
    }
    if (this.method) {
      const method = this.method[elem.id];   
    
    if (method) {
      return method.every((item) => validatorMethod[item[0]](elem, this.pattern[item[1]]))
    } else console.warn('Необходимо передать id полей ввода и методы проверки этих полей')
    }             
    return true; 
  }

  check(event) {
    const target = event.target;
    if (this.isValid(target)) {
      this.showSuccess(target);
      this.error.delete(target);
    }
    else {
      this.showError(target);
      this.error.add(target);
    }
  }

  showError(elem) {
    elem.classList.remove('ok');
    elem.classList.add('error');

    if (elem.nextElementSibling&&elem.nextElementSibling.classList.contains('validator-error')) {
      
      return;
    }
    const errorDiv = document.createElement('div');
    errorDiv.textContent = 'Ошибка в этом поле';
    errorDiv.classList.add('validator-error');
    elem.insertAdjacentElement('afterend', errorDiv);

  }

  showSuccess(elem) {
    elem.classList.remove('error');
    elem.classList.add('ok');
    if (elem.nextElementSibling&&elem.nextElementSibling.classList.contains('validator-error')) {
      
      elem.nextElementSibling.remove();
    }
  }

  applyStyle() {
    const style = document.createElement('style');
    style.textContent = `
 
    input.error {     
      background-color: rgba(238, 206, 206, 0.8);      
    }
    .validator-error {
      font-size: 12px;
      color: red;
      font-family: sans-serif;
    }
    input.ok {    
      background-color: rgba(182, 244, 208, 0.8);   
    }
    `
    document.head.appendChild(style);
  }

  setPattern() {
    if (!this.pattern.phone ) {
    this.pattern.phone = /^\+?[78]([-()]*\d{10})$/;
    }
    if (!this.pattern.email) {
    this.pattern.email = /^\w+@\w+\.\w{2,}$/;
    }    
  }
}
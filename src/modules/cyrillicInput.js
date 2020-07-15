const cyrillicInput = (selector) => {
    const elem = document.querySelector(selector);
    const change = () => {
      elem.value = elem.value.replace(/[^А-Яа-яЁё ]$/g, '');
    }
    elem.addEventListener("input", change);
    elem.addEventListener("focus", change);
    elem.addEventListener("blur", change);
  };

  export default cyrillicInput;
const toggleMenu = () => {
    const menu = document.querySelector('menu'),
      main = document.querySelector('main');
      const closeBtn = document.querySelector('.close-btn');
    const handlerMenu = () => {
      if (!menu.style.transform || menu.style.transform === `translate(-100%)`) {
        menu.style.transform = `translate(0)`;
        closeBtn.style.display = 'block';
      } else {
        menu.style.transform = `translate(-100%)`;
        closeBtn.style.display = 'none';
      }
    };
    const scroll = function (event) {
      event.preventDefault();
      if (event.target.getAttribute('href')) document.getElementById(event.target.getAttribute('href').slice(1)).scrollIntoView({
        behavior: 'smooth'
      })
      else document.getElementById(event.target.parentNode.getAttribute('href').slice(1)).scrollIntoView({
        behavior: 'smooth'
      })
    };
    document.body.addEventListener('click', (event) => {
      if (event.target.classList.contains('close-btn') || event.target.classList.contains('menu') || event.target.closest('.menu')) handlerMenu()
      else if (event.target.tagName == 'A' && event.target.closest('menu')) {
        handlerMenu();
        scroll(event)
      } else if (event.target.closest('a') && event.target.closest('main')) scroll(event)
      else if ((menu.style.transform = `translate(0)`) && !event.target.closest('menu')) handlerMenu()

    })
  };

  export default toggleMenu;
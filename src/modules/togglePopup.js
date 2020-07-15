const togglePopup = () => {
    const popup = document.querySelector('.popup'),
      popupContent = document.querySelector('.popup-content'),
      popupBtn = document.querySelectorAll('.popup-btn');

    const modalAnimate = () => {
      popup.style.display = 'block';
      popupContent.style.transform = "translateX(-1000px)";
      popupContent.style['-webkit-transform'] = "translateX(-1000px)";
      let count = -1000;
      const animate = () => {
        count += 50;
        if (count < -50) {
          popupContent.style.transform = `translateX(${count}px)`;
          popupContent.style['-webkit-transform'] = `translateX(${count}px)`;
          setTimeout(animate, 10);
        }
      }
      animate();
    };
    popupBtn.forEach((item) => item.addEventListener('click', () => {
      if (document.documentElement.clientWidth > 768) modalAnimate()
      else
        popup.style.display = 'block';
    }));
    popup.addEventListener('click', (event) => {
      if (event.target.classList.contains('popup-close')) popup.style.display = 'none'
      else if (!event.target.closest('.popup-content')) popup.style.display = 'none'
    });
  };

  export default togglePopup;
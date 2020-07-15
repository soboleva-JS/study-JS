const slider = () => {
    const slide = document.querySelectorAll('.portfolio-item'),
      slider = document.querySelector('.portfolio-content');

    let i = 0;
    const dots = document.querySelector('.portfolio-dots');

    while (i < slide.length) {
      const newDot = document.createElement('li');
      newDot.classList.add('dot');
      dots.append(newDot);
      i++;
    }

    const dot = document.querySelectorAll('.dot');
    dot[0].classList.add('dot-active');

    let currentSlide = 0,
      interval;

    const prevSlide = (elem, index, strClass) => {
      elem[index].classList.remove(strClass);
    };

    const nextSlide = (elem, index, strClass) => {
      elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');
      currentSlide++;
      if (currentSlide >= slide.length) currentSlide = 0;
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');
    };

    const startSlide = (time = 3000) => {
      interval = setInterval(autoPlaySlide, time)
    };

    const stopSlide = (time) => {
      clearInterval(interval);
    };

    slider.addEventListener('click', (event) => {
      event.preventDefault();
      if (!event.target.matches('.portfolio-btn, .dot')) return;

      prevSlide(slide, currentSlide, 'portfolio-item-active');
      prevSlide(dot, currentSlide, 'dot-active');

      if (event.target.matches('#arrow-right')) currentSlide++
      else if (event.target.matches('#arrow-left')) currentSlide--
      else if (event.target.matches('.dot')) {
        dot.forEach((item, index) => {
          if (item === event.target) currentSlide = index;
        })
      }

      if (currentSlide >= slide.length) currentSlide = 0;
      if (currentSlide < 0) currentSlide = slide.length - 1;
      nextSlide(slide, currentSlide, 'portfolio-item-active');
      nextSlide(dot, currentSlide, 'dot-active');

    });
    slider.addEventListener('mouseover', event => {
      if (event.target.matches('.portfolio-btn, .dot')) stopSlide();

    });
    slider.addEventListener('mouseout', event => {
      if (event.target.matches('.portfolio-btn, .dot')) startSlide();
    });

    startSlide(1500);
  };

  export default slider;
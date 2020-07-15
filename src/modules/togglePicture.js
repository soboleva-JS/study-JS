const togglePicture = () => {
    if (event.target.tagName !== 'IMG') return;
    const changeImg = event.target.dataset.img;
    if (changeImg) {
      event.target.dataset.img = event.target.src;
      event.target.src = changeImg;
    }
  };

  export default togglePicture;
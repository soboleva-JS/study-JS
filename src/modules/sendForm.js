const sendForm = (form) => {
    const errorMessage = 'Что-то пошло не так';
    const successMessage = 'Спасибо! Мы скоро с вами свяжемся';
     

    const statusMessage = document.createElement('div');
    statusMessage.style.fontSize = '2rem';
    statusMessage.style.color = '#ffffff';

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        statusMessage.innerHTML = `
          <div class="sk-flow">
          <div class="sk-flow-dot"></div>
          <div class="sk-flow-dot"></div>
          <div class="sk-flow-dot"></div>
          </div>
          `
        form.appendChild(statusMessage);
        const formData = new FormData(form);
        let body = {};
        formData.forEach((val, key) => body[key] = val);     

      const postData = (body) => {
        return fetch('./server.php', {
          method: 'POST',
          headers: {'Content-Type': 'multipart/form-data'
          },
          body: JSON.stringify(body)
        });
      };

      postData(body)
      .then ((response) => {
        if (response.status !== 200) {
          throw new Error ('status error not 200');
        }
        statusMessage.textContent = successMessage;
      })
      .catch ((error) => {
        statusMessage.textContent = errorMessage;
          console.log(error);

      })


    })
    };

    export default sendForm;
const calc = (price = 100) => {
    const calcBlock = document.querySelector('.calc-block'),
      calcType = document.querySelector('.calc-type'),
      calcSquare = document.querySelector('.calc-square'),
      calcDay = document.querySelector('.calc-day'),
      calcCount = document.querySelector('.calc-count'),
      totalValue = document.getElementById('total');

    const countSum = () => {

      let begin = 0;
      const animate = () => {
        if (begin < total) {
          begin += Math.floor(total / 20);
          totalValue.textContent = begin;
          setTimeout(animate, 10);
        } else totalValue.textContent = Math.floor(total, 1);
      }

      let total = 0,
        countValue = 1,
        dayValue = 1;
      const typeValue = calcType.options[calcType.selectedIndex].value,
        squareValue = +calcSquare.value;
      if (calcCount.value > 1) {
        countValue += (calcCount.value - 1) / 10;
      }
      if (calcDay.value && calcDay.value < 5) {
        dayValue *= 2;
      } else if (calcDay.value && calcDay.value < 10) {
        dayValue *= 1.5;
      }
      if (typeValue && squareValue) {
        total = price * typeValue * squareValue * countValue * dayValue;
      }
      animate();
    }

    calcBlock.addEventListener('change', (event) => {
      if (event.target.matches('select') || event.target.matches('input')) {
        countSum();
      }
    })
  };

  export default calc;
     const countTimer = (deadline) => {

       const timer = document.getElementById('timer');
       timer.innerHTML = `
          <span id="timer-hours"></span>
          <span></span>
          <span id="timer-minutes"></span>
          <span></span>
          <span id="timer-seconds"></span>          
          `;
       const timerHours = document.querySelector('#timer-hours'),
         timerMinutes = document.querySelector('#timer-minutes'),
         timerSeconds = document.querySelector('#timer-seconds'),
         spanTimers = document.querySelectorAll('#timer>span');



       const getTimeRemaining = () => {
         let dateStop = new Date(deadline).getTime(),
           dateNow = new Date().getTime(),
           timeRemaining = (dateStop - dateNow) / 1000,
           seconds = Math.floor(timeRemaining % 60),
           minutes = Math.floor((timeRemaining / 60) % 60),
           hours = Math.floor(timeRemaining / 60 / 60);
         return {
           timeRemaining,
           hours,
           minutes,
           seconds
         };
       }
       const updateClock = () => {
         let timer = getTimeRemaining();
         if (timer.timeRemaining < 0) {
           timerHours.textContent = '00';
           timerMinutes.textContent = '00';
           timerSeconds.textContent = '00';
           spanTimers[1].textContent=':';
           spanTimers[3].textContent=':';
           clearInterval(updateClock, 1000);
         } else {
           timerHours.textContent = (timer.hours.toString().length == 2) ? (timer.hours) : ('0' + timer.hours);
           timerMinutes.textContent = (timer.minutes.toString().length == 2) ? (timer.minutes) : ('0' + timer.minutes);
           timerSeconds.textContent = (timer.seconds.toString().length == 2) ? (timer.seconds) : ('0' + timer.seconds);
           spanTimers[1].textContent=':';
           spanTimers[3].textContent=':';
         }
       }
       updateClock();
       setInterval(updateClock, 1000);
     };

     export default countTimer;
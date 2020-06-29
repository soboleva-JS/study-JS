window.addEventListener('DOMContentLoaded', function() {
  'use strict';
function countTimer (deadline) {
  let timerHours = document.querySelector('#timer-hours'),
      timerMinutes = document.querySelector('#timer-minutes'),
      timerSeconds = document.querySelector('#timer-seconds');
      function getTimeRemaining() {
        let dateStop = new Date(deadline).getTime(),
        dateNow = new Date().getTime(),
        timeRemaining= (dateStop-dateNow) / 1000,
        seconds = Math.floor(timeRemaining % 60),
        minutes = Math.floor((timeRemaining/60)%60),
        hours = Math.floor(timeRemaining/60/60);
        return {timeRemaining, hours, minutes, seconds};
        }
      function updateClock() {
        let timer = getTimeRemaining();
        if (timer.timeRemaining<0) {
          timerHours.textContent = '00';
          timerMinutes.textContent = '00';
          timerSeconds.textContent = '00';
          clearInterval(updateClock,1000);
        }
        else {
          timerHours.textContent = (timer.hours.toString().length==2)?(timer.hours):('0'+timer.hours);
          timerMinutes.textContent = (timer.minutes.toString().length==2)?(timer.minutes):('0'+timer.minutes);
          timerSeconds.textContent = (timer.seconds.toString().length==2)?(timer.seconds):('0'+timer.seconds);
        }
      }
      setInterval(updateClock,1000);
}
countTimer('30 June 2020');
});
var timer = document.getElementById("time");
var breakTime = document.getElementById("finished");
var seconds = 60;
var minutes = 24;
var timesCompleted = 0;
var breakRounds = 0;
var intervalId;
var studyCompleteSound = new Audio('audio/Finished Study Session Sound.mov')

function startTimer() {
  if (intervalId) {
    stopTimer();
  } // Stops setInterval from firing multiple times.

  intervalId = setInterval(function() { // starts 1 second interval timer. Gets ID for stopping interval.
    seconds--;
    timer.innerHTML = minutes + ":" + seconds;

    if (seconds == 0 && minutes > 0) {
      minutes--;
      seconds = 60;
    }

    if (seconds == 0 && minutes == 0) {
      breakTime.innerHTML = "Congratulations, you have successfully studied for 25 minutes.";
      studyCompleteSound.play();
      breakRounds++

      if (breakRounds % 2 == 0) { // if breakRounds returns an even number, it will run the study timer.
        breakTime.innerHTML = "Break times over, get back to study!";
        studyCompleteSound.play();

        resetTimer(); // Resets the minutes and seconds back to the original time of 24 minutes, 60 seconds.
        stopTimer(); // Stops the timer from continuing to tick.
      }

      if (breakRounds % 2 == 1) { // if breakRounds returns an odd number, it will run the break timer.
        timesCompleted++;
        stopTimer();
        setTimeout(function() {
          breakTime.innerHTML = "You now have 5 minutes of break time."
          timer.innerHTML = "5:00";
          minutes = 4;
          seconds = 60;
        }, 2700);

      }
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
}

function resetTimer() {
  stopTimer();
  minutes = 24;
  seconds = 60;
  timer.innerHTML = "25:00";
}

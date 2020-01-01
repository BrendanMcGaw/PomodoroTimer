//jslint esversion:6

var timer = document.getElementById("time");
var breakTime = document.getElementById("finished");
var amountOfStudyCompleted = document.getElementById("AmountOfStudyDone");
var seconds = 60;
var minutes = 24;
var breakRounds = 0;
var timeStudied = 0;

var visualStudyTime = "25:00";
var visualShortBreakTime = "05:00";
var visualLongBreakTime = "30:00";

var intervalId;
var studyCompleteSound = new Audio('audio/Finished Study Session Sound.mov');

window.onload = function timeTotalStudied() {
  amountOfStudyCompleted.innerHTML = "You completed " + timeStudied + " minutes of study.";
  console.log(timeStudied);
};

function timeReachedZeroEndBreak() { // When the timer hits 00:00 it will run the end of the break
  if (seconds == 0 && minutes == 0) {
    endBreakTime();
  }
}

function addDoubleDigits() { // adds 00:00 to the visual appearance of the timer.
  timer.innerHTML = minutes + ":" + seconds;
  if (seconds < 10) {
    timer.innerHTML = minutes + ":0" + seconds;
  }
  if (minutes < 10) {
    timer.innerHTML = "0" + minutes + ":" + seconds;
  }
  if (seconds < 10 && minutes < 10) {
    timer.innerHTML = "0" + minutes + ":0" + seconds;
  }
}

function minuteHasPassed() {
  if (seconds == 0 && minutes > 0) {
    minutes--;
    seconds = 60;
  }
} //  Counts down a whole minute.

function resetTimer() { // Resets the timer back to its default settings of 25:00 minutes;
  stopTimer();
  minutes = 24;
  seconds = 60;
  timer.innerHTML = visualStudyTime;
}

function stopTimer() { // Stops the timer where it is.
  clearInterval(intervalId);
}

function startTimer() { // Starts the countdown timer.
  if (intervalId) {
    stopTimer();
  } // Stops setInterval from firing multiple times.

  intervalId = setInterval(function() { // starts 1 second interval timer. Gets ID for stopping interval.
    seconds--;
    addDoubleDigits(); // Adds the double digits for the countdown.
    minuteHasPassed(); // Function to remove a minute every 60 seconds.

    if (seconds == 0 && minutes == 0) {
      studyCompleteSound.play();
      breakRounds++;
      timeStudied = Math.floor(breakRounds / 2) * 25;
      console.log(timeStudied);
      if (seconds == 0 && minutes == 0 && breakRounds !== 8) {
        shortBreak();
      }
      longBreak();
    }
  }, 1000);
}

function endBreakTime() { // Ends the break period and returns to study period.
  if (breakRounds % 2 == 0 && breakRounds % 8 !== 0) { // if breakRounds returns an even number, it will run the study timer.
    stopTimer();
    setTimeout(function() {
      studyCompleteSound.play();
      breakTime.innerHTML = "Break timeas over, get back to study!";
      resetTimer();
    }, 2700);
  }
}

function shortBreak() { // Changes the timer to short break of 5:00 minutes.
  if (breakRounds % 2 == 1 && breakRounds % 8 !== 0) { // if breakRounds returns an odd number, it will run the break timer.
    stopTimer();
    setTimeout(function() {
      startTimer();
      breakTime.innerHTML = "You now have 5 minutes of break time.";
      minutes = 4;
      seconds = 60;
      timer.innerHTML = visualShortBreakTime;
    }, 2700);
  }
  timeReachedZeroEndBreak();
}

function longBreak() { // Changes the timer to long break of 30:00 minutes.
  if (seconds == 0 && minutes == 0 && breakRounds % 8 == 0) {
    breakTime.innerHTML = "You've earned yourself a 30 minute break, well done!";
    minutes = 29;
    seconds = 60;
    timer.innerHTML = visualLongBreakTime;
    startTimer();
  }
  timeReachedZeroEndBreak();
}

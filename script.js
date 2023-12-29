document.addEventListener('DOMContentLoaded', function () {
  var showPlaylistsButton = document.getElementById('show-playlists-button');
  var playlistContainer = document.getElementById('playlistContainer');

  showPlaylistsButton.addEventListener('click', function () {
    playlistContainer.classList.toggle('show');
  });
});

let timer;
let isRunning = false;
let pomodoroCount = 0;
let selectedDuration = 1500; 
let completedPomodoros = 0;
let userFocus = '';
let currentTimerType = 'pomodoro';
let remainingTime;

function startTimer() {
  if (!isRunning) {
    let timeLeft = remainingTime || selectedDuration; 
    document.title = userFocus !== '' ? `(${userFocus}) Pomodoro Timer` : 'Pomodoro Timer';
    timer = setInterval(function () {
      if (timeLeft > 0) {
        timeLeft--;
        displayTime(timeLeft);
        remainingTime = timeLeft; 
      } else {
        clearInterval(timer);
        isRunning = false;
        document.title = 'Take a break!';
        alert("Time's up! Take a break!");
        playAlertSound();
        completePomodoro();

        
        if (currentTimerType === 'pomodoro') {
          setTimerDuration(300);
          currentTimerType = 'short-break';
        } else if (currentTimerType === 'short-break') {
          setTimerDuration(1500);
          currentTimerType = 'pomodoro';
        }

        startTimer();
      }
    }, 1000);

    isRunning = true;
  } else {
    clearInterval(timer);
    isRunning = false;
    rotateResetButton();
  }
}


function playAlertSound() {
  const alertSound = document.getElementById('alert-sound');
  alertSound.play();
}

function displayTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  document.getElementById('time-display').innerHTML = `${formatTime(minutes)}:${formatTime(seconds)}`;
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

function setTimerDuration(duration) {
  selectedDuration = duration;
  displayTime(duration);
}

function resetTimer() {
  playAlertSound();
  clearInterval(timer);
  isRunning = false;
  document.title = userFocus !== '' ? `(${userFocus}) Pomodoro Timer` : 'Pomodoro Timer'; 
   if (currentTimerType === 'pomodoro') {
    setTimerDuration(1500);
  } else if (currentTimerType === 'short-break') {
    setTimerDuration(300);
  } else if (currentTimerType === 'long-break') {
    setTimerDuration(600);
  }
  displayTime(selectedDuration); 
  rotateResetButton();
    document.getElementById('start-button').innerText = 'Start';
}

function completePomodoro() {
  completedPomodoros++;
  updatePomodoroCounter();

  if (completedPomodoros === 5) {
    completedPomodoros = 0;
    updatePomodoroCounter();
  }
}
function updatePomodoroCounter() {
  const heartsContainer = document.getElementById('hearts-container');
  heartsContainer.innerHTML = '';

  for (let i = 0; i < 5; i++) {
    const heartIcon = document.createElement('i');
    if (i < completedPomodoros) {
      heartIcon.classList.add('fas', 'fa-heart'); 
    } else {
      heartIcon.classList.add('far', 'fa-heart'); 
    }
    heartsContainer.appendChild(heartIcon);
  }
}

function rotateResetButton() {
  const resetButton = document.getElementById('reset-button');
  resetButton.style.transition = 'transform 0.5s ease-in-out';
  resetButton.style.transform = 'rotate(360deg)';
  setTimeout(() => {
    resetButton.style.transition = 'none';
    resetButton.style.transform = 'rotate(0deg)';
  }, 500);
}
document.getElementById('start-button').addEventListener('click', function () {
  if (!isRunning) {
    startTimer();
    document.getElementById('start-button').innerText = 'Pause';
  } else {
    clearInterval(timer);
    isRunning = false;
    document.getElementById('start-button').innerText = 'Resume'; 
  }
});

document.getElementById('pomodoro-button').addEventListener('click', function () {
  currentTimerType = 'pomodoro';
  setTimerDuration(1500);
  resetTimer();
});

document.getElementById('short-break-button').addEventListener('click', function () {
  currentTimerType = 'short-break';
  setTimerDuration(300);
  resetTimer();
});

document.getElementById('long-break-button').addEventListener('click', function () {
  currentTimerType = 'long-break';
  setTimerDuration(600);
  resetTimer();
});

document.getElementById('reset-button').addEventListener('click', resetTimer);


document.getElementById('focus').addEventListener('input', function (event) {
  userFocus = event.target.value;
  document.title = userFocus !== '' ? `(${userFocus}) Pomodoro Timer` : 'Pomodoro Timer'; 
});

displayTime(selectedDuration);
updatePomodoroCounter()

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
function startTimer() {
  if (!isRunning) {
    let timeLeft = selectedDuration;
    document.title = userFocus !== '' ? `(${userFocus}) Pomodoro Timer` : 'Pomodoro Timer'; // Update page title
    timer = setInterval(function () {
      if (timeLeft > 0) {
        timeLeft--;
        displayTime(timeLeft);
      } else {
        clearInterval(timer);
        isRunning = false;
        document.title = 'Take a break!'; 
        alert("Time's up! Take a break!");
        completePomodoro();
        if (pomodoroCount % 2 === 0) {
          setTimerDuration(300); 
        } else {
         
          if (pomodoroCount % 5 === 0) {
            setTimerDuration(600); 
          } else {
            
            setTimerDuration(1500); 
          }
        }
        pomodoroCount++;
        startTimer();
      }
    }, 1000);

    isRunning = true;
  }
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
  clearInterval(timer);
  isRunning = false;
  document.title = userFocus !== '' ? `(${userFocus}) Pomodoro Timer` : 'Pomodoro Timer'; 
  displayTime(selectedDuration); 
  rotateResetButton();
}

function completePomodoro() {
  completedPomodoros++;
  updatePomodoroCounter();
}

function updatePomodoroCounter() {
  const heartsContainer = document.getElementById('hearts-container');
  heartsContainer.innerHTML = '';

  for (let i = 0; i < 5; i++) {
    const heartIcon = document.createElement('i');
    if (i < completedPomodoros) {
      heartIcon.classList.add('fas', 'fa-heart'); // Filled heart
    } else {
      heartIcon.classList.add('far', 'fa-heart'); // Empty heart
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
document.getElementById('pomodoro-button').addEventListener('click', function () {
  setTimerDuration(1500);
});

document.getElementById('short-break-button').addEventListener('click', function () {
  setTimerDuration(300);
});

document.getElementById('long-break-button').addEventListener('click', function () {
  setTimerDuration(600);
});

document.getElementById('start-button').addEventListener('click', startTimer);
document.getElementById('reset-button').addEventListener('click', resetTimer);


document.getElementById('focus').addEventListener('input', function (event) {
  userFocus = event.target.value;
  document.title = userFocus !== '' ? `(${userFocus}) Pomodoro Timer` : 'Pomodoro Timer'; 
});

displayTime(selectedDuration);
updatePomodoroCounter()
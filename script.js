let startTime;
let updatedTime;
let difference;
let timerInterval;
let running = false;

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

const startSound = document.getElementById('startSound');
const stopSound = document.getElementById('stopSound');
const resetSound = document.getElementById('resetSound');

startButton.addEventListener('click', () => {
  playSound(startSound);
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    timerInterval = setInterval(updateTime, 1000);
    running = true;
  }
});

stopButton.addEventListener('click', () => {
  playSound(stopSound);
  if (running) {
    clearInterval(timerInterval);
    difference = new Date().getTime() - startTime;
    running = false;
  }
});

resetButton.addEventListener('click', () => {
  playSound(resetSound);
  clearInterval(timerInterval);
  display.textContent = '00:00:00';
  difference = 0;
  running = false;
});

function updateTime() {
  updatedTime = new Date().getTime();
  difference = updatedTime - startTime;

  const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
  return number < 10 ? '0' + number : number;
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

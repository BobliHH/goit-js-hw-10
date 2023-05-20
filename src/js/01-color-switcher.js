const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timer = null;

startBtn.addEventListener('click', onBtnStart);
stopBtn.addEventListener('click', onBtnStop);

function onBtnStart() {
    startBtn.disabled = true;
    stopBtn.disabled = false;

  timer = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onBtnStop() {
    stopBtn.disabled = true;
    startBtn.disabled = false;
    
    clearInterval(timer);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

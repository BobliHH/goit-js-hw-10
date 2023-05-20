import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let currentDate = Date.now();
const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
let selectedDate = null;
let intervalId = null;
const flatpickrInput = document.querySelector('#datetime-picker');
const timer = null;


startBtn.addEventListener('click', onStartCounter);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < currentDate) {
      alert('Please choose a date in the future');
    } else {
      selectedDate = selectedDates[0].getTime();
    //   console.log(selectedDates[0]);
      startBtn.disabled = false;
    }
  },
};
function onStartCounter() {
    counter.start();
};

const picker = flatpickr(flatpickrInput, options);

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = addLeadingZero(Math.floor(ms / day));
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
    
}


const counter = {
    start() {
        intervalId = setInterval(() => {
            currentDate = Date.now();
            let remainingTime = selectedDate - currentDate;
            updateTimer(convertMs(remainingTime));
            startBtn.disabled = true;
            flatpickrInput.disabled = true;

            if (remainingTime <= 1000) {
                this.stop();
            }
        }, 1000);
    },
    stop() {
        startBtn.disabled = false;
        clearInterval(intervalId);
    },
};

function updateTimer({ days, hours, minutes, seconds }) {
    dataDays.textContent = `${days}`;
    dataHours.textContent = `${hours}`;
    dataMinutes.textContent = `${minutes}`;
    dataSeconds.textContent = `${seconds}`;
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}


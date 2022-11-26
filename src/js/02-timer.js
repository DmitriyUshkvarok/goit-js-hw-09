import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  inputContent: document.querySelector('#datetime-picker'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  btnStart: document.querySelector('[data-start]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.btnStart.disabled = true;
    } else {
      refs.btnStart.disabled = false;
      Notiflix.Notify.success('Ox и повозился я с этим таймером');
    }
  },
};

flatpickr(refs.inputContent, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  console.log(`${days}:${hours}:${minutes}:${seconds}`);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

refs.btnStart.addEventListener('click', onStartTimer);

function onStartTimer() {
  setInterval(() => {
    let reverse = new Date(refs.inputContent.value) - new Date();

    if (reverse > 0) {
      refs.btnStart.disabled = true;
      let objectTime = convertMs(reverse);
      refs.days.textContent = addLeadingZero(objectTime.days);
      refs.hours.textContent = addLeadingZero(objectTime.hours);
      refs.minutes.textContent = addLeadingZero(objectTime.minutes);
      refs.seconds.textContent = addLeadingZero(objectTime.seconds);
    }
  }, 1000);
}

const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
  setTimer: null,
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.btnStart.addEventListener('click', onStartColorFunction);

function onStartColorFunction() {
  refs.setTimer = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;
}

refs.btnStop.addEventListener('click', onStopColorFunction);

function onStopColorFunction() {
  clearInterval(refs.setTimer);
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;
  document.body.style.backgroundColor = '';
}

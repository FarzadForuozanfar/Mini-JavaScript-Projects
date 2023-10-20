const countdownForm = document.getElementById('countdownForm');
const inputContainer = document.getElementById('input-container');
const dateEl = document.getElementById('date-picker');

const countdownEl = document.getElementById('countdown');
const countdownElTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;
let savedCountdown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

const hiddenElement = (element, hidden) => {
  if (hidden){
    element.hidden = true;
    element.style.display = 'none';
  }
  else{
    element.hidden = false;
    element.style.display = 'block';
  }
}

const updateDOM = () => {
  countdownActive = setInterval(() => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % day) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);

    hiddenElement(inputContainer, true);

    if (distance < 0) {
      hiddenElement(countdownEl, true);
      clearInterval(countdownActive);
      completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
      hiddenElement(completeEl, false);
    } else {
      countdownElTitle.textContent = `${countdownTitle}`;
      timeElements[0].textContent = `${days}`;
      timeElements[1].textContent = `${hours}`;
      timeElements[2].textContent = `${minutes}`;
      timeElements[3].textContent = `${seconds}`;
      hiddenElement(completeEl, true);
      hiddenElement(countdownEl, false)
    }
  }, second);
}

const updateCountdown = (event) => {
  event.preventDefault();

  countdownTitle = event.srcElement[0].value;
  countdownDate = event.srcElement[1].value;
  savedCountdown = {
    title: countdownTitle,
    date: countdownDate,
  };
  localStorage.setItem('countdown', JSON.stringify(savedCountdown));

  if (countdownDate === '') {
    alert('Please select a date for the countdown.');
  } else {
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

const reset = () => {
  hiddenElement(countdownEl, true);
  hiddenElement(completeEl, true);
  hiddenElement(inputContainer, false);
  clearInterval(countdownActive);

  countdownTitle = '';
  countdownDate = '';
  localStorage.removeItem('countdown');
}

const restorePreviousCountdown = () => {
  const cacheCountdown = localStorage.getItem('countdown');
  if (cacheCountdown) {
    hiddenElement(inputContainer, true);
    savedCountdown = JSON.parse(cacheCountdown);
    countdownTitle = savedCountdown.title;
    countdownDate = savedCountdown.date;
    countdownValue = new Date(countdownDate).getTime();
    updateDOM();
  }
}

countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);

restorePreviousCountdown();

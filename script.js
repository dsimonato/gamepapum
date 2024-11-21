let countdown;
const timerDisplay = document.querySelector('.timer');
const alarmSound = document.getElementById('alarmSound');
const timeInput = document.getElementById('timeInput');
const decreaseButton = document.getElementById('decreaseButton');
const increaseButton = document.getElementById('increaseButton');
const letterBoxes = document.querySelectorAll('.letter-box');
const searchButton = document.getElementById('searchButton');
const displayTheme = document.getElementById('displayTheme');

searchButton.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * Object.keys(temas).length);
    const randomTheme = Object.values(temas)[randomIndex];
    displayTheme.textContent = `${randomTheme}`;
});

function timer(seconds) {
    clearInterval(countdown);
    alarmSound.pause();
    alarmSound.currentTime = 0;
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if (secondsLeft < 0) {
            clearInterval(countdown);
            alarmSound.play();
            resetLetterBoxes();
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const display = `${seconds < 10 ? '0' : ''}${seconds}`;
    timerDisplay.textContent = display;
}

function resetLetterBoxes() {
    letterBoxes.forEach(box => {
        box.classList.remove('active');
    });
}

letterBoxes.forEach(box => {
    box.addEventListener('click', () => {
        const seconds = parseInt(timeInput.value);
        timer(seconds);
        box.classList.add('active');
        if (document.querySelectorAll('.letter-box.active').length === letterBoxes.length) {
            resetLetterBoxes();
        }
    });
});

decreaseButton.addEventListener('click', () => {
    let currentValue = parseInt(timeInput.value);
    if (currentValue > 1) {
        timeInput.value = currentValue - 1;
    }
});

increaseButton.addEventListener('click', () => {
    let currentValue = parseInt(timeInput.value);
    timeInput.value = currentValue + 1;
});

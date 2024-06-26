let startTime, updatedTime, difference, timerInterval;
let isRunning = false;
let laps = [];

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStopButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const lapsContainer = document.getElementById('laps');

startStopButton.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timerInterval);
        startStopButton.textContent = 'Start';
    } else {
        startTime = Date.now() - (difference || 0);
        timerInterval = setInterval(updateTime, 10);
        startStopButton.textContent = 'Stop';
    }
    isRunning = !isRunning;
});

resetButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    isRunning = false;
    startStopButton.textContent = 'Start';
    difference = 0;
    laps = [];
    display.textContent = '00:00:00.00';
    lapsContainer.innerHTML = '';
});

lapButton.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = formatTime(difference);
        laps.push(lapTime);
        displayLaps();
    }
});

function updateTime() {
    updatedTime = Date.now();
    difference = updatedTime - startTime;
    
    display.textContent = formatTime(difference);
}

function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 2)}`;
}

function pad(number, digits = 2) {
    return number.toString().padStart(digits, '0');
}

function displayLaps() {
    lapsContainer.innerHTML = laps.map((lap, index) => `<div class="lap">Lap ${index + 1}: ${lap}</div>`).join('');
}


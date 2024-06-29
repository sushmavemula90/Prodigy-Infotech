let startTime;
let updatedTime;
let difference = 0;
let tInterval;
let running = false;
let laps = [];
let paused = false;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('lapsList');

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', recordLap);

function startPause() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        tInterval = setInterval(updateTime, 10); // Adjusting interval to 10ms for better performance
        startPauseBtn.textContent = 'Pause';
        running = true;
        paused = false;
        console.log('Stopwatch started');
    } else {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        startPauseBtn.textContent = 'Start';
        running = false;
        paused = true;
        console.log('Stopwatch paused');
    }
}

function reset() {
    clearInterval(tInterval);
    display.textContent = '00:00:00';
    difference = 0;
    running = false;
    paused = false;
    startPauseBtn.textContent = 'Start';
    laps = [];
    renderLaps();
    console.log('Stopwatch reset');
}

function recordLap() {
    console.log('Lap button clicked');
    if (paused) {
        const lapTime = formatTime(difference);
        laps.push(lapTime);
        console.log('Lap recorded:', lapTime);
        renderLaps();
        paused = false; // Reset paused flag after recording a lap
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    display.textContent = formatTime(difference);
}

function formatTime(ms) {
    const milliseconds = Math.floor((ms % 1000) / 10);
    const seconds = Math.floor((ms / 1000) % 60);
    const minutes = Math.floor((ms / (1000 * 60)) % 60);

    return `${pad(minutes, 2)}:${pad(seconds, 2)}:${pad(milliseconds, 2)}`;
}

function pad(number, length) {
    let str = '' + number;
    while (str.length < length) {
        str = '0' + str;
    }
    return str;
}

function renderLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${lap}`;
        lapsList.appendChild(li);
    });
    console.log('Laps rendered:', laps);
}

// Adding console log to confirm script is loaded
console.log('Script loaded successfully');

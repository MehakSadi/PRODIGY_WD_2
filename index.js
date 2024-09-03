let startTime, updatedTime, difference, tInterval;
let running = false;

const display = document.getElementById('display');
const lapsList = document.getElementById('laps');

document.getElementById('start').onclick = function() {
  if (!running) {
    startTime = new Date().getTime() - (difference || 0);
    tInterval = setInterval(updateTime, 1000);
    running = true;
  }
};

document.getElementById('pause').onclick = function() {
  if (running) {
    clearInterval(tInterval);
    difference = new Date().getTime() - startTime;
    running = false;
  }
};

document.getElementById('reset').onclick = function() {
  clearInterval(tInterval);
  display.innerHTML = "00:00:00";
  lapsList.innerHTML = "";
  difference = 0;
  running = false;
};

document.getElementById('lap').onclick = function() {
  if (running) {
    let lapTime = display.innerHTML;
    let li = document.createElement('li');
    li.innerHTML = lapTime;
    lapsList.appendChild(li);
  }
};

function updateTime() {
  updatedTime = new Date().getTime() - startTime;
  display.innerHTML = formatTime(updatedTime);
}

function formatTime(ms) {
  let seconds = Math.floor((ms / 1000) % 60);
  let minutes = Math.floor((ms / (1000 * 60)) % 60);
  let hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

  return (
    (hours < 10 ? "0" : "") + hours + ":" +
    (minutes < 10 ? "0" : "") + minutes + ":" +
    (seconds < 10 ? "0" : "") + seconds
  );
}

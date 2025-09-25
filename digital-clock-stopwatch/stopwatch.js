// In This the LocalStorage is active and also some windows shortcuts

let swStartTime = null;
let swElapsed = 0;
let swTimer = null;
let laps = [];

export function initStopwatch(){ 
    const display = document.getElementById("stopwatchDisplay");
    const startBtn = document.getElementById("swStartBtn");
    const stopBtn = document.getElementById("swStopBtn");
    const resetBtn = document.getElementById("swResetBtn");
    const lapBtn = document.getElementById("swLapBtn");
    const lapsContainer = document.getElementById("lapsContainer");

    // Load the laps from the localStorage 

 laps = JSON.parse(localStorage.getItem("laps")) || [];
 renderLaps();


 function pad(n, digits = 2) {
    return String(n).padStart(digits, "0");
}

function format(ms) {
    const h = Math.floor(ms / 3600000); // Hours
    const m = Math.floor((ms % 3600000) / 60000); // Minutes
    const s = Math.floor((ms % 60000) / 1000); // Seconds
    const msPart = Math.floor((ms % 1000) / 10); // Hundredths of a second
    return `${pad(h)}:${pad(m)}:${pad(s)}:${pad(msPart)}`;
}

function render(ms) {
    display.textContent = format(ms);
}

function renderLaps() {
    lapsContainer.innerHTML = laps.map((lap, i) => `<div class="lap"><span>Lap ${i + 1}</span>${format(lap)}</div>`).join("");
    localStorage.setItem("laps", JSON.stringify(laps));
}

 function start(){ 
    if(swTimer) return;
    swStartTime = performance.now();
    swTimer = setInterval(() =>{
        const now = performance.now();
        render(swElapsed + (now - swStartTime));
    }, 30);
    startBtn.disabled = true; stopBtn.disabled = false; resetBtn.disabled = true; lapBtn.disabled = false;
 }


 function stop(){ 
    if(!swTimer) return;
    clearInterval(swTimer);
    swTimer = null;
    swElapsed += performance.now() - swStartTime;
    swStartTime = null;
    render(swElapsed);
    startBtn.disabled = false; stopBtn.disabled = true; resetBtn.disabled = false; lapBtn.disabled = true;
 }

 function reset(){ 
    stop();
    swElapsed = 0; laps = [];
    render(0); renderLaps();
    resetBtn.disabled = true;
 }

 function lap(){ 
    const current = swElapsed + (swTimer ?performance.now()-swStartTime : 0);
    laps.unshift(current);
    renderLaps();
 }


//  All The Event Listeners...
startBtn.addEventListener("click", start);
stopBtn.addEventListener("click", stop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lap);



// Then The Keyboard Shortcut's..
document.addEventListener("keydown", (e) => { 
    if(e.code === "Space"){e.preventDefault(); swTimer? stop():start();}
    if(e.key.toLowerCase() === "1"){lap();}
    if(e.key.toLowerCase() === "r"){reset();}
});

// Init Display

render(swElapsed);
}
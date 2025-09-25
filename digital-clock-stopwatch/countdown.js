export function initCountdown() {
    // DOM elements
    const display = document.getElementById("countdownDisplay");
    const minInput = document.getElementById("cdMinutes");
    const secInput = document.getElementById("cdSeconds");
    const startBtn = document.getElementById("cdStartBtn");
    const pauseBtn = document.getElementById("cdPauseBtn");
    const resetBtn = document.getElementById("cdResetBtn");

    // Check for missing elements
    if (!display || !minInput || !secInput || !startBtn || !pauseBtn || !resetBtn) {
        console.error('One or more elements not found:', {
            display, minInput, secInput, startBtn, pauseBtn, resetBtn
        });
        return;
    }

    let remaining = 0;
    let timer = null;
    let lastTick = 0;
    let isPaused = false;

    function pad(n) {
        return String(n).padStart(2, "0");
    }

    function format(ms) {
        const total = Math.max(0, Math.floor(ms / 1000));
        const h = Math.floor(total / 3600);
        const m = Math.floor((total % 3600) / 60);
        const s = total % 60;
        return `${pad(h)}:${pad(m)}:${pad(s)}`;
    }

    function render() {
        display.textContent = format(remaining);
    }

    function start() {
        if (timer) return; // Prevent multiple timers
        if (!isPaused) { // Only set new time if not resuming
            const mins = Math.max(0, parseInt(minInput.value) || 0);
            const secs = Math.max(0, parseInt(secInput.value) || 0);
            remaining = (mins * 60 + secs) * 1000;
        }
        if (remaining <= 0) return; // Prevent starting with 0

        lastTick = performance.now();
        timer = setInterval(() => {
            const now = performance.now();
            remaining -= (now - lastTick);
            lastTick = now;
            if (remaining <= 0) {
                remaining = 0;
                render();
                stop();
                alert("⏰ Countdown Finished!");
            } else {
                render();
            }
        }, 200);
        startBtn.textContent = "Start";
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        resetBtn.disabled = false;
        isPaused = false;
    }

    function pause() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        startBtn.textContent = "Resume"; // Change to Resume when paused
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        resetBtn.disabled = false;
        isPaused = true;
    }

    function reset() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
        remaining = 0;
        minInput.value = "";
        secInput.value = "";
        startBtn.textContent = "Start";
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        resetBtn.disabled = true;
        isPaused = false;
        render();
    }

    // Event listeners
    startBtn.addEventListener("click", start);
    pauseBtn.addEventListener("click", pause);
    resetBtn.addEventListener("click", reset);

    // Initial render
    render();
}

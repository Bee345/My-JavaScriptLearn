// countdown.js
export function initCountdown() {
  // DOM
  const display = document.getElementById("countdownDisplay");
  const hrInput = document.getElementById("cdHours");
  const minInput = document.getElementById("cdMinutes");
  const secInput = document.getElementById("cdSeconds");
  const startBtn = document.getElementById("cdStartBtn");
  const pauseBtn = document.getElementById("cdPauseBtn");
  const stopBtn = document.getElementById("cdStopBtn");
  const resetBtn = document.getElementById("cdResetBtn");
  const alarmAudio = document.getElementById("cdAlarm");

  // Alarm controls
  const alarmControls = document.getElementById("alarmControls");
  const trackInfo = document.getElementById("trackTitle");
  const alarmStopBtn = document.getElementById("cdAlarmStopBtn");
  const alarmSnoozeBtn = document.getElementById("cdAlarmSnoozeBtn");
  const alarmSnooze20Btn = document.getElementById("cdAlarmSnooze20Btn");

  if (!display || !hrInput || !minInput || !secInput) {
    console.error("Countdown: missing input elements");
    return;
  }

  // State
  let state = "idle"; // idle | running | paused | finished
  let remaining = 0;
  let intervalId = null;
  let endTime = null;

  // Helpers
  const pad = n => String(n).padStart(2, "0");
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

  function updateUI() {
    startBtn.disabled = state === "running";
    pauseBtn.disabled = !(state === "running" || state === "paused");
    stopBtn.disabled = state === "idle";
    resetBtn.disabled = state === "idle";
    pauseBtn.textContent = state === "paused" ? "Resume" : "Pause";
  }

  // Tick
  function tick() {
    const now = performance.now();
    remaining = Math.max(0, endTime - now);
    if (remaining <= 0) {
      finishCountdown();
    }
    render();
  }

  // Finish
  function finishCountdown() {
    clearInterval(intervalId);
    intervalId = null;
    state = "finished";
    remaining = 0;
    render();
    updateUI();
    playAlarm();
  }

  // Start
  function start() {
    if (state === "running") return;

    if (state === "paused" && remaining > 0) {
      endTime = performance.now() + remaining;
      intervalId = setInterval(tick, 200);
      state = "running";
      updateUI();
      return;
    }

    const hrs = Math.max(0, Math.floor(Number(hrInput.value) || 0));
    const mins = Math.max(0, Math.floor(Number(minInput.value) || 0));
    const secs = Math.max(0, Math.floor(Number(secInput.value) || 0));

    remaining = (hrs * 3600 + mins * 60 + secs) * 1000;
    if (remaining <= 0) {
      alert("Set a duration greater than 0");
      return;
    }

    endTime = performance.now() + remaining;
    intervalId = setInterval(tick, 200);
    state = "running";
    updateUI();
  }

  function togglePause() {
    if (state === "running") {
      clearInterval(intervalId);
      intervalId = null;
      state = "paused";
      updateUI();
    } else if (state === "paused" && remaining > 0) {
      endTime = performance.now() + remaining;
      intervalId = setInterval(tick, 200);
      state = "running";
      updateUI();
    }
  }

  function stop() {
    clearInterval(intervalId);
    intervalId = null;
    state = "idle";
    remaining = 0;
    updateUI();
    render();
  }

  function reset() {
    stop();
    hrInput.value = "";
    minInput.value = "";
    secInput.value = "";
  }

  // Alarm playback
  function playAlarm() {
    if (!alarmAudio) return;
    try {
      alarmAudio.currentTime = 0;
      alarmAudio.loop = true; // keep ringing until stopped
      alarmAudio.play();
      trackInfo.textContent = alarmAudio.src.split("/").pop() || "Unknown Track";
      alarmControls.style.display = "block";
    } catch (e) {
      console.warn("Alarm playback failed", e);
    }
  }

  function stopAlarm() {
    if (alarmAudio) {
      alarmAudio.pause();
      alarmAudio.currentTime = 0;
      alarmAudio.loop = false;
    }
    alarmControls.style.display = "none";
  }

  function snooze(minutes) {
    stopAlarm();
    remaining = minutes * 60 * 1000;
    endTime = performance.now() + remaining;
    intervalId = setInterval(tick, 200);
    state = "running";
    updateUI();
  }

  // Events
  startBtn.addEventListener("click", start);
  pauseBtn.addEventListener("click", togglePause);
  stopBtn.addEventListener("click", stop);
  resetBtn.addEventListener("click", reset);

  alarmStopBtn.addEventListener("click", stopAlarm);
  alarmSnoozeBtn.addEventListener("click", () => snooze(10));
  alarmSnooze20Btn.addEventListener("click", () => snooze(20));

  render();
  updateUI();
}



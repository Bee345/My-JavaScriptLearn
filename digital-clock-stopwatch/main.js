import { initClock } from "./clock.js";
import { initStopwatch } from "./stopwatch.js";
import { initCountdown } from "./countdown.js";

document.addEventListener("DOMContentLoaded", () => { 
    initClock();
    initCountdown();
    initStopwatch();
});
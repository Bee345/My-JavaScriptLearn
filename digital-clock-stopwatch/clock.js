export function initClock(){ 
    const clockDisplay = document.getElementById("clockDisplay");
    const clockSub = document.getElementById("clockSub");

    function pad(n){ return String(n).padStart(2, "0");}

    function updateClock(){ 
        const now = new Date();
        clockDisplay.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
        clockSub.textContent = now.toLocaleDateString() + " - " + Intl.DateTimeFormat().resolvedOptions().timeZone;
    }

    updateClock();
    setInterval(updateClock, 1000);
}


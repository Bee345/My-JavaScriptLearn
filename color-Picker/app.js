const colorInput = document.getElementById("colorInput");
const randomBtn = document.getElementById("randomBtn");
const copyBtn = document.getElementById("copyBtn");
const resetBtn = document.getElementById("resetBtn");
const colorCode = document.getElementById("colorCode");
const historyContainer = document.getElementById("history");

let history = JSON.parse(localStorage.getItem("colorHistory")) || [];

// Apply The Color To The Background
function applyColor(){ 
    document.body.style.background = color;
    colorCode.textContent = color;
    colorInput.value = color;
    saveColor(color);
}

// Save The Colors In The Localstorage History;
function saveColor(color){ 
    if(history[0] !== color){ 
        history.unshift(color);
        if(history.length > 10) history.pop(); //Keeps The Last 10 colors
        localStorage.setItem("colorHistory", JSON.stringify(history));
        renderHistory();
    }
}

// Render History
function renderHistory(){ 
    historyContainer.innerHTML = "";
    history.forEach(col => { 
        const div = document.createElement("div");
        div.classList.add("history-color");
        div.style.background = col;
        div.title = col;
        div.addEventListener("click", () => applyColor(col));
        historyContainer.appendChild(div);
    });
}

// Generates Random HEX Color's

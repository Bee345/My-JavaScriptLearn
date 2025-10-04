const colorInput = document.getElementById("colorInput");
const randomBtn = document.getElementById("randomBtn");
const copyBtn = document.getElementById("copyBtn");
const resetBtn = document.getElementById("resetBtn");
const colorCode = document.getElementById("colorCode");
const historyContainer = document.querySelector(".history");

let history = JSON.parse(localStorage.getItem("colorHistory")) || [];

// Apply The Color To The Background
function applyColor(color){ 
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
    historyContainer.textContent = "";
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
function getRandomColor(){ 
    const letters = "0123456789ABCDEF";
    let color = "#";
    for(let i = 0; i < 6; i++){ 
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// All Event Listeners
colorInput.addEventListener("input", e => applyColor(e.target.value));
randomBtn.addEventListener("click", () => applyColor(getRandomColor()));
copyBtn.addEventListener("click", () => { 
    document.body.style.background = "";
    colorCode.textContent = "#ffffff";
});
resetBtn.addEventListener("click", () => { 
    document.body.style.background = "#ffffff";
});

// Initialize With The Last Saved Color
if(history.length > 0){ 
    applyColor(history[0])
}

renderHistory();
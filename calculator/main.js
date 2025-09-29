// Fixed calculator script
const display = document.getElementById("calcDisplay");
const buttons = document.querySelectorAll(".btn");
const themeToggle = document.getElementById("themeToggle");

// keep a single consistent var name
let darkMode = JSON.parse(localStorage.getItem("darkMode")) || false;
if (darkMode) {
  document.body.classList.add("dark");
  themeToggle.textContent = "☀️ Light Mode";
} else {
  themeToggle.textContent = "🌙 Dark Mode";
}

// Helper: check if a character is an operator (user-facing)
const isOperatorChar = ch => /[+\-×x*÷/%\/]/.test(ch);

// Update Display (prevents consecutive operators)
function updateDisplay(value) {
  if (!value) return;
  const last = display.value.slice(-1);

  // normalize some button values (optional):
  // if button provides '*' or '/', you can accept them directly;
  // if buttons provide '×' or '÷' that's fine too (we map later before eval).
  // Prevent two operators in a row (allow leading '-' for negative numbers)
  if (isOperatorChar(value)) {
    // allow leading minus
    if (display.value === "" && value !== "-") return;
    if (display.value !== "" && isOperatorChar(last)) {
      // allow replacing an operator (so user can change + to - quickly)
      // but do not allow sequences like "+*" etc.
      // Replace last operator with the new one (except when new is '-' and last is operator - allow it)
      if (value === "-" && last !== "-") {
        // allow minus after operator (e.g., "5 * -3")
        display.value += value;
        return;
      }
      // otherwise replace last operator with the new
      display.value = display.value.slice(0, -1) + value;
      return;
    }
  }

  display.value += value;
}

// Clear Display
function clearDisplay() {
  display.value = "";
}

// Delete last Char
function deleteChar() {
  display.value = display.value.slice(0, -1);
}

// Safe evaluate
function safeEvaluate(expr) {
  // map visible operators to JS operators
  let s = expr.replace(/×|x/g, "*").replace(/÷/g, "/");

  // convert percentages like 50% into (50/100)
  s = s.replace(/(\d+(\.\d+)?)%/g, "($1/100)");

  // allow only digits, operators, parentheses, decimal and whitespace
  if (!/^[0-9+\-*/().% \s]+$/.test(s)) {
    throw new Error("Invalid characters in expression");
  }

  // Evaluate in strict mode inside a Function (safer than eval)
  // We wrap in parentheses to allow expressions like "-5+3"
  // NOTE: This still performs math only (we validated allowed characters)
  return Function(`"use strict"; return (${s})`)();
}

// Calculate Result Safely
function calculate() {
  const expr = display.value.trim();
  if (!expr) return;
  try {
    const result = safeEvaluate(expr);
    // Convert special results (Infinity, NaN) into Error
    if (!isFinite(result) || Number.isNaN(result)) {
      display.value = "Error";
      return;
    }
    display.value = String(result);
  } catch (err) {
    display.value = "Error";
    console.warn("Calc error:", err);
  }
}

// Handle Button Clicks
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const action = btn.dataset.action;
    const value = btn.dataset.value;

    if (action === "clear") clearDisplay();
    else if (action === "delete") deleteChar();
    else if (action === "equals") calculate();
    else if (value) updateDisplay(value);
  });
});

// Keyboard Support
document.addEventListener("keydown", e => {
  // keep numbers
  if (/^[0-9]$/.test(e.key)) {
    updateDisplay(e.key);
    return;
  }

  // allowed operator/characters from keyboard
  const allowed = ["+", "-", "*", "/", "%", ".", "(", ")"];
  if (allowed.includes(e.key)) {
    // map keyboard '*' to '×' or just append '*' (we handle both)
    if (e.key === "*") updateDisplay("*");
    else updateDisplay(e.key);
    return;
  }

  if (e.key === "Enter") {
    e.preventDefault();
    calculate();
    return;
  }

  if (e.key === "Backspace") {
    deleteChar();
    return;
  }

  if (e.key === "Escape") {
    clearDisplay();
    return;
  }
});

// Theme Toggle
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  darkMode = document.body.classList.contains("dark");
  themeToggle.textContent = darkMode ? "☀️ Light Mode" : "🌙 Dark Mode";
  localStorage.setItem("darkMode", JSON.stringify(darkMode));
});

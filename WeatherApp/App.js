// This Below Is My OpenWeather API Key

const API_KEY = "f145d7f77497578716cf59eba7de5508";

// Fetching all My HTML Elements which i will use for Manipulation in JavaScript
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const geoBtn = document.getElementById("geoBtn");
const toggleThemeBtn = document.getElementById("toggleTheme");

const cityNameEl = document.getElementById("cityName");
const tempEl = document.getElementById("temperature");
const conditionEl = document.getElementById("condition");
const forecastEl = document.getElementById("forecast");

// Fetch Weather By The City Name...
async function fetchWeather(city){ 
    try{ 
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await res.json();
        if(data.cod !== 200) throw new Error(data.message);
        updateWeather(data);
        fetchForecast(data.coord.lat, data.coord.lon);
    } catch(err){ 
        alert("Error " + err.message);
    }
}

// Fetch 7-days Forecast
async function fetchForecast(lat, lon){ 
    try{ 
        const res = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${API_KEY}&units=metric`);
         if(!res.ok) {
             const data = await res.json();
             throw new Error(data.message)
         };
        const data = await res.json();

        updateForecast(data.daily);
    } catch(err){ 
        alert(err);
        console.log(err);
    }
}

// Update Weather UI
function updateWeather(data){ 
    cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
    tempEl.textContent = `${Math.round(data.main.temp)} °C`;
    conditionEl.textContent = data.weather[0].description;
}

// Update Forecast UI
function updateForecast(daily){ 
    forecastEl.innerHTML = "";
    daily.slice(1, 8).forEach(day => { 
        const div = document.createElement("div");
        div.classList.add("forecast-day");
        const date =new Date(day.dt * 1000);
        div.innerHTML = `
        <p>${date.toLocaleDateString("en-US", {Weekday: "short"})}</p>
        <p>${Math.round(day.temp.day)} °C</p>
        <p>${day.weather[0].main}</p>
        `;
        forecastEl.appendChild(div);
    })
}

// Search Button
searchBtn.addEventListener("click", () => { 
    const city = cityInput.value.trim();
    if(city) fetchWeather(city);
});

// Enter Key
cityInput.addEventListener("keypress", e => { 
    if(e.key === "Enter"){ 
        e.preventDefault();
        fetchWeather(cityInput.value.trim());
    }
});

// Geolocation
geoBtn.addEventListener("click", () => { 
    if(navigator.geolocation){ 
        navigator.geolocation.getCurrentPosition(pos => { 
            const {latitude, longitude} = pos.coords;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
            .then(res => res.json())
            .then(data => { 
                updateWeather(data);
                fetchForecast(latitude, longitude);
            });
        });
    } else{ 
        alert("Geolocation Not Supported");
    }
});

// Dark Mode Toggling
function setTheme(dark){ 
    if(dark){ 
        document.body.classList.add("dark");
        toggleThemeBtn.textContent = "☀️ Light Mode";
        localStorage.setItem("theme", "dark");
    } else{ 
        document.body.classList.remove("dark");
        toggleThemeBtn.textContent = "🌙 Dark Mode";
        localStorage.setItem("theme", "light");
    }
}
toggleThemeBtn.addEventListener("click", () => { 
    const isDark = document.body.classList.contains("dark");
    setTheme(!isDark);
});

// Load Saved Theme
if(localStorage.getItem("theme") === "dark") setTheme(true);

// Default City
fetchWeather("Toronto");

// Well Am Not done With this Project But i have to move on though I Still Have others to accomplish shaa
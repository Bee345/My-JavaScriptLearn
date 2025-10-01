// This Is The Arrays For My Quote's
const quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", author: "Walt Disney" },
  { text: "Don’t let yesterday take up too much of today.", author: "Will Rogers" },
  { text: "It’s not whether you get knocked down, it’s whether you get up.", author: "Vince Lombardi" },
  { text: "If you are working on something exciting, it will keep you motivated.", author: "Steve Jobs" },
  { text: "Success is not in what you have, but who you are.", author: "Bo Bennett" },
  {text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde"},
  {text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", author: "Ralph Waldo Emerson"},
  {text: "Life is about making an impact, not making an income.", author: "Kevin Kruse"},
  {text: "Whatever the mind of man can conceive and believe, it can achieve.", author: "Napoleon Hill"},
  {text: "Life is for the living. Death is for the dead. Let life be like music. And death a note unsaid.", author: "Langston Hughes"},
  {text: "The truth is death. You have to choose: death or lies. I've never been able to kill myself.", author: "Louis-Ferdinand Céline"},
  {text: "So it's true, when all is said and done, grief is the price we pay for love.", author: "Queen Elizabeth II"},
  {text: "Money does not buy you happiness, but lack of money certainly buys you misery", author: "Daniel Kahneman"},
  {text: "Wealth consists not in having great possessions, but in having few wants.", author: "Epictetus"},
  {text: "The single most powerful asset we all have is our mind. If it is trained well, it can create enormous wealth in what seems to be an instant.", author: "Robert Kiyosaki"},
  {text: "Bringing the gifts that my ancestors gave, I am the dream and the hope of the slave. I rise. I rise. I rise.", author: "Maya Angelou"},
  {text: "God gives nothing to those who keep their arms crossed.", author: "African Proverb"},
  {text: "It is a wild, beautiful, raw, dynamic place. That you have to see and experience for yourself. Here I am where I belong.", author: "Karen Blixen"}
];


// Getting The ID In All The HTML Structure I Created
const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const newQuoteBtn = document.getElementById("newQuote");
const copyBtn = document.getElementById("copyQuote");
const tweetBtn = document.getElementById("tweetQuote");
const toggleThemeBtn = document.getElementById("toggleTheme")

// Function To Generate A Random Quote either From the Local Quotes Or From the API
async function getRandomQuote(){ 
    try { 
        const res = await fetch("https://api.api-ninjas.com/v1/quotes", {
            headers:{
    "Content-Type": "application/json",
    "Accept": "application/json",
    // 👇 sometimes helpful
    "Access-Control-Allow-Origin": "*",  // but server must respect this
    "X-Api-Key" :"8gWgUThDTUbss9Q+65+vUQ==EleNngL9lZFmk6gE"
            }
        });
        console.log(res);
        if (!res.ok) throw new Error("API Error -- Unable To Get Quotes");

        const data = await res.json();
        // Parse the contents string into an array
        const parsed = JSON.parse(data.contents);
        const quote = parsed[0]; // ZenQuotes returns an array of 1 object

        quoteEl.textContent = `"${quote.q}"`;
        authorEl.textContent = `— ${quote.a}`;
    } catch(error) { 
        console.error("Quote API failed:", error);
        // Fallback To Local Array
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const randomQuote = quotes[randomIndex];
        quoteEl.textContent = `"${randomQuote.text}"`;
        authorEl.textContent = `— ${randomQuote.author}`;
    }
}

// For New Quote Generation
newQuoteBtn.addEventListener("click", getRandomQuote);


// For Coping Quotes To Clipboard
copyBtn.addEventListener("click", () => { 
    navigator.clipboard.writeText(`${quoteEl.textContent} ${authorEl.textContent}`);
    alert("Quote Copied To Clipboard!");
});

// For Tweeting the Quotes
tweetBtn.addEventListener("click", () => { 
    const tweetText = `${quoteEl.textContent} ${authorEl.textContent}`;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
    window.open(twitterUrl, "_blank");
});

// For the Dark Mode Of My Project
function setTheme(dark){ 
    if(dark){ 
       document.body.classList.add("dark");
       toggleThemeBtn.textContent = "☀️ Light Mode";
       localStorage.setItem("theme", "light");
    } else { 
        document.body.classList.remove("dark");
        toggleThemeBtn.textContent = "🌙 Dark Mode";
        localStorage.setItem("theme", "light");
    }
}

toggleThemeBtn.addEventListener("click", () => { 
    const isDark = document.body.classList.contains("dark");
    setTheme(!isDark);
})

// Load Saved theme
if(localStorage.getItem("theme") === "dark"){ 
    setTheme(true);
} else{ 
    setTheme(false);
}

// Load First Quote.
getRandomQuote();
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

// Function To Generate A Random Quote


// For New Quote Generation
newQuoteBtn.addEventListener("click", getRandomQuote);


// For Coping Quotes To Clipboard
copyBtn.addEventListener("click", () => { 
    navigator.clipboard.writeText(`${quoteEl.textContent} ${authorEl.textContent}`);
    alert("Quote Copied To Clipboard!");
});


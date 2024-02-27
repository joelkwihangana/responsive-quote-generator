// get quotes from the API
const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const tweetBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");

// Show Loading
const loading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

// Hide Loading
const complete = () => {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
};

// Backoff delay in milliseconds
const backoffDelay = 1000; // 1 second

async function getQuote() {
  loading();
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  try {
    const response = await fetch(proxyUrl + apiUrl);
    if (response.ok) {
      const data = await response.json();
      // If the author is blank, set it to 'Unknown'
      authorText.innerText = data.quoteAuthor || "Unknown";
      // Reduce the size for long text
      quoteText.innerText = data.quoteText;
      quoteText.classList.toggle("long-quote", data.quoteText.length > 120);
      complete();
    } else if (response.status === 429) {
      // Retry after backoff delay
      setTimeout(getQuote, backoffDelay);
    } else {
      throw new Error("Failed to fetch quote");
    }
  } catch (error) {
    console.error("Error generating quote:", error);
    quoteText.innerText = "Error generating quote!";
  }
}

// onload
getQuote();

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// Add event listeners to our buttons
newQuoteBtn.addEventListener("click", getQuote);
tweetBtn.addEventListener("click", tweetQuote);

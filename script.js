// get quotes from the API
const quoteContainer = document.querySelector("#quote-container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const tweetBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");

async function getQuote() {
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();
    //if the author is blank, then we neeed to set it to 'unknown'

    if (data.quoteAuthor == null || data.quoteAuthor == "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }
    // here we want to reduce the size for long text
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;
  } catch (error) {
    quoteText.innerText = "Error generating quote!";
  }
}

//onload
getQuote();

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

  window.open(twitterUrl, "_blank");
}

//add even listeners to our twitter buttons

newQuoteBtn.addEventListener("click", getQuote);

tweetBtn.addEventListener("click", tweetQuote);

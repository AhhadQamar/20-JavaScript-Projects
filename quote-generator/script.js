const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
let apiQuotes = [];
// Show New Quote
function newQuote() {
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Checking for NULL author
    if (quote.author == 'Anonymous') {
        authorText.textContent = 'Unknown'
    } else{
        authorText.textContent = quote.author;
    }
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
}


// Getting Quotes
async function getQuotes() {
const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
} catch (error) {  
}
}
// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}
// Event LIstenners
newQuoteButton.addEventListener('click',newQuote);
twitterButton.addEventListener('click',tweetQuote);
// Run On Load
getQuotes();
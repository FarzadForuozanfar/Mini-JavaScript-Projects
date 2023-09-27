//http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en, https://favqs.com/api/qotd, 
const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twittrBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');

let apiQuotes = [];

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function complete(){
    loader.hidden = true;
    quoteContainer.hidden = false;
}

function newQuote() {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    authorText.textContent = quote.author == 'type.fit' ? 'UnKnown' : quote.author.split(',')[0];
    complete();
}

function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            apiQuotes = data;
            newQuote();
            complete();
        })
        .catch(err => {
            alert(err);
        });
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

twittrBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', newQuote);

getQuotes();
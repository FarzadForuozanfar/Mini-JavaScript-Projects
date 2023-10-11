const SERVER_1 = {
    url: "https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en",
    id: "server-1"
};
const SERVER_2 = {
    url: "https://favqs.com/api/qotd",
    id: "server-2"
};

const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twittrBtn = document.querySelector('#twitter');
const newQuoteBtn = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');
const settingBtn = document.querySelector('#setting-btn');
const settingContetn = document.querySelector('.setting-content');
const radios = document.querySelectorAll('input[name="server"]');

let apiQuotes = [];

function loading() {
    loader.hidden = false;
    loader.style.display = 'block';
    quoteContainer.hidden = true;
    quoteContainer.style.display = 'none';
}

function complete() {
    loader.hidden = true;
    loader.style.display = 'none';
    quoteContainer.hidden = false;
    quoteContainer.style.display = 'block';
}

function newQuote(serverId = null) {
    serverId = !serverId ? Application.getServerApiOnLoaclStorage().id : serverId;
    const quote = serverId === SERVER_2.id ? { text: apiQuotes.quote.body, author: apiQuotes.quote.author } : { text: apiQuotes.quoteText, author: apiQuotes.quoteAuthor };
    if (quote.text.length > 50) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    authorText.textContent = quote.author == 'type.fit' ? 'UnKnown' : quote.author.split(',')[0];
}

function getQuotes(server) {
    loading();
    const apiUrl = server.url;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            apiQuotes = data;
            newQuote(server.id);
        })
        .catch(err => {
            setTimeout(() => {
                getQuotes(server);
            }, 5000);
            console.error(err);
            alert(err);
        });
    setTimeout(complete, 200)
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

function checkLocalStorage() {
    let server = getServerApiOnLoaclStorage();
    if (!server) {
        server = setServerApiOnLoaclStorage(SERVER_2);
    }
    return server;
}

function getServerApiOnLoaclStorage() {
    return JSON.parse(localStorage.getItem('server'));
}

function setServerApiOnLoaclStorage(server) {
    localStorage.setItem('server', JSON.stringify(server));
}
// Event Listeners
document.addEventListener("click", function (event) {
    if (!settingBtn.contains(event.target) && !settingContetn.contains(event.target) && !document.querySelector(".setting-content span").contains(event.target) && !document.querySelector("input").contains(event.target)) {
        settingContetn.classList.add('hidden');
    }
});
twittrBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', (e) => {
    getQuotes(getServerApiOnLoaclStorage());
});
settingBtn.addEventListener('click', (event) => {
    settingContetn.classList.toggle('hidden');
});
radios.forEach(radio => {
    radio.addEventListener('change', () => {
        if (radio.checked) {
            if (radio.id === SERVER_1.id) {
                setServerApiOnLoaclStorage(SERVER_1);
            }
            else if (radio.id === SERVER_2.id) {
                setServerApiOnLoaclStorage(SERVER_2);
            }
        }
    });
});
// End Event Listeners
getQuotes(checkLocalStorage());
document.getElementById(getServerApiOnLoaclStorage().id).checked = true;
const button = document.querySelector('#button');
const audioElement = document.querySelector('#audio');
const jokeText = document.querySelector('#joke');
const jokeContainer = document.querySelector('#joke-text-container');

let joke = '';

function toggleButton() {
    button.disabled = !button.disabled;
}

const tellMe = (joke) => {
    VoiceRSS.speech({
        key: 'cfd289e4cf1c4cffa47b13ed8e2eff39',
        src: joke,
        hl: 'en-us',
        v: 'Linda',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

const getJokes = () => {
    jokeContainer.hidden = true;
    fetch('https://geek-jokes.sameerkumar.website/api')
        .then(response => response.json())
        .then(data => {
            joke = data;
            tellMe(joke);
            toggleButton();
            jokeText.textContent = "";
        })
        .catch(err => console.log(err));
}

const writeJoke = () => {
    jokeContainer.hidden = false;
    let typed = new Typed('#joke', {
        strings: [joke],
        typeSpeed: 50,
        backSpeed: 20,
        loop: false
    });
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
audioElement.addEventListener('play', writeJoke);
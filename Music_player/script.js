// Dom Constant
const poster = document.querySelector('img');
const title = document.querySelector('#title');
const artist = document.querySelector('#artist');
const audioElement = document.querySelector('audio');
const playBtn = document.querySelector('#play');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const progressContainer = document.querySelector('#progress-container');
const progress = document.querySelector('#progress');
const currentTimeEl = document.querySelector('#current-time');
const durationEl = document.querySelector('#duration');

// variables
let isPlaynig = false;
let currentMusicIndex = 0;
const musics = [
    {
        displayName: 'Pirate Of Caribbean',
        name: 'pirate-of-caribbean',
        artist: 'Klaus Badelt, Hans Zimmer'
    },
    {
        displayName: 'Golden Autumn',
        name: 'Fariborz Lachini - 03- Autumn Was Lost In The Leaves',
        artist: 'Fariborz Lachini'
    },
    {
        displayName: 'Day One',
        name: 'Hans-Zimmer-Day-One',
        artist: 'Hans Zimmer'
    },
    {
        displayName: 'GoodBye Brother',
        name: 'ramin_djawadi_goodbye_brother',
        artist: 'Ramin Djawadi'
    },
];

// start Function
const playMusic = () => {
    audioElement.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    isPlaynig = true;
}

const pauseMusic = () => {
    audioElement.pause();
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    isPlaynig = false;
}

const loadMusic = (music) => {
    title.textContent = music.displayName;
    artist.textContent = music.artist;
    audioElement.src = `music/${music.name}.mp3`;
    poster.src = `images/${music.name}.jpg`;
}

const prevMusic = () => {
    currentMusicIndex--;
    if (currentMusicIndex < 0) {
        currentMusicIndex = musics.length - 1;
    }
    loadMusic(musics[currentMusicIndex]);
    playMusic();
}

const nextMusic = () => {
    currentMusicIndex++;
    if (musics.length == currentMusicIndex) {
        currentMusicIndex = 0;
    }
    loadMusic(musics[currentMusicIndex]);
    playMusic();
}

const updateProgressBar = (event) => {
    if (isPlaynig) {
        const { duration, currentTime } = event.srcElement;

        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`;
        }
        if (durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        const currentMinutes = Math.floor(currentTime / 60);
        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`;
        }
        if (currentSeconds){
            currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
        }
    }
}

const setProgressBar = (event) => {
    const width = event.target.offsetWidth;
    const clickX = event.offsetX;
    const { duration } = audioElement;
    audioElement.currentTime = (clickX / width) * duration;
}
// End Functions

// Event Listeners
playBtn.addEventListener('click', (event) => (isPlaynig ? pauseMusic() : playMusic()));
prevBtn.addEventListener('click', prevMusic);
nextBtn.addEventListener('click', nextMusic);
audioElement.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
audioElement.addEventListener('ended', nextMusic);

loadMusic(musics[currentMusicIndex]);

// Dom Constant
const poster = document.querySelector("img");
const title = document.querySelector("#title");
const artist = document.querySelector("#artist");
const audioElement = document.querySelector("audio");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const progressContainer = document.querySelector("#progress-container");
const progress = document.querySelector("#progress");
const currentTimeEl = document.querySelector("#current-time");
const durationEl = document.querySelector("#duration");
const toggleSwitch = document.querySelector("input[type='checkbox']");
const toggleIcon = document.getElementById("toggle-icon");
const repeatBtn = document.querySelector("#repeat");
const playlistBtn = document.querySelector("#playlistBtn");
const playlistContainer = document.querySelector(".playlist-container");

// variables
let isPlaynig = false;
let currentMusicIndex = 0;
let repeatMode = "all";

const musics = [
  {
    displayName: "Pirate Of Caribbean",
    name: "pirate-of-caribbean",
    artist: "Klaus Badelt, Hans Zimmer",
    duration: "5:07",
  },
  {
    displayName: "Golden Autumn",
    name: "Fariborz Lachini - 03- Autumn Was Lost In The Leaves",
    artist: "Fariborz Lachini",
    duration: "4:50",
  },
  {
    displayName: "Day One",
    name: "Hans-Zimmer-Day-One",
    artist: "Hans Zimmer",
    duration: "3:19",
  },
  {
    displayName: "GoodBye Brother",
    name: "ramin_djawadi_goodbye_brother",
    artist: "Ramin Djawadi",
    duration: "3:07",
  },
];

// start Function
const getRandomInt = (min, max) => {
  let random;
  do {
    min = Math.ceil(min);
    max = Math.floor(max);
    random = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (random == currentMusicIndex);

  return random;
};

const playMusic = () => {
  try {
    audioElement.play();
    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
    isPlaynig = true;
  } catch (err) {
    playMusic();
  }
};

const pauseMusic = () => {
  audioElement.pause();
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
  isPlaynig = false;
};

const loadMusic = (music) => {
  title.textContent = music.displayName;
  artist.textContent = music.artist;
  audioElement.src = `music/${music.name}.mp3`;
  poster.src = `images/${music.name}.jpg`;
};

const prevMusic = () => {
  currentMusicIndex--;
  if (currentMusicIndex < 0) {
    currentMusicIndex = musics.length - 1;
  }
  changeMusic(
    document.getElementById(`music-${currentMusicIndex}`),
    currentMusicIndex
  );
};

const nextMusic = (event) => {
  if (event.type == "ended") {
    if (repeatMode == "shuffle") {
      currentMusicIndex = getRandomInt(0, musics.length - 1);
    } else if (repeatMode == "one") {
      currentMusicIndex = currentMusicIndex;
    } else {
      currentMusicIndex++;
      if (musics.length == currentMusicIndex) {
        currentMusicIndex = 0;
      }
    }
  } else {
    currentMusicIndex++;
    if (musics.length == currentMusicIndex) {
      currentMusicIndex = 0;
    }
  }

  changeMusic(
    document.getElementById(`music-${currentMusicIndex}`),
    currentMusicIndex
  );
};

const updateProgressBar = (event) => {
  if (isPlaynig) {
    const { duration, currentTime } = event.srcElement;

    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = `0${durationSeconds}`;
    }
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = `0${currentSeconds}`;
    }
    if (currentSeconds) {
      currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
  }
};

const setProgressBar = (event) => {
  const width = event.target.offsetWidth;
  const clickX = event.offsetX;
  const { duration } = audioElement;
  audioElement.currentTime = (clickX / width) * duration;
};

const darkMode = () => {
  toggleIcon.children[0].textContent = "Dark Mode";
  toggleIcon.children[1].classList.replace("fa-sun", "fa-moon");
};

const lightMode = () => {
  toggleIcon.children[0].textContent = "Light Mode";
  toggleIcon.children[1].classList.replace("fa-moon", "fa-sun");
};

const changeRepeatMode = () => {
  switch (repeatMode) {
    case "all":
      repeatMode = "one";
      repeatBtn.classList.replace("fa-repeat", "fa-repeat-1");
      repeatBtn.title = "Repeat One";
      break;
    case "one":
      repeatMode = "shuffle";
      repeatBtn.classList.replace("fa-repeat-1", "fa-shuffle");
      repeatBtn.title = "Shuffle";
      break;
    case "shuffle":
      repeatMode = "all";
      repeatBtn.classList.replace("fa-shuffle", "fa-repeat");
      repeatBtn.title = "Repeat All";
      break;
  }
};

const loadPlaylist = () => {
  musics.forEach((music, index) => {
    let element = `
        <div id="music-${index}" onclick="changeMusic(this, ${index})" class="music p-1">
          <img src="images/${music.name}.jpg" title="${music.name}" alt="${music.name}">
          <div class="ml-2 w-100 flex items-center justify-between">
              <div class="max-w-90">
                  <h5 class="title mb-1">${music.displayName}</h5>
                  <h6 class="author">${music.artist}</h6>
              </div>
              <div id="music-wave-${index}" class="wave-music flex items-center d-none">
                  <div class='sound-wave'>
                      <div class='bar'></div>
                      <div class='bar'></div>
                      <div class='bar'></div>
                      <div class='bar'></div>
                      <div class='bar'></div>
                      <div class='bar'></div>
                      <div class='bar'></div>
                      <div class='bar'></div>
                      <div class='bar'></div>
                  </div>
              </div>
              <div class="flex items-center">
                  <div>
                      <span>${music.duration}</span>
                  </div> 
              </div>
          </div>
        </div>
        `;
    playlistContainer.innerHTML += element;
  });
};

const changeMusic = (music, index, play = true) => {
  const allWaveContainers = document.querySelectorAll(".wave-music");
  allWaveContainers.forEach((item) => {
    if (!item.classList.contains("d-none")) {
      item.classList.add("d-none");
    }
  });
  document
    .querySelectorAll(".active")
    .forEach((element) => element.classList.remove("active"));
  music.classList.add("active");
  const currentWaveContainer = document.getElementById(`music-wave-${index}`);
  currentWaveContainer.classList.remove("d-none");
  currentMusicIndex = index;
  loadMusic(musics[currentMusicIndex]);
  if (play) {
    playMusic();
  }
};
// End Functions

// Event Listeners
playBtn.addEventListener("click", (event) =>
  isPlaynig ? pauseMusic() : playMusic()
);
prevBtn.addEventListener("click", prevMusic);
nextBtn.addEventListener("click", nextMusic);
audioElement.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
audioElement.addEventListener("ended", nextMusic);
repeatBtn.addEventListener("click", changeRepeatMode);
toggleSwitch.addEventListener("change", (event) => {
  if (event.target.checked) {
    document.documentElement.setAttribute("data-theme", "dark");
    darkMode();
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    lightMode();
    localStorage.setItem("theme", "light");
  }
});
playlistBtn.addEventListener("click", () =>
  playlistContainer.classList.toggle("d-none")
);
// Load Theme
const currentTheme = localStorage.getItem("theme");
if (currentTheme) {
  document.documentElement.setAttribute("data-theme", currentTheme);

  if (currentTheme === "dark") {
    toggleSwitch.checked = true;
    darkMode();
  }
}

loadPlaylist();
loadMusic(musics[currentMusicIndex]);
setTimeout(() => {
  changeMusic(
    document.getElementById(`music-${currentMusicIndex}`),
    currentMusicIndex,
    false
  );
}, 300);

window.addEventListener("load", () => {
  const bar = document.querySelectorAll(".bar");
  for (let i = 0; i < bar.length; i++) {
    bar.forEach((item) => {
      item.style.animationDuration = `${Math.random() * (0.7 - 0.2) + 0.2}s`;
    });
  }
});

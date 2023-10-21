const player = document.querySelector('.player');
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const speed = document.querySelector('.player-speed');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen');

let lastVolume = 1;
let fullscreen = false;

function openFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    /* Firefox */
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    /* Chrome, Safari and Opera */
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    /* IE/Edge */
    element.msRequestFullscreen();
  }
  video.classList.add('video-fullscreen');
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    /* Firefox */
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE/Edge */
    document.msExitFullscreen();
  }
  video.classList.remove('video-fullscreen');
}

const toggleFullscreen = () => {
  if (fullscreen){
    closeFullscreen();
  }
  else{
    openFullscreen(player);
  }

  fullscreen = !fullscreen;
}

const changeSpeed = (event) => {
  video.playbackRate = event.target.value;
}

const setVolumeIcon = (volume) => {
  if (volume > 0.7) {
    volumeIcon.classList.add('fas', 'fa-volume-up');
  }
  else if (volume < 0.7 && volume > 0) {
    volumeIcon.classList.add('fas', 'fa-volume-down');
  }
  else {
    volumeIcon.classList.add('fas', 'fa-volume-off');
  }
}

const changeVolume = (event) => {
  let volume = event.offsetX / volumeRange.offsetWidth;
  if (volume < 0.1) {
    volume = 0;
  }
  else if (volume > 0.9) {
    volume = 1;
  }
  volumeBar.style.width = `${volume * 100}%`;
  video.volume = volume;
  volumeIcon.className = '';

  setVolumeIcon(volume);

  lastVolume = volume;
}

const toggleMute = () => {
  volumeIcon.className = '';
  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeBar.style.width = 0;
    volumeIcon.title = 'UnMute';
    volumeIcon.classList.add('fas', 'fa-volume-mute');
  }
  else {
    video.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
    volumeIcon.title = 'Mute';
    setVolumeIcon(video.volume);
  }
}

const playVideo = () => {
  video.play();
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'play');
}

const pauseVideo = () => {
  video.pause();
  showPlayIcon();
}
const setProgress = (event) => {
  const width = event.target.offsetWidth;
  const clickX = event.offsetX;
  video.currentTime = (clickX / width) * video.duration;
  updateProgress();
  if (video.paused) {
    playVideo();
  }
}

const displayTime = (time) => {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${seconds}`;
}

const updateProgress = () => {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}% `;
  currentTime.textContent = displayTime(video.currentTime);
  duration.textContent = displayTime(video.duration);
}

const showPlayIcon = () => {
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'pause');
}

const togglePlay = () => {
  if (video.paused) {
    playVideo();
  }
  else {
    pauseVideo();
  }
}

playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('ended', showPlayIcon);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress)
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('change', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);
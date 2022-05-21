const musicContainer = document.getElementById('music-container');

const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

//song titles. must match up with mp3 and jpg file names
const songs = ['like-that', 'sunny-days', 'gunpowder-tea'];

//keep track of song
let songIndex = 0;

//load song details into DOM
loadSong(songs[songIndex]);

//play song
function playSong() {
    musicContainer.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}

//pause song
function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');

    audio.pause();
}

//go to previous song. decreases song index then loads
function prevSong() {
    songIndex--;

    if(songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

//go to previous song. increases song index then loads
function nextSong() {
    songIndex++;

    if(songIndex >= songs.length) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}

//update progress bar
function updateProgress(event) {
    const {duration, currentTime} = event.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`
}

//set progress bar with a click to specify specific point in song
function setProgress(event) {
    // total width of progress bar element
    const width = this.clientWidth;
    // grabs offsetX from where click event occurred
    const clickX = event.offsetX;
    // total duration of current loaded song
    const duration = audio.duration;

    //sets the current time of the song
    audio.currentTime = (clickX / width) * duration;
}

//update song details
function loadSong(song) {
    title.innerText = song
    audio.src = `music/${song}.mp3`;
    cover.src = `img/${song}.jpg`;
}

//event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');

    if(isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

//change song
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

//time/song update
audio.addEventListener('timeupdate', updateProgress);

// click on progress bar
progressContainer.addEventListener('click', setProgress);

// automatically continues to the next song after current song ends
audio.addEventListener('ended', nextSong);
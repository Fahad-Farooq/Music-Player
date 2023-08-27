let musicPlayerContainer = document.getElementById("music-player");
let playBtn = document.getElementById("play");
let playIcon = document.getElementById("play-icon")
let previousBtn = document.getElementById("previous");
let nextBtn = document.getElementById("next");
let skipForward = document.getElementById("forward");
let skipBackward = document.getElementById("backward");
let repeatBtn = document.getElementById("repeat");
let volumeBtn = document.getElementById("volume-btn");
let volumeSlider = document.getElementById("volume-slider");
let volumePanel = document.getElementById("volume-panel");
let volumeLvl = document.getElementById("volume-level");
let volumeIcon = document.getElementById("volume-icon");
let progressBar = document.getElementById("progress-bar");
let progress = document.getElementById("progress")
let coverImg = document.getElementById("cover-image");
let trackTitle = document.getElementById("track-title");
let trackAuthor = document.getElementById("track-author");
let currentTime = document.getElementById("current-time");
let totalTime = document.getElementById("total-time");
let trackIndex = 0;
let buttons = document.getElementById("btn");

// Tracks
let tracksList = [
    {name: "Mortals (feat. Laura Brehm)", author: "Warriyo", path: "songs/1.mp3", cover: "image/1.jpg"},
    {name: "Huma-Huma", author: "Cielo", path: "songs/2.mp3", cover: "image/2.jpg"},
    {name: "Invincible", author: "DEAF KEV", path: "songs/3.mp3", cover: "image/3.jpg"},
    {name: "My Heart", author: "Different Heaven & EH!DE", path: "songs/4.mp3", cover: "image/4.jpg"},
    {name: "Heroes Tonight (feat. Johnning)", author: "Janji", path: "songs/5.mp3", cover: "image/5.jpg"},
]
let track = new Audio (tracksList[trackIndex].path)

// Track Play Function 
let trackPlay = () => {
    if (track.paused || track.currentTime <= 0) {
        track.play()
        playIcon.classList.remove("fa-play")
        playIcon.classList.add("fa-pause")
    }
    else {
        track.pause()
        playIcon.classList.remove("fa-pause")
        playIcon.classList.add("fa-play")
    }
}

// Play Button
playBtn.addEventListener('click', () => {
    trackPlay();
})
window.addEventListener('keydown', (e) => {
    e.preventDefault();
    if (e.key === ' ') {
        trackPlay()
    }
})

// Next Track Function
let nextTrack = () => {
    if (trackIndex >= 4) {
        trackIndex = 0
    }
    else {
        trackIndex += 1
    }
    track.src = `songs/${trackIndex + 1}.mp3`
    infoUpdate()
    trackPlay()
}

nextBtn.addEventListener('click' , () => {
    nextTrack()
})

// Previous Track Function 
previousBtn.addEventListener('click' , () => {
    if (trackIndex > 0) {
        trackIndex -= 1;
    }
    else {
        trackIndex = tracksList.length - 1;
    }
    track.src = `songs/${trackIndex + 1}.mp3`
    infoUpdate()
    trackPlay()
})

// Skip Forward
skipForward.addEventListener('click', () => {
    track.currentTime += 10;
})
window.addEventListener('keydown', (e) => {
    e.preventDefault();
    if (e.key === 'ArrowRight') {
        track.currentTime += 10;
    }
})

// Skip Backward
skipBackward.addEventListener('click', () => {
    track.currentTime -= 10;
})
window.addEventListener('keydown', (e) => {
    e.preventDefault();
    if (e.key === 'ArrowLeft') {
        track.currentTime -= 10;
    }
})

// ProgressBar Update
track.addEventListener('timeupdate', () => {
    let trackProgressPercent = track.currentTime / track.duration * 100;
    progress.style.width = `${trackProgressPercent}%`
})

// ProgressBar Input
progressBar.addEventListener('click', (e) => {
    track.currentTime =  (e.offsetX / progressBar.clientWidth) * track.duration;
    if (track.paused || track.currentTime <= 0) {
        track.play()
        playIcon.classList.remove("fa-play")
        playIcon.classList.add("fa-pause")
    }
    infoUpdate()
})

// Volume Panel Visible

let volumePanelVisible = () => {
    volumePanel.style.opacity = "1"
    volumePanel.style.visibility = "visible"
}

// Volume Panel Hidden
let volumePanelHidden = () => {
    volumePanel.style.opacity = "0"
    volumePanel.style.visibility = "hidden"
}

// Volume Panel & Control
volumeBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    
    if (volumePanel.style.visibility == "visible" && volumePanel.style.opacity == "1") {
        volumePanelHidden();
    } else {
        volumePanelVisible();
    }
});

document.addEventListener('click', (event) => {
    if (!volumePanel.contains(event.target) && event.target !== volumeBtn) {
        volumePanelHidden();
    }
});

// Volume Control 
volumeSlider.addEventListener('input', (e) => {
    track.volume = e.target.value / 100;
    if (volumeSlider.value < 10) {
        volumeLvl.innerHTML = `0${Math.floor(track.volume * 100)}%`;
    }
    else {
        volumeLvl.innerHTML = `${Math.floor(track.volume * 100)}%`;
    }

    if (volumeSlider.value > 50) {
    volumeIcon.className = "fa-solid fa-volume-high";
    }
    else if (volumeSlider.value === "0") {
    volumeIcon.className = "fa-solid fa-volume-mute";
    }
    else {
    volumeIcon.className = "fa-solid fa-volume-low";
    }
})

// Update Track Info
let infoUpdate = () => {
    trackTitle.innerText = tracksList[trackIndex].name;
    trackAuthor.innerText = tracksList[trackIndex].author;
    coverImg.src = tracksList[trackIndex].cover;
}

// Song Next Or Repeat
track.addEventListener('ended', () => {
    if (track.loop) {
        track.loop()
    }
    else {
        nextTrack()
    }
})

// Song Ended Repeat Function
repeatBtn.addEventListener('click', () => {
    if (!track.loop) {
        track.loop = true
        repeatBtn.classList.add("active")
    }
    else {
        track.loop = false
        repeatBtn.classList.remove("active")
    }
})

// Update Song Time
let timeUpdate = () => {
    let currMin = Math.floor(track.currentTime / 60)
    let currSec = Math.floor(track.currentTime - currMin * 60)
    let durarMin = Math.floor(track.duration / 60)
    let duraSec = Math.floor(track.duration - durarMin * 60)

    if (track.duration){
        if (currMin < 10) {
            currMin = `0${currMin}`
        }
        if (currSec < 10) {
            currSec = `0${currSec}`
        }
        if (durarMin < 10) {
            durarMin = `0${durarMin}`
        }
        if (duraSec < 10) {
            duraSec = `0${duraSec}`
        }

        currentTime.innerHTML = `${currMin}:${currSec}`
        totalTime.innerHTML = `${durarMin}:${duraSec}`    
    }
    else {
        currentTime.innerHTML = `00:00`
        totalTime.innerHTML = `00:00`
    }
}

// Song Time Update Function
track.addEventListener('timeupdate', timeUpdate)

// Song Loaded
let trackLoaded = () => {
    infoUpdate()
}
window.onload = trackLoaded();







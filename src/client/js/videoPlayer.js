const video = document.querySelector("video");
const  playBtn = document.getElementById("play");
const  muteBtn = document.getElementById("mute");
const  currenTime = document.getElementById("currenTime");
const  totalTime = document.getElementById("totalTime");
const  volumeRange = document.getElementById("volume");
const timeLine = document.getElementById("timeLine");

let volumeValue = 0.5;
video.volume = volumeValue;

const handlePlayClick = (e) =>{
    if(video.paused){   //play라는버튼이눌렀을때(addEvent) video가멈춰져있다면
        video.play();
    } else{
        video.pause();
    }
    playBtn.innerText = video.paused ? "Play" : "Pause";
}

const handleMute = (e) =>{
    muteBtn.innerText = !video.muted ? "UnMute" : "Mute";   //글자먼저바꾸고 음소거 시키기
    if(!video.muted){
        video.muted=true;
    }else{
        video.muted=false;
    }

    volumeRange.value = video.muted ? 0 : volumeValue;      //표시되는 볼륨
}

const handleVolumeChange = (event) => {
    const {
        target : { value },
    } = event;
    if(video.muted){
        video.muted=false;
        muteBtn.innerText="Mute";
    }
    volumeValue = value;
    video.volume = value;               //실제볼륨
}



const handlePlay = (e) => playBtn.innerText="Play";
const handlePause = (e) => playBtn.innerText="Pasue";

const formatTime = (seconds) => {
    return new Date(seconds*1000).toISOString().substr(11, 8);
}
const handleMetaData = () => {
    totalTime.innerText = formatTime(Math.floor(video.duration));
    timeLine.max=video.duration;
}
const handleTimeUpdate = () => {
    currenTime.innerText = formatTime(Math.floor(video.currentTime));
    timeLine.value=video.currentTime;
}
const handleTimeLineChange = (event) => {
    const { 
        target : { value },
    } = event;
    video.currentTime=value;
}

playBtn.addEventListener("click", handlePlayClick);
muteBtn.addEventListener("click", handleMute);
volumeRange.addEventListener("input", handleVolumeChange);
video.addEventListener("loadedmetadata", handleMetaData);
video.addEventListener("timeupdate", handleTimeUpdate);
timeLine.addEventListener("input", handleTimeLineChange);
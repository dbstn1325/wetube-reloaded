const startBtn = document.getElementById("startBtn");
const preview = document.getElementById("preview");

let stream;
let recorder;
let videoSrc;

const handleDownloadBtn = () => {
    const a = document.createElement("a");
    a.href=videoSrc;
    a.download="MyRecording.webm";
    document.body.appendChild(a);
    a.click();
}

const handleStopBtn = () => {
    startBtn.innerText = "Download Record";
    
    recorder.stop();    
    startBtn.removeEventListener("click", handleStopBtn);
    startBtn.addEventListener("click", handleDownloadBtn);
    
}

const handleStartBtn = () =>{
    startBtn.innerText = "Stop Recording";

    recorder = new MediaRecorder(stream);
    recorder.ondataavailable = (e) => {
        videoSrc = URL.createObjectURL(e.data);
        preview.src = videoSrc;
        preview.srcObject = null;
        preview.loop = true;
        preview.play();
    };

    recorder.start();
    startBtn.removeEventListener("click", handleStartBtn);
    startBtn.addEventListener("click", handleStopBtn);
    
}

const init = async() =>{
    stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 100, height: 200},
        audio: true,
    });
    preview.srcObject = stream;
    preview.play();
}

init();

startBtn.addEventListener("click", handleStartBtn);

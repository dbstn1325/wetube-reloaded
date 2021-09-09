const startBtn = document.getElementById("startBtn");

const handleStartBtn = async() =>{
    const stream = await navigator.mediaDevices.getUserMedia({
        video:true,
        audio:true
    });
    console.log(stream);
}

startBtn.addEventListener("click", handleStartBtn);
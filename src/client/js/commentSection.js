const form = document.getElementById("commentForm");

const videoContainer = document.getElementById("videoContainer");

const handleSubmit = (event) => {
    const textarea = form.querySelector("textarea");
    const formBtn = form.querySelector("button");

    event.preventDefault();
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;
    
    fetch(`/api/videos/${videoId}/comment`,{
        method : "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body : JSON.stringify({ text : "clork", age:"23" }),
    });
    
}
if(form){
    form.addEventListener("submit", handleSubmit);
}


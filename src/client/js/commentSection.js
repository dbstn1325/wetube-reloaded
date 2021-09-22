const form = document.getElementById("commentForm");

const videoContainer = document.getElementById("videoContainer");

const handleSubmit = async(event) => {
    const textarea = form.querySelector("textarea");
    const formBtn = form.querySelector("button");

    event.preventDefault();
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;
    
    if(text==""){
        return ;
    }
    await fetch(`/api/videos/${videoId}/comment`,{
        method : "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body : JSON.stringify({ text : text }),
    });

    textarea.value="";
    window.location.reload();

    
}
if(form){
    form.addEventListener("submit", handleSubmit);
}


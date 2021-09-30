import { text } from "express";
import Video from "../../models/Video";

const form = document.getElementById("commentForm");

const videoContainer = document.getElementById("videoContainer");


const trashIcon = document.createElement("i");

const addComment = (text) =>{
    const videoComment=document.querySelector(".video__comments ul");
    const li = document.createElement("li");
    const i = document.createElement("i");
    const span = document.createElement("span");
    
    
    i.className="class fas fa-comments";
    trashIcon.className="class fas fa-trash-alt";
    li.className="video__comment";
    span.innerText = `${text}`;
    li.appendChild(i);
    li.appendChild(span);
    li.appendChild(trashIcon);
    
    videoComment.prepend(li);

    console.log(videoComment);

}

const handleSubmit = async(event) => {
    const textarea = form.querySelector("textarea");
    const formBtn = form.querySelector("button");

    event.preventDefault();
    const text = textarea.value;
    const videoId = videoContainer.dataset.id;
    
    
    
    if(text==""){
        return ;
    }

    const response = await fetch(`/api/videos/${videoId}/comment`,{
        method : "POST",
        headers: {
          "Content-Type" : "application/json",
        },
        body : JSON.stringify({ text : text }),
    });
    textarea.value="";
    const status = response.status;
    if(status=='201'){
        addComment(text);
    }
    
    //window.location.reload();

    
}

const handleDelete = async(event) => {
    const videoId=videoContainer.dataset.id;
    
    await fetch(`/api/videos/${videoId}/deleteComment`,{
        method:"POST",
        body:text,
    });
    
    
    
}
if(form){
    form.addEventListener("submit", handleSubmit);
    trashIcon.addEventListener("click", handleDelete);
}


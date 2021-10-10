const form = document.getElementById("commentForm");

const videoContainer = document.getElementById("videoContainer");




const addComment = (text, commentId) =>{
    const videoComment=document.querySelector(".video__comments ul");
    const li = document.createElement("li");
    const i = document.createElement("i");
    const span = document.createElement("span");
    const trashIcon = document.createElement("i");
    

    // const span2 = dcoument.createElement("span2");
    
    i.className="class fas fa-comments";
    trashIcon.className="class fas fa-trash-alt";
    li.className="video__comment";
    li.dataset.id = commentId;

    span.innerText = `${text}`;
    li.appendChild(i);
    li.appendChild(span);
    li.appendChild(trashIcon);
    
    videoComment.prepend(li);
    trashIcon.addEventListener("click", handleDelete);
    // console.log(videoComment);
}
const handleDelete = async(event) =>{
    const videoComment = document.querySelector(".video__comments ul");
    li=event.currentTarget.parentNode;
    commentId=li.dataset.id

    videoComment.removeChild(li);
    await fetch(`/api/${commentId}/comment`,{
        method:"DELETE",
    });
    
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
    
    
    if(status==201){
        const json=await response.json();
        addComment(text, json.commentId);
        
    }
    
    //window.location.reload();

    
}

if(form){
    form.addEventListener("submit", handleSubmit);
}


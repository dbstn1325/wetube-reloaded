import Video from "../models/Video";

export const home = async(req, res) => {
    const videos = await Video.find({});
    return res.render("home", { pageTitle: "Home", videos});
}


export const watch = async(req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if(!video){
        return res.render("404", {pageTitle : 'Video is not found'});
    }
    return res.render("watch", {pageTitle : video.title, video});
    //res.send(`Watch Video #${req.params.id}`);
}

export const getEdit = async(req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if(!video){
        return res.render("404", {pageTitle: "Video is not found"});
    }
    return res.render("edit", {pageTitle : `Edit : ${video.title}`, video});
}

export const postEdit = async(req, res) => {
    const { id } = req.params;
    const {title, description, hashtags} = req.body;
    
    const video = await Video.findById(id);

    video.title=title;
    video.description=description;
    video.hashtags=hashtags.split(",").map((word)=>(word.startsWith("#") ? word : `#${word}`));

    await video.save();
    
    return res.redirect(`/videos/${id}`);
}


export const search = (req, res) => res.send("Search Video");


export const getUpload = (req, res) => res.render("upload");

export const postUpload = async(req, res) => {
    const { title, description, hashtags } = req.body;
    const user_id = req.query.id;
    try{
        await Video.create({
            title,
            description,
            hashtags:hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`)),
            //_id : user_id, , {_id: user_id}
        });
        //await video.save();       <-- new Video({  }) ( Video.create() )사용안할때
        return res.redirect("/");
    }catch(error){
        console.log(error);
        return res.render("upload", {
            pageTitle:"Upload Video",
            errorMessage:error._message,
        });
    }

};


export const deleteVideo = (req, res) => res.send("Delete Video");
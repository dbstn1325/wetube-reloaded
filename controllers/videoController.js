import Video from "../models/Video";

export const home = async(req, res) => {
    const videos = await Video.find({});
    return res.render("home", { pageTitle: "Home", videos});
}


export const watch = async(req, res) => {
    const video = await Video.find({});
    res.render("watch", { pageTitle: `you Watching ${video.title}`, video});
    //res.send(`Watch Video #${req.params.id}`);
}

export const getEdit = async(req, res) => {
    const video = await Video.find({});
    res.render("edit", {pageTitle: "Edit", video});
}

export const postEdit = async(req, res) => {
    const video = await Video.find({});
    const { title } = req.body;
    const user_id = req.query.id;
    /*videos[user_id-1].title=title;*/
    res.render(`/videos/${user_id}`, video);
}


export const search = (req, res) => res.send("Search Video");


export const getUpload = (req, res) => res.render("upload");

export const postUpload = async(req, res) => {
    const { title, description, hashtags } = req.body;
    const user_id = req.query.id;
        try{ await Video.create({
            title,
            description,
            createdAt: Date.now(),
            hashtags:hashtags.split(",").map(word=>`#${word}`),
            meta:{
                views:0,
                rating:0,
            },
            _id : user_id,
        });
        
        //await video.save();
        return res.redirect("home", {_id: user_id});
    }catch(error){
        res.render("upload", {
            pageTitle:"Upload Video",
            errorMessage:error._Message
        })
    }

};


export const deleteVideo = (req, res) => res.send("Delete Video");
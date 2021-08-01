import Video from "../models/Video";

export const home = async(req, res) => {
    const videos = await Video.find({});
    return res.render("home", { pageTitle: "Home", videos});
}


export const watch = (req, res) => {
    const { id } = req.params;
    const video=videos[id-1];
    res.render("watch", { pageTitle: `you Watching ${video.title}`, video});
    //res.send(`Watch Video #${req.params.id}`);
}

export const getEdit = (req, res) => {
    const { id } = req.params;
    res.render("edit", {pageTitle: "Edit"});
}

export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    videos[id-1].title=title;
    res.redirect(`/videos/${id}`);
}


export const search = (req, res) => res.send("Search Video");


export const getUpload = (req, res) => res.render("upload");

export const postUpload = async(req, res) => {
    const { title, description, hashtags } = req.body;
    const { id } = req.params;
    await Video.create({
        title,
        description,
        createdAt: Date.now(),
        hashtags:hashtags.split(",").map(word=>`#${word}`),
        meta:{
            views:0,
            rating:0,
        },
    });
    console.log(id);
    //await video.save();
    return res.redirect("/");
};


export const deleteVideo = (req, res) => res.send("Delete Video");
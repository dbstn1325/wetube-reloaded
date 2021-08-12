import Video from "../models/Video";

export const home = async(req, res) => {
    const videos = await Video.find({});
    return res.render("home", { pageTitle: "Home", videos});
}


export const watch = async(req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    res.render("watch", { pageTitle: video.title, video});
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
    try{
        await Video.create({
            title,
            description,
            hashtags:hashtags.split(",").map(word=>`#${word}`),
            //_id : user_id, , {_id: user_id}
        });
        //await video.save();
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
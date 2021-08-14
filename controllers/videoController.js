import Video from "../models/Video";
import { modifyHashtags } from "../models/Video";

export const home = async(req, res) => {
    const videos = await Video.find({}).sort({createdAt:"desc"});
    return res.render("home", { pageTitle: "Home", videos});
}


export const watch = async(req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    if(!video){
        return res.render("404", {pageTitle : 'Video is not found'});
    }
    return res.render("watch", {pageTitle : video.title, video });
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
    
    const video = await Video.exists({ _id:id});
    
    if(video){
        await Video.findByIdAndUpdate(id, {
            title,
            description,
            hashtags:Video.modifyHashtags(hashtags),
        });
        return res.redirect(`/videos/${id}`);
    };
    return res.render("404", {pageTitle:`The process is false`});
    
    
}


export const getSearch = async(req, res) => {
    let videos=[]
    res.render("search", { pageTitle:`Search For `, videos});
}

export const postSearch = async(req,res) =>{
    const { keyword } = req.body;
    let videos=[];
    if(keyword){
        videos = await Video.find({title : {$regex:new RegExp(keyword, "i")} });
    }
    res.render("search", { pageTitle:`Search For : ${keyword}`, videos}); 
}


export const getUpload = (req, res) => res.render("upload");

export const postUpload = async(req, res) => {
    const { title, description, hashtags } = req.body;
    const { id } = req.params;
    
    try{
        await Video.create({
            title,
            description,
            hashtags:Video.modifyHashtags(hashtags)
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


export const getDelete = async(req, res) => {
    const { id } = req.params;
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
};
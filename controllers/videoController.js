import Video from "../models/Video";
import User from "../models/User";
import { modifyHashtags } from "../models/Video";
import { Mongoose } from "mongoose";

export const home = async(req, res) => {
    const videos = await Video.find({}).sort({createdAt:"desc"}).populate("owner");
    return res.render("home", { pageTitle: "Home", videos});
}

export const watch = async(req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id).populate("owner");
    
    if(!video){
        return res.render("404", {pageTitle : 'Video is not found'});
    }
    return res.render("watch", {pageTitle : video.title, video});
    //res.send(`Watch Video #${req.params.id}`);
}

export const getEdit = async(req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    const { 
        user : { _id },
    } = req.session;
    if(!video){
        return res.render("404", {pageTitle: "Video is not found"});
    }
    if( String(video.owner._id) !== String(_id)){
        return res.status(403).redirect("/");
    }
    return res.render("edit", {pageTitle : `Edit : ${video.title}`, video});
}

export const postEdit = async(req, res) => {
    const { id } = req.params;
    const {title, description, hashtags} = req.body;
    const { file } = req;
    const { 
        user : { _id, avatarUrl },
    } = req.session;

    const video = await Video.exists({ _id:id});
    
    if( String(video.owner._id) !== String(_id)){
        return res.status(403).redirect("/");
    }

    if(video){
        await Video.findByIdAndUpdate(_id, {
            title,
            avataUrl: file ? file.path : avatarUrl,
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
        videos = await Video.find({title : {
            $regex:new RegExp(keyword, "i")
        },
    }).populate("owner");
    }
    res.render("search", { pageTitle:`Search For: ${keyword}`, videos}); 
}


export const getUpload = (req, res) => {
    
    return res.render("upload");
}

export const postUpload = async(req, res) => {
    const { _id } = req.session.user;
    const { path:fileUrl }=req.file
    const { title, description, hashtags } = req.body;
    try{
        const newVideo = await Video.create({
            title,
            fileUrl,
            owner:_id,
            description,
            hashtags:Video.modifyHashtags(hashtags)
        });
        const foundUser = await User.findById(_id);
        foundUser.videos.push(newVideo._id);
        foundUser.save();

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


export const deleteVideo = async(req, res) => {
    const { id } = req.params;
    const { 
        user : { _id },
    } = req.session;
    const video = await Video.findById(id);

    if(!video){
        return res.render("404", {pageTitle: "Video is not found"});
    }

    if( String(video.owner._id) !== String(_id)){
        return res.status(403).redirect("/");
    }

    await Video.findByIdAndDelete(id);
    return res.redirect("/");
};

export const registerView = async(req, res) => {
    const { id } = req.params;
    const video = await Video.findById(id);
    
    if(!video){
        return res.sendStatus(404);
    }else{
        video.meta.views = video.meta.views + 1;
        await video.save();
        return res.sendStatus(200);
    }
    
    
    
}
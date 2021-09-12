import mongoose from "mongoose";

export const modifyHashtags = (hashtags) => {
    hashtags = hashtags;
};

const videoSchema = new mongoose.Schema({
    title: {type:String, required:true, uppercase:true, trim:true, maxLength:80},
    fileUrl : {type:String, required:true},
    description: {type:String, required:true, trim:true, minLength:20},
    createdAt: {type:Date, required:true, default:Date.now},
    hashtags: [{type:String, trim:true}],
    meta: {
        views:{type:Number, required:true, default:0},
    },
    owner: {type:mongoose.Schema.Types.ObjectId, required:true, ref:"User"},
    comments: [
        {type:mongoose.Schema.Types.ObjectId, required: true, ref:"Comment"}
    ],
    
});

videoSchema.static("modifyHashtags", function(hashtags) {
    return hashtags
        .split(",")
        .map((word) => (word.startsWith("#") ? word : `#${word}`));
});




const Video = mongoose.model("Video", videoSchema);
export default Video;

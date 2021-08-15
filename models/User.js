import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {type : String, required:true, unique:true},
    email : {type : String, required: true, unique:true},
    username : {type : String, required:true},
    password : {type:String, required:true},
    location : String,
});

const User = new mongoose.Model("User", userSchema);
export default User;
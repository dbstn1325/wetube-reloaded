import bcrypt from "bcrypt";
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    userid : {type : String, required: true, unique:true},
    avatarUrl : String,
    socialOnly:{type:Boolean, default:false},
    email : {type : String, required: true, unique:true},
    username : {type : String},
    password1 : {type:String},
    password2 : {type:String},
    location : String,
});

userSchema.pre("save", async function(){
    console.log(this.password1);
    this.password1 = await bcrypt.hash(this.password1, 5);
    console.log(this.password1);
}
)


const User = new mongoose.model("User", userSchema);
export default User;
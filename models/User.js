import bcrypt from "bcrypt";
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    userid : {type : String, required: true},
    email : {type : String, required: true, unique:true},
    username : {type : String, required:true, unique:true},
    password1 : {type:String, required:true},
    password2 : {type:String, required:true},
    location : String,
});

userSchema.pre("save", async function(){
    console.log(this.password);
    this.password = await bcrypt.hash(this.password, 5);
    console.log(this.password);
}
)


const User = new mongoose.model("User", userSchema);
export default User;
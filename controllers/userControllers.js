import User from "../models/User";
import Video from "../models/Video";
import bcrypt from "bcrypt";
import fetch from "node-fetch";
import { restart } from "nodemon";

export const getJoin = (req, res) => { res.render("join", { pageTitle : "join" } );
}
export const postJoin = async(req, res) => {
    const { userid, email, username, password1, password2, location } = req.body;
    const pageTitle="Join";
    
    if(password1!==password2){
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "Password is not correct~"
        })
    }
    const exists = await User.exists({ $or : [{ email }, { username } ]});
    if(exists) {
        return res.status(400).render("join", {
            pageTitle,
            errorMessage: "This username/email is already taken~",
        });
    }
    try{
        await User.create({
            userid,
            email,
            username,
            password1,
            password2,
            location,
        });
        return res.redirect("/login");
    }catch(error){
        res.status(400).render("404", {
            pageTitle,
            errorMessage:"The Process is wrong."
        });
    }
}

export const getLogin = (req, res) => {
   res.render("login");
}

export const postLogin = async(req, res) => {
    const { userid, password1 } = req.body;
    const user = await User.findOne({userid, socialOnly:false});

    
    if(!user){
        return res.status(400).render("login", {
            pageTitle:"Login",
            errorMessage:"id is not exists"
        });
    }
    const passwords = await bcrypt.compare(password1, user.password1);

    if(!passwords){
        return res.status(400).render("login", {
            pageTitle:"Login",
            errorMessage:"PW is not exists "
        })
    }
    
    req.session.loggedIn=true;
    req.session.user=user;

    return res.redirect("/");
}

export const startGithubLogin = (req, res) => {
    const baseUrl="https://github.com/login/oauth/authorize?";
    const config = {
        client_id:"ee9a21a21a09d9a3c2b1",
        allow_signup:false,
        scope:"read:user user:email",
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}`+`${params}`;
    console.log(finalUrl);
    return res.redirect(finalUrl);
}

export const finishGithubLogin = async(req, res) => {
    const baseUrl="https://github.com/login/oauth/access_token?"
    const config = {
        client_id:process.env.CLIENT_ID,
        client_secret:process.env.CLIENT_SECRET,
        code:req.query.code,
        
    }
    const params = new URLSearchParams(config).toString();
    const finalUrl=`${baseUrl}`+`${params}`;

    const tokenRequest = await(
        await fetch(finalUrl, {         //code를이용한 finalUrl로 
        method:"POST",
        headers:{
            Accept: "application/json",
        }
    })).json();
    
    //res.send(tokenRequest);
    if("access_token" in tokenRequest){
        const { access_token } = tokenRequest;
        const apiUrl = "https://api.github.com";
        const userRequest = await(
            await fetch(`${apiUrl}/user`,{      //apiUrl로 token과함께
            headers:{
                Authorization: `token ${access_token}`,
            },
        })).json();
        console.log(userRequest);
        
        const emailRequest = await(
            await fetch(`${apiUrl}/user/emails`,{
                headers:{
                    Authorization: `token ${access_token}`,
                },
            })).json();
        
        const emailFind = emailRequest.find(
            (email) => email.primary===true && email.verified===true
        );
        
        if(!emailFind){
            return res.redirect("/login");      //그 github은 취급안하겠다.
        }

        let email = await User.findOne({email:emailFind.email}); //들어온github은 db와비교.
            if(!email){
                email = await User.create({
                    userid:userRequest.login,
                    avatarUrl:userRequest.avatar_url,
                    socialOnly:true,
                    email:emailFind.email,
                    password1:"",
            })};
            req.session.loggedIn=true;
            req.session.user=email;
            
            return res.redirect("/");
        }

        else{
        return res.redirect("/login");
        }
    


    
    
    
}

export const getEdit = (req, res) => {
    
    return res.render("edituser");
}
export const postEdit = async(req, res) => {
    const { _id, avatarUrl } = req.session.user;
    const { userid, email, username, location } = req.body;
    const { userid:sessionUsername, email:sessionEmail } = req.session.user;
    const { file } = req;
    /*
    let searchParam = [];
    if (sessionEmail !== email) {
        searchParam.push({ email });
    }
    if (sessionUsername !== username) {
        searchParam.push({ username });
    }
    console.log(searchParam.length);
    if (searchParam.length > 0) {
        const foundUser = await User.findOne({ $or: searchParam });
        if (foundUser && foundUser._id.toString() !== _id) {
            return res.status(400).render("edit-profile", {
                pageTitle: "Edit Profile",
                errorMessage: "This username/email is already taken.",
            });
        }
    }
    */
    
    const updateUser = await User.findByIdAndUpdate(_id, {
        userid,
        avatarUrl:file ? file.path : avatarUrl,
        email,
        username,
        location,
    },{new:true});
    req.session.user=updateUser;    
    
    return res.redirect("/users/edit-profile");
}


export const remove = (req, res) => res.send("Remove User");
export const logout = (req, res) => {
    req.session.destroy();
    res.redirect("/");
}

export const getChangePassword = (req, res) => {
    if(req.session.user.socialOnly===true){
        return res.redirect("/");
    }
    res.render("users/change-password", { pageTitle : "Change Password" } );
}
export const postChangePassword = async(req, res) => {
    
    const { _id, password1 }=req.session.user;
    const { oldPassword, newPassword, newPasswordConfirm }=req.body;

    const ok = await bcrypt.compare(oldPassword, password1);
    if(!ok){
        return res.status(400).render("users/change-password", {
            pageTitle : "Change Password",
            errorMessage : "Old Password is not incorrect",
        });
    }
    
    if(newPassword !== newPasswordConfirm){
        return res.status(400).render("users/change-password", {
            pageTitle : "Change Password",
            errorMessage : "Password is incorrect",
        });
    }
    
    const user = await User.findById(_id);
    user.password1=newPassword;
    await user.save();
    req.session.user.password1=newPassword;
    

    return res.redirect("/");
}

export const see = async(req, res) => {
    const { id } = req.params;
    const foundUser = await User.findById(id).populate("videos");
    if(!foundUser){
        return res.status(404).render("404", { pageTitle : "User is not exist"})
    }
    const videos = await Video.find({owner:foundUser._id});
    return res.render("users/profile", {
        pageTitle : `User Profile`,
        foundUser
    });

}
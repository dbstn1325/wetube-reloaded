import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";

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
        await fetch(finalUrl, {
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
            await fetch(`${apiUrl}/user`,{
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
        console.log(emailRequest);
        const emailFind = emailRequest.find(
            (email) => email.primary===true && email.verified===true
        );

        if(!emailFind){
            return res.redirect("/login");
        }

        let email = await User.findOne({email:emailFind.email});
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

export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const logout = (req, res) => {
    req.session.destroy();
    res.redirect("/");
}
export const see = (req, res) => res.send("See");
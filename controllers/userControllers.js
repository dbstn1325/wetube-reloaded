import User from "../models/User";
import bcrypt from "bcrypt";

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
    const user = await User.findOne({userid});

    
    if(!user){
        return res.status(400).render("login", {
            pageTitle:"Login",
            errorMessage:"id is not exists "
        });
    }
    const passwords = await bcrypt.compare(password1, user.password1);
    
    if(!passwords){
        return res.status(400).render("login", {
            pageTitle:"Login",
            errorMessage:"PW is not exists "
        })
    }

    return res.end();
}

export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("See");
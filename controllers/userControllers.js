import User from "../models/User";


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
    await User.create({
        userid,
        email,
        username,
        password1,
        password2,
        location,
    });
    return res.redirect("/login");
}

export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("See");
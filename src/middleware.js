import multer from "multer";

export const localsMiddleware = (req, res, next) => {
    res.locals.siteName="Wetube",
    res.locals.loggedIn=req.session.loggedIn;
    res.locals.user=req.session.user || {};
   // console.log(res.locals);
    next();
}



export const protectorMiddleware = (req, res, next) => {    //logout
    if(!res.locals.loggedIn){
        next();
    }else{
        req.flash("error", "Not Authorized");
        return res.redirect("/");
    }
}

export const publicMiddleware = (req, res, next) => {       //login
    if(res.locals.loggedIn){
        next();
    }else{
        req.flash("error", "Not Authorized");
        return res.redirect("/");
    }
}

export const avatarUpload = multer({
    dest : 'uploads/avatar',
    limits : {
        fileSize:3000000,
    }
});

export const videoUpload = multer({
    dest:'uploads/video',
    limits:{
        fileSize:10000000,
    }
});

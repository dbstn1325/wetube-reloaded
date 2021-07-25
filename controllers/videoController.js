const fakeUser={
    username:"Yoon soo",
    loggedIn:"False"
};


export const home = (req, res) => {
    const videos = [{
       title : "First Video",
       rating : 5,
       comments : 2,
       createdAt: "2 minutes ago",
       views:59,
       id:1,
    },
    {
        title : "Second Video",
        rating : 5,
        comments : 2,
        createdAt: "2 minutes ago",
        views:59,
        id:1,  
    },
    {
        title : "Third Video",
        rating : 5,
        comments : 2,
        createdAt: "2 minutes ago",
        views:59,
        id:1,
    }];
    return res.render("home", { pageTitle: "Home", fakeUser:fakeUser, videos});
}


export const see = (req, res) => {
    res.render("watch", { pageTitle: "Watch"});
    //res.send(`Watch Video #${req.params.id}`);
}
export const edit = (req, res) => res.render("edit", {pageTitle: "Edit"});
export const search = (req, res) => res.send("Search Video");
export const upload = (req, res) => res.send("Upload Video");
export const deleteVideo = (req, res) => res.send("Delete Video");
const videos = [{
    title : "Herry Poter",
    rating : 5,
    comments : 2,
    createdAt: "2 minutes ago",
    views:59,
    id:1,
 },
 {
     title : "Azecvan",
     rating : 5,
     comments : 2,
     createdAt: "2 minutes ago",
     views:59,
     id:2,  
 },
 {
     title : "Yes am",
     rating : 5,
     comments : 2,
     createdAt: "2 minutes ago",
     views:59,
     id:3,
 }];


export const home = (req, res) => {
    return res.render("home", { pageTitle: "Home", videos});
}


export const watch = (req, res) => {
    const { id } = req.params;
    const video=videos[id-1];
    res.render("watch", { pageTitle: `you Watching ${video.title}`, video});
    //res.send(`Watch Video #${req.params.id}`);
}

export const getEdit = (req, res) => {
    const { id } = req.params;
    const video=videos[id-1];
    res.render("edit", {pageTitle: "Edit", video});
}

export const postEdit = (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    videos[id-1].title=title;
    res.redirect(`/videos/${id}`);
}


export const search = (req, res) => res.send("Search Video");


export const getUpload = (req, res) => res.render("upload");
export const postUpload = (req, res) => {
    const { uploadTitle } = req.body;
    const newVideo = {
        title:uploadTitle,
        rating : 0,
        comments : 0,
        createdAt: "2 minutes ago",
        views: 0,
        id: videos.length + 1
    };
    videos.push(newVideo);
    return res.redirect("/");
};


export const deleteVideo = (req, res) => res.send("Delete Video");
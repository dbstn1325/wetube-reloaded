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
export const edit = (req, res) => res.render("edit", {pageTitle: "Edit"});
export const search = (req, res) => res.send("Search Video");
export const upload = (req, res) => res.send("Upload Video");
export const deleteVideo = (req, res) => res.send("Delete Video");
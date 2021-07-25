const fakeUser={
    username:"Yoon soo",
    loggedIn:"False"
};
const videos = [1,2,3,4,5,6];

export const home = (req, res) => res.render("home", { pageTitle: "Home", fakeUser:fakeUser, videos});


export const see = (req, res) => {
    res.render("watch", { pageTitle: "Watch"});
    //res.send(`Watch Video #${req.params.id}`);
}
export const edit = (req, res) => res.render("edit", {pageTitle: "Edit"});
export const search = (req, res) => res.send("Search Video");
export const upload = (req, res) => res.send("Upload Video");
export const deleteVideo = (req, res) => res.send("Delete Video");
import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube", {
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const db = mongoose.connection;

const handleOpen = () => console.log("Connect to MongoDB!");
db.on("error", (error) => console.log("Error!"));
db.once("open", handleOpen);



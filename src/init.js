import "dotenv/config";
import "./db";
import Video from "../models/Video";
import app from "./server";


const PORT = 4000;

const handleListening = () => console.log(`Connecting to ${PORT}`);
app.listen(PORT, handleListening);



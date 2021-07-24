import express from "express";
import morgan from "morgan";

const PORT = 4000;

const app = express();
const logger = morgan("dev");

const handleListening = () => console.log(`Listening to ${PORT}`)

const home = (req, res) =>{
    console.log("I will respond.");
    return res.send("Hey");
}
const login = (req, res)=>{
    return res.send("login");
}



app.use(logger);
app.get("/", home);
app.get("/login", login);

app.listen(PORT, handleListening); 
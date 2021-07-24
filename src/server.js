import express from "express";
import morgan from "morgan";
import globalRouter from "../routers/globalRouter";
import userRouter from "../routers/userRotuer";
import videoRouter from "../routers/videoRouter";

const PORT = 4000;

const app = express();
const logger = morgan("dev");

const handleListening = () => console.log(`Listening to ${PORT}`)



app.use(logger);
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

app.listen(PORT, handleListening); 
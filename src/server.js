import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from "../routers/rootRouter";
import userRouter from "../routers/userRotuer";
import videoRouter from "../routers/videoRouter";
import { localsMiddleware } from "./middleware";


//console.log(process.cwd());
const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({extended: true}));

app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave:true,
        saveUninitialized:false,
        store:MongoStore.create({ mongoUrl : process.env.DB_URL}),
    })
);


// app.use((req,res,next) => {
//     req.sessionStore.all((error,sessions)=>{
//         console.log(sessions);
//         next();
//     });
// }
// );

app.use(localsMiddleware);
app.use("/uploads", express.static("uploads"));
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);


export default app;

import express from "express";
import { home, getSearch, postSearch } from "../controllers/videoController";
import { getJoin, postJoin, getLogin, postLogin } from "../controllers/userControllers";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.route("/search").get(getSearch).post(postSearch);

export default rootRouter;

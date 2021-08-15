import express from "express";
import { home, getSearch, postSearch } from "../controllers/videoController";
import { getJoin, postJoin, login } from "../controllers/userControllers";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.get("/login", login);
rootRouter.route("/search").get(getSearch).post(postSearch);

export default rootRouter;

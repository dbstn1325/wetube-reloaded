import express from "express";
import { home, getSearch, postSearch } from "../controllers/videoController";
import { getJoin, postJoin, getLogin, postLogin } from "../controllers/userControllers";
import { protectorMiddleware, publicMiddleware } from "../src/middleware";

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").all(protectorMiddleware).get(getJoin).post(postJoin);
rootRouter.route("/login").all(protectorMiddleware).get(getLogin).post(postLogin);
rootRouter.route("/search").get(getSearch).post(postSearch);

export default rootRouter;

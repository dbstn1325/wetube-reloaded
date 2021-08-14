import express from "express";
import { home, getSearch, postSearch } from "../controllers/videoController";
import { join, login } from "../controllers/userControllers";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/join", join);
globalRouter.get("/login", login);
globalRouter.route("/search").get(getSearch).post(postSearch);

export default globalRouter;

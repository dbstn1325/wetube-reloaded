import express from "express";
import { home } from "../controllers/videoController";
import { join } from "../controllers/userControllers";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/join", join);

export default globalRouter;

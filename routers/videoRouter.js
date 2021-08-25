import express from "express";
import {getUpload, postUpload, watch, getEdit, postEdit, getDelete} from "../controllers/videoController";
import { protectorMiddleware, publicMiddleware, videoUpload } from "../src/middleware";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
// videoRouter.get("/:id(\\d+)/edit", getEdit);
// videoRouter.post("/:id(\\d+)/edit", postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete").get(getDelete);
videoRouter.route("/upload").get(getUpload).post(videoUpload.single("video"), postUpload);

export default videoRouter;
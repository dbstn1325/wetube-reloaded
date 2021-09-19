import express from "express";
import {getUpload, postUpload, watch, getEdit, postEdit, deleteVideo} from "../controllers/videoController";
import { protectorMiddleware, publicMiddleware, videoUpload } from "../middleware";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").all(publicMiddleware).get(getEdit).post(postEdit);
// videoRouter.get("/:id(\\d+)/edit", getEdit);
// videoRouter.post("/:id(\\d+)/edit", postEdit);
videoRouter.get("/:id([0-9a-f]{24})/delete", publicMiddleware, deleteVideo);
videoRouter.route("/upload").all(publicMiddleware).get(getUpload).post(videoUpload.single("video"), postUpload);


export default videoRouter;
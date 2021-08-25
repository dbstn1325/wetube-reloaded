import express from "express";
import {
    edit, logout, see, getEdit, postEdit,
    startGithubLogin, finishGithubLogin,
    getChangePassword, postChangePassword
} from "../controllers/userControllers";
import { protectorMiddleware, publicMiddleware, avatarUpload } from "../src/middleware";

const userRouter = express.Router();

userRouter.get("/logout", publicMiddleware,logout);
userRouter.route("/edit-profile").all(publicMiddleware).get(getEdit).post(avatarUpload.single("avatar"), postEdit);
userRouter.get("/github/start", protectorMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicMiddleware, finishGithubLogin);
userRouter.route("/change-password").all(publicMiddleware).get(getChangePassword).post(postChangePassword);
userRouter.get(":id", see);

export default userRouter;
import express from "express";

const userRouter = express.Router();

userRouter.get("/edit", (req, res) => res.send("Edit User"));

export default userRouter;
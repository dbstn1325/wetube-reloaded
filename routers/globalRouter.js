import express from "express";

const globalRouter = express.Router();

globalRouter.get("/", (req, res) => res.send("home"));

export default globalRouter;

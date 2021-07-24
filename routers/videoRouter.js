import express from "express";

const videoRouter = express.Router();

videoRouter.get("/watch", (req, res)=> res.send("Watch Video"));

export default videoRouter;
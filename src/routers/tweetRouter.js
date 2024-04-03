import express from "express";
import { createTweet } from "../controllers/tweetController";

const tweetRouter= express.Router()
tweetRouter.post("/create",createTweet)
export default tweetRouter;
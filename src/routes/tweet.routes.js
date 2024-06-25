import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js"
import { createTweet, deleteTweet, getUserTweets, updateTweet } from "../controllers/tweet.controller.js";

const router = Router()
router.use(verifyJwt)

router.route("/post-tweet").post(createTweet)
router.route("/get-tweets/:tweetId").get(getUserTweets)
router.route("/update-tweet/:tweetId").patch(updateTweet)
router.route("/delete-tweet/:tweetId").delete(deleteTweet)

export default router
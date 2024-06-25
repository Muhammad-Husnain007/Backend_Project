import { Router } from "express";
import {
    toggleVideoLike,
    toggleCommentLike,
    toggleTweetLike,
    getLikedVideos
} from "../controllers/like.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router()
router.use(verifyJwt)

router.route('/video-like/:videoId').post(toggleVideoLike)
router.route('/comment-like/:commentId').post(toggleCommentLike)
router.route('/tweet-like/:tweetId').post(toggleTweetLike)
router.route('/get-allVideos/:userId').get(getLikedVideos)

export default router

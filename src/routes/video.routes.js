import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js"
import { 
         deleteVideo, getAllVideos, getVideoById,
         publishAVideo, togglePublishStatus, updateVideo }
from "../controllers/video.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.use(verifyJwt)

router.route("/publish-video").post(
    upload.fields([
        {
            name: "videoFile",
            maxCount: 1,
        },
        {
            name: "thumbnail",
            maxCount: 1,
        },
    ]),
    publishAVideo);
router.route('/').get(getAllVideos);
router.route('/:videoId').get(getVideoById);
router.route('/:videoId').patch(
    upload.fields([
        {
            name: "videoFile",
            maxCount: 1,
        },
        {
            name: "thumbnail",
            maxCount: 1,
        },
    ]),
    updateVideo
);
router.route('/:videoId').delete(deleteVideo)
router.route('/publish-status/:videoId').get(togglePublishStatus)

export default router
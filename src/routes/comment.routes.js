import { Router } from "express";
import { addComment, deleteComment, getVideoComments, updateComment } from "../controllers/comment.controller.js";
import {verifyJwt} from "../middlewares/auth.middleware.js"

const router = Router();
router.use(verifyJwt);

router.route("/get/:commentId").get(getVideoComments)
router.route("/post/:videoId").post(addComment)
router.route("/update/:commentId").put(updateComment)
router.route("/delete/:commentId").delete(deleteComment)

export default router;
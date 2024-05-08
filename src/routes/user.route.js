import { Router } from "express";
import {
    changeUserPassword, deleteUser, getUserData, getUserDataById,
    refreshAccessToken, updateUserAvatar, updateUserCoverImage, updateUserData,
    loginUser, logoutUser, registerUser,
    getUserChannelProfile
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register-user").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        },
        {
            name: "coverImage",
            maxCount: 1,
        }
    ]),
    registerUser
);

router.route("/login").post(loginUser)
router.route("/logout").post(verifyJwt, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJwt, changeUserPassword)
router.route("/delete-user/:id").delete(deleteUser)
router.route("/update-user/:id").put(updateUserData)
router.route("/update-user-avatar/:id").patch(upload.single("avatar"), updateUserAvatar)
router.route("/update-user-coverImage/:id").patch(upload.single("coverImage"), updateUserCoverImage)

// =============== Get Requests

router.route("/get-user").get(getUserData)
router.route("/get-user-channel/:id").get(getUserChannelProfile)
router.route("/get-user/:id").get(getUserDataById)


export default router;
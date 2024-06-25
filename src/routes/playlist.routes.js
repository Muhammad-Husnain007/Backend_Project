import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
} from '../controllers/playlist.controller.js'

const router = Router()
router.use(verifyJwt)

router.route("/create-playlist").post(createPlaylist)
router.route('/:playlistId/video/:videoId').post(addVideoToPlaylist);
router.route("/:userId").get(getUserPlaylists)
router.route("/getByID/:playlistId").get(getPlaylistById)
router.route("/:playlistId/remove/:videoId").post(removeVideoFromPlaylist)
router.route("/:playlistId").patch(updatePlaylist)
router.route("/:playlistId").delete(deletePlaylist)

export default router
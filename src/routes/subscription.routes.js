import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js"
import { getSubscribedChannels, getUserChannelSubscribers, toggleSubscription } from "../controllers/subscription.controller.js"

const router = Router()
router.use(verifyJwt)

router.route('/:channelId').post(toggleSubscription)
router.route('/:channelId').get(getUserChannelSubscribers)
router.route('/channels-get/:channelId').get(getSubscribedChannels)

export default router
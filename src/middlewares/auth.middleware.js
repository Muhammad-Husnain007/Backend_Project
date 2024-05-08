import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";


export const verifyJwt = asyncHandler(async (req, _, next) => {
   try {
      const token = req.cookies?.accessToken || req.header
         ("Authorization")?.replace("Bearer", "")
      if (!token) {
         throw new ApiError(404, "Unauthorized request")
      }
      const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
      const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
      if (!user) {
         throw new ApiError(401, "Invalid Access Token")
      }
      req.user = user;
      next();
   } catch (error) {
      throw new ApiError(401, error?.messege || "Error in Access Token")
   }

});
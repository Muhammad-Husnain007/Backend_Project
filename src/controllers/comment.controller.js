import mongoose from "mongoose"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/AsyncHandler.js"
import { Comment } from "../models/comment.model.js"
import { Video } from "../models/video.model.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    try {
        const { commentId } = req.params
        const comment = await Comment.findById(commentId)
        if(!comment){
            throw ApiError(400, "not found")
        }
        return res.status(200)
            .json(new ApiResponse(
                200,
                comment,
                "Comment Get Successfully"
            ));
         
    } catch (error) {
        throw new ApiError(500, error?.messege, "Error in Comment Fetched from Server")
    }
    // const {page = 1, limit = 10} = req.query

})

const getVideoAllComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    try {
        const { videoId } = req.params
        const Video = await Video.findById(videoId)
        return res.status(200)
            .json(new ApiResponse(
                200,
                comment,
                "Comment Get Successfully"
            ));
    } catch (error) {
        throw new ApiError(500, error?.messege, "Error in Comment Fetched from Server")
    }
    // const {page = 1, limit = 10} = req.query

})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    try {
        const { content } = req.body
        const { videoId } = req.params
        if(!videoId){
            throw ApiError(400, "Id did`t match")
        }
        const comment = await Comment.create({
            content,
        })
        comment.owner = req.user?._id;
        comment.video = videoId
        comment.save();
        return res.status(200)
            .json(
                new ApiResponse(200, comment, "Comment post Successfully")
            )
    } catch (error) {
        throw new ApiError(500, error?.messege, "Error in Comment post")
    }
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    try {
      const { content } = req.body
      const { commentId } = req.params
      const comment = await Comment.findByIdAndUpdate(
           commentId,
          {
              $set: {
                  content: content
              }
          },
          { new: true },
      )
      return res.status(200)
      .json(
          new ApiResponse(200, comment, "Comment Updated Successfully")
      )
  } catch (error) {
    throw new ApiError(500, error?.messege, "Server Error")
  }
})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
    try {
        const {commentId} = req.params
        const comment = await Comment.findByIdAndDelete(commentId)
        return res.status(200)
        .json(
            new ApiResponse(200, comment, "Comment Deleted Successfully")
        )
    } catch (error) {
    throw new ApiError(500, error?.messege, "Server Error")
    }
})

export {
    getVideoComments,
    addComment,
    updateComment,
    deleteComment,
    getVideoAllComments
}
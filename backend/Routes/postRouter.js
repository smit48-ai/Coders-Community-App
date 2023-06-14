import express from 'express';
import {getAllPosts,createPost, deletePost, updatePost,
        SavePost, LikePost, UnSavePost,UnLikePost, CommentPost, postsbysearch} from "../Controllers/PostControllers.js";
import {auth} from "../middlewares/auth.js"
const router=express.Router();


//get all posts
router.get("/",getAllPosts);
//get posts by search
router.get("/search",postsbysearch);
//create a post
router.post("/create",auth, createPost);
//delete a post
router.delete("/:id",auth,deletePost);
//update a post
router.put("/:id",auth,updatePost);
//SaveApost
router.put("/:id/SavePost",auth,SavePost);
//LikeApost
router.put("/:id/LikePost",auth,LikePost);
//UnSaveApost
router.put("/:id/UnSavePost",auth,UnSavePost);
//UnLikeApost
router.put("/:id/UnLikePost",auth,UnLikePost);
//Addcomment
router.put("/:id/Addcomment",auth,CommentPost);

//TODO:left to do
//Recommendate Posts
// router.get("/recommended", getRecommendations);
// //All feeds
// router.get("/yourFeed", getFeed);

export default router;
    
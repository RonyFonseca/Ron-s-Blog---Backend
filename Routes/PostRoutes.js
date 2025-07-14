import PostController from "../Controllers/PostController.js";
import express from "express"; 

const router = express.Router(); 

router.post("/createPost", PostController.createPost);
router.put("/editPost/:id", PostController.editPost);
router.post("/likedPost/:idPost", PostController.likedPost)
router.post("/savePost/:idPost", PostController.savePost)
router.get("/mySaves", PostController.getSavedPosts)
router.post("/comentPost/:idPost", PostController.comentPost);
router.delete("/deletePost/:idPost", PostController.deletePost)

export default router; 
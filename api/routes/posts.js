import express from 'express';
import { deletePost, getAllPosts, getAPost, newPost, updatePost } from '../controller/post.js';
const router = express.Router();

router.get("/",getAllPosts)
router.get("/:id",getAPost)
router.post("/",newPost)
router.delete("/:id",deletePost)
router.put("/:id",updatePost)


export default router;
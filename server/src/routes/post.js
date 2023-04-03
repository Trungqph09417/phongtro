import express from "express";
import * as postController from "../controllers/postController";
const router = express.Router();
router.get("/all", postController.getPosts);
router.get("/limit", postController.getPostsPaginate);
router.get("/new-post", postController.getNewPosts);
export default router;

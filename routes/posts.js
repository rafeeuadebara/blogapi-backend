import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import {
  listPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
} from "../controllers/postController.js";

const router = Router();

router.get("/", listPosts);
router.get("/:id", getPost);

router.post("/", requireAuth, createPost);
router.put("/:id", requireAuth, updatePost);
router.delete("/:id", requireAuth, deletePost);

export default router;

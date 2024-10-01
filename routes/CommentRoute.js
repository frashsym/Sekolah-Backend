import express from "express";
import {
  getComments,
  getCommentsById,
  createComments,
  updateComments,
  deleteComments,
} from "../controller/CommentController.js";
import verifyToken from "../middleware/token.js";
import { checkBlacklist } from "../middleware/Blacklist.js";

const router = express.Router();

router.get("/comments", verifyToken, checkBlacklist, getComments);
router.get("/comments/:id", verifyToken, checkBlacklist, getCommentsById);
router.post("/comments", verifyToken, checkBlacklist, createComments);
router.patch("/comments/:id", verifyToken, checkBlacklist, updateComments);
router.delete("/comments/:id", verifyToken, checkBlacklist, deleteComments);

export default router;

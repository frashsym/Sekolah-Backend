import express from "express";
import {
  CreateTagVideo,
  GetAllTagVideos,
  GetTagVideoById,
  UpdateTagVideo,
  DeleteTagVideo,
} from "../controller/TagVideoController.js";
import verifyToken from "../middleware/token.js";
import { checkBlacklist } from "../middleware/Blacklist.js";

const router = express.Router();

router.post("/tag-video", verifyToken, checkBlacklist, CreateTagVideo);
router.get("/tag-video", verifyToken, checkBlacklist, GetAllTagVideos);
router.get("/tag-video/:id", verifyToken, checkBlacklist, GetTagVideoById);
router.put("/tag-video/:id", verifyToken, checkBlacklist, UpdateTagVideo);
router.delete("/tag-video/:id", verifyToken, checkBlacklist, DeleteTagVideo);

export default router;

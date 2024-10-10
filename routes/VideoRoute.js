import express from "express";
import {
  CreateVideo,
  GetAllVideos,
  GetVideoById,
  UpdateVideo,
  DeleteVideo,
} from "../controller/VideoController.js";

const router = express.Router();

router.post("/video", CreateVideo);
router.get("/video", GetAllVideos);
router.get("/video/:id", GetVideoById);
router.put("/video/:id", UpdateVideo);
router.delete("/video/:id", DeleteVideo);

export default router;
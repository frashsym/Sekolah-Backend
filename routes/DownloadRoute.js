import express from "express";
import {
  CreateDownload,
  GetAllDownloads,
  GetDownloadById,
  UpdateDownload,
  DeleteDownload,
} from "../controller/DownloadController.js";
import verifyToken from "../middleware/token.js";
import { checkBlacklist } from "../middleware/Blacklist.js";

const router = express.Router();

router.post("/download", verifyToken, checkBlacklist, CreateDownload);
router.get("/download", verifyToken, checkBlacklist, GetAllDownloads);
router.get("/download/:id", verifyToken, checkBlacklist, GetDownloadById);
router.put("/download/:id", verifyToken, checkBlacklist, UpdateDownload);
router.delete("/download/:id", verifyToken, checkBlacklist, DeleteDownload);

export default router;
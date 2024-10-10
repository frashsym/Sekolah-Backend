import express from "express";
import {
  CreateGallery,
  GetAllGallery,
  GetGalleryById,
  UpdateGallery,
  DeleteGallery,
} from "../controller/GalleryController.js";
import verifyToken from "../middleware/token.js";
import { checkBlacklist } from "../middleware/Blacklist.js";

const router = express.Router();

router.post("/gallery", verifyToken, checkBlacklist, CreateGallery);
router.get("/gallery", verifyToken, checkBlacklist, GetAllGallery);
router.get("/gallery/:id", verifyToken, checkBlacklist, GetGalleryById);
router.put("/gallery/:id", verifyToken, checkBlacklist, UpdateGallery);
router.delete("/gallery/:id", verifyToken, checkBlacklist, DeleteGallery);

export default router;

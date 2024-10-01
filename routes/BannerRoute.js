import express from "express";
import {
  CreateBanner,
  GetAllBanners,
  GetBannerById,
  UpdateBanner,
  DeleteBanner,
} from "../controller/BannerController.js";
import verifyToken from "../middleware/token.js";
import { checkBlacklist } from "../middleware/Blacklist.js";

const router = express.Router();

router.post("/banner", verifyToken, checkBlacklist, CreateBanner);
router.get("/banner", verifyToken, checkBlacklist, GetAllBanners);
router.get("/banner/:id", verifyToken, checkBlacklist, GetBannerById);
router.put("/banner/:id", verifyToken, checkBlacklist, UpdateBanner);
router.delete("/banner/:id", verifyToken, checkBlacklist, DeleteBanner);

export default router;
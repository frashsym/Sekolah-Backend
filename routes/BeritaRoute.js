import express from "express";
import {
  CreateBerita,
  GetAllBerita,
  GetBeritaById,
  UpdateBerita,
  DeleteBerita,
} from "../controller/BeritaController.js";
import verifyToken from "../middleware/token.js";
import { checkBlacklist } from "../middleware/Blacklist.js";

const router = express.Router();

router.post("/berita", verifyToken, checkBlacklist, CreateBerita);
router.get("/berita", verifyToken, checkBlacklist, GetAllBerita);
router.get("/berita/:id", verifyToken, checkBlacklist, GetBeritaById);
router.put("/berita/:id", verifyToken, checkBlacklist, UpdateBerita);
router.delete("/berita/:id", verifyToken, checkBlacklist, DeleteBerita);

export default router;

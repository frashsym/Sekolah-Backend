import express from "express";
import {
  CreateKategori,
  GetAllKategori,
  GetKategoriById,
  UpdateKategori,
  DeleteKategori,
} from "../controller/KategoriController.js";
import verifyToken from "../middleware/token.js";
import { checkBlacklist } from "../middleware/Blacklist.js";

const router = express.Router();

router.post("/kategori", verifyToken, checkBlacklist, CreateKategori);
router.get("/kategori", verifyToken, checkBlacklist, GetAllKategori);
router.get("/kategori/:id", verifyToken, checkBlacklist, GetKategoriById);
router.put("/kategori/:id", verifyToken, checkBlacklist, UpdateKategori);
router.delete("/kategori/:id", verifyToken, checkBlacklist, DeleteKategori);

export default router;
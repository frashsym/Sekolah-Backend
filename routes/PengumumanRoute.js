import express from "express";
import {
  CreatePengumuman,
  GetAllPengumuman,
  GetPengumumanById,
  UpdatePengumuman,
  DeletePengumuman,
} from "../controller/PengumumanController.js";
import verifyToken from "../middleware/token.js";
import { checkBlacklist } from "../middleware/Blacklist.js";

const router = express.Router();

router.post("/pengumuman", verifyToken, checkBlacklist, CreatePengumuman);
router.get("/pengumuman", verifyToken, checkBlacklist, GetAllPengumuman);
router.get("/pengumuman/:id", verifyToken, checkBlacklist, GetPengumumanById);
router.put("/pengumuman/:id", verifyToken, checkBlacklist, UpdatePengumuman);
router.delete("/pengumuman/:id", verifyToken, checkBlacklist, DeletePengumuman);

export default router;
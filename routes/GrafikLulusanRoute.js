import express from "express";
import {
  CreateGrafikLulusan,
  GetAllGrafikLulusan,
  GetGrafikLulusanById,
  UpdateGrafikLulusan,
  DeleteGrafikLulusan,
} from "../controller/GrafikLulusanController.js";
import verifyToken from "../middleware/token.js";
import { checkBlacklist } from "../middleware/Blacklist.js";

const router = express.Router();

router.post("/grafik-lulusan", verifyToken, checkBlacklist, CreateGrafikLulusan);
router.get("/grafik-lulusan", verifyToken, checkBlacklist, GetAllGrafikLulusan);
router.get("/grafik-lulusan/:id", verifyToken, checkBlacklist, GetGrafikLulusanById);
router.put("/grafik-lulusan/:id", verifyToken, checkBlacklist, UpdateGrafikLulusan);
router.delete("/grafik-lulusan/:id", verifyToken, checkBlacklist, DeleteGrafikLulusan);

export default router;

import express from "express";
import {
  CreateStatistik,
  GetAllStatistik,
  GetStatistikById,
  UpdateStatistik,
  DeleteStatistik,
} from "../controller/StatistikController.js";
import verifyToken from "../middleware/token.js";
import { checkBlacklist } from "../middleware/Blacklist.js";

const router = express.Router();

router.post("/statistik", verifyToken, checkBlacklist, CreateStatistik);
router.get("/statistik", verifyToken, checkBlacklist, GetAllStatistik);
router.get("/statistik/:id", verifyToken, checkBlacklist, GetStatistikById);
router.put("/statistik/:id", verifyToken, checkBlacklist, UpdateStatistik);
router.delete("/statistik/:id", verifyToken, checkBlacklist, DeleteStatistik);

export default router;

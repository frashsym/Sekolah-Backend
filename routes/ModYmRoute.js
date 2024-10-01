import express from "express";
import {
  CreateModYm,
  GetAllModYm,
  GetModYmById,
  UpdateModYm,
  DeleteModYm,
} from "../controller/ModYmController.js";
import verifyToken from "../middleware/token.js";
import { checkBlacklist } from "../middleware/Blacklist.js";

const router = express.Router();

router.post("/mod_ym", verifyToken, checkBlacklist, CreateModYm);
router.get("/mod_ym", verifyToken, checkBlacklist, GetAllModYm);
router.get("/mod_ym/:id", verifyToken, checkBlacklist, GetModYmById);
router.put("/mod_ym/:id", verifyToken, checkBlacklist, UpdateModYm);
router.delete("/mod_ym/:id", verifyToken, checkBlacklist, DeleteModYm);

export default router;
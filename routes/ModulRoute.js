import express from "express";
import {
  CreateModul,
  GetAllModul,
  GetModulById,
  UpdateModul,
  DeleteModul,
} from "../controller/ModulController.js";
import verifyToken from "../middleware/token.js";
import { checkBlacklist } from "../middleware/Blacklist.js";
const router = express.Router();
router.post("/modul", verifyToken, checkBlacklist, CreateModul);
router.get("/modul", verifyToken, checkBlacklist, GetAllModul);
router.get("/modul/:id", verifyToken, checkBlacklist, GetModulById);
router.put("/modul/:id", verifyToken, checkBlacklist, UpdateModul);
router.delete("/modul/:id", verifyToken, checkBlacklist, DeleteModul);
export default router;

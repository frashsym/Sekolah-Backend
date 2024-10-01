import express from "express";
import {
  CreateIklanAtas,
  GetAllIklanAtas,
  GetIklanAtasById,
  UpdateIklanAtas,
  DeleteIklanAtas,
} from "../controller/IklanAtasController.js";
import verifyToken from "../middleware/token.js";
import { checkBlacklist } from "../middleware/Blacklist.js";

const router = express.Router();

router.post("/iklanatas", verifyToken, checkBlacklist, CreateIklanAtas);
router.get("/iklanatas", verifyToken, checkBlacklist, GetAllIklanAtas);
router.get("/iklanatas/:id", verifyToken, checkBlacklist, GetIklanAtasById);
router.put("/iklanatas/:id", verifyToken, checkBlacklist, UpdateIklanAtas);
router.delete("/iklanatas/:id", verifyToken, checkBlacklist, DeleteIklanAtas);

export default router;
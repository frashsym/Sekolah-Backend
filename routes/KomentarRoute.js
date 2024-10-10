import express from "express";
import {
  CreateKomentar,
  GetAllKomentar,
  GetKomentarById,
  UpdateKomentar,
  DeleteKomentar,
} from "../controller/KomentarController.js";
import verifyToken from "../middleware/token.js";
import { checkBlacklist } from "../middleware/Blacklist.js";

const router = express.Router();

router.post("/komentar", verifyToken, checkBlacklist, CreateKomentar);
router.get("/komentar", verifyToken, checkBlacklist, GetAllKomentar);
router.get("/komentar/:id", verifyToken, checkBlacklist, GetKomentarById);
router.put("/komentar/:id", verifyToken, checkBlacklist, UpdateKomentar);
router.delete("/komentar/:id", verifyToken, checkBlacklist, DeleteKomentar);

export default router;

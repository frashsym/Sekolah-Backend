import express from "express";
import {
  CreateKataJelek,
  GetAllKataJelek,
  GetKataJelekById,
  UpdateKataJelek,
  DeleteKataJelek,
} from "../controller/KataJelekController.js";
import verifyToken from "../middleware/token.js";
import { checkBlacklist } from "../middleware/Blacklist.js";

const router = express.Router();

router.post("/katajelek", verifyToken, checkBlacklist, CreateKataJelek);
router.get("/katajelek", verifyToken, checkBlacklist, GetAllKataJelek);
router.get("/katajelek/:id", verifyToken, checkBlacklist, GetKataJelekById);
router.put("/katajelek/:id", verifyToken, checkBlacklist, UpdateKataJelek);
router.delete("/katajelek/:id", verifyToken, checkBlacklist, DeleteKataJelek);

export default router;

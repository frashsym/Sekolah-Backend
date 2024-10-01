import express from "express";
import {
  CreatePasangIklan,
  GetAllPasangIklan,
  GetPasangIklanById,
  UpdatePasangIklan,
  DeletePasangIklan,
} from "../controller/PasangIklanController.js";
import verifyToken from "../middleware/token.js";
import { checkBlacklist } from "../middleware/Blacklist.js";

const router = express.Router();

router.post("/pasangiklan", verifyToken, checkBlacklist, CreatePasangIklan);
router.get("/pasangiklan", verifyToken, checkBlacklist, GetAllPasangIklan);
router.get("/pasangiklan/:id", verifyToken, checkBlacklist, GetPasangIklanById);
router.put("/pasangiklan/:id", verifyToken, checkBlacklist, UpdatePasangIklan);
router.delete("/pasangiklan/:id", verifyToken, checkBlacklist, DeletePasangIklan);

export default router;
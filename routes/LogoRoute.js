import express from "express";
import {
  CreateLogo,
  GetAllLogo,
  GetLogoById,
  UpdateLogo,
  DeleteLogo,
} from "../controller/LogoController.js";
import verifyToken from "../middleware/token.js";
import { checkBlacklist } from "../middleware/Blacklist.js";

const router = express.Router();

router.post("/logo", verifyToken, checkBlacklist, CreateLogo);
router.get("/logo", verifyToken, checkBlacklist, GetAllLogo);
router.get("/logo/:id", verifyToken, checkBlacklist, GetLogoById);
router.put("/logo/:id", verifyToken, checkBlacklist, UpdateLogo);
router.delete("/logo/:id", verifyToken, checkBlacklist, DeleteLogo);

export default router;
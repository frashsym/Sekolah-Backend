import express from "express";
import {
  CreateBackground,
  GetAllBackgrounds,
  GetBackgroundById,
  UpdateBackground,
  DeleteBackground,
} from "../controller/BackgroundController.js";
import verifyToken from "../middleware/token.js";
import { checkBlacklist } from "../middleware/Blacklist.js";

const router = express.Router();

router.post("/background", verifyToken, checkBlacklist, CreateBackground);
router.get("/background", verifyToken, checkBlacklist, GetAllBackgrounds);
router.get("/background/:id", verifyToken, checkBlacklist, GetBackgroundById);
router.put("/background/:id", verifyToken, checkBlacklist, UpdateBackground);
router.delete("/background/:id", verifyToken, checkBlacklist, DeleteBackground);

export default router;
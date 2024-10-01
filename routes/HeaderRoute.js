import express from "express";
import {
  CreateHeader,
  GetAllHeaders,
  GetHeaderById,
  UpdateHeader,
  DeleteHeader,
} from "../controller/HeaderController.js";
import verifyToken from "../middleware/token.js";
import { checkBlacklist } from "../middleware/Blacklist.js";

const router = express.Router();

router.post("/header", verifyToken, checkBlacklist, CreateHeader);
router.get("/header", verifyToken, checkBlacklist, GetAllHeaders);
router.get("/header/:id", verifyToken, checkBlacklist, GetHeaderById);
router.put("/header/:id", verifyToken, checkBlacklist, UpdateHeader);
router.delete("/header/:id", verifyToken, checkBlacklist, DeleteHeader);

export default router;
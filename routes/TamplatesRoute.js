import express from "express";
import {
  getTemplates,
  getTemplatesById,
  createTemplates,
  updateTemplates,
  deleteTemplates,
} from "../controller/TamplatesController.js";
import verifyToken from "../middleware/token.js";
import { checkBlacklist } from "../middleware/Blacklist.js";

const router = express.Router();

router.get("/templates", verifyToken, checkBlacklist, getTemplates);
router.get("/templates/:id", verifyToken, checkBlacklist, getTemplatesById);
router.post("/templates", verifyToken, checkBlacklist, createTemplates);
router.patch("/templates/:id", verifyToken, checkBlacklist, updateTemplates);
router.delete("/templates/:id", verifyToken, checkBlacklist, deleteTemplates);

export default router;

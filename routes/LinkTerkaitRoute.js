import express from "express";
import {
  CreateLinkTerkait,
  GetAllLinkTerkait,
  GetLinkTerkaitById,
  UpdateLinkTerkait,
  DeleteLinkTerkait,
} from "../controller/LinkTerkaitController.js";
import verifyToken from "../middleware/token.js";
import { checkBlacklist } from "../middleware/Blacklist.js";

const router = express.Router();

router.post("/linkterkait", verifyToken, checkBlacklist, CreateLinkTerkait);
router.get("/linkterkait", verifyToken, checkBlacklist, GetAllLinkTerkait);
router.get("/linkterkait/:id", verifyToken, checkBlacklist, GetLinkTerkaitById);
router.put("/linkterkait/:id", verifyToken, checkBlacklist, UpdateLinkTerkait);
router.delete("/linkterkait/:id", verifyToken, checkBlacklist, DeleteLinkTerkait);

export default router;
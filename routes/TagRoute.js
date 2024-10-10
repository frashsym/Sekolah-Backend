import express from "express";
import {
  CreateTag,
  GetAllTags,
  GetTagById,
  UpdateTag,
  DeleteTag,
} from "../controller/TagController.js";
import verifyToken from "../middleware/token.js";
import { checkBlacklist } from "../middleware/Blacklist.js";

const router = express.Router();

router.post("/tag", verifyToken, checkBlacklist, CreateTag);
router.get("/tag", verifyToken, checkBlacklist, GetAllTags);
router.get("/tag/:id", verifyToken, checkBlacklist, GetTagById);
router.put("/tag/:id", verifyToken, checkBlacklist, UpdateTag);
router.delete("/tag/:id", verifyToken, checkBlacklist, DeleteTag);

export default router;

import express from "express";
import {
  CreatePolling,
  GetAllPolling,
  GetPollingById,
  UpdatePolling,
  DeletePolling,
} from "../controller/PollingController.js";
import verifyToken from "../middleware/token.js";
import { checkBlacklist } from "../middleware/Blacklist.js";

const router = express.Router();

router.post("/polling", verifyToken, checkBlacklist, CreatePolling);
router.get("/polling", verifyToken, checkBlacklist, GetAllPolling);
router.get("/polling/:id", verifyToken, checkBlacklist, GetPollingById);
router.put("/polling/:id", verifyToken, checkBlacklist, UpdatePolling);
router.delete("/polling/:id", verifyToken, checkBlacklist, DeletePolling);

export default router;
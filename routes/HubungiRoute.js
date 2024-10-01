import express from "express";
import {
  CreateHubungi,
  GetAllHubungi,
  GetHubungiById,
  UpdateHubungi,
  DeleteHubungi,
} from "../controller/HubungiController.js";
import verifyToken from "../middleware/token.js";
import { checkBlacklist } from "../middleware/Blacklist.js";

const router = express.Router();

router.post("/hubungi", verifyToken, checkBlacklist, CreateHubungi);
router.get("/hubungi", verifyToken, checkBlacklist, GetAllHubungi);
router.get("/hubungi/:id", verifyToken, checkBlacklist, GetHubungiById);
router.put("/hubungi/:id", verifyToken, checkBlacklist, UpdateHubungi);
router.delete("/hubungi/:id", verifyToken, checkBlacklist, DeleteHubungi);

export default router;
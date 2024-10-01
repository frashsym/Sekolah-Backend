import express from "express";
import {
  CreateIklanTengah,
  GetAllIklanTengah,
  GetIklanTengahById,
  UpdateIklanTengah,
  DeleteIklanTengah,
} from "../controller/IklanTengahController.js";
import verifyToken from "../middleware/token.js";
import { checkBlacklist } from "../middleware/Blacklist.js";

const router = express.Router();

router.post("/iklantengah", verifyToken, checkBlacklist, CreateIklanTengah);
router.get("/iklantengah", verifyToken, checkBlacklist, GetAllIklanTengah);
router.get("/iklantengah/:id", verifyToken, checkBlacklist, GetIklanTengahById);
router.put("/iklantengah/:id", verifyToken, checkBlacklist, UpdateIklanTengah);
router.delete("/iklantengah/:id", verifyToken, checkBlacklist, DeleteIklanTengah);

export default router;
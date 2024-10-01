import express from "express";
import {
  CreateIdentitas,
  GetAllIdentitas,
  GetIdentitasById,
  UpdateIdentitas,
  DeleteIdentitas,
} from "../controller/IdentitasController.js";
import verifyToken from "../middleware/token.js";
import { checkBlacklist } from "../middleware/Blacklist.js";

const router = express.Router();

router.post("/identitas", verifyToken, checkBlacklist, CreateIdentitas);
router.get("/identitas", verifyToken, checkBlacklist, GetAllIdentitas);
router.get("/identitas/:id", verifyToken, checkBlacklist, GetIdentitasById);
router.put("/identitas/:id", verifyToken, checkBlacklist, UpdateIdentitas);
router.delete("/identitas/:id", verifyToken, checkBlacklist, DeleteIdentitas);

export default router;
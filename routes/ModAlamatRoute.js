import express from "express";
import {
  CreateModAlamat,
  GetAllModAlamat,
  GetModAlamatById,
  UpdateModAlamat,
  DeleteModAlamat,
} from "../controller/ModAlamatController.js";
import verifyToken from "../middleware/token.js";
import { checkBlacklist } from "../middleware/Blacklist.js";

const router = express.Router();

router.post("/alamat", verifyToken, checkBlacklist, CreateModAlamat);
router.get("/alamat", verifyToken, checkBlacklist, GetAllModAlamat);
router.get("/alamat/:id", verifyToken, checkBlacklist, GetModAlamatById);
router.put("/alamat/:id", verifyToken, checkBlacklist, UpdateModAlamat);
router.delete("/alamat/:id", verifyToken, checkBlacklist, DeleteModAlamat);

export default router;